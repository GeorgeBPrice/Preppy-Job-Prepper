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
        <div class="code-wrapper">
          <pre
            class="scrollable-code"
          ><code class="language-javascript" v-html="highlightedCode(section.challenge.starterCode)"></code></pre>
          <div
            class="code-copy-btn"
            @click="copyCode(section.challenge.starterCode)"
            title="Copy code"
          >
            <i class="bi bi-clipboard"></i>
          </div>
        </div>
      </div>

      <!-- AI Configuration section -->
      <div class="ai-config-section">
        <h3>AI Code Review Settings</h3>
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
          <div class="config-item">
            <label for="ai-version" class="form-label">Model Version</label>
            <input
              id="ai-version"
              type="text"
              v-model="modelVersion"
              class="form-control"
              placeholder="latest"
            />
          </div>
          <div class="config-item api-key-input">
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
            <button @click="saveAIConfig" class="btn" :class="configButtonClass">
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
      </div>

      <CodeEditor
        :sectionId="Number(sectionId)"
        :isChallenge="true"
        @code-graded="handleCodeGraded"
      />

      <!-- AI Response section -->
      <div class="ai-response-section" v-if="aiStore.lastResponse || aiStore.isLoading">
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
import { useAIStore } from '../store/ai'
import { curriculum } from '../data/curriculum'
import CodeEditor from '../components/CodeEditor.vue'
import BackToTop from '../components/BackToTop.vue'
import Prism from 'prismjs'
import { validateApiKey, testApiConnection, MODEL_MAPPINGS } from '../utils/aiService'
import { formatMarkdown } from '../theme/markdownFormatter'

const route = useRoute()
const router = useRouter()
const progressStore = useProgressStore()
const aiStore = useAIStore()
const loading = ref(true)
const isCompleted = ref(false)
const copySuccess = ref(false)
const apiKey = ref('')
const configSaveStatus = ref('')
const isTestingConnection = ref(false)
const savedResponse = ref(null)

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

const section = computed(() => {
  const sectionIndex = Number(sectionId.value) - 1
  return curriculum[sectionIndex] || null
})

const hasNextSection = computed(() => {
  return Number(sectionId.value) < curriculum.length
})

// Format AI response with markdown and code highlighting
const formattedResponse = computed(() => {
  if (!aiStore.lastResponse) return ''
  return formatMarkdown(aiStore.lastResponse)
})

// Function to highlight code for display
const highlightedCode = (code) => {
  return Prism.highlight(code, Prism.languages.javascript, 'javascript')
}

// Function to copy code to clipboard
const copyCode = (code) => {
  navigator.clipboard.writeText(code).then(
    () => {
      copySuccess.value = true
      console.log('Code copied to clipboard')

      // Reset after a brief period
      setTimeout(() => {
        copySuccess.value = false
      }, 2000)
    },
    (err) => {
      console.error('Could not copy code: ', err)
    },
  )
}

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

const loadContent = () => {
  loading.value = true
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
  // Load any previously saved response for this section
  savedResponse.value = aiStore.getSavedResponse(sectionId.value)

  // If there's a saved response, display it
  if (savedResponse.value && savedResponse.value.response) {
    aiStore.setLastResponse(savedResponse.value.response)
  }
}

const toggleCompletion = () => {
  const sectionIndex = Number(sectionId.value) - 1
  if (isCompleted.value) {
    progressStore.completeSectionChallenge(sectionIndex)
  } else {
    progressStore.uncompleteSectionChallenge(sectionIndex)
  }
}

const navigateToLastLesson = () => {
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
}

