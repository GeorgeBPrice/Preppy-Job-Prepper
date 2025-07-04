<template>
  <div class="chat-settings">
    <h3 class="settings-title">Chat Settings</h3>

    <!-- Alert for API key missing -->
    <div v-if="showAlert" class="alert alert-warning" role="alert">
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      <span> You need to configure an API key to use the AI chat feature. </span>
    </div>

    <!-- Error messages -->
    <div v-if="aiChatStore.error" class="alert alert-danger mb-3">
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      {{ aiChatStore.error }}
    </div>

    <!-- Terms and conditions warning -->
    <div class="settings-warning mb-3">
      <p>
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        <strong>Important:</strong> API keys are stored in your browser's localStorage and are used
        to make requests to AI providers. Chat messages are routed through our proxy server for
        security, and your API key is only used in-memory. By using this feature, you accept our
        Terms and Conditions and acknowledge that you use this functionality at your own risk.
        <TermsAndConditions />
      </p>
      <div v-if="!aiChatStore.termsAccepted" class="mt-2">
        <button @click="acceptTerms" class="btn btn-sm btn-warning">
          Accept Terms to Continue
        </button>
      </div>
    </div>

    <!-- Provider Selection -->
    <div class="form-group mb-3">
      <label for="chat-ai-provider" class="form-label">AI Provider</label>
      <select
        id="chat-ai-provider"
        v-model="provider"
        class="form-select"
        @change="handleProviderChange"
        :disabled="isTesting"
      >
        <option
          v-for="provider in aiChatStore.availableProviders"
          :key="provider.value"
          :value="provider.value"
        >
          {{ provider.label }}
        </option>
      </select>
    </div>

    <!-- Streaming toggle -->
    <div class="mb-3 form-check">
      <input
        type="checkbox"
        class="form-check-input"
        id="streamingToggle"
        v-model="streamingEnabled"
        :checked="false"
      />
      <label class="form-check-label" for="streamingToggle">
        Enable streaming responses <small>(WARNING: not all models stream nicely)</small>
      </label>
    </div>

    <!-- API Key -->
    <div class="form-group mb-3" v-if="provider !== 'ollama'">
      <label for="chat-api-key" class="form-label">API Key</label>
      <input
        id="chat-api-key"
        type="password"
        v-model="apiKey"
        class="form-control"
        placeholder="Your API Key"
      />
    </div>

    <!-- Ollama Model Selection -->
    <div class="form-group mb-3" v-if="provider === 'ollama'">
      <label for="ollama-model" class="form-label">Ollama Model</label>
      <input
        id="ollama-model"
        type="text"
        v-model="version"
        class="form-control"
        placeholder="e.g. deepseek:latest, llama2:latest, mistral:latest"
      />
      <small class="form-text-label">
        Enter the name of your locally installed Ollama model. You can see available models by
        running <code>ollama list</code> in your terminal.
      </small>
    </div>

    <!-- Model Version -->
    <div class="form-group mb-3" v-if="!aiChatStore.isCustomProvider && provider !== 'ollama'">
      <label for="chat-ai-version" class="form-label">Model Version</label>
      <input id="chat-ai-version" type="text" v-model="version" class="form-control" />
    </div>

    <!-- Custom Provider Settings -->
    <div v-if="aiChatStore.isCustomProvider">
      <div class="form-group mb-3">
        <label for="chat-custom-endpoint" class="form-label">API Endpoint</label>
        <input
          id="chat-custom-endpoint"
          type="text"
          v-model="customEndpoint"
          class="form-control"
          placeholder="https://api.example.com/v1/chat"
        />
      </div>

      <div class="form-group mb-3">
        <label for="chat-custom-model" class="form-label">Model Name</label>
        <input
          id="chat-custom-model"
          type="text"
          v-model="customModel"
          class="form-control"
          placeholder="model-name"
        />
      </div>

      <div class="form-group mb-3">
        <label for="chat-custom-headers" class="form-label">
          Custom Headers (optional, JSON format)
          <i
            class="bi bi-info-circle"
            title="Provide custom headers in JSON format, e.g. { 'Authorization': 'Bearer YOUR_KEY' }"
          ></i>
        </label>
        <textarea
          id="chat-custom-headers"
          v-model="customHeaders"
          class="form-control"
          placeholder='{ "Content-Type": "application/json", "Authorization": "Bearer YOUR_KEY" }'
          rows="3"
        ></textarea>
      </div>
    </div>

    <!-- System Prompt -->
    <div class="form-group mb-3">
      <label for="chat-system-prompt" class="form-label">
        System Prompt (optional)
        <i
          class="bi bi-info-circle"
          title="Custom instructions for the AI about how to behave. Leave empty to use default."
        ></i>
      </label>
      <textarea
        id="chat-system-prompt"
        v-model="systemPrompt"
        class="form-control"
        placeholder="Instructions such as 'I am a senior developer'..."
        rows="3"
      ></textarea>
    </div>

    <!-- Terms checkbox -->
    <div class="mb-3 form-check">
      <input
        type="checkbox"
        class="form-check-input"
        id="termsCheck"
        v-model="termsAccepted"
        :disabled="isTesting"
      />
      <label class="form-check-label" for="termsCheck">
        I accept the <a href="#" @click.prevent="showTermsModal = true">Terms and Conditions</a>
      </label>
    </div>

    <!-- Save Button -->
    <div class="form-group mb-3">
      <div class="button-group">
        <button
          @click="showConfirm('save')"
          class="btn"
          :class="saveButtonClass"
          :disabled="isSaving || (provider !== 'ollama' && !apiKey)"
        >
          <span v-if="isSaving">
            <span
              class="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Saving...
          </span>
          <span v-else>
            {{ saveStatus || 'Save Settings' }}
          </span>
        </button>
        <button
          v-if="aiChatStore.apiKey"
          @click="showConfirm('deleteApiKey')"
          class="btn btn-outline-danger"
          title="Delete your API key"
        >
          Delete API Key
        </button>
      </div>
    </div>

    <!-- Clear Conversations Button -->
    <div class="form-group">
      <button
        @click="showConfirm('clearConversations')"
        class="btn btn-outline-danger"
        title="Clear all chat history"
      >
        <i class="bi bi-trash me-1"></i> Clear Conversations
      </button>
    </div>
    <ConfirmDialog
      :show="confirmType !== null"
      :message="confirmMessage"
      @cancel="confirmType = null"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useAIChatStore } from '../store/aiChat'
