import axios from 'axios'
import { PROVIDERS, getProvider, resolveProviderKey, isDevelopment } from './aiProviders'
import {
  buildGradingSystemPrompt,
  wrapChallengeSpec,
  wrapUserCode,
  wrapStarterCode,
} from './promptBuilder'

const PROXY_API_URL = '/api/proxy'

// Ollama stream handler — duplicated from aiChatService.js (intentional: the
// chunk parsing configs and optimizations differ slightly per feature).
// Medium tier refactor will extract this into a shared utility.
class OllamaStreamHandler {
  constructor() {
    this.modelConfigs = {
      gemma: {
        responseField: 'response',
        requiresSpecialParsing: true,
        markdownMode: 'tolerant',
        chunkDelimiter: '\n',
        filterMetadata: false,
      },
      qwen: {
        responseField: 'response',
        requiresSpecialParsing: false,
        markdownMode: 'standard',
        chunkDelimiter: '\n',
        filterMetadata: true,
        metadataFields: ['model', 'createdat', 'done'],
      },
      deepseek: {
        responseField: 'response',
        requiresSpecialParsing: true,
        markdownMode: 'code-aware',
        chunkDelimiter: '\n',
        filterMetadata: false,
      },
      llama: {
        responseField: 'response',
        requiresSpecialParsing: false,
        markdownMode: 'standard',
        chunkDelimiter: '\n',
        filterMetadata: false,
      },
      mistral: {
        responseField: 'response',
        requiresSpecialParsing: false,
        markdownMode: 'standard',
        chunkDelimiter: '\n',
        filterMetadata: false,
      },
    }
  }

  detectModelType(modelName) {
    const lowercaseName = (modelName || '').toLowerCase()
    if (lowercaseName.includes('gemma')) return 'gemma'
    if (lowercaseName.includes('qwen')) return 'qwen'
    if (lowercaseName.includes('deepseek')) return 'deepseek'
    if (lowercaseName.includes('llama')) return 'llama'
    if (lowercaseName.includes('mistral')) return 'mistral'
    return 'default'
  }

  getModelConfig(modelName) {
    const modelType = this.detectModelType(modelName)
    return this.modelConfigs[modelType] || this.modelConfigs['llama']
  }

  getOptimizedParams(modelName, baseParams = {}) {
    const modelType = this.detectModelType(modelName)
    // Grading uses lower temperature than chat — we want less creative,
    // more deterministic reviews.
    const optimizations = {
      gemma: { temperature: 0.3, top_p: 0.9 },
      qwen: { temperature: 0.3, top_p: 0.9, repetition_penalty: 1.1 },
      deepseek: { temperature: 0.3, top_p: 0.9, max_tokens: 4096 },
      llama: { temperature: 0.3, top_p: 0.9 },
      mistral: { temperature: 0.3, top_p: 0.9, max_tokens: 4096 },
    }
    return { ...baseParams, ...(optimizations[modelType] || optimizations['llama']) }
  }
}

const ollamaHandler = new OllamaStreamHandler()

function resolveModel(providerKey, version, customModel) {
  const entry = getProvider(providerKey)
  if (providerKey === 'other' && customModel) return customModel
  if (version && version !== 'latest') return version
  return entry ? entry.model : null
}

// Map the display language (as it appears in the grading prompt) to a
// code-fence / <user_code> language tag. Covers the curriculum topics; falls
// back to a lower-cased first-word for anything unknown.
function languageToCodeTag(language) {
  if (!language) return 'javascript'
  const map = {
    javascript: 'javascript',
    typescript: 'typescript',
    'c#': 'csharp',
    'c# .NET': 'csharp',
    csharp: 'csharp',
    yaml: 'yaml',
    python: 'python',
  }
  const key = language.trim().toLowerCase()
  return map[key] || key.split(/\s+/)[0] || 'javascript'
}

/**
 * Build the grading request for the given provider family. The system prompt
 * comes from buildGradingSystemPrompt — it's identical across providers, just
 * delivered differently depending on family (top-level `system` for Claude,
 * first system message for OpenAI-compat, etc.).
 */
