import axios from 'axios'

// Base endpoints for different AI providers
const API_ENDPOINTS = {
  // Anthropic Models
  'claude-3-5-sonnet': 'https://api.anthropic.com/v1/messages',
  'claude-3-7-sonnet': 'https://api.anthropic.com/v1/messages',
  'claude-3-opus': 'https://api.anthropic.com/v1/messages',
  'claude-3-haiku': 'https://api.anthropic.com/v1/messages',
  'claude-opus-4': 'https://api.anthropic.com/v1/messages',
  'claude-sonnet-4': 'https://api.anthropic.com/v1/messages',

  // OpenAI Models
  'gpt-4': 'https://api.openai.com/v1/chat/completions',
  'gpt-4o': 'https://api.openai.com/v1/chat/completions',
  'gpt-4.5': 'https://api.openai.com/v1/chat/completions',
  'gpt-o1': 'https://api.openai.com/v1/chat/completions',
  'gpt-o3': 'https://api.openai.com/v1/chat/completions',
  'gpt-o4-mini': 'https://api.openai.com/v1/chat/completions',

  // Google Models
  'gemini-1.5-pro':
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent',
  'gemini-2.5-pro':
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent',
  'gemini-2.5-flash':
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',

  // Other Models
  'deepseek-reasoner': 'https://api.deepseek.com/v1/chat/completions',
  'deepseek-r1-distill': 'https://api.deepseek.com/v1/chat/completions',
  'grok-3': 'https://api.x.ai/v1/chat/completions',
  'mistral-large': 'https://api.mistral.ai/v1/chat/completions',
  'mistral-large-2': 'https://api.mistral.ai/v1/chat/completions',
  'qwen-2.5': 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
  'cohere-command-r-plus': 'https://api.cohere.ai/v1/generate',

  // Meta Models (via Together AI)
  'llama-3': 'https://api.together.xyz/v1/chat/completions',
  'llama-3.1': 'https://api.together.xyz/v1/chat/completions',
  'llama-3.2': 'https://api.together.xyz/v1/chat/completions',

  // Local
  ollama: 'http://localhost:11434/api/generate',
  other: 'custom-endpoint', // This will be overridden with the user's custom endpoint
}

