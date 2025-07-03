<template>
  <div class="challenge-summary">
    <div v-if="loading" class="loading">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="!section" class="error-message">
      <div class="alert alert-danger">
        Section not found. Please check the URL or go back to the
        <router-link to="/">home page</router-link>.
      </div>
    </div>

    <div v-else class="challenge-content">
      <div class="challenge-header">
        <h2 class="challenge-title">Section {{ sectionId }}: {{ section.title }} - Challenge</h2>
        <div class="completion-status">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              :id="`challenge-${sectionId}-completed`"
              v-model="isCompleted"
              @change="toggleCompletion"
            />
            <label class="form-check-label" :for="`challenge-${sectionId}-completed`">
              Mark as completed
            </label>
          </div>
        </div>
      </div>

      <div class="challenge-description">
        <p>{{ section.challenge.description }}</p>
      </div>

      <div class="requirements">
        <h3>Requirements</h3>
        <ul>
          <li v-for="(requirement, index) in section.challenge.requirements" :key="index">
            {{ requirement }}
          </li>
        </ul>
      </div>

      <div class="starter-code" v-if="section.challenge.starterCode">
        <h3>Starter Code</h3>
        <CodeExample :code="section.challenge.starterCode" />
      </div>

      <CodeEditor
        :sectionId="Number(sectionId)"
        :isChallenge="true"
        @code-graded="handleCodeGraded"
      />

      <!-- AI Configuration section -->
      <div class="ai-config-section">
        <div
          class="ai-config-header"
          @click="toggleAIConfig"
          @keydown.enter="toggleAIConfig"
          @keydown.space="toggleAIConfig"
          tabindex="0"
          role="button"
          :aria-expanded="aiConfigExpanded"
          aria-label="Toggle AI Code Review Settings"
        >
          <div class="ai-config-title">
            <i class="bi bi-gear-fill me-2"></i>
            <h3>Configure AI Code Reviewer</h3>
          </div>
          <i
            class="bi ai-config-toggle"
            :class="aiConfigExpanded ? 'bi-chevron-up' : 'bi-chevron-down'"
          ></i>
        </div>

        <div class="ai-config-content" :class="{ collapsed: !aiConfigExpanded }">
          <!-- Warning notice -->
          <div class="ai-config-warning">
            <p>
              <i class="bi bi-exclamation-triangle-fill me-2"></i>
              <strong>Important:</strong> API keys are stored in your browser's localStorage and are
              used to make requests to AI providers. Lesson grading requests are routed through our
              proxy server for security, and your API key is only used in-memory. By using this
              feature, you accept our Terms and Conditions and acknowledge that you use this
              functionality at your own risk.
              <TermsAndConditions />
            </p>
            <div v-if="!aiStore.termsAccepted" class="mt-2">
              <button @click="acceptTermsInline" class="btn btn-sm btn-warning">
                Accept Terms to Continue
              </button>
            </div>
          </div>

          <!-- Error message display -->
          <div class="alert alert-danger" v-if="aiStore.error">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            {{ aiStore.error }}
          </div>

          <div class="config-row">
            <div class="config-item">
              <label for="ai-provider" class="form-label">AI Provider</label>
              <select
                id="ai-provider"
                v-model="aiStore.provider"
                class="form-select"
                @change="handleProviderChange"
              >
                <option
                  v-for="provider in aiStore.availableProviders"
                  :key="provider.value"
                  :value="provider.value"
                >
                  {{ provider.label }}
                </option>
              </select>
            </div>

            <div class="config-item" v-if="aiStore.isCustomProvider">
              <label for="custom-endpoint" class="form-label">API Endpoint</label>
              <input
                id="custom-endpoint"
                type="text"
                v-model="customEndpoint"
                class="form-control"
                placeholder="https://api.example.com/v1/chat"
              />
            </div>

            <div class="config-item" v-if="aiStore.isCustomProvider">
              <label for="custom-model" class="form-label">Model Name</label>
              <input
                id="custom-model"
                type="text"
                v-model="customModel"
                class="form-control"
                placeholder="model-name"
              />
            </div>

            <div class="config-item" v-else>
              <label for="ai-version" class="form-label">Model Version</label>
              <input
                id="ai-version"
                type="text"
                v-model="modelVersion"
                class="form-control"
                placeholder="latest"
              />
            </div>

            <div class="config-item api-key-input" v-if="aiStore.provider !== 'ollama'">
              <label for="api-key" class="form-label">API Key</label>
              <input
                id="api-key"
                type="password"
                v-model="apiKey"
                class="form-control"
                placeholder="Your API Key"
              />
            </div>

            <div class="config-item config-button-item">
              <label class="form-label invisible">Action</label>
              <button
                @click="saveAIConfig"
                class="btn"
                :class="configButtonClass"
                :disabled="aiStore.provider !== 'ollama' && !apiKey"
              >
                <span v-if="isTestingConnection">
                  <span
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Testing...
                </span>
                <span v-else>
                  {{ configSaveStatus || 'Save Config' }}
                </span>
              </button>
            </div>
          </div>

          <!-- Custom Headers for advanced users -->
          <div class="config-row mt-3" v-if="aiStore.isCustomProvider">
            <div class="config-item" style="flex: 1">
              <label for="custom-headers" class="form-label">
                Custom Headers (optional, JSON format)
                <i
                  class="bi bi-info-circle"
                  title="Provide custom headers in JSON format, e.g. { 'Authorization': 'Bearer YOUR_KEY' }"
                ></i>
              </label>
              <textarea
                id="custom-headers"
                v-model="customHeaders"
                class="form-control"
                placeholder='{ "Content-Type": "application/json", "Authorization": "Bearer YOUR_KEY" }'
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- AI Response section -->
      <div
        id="ai-response-section"
        class="ai-response-section"
        v-if="aiStore.lastResponse || aiStore.isLoading"
      >
        <h3>AI Code-Review</h3>

        <div v-if="aiStore.isLoading" class="loading-response">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2">Getting feedback from {{ aiStore.currentProviderLabel }}...</p>
        </div>

        <div v-else-if="aiStore.lastResponse" class="response-content">
          <div v-html="formattedResponse" class="markdown-content"></div>
        </div>

        <!-- Saved response timestamp -->
        <div v-if="savedResponse && savedResponse.timestamp" class="saved-response-info">
          <small class="text-muted">
            <i class="bi bi-clock-history me-1"></i>
            Feedback from {{ formatDateTime(savedResponse.timestamp) }} using
            {{ getSavedProviderLabel(savedResponse.provider) }}
          </small>
        </div>
      </div>

      <div class="navigation-buttons">
        <button @click="navigateToLastLesson" class="btn btn-outline-primary">
          Back to Lessons
        </button>

        <button
          v-if="hasNextSection"
          @click="navigateToNextSection"
          class="btn btn-primary float-end"
        >
          Next Section
        </button>
      </div>
    </div>

    <BackToTop />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProgressStore } from '../store/progress'
