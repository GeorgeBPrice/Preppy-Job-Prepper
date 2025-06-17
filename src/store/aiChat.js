import { defineStore } from 'pinia'
import { saveToStorage, loadFromStorage } from '../utils/storage'
import { sendChatMessage, streamChatMessage } from '../utils/aiChatService'

const STORAGE_KEY = 'js_job_prepper_chat_settings'
const CONVERSATIONS_STORAGE_KEY = 'js_job_prepper_chat_conversations'

export const useAIChatStore = defineStore('aiChat', {
  state: () => ({
    provider: 'gpt-3.5-turbo',
    apiKey: '',
    customModel: '',
    customEndpoint: '',
    version: '',
    customHeaders: '',
    systemPrompt: '',
    isLoaded: false,
    isOpen: false,
    isSending: false,
    error: null,
    conversations: [
      {
        id: 'default',
        title: 'New Conversation',
        messages: [],
        timestamp: new Date().toISOString(),
      },
    ],
    activeConversationId: 'default',
    conversationContext: '',
    termsAccepted: false,
    streamingMessageId: null,
    useStreaming: true,
  }),

  getters: {
    availableProviders() {
      return [
        { value: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' },
        { value: 'claude-3-7-sonnet', label: 'Claude 3.7 Sonnet' },
        { value: 'claude-3-opus', label: 'Claude 3 Opus' },
        { value: 'claude-3-haiku', label: 'Claude 3 Haiku' },
        { value: 'claude-opus-4', label: 'Claude Opus 4' },
        { value: 'claude-sonnet-4', label: 'Claude Sonnet 4' },
        { value: 'gpt-4', label: 'GPT-4 Turbo' },
        { value: 'gpt-4o', label: 'GPT-4o' },
        { value: 'gpt-4.5', label: 'GPT-4.5' },
        { value: 'gpt-o1', label: 'GPT-o1' },
        { value: 'gpt-o3', label: 'GPT-o3' },
        { value: 'gpt-o4-mini', label: 'GPT-o4 Mini' },
        { value: 'deepseek-reasoner', label: 'DeepSeek-R1' },
        { value: 'deepseek-r1-distill', label: 'DeepSeek R1 Distill' },
        { value: 'grok-3', label: 'Grok 3' },
        { value: 'mistral-large', label: 'Mistral Large' },
        { value: 'mistral-large-2', label: 'Mistral Large 2' },
        { value: 'llama-3', label: 'Llama 3' },
        { value: 'llama-3.1', label: 'Llama 3.1' },
        { value: 'llama-3.2', label: 'Llama 3.2' },
        { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
        { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro' },
        { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
        { value: 'qwen-2.5', label: 'Qwen 2.5' },
        { value: 'cohere-command-r-plus', label: 'Cohere Command R+' },
        { value: 'ollama', label: 'Ollama (Local)' },
        { value: 'other', label: 'Other...' },
      ]
    },

    providerEndpoints() {
      return {
        'gpt-4': 'https://api.openai.com/v1/chat/completions',
        'gpt-4o': 'https://api.openai.com/v1/chat/completions',
        'gpt-4.5': 'https://api.openai.com/v1/chat/completions',
        'gpt-o1': 'https://api.openai.com/v1/chat/completions',
        'gpt-o3': 'https://api.openai.com/v1/chat/completions',
        'gpt-o4-mini': 'https://api.openai.com/v1/chat/completions',
        'claude-3-5-sonnet': 'https://api.anthropic.com/v1/messages',
        'claude-3-7-sonnet': 'https://api.anthropic.com/v1/messages',
        'claude-3-opus': 'https://api.anthropic.com/v1/messages',
        'claude-3-haiku': 'https://api.anthropic.com/v1/messages',
        'claude-opus-4': 'https://api.anthropic.com/v1/messages',
        'claude-sonnet-4': 'https://api.anthropic.com/v1/messages',
        'gemini-1.5-pro':
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent',
        'gemini-2.5-pro':
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent',
        'gemini-2.5-flash':
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
        'deepseek-reasoner': 'https://api.deepseek.com/v1/chat/completions',
        'deepseek-r1-distill': 'https://api.deepseek.com/v1/chat/completions',
        'grok-3': 'https://api.x.ai/v1/chat/completions',
        'mistral-large': 'https://api.mistral.ai/v1/chat/completions',
        'mistral-large-2': 'https://api.mistral.ai/v1/chat/completions',
        'qwen-2.5':
          'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
        'cohere-command-r-plus': 'https://api.cohere.ai/v1/generate',
        'llama-3': 'https://api.together.xyz/v1/chat/completions',
        'llama-3.1': 'https://api.together.xyz/v1/chat/completions',
        'llama-3.2': 'https://api.together.xyz/v1/chat/completions',
        ollama: 'http://localhost:11434/api/generate',
      }
    },

    currentProviderLabel() {
      const provider = this.availableProviders.find((p) => p.value === this.provider)
      return provider ? provider.label : 'Unknown Provider'
    },

    hasApiKey() {
      return !!this.apiKey && this.apiKey.trim() !== ''
    },

    isCustomProvider() {
      return this.provider === 'other'
    },

    messages() {
      const conversation = this.conversations.find((c) => c.id === this.activeConversationId)
      return conversation ? conversation.messages : []
    },

    chatHistory() {
      return this.messages.filter((msg) => msg.role === 'user' || msg.role === 'assistant')
    },

    // Get all conversations sorted by timestamp (newest first)
    sortedConversations() {
      return [...this.conversations].sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp)
      })
    },

    activeConversation() {
      return (
        this.conversations.find((c) => c.id === this.activeConversationId) || this.conversations[0]
      )
    },
  },

  actions: {
    saveSettings() {
      const data = {
        provider: this.provider,
        apiKey: this.apiKey,
        version: this.version,
        customModel: this.customModel,
        customEndpoint: this.customEndpoint,
        customHeaders: this.customHeaders,
        systemPrompt: this.systemPrompt,
        termsAccepted: this.termsAccepted,
        activeConversationId: this.activeConversationId,
        useStreaming: this.useStreaming,
      }

      saveToStorage(data, STORAGE_KEY)
    },

    loadSettings() {
      const data = loadFromStorage(STORAGE_KEY)

      if (data) {
        this.provider = data.provider || 'gpt-3.5-turbo'
        this.apiKey = data.apiKey || ''
        this.version = data.version || ''
        this.customModel = data.customModel || ''
        this.customEndpoint = data.customEndpoint || ''
        this.customHeaders = data.customHeaders || ''
        this.systemPrompt = data.systemPrompt || ''
        this.termsAccepted = data.termsAccepted || false
        this.activeConversationId = data.activeConversationId || 'default'
        this.useStreaming = data.useStreaming !== undefined ? data.useStreaming : true
      }

      // finally load conversations
      this.loadConversations()

      this.isLoaded = true
    },

    loadConversations() {
      const conversations = loadFromStorage(CONVERSATIONS_STORAGE_KEY)
      if (conversations && Array.isArray(conversations) && conversations.length > 0) {
        this.conversations = conversations
      }
    },

    saveConversations() {
      saveToStorage(this.conversations, CONVERSATIONS_STORAGE_KEY)
    },

    toggleChat() {
      this.isOpen = !this.isOpen
    },

    openChat() {
      this.isOpen = true
    },

    closeChat() {
      this.isOpen = false
    },

    setConversationContext(context) {
      this.conversationContext = context
    },

    setProvider(provider) {
      this.provider = provider

      if (provider === 'ollama') {
        this.version = ''
      }
      this.saveSettings()
    },

    setApiKey(apiKey) {
      this.apiKey = apiKey
      this.saveSettings()
    },

    setCustomModel(model) {
      this.customModel = model
      this.saveSettings()
    },

    setCustomEndpoint(endpoint) {
      this.customEndpoint = endpoint
      this.saveSettings()
    },

    setCustomHeaders(headers) {
      this.customHeaders = headers
      this.saveSettings()
    },

    setSystemPrompt(prompt) {
      this.systemPrompt = prompt
      this.saveSettings()
    },

    setVersion(version) {
      this.version = version
      this.saveSettings()
    },

    acceptTerms() {
      this.termsAccepted = true
      this.saveSettings()
    },

    setTermsAccepted(value) {
      this.termsAccepted = value
      this.saveSettings()
    },

    clearError() {
      this.error = null
    },

    setError(error) {
      this.error = error
    },

    createNewConversation() {
      const id = `conv-${Date.now()}`
      const newConversation = {
        id,
        title: 'New Conversation',
        messages: [],
        timestamp: new Date().toISOString(),
      }

      this.conversations.push(newConversation)
      this.activeConversationId = id
      this.saveConversations()
      this.saveSettings()

      return id
    },

    switchConversation(id) {
      if (this.conversations.some((c) => c.id === id)) {
        this.activeConversationId = id
        this.saveSettings()
      }
    },

    deleteConversation(id) {
      const index = this.conversations.findIndex((c) => c.id === id)

      if (index !== -1) {
        // Remove the conversation
        this.conversations.splice(index, 1)

        // If we deleted the active conversation, switch to another one
        if (this.activeConversationId === id) {
          if (this.conversations.length > 0) {
            this.activeConversationId = this.conversations[0].id
          } else {
            // otherwise create a new conversation if all were deleted
            // might be a better way to handle this, im thinking about an empty non-persisted conversation
            this.createNewConversation()
          }
        }

        this.saveConversations()
        this.saveSettings()
      }
    },

    // add a title after the first message
    updateConversationTitle(id, title) {
      const conversation = this.conversations.find((c) => c.id === id)
      if (conversation) {
        conversation.title = title
        this.saveConversations()
      }
    },

    addMessage(role, content) {
      const conversation = this.conversations.find((c) => c.id === this.activeConversationId)

      if (conversation) {
        // Create a message object with a unique ID
        const messageId = `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
        const message = {
          id: messageId,
          role,
          content,
          timestamp: new Date().toISOString(),
        }

        // Add the message to the active conversation
        conversation.messages.push(message)
        conversation.timestamp = new Date().toISOString()

        // Update conversation title based on first user message if it's "New Conversation"
        if (conversation.title === 'New Conversation' && role === 'user') {
          // Limit title to first 30 chars of first message
          conversation.title = content.length > 30 ? content.substring(0, 30) + '...' : content
        }

        this.saveConversations()

        return messageId
      }

      return null
    },

    // Create initial streaming message
    startStreamingMessage() {
      const messageId = this.addMessage('assistant', '')
      this.streamingMessageId = messageId
      return messageId
    },

    // Update streaming message content
    updateStreamingMessage(content) {
      if (!this.streamingMessageId) return

      const conversation = this.conversations.find((c) => c.id === this.activeConversationId)
      if (!conversation) return

      const message = conversation.messages.find((msg) => msg.id === this.streamingMessageId)
      if (message) {
        message.content += content
        // Occasionally save if the content gets long
        if (message.content.length % 500 === 0) {
          this.saveConversations()
        }
      }
    },

    // Finalize streaming message
    finalizeStreamingMessage(fullContent) {
      if (!this.streamingMessageId) return

      const conversation = this.conversations.find((c) => c.id === this.activeConversationId)
      if (!conversation) return

      const message = conversation.messages.find((msg) => msg.id === this.streamingMessageId)
      if (message) {
        // complete content if available
        if (fullContent) {
          message.content = fullContent
        }

        this.saveConversations()
        this.streamingMessageId = null
      }
    },

    async sendMessage(content, topic) {
      if (!content.trim()) return

      // Add user message
      this.addMessage('user', content)

      const conversation = this.conversations.find((c) => c.id === this.activeConversationId)
      if (!conversation) return

      // Check if we need to include context at the beginning
      const messagesToSend = [...conversation.messages]
      if (this.conversationContext && conversation.messages.length <= 2) {
        messagesToSend.unshift({
          role: 'system',
          content: `Current context: ${this.conversationContext}\n\nPlease use this context to answer questions accurately.`,
        })
      }

      this.isSending = true
      this.clearError()

      try {
        if (this.useStreaming) {
          // Create streaming message but don't include it in the API request
          this.startStreamingMessage()

          // Filter out any empty messages before sending to API
          const filteredMessages = messagesToSend.filter(
            (msg) => msg.content && msg.content.trim() !== '',
          )

          // Stream the message in real-time
          const fullResponse = await streamChatMessage(
            filteredMessages,
            this.provider,
            this.apiKey,
            this.systemPrompt || undefined,
            this.version,
            this.customModel,
            this.customEndpoint,
            this.customHeaders,
            topic,
            // Callback each chunk
            (chunk) => {
              this.updateStreamingMessage(chunk)
            },
          )

          // Finalize completed response
          this.finalizeStreamingMessage(fullResponse)
        } else {
          // Filter out any empty messages before sending to API
          const filteredMessages = messagesToSend.filter(
            (msg) => msg.content && msg.content.trim() !== '',
          )

          // Fall back to non-streaming approach (user can toggle this in the settings)
          const response = await sendChatMessage(
            filteredMessages,
            this.provider,
            this.apiKey,
            this.systemPrompt || undefined,
            this.version,
            this.customModel,
            this.customEndpoint,
            this.customHeaders,
            topic,
          )

          this.addMessage('assistant', response)
        }
      } catch (error) {
        console.error('Failed to send message:', error)
        this.setError(error.message || 'Failed to send message')

        // error message if streaming
        if (this.streamingMessageId) {
          this.finalizeStreamingMessage('')
        }

        this.addMessage('system', `Error: ${error.message || 'Failed to get response'}`)
      } finally {
        this.isSending = false
      }
    },

    clearActiveConversation() {
      const conversation = this.conversations.find((c) => c.id === this.activeConversationId)

      if (conversation) {
        conversation.messages = []
        conversation.title = 'New Conversation'
        this.saveConversations()
      }
    },

    clearAllConversations() {
      this.conversations = [
        {
          id: 'default',
          title: 'New Conversation',
          messages: [],
          timestamp: new Date().toISOString(),
        },
      ]
      this.activeConversationId = 'default'
      this.saveConversations()
      this.saveSettings()
    },

    // delete API key and reset settings
    deleteAPIKey() {
      this.apiKey = ''
      this.customModel = ''
      this.customEndpoint = ''
      this.customHeaders = ''
      this.version = ''
      this.systemPrompt = ''
      this.saveSettings()
    },

    // Toggle streaming mode on/off
    toggleStreaming() {
      this.useStreaming = !this.useStreaming
      this.saveSettings()
    },

    // Update streaming setting
    setStreaming(value) {
      this.useStreaming = value
      this.saveSettings()
    },
  },
})