import { testChatApiConnection } from '../utils/aiChatService'
import TermsAndConditions from './TermsAndConditions.vue'
import ConfirmDialog from './ConfirmDialog.vue'

const aiChatStore = useAIChatStore()

// Form state
const provider = ref(aiChatStore.provider)
const apiKey = ref(aiChatStore.apiKey)
const version = ref(aiChatStore.version)
const customModel = ref(aiChatStore.customModel)
const customEndpoint = ref(aiChatStore.customEndpoint)
const customHeaders = ref(aiChatStore.customHeaders)
const systemPrompt = ref(aiChatStore.systemPrompt)
const isSaving = ref(false)
const saveStatus = ref('')
const showAlert = ref(!aiChatStore.apiKey)
const confirmType = ref(null)
const confirmMessage = ref('')
const streamingEnabled = ref(true)
const termsAccepted = ref(false)
const isTesting = ref(false)

// Computed properties
const saveButtonClass = computed(() => {
  if (saveStatus.value === 'Saved Successfully') {
    return 'btn-success'
  } else if (saveStatus.value === 'Invalid API Key' || saveStatus.value === 'Connection Failed') {
    return 'btn-danger'
  } else {
    return 'btn-secondary'
  }
})

const handleProviderChange = () => {
  saveStatus.value = ''

  if (aiChatStore.isCustomProvider) {
    customModel.value = aiChatStore.customModel || ''
    customEndpoint.value = aiChatStore.customEndpoint || ''
    customHeaders.value = aiChatStore.customHeaders || ''
  } else if (provider.value === 'ollama') {
    // For Ollama, use the current version, no key is required
    version.value = aiChatStore.version || ''
    apiKey.value = 'OLLAMA-LOCAL-NO-KEY-REQUIRED'
  }
}

const saveSettings = async () => {
  aiChatStore.clearError()
  saveStatus.value = ''

  // Check the API key (skip for Ollama)
  if (!apiKey.value.trim() && provider.value !== 'ollama') {
    saveStatus.value = 'Invalid API Key'
    return
  }

  // Check the model version
  if (!version.value.trim()) {
    saveStatus.value = 'Model Required'
    aiChatStore.setError('Please provide a model version')
    return
  }

  // validate the endpoint and model
  if (aiChatStore.isCustomProvider) {
    if (!customEndpoint.value || !customEndpoint.value.startsWith('http')) {
      aiChatStore.setError('Please provide a valid API endpoint URL')
      saveStatus.value = 'Invalid Endpoint'
      return
    }

    if (!customModel.value) {
      aiChatStore.setError('Please provide a model name')
      saveStatus.value = 'Model Required'
      return
    }

    // Save custom settings
    aiChatStore.setCustomModel(customModel.value)
    aiChatStore.setCustomEndpoint(customEndpoint.value)
    aiChatStore.setCustomHeaders(customHeaders.value)
  }

  // Check if terms are accepted before proceeding
  if (!termsAccepted.value) {
    aiChatStore.setError('You must accept the Terms and Conditions to use this feature')
    saveStatus.value = 'Terms Required'
    return
  }

  // Test the connection with the API
  isSaving.value = true
  try {
    // Skip API test for Ollama since it's local
    if (provider.value !== 'ollama') {
      await testChatApiConnection(
        provider.value,
        apiKey.value,
        customModel.value,
        customEndpoint.value,
        customHeaders.value,
      )
    }

    // If successful, save to store
    aiChatStore.setProvider(provider.value)
    aiChatStore.setApiKey(apiKey.value)
    aiChatStore.setVersion(version.value)
    aiChatStore.setSystemPrompt(systemPrompt.value)
    aiChatStore.setStreaming(streamingEnabled.value)
    aiChatStore.setTermsAccepted(termsAccepted.value)
    aiChatStore.saveSettings()
    saveStatus.value = 'Saved Successfully'
    showAlert.value = false

    // Reset the status after a few seconds
    setTimeout(() => {
      saveStatus.value = ''
    }, 3000)
  } catch (error) {
    saveStatus.value = 'Connection Failed'
    aiChatStore.setError(error.message)
  } finally {
    isSaving.value = false
  }
}