import { useTopicStore } from '../store/topic'
import { getSection, getCurrentCurriculum } from '../utils/curriculumLoader'
import { useAIStore } from '../store/ai'
import CodeEditor from '../components/CodeEditor.vue'
import BackToTop from '../components/BackToTop.vue'
import CodeExample from '../components/CodeExample.vue'
import Prism from 'prismjs'
import { validateApiKey, testApiConnection, MODEL_MAPPINGS } from '../utils/aiService'
import { formatMarkdown } from '../theme/markdownFormatter'
import TermsAndConditions from '../components/TermsAndConditions.vue'

const route = useRoute()
const router = useRouter()
const progressStore = useProgressStore()
const topicStore = useTopicStore()
const aiStore = useAIStore()
const loading = ref(true)
const isCompleted = ref(false)

const apiKey = ref('')
const configSaveStatus = ref('')
const isTestingConnection = ref(false)
const savedResponse = ref(null)
const section = ref(null)
const currentCurriculum = ref([])
const customModel = ref('')
const customEndpoint = ref('')
const customHeaders = ref('')
const aiConfigExpanded = ref(false)

// Load curriculum for the current topic
const loadCurriculum = async () => {
  try {
    currentCurriculum.value = await getCurrentCurriculum()
  } catch (error) {
    console.error('Error loading curriculum:', error)
    currentCurriculum.value = []
  }
}

