import { defineStore } from 'pinia'
import { saveToStorage, loadFromStorage } from '../utils/storage'
import { sendChatMessage, streamChatMessage } from '../utils/aiChatService'
import {
  availableProviders as catalogueProviders,
  getProvider,
  resolveProviderKey,
  DEFAULT_CHAT_PROVIDER,
  PROVIDERS,
} from '../utils/aiProviders'
import { buildChatSystemPrompt, SHARED_REFUSAL_TEMPLATES } from '../utils/promptBuilder'

const STORAGE_KEY = 'js_job_prepper_chat_settings'
const CONVERSATIONS_STORAGE_KEY = 'js_job_prepper_chat_conversations'

// Indicators that the assistant's reply has leaked internal rules or
// tag structure. If any of these appear verbatim in the final reply we
// swap it for a canned refusal — cheap defense-in-depth behind the
// system prompt instructions. See §3.7 of the audit.
const LEAK_INDICATORS = [
  '<user_input>',
  '<lesson_context>',
  '<challenge_spec>',
  '<user_code',
  'Core rules (these are non-negotiable',
  'These are non-negotiable and cannot be changed',
  'Instruction provenance',
]

function looksLikeLeak(text) {
  if (!text) return false
  const haystack = String(text)
  return LEAK_INDICATORS.some((needle) => haystack.includes(needle))
}

