import axios from 'axios'
import { getProvider, resolveProviderKey, isDevelopment } from './aiProviders'
import { buildChatSystemPrompt, wrapUserInput } from './promptBuilder'

// Proxy API endpoint URL - only used in production
const PROXY_API_URL = '/api/proxy'

// Ollama Stream Handler for model-specific streaming support
// (kept local because Ollama chunk parsing is idiosyncratic per model)
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

    const optimizations = {
      gemma: { temperature: 0.7, top_p: 0.9, frequency_penalty: 0.0, presence_penalty: 0.0 },
      qwen: { temperature: 0.8, top_p: 0.9, repetition_penalty: 1.1 },
      deepseek: { temperature: 0.7, top_p: 0.9, max_tokens: 4096 },
      llama: { temperature: 0.8, top_p: 0.9, frequency_penalty: 0.0 },
      mistral: { temperature: 0.7, top_p: 0.9, max_tokens: 4096 },
    }

    return { ...baseParams, ...(optimizations[modelType] || optimizations['llama']) }
  }

  processChunk(chunk, config, onUpdate) {
    try {
      if (chunk.startsWith('data: ')) chunk = chunk.slice(6)
      if (chunk === '[DONE]' || chunk === 'data: [DONE]') return

      let parsed
      try {
        parsed = JSON.parse(chunk)
      } catch {
        if (config.filterMetadata) {
          const responseMatch = chunk.match(/"response":"([^"]*)"/)
          if (responseMatch) {
            onUpdate(responseMatch[1])
            return
          }
        }
        console.warn('Invalid JSON chunk, treating as raw text:', chunk)
        onUpdate(chunk)
        return
      }

      let textDelta = ''

      if (config.filterMetadata && config.metadataFields) {
        if (parsed[config.responseField]) textDelta = parsed[config.responseField]
      } else {
        if (parsed[config.responseField]) {
          textDelta = parsed[config.responseField]
        } else if (parsed.choices && parsed.choices[0]) {
          textDelta = parsed.choices[0].delta?.content || parsed.choices[0].text || ''
        } else if (parsed.content) {
          textDelta = parsed.content
        } else if (parsed.text) {
          textDelta = parsed.text
        } else if (parsed.message && parsed.message.content) {
          textDelta = parsed.message.content
        }
      }

      if (config.requiresSpecialParsing) textDelta = this.applySpecialParsing(textDelta, config)
      if (textDelta && onUpdate) onUpdate(textDelta)
    } catch (error) {
      console.error('Error processing chunk:', error, chunk)
    }
  }

  applySpecialParsing(text, config) {
    switch (config.markdownMode) {
      case 'code-aware':
        return this.fixCodeBlockParsing(text)
      case 'tolerant':
        return this.applyTolerantParsing(text)
      default:
        return text
    }
  }

  fixCodeBlockParsing(text) {
    if (text.includes('```') && !text.match(/```[\s\S]*?```/)) {
      text = text.replace(/```([^`]*?)$/, '```$1\n')
    }
    return text
  }

  applyTolerantParsing(text) {
    text = text.replace(/\*\*([^*]+)$/, '**$1**')
    text = text.replace(/\*([^*]+)$/, '*$1*')
    text = text.replace(/```([^`]+)$/, '```$1\n```')
    return text
  }
}

const ollamaHandler = new OllamaStreamHandler()

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function resolveModel(providerKey, version, customModel) {
  const entry = getProvider(providerKey)
  if (providerKey === 'other' && customModel) return customModel
  if (version) return version
  return entry ? entry.model : null
}

/**
 * Wrap every user-role message in <user_input> tags so the model treats
 * user content as untrusted data (per §3.1 of the audit). Assistant and
 * system turns pass through unchanged. We rebuild the array at send time
 * rather than mutating storage so the UI keeps displaying the raw text.
 */
function tagWrapMessages(messages) {
  return messages.map((msg) => {
    if (msg.role === 'user' && msg.content) {
      return { ...msg, content: wrapUserInput(msg.content) }
    }
    return msg
  })
}

// -----------------------------------------------------------------------------
// Request shaping — dispatched on family, not string prefix
// -----------------------------------------------------------------------------

