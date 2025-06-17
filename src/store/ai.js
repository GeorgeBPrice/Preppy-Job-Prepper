import { defineStore } from 'pinia'
import { saveToStorage, loadFromStorage } from '../utils/storage'
import { useTopicStore } from './topic'

const STORAGE_KEY = 'js_job_review_ai_settings'
const RESPONSES_STORAGE_KEY = 'js_job_review_ai_responses'

export const useAIStore = defineStore('ai', {
  state: () => ({
    provider: localStorage.getItem(STORAGE_KEY)
      ? JSON.parse(localStorage.getItem(STORAGE_KEY)).provider
      : 'claude-3-7-sonnet',
    apiKey: '',
    customModel: '',
    customEndpoint: '',
    version: 'latest',
    customHeaders: '',
    isLoaded: false,
    lastResponse: null,
    isLoading: false,
    error: null,
    termsAccepted: localStorage.getItem(STORAGE_KEY)
      ? JSON.parse(localStorage.getItem(STORAGE_KEY)).termsAccepted || false
      : false,
    savedResponses: {},
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
        termsAccepted: this.termsAccepted,
      }

      saveToStorage(data, STORAGE_KEY)
    },

    loadSettings() {
      const data = loadFromStorage(STORAGE_KEY)

      if (data) {
        this.provider = data.provider || 'claude-3-7-sonnet'
        this.apiKey = data.apiKey || ''
        this.version = data.version || 'latest'
        this.customModel = data.customModel || ''
        this.customEndpoint = data.customEndpoint || ''
        this.customHeaders = data.customHeaders || ''
        this.termsAccepted = data.termsAccepted || false
      }

      // Load saved responses
      this.loadSavedResponses()

      this.isLoaded = true
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

    setVersion(version) {
      this.version = version
      this.saveSettings()
    },

    acceptTerms() {
      this.termsAccepted = true
      this.saveSettings()
    },

    setLastResponse(response) {
      this.lastResponse = response
    },

    setLoading(loading) {
      this.isLoading = loading
    },

    setError(error) {
      this.error = error
    },

    clearError() {
      this.error = null
    },

    resetLastResponse() {
      this.lastResponse = null
    },

    // Save AI response to localStorage with topic-specific key
    saveResponse(sectionId, response, code) {
      if (!response || !sectionId) return

      const topicStore = useTopicStore()
      const topicKey = topicStore.currentTopic
      const responseKey = `${topicKey}-section-${sectionId}`

      // Create or update the response entry
      this.savedResponses[responseKey] = {
        response,
        code,
        timestamp: new Date().toISOString(),
        provider: this.provider,
        topic: topicKey,
        sectionId: sectionId,
      }

      saveToStorage(this.savedResponses, RESPONSES_STORAGE_KEY)
    },

    // Load previously saved responses
    loadSavedResponses() {
      const savedData = loadFromStorage(RESPONSES_STORAGE_KEY)
      if (savedData) {
        this.savedResponses = savedData
      }
    },

    // Get a saved response for a specific section in the current topic
    getSavedResponse(sectionId) {
      const topicStore = useTopicStore()
      const topicKey = topicStore.currentTopic
      const responseKey = `${topicKey}-section-${sectionId}`
      return this.savedResponses[responseKey] || null
    },

    // Get all saved responses for the current topic
    getTopicResponses() {
      const topicStore = useTopicStore()
      const topicKey = topicStore.currentTopic
      const topicResponses = {}

      Object.entries(this.savedResponses).forEach(([key, value]) => {
        if (key.startsWith(`${topicKey}-section-`)) {
          const sectionId = key.replace(`${topicKey}-section-`, '')
          topicResponses[sectionId] = value
        }
      })

      return topicResponses
    },

    // Clear a saved response for a specific section in the current topic
    clearSavedResponse(sectionId) {
      const topicStore = useTopicStore()
      const topicKey = topicStore.currentTopic
      const responseKey = `${topicKey}-section-${sectionId}`

      if (this.savedResponses[responseKey]) {
        delete this.savedResponses[responseKey]
        saveToStorage(this.savedResponses, RESPONSES_STORAGE_KEY)
      }
    },

    // Clear all saved responses for the current topic
    clearTopicResponses() {
      const topicStore = useTopicStore()
      const topicKey = topicStore.currentTopic

      Object.keys(this.savedResponses).forEach((key) => {
        if (key.startsWith(`${topicKey}-section-`)) {
          delete this.savedResponses[key]
        }
      })

      saveToStorage(this.savedResponses, RESPONSES_STORAGE_KEY)
    },

    // Clear all saved responses across all topics
    clearAllSavedResponses() {
      this.savedResponses = {}
      saveToStorage(this.savedResponses, RESPONSES_STORAGE_KEY)
    },
  },
})
