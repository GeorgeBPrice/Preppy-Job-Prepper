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
  'gpt-3.5-turbo': 'https://api.openai.com/v1/chat/completions',
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
  other: 'custom-endpoint',
}

// AI model mappings
export const CHAT_MODEL_MAPPINGS = {
  // Anthropic Models
  'claude-3-5-sonnet': 'claude-3-5-sonnet-20240620',
  'claude-3-7-sonnet': 'claude-3-7-sonnet-20250219',
  'claude-3-opus': 'claude-3-opus-20240229',
  'claude-3-haiku': 'claude-3-haiku-20240307',
  'claude-opus-4': 'claude-3-opus-20240229',
  'claude-sonnet-4': 'claude-3-5-sonnet-20240620',

  // OpenAI Models
  'gpt-3.5-turbo': 'gpt-3.5-turbo-0613',
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
        filterMetadata: true, // Enable metadata filtering for Qwen
        metadataFields: ['model', 'createdat', 'done'], // Fields to filter out
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
        temperature: 0.7,
        top_p: 0.9,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
      qwen: {
        temperature: 0.8,
        top_p: 0.9,
        repetition_penalty: 1.1,
      },
      deepseek: {
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 4096,
      },
      llama: {
        temperature: 0.8,
        top_p: 0.9,
        frequency_penalty: 0.0,
      },
      mistral: {
        temperature: 0.7,
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
        // If it's not valid JSON and we're filtering metadata, try to extract just the response part
        if (config.filterMetadata) {
          const responseMatch = chunk.match(/"response":"([^"]*)"/)
          if (responseMatch) {
            onUpdate(responseMatch[1])
            return
          }
        }
        // Otherwise treat as raw text
        console.warn('Invalid JSON chunk, treating as raw text:', chunk)
        onUpdate(chunk)
        return
      }

      let textDelta = ''

      // Handle metadata filtering for models that need it (like Qwen)
      if (config.filterMetadata && config.metadataFields) {
        // Only extract the response field and ignore metadata
        if (parsed[config.responseField]) {
          textDelta = parsed[config.responseField]
        }
      } else {
        // Normal processing for other models
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
 * Format the AI request based on provider and conversation history
 */
const formatChatRequest = (
  provider,
  messages,
  systemPrompt = DEFAULT_SYSTEM_PROMPT,
  version,
  customModel,
  stream = false,
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
      stream: stream,
    }
  }

  // Format request for OpenAI models (GPT)
  else if (provider.startsWith('gpt')) {
    return {
      model: modelToUse,
      max_tokens: 4000,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      stream: stream,
    }
  }

  // Format for Mistral models
  else if (provider === 'mistral-large') {
    return {
      model: modelToUse,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      stream: stream,
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
      stream: stream,
    }
  }

  // Format for Ollama
  else if (provider === 'ollama') {
    // Convert messages array to Ollama format
    let prompt = ''

    // Add system message as a header if it exists
    const systemMessage = messages.find((msg) => msg.role === 'system')?.content || systemPrompt
    if (systemMessage) {
      prompt += `System: ${systemMessage}\n\n`
    }

    // Add user and assistant messages in alternating format
    for (const msg of messages.filter((m) => m.role !== 'system')) {
      if (msg.role === 'user') {
        prompt += `User: ${msg.content}\n\n`
      } else if (msg.role === 'assistant') {
        prompt += `Assistant: ${msg.content}\n\n`
      }
    }

    // For Ollama, use the version field as the model name if provided
    const modelToUse = version || customModel || CHAT_MODEL_MAPPINGS.ollama

    // Get model-specific optimized parameters
    const optimizedParams = ollamaHandler.getOptimizedParams(modelToUse, {
      temperature: 0.7,
      top_p: 0.9,
    })

    return {
      model: modelToUse,
      prompt: prompt.trim(),
      stream: stream,
      options: optimizedParams,
    }
  }

  // Generic format for other models including custom ones
  else {
    return {
      model: modelToUse,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      stream: stream,
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
    // Ollama streaming returns objects with a 'response' field
    if (data.response) {
      return data.response
    }
    // For non-streaming, it may have different format
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
 * Process streaming response chunks based on provider
 */
export const processStreamChunk = (chunk, provider, version, customModel) => {
  try {
    // For OpenAI - uses SSE format
    if (provider.startsWith('gpt')) {
      const chunkStr = chunk.toString()
      // Skip empty chunks
      if (!chunkStr.trim()) return ''

      let content = ''
      // Split the chunk into lines (SSE format sends one event per line)
      const lines = chunkStr.split('\n')

      for (const line of lines) {
        // Skip empty lines or the "DONE" marker
        if (!line.trim() || line.includes('[DONE]')) continue

        // Process lines that start with "data: "
        if (line.startsWith('data:')) {
          try {
            const jsonData = line.replace(/^data:\s*/, '').trim()
            // Skip empty data
            if (!jsonData) continue

            // Parse the JSON data
            const data = JSON.parse(jsonData)
            // Extract the delta content if available
            const deltaContent = data.choices?.[0]?.delta?.content
            if (deltaContent) {
              content += deltaContent
            }
          } catch (err) {
            // Ignore JSON parse errors for non-JSON lines
            console.debug('Skipping invalid JSON in OpenAI stream:', err.message)
          }
        }
      }

      return content
    }
    // For Claude
    else if (provider.startsWith('claude')) {
      // Claude may also use SSE format
      if (chunk.toString().includes('event:')) {
        const lines = chunk.toString().split('\n')
        for (const line of lines) {
          if (line.startsWith('data:')) {
            try {
              const jsonData = line.slice(5).trim()
              if (jsonData) {
                const data = JSON.parse(jsonData)
                return data.delta?.text || ''
              }
            } catch (err) {
              // Skip invalid JSON
              console.warn('Skipping invalid JSON in Claude stream:', line, err.message)
            }
          }
        }
        return ''
      } else {
        // Try to parse as direct JSON
        try {
          const data = JSON.parse(chunk)
          return data.delta?.text || ''
        } catch (err) {
          console.warn('Failed to parse Claude response as JSON:', err.message)
          return ''
        }
      }
    }
    // For Mistral
    else if (provider === 'mistral-large') {
      // Mistral may also use SSE format
      if (chunk.toString().includes('data:')) {
        const lines = chunk.toString().split('\n')
        for (const line of lines) {
          if (line.startsWith('data:')) {
            try {
              const jsonData = line.slice(5).trim()
              if (jsonData) {
                const data = JSON.parse(jsonData)
                return data.choices?.[0]?.delta?.content || ''
              }
            } catch (err) {
              // Skip invalid JSON
              console.warn('Skipping invalid JSON in Mistral stream:', line, err.message)
            }
          }
        }
        return ''
      } else {
        // Try to parse as direct JSON
        try {
          const data = JSON.parse(chunk)
          return data.choices?.[0]?.delta?.content || ''
        } catch (err) {
          console.warn('Failed to parse Mistral response as JSON:', err.message)
          return ''
        }
      }
    }
    // For Ollama
    else if (provider === 'ollama') {
      try {
        const modelToUse = version || customModel || CHAT_MODEL_MAPPINGS.ollama
        const config = ollamaHandler.getModelConfig(modelToUse)

        let content = ''
        ollamaHandler.processChunk(chunk, config, (text) => {
          content += text
        })
        return content
      } catch (err) {
        console.warn('Failed to parse Ollama response as JSON:', err.message)
        return ''
      }
    }
    // For other providers - try multiple formats
    else {
      // First check if it's using SSE format
      if (chunk.toString().includes('data:')) {
        const lines = chunk.toString().split('\n')
        for (const line of lines) {
          if (line.startsWith('data:')) {
            try {
              const jsonData = line.slice(5).trim()
              if (jsonData) {
                const data = JSON.parse(jsonData)
                return (
                  data.choices?.[0]?.delta?.content ||
                  data.delta?.text ||
                  data.content?.[0]?.text ||
                  ''
                )
              }
            } catch (err) {
              // Skip invalid JSON
              console.warn('Skipping invalid JSON in stream:', line, err.message)
            }
          }
        }
        return ''
      }

      // Otherwise try to parse as direct JSON
      try {
        const data = JSON.parse(chunk)
        // Try to extract from common stream formats
        return (
          data.choices?.[0]?.delta?.content || data.delta?.text || data.content?.[0]?.text || ''
        )
      } catch (err) {
        // If not valid JSON, it might be a chunk of text
        console.warn('Not valid JSON, treating as raw text chunk:', err.message)
        return chunk.toString()
      }
    }
  } catch (err) {
    console.error('Error processing stream chunk:', err)
    return ''
  }
}

/**
 * Stream a chat message with real-time updates
 */
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
  onChunk, // Callback function to receive incremental updates
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
    true, // Enable streaming
  )

  const headers = getHeaders(provider, apiKey, customHeaders)

  try {
    if (isDevelopment) {
      console.log('Using direct API call with streaming in development mode')

      // Use fetch for better streaming support
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(`API error: ${errorData.message || response.statusText}`)
      }

      // Handle streaming based on provider
      const decoder = new TextDecoder()
      let fullText = ''

      if (response.body) {
        const reader = response.body.getReader()

        // For OpenAI, Claude, and others that support SSE
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value, { stream: true })
            // Log raw chunk for debugging
            if (chunk.length > 0) {
              console.debug(
                'Raw chunk:',
                chunk.substring(0, 100) + (chunk.length > 100 ? '...' : ''),
              )
            }

            const content = processStreamChunk(chunk, provider, version, customModel)

            if (content) {
              fullText += content
              onChunk(content)
            }
          }

          return fullText
        } catch (err) {
          console.error('Stream processing error:', err)
          throw new Error(`Stream processing error: ${err.message}`)
        }
      } else {
        throw new Error('ReadableStream not supported by your browser')
      }
    } else {
      // In production, use our proxy with streaming
      try {
        const response = await fetch(PROXY_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            target: endpoint,
            data: requestData,
            headers: headers,
            stream: true,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(`API error: ${errorData.message || response.statusText}`)
        }

        if (!response.body) {
          throw new Error('ReadableStream not supported by your browser')
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let fullText = ''

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value, { stream: true })
            const content = processStreamChunk(chunk, provider, version, customModel)

            if (content) {
              fullText += content
              onChunk(content)
            }
          }

          return fullText
        } catch (err) {
          console.error('Stream processing error:', err)
          throw new Error(`Stream processing error: ${err.message}`)
        }
      } catch (error) {
        console.warn('Streaming error, falling back to regular request:', error)
        // Fallback to non-streaming if there's an error
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
    // For Ollama, we don't need an API key
    if (provider === 'ollama') {
      return true
    }
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