function formatGradeRequest(
  providerKey,
  challengeDescription,
  sectionTitle,
  code,
  version,
  customModel,
  language,
  starterCode,
) {
  const entry = getProvider(providerKey)
  const family = entry ? entry.family : 'custom'
  const model = resolveModel(providerKey, version, customModel)

  const resolvedLanguage = language || 'JavaScript'
  const codeTag = languageToCodeTag(resolvedLanguage)
  const systemPrompt = buildGradingSystemPrompt({ language: resolvedLanguage })

  const hasStarter = !!(starterCode && starterCode.trim())
  const contentParts = [wrapChallengeSpec({ sectionTitle, description: challengeDescription }), '']
  if (hasStarter) {
    contentParts.push(wrapStarterCode(starterCode, codeTag), '')
  }
  contentParts.push(
    wrapUserCode(code, codeTag),
    '',
    hasStarter
      ? `Grade this ${resolvedLanguage} submission against the challenge spec above, using <starter_code> as the baseline. Apply the narrow invalid-code refusal rule from your instructions only if <user_code> is essentially identical to <starter_code>; otherwise follow the rubric and grade the student's changes.`
      : `Grade this ${resolvedLanguage} submission against the challenge spec above following the rubric in your instructions.`,
  )
  const userContent = contentParts.join('\n')

  switch (family) {
    case 'claude':
      return {
        model,
        max_tokens: 4000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userContent }],
      }

    case 'openai':
    case 'openai-compat':
      return {
        model,
        max_tokens: 4000,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent },
        ],
      }

    case 'gemini':
      return {
        model,
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: userContent }] }],
      }

    case 'cohere':
      return {
        model,
        preamble: systemPrompt,
        chat_history: [],
        message: userContent,
      }

    case 'ollama': {
      const ollamaModel = version || entry.model
      const prompt = `System: ${systemPrompt}\n\nUser: ${userContent}`
      const optimized = ollamaHandler.getOptimizedParams(ollamaModel, {
        temperature: 0.2,
        top_p: 0.95,
      })
      return { model: ollamaModel, prompt, stream: false, options: optimized }
    }

    case 'custom':
    default:
      return {
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent },
        ],
      }
  }
}

