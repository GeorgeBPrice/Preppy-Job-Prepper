import { defineStore } from 'pinia'
import { saveToStorage, loadFromStorage } from '../utils/storage'

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
    savedResponses: {}, // Object to store AI responses by section/challenge ID
  }),

  getters: {
    availableProviders() {
      return [
        { value: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' },
        { value: 'claude-3-7-sonnet', label: 'Claude 3.7 Sonnet' },
        { value: 'claude-3-opus', label: 'Claude 3 Opus' },
        { value: 'claude-3-haiku', label: 'Claude 3 Haiku' },
        { value: 'gpt-4', label: 'GPT-4 Turbo' },
        { value: 'gpt-4o', label: 'GPT-4o' },
        { value: 'gpt-o1', label: 'GPT-o1' },
        { value: 'deepseek-reasoner', label: 'DeepSeek-R1' },
        { value: 'grok-3', label: 'Grok 3' },
        { value: 'mistral-large', label: 'Mistral Large' },
        { value: 'llama-3', label: 'Llama 3' },
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

    // Save AI response to localStorage
    saveResponse(sectionId, response, code) {
      if (!response || !sectionId) return

      const responseKey = `section-${sectionId}`

      // Create or update the response entry
      this.savedResponses[responseKey] = {
        response,
        code,
        timestamp: new Date().toISOString(),
        provider: this.provider,
      }

      // Save to localStorage
      saveToStorage(this.savedResponses, RESPONSES_STORAGE_KEY)
    },

    // Load previously saved responses
    loadSavedResponses() {
      const savedData = loadFromStorage(RESPONSES_STORAGE_KEY)
      if (savedData) {
        this.savedResponses = savedData
      }
    },

    // Get a saved response for a specific section
    getSavedResponse(sectionId) {
      const responseKey = `section-${sectionId}`
      return this.savedResponses[responseKey] || null
    },

    // Clear a saved response
    clearSavedResponse(sectionId) {
      const responseKey = `section-${sectionId}`
      if (this.savedResponses[responseKey]) {
        delete this.savedResponses[responseKey]
        saveToStorage(this.savedResponses, RESPONSES_STORAGE_KEY)
      }
    },

    // Clear all saved responses
    clearAllSavedResponses() {
      this.savedResponses = {}
      saveToStorage(this.savedResponses, RESPONSES_STORAGE_KEY)
    },
  },
})
