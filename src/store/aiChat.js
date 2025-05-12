import { defineStore } from 'pinia'
import { saveToStorage, loadFromStorage } from '../utils/storage'
import { sendChatMessage } from '../utils/aiChatService'

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
  }),

  getters: {
    availableProviders() {
      return [
        { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
        { value: 'gpt-4', label: 'GPT-4 Turbo' },
        { value: 'gpt-4o', label: 'GPT-4o' },
        { value: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' },
        { value: 'claude-3-7-sonnet', label: 'Claude 3.7 Sonnet' },
        { value: 'claude-3-opus', label: 'Claude 3 Opus' },
        { value: 'mistral-large', label: 'Mistral Large' },
        { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
        { value: 'other', label: 'Other...' },
      ]
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
        // Add the message to the active conversation
        conversation.messages.push({ role, content, timestamp: new Date().toISOString() })

        // Update conversation timestamp
        conversation.timestamp = new Date().toISOString()

        // Update conversation title based on first user message if it's "New Conversation"
        if (conversation.title === 'New Conversation' && role === 'user') {
          // Limit title to first 30 chars of first message
          conversation.title = content.length > 30 ? content.substring(0, 30) + '...' : content
        }

        this.saveConversations()
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
        // Send message to AI API as configured by user in the settings tab of chat bot
        const response = await sendChatMessage(
          messagesToSend,
          this.provider,
          this.apiKey,
          this.systemPrompt || undefined,
          this.version,
          this.customModel,
          this.customEndpoint,
          this.customHeaders,
          topic,
        )

        // Add response to messages
        this.addMessage('assistant', response)
      } catch (error) {
        console.error('Failed to send message:', error)
        this.setError(error.message || 'Failed to send message')
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
  },
})