// Check for development mode based on URL or explicit flag (dev only)
const isDevelopment =
  typeof window !== 'undefined' &&
  (window.ENV === 'development' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1')

// Proxy API endpoint URL - only used in production
const PROXY_API_URL = '/api/proxy'

// AI model mappings (export so we can hook into the models in the UI)
export const MODEL_MAPPINGS = {
  // Anthropic Models
  'claude-3-5-sonnet': 'claude-3-5-sonnet-20240620',
  'claude-3-7-sonnet': 'claude-3-7-sonnet-20250219',
  'claude-3-opus': 'claude-3-opus-20240229',
  'claude-3-haiku': 'claude-3-haiku-20240307',
  'claude-opus-4': 'claude-3-opus-20240229',
  'claude-sonnet-4': 'claude-3-5-sonnet-20240620',

  // OpenAI Models
  'gpt-4': 'gpt-4-turbo-2024-04-09',
  'gpt-4o': 'gpt-4o-2024-05-13',
  'gpt-4.5': 'gpt-4o-mini-2024-07-18',
  'gpt-o1': 'gpt-o1-2024-05-13',
  'gpt-o3': 'gpt-o3-2024-07-18',
  'gpt-o4-mini': 'gpt-o4-mini-2024-07-18',

  // Google Models
  'gemini-1.5-pro': 'gemini-1.5-pro-latest',
  'gemini-2.5-pro': 'gemini-2.5-pro-latest',
  'gemini-2.5-flash': 'gemini-2.5-flash-latest',

  // Other Models
  'deepseek-reasoner': 'deepseek-reasoner:latest',
  'deepseek-r1-distill': 'deepseek-r1-distill:latest',
  'grok-3': 'grok-3',
  'mistral-large': 'mistral-large-latest',
  'mistral-large-2': 'mistral-large-2-latest',
  'qwen-2.5': 'qwen2.5-72b-instruct',
  'cohere-command-r-plus': 'command-r-plus',

  // Meta Models
  'llama-3': 'meta-llama/Llama-3-70b-chat-hf',
  'llama-3.1': 'meta-llama/Llama-3.1-70b-chat-hf',
  'llama-3.2': 'meta-llama/Llama-3.2-70b-chat-hf',

  // Local
  ollama: 'llama2',
  other: 'custom-model',
}

// Ollama Stream Handler for model-specific streaming support
class OllamaStreamHandler {
  constructor() {
    // Model-specific configurations
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

  // Detect model type from model name
  detectModelType(modelName) {
    const lowercaseName = modelName.toLowerCase()
    if (lowercaseName.includes('gemma')) return 'gemma'
    if (lowercaseName.includes('qwen')) return 'qwen'
    if (lowercaseName.includes('deepseek')) return 'deepseek'
    if (lowercaseName.includes('llama')) return 'llama'
    if (lowercaseName.includes('mistral')) return 'mistral'
    return 'default'
  }

  // Get configuration for the detected model
  getModelConfig(modelName) {
    const modelType = this.detectModelType(modelName)
    return this.modelConfigs[modelType] || this.modelConfigs['llama']
  }

  // Get optimized parameters for different models
  getOptimizedParams(modelName, baseParams = {}) {
    const modelType = this.detectModelType(modelName)

    const optimizations = {
      gemma: {
        temperature: 0.3,
        top_p: 0.9,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
      qwen: {
        temperature: 0.3,
        top_p: 0.9,
        repetition_penalty: 1.1,
      },
      deepseek: {
        temperature: 0.3,
        top_p: 0.9,
        max_tokens: 4096,
      },
      llama: {
        temperature: 0.3,
        top_p: 0.9,
        frequency_penalty: 0.0,
      },
      mistral: {
        temperature: 0.3,
        top_p: 0.9,
        max_tokens: 4096,
      },
    }

    return {
      ...baseParams,
      ...(optimizations[modelType] || optimizations['llama']),
    }
  }

  // Process individual chunks based on model configuration
  processChunk(chunk, config, onUpdate) {
    try {
      if (chunk.startsWith('data: ')) {
        chunk = chunk.slice(6)
      }

      if (chunk === '[DONE]' || chunk === 'data: [DONE]') {
        return
      }

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
        if (parsed[config.responseField]) {
          textDelta = parsed[config.responseField]
        }
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

      if (config.requiresSpecialParsing) {
        textDelta = this.applySpecialParsing(textDelta, config)
      }

      if (textDelta && onUpdate) {
        onUpdate(textDelta)
      }
    } catch (error) {
      console.error('Error processing chunk:', error, chunk)
    }
  }

  // Apply special parsing for certain models
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

  // Fix code block parsing issues
  fixCodeBlockParsing(text) {
    if (text.includes('```') && !text.match(/```[\s\S]*?```/)) {
      text = text.replace(/```([^`]*?)$/, '```$1\n')
    }
    return text
  }

  // Apply tolerant parsing for models with markdown issues
  applyTolerantParsing(text) {
    text = text.replace(/\*\*([^*]+)$/, '**$1**')
    text = text.replace(/\*([^*]+)$/, '*$1*')
    text = text.replace(/```([^`]+)$/, '```$1\n```')
    return text
  }
}

// Create a singleton instance
const ollamaHandler = new OllamaStreamHandler()

/**
 * Format the message for grade request based on provider
 */
