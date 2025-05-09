import axios from 'axios'

// Base endpoints for different AI providers
const API_ENDPOINTS = {
  'claude-3-5-sonnet': 'https://api.anthropic.com/v1/messages',
  'claude-3-7-sonnet': 'https://api.anthropic.com/v1/messages',
  'claude-3-opus': 'https://api.anthropic.com/v1/messages',
  'claude-3-haiku': 'https://api.anthropic.com/v1/messages',
  'gpt-4': 'https://api.openai.com/v1/chat/completions',
  'gpt-4o': 'https://api.openai.com/v1/chat/completions',
  'gpt-o1': 'https://api.openai.com/v1/chat/completions',
  'deepseek-reasoner': 'https://api.deepseek.com/chat/completions',
  'grok-3': 'https://api.grok.xai.com/v1/completions',
  'mistral-large': 'https://api.mistral.ai/v1/chat/completions',
  'llama-3': 'https://api.llama.ai/v1/chat/completions',
  'gemini-1.5-pro': 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro',
  other: 'custom-endpoint', // This will be overridden with the user's custom endpoint
}

// AI model mappings (export so we can hook into the models in the UI)
export const MODEL_MAPPINGS = {
  'claude-3-5-sonnet': 'claude-3-5-sonnet-20240620',
  'claude-3-7-sonnet': 'claude-3-7-sonnet-20250219',
  'claude-3-opus': 'claude-3-opus-20240229',
  'claude-3-haiku': 'claude-3-haiku-20240307',
  'gpt-4': 'gpt-4-turbo-2024-04-09',
  'gpt-4o': 'gpt-4o-2024-05-13',
  'gpt-o1': 'gpt-o1-2024-05-13',
  'deepseek-reasoner': 'deepseek-reasoner:latest',
  'grok-3': 'grok-3',
  'mistral-large': 'mistral-large-latest',
  'llama-3': 'llama-3-70b-8192',
  'gemini-1.5-pro': 'gemini-1.5-pro-latest',
  other: 'custom-model', // This will be overridden with the user's custom model
}

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
    const response = await axios.post(endpoint, requestData, { headers })
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
) => {
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
  const modelToUse = provider === 'other' && customModel ? customModel : MODEL_MAPPINGS[provider]

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
  } else {
    requestData = {
      model: modelToUse,
      max_tokens: 10,
      messages: [{ role: 'user', content: testPrompt }],
    }
  }

  const headers = getHeaders(provider, apiKey, customHeaders)

  try {
    const response = await axios.post(endpoint, requestData, { headers })
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