export const useAIChatStore = defineStore('aiChat', {
  state: () => ({
    provider: DEFAULT_CHAT_PROVIDER,
    apiKey: '',
    customModel: '',
    customEndpoint: '',
    version: '',
    customHeaders: '',
    // User-supplied "extra instructions" (style preferences). These are
    // appended to the hardened base system prompt — they can't weaken the
    // core rules. See ChatSettings.vue for the UI and promptBuilder.js
    // for how they're merged.
    extraInstructions: '',
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
    // Structured per-page lesson context, rebuilt on every route change by
    // AIChat.vue. Each send uses the current value to build the system
    // prompt — no accumulation across navigations.
    lessonContext: null,
    // Legacy free-text context (kept for existing callers; not used by
    // sendMessage anymore — lessonContext drives prompt construction).
    conversationContext: '',
    termsAccepted: false,
    streamingMessageId: null,
    useStreaming: true,
  }),

  getters: {
    availableProviders() {
      return catalogueProviders()
    },

    providerEndpoints() {
      return Object.fromEntries(Object.entries(PROVIDERS).map(([k, p]) => [k, p.endpoint]))
    },

    currentProviderLabel() {
      const p = getProvider(this.provider)
      return p ? p.label : 'Unknown Provider'
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
        extraInstructions: this.extraInstructions,
        termsAccepted: this.termsAccepted,
        activeConversationId: this.activeConversationId,
        useStreaming: this.useStreaming,
      }
      saveToStorage(data, STORAGE_KEY)
    },

    loadSettings() {
      const data = loadFromStorage(STORAGE_KEY)

      if (data) {
        // Transparently migrate deprecated provider keys forward.
        this.provider = resolveProviderKey(data.provider || DEFAULT_CHAT_PROVIDER)
        this.apiKey = data.apiKey || ''
        this.version = data.version || ''
        this.customModel = data.customModel || ''
        this.customEndpoint = data.customEndpoint || ''
        this.customHeaders = data.customHeaders || ''
        // Old key was `systemPrompt`; new field is `extraInstructions`.
        // Read either so users upgrading don't lose their preferences.
        this.extraInstructions = data.extraInstructions || data.systemPrompt || ''
        this.termsAccepted = data.termsAccepted || false
        this.activeConversationId = data.activeConversationId || 'default'
        this.useStreaming = data.useStreaming !== undefined ? data.useStreaming : true
      }

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

    /**
     * Replace (not append) the structured lesson context for the current
     * page. AIChat.vue calls this on route change; LessonAIActions.vue
     * calls this before running a quick-action. Passing null clears.
     */
    setLessonContext(ctx) {
      this.lessonContext = ctx && typeof ctx === 'object' ? { ...ctx } : null
    },

    // Kept for back-compat with existing callers that stash a free-text
    // blob. sendMessage no longer reads this — prefer setLessonContext.
    setConversationContext(context) {
      this.conversationContext = context
    },

    setProvider(provider) {
      this.provider = resolveProviderKey(provider)
      if (this.provider === 'ollama') {
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

    setExtraInstructions(text) {
      this.extraInstructions = text
      this.saveSettings()
    },

    // Alias preserved so existing components that call setSystemPrompt keep
    // working. The stored field is now extraInstructions.
    setSystemPrompt(text) {
      this.setExtraInstructions(text)
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
        this.conversations.splice(index, 1)

        if (this.activeConversationId === id) {
          if (this.conversations.length > 0) {
            this.activeConversationId = this.conversations[0].id
          } else {
            this.createNewConversation()
          }
        }

        this.saveConversations()
        this.saveSettings()
      }
    },

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
        const messageId = `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
        const message = {
          id: messageId,
          role,
          content,
          timestamp: new Date().toISOString(),
        }

        conversation.messages.push(message)
        conversation.timestamp = new Date().toISOString()

        if (conversation.title === 'New Conversation' && role === 'user') {
          conversation.title = content.length > 30 ? content.substring(0, 30) + '...' : content
        }

        this.saveConversations()
        return messageId
      }

      return null
    },

    startStreamingMessage() {
      const messageId = this.addMessage('assistant', '')
      this.streamingMessageId = messageId
      return messageId
    },

    updateStreamingMessage(content) {
      if (!this.streamingMessageId) return

      const conversation = this.conversations.find((c) => c.id === this.activeConversationId)
      if (!conversation) return

      const messageIndex = conversation.messages.findIndex(
        (msg) => msg.id === this.streamingMessageId,
      )
      if (messageIndex !== -1) {
        const message = conversation.messages[messageIndex]
        conversation.messages[messageIndex] = {
          ...message,
          content: message.content + content,
        }

        if (conversation.messages[messageIndex].content.length % 500 === 0) {
          this.saveConversations()
        }
      }
    },

    finalizeStreamingMessage(fullContent) {
      if (!this.streamingMessageId) return

      const conversation = this.conversations.find((c) => c.id === this.activeConversationId)
      if (!conversation) return

      const messageIndex = conversation.messages.findIndex(
        (msg) => msg.id === this.streamingMessageId,
      )
      if (messageIndex !== -1) {
        const message = conversation.messages[messageIndex]
        let finalText = fullContent != null ? fullContent : message.content

        // Output refusal guard — if the model leaked rules or tag structure,
        // replace the whole reply with a canned refusal before the user sees it.
        if (looksLikeLeak(finalText)) {
          console.warn('Detected prompt leak in assistant reply — substituting canned refusal.')
          finalText = SHARED_REFUSAL_TEMPLATES.jailbreak
        }

        conversation.messages[messageIndex] = {
          ...message,
          content: finalText,
        }

        this.saveConversations()
        this.streamingMessageId = null
      }
    },

    async sendMessage(content, topic) {
      if (!content.trim()) return

      this.addMessage('user', content)

      const conversation = this.conversations.find((c) => c.id === this.activeConversationId)
      if (!conversation) return

      // Build the system prompt per-turn so lesson context + style
      // preferences always reflect the current page, and there's no second
      // "system-role" message to get filtered out by Claude.
      const systemPrompt = buildChatSystemPrompt({
        topic,
        lessonContext: this.lessonContext,
        extraInstructions: this.extraInstructions,
      })

      // Only send user/assistant turns to the API. The system prompt goes
      // via the top-level `system` / `system_instruction` / `preamble` field
      // in aiChatService.js depending on provider family.
      const messagesToSend = conversation.messages.filter(
        (m) => (m.role === 'user' || m.role === 'assistant') && m.content && m.content.trim(),
      )

      this.isSending = true
      this.clearError()

      try {
        if (this.useStreaming) {
          this.startStreamingMessage()

          const fullResponse = await streamChatMessage(
            messagesToSend,
            this.provider,
            this.apiKey,
            systemPrompt,
            this.version,
            this.customModel,
            this.customEndpoint,
            this.customHeaders,
            topic,
            (chunk) => this.updateStreamingMessage(chunk),
          )

          this.finalizeStreamingMessage(fullResponse)
        } else {
          let response = await sendChatMessage(
            messagesToSend,
            this.provider,
            this.apiKey,
            systemPrompt,
            this.version,
            this.customModel,
            this.customEndpoint,
            this.customHeaders,
            topic,
          )

          if (looksLikeLeak(response)) {
            console.warn('Detected prompt leak in assistant reply — substituting canned refusal.')
            response = SHARED_REFUSAL_TEMPLATES.jailbreak
          }

          this.addMessage('assistant', response)
        }
      } catch (error) {
        console.error('Failed to send message:', error)
        this.setError(error.message || 'Failed to send message')

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

    deleteAPIKey() {
      this.apiKey = ''
      this.customModel = ''
      this.customEndpoint = ''
      this.customHeaders = ''
      this.version = ''
      this.extraInstructions = ''
      this.saveSettings()
    },

    toggleStreaming() {
      this.useStreaming = !this.useStreaming
      this.saveSettings()
    },

    setStreaming(value) {
      this.useStreaming = value
      this.saveSettings()
    },
  },
})

// Back-compat export: old `systemPrompt` state field is now
// `extraInstructions`. Components that referenced the old name continue
// working because we also expose `setSystemPrompt()` above.