const formatGradeRequest = (
  provider,
  challengeDescription,
  sectionTitle,
  code,
  version,
  customModel,
) => {
  const basePrompt = `I'm working on a JavaScript programming challenge about "${sectionTitle}". 
  
Challenge description: "${challengeDescription}"

Please grade my solution and provide feedback. Focus on:
1. Correctness: Does it meet all requirements?
2. Code quality: Is it well-structured, efficient, and readable?
3. JavaScript best practices: Am I following modern JavaScript standards?
4. Potential improvements: How could I enhance this solution?

My solution code:
\`\`\`javascript
${code}
\`\`\`

Please provide a detailed review, pointing out both strengths and areas for improvement. Include suggestions for making my code more professional and efficient.`

  // Get the actual model version to use
  const modelToUse =
    provider === 'other' && customModel
      ? customModel
      : version !== 'latest'
        ? version
        : MODEL_MAPPINGS[provider]

  // Format request for Anthropic Claude models
  if (provider.startsWith('claude')) {
    return {
      model: modelToUse,
      max_tokens: 4000,
      messages: [{ role: 'user', content: basePrompt }],
    }
  }

  // Format request for OpenAI models (GPT)
  else if (provider.startsWith('gpt')) {
    return {
      model: modelToUse,
      max_tokens: 4000,
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful JavaScript expert who provides clear, accurate code reviews and feedback.',
        },
        { role: 'user', content: basePrompt },
      ],
    }
  }

  // Format for Mistral models
  else if (provider === 'mistral-large') {
    return {
      model: modelToUse,
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful JavaScript expert who provides clear, accurate code reviews and feedback.',
        },
        { role: 'user', content: basePrompt },
      ],
    }
  }

  // Format for Gemini
  else if (provider === 'gemini-1.5-pro') {
    return {
      model: modelToUse,
      contents: [
        {
          role: 'user',
          parts: [{ text: basePrompt }],
        },
      ],
    }
  }

  // Format for Ollama
  else if (provider === 'ollama') {
    // Convert to Ollama format
    let prompt = `System: You are a helpful JavaScript expert who provides clear, accurate code reviews and feedback.\n\nUser: ${basePrompt}`

    // For Ollama, use the version field as the model name
    const modelToUse = version || MODEL_MAPPINGS.ollama

    // Get model-specific optimized parameters
    const optimizedParams = ollamaHandler.getOptimizedParams(modelToUse, {
      temperature: 0.2,
      top_p: 0.95,
    })

    return {
      model: modelToUse,
      prompt: prompt.trim(),
      stream: false,
      options: optimizedParams,
    }
  }

  // Format for DeepSeek
  else if (provider === 'deepseek-reasoner') {
    return {
      model: modelToUse,
      messages: [
        {
          role: 'system',
          content:
            'You are a JavaScript code expert. Review the code and provide detailed, constructive feedback.',
        },
        { role: 'user', content: basePrompt },
      ],
    }
  }

  // Generic format for other models including custom ones
  else {
    return {
      model: modelToUse,
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful JavaScript expert who provides clear, accurate code reviews and feedback.',
        },
        { role: 'user', content: basePrompt },
      ],
    }
  }
}

/**
 * Get headers based on the provider
 */
const getHeaders = (provider, apiKey, customHeaders) => {
  // Parse custom headers if provided and provider is 'other'
  if (provider === 'other' && customHeaders) {
    try {
      const headers = JSON.parse(customHeaders)
      // Ensure Content-Type is set if not provided
      if (!headers['Content-Type']) {
        headers['Content-Type'] = 'application/json'
      }
      return headers
    } catch (e) {
      console.error('Error parsing custom headers:', e)
      // Fall back to basic headers if parsing fails
      return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      }
    }
  }

  // Standard headers for known providers
  if (provider.startsWith('claude')) {
    return {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    }
  } else if (provider.startsWith('gpt')) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    }
  } else if (provider === 'mistral-large') {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    }
  } else if (provider === 'gemini-1.5-pro') {
    return {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    }
  } else if (provider === 'ollama') {
    // Ollama doesn't require authentication
    return {
      'Content-Type': 'application/json',
    }
  } else {
    // Generic headers for other providers
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    }
  }
}

/**
 * Extract the response text from different AI provider responses
 */
const extractResponseText = (provider, data) => {
  if (provider.startsWith('claude')) {
    return data.content[0].text
  } else if (provider.startsWith('gpt')) {
    return data.choices[0].message.content
  } else if (provider === 'mistral-large') {
    return data.choices[0].message.content
  } else if (provider === 'gemini-1.5-pro') {
    return data.candidates[0].content.parts[0].text
  } else if (provider === 'ollama') {
    // Ollama returns objects with a 'response' field
    return data.response || data.message?.content || ''
  } else if (provider === 'other') {
    // Try to extract from common response formats
    try {
      // OpenAI format
      if (data.choices && data.choices[0]?.message?.content) {
        return data.choices[0].message.content
      }
      // Claude format
      else if (data.content && data.content[0]?.text) {
        return data.content[0].text
      }
      // Google/Anthropic format with 'content'
      else if (data.candidates && data.candidates[0]?.content?.parts) {
        return data.candidates[0].content.parts[0].text
      }
      // Generic text field
      else if (data.text || data.result || data.output || data.generated_text) {
        return data.text || data.result || data.output || data.generated_text
      }
      // Last resort - stringify the response
      else {
        return JSON.stringify(data)
      }
    } catch (e) {
      console.error('Error extracting custom provider response:', e)
      return JSON.stringify(data)
    }
  } else {
    // Generic extraction (most follow OpenAI format)
    return data.choices && data.choices[0] && data.choices[0].message
      ? data.choices[0].message.content
      : JSON.stringify(data)
  }
}