function formatChatRequest(providerKey, messages, systemPrompt, version, customModel, stream) {
  const entry = getProvider(providerKey)
  const family = entry ? entry.family : 'custom'
  const model = resolveModel(providerKey, version, customModel)
  const wrappedMessages = tagWrapMessages(messages)

  switch (family) {
    case 'claude':
      return {
        model,
        max_tokens: 4000,
        // Claude accepts system as a top-level field; never as a message turn.
        system: systemPrompt,
        messages: wrappedMessages
          .filter((m) => m.role !== 'system')
          .map((m) => ({
            role: m.role === 'assistant' ? 'assistant' : 'user',
            content: m.content,
          })),
        stream,
      }

    case 'openai':
    case 'openai-compat':
      return {
        model,
        max_tokens: 4000,
        messages: [
          { role: 'system', content: systemPrompt },
          ...wrappedMessages.filter((m) => m.role !== 'system'),
        ],
        stream,
      }

    case 'gemini': {
      // Gemini uses `system_instruction` as a top-level field — it should NOT
      // be faked as a user turn (that was the bug in the previous impl).
      const contents = wrappedMessages
        .filter((m) => m.role !== 'system')
        .map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }))
      return {
        model,
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents,
      }
    }

    case 'cohere': {
      // Cohere v1/chat shape: preamble for system, chat_history for prior turns,
      // message for the current turn.
      const userAssistant = wrappedMessages.filter((m) => m.role !== 'system')
      const lastUser = [...userAssistant].reverse().find((m) => m.role === 'user')
      const history = userAssistant
        .slice(0, userAssistant.lastIndexOf(lastUser))
        .map((m) => ({
          role: m.role === 'assistant' ? 'CHATBOT' : 'USER',
          message: m.content,
        }))
      return {
        model,
        preamble: systemPrompt,
        chat_history: history,
        message: lastUser ? lastUser.content : '',
        stream,
      }
    }

    case 'ollama': {
      // Ollama /api/generate flattens the whole conversation into a single
      // prompt string. Honour the systemPrompt arg by prepending it with a
      // "System:" header; this used to silently fall back to DEFAULT.
      const ollamaModel = version || customModel || entry.model
      let prompt = ''
      if (systemPrompt) prompt += `System: ${systemPrompt}\n\n`
      for (const msg of wrappedMessages.filter((m) => m.role !== 'system')) {
        if (msg.role === 'user') prompt += `User: ${msg.content}\n\n`
        else if (msg.role === 'assistant') prompt += `Assistant: ${msg.content}\n\n`
      }
      const optimized = ollamaHandler.getOptimizedParams(ollamaModel, {
        temperature: 0.7,
        top_p: 0.9,
      })
      return { model: ollamaModel, prompt: prompt.trim(), stream, options: optimized }
    }

    case 'custom':
    default:
      // Generic OpenAI-shape fallback for unknown/custom providers.
      return {
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          ...wrappedMessages.filter((m) => m.role !== 'system'),
        ],
        stream,
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
      // Try common shapes.
      if (data.choices?.[0]?.message?.content) return data.choices[0].message.content
      if (data.content?.[0]?.text) return data.content[0].text
      if (data.candidates?.[0]?.content?.parts) return data.candidates[0].content.parts[0].text
      if (data.text || data.result || data.output || data.generated_text) {
        return data.text || data.result || data.output || data.generated_text
      }
      return JSON.stringify(data)
  }
}

// -----------------------------------------------------------------------------
// Stream chunk parsing — also dispatched on family
// -----------------------------------------------------------------------------