// Add a computed property and a watcher
const modelVersion = computed({
  get: () => {
    return aiStore.version === 'latest' && aiStore.provider && MODEL_MAPPINGS[aiStore.provider]
      ? MODEL_MAPPINGS[aiStore.provider]
      : aiStore.version
  },
  set: (value) => {
    aiStore.version = value
  },
})

// Update the watcher to watch for provider changes
watch(
  () => aiStore.provider,
  (newProvider) => {
    if (newProvider && aiStore.version === 'latest') {
      // When provider changes, update the version field to show the actual model name
      // But only if the user hasn't manually set a version
      const defaultModel = MODEL_MAPPINGS[newProvider]
      if (defaultModel) {
        aiStore.version = defaultModel
      }
    }
  },
)

// Computed property for the Save Config button class
const configButtonClass = computed(() => {
  if (configSaveStatus.value === 'Saved Successfully') {
    return 'btn-success'
  } else if (configSaveStatus.value === 'Invalid API Key') {
    return 'btn-danger'
  } else if (configSaveStatus.value === 'Connection Failed') {
    return 'btn-danger'
  } else {
    return 'btn-secondary'
  }
})

const sectionId = computed(() => route.params.sectionId)

// Update the section computed property to use the current topic's section
const loadSection = async () => {
  try {
    section.value = await getSection(parseInt(sectionId.value))
  } catch (error) {
    console.error('Error loading section:', error)
    section.value = null
  }
}

const hasNextSection = computed(() => {
  return Number(sectionId.value) < currentCurriculum.value.length
})

// Format AI response with markdown and code highlighting
const formattedResponse = computed(() => {
  if (!aiStore.lastResponse) return ''
  return formatMarkdown(aiStore.lastResponse)
})

// Format date for display
const formatDateTime = (isoString) => {
  try {
    const date = new Date(isoString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date)
  } catch (e) {
    return `Unknown date: ${e.message()}`
  }
}

// Get provider label for display
const getSavedProviderLabel = (providerValue) => {
  if (!providerValue) return 'Unknown AI'

  const provider = aiStore.availableProviders.find((p) => p.value === providerValue)
  return provider ? provider.label : 'Unknown AI'
}

const loadContent = async () => {
  loading.value = true

  // Clear any previous AI response when loading a new section
  aiStore.resetLastResponse()
  savedResponse.value = null

  await loadCurriculum()
  await loadSection()

  setTimeout(() => {
    loading.value = false
    checkCompletion()
    loadSavedResponse()
  }, 300)
}

const checkCompletion = () => {
  const sectionIndex = Number(sectionId.value) - 1
  isCompleted.value = progressStore.isChallengeCompleted(sectionIndex)
}

const loadSavedResponse = () => {
  // Clear any previous response first
  aiStore.resetLastResponse()
  savedResponse.value = null

  // Load any previously saved response for this section
  const response = aiStore.getSavedResponse(sectionId.value)

  // Only set the response if it exists and matches the current section
  if (response && response.sectionId === sectionId.value) {
    savedResponse.value = response
    aiStore.setLastResponse(response.response)
  }
}

const toggleCompletion = () => {
  const sectionIndex = Number(sectionId.value) - 1
  if (isCompleted.value) {
    progressStore.completeSectionChallenge(sectionIndex, true)
  } else {
    progressStore.uncompleteSectionChallenge(sectionIndex, true)
  }
}

const navigateToLastLesson = () => {
  if (!section.value) return

  const lastLessonIndex = section.value.lessons.length

  router.push({
    name: 'lesson',
    params: {
      sectionId: sectionId.value,
      lessonId: lastLessonIndex,
    },
  })
}

const navigateToNextSection = () => {
  const nextSectionId = Number(sectionId.value) + 1

  router.push({
    name: 'lesson',
    params: {
      sectionId: nextSectionId,
      lessonId: 1,
    },
  })
}

