import axios from 'axios'

// Base endpoints for different AI providers
const API_ENDPOINTS = {
  'claude-3-5-sonnet': 'https://api.anthropic.com/v1/messages',
  'claude-3-7-sonnet': 'https://api.anthropic.com/v1/messages',
  'claude-3-opus': 'https://api.anthropic.com/v1/messages',
  'gpt-4': 'https://api.openai.com/v1/chat/completions',
  'gpt-4o': 'https://api.openai.com/v1/chat/completions',
  'gpt-o1': 'https://api.openai.com/v1/chat/completions',
  'deepseek-reasoner': 'https://api.deepseek.com/chat/completions',
  'grok-3': 'https://api.grok.xai.com/v1/completions',
  'mistral-large': 'https://api.mistral.ai/v1/chat/completions',
  'llama-3': 'https://api.llama.ai/v1/chat/completions',
}

// AI model mappings
const MODEL_MAPPINGS = {
  'claude-3-5-sonnet': 'claude-3-5-sonnet-20240620',
  'claude-3-7-sonnet': 'claude-3-7-sonnet-20250219',
  'claude-3-opus': 'claude-3-opus-20240229',
  'gpt-4': 'gpt-4-turbo',
  'gpt-4o': 'gpt-4o-2024-05-13',
  'gpt-o1': 'gpt-o1-2024-05-13',
  'deepseek-reasoner': 'deepseek-reasoner:latest',
  'grok-3': 'grok-3',
  'mistral-large': 'mistral-large-latest',
  'llama-3': 'llama-3-70b-8192',
}

/**
 * Format the message for grade request based on provider
 */
const formatGradeRequest = (provider, challengeDescription, sectionTitle, code, version) => {
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

  // Format request for Anthropic Claude models
  if (provider.startsWith('claude')) {
    return {
      model: version !== 'latest' ? version : MODEL_MAPPINGS[provider],
      max_tokens: 4000,
      messages: [{ role: 'user', content: basePrompt }],
    }
  }

  // Format request for OpenAI models (GPT)
  else if (provider.startsWith('gpt')) {
    return {
      model: version !== 'latest' ? version : MODEL_MAPPINGS[provider],
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
      model: version !== 'latest' ? version : MODEL_MAPPINGS[provider],
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

  // Format for DeepSeek
  else if (provider === 'deepseek-coder') {
    return {
      model: version !== 'latest' ? version : MODEL_MAPPINGS[provider],
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

  // Generic format for other models
  else {
    return {
      model: version !== 'latest' ? version : MODEL_MAPPINGS[provider],
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
const getHeaders = (provider, apiKey) => {
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
) => {
  if (!apiKey) {
    throw new Error('API key is required')
  }

  const endpoint = API_ENDPOINTS[provider]
  if (!endpoint) {
    throw new Error(`Unsupported AI provider: ${provider}`)
  }

  const requestData = formatGradeRequest(
    provider,
    challengeDescription,
    sectionTitle,
    code,
    version,
  )
  const headers = getHeaders(provider, apiKey)

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

  // Simple length check as a basic validation
  return apiKey.length > 20
}

/**
 * Test the API connection with minimal request
 * Returns true if successful, false or throws error otherwise
 */
export const testApiConnection = async (provider, apiKey) => {
  if (!validateApiKey(provider, apiKey)) {
    throw new Error('Invalid API key format')
  }

  const endpoint = API_ENDPOINTS[provider]
  if (!endpoint) {
    throw new Error(`Unsupported AI provider: ${provider}`)
  }

  // Create a minimal request just to test authentication
  const testPrompt = "Hello, this is a connection test. Please respond with 'OK'."
  let requestData

  if (provider.startsWith('claude')) {
    requestData = {
      model: MODEL_MAPPINGS[provider],
      max_tokens: 10,
      messages: [{ role: 'user', content: testPrompt }],
    }
  } else {
    requestData = {
      model: MODEL_MAPPINGS[provider],
      max_tokens: 10,
      messages: [{ role: 'user', content: testPrompt }],
    }
  }

  const headers = getHeaders(provider, apiKey)

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