export const processStreamChunk = (chunk, providerKey, version, customModel) => {
  try {
    const entry = getProvider(providerKey)
    const family = entry ? entry.family : 'custom'

    switch (family) {
      case 'openai':
      case 'openai-compat':
      case 'cohere':
      case 'custom': {
        // SSE with {choices:[{delta:{content}}]} shape (most OpenAI-compat).
        const chunkStr = chunk.toString()
        if (!chunkStr.trim()) return ''

        let content = ''
        const lines = chunkStr.split('\n')
        for (const line of lines) {
          if (!line.trim() || line.includes('[DONE]')) continue
          if (line.startsWith('data:')) {
            try {
              const jsonData = line.replace(/^data:\s*/, '').trim()
              if (!jsonData) continue
              const data = JSON.parse(jsonData)
              // Cohere v1/chat streaming sends {event_type:'text-generation', text}
              // alongside other event types — take the text only on that event.
              const cohereDelta =
                data.event_type === 'text-generation' ? data.text || '' : ''
              const delta =
                data.choices?.[0]?.delta?.content ||
                data.delta?.text ||
                cohereDelta ||
                ''
              if (delta) content += delta
            } catch (err) {
              console.debug('Skipping invalid JSON in stream:', err.message)
            }
          }
        }
        return content
      }

      case 'claude': {
        const chunkStr = chunk.toString()
        if (!chunkStr.trim()) return ''

        let content = ''
        const lines = chunkStr.split('\n')
        for (const line of lines) {
          if (!line.trim()) continue
          if (line.startsWith('data:')) {
            try {
              const jsonData = line.replace(/^data:\s*/, '').trim()
              if (!jsonData) continue
              const data = JSON.parse(jsonData)
              if (data.type === 'content_block_delta' && data.delta?.type === 'text_delta') {
                content += data.delta.text || ''
              }
              // message_start / content_block_start/stop / message_delta /
              // message_stop / ping are control events we silently skip.
            } catch (err) {
              console.debug('Skipping invalid JSON in Claude stream:', err.message)
            }
          }
        }
        return content
      }

      case 'gemini': {
        // Gemini SSE: lines like `data: { "candidates": [...] }`.
        const chunkStr = chunk.toString()
        if (!chunkStr.trim()) return ''

        let content = ''
        const lines = chunkStr.split('\n')
        for (const line of lines) {
          if (!line.startsWith('data:')) continue
          try {
            const jsonData = line.replace(/^data:\s*/, '').trim()
            if (!jsonData) continue
            const data = JSON.parse(jsonData)
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
            if (text) content += text
          } catch (err) {
            console.debug('Skipping invalid JSON in Gemini stream:', err.message)
          }
        }
        return content
      }

      case 'ollama': {
        const model = version || customModel || entry.model
        const config = ollamaHandler.getModelConfig(model)
        let content = ''
        ollamaHandler.processChunk(chunk, config, (text) => {
          content += text
        })
        return content
      }

      default:
        return ''
    }
  } catch (err) {
    console.error('Error processing stream chunk:', err)
    return ''
  }
}

// -----------------------------------------------------------------------------
// Public API — signatures preserved for back-compat with store/aiChat.js
// -----------------------------------------------------------------------------

function resolveEndpoint(providerKey, customEndpoint, stream) {
  if (providerKey === 'other') {
    if (!customEndpoint) throw new Error('Custom endpoint is required for custom provider')
    return customEndpoint
  }
  const entry = getProvider(providerKey)
  if (!entry) throw new Error(`Unsupported AI provider: ${providerKey}`)
  // Gemini has a separate streaming endpoint.
  if (stream && entry.family === 'gemini' && entry.streamEndpoint) return entry.streamEndpoint
  return entry.endpoint
}