// Handle provider change
const handleProviderChange = () => {
  // Reset the save button status when provider changes
  configSaveStatus.value = ''

  // Update custom model and endpoint fields if switch to custom provider
  if (aiStore.isCustomProvider) {
    customModel.value = aiStore.customModel || ''
    customEndpoint.value = aiStore.customEndpoint || ''
    customHeaders.value = aiStore.customHeaders || ''
  } else if (aiStore.provider === 'ollama') {
    // For Ollama, use the current version or default to empty
    modelVersion.value = aiStore.version || ''
    // Set mock API key for Ollama to maintain UI consistency
    apiKey.value = 'OLLAMA-LOCAL-NO-KEY-REQUIRED'
  }
}

// Save AI configuration settings with validation
const saveAIConfig = async () => {
  // Clear any previous errors
  aiStore.clearError()
  configSaveStatus.value = ''

  // Check for API key (skip for Ollama)
  if (aiStore.provider !== 'ollama' && !apiKey.value.trim()) {
    configSaveStatus.value = 'Invalid API Key'
    return
  }

  // Check for model version (required for all providers)
  if (!modelVersion.value.trim()) {
    configSaveStatus.value = 'Model Required'
    aiStore.setError('Please provide a model version')
    return
  }

  // Basic format validation (skip for Ollama)
  if (aiStore.provider !== 'ollama') {
    const isValidFormat = validateApiKey(aiStore.provider, apiKey.value)
    if (!isValidFormat) {
      configSaveStatus.value = 'Invalid API Key'
      return
    }
  }

  // For custom provider, validate the endpoint and model
  if (aiStore.isCustomProvider) {
    if (!customEndpoint.value || !customEndpoint.value.startsWith('http')) {
      aiStore.setError('Please provide a valid API endpoint URL')
      configSaveStatus.value = 'Invalid Endpoint'
      return
    }

    if (!customModel.value) {
      aiStore.setError('Please provide a model name')
      configSaveStatus.value = 'Model Required'
      return
    }

    // Save custom settings
    aiStore.setCustomModel(customModel.value)
    aiStore.setCustomEndpoint(customEndpoint.value)
    aiStore.setCustomHeaders(customHeaders.value)
  }

  // Check if terms are accepted before proceeding
  if (!aiStore.termsAccepted) {
    aiStore.setError('You must accept the Terms and Conditions to use this feature')
    configSaveStatus.value = 'Terms Required'
    return
  }

  // Test the connection with the API
  isTestingConnection.value = true
  try {
    // Skip API test for Ollama since it's local
    if (aiStore.provider !== 'ollama') {
      await testApiConnection(
        aiStore.provider,
        apiKey.value,
        customModel.value,
        customEndpoint.value,
        customHeaders.value,
        modelVersion.value,
      )
    }

    // If successful, save to store
    // For Ollama, we still save the mock key to maintain UI consistency
    if (aiStore.provider === 'ollama') {
      aiStore.setApiKey('OLLAMA-LOCAL-NO-KEY-REQUIRED')
    } else {
      aiStore.setApiKey(apiKey.value)
    }
    aiStore.setVersion(modelVersion.value)
    aiStore.saveSettings()
    configSaveStatus.value = 'Saved Successfully'

    // Reset the status after a few seconds
    setTimeout(() => {
      configSaveStatus.value = ''
    }, 3000)
  } catch (error) {
    configSaveStatus.value = 'Connection Failed'
    aiStore.setError(error.message)
  } finally {
    isTestingConnection.value = false
  }
}

// Handle the code graded event from CodeEditor component
const handleCodeGraded = (response) => {
  // If we received a new response, use it directly
  if (response) {
    aiStore.setLastResponse(response)
    savedResponse.value = aiStore.getSavedResponse(sectionId.value)
  } else {
    // Otherwise reload the saved response
    loadSavedResponse()
  }

  // Ensure Prism highlights any code in the response
  nextTick(() => {
    Prism.highlightAll()
  })
}

// Accept terms inline button
const acceptTermsInline = () => {
  aiStore.acceptTerms()
  // Reset button text after accepting terms
  configSaveStatus.value = ''
}

