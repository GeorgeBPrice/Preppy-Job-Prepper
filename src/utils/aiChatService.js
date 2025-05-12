import axios from 'axios'

// Base endpoints for different AI providers
const API_ENDPOINTS = {
  'claude-3-5-sonnet': 'https://api.anthropic.com/v1/messages',
  'claude-3-7-sonnet': 'https://api.anthropic.com/v1/messages',
  'claude-3-opus': 'https://api.anthropic.com/v1/messages',
  'gpt-4': 'https://api.openai.com/v1/chat/completions',
  'gpt-4o': 'https://api.openai.com/v1/chat/completions',
  'gpt-3.5-turbo': 'https://api.openai.com/v1/chat/completions',
  'mistral-large': 'https://api.mistral.ai/v1/chat/completions',
  'gemini-1.5-pro': 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro',
  other: 'custom-endpoint',
}

// AI model mappings
export const CHAT_MODEL_MAPPINGS = {
  'claude-3-5-sonnet': 'claude-3-5-sonnet-20240620',
  'claude-3-7-sonnet': 'claude-3-7-sonnet-20250219',
  'claude-3-opus': 'claude-3-opus-20240229',
  'gpt-4': 'gpt-4-turbo-2024-04-09',
  'gpt-4o': 'gpt-4o-2024-05-13',
  'gpt-3.5-turbo': 'gpt-3.5-turbo-0613',
  'mistral-large': 'mistral-large-latest',
  'gemini-1.5-pro': 'gemini-1.5-pro-latest',
  other: 'custom-model',
}

// Check for development mode based on URL or explicit flag (dev only)
const isDevelopment =
  typeof window !== 'undefined' &&
  (window.ENV === 'development' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1')

// Proxy API endpoint URL - only used in production
const PROXY_API_URL = '/api/proxy'

// Dynamic system prompt function that incorporates the topic
const getSystemPrompt = (topic) => {
  return `You are a helpful ${topic} education assistant. 
Your goal is to help the student understand ${topic} concepts and programming techniques.
Provide clear, accurate, and concise explanations.
When explaining code, use simple examples that illustrate the concept clearly.
If you don't know something, say so rather than making up an answer.
Format your responses using markdown for readability.`
}

// Default system prompt for backwards compatibility
const DEFAULT_SYSTEM_PROMPT = getSystemPrompt()

/**
 * Format the AI request based on provider and conversation history
 */
const formatChatRequest = (
  provider,
  messages,
  systemPrompt = DEFAULT_SYSTEM_PROMPT,
  version,
  customModel,
) => {
  // Get the actual model version to use
  const modelToUse =
    provider === 'other' && customModel ? customModel : version || CHAT_MODEL_MAPPINGS[provider]

  // Format request for Anthropic Claude models
  if (provider.startsWith('claude')) {
    const systemMessage = messages.find((msg) => msg.role === 'system')?.content || systemPrompt

    // Filter out any system messages (Claude doesn't accept them in messages array)
    const userAssistantMessages = messages
      .filter((msg) => msg.role !== 'system')
      .map((msg) => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content,
      }))

    // Use Claude's expected format with system at top level
    return {
      model: modelToUse,
      max_tokens: 4000,
      system: systemMessage,
      messages: userAssistantMessages,
    }
  }

  // Format request for OpenAI models (GPT)
  else if (provider.startsWith('gpt')) {
    return {
      model: modelToUse,
      max_tokens: 4000,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
    }
  }

  // Format for Mistral models
  else if (provider === 'mistral-large') {
    return {
      model: modelToUse,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
    }
  }

  // Format for Gemini
  else if (provider === 'gemini-1.5-pro') {
    const geminiMessages = messages.map((msg) => ({
      role: msg.role === 'system' ? 'user' : msg.role,
      parts: [{ text: msg.content }],
    }))

    // Add system prompt
    return {
      model: modelToUse,
      contents: [{ role: 'user', parts: [{ text: systemPrompt }] }, ...geminiMessages],
    }
  }

  // Generic format for other models including custom ones
  else {
    return {
      model: modelToUse,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
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
 * Send a message to the AI and get a response
 */
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

  // Use provided system prompt or generate one with the current topic
  const actualSystemPrompt = systemPrompt || getSystemPrompt(topic)

  const requestData = formatChatRequest(
    provider,
    messages,
    actualSystemPrompt,
    version,
    customModel,
  )
  const headers = getHeaders(provider, apiKey, customHeaders)

  try {
    // In development mode with .env file containing ENV=development, this call APIs directly
    // In production, we use the proxy endpoint (vercel proxy)
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
    console.error('AI Chat API error:', error)
    const errorMsg =
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      error.message ||
      'An unknown error occurred'
    throw new Error(`AI chat service error: ${errorMsg}`)
  }
}

/**
 * Validate API key format
 */
export const validateChatApiKey = (provider, apiKey) => {
  if (!apiKey || apiKey.trim() === '') {
    return false
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
  if (provider === 'mistral-large') {
    return apiKey.length > 20
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
 */
export const testChatApiConnection = async (
  provider,
  apiKey,
  customModel = '',
  customEndpoint = '',
  customHeaders = '',
) => {
  if (!validateChatApiKey(provider, apiKey)) {
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
  const messages = [{ role: 'user', content: testPrompt }]

  const requestData = formatChatRequest(provider, messages, DEFAULT_SYSTEM_PROMPT, '', customModel)

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

    // Return true if we reveived a proper response
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