const acceptTerms = () => {
  aiChatStore.acceptTerms()
  if (saveStatus.value === 'Terms Required') {
    saveStatus.value = ''
  }
}

const showConfirm = (type) => {
  confirmType.value = type
  if (type === 'save') confirmMessage.value = 'Are you sure you want to save these settings?'
  else if (type === 'deleteApiKey')
    confirmMessage.value =
      'Are you sure you want to delete your API key? You will need to re-enter it to use the AI chat.'
  else if (type === 'clearConversations')
    confirmMessage.value =
      'Are you sure you want to clear all chat conversations? This action cannot be undone.'
}

async function handleConfirm() {
  if (confirmType.value === 'save') {
    await saveSettings()
  } else if (confirmType.value === 'deleteApiKey') {
    aiChatStore.deleteAPIKey()
    apiKey.value = ''
    saveStatus.value = 'API Key Deleted'
    setTimeout(() => {
      saveStatus.value = ''
    }, 3000)
    showAlert.value = true
  } else if (confirmType.value === 'clearConversations') {
    aiChatStore.clearAllConversations()
  }
  confirmType.value = null
}

// Watch for changes in API settings
watch(
  () => aiChatStore.apiKey,
  (newValue) => {
    apiKey.value = newValue
    showAlert.value = !newValue && provider.value !== 'ollama'
  },
)

// Watch for changes in terms acceptance state
watch(termsAccepted, (newValue) => {
  if (saveStatus.value === 'Terms Required' && newValue) {
    saveStatus.value = ''
  }
})

// Watch for changes to streaming toggle
watch(streamingEnabled, (newValue) => {
  aiChatStore.setStreaming(newValue)
})

// Add a watch for provider changes to handle Ollama case
watch(
  () => provider.value,
  (newProvider) => {
    if (newProvider === 'ollama') {
      apiKey.value = 'OLLAMA-LOCAL-NO-KEY-REQUIRED'
      showAlert.value = false
    } else if (!apiKey.value) {
      showAlert.value = true
    }
  },
)

onMounted(() => {
  if (!aiChatStore.isLoaded) {
    aiChatStore.loadSettings()
  }

  // Update form values from store
  provider.value = aiChatStore.provider
  apiKey.value = aiChatStore.apiKey
  version.value = aiChatStore.version
  customModel.value = aiChatStore.customModel
  customEndpoint.value = aiChatStore.customEndpoint
  customHeaders.value = aiChatStore.customHeaders
  systemPrompt.value = aiChatStore.systemPrompt
  termsAccepted.value = aiChatStore.termsAccepted
  streamingEnabled.value = aiChatStore.useStreaming
  showAlert.value = !aiChatStore.apiKey
})
</script>

<style scoped>
.chat-settings {
  padding: 15px 0;
  color: var(--text-color);
}

.settings-title {
  font-size: 1.3rem;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border-color);
}

.settings-warning {
  font-size: 0.9rem;
  padding: 10px;
  background-color: rgba(var(--warning-color-rgb, 255, 193, 7), 0.1);
  border-left: 3px solid var(--warning-color);
  border-radius: 4px;
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

/* dark mode form controls */
:deep(.form-control),
:deep(.form-select) {
  background-color: var(--bg-input);
  color: var(--text-color);
  border-color: var(--border-color);
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
}

:deep(.form-control::placeholder),
:deep(.form-select::placeholder) {
  color: var(--text-muted);
  opacity: 0.6;
}

.alert {
  margin-bottom: 15px;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .chat-settings {
    padding: 10px;
  }
}
</style>