// Listen for terms acceptance event
const listenForTermsAcceptance = () => {
  document.addEventListener('terms-accepted', () => {
    if (configSaveStatus.value === 'Terms Required') {
      configSaveStatus.value = ''
    }
  })
}

// Toggle AI configuration section
const toggleAIConfig = () => {
  aiConfigExpanded.value = !aiConfigExpanded.value
}

onMounted(async () => {
  // Load challenge content
  await loadContent()

  // Load AI settings if not already loaded
  if (!aiStore.isLoaded) {
    aiStore.loadSettings()
  }

  // Set the apiKey from store
  apiKey.value = aiStore.apiKey
  customModel.value = aiStore.customModel || ''
  customEndpoint.value = aiStore.customEndpoint || ''
  customHeaders.value = aiStore.customHeaders || ''

  // Apply Prism highlighting
  nextTick(() => {
    Prism.highlightAll()
  })

  // Setup terms acceptance listener
  listenForTermsAcceptance()
})

// Watch for changes in AI settings
watch(
  () => aiStore.apiKey,
  (newValue) => {
    if (aiStore.provider === 'ollama') {
      apiKey.value = 'OLLAMA-LOCAL-NO-KEY-REQUIRED'
    } else {
      apiKey.value = newValue
    }
  },
)

// Watch for changes in custom model
watch(
  () => aiStore.customModel,
  (newValue) => {
    customModel.value = newValue
  },
)

// Watch for provider changes
watch(
  () => aiStore.provider,
  (newProvider) => {
    if (newProvider === 'ollama') {
      apiKey.value = 'OLLAMA-LOCAL-NO-KEY-REQUIRED'
    }
    handleProviderChange()
  },
)

// Watch for changes in route or topic
watch([sectionId, () => topicStore.currentTopic], () => {
  // Clear any existing response when changing sections
  aiStore.resetLastResponse()
  savedResponse.value = null
  loadContent()
})

// Apply syntax highlighting when response changes
watch(
  () => aiStore.lastResponse,
  () => {
    nextTick(() => {
      Prism.highlightAll()
    })
  },
)

// Watch for changes in terms acceptance state
watch(
  () => aiStore.termsAccepted,
  (newValue) => {
    // If terms were just accepted, reset the button text if it's showing "Terms Required"
    if (newValue && configSaveStatus.value === 'Terms Required') {
      configSaveStatus.value = ''
    }
  },
)
</script>

<style scoped>
.challenge-summary {
  max-width: 900px;
  margin: 0 auto;
  min-height: 400px;
  position: relative;
  color: var(--text-color);
  transition: all var(--transition-speed) ease;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.error-message {
  margin: 40px auto;
}

.challenge-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.challenge-title {
  color: var(--text-color);
  margin-bottom: 10px;
}

.challenge-description {
  margin-bottom: 30px;
  padding: 15px;
  background-color: var(--bg-card);
  border-radius: 5px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  transition: all var(--transition-speed) ease;
}

.requirements {
  margin-bottom: 30px;
  color: var(--text-color);
}

.requirements h3 {
  margin-bottom: 15px;
  color: var(--text-color);
}

.requirements ul {
  padding-left: 20px;
}

.requirements li {
  margin-bottom: 8px;
}

.starter-code {
  background-color: var(--bg-card);
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  border: 1px solid var(--border-color);
  transition: all var(--transition-speed) ease;
  box-shadow: var(--shadow-sm);
}

.starter-code h3 {
  color: var(--text-color);
  margin-bottom: 10px;
  font-weight: 600;
}

.code-wrapper {
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  background-color: var(--bg-code);
  border: 1px solid var(--border-color);
}

.scrollable-code {
  background-color: var(--bg-code);
  color: var(--text-color);
  padding: 12px 15px;
  margin: 0;
  font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
  overflow-x: auto;
  border-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
}

.code-copy-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(var(--primary-color-rgb), 0.9);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.85rem;
}

.code-copy-btn:hover {
  background-color: var(--primary-color);
  transform: scale(1.05);
}

.code-copy-btn:active {
  transform: scale(0.95);
}

.ai-config-section {
  margin: 30px 0;
  padding: 0;
  background-color: var(--bg-card);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  transition: all var(--transition-speed) ease;
  overflow: hidden;
}