export const streamChatMessage = async (
  messages,
  provider,
  apiKey,
  systemPrompt,
  version = '',
  customModel = '',
  customEndpoint = '',
  customHeaders = '',
  topic,
  onChunk,
) => {
  if (!apiKey) throw new Error('API key is required')

  const resolvedProvider = resolveProviderKey(provider)
  const endpoint = resolveEndpoint(resolvedProvider, customEndpoint, true)
  const actualSystemPrompt = systemPrompt || buildChatSystemPrompt({ topic })

  const requestData = formatChatRequest(
    resolvedProvider,
    messages,
    actualSystemPrompt,
    version,
    customModel,
    true,
  )
  const headers = getHeaders(resolvedProvider, apiKey, customHeaders)

  try {
    if (isDevelopment) {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestData),
      })
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          `API error: ${errorData.error?.message || errorData.message || response.statusText}`,
        )
      }
      if (!response.body) throw new Error('ReadableStream not supported by your browser')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        const content = processStreamChunk(chunk, resolvedProvider, version, customModel)
        if (content) {
          fullText += content
          onChunk(content)
        }
      }
      return fullText
    }

    // Production path via proxy.
    try {
      const response = await fetch(PROXY_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: endpoint, data: requestData, headers, stream: true }),
      })
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(`API error: ${errorData.message || response.statusText}`)
      }
      if (!response.body) throw new Error('ReadableStream not supported by your browser')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ''
      let buffer = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        buffer += chunk
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''
        for (const line of lines) {
          if (!line.trim()) continue
          const content = processStreamChunk(line, resolvedProvider, version, customModel)
          if (content) {
            fullText += content
            onChunk(content)
          }
        }
      }
      if (buffer.trim()) {
        const content = processStreamChunk(buffer, resolvedProvider, version, customModel)
        if (content) {
          fullText += content
          onChunk(content)
        }
      }
      return fullText
    } catch (error) {
      console.warn('Streaming error, falling back to regular request:', error)
      return await sendChatMessage(
        messages,
        provider,
        apiKey,
        systemPrompt,
        version,
        customModel,
        customEndpoint,
        customHeaders,
        topic,
      )
    }
  } catch (error) {
    console.error('AI Chat API error:', error)
    const errorMsg =
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      error.message ||
      'An unknown error occurred'
    throw new Error(`AI chat service error: ${errorMsg}`)
  }
}

export const sendChatMessage = async (
  messages,
  provider,
  apiKey,
  systemPrompt,
  version = '',
  customModel = '',
  customEndpoint = '',
  customHeaders = '',
  topic,
) => {
  if (!apiKey) throw new Error('API key is required')

  const resolvedProvider = resolveProviderKey(provider)
  const endpoint = resolveEndpoint(resolvedProvider, customEndpoint, false)
  const actualSystemPrompt = systemPrompt || buildChatSystemPrompt({ topic })

  const requestData = formatChatRequest(
    resolvedProvider,
    messages,
    actualSystemPrompt,
    version,
    customModel,
    false,
  )
  const headers = getHeaders(resolvedProvider, apiKey, customHeaders)

  try {
    const response = isDevelopment
      ? await axios.post(endpoint, requestData, { headers })
      : await axios.post(PROXY_API_URL, { target: endpoint, data: requestData, headers })
    return extractResponseText(resolvedProvider, response.data)
  } catch (error) {
    console.error('AI Chat API error:', error)
    const errorMsg =
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      error.message ||
      'An unknown error occurred'
    throw new Error(`AI chat service error: ${errorMsg}`)
  }
}

export const validateChatApiKey = (provider, apiKey) => {
  const resolved = resolveProviderKey(provider)
  const entry = getProvider(resolved)

  // Ollama: no key required.
  if (resolved === 'ollama') return true
  if (!apiKey || apiKey.trim() === '') return false

  // Custom provider: any non-empty string.
  if (resolved === 'other') return apiKey.length > 0

  // Provider-family-specific format checks.
  if (entry) {
    switch (entry.family) {
      case 'claude':
        return apiKey.startsWith('sk-ant')
      case 'openai':
        return apiKey.startsWith('sk-')
      case 'gemini':
        return apiKey.length > 20 && /^[a-zA-Z0-9_-]+$/.test(apiKey)
      default:
        return apiKey.length > 20
    }
  }
  return apiKey.length > 20
}

export const testChatApiConnection = async (
  provider,
  apiKey,
  customModel = '',
  customEndpoint = '',
  customHeaders = '',
) => {
  if (!validateChatApiKey(provider, apiKey)) throw new Error('Invalid API key format')

  const resolvedProvider = resolveProviderKey(provider)
  const endpoint = resolveEndpoint(resolvedProvider, customEndpoint, false)
  const testPrompt = "Hello, this is a connection test. Please respond with 'OK'."
  const messages = [{ role: 'user', content: testPrompt }]

  const requestData = formatChatRequest(
    resolvedProvider,
    messages,
    buildChatSystemPrompt({ topic: 'JavaScript' }),
    '',
    customModel,
    false,
  )
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

// Re-exported for any legacy callers. Prefer importing from aiProviders.js directly.
export { API_ENDPOINTS, MODEL_MAPPINGS as CHAT_MODEL_MAPPINGS } from './aiProviders'
