import { defineStore } from 'pinia'
import { saveToStorage, loadFromStorage } from '../utils/storage'
import { useTopicStore } from './topic'
import {
  availableProviders as catalogueProviders,
  getProvider,
  resolveProviderKey,
  PROVIDERS,
  DEFAULT_GRADING_PROVIDER,
} from '../utils/aiProviders'

const STORAGE_KEY = 'js_job_review_ai_settings'
const RESPONSES_STORAGE_KEY = 'js_job_review_ai_responses'

// Read the stored provider key and migrate deprecated values forward so
// existing users land on a live provider even if they saved a stale key.
function initialProvider() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_GRADING_PROVIDER
    const parsed = JSON.parse(raw)
    return resolveProviderKey(parsed.provider || DEFAULT_GRADING_PROVIDER)
  } catch {
    return DEFAULT_GRADING_PROVIDER
  }
}

export const useAIStore = defineStore('ai', {
  state: () => ({
    provider: initialProvider(),
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
        // Transparently migrate deprecated provider keys forward.
        this.provider = resolveProviderKey(data.provider || DEFAULT_GRADING_PROVIDER)
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
      this.provider = resolveProviderKey(provider)
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