.ai-config-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  cursor: pointer;
  background-color: var(--bg-sidebar);
  border-bottom: 1px solid var(--border-color);
  transition: all 0.2s ease;
  user-select: none;
  outline: none;
}

.ai-config-header:hover {
  background-color: var(--hover-color);
}

.ai-config-header:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: -2px;
}

.ai-config-header:focus:not(:focus-visible) {
  outline: none;
}

.ai-config-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ai-config-title h3 {
  margin: 0;
  color: var(--text-color);
  font-weight: 600;
  font-size: 1.1rem;
}

.ai-config-title i {
  color: var(--primary-color);
  font-size: 1.1rem;
}

.ai-config-toggle {
  color: var(--text-muted);
  font-size: 1.2rem;
  transition: transform 0.2s ease;
}

.ai-config-toggle:hover {
  color: var(--text-color);
}

.ai-config-content {
  padding: 25px;
  background-color: var(--bg-card);
  transition: all 0.3s ease;
  max-height: 2000px;
  opacity: 1;
  overflow: hidden;
}

.ai-config-content.collapsed {
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  opacity: 0;
}

.ai-config-warning {
  margin-bottom: 20px;
  padding: 15px;
  background-color: rgba(var(--warning-color-rgb), 0.1);
  border-left: 4px solid var(--warning-color);
  border-radius: 4px;
  font-size: 0.9rem;
  color: var(--text-color);
}

.config-row {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: flex-start;
}

.config-item {
  flex: 1;
  min-width: 100px;
  display: flex;
  flex-direction: column;
}

.api-key-input {
  flex: 1;
}

.config-button-item {
  align-self: flex-end;
  flex: 0.75;
}

.form-label {
  margin-bottom: 6px;
  font-weight: 500;
  color: var(--text-color);
}

/* Enhanced form control styling */
:deep(.form-control),
:deep(.form-select) {
  background-color: var(--bg-input);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
  border-radius: 6px;
  padding: 8px 12px;
}

:deep(.form-select) {
  appearance: auto;
  background-image: none;
}

:deep(.form-select) option {
  background-color: var(--bg-card);
  color: var(--text-color);
}

:deep(.form-control:focus),
:deep(.form-select:focus) {
  background-color: var(--bg-input);
  color: var(--text-color);
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.25rem rgba(var(--primary-color-rgb), 0.25);
  outline: none;
}

:deep(.form-control::placeholder),
:deep(.form-select::placeholder) {
  color: var(--text-muted);
  opacity: 0.6;
}

:deep(.form-control:disabled),
:deep(.form-select:disabled) {
  background-color: var(--bg-card);
  color: var(--text-muted);
  cursor: not-allowed;
  opacity: 0.7;
}

/* Button improvements */
:deep(.btn) {
  transition: all 0.2s ease;
  font-weight: 500;
  border-radius: 6px;
}

:deep(.btn:disabled) {
  opacity: 0.6;
  cursor: not-allowed;
}

:deep(.btn-warning) {
  background-color: var(--warning-color);
  border-color: var(--warning-color);
  color: white;
}

:deep(.btn-warning:hover:not(:disabled)) {
  background-color: #d97706;
  border-color: #d97706;
  transform: translateY(-1px);
}

:deep(.btn-danger) {
  background-color: var(--danger-color);
  border-color: var(--danger-color);
  color: white;
}

:deep(.btn-danger:hover:not(:disabled)) {
  background-color: #dc2626;
  border-color: #dc2626;
  transform: translateY(-1px);
}

:deep(.btn-success) {
  background-color: var(--success-color);
  border-color: var(--success-color);
  color: white;
}

:deep(.btn-success:hover:not(:disabled)) {
  background-color: #059669;
  border-color: #059669;
  transform: translateY(-1px);
}

:deep(.btn-secondary) {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
  color: white;
}

:deep(.btn-secondary:hover:not(:disabled)) {
  background-color: #5a6268;
  border-color: #5a6268;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .config-row {
    flex-direction: column;
    gap: 15px;
  }

  .config-item {
    width: 100%;
    flex: unset;
  }

  .config-button-item {
    align-self: stretch;
  }
}