/**
 * Submit code for grading
 */
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
) => {
  if (!apiKey) {
    throw new Error('API key is required')
  }

  // Get endpoint - use custom endpoint if provider is 'other'
  let endpoint = API_ENDPOINTS[provider]
  if (provider === 'other') {
    if (!customEndpoint) {
      throw new Error('Custom endpoint is required for custom provider')
    }
    endpoint = customEndpoint
  }

  if (!endpoint) {
    throw new Error(`Unsupported AI provider: ${provider}`)
  }

  const requestData = formatGradeRequest(
    provider,
    challengeDescription,
    sectionTitle,
    code,
    version,
    customModel,
  )
  const headers = getHeaders(provider, apiKey, customHeaders)

  try {
    let response

    if (isDevelopment) {
      console.log('Using direct API call in development mode')
      response = await axios.post(endpoint, requestData, { headers })
    } else {
      response = await axios.post(PROXY_API_URL, {
        target: endpoint,
        data: requestData,
        headers: headers,
      })
    }

    const responseText = extractResponseText(provider, response.data)
    return responseText
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

/**
 * Validate API key format
 */
export const validateApiKey = (provider, apiKey) => {
  if (!apiKey || apiKey.trim() === '') {
    // For Ollama, we don't need an API key
    if (provider === 'ollama') {
      return true
    }
    return false
  }

  // For Ollama, accept the mock key
  if (provider === 'ollama' && apiKey === 'OLLAMA-LOCAL-NO-KEY-REQUIRED') {
    return true
  }

  // For custom provider, just ensure the key is not empty
  if (provider === 'other') {
    return apiKey.length > 0
  }

  // Claude API keys usually start with sk-ant
  if (provider.startsWith('claude') && !apiKey.startsWith('sk-ant')) {
    return false
  }

  // OpenAI API keys usually start with sk-
  if (provider.startsWith('gpt') && !apiKey.startsWith('sk-')) {
    return false
  }

  // Mistral keys usually start with a specific pattern
  if (provider === 'mistral-large' && !apiKey.startsWith('mis_')) {
    return false
  }

  // Gemini keys vary but are typically long alphanumeric strings
  if (provider === 'gemini-1.5-pro') {
    return apiKey.length > 20 && /^[a-zA-Z0-9_-]+$/.test(apiKey)
  }

  // Simple length check as a basic validation
  return apiKey.length > 20
}

/**
 * Test the API connection with minimal request
 * Returns true if successful, false or throws error otherwise
 */
export const testApiConnection = async (
  provider,
  apiKey,
  customModel = '',
  customEndpoint = '',
  customHeaders = '',
  version = '',
) => {
  // For Ollama, skip validation and return true
  if (provider === 'ollama') {
    return true
  }

  if (!validateApiKey(provider, apiKey)) {
    throw new Error('Invalid API key format')
  }

  // Get endpoint - use custom endpoint if provider is 'other'
  let endpoint = API_ENDPOINTS[provider]
  if (provider === 'other' && customEndpoint) {
    endpoint = customEndpoint
  }

  if (!endpoint) {
    throw new Error(`Unsupported AI provider: ${provider}`)
  }

  // Create a minimal request just to test authentication
  const testPrompt = "Hello, this is a connection test. Please respond with 'OK'."
  let requestData

  // Get the actual model to use
  const modelToUse =
    provider === 'other' ? customModel : provider === 'ollama' ? version : MODEL_MAPPINGS[provider]

  if (provider.startsWith('claude')) {
    requestData = {
      model: modelToUse,
      max_tokens: 10,
      messages: [{ role: 'user', content: testPrompt }],
    }
  } else if (provider === 'gemini-1.5-pro') {
    requestData = {
      model: modelToUse,
      contents: [
        {
          role: 'user',
          parts: [{ text: testPrompt }],
        },
      ],
    }
  } else if (provider === 'ollama') {
    requestData = {
      model: modelToUse,
      prompt: `System: You are a helpful assistant.\n\nUser: ${testPrompt}`,
      stream: false,
    }
  } else {
    requestData = {
      model: modelToUse,
      max_tokens: 10,
      messages: [{ role: 'user', content: testPrompt }],
    }
  }

  const headers = getHeaders(provider, apiKey, customHeaders)

  try {
    let response

    if (isDevelopment) {
      // Direct API call in development
      console.log('Testing API connection directly in development mode')
      response = await axios.post(endpoint, requestData, { headers })
    } else {
      // Use proxy in production
      response = await axios.post(PROXY_API_URL, {
        target: endpoint,
        data: requestData,
        headers: headers,
      })
    }

    return !!response.data // Return true if we got any response
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