function getHeaders(providerKey, apiKey, customHeaders) {
  const entry = getProvider(providerKey)

  if (providerKey === 'other' && customHeaders) {
    try {
      const headers = JSON.parse(customHeaders)
      if (!headers['Content-Type']) headers['Content-Type'] = 'application/json'
      return headers
    } catch (e) {
      console.error('Error parsing custom headers:', e)
      return { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` }
    }
  }

  const authHeader = entry ? entry.authHeader : 'bearer'
  switch (authHeader) {
    case 'anthropic':
      return {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      }
    case 'google':
      return { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey }
    case 'cohere':
      return { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` }
    case 'none':
      return { 'Content-Type': 'application/json' }
    case 'bearer':
    default:
      return { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` }
  }
}

function extractResponseText(providerKey, data) {
  const entry = getProvider(providerKey)
  const family = entry ? entry.family : 'custom'

  switch (family) {
    case 'claude':
      return data.content?.[0]?.text || ''
    case 'openai':
    case 'openai-compat':
      return data.choices?.[0]?.message?.content || ''
    case 'gemini':
      return data.candidates?.[0]?.content?.parts?.[0]?.text || ''
    case 'cohere':
      return data.text || data.message?.content || ''
    case 'ollama':
      return data.response || data.message?.content || ''
    case 'custom':
    default:
      if (data.choices?.[0]?.message?.content) return data.choices[0].message.content
      if (data.content?.[0]?.text) return data.content[0].text
      if (data.candidates?.[0]?.content?.parts) return data.candidates[0].content.parts[0].text
      if (data.text || data.result || data.output || data.generated_text) {
        return data.text || data.result || data.output || data.generated_text
      }
      return JSON.stringify(data)
  }
}

function resolveEndpoint(providerKey, customEndpoint) {
  if (providerKey === 'other') {
    if (!customEndpoint) throw new Error('Custom endpoint is required for custom provider')
    return customEndpoint
  }
  const entry = getProvider(providerKey)
  if (!entry) throw new Error(`Unsupported AI provider: ${providerKey}`)
  return entry.endpoint
}

// -----------------------------------------------------------------------------
// Public API — signatures preserved for back-compat with CodeEditor.vue /
// ChallengeView.vue.
// -----------------------------------------------------------------------------

export const submitCodeForGrading = async (
  provider,
  apiKey,
  challengeDescription,
  sectionTitle,
  code,
  version = 'latest',
  customModel = '',
  customEndpoint = '',
  customHeaders = '',
  language = 'JavaScript',
  starterCode = '',
) => {
  if (!apiKey) throw new Error('API key is required')

  const resolvedProvider = resolveProviderKey(provider)
  const endpoint = resolveEndpoint(resolvedProvider, customEndpoint)
  const requestData = formatGradeRequest(
    resolvedProvider,
    challengeDescription,
    sectionTitle,
    code,
    version,
    customModel,
    language,
    starterCode,
  )
  const headers = getHeaders(resolvedProvider, apiKey, customHeaders)

  try {
    const response = isDevelopment
      ? await axios.post(endpoint, requestData, { headers })
      : await axios.post(PROXY_API_URL, { target: endpoint, data: requestData, headers })
    return extractResponseText(resolvedProvider, response.data)
  } catch (error) {
    console.error('AI API error:', error)
    const errorMsg =
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      error.message ||
      'An unknown error occurred'
    throw new Error(`AI service error: ${errorMsg}`)
  }
}

export const validateApiKey = (provider, apiKey) => {
  const resolved = resolveProviderKey(provider)
  const entry = getProvider(resolved)

  if (resolved === 'ollama') return true
  if (resolved === 'ollama' && apiKey === 'OLLAMA-LOCAL-NO-KEY-REQUIRED') return true
  if (!apiKey || apiKey.trim() === '') return false

  if (resolved === 'other') return apiKey.length > 0

  if (entry) {
    switch (entry.family) {
      case 'claude':
        return apiKey.startsWith('sk-ant')
      case 'openai':
        return apiKey.startsWith('sk-')
      case 'gemini':
        return apiKey.length > 20 && /^[a-zA-Z0-9_-]+$/.test(apiKey)
      default:
        // Mistral-specific: old validator required `mis_` prefix. Modern
        // Mistral keys use different formats, so fall through to generic
        // length check.
        return apiKey.length > 20
    }
  }
  return apiKey.length > 20
}

export const testApiConnection = async (
  provider,
  apiKey,
  customModel = '',
  customEndpoint = '',
  customHeaders = '',
  version = '',
) => {
  const resolvedProvider = resolveProviderKey(provider)
  if (resolvedProvider === 'ollama') return true

  if (!validateApiKey(resolvedProvider, apiKey)) throw new Error('Invalid API key format')

  const endpoint = resolveEndpoint(resolvedProvider, customEndpoint)
  const entry = getProvider(resolvedProvider)
  const family = entry ? entry.family : 'custom'
  const testPrompt = "Hello, this is a connection test. Please respond with 'OK'."
  const model = resolveModel(resolvedProvider, version, customModel)

  let requestData
  switch (family) {
    case 'claude':
      requestData = { model, max_tokens: 10, messages: [{ role: 'user', content: testPrompt }] }
      break
    case 'gemini':
      requestData = {
        model,
        contents: [{ role: 'user', parts: [{ text: testPrompt }] }],
      }
      break
    case 'cohere':
      requestData = { model, message: testPrompt, chat_history: [] }
      break
    case 'ollama':
      requestData = {
        model,
        prompt: `System: You are a helpful assistant.\n\nUser: ${testPrompt}`,
        stream: false,
      }
      break
    default:
      requestData = { model, max_tokens: 10, messages: [{ role: 'user', content: testPrompt }] }
  }

  const headers = getHeaders(resolvedProvider, apiKey, customHeaders)

  try {
    const response = isDevelopment
      ? await axios.post(endpoint, requestData, { headers })
      : await axios.post(PROXY_API_URL, { target: endpoint, data: requestData, headers })
    return !!response.data
  } catch (error) {
    console.error('API connection test failed:', error)
    const errorMsg =
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      error.message ||
      'API connection test failed'
    throw new Error(`Connection test failed: ${errorMsg}`)
  }
}

// Re-exported for legacy callers (ChallengeView.vue imports MODEL_MAPPINGS).
export { API_ENDPOINTS, MODEL_MAPPINGS } from './aiProviders'

// Re-export the catalogue map for any component that wants to render richer
// UI from provider metadata (cost tier, deprecated flag, etc.). Prefer
// importing from aiProviders.js directly.
export { PROVIDERS }