.ai-response-section {
  margin: 30px 0 40px;
  padding: 25px;
  background-color: var(--bg-card);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  transition: all var(--transition-speed) ease;
}

.ai-response-section h3 {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-color);
  font-weight: 600;
}

.loading-response {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  color: var(--text-color);
}

.response-content {
  max-height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 15px;
  line-height: 1.6;
  scrollbar-width: thin;
  scrollbar-color: rgba(128, 128, 128, 0.4) transparent;
  background-color: var(--bg-content);
  border-radius: 6px;
  border: 1px solid var(--border-color);
}

.response-content::-webkit-scrollbar {
  width: 8px;
}

.response-content::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 4px;
}

.response-content::-webkit-scrollbar-thumb {
  background-color: rgba(128, 128, 128, 0.4);
  border-radius: 4px;
}

.response-content::-webkit-scrollbar-thumb:hover {
  background-color: rgba(128, 128, 128, 0.6);
}

.saved-response-info {
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid var(--border-color);
  text-align: right;
  color: var(--text-muted);
}

.form-check-input {
  background-color: var(--bg-input);
  border-color: var(--border-color);
}

.form-check-input:checked {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.form-check-label {
  color: var(--text-color);
}

/* Enhanced markdown content styling */
.markdown-content :deep(.md-inline-code) {
  font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  background-color: var(--bg-code);
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-size: 0.9em;
  border: 1px solid rgba(var(--primary-color-rgb), 0.2);
  color: var(--text-color);
}

.markdown-content :deep(pre) {
  background-color: var(--bg-code);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 15px;
  overflow-x: auto;
  margin: 15px 0;
}

.markdown-content :deep(code) {
  font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  color: var(--text-color);
}

/* Enhanced title spacing for AI response section */
.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4),
.markdown-content :deep(h5),
.markdown-content :deep(h6) {
  margin-top: 30px;
  margin-bottom: 15px;
  color: var(--text-color);
  font-weight: 600;
}

.markdown-content :deep(h1:first-child),
.markdown-content :deep(h2:first-child),
.markdown-content :deep(h3:first-child),
.markdown-content :deep(h4:first-child),
.markdown-content :deep(h5:first-child),
.markdown-content :deep(h6:first-child) {
  margin-top: 15px;
}

.markdown-content :deep(p) {
  margin-bottom: 15px;
  line-height: 1.6;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin-bottom: 15px;
  padding-left: 20px;
}

.markdown-content :deep(li) {
  margin-bottom: 8px;
}

/* Dark mode specific improvements */
:root[data-theme='dark'] .scrollable-code {
  background-color: #0f172a;
  color: #f3f4f6;
}

:root[data-theme='dark'] .markdown-content :deep(pre) {
  background-color: #0f172a;
  border-color: #374151;
}

:root[data-theme='dark'] .markdown-content :deep(code) {
  color: #f3f4f6;
}

/* Remove unwanted borders on code lines in dark mode */
:root[data-theme='dark'] .markdown-content :deep(.token) {
  border: none;
}

:root[data-theme='dark'] .scrollable-code .token {
  border: none;
}

/* Light mode specific improvements */
:root[data-theme='light'] .scrollable-code {
  background-color: #ffffff;
}

:root[data-theme='light'] .markdown-content :deep(pre) {
  background-color: #f8f9fa;
  border-color: #dee2e6;
}

:root[data-theme='light'] .markdown-content :deep(code) {
  color: #333333;
}

/* Alert styling improvements */
.alert-danger {
  background-color: rgba(var(--danger-color-rgb), 0.1);
  border: 1px solid rgba(var(--danger-color-rgb), 0.2);
  color: var(--danger-color);
  border-radius: 6px;
  padding: 15px;
}

@media (max-width: 768px) {
  .challenge-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .challenge-title {
    margin-bottom: 15px;
  }

  .completion-status {
    margin-bottom: 10px;
  }

  .navigation-buttons {
    flex-direction: row;
    gap: 10px;
  }

  .navigation-buttons button {
    width: 100%;
  }

  .float-end {
    float: none !important;
  }
}
</style>