// Save AI configuration settings with validation
const saveAIConfig = async () => {
  aiStore.clearError()
  configSaveStatus.value = ''

  if (!apiKey.value.trim()) {
    configSaveStatus.value = 'Invalid API Key'
    return
  }

  // Basic format validation
  const isValidFormat = validateApiKey(aiStore.provider, apiKey.value)
  if (!isValidFormat) {
    configSaveStatus.value = 'Invalid API Key'
    return
  }

  // Test the connection with the API
  isTestingConnection.value = true
  try {
    await testApiConnection(aiStore.provider, apiKey.value)

    // If successful, save to store
    aiStore.setApiKey(apiKey.value)
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
const handleCodeGraded = () => {
  // Reload saved response data
  loadSavedResponse()

  // Ensure Prism highlights any code in the response
  nextTick(() => {
    Prism.highlightAll()
  })
}

onMounted(() => {
  // Load challenge content
  loadContent()

  // Load AI settings if not already loaded
  if (!aiStore.isLoaded) {
    aiStore.loadSettings()
  }

  // Set the apiKey from store
  apiKey.value = aiStore.apiKey

  // Apply Prism highlighting
  nextTick(() => {
    Prism.highlightAll()
  })
})

// Watch for changes in AI settings
watch(
  () => aiStore.apiKey,
  (newValue) => {
    apiKey.value = newValue
  },
)

watch(sectionId, () => {
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

/* Starter code with copy button and scrolling */
.starter-code {
  background-color: var(--bg-code-example);
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 30px;
  border: 1px solid var(--border-color);
  transition: all var(--transition-speed) ease;
}

.starter-code h3 {
  color: var(--text-color);
  margin-bottom: 15px;
}

.code-wrapper {
  position: relative;
  border-radius: 6px;
  overflow: hidden;
}

.scrollable-code {
  margin: 0;
  padding: 15px;
  background-color: #000000;
  border-radius: 4px;
  overflow-x: auto;
  overflow-y: auto;
  max-height: 70vh; /* Maximum height of 70% of viewport height */
  transition: all var(--transition-speed) ease;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

/* Custom scrollbar styles */
.scrollable-code::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.scrollable-code::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 4px;
}

.scrollable-code::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.scrollable-code::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.code-copy-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: rgba(255, 255, 255, 0.5);
  color: var(--text-light);
  border: none;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0.6;
  z-index: 5;
}

.code-wrapper:hover .code-copy-btn {
  opacity: 1;
}

.code-copy-btn:hover {
  background-color: var(--primary-color);
  color: white;
}

/* AI Configuration styling */
.ai-config-section {
  margin: 30px 0;
  padding: 20px;
  background-color: var(--bg-card);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
}

.ai-config-section h3 {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
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

/* Responsive adjustments */
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

/* AI Response section */
.ai-response-section {
  margin-top: 30px;
  padding: 20px;
  background-color: var(--bg-card);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
}

.ai-response-section h3 {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-color);
}

.loading-response {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
}

.response-content {
  max-height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
  line-height: 1.6;
  scrollbar-width: thin;
  scrollbar-color: rgba(128, 128, 128, 0.4) transparent;
}

/* Custom scrollbar for response content */
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

/* Saved response info */
.saved-response-info {
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid var(--border-color);
  text-align: right;
}

/* Markdown content styling */
.markdown-content {
  color: var(--text-color);
}

.markdown-content :deep(.md-h1),
.markdown-content :deep(.md-h2),
.markdown-content :deep(.md-h3),
.markdown-content :deep(.md-h4),
.markdown-content :deep(.md-h5),
.markdown-content :deep(.md-h6) {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--text-color);
}

.markdown-content :deep(.md-h1) {
  font-size: 1.8rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

.markdown-content :deep(.md-h2) {
  font-size: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.3rem;
}

.markdown-content :deep(.md-h3) {
  font-size: 1.3rem;
}

.markdown-content :deep(.md-h4) {
  font-size: 1.1rem;
}

.markdown-content :deep(.md-p) {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.markdown-content :deep(.md-ul),
.markdown-content :deep(.md-ol) {
  margin-bottom: 1rem;
  padding-left: 2rem;
}

.markdown-content :deep(.md-li) {
  margin-bottom: 0.5rem;
}

.markdown-content :deep(.md-blockquote) {
  border-left: 4px solid var(--primary-color);
  padding-left: 1rem;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 1rem;
  font-style: italic;
  color: var(--text-muted);
}

.markdown-content :deep(.md-hr) {
  margin: 2rem 0;
  border: 0;
  border-top: 1px solid var(--border-color);
}

.markdown-content :deep(.md-inline-code) {
  font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  background-color: var(--bg-code);
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-size: 0.9em;
  border: 1px solid rgba(var(--primary-color-rgb, 79, 70, 229), 0.2);
}

.markdown-content :deep(.md-link) {
  color: var(--primary-color);
  text-decoration: none;
  border-bottom: 1px dotted var(--primary-color);
}

.markdown-content :deep(.md-link:hover) {
  border-bottom: 1px solid var(--primary-color);
}

.markdown-content :deep(.md-strong) {
  font-weight: 600;
  color: var(--text-color);
}

.markdown-content :deep(.md-em) {
  font-style: italic;
}

/* Apply syntax highlighting to AI response */
.markdown-content :deep(pre) {
  background-color: #0e0023;
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto;
  margin: 15px 0;
  position: relative;
}

.markdown-content :deep(code) {
  font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
}

.navigation-buttons {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
}

/* Make sure form check elements are properly styled for dark mode */
.form-check-input {
  background-color: var(--bg-content);
  border-color: var(--border-color);
}

.form-check-label {
  color: var(--text-color);
}

/* Responsiveness */
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

  .config-row {
    flex-direction: column;
    gap: 15px;
  }

  .config-item {
    width: 100%;
    flex: unset;
  }

  .navigation-buttons {
    flex-direction: column;
    gap: 10px;
  }

  .navigation-buttons button {
    width: 100%;
  }

  .float-end {
    float: none !important;
  }
}

/* Proper dark mode support for alerts */
html[data-theme='dark'] .alert-danger,
body.dark-mode .alert-danger {
  background-color: rgba(220, 53, 69, 0.2);
  color: #ea868f;
  border-color: rgba(220, 53, 69, 0.3);
}

/* Prism code highlighting in light mode */
html[data-theme='light'] .markdown-content :deep(pre),
body.dark-mode .markdown-content :deep(pre) {
  background-color: #1f0527;
}

/* Prism code highlighting in dark mode */
html[data-theme='dark'] .scrollable-code,
body.dark-mode .scrollable-code {
  background-color: #0f0f28;
}

html[data-theme='dark'] .markdown-content :deep(pre),
body.dark-mode .markdown-content :deep(pre) {
  background-color: #1b0329;
}

html[data-theme='dark'] .markdown-content :deep(code),
body.dark-mode .markdown-content :deep(code) {
  color: #e4e4e4;
  text-shadow: none;
}
</style>
