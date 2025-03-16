<template>
  <div class="code-editor">
    <div class="editor-header">
      <h4>Your Lesson Solution</h4>
    </div>
    <div class="editor-content">
      <textarea
        v-model="code"
        class="code-textarea"
        rows="10"
        placeholder="Paste your code here..."
      ></textarea>
    </div>
    <div class="editor-preview" v-if="code">
      <h5>Preview:</h5>
      <div class="preview-container">
        <pre
          class="limited-height-preview"
        ><code class="language-javascript" v-html="highlightedCode"></code></pre>
      </div>
    </div>
    <div class="editor-footer">
      <button @click="saveCode" class="btn btn-primary">Save</button>
      <button
        @click="submitAndGradeCode"
        class="btn btn-success ms-2"
        :disabled="isGrading || !code.trim() || !hasApiKey"
      >
        <span
          v-if="isGrading"
          class="spinner-border spinner-border-sm me-2"
          role="status"
          aria-hidden="true"
        ></span>
        {{ isGrading ? 'Grading...' : 'Submit & Grade' }}
      </button>
      <button @click="resetCode" class="btn btn-outline-danger ms-2">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useProgressStore } from '../store/progress'
import { useAIStore } from '../store/ai'
import Prism from 'prismjs'
import { submitCodeForGrading } from '../utils/aiService'

const props = defineProps({
  sectionId: {
    type: Number,
    required: true,
  },
  lessonId: {
    type: Number,
    default: null,
  },
  isChallenge: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['code-submitted', 'code-graded'])

const progressStore = useProgressStore()
const aiStore = useAIStore()
const code = ref('')
const isGrading = computed(() => aiStore.isLoading)
const hasApiKey = computed(() => aiStore.hasApiKey)

onMounted(() => {
  loadSavedCode()
  highlightCode()

  // Load AI settings if not already loaded
  if (!aiStore.isLoaded) {
    aiStore.loadSettings()
  }

  // Check if there's a saved response for this section
  if (props.isChallenge) {
    const savedResponse = aiStore.getSavedResponse(props.sectionId)
    if (savedResponse) {
      // Restore saved response
      aiStore.setLastResponse(savedResponse.response)

      // If there's a code sample that doesn't match the current code, we could
      // show a notice to the user asking if they want to restore it
      if (savedResponse.code && code.value !== savedResponse.code && !code.value) {
        // This is optional - you could add a UI element to restore the code
        // For now, let's just keep their current code
      }
    }
  }
})

watch(
  () => [props.sectionId, props.lessonId, props.isChallenge],
  () => {
    loadSavedCode()
  },
)

watch(code, () => {
  highlightCode()
})

// Function to escape HTML in the code
const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Computed property for highlighted code
const highlightedCode = computed(() => {
  return escapeHtml(code.value)
})

// Function to apply Prism highlighting
const highlightCode = () => {
  setTimeout(() => {
    Prism.highlightAll()
  }, 0)
}

const loadSavedCode = () => {
  if (props.isChallenge) {
    code.value = progressStore.getSectionChallengeCode(props.sectionId - 1) || ''
  } else if (props.lessonId) {
    code.value = progressStore.getLessonCode(props.sectionId - 1, props.lessonId - 1) || ''
  }
}

const saveCode = () => {
  if (props.isChallenge) {
    progressStore.saveSectionChallengeCode(props.sectionId - 1, code.value)
  } else {
    progressStore.saveLessonCode(props.sectionId - 1, props.lessonId - 1, code.value)
  }

  emit('code-submitted', code.value)
  return code.value
}

const submitAndGradeCode = async () => {
  // First save the code
  const savedCode = saveCode()

  // Mark as completed
  if (props.isChallenge) {
    progressStore.completeSectionChallenge(props.sectionId - 1)
  } else {
    progressStore.completeLesson(props.sectionId - 1, props.lessonId - 1)
  }

  // Clear any previous errors and responses
  aiStore.clearError()
  aiStore.resetLastResponse()

  // Start the grading process
  if (aiStore.hasApiKey && savedCode.trim()) {
    aiStore.setLoading(true)

    try {
      // Get the current section or lesson details
      let sectionTitle, challengeDescription

      if (props.isChallenge) {
        const sectionIndex = props.sectionId - 1
        const section = window.curriculum?.[sectionIndex]

        if (section) {
          sectionTitle = section.title
          challengeDescription = section.challenge?.description || 'Complete the coding challenge'
        }
      } else {
        // Handle lesson grading if needed in the future
        const sectionIndex = props.sectionId - 1
        const lessonIndex = props.lessonId - 1
        const section = window.curriculum?.[sectionIndex]

        if (section) {
          sectionTitle = section.title
          const lesson = section.lessons?.[lessonIndex]
          challengeDescription = lesson?.description || 'Complete the lesson exercise'
        }
      }

      // Submit the code for grading
      const response = await submitCodeForGrading(
        aiStore.provider,
        aiStore.apiKey,
        challengeDescription,
        sectionTitle,
        savedCode,
        aiStore.version,
      )

      // Store the AI response
      aiStore.setLastResponse(response)

      // Save the response to localStorage
      if (props.isChallenge) {
        aiStore.saveResponse(props.sectionId, response, savedCode)
      }

      emit('code-graded', response)
    } catch (error) {
      aiStore.setError(error.message)
    } finally {
      aiStore.setLoading(false)
    }
  } else if (!aiStore.hasApiKey) {
    aiStore.setError('API key is required for grading. Please configure your AI settings.')
  } else if (!savedCode.trim()) {
    aiStore.setError('No code found to grade. Please write some code first.')
  }
}

const resetCode = () => {
  if (confirm('Are you sure you want to reset your code? This cannot be undone.')) {
    code.value = ''
    saveCode()
  }
}
</script>

<style scoped>
.code-editor {
  border: 1px solid var(--border-color);
  border-radius: 4px;
  margin: 20px 0;
  background-color: var(--bg-card);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-speed) ease;
}

.editor-header {
  padding: 10px;
  background-color: var(--bg-sidebar);
  border-bottom: 1px solid var(--border-color);
  color: var(--text-color);
}

.editor-content {
  padding: 0;
}

.code-textarea {
  width: 100%;
  border: none;
  padding: 10px;
  font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  resize: vertical;
  background-color: #171717;
  color: var(--text-light);
  transition: all var(--transition-speed) ease;
}

.editor-preview {
  padding: 0 10px;
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-sidebar);
}

/* Preview container with limited height */
.preview-container {
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  background-color: var(--bg-code);
}

.limited-height-preview {
  margin: 0;
  background-color: #000000;
  border-radius: 5px;
  padding: 1rem;
  overflow-y: auto;
  /* Set height based on line-height to show around 10 lines */
  max-height: calc(1.5rem * 10 + 2rem); /* line-height * 10 lines + padding */
  scrollbar-width: thin;
  scrollbar-color: rgba(128, 128, 128, 0.4) transparent;
}

/* Custom scrollbar styles */
.limited-height-preview::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.limited-height-preview::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 4px;
}

.limited-height-preview::-webkit-scrollbar-thumb {
  background-color: rgba(128, 128, 128, 0.4);
  border-radius: 4px;
}

.limited-height-preview::-webkit-scrollbar-thumb:hover {
  background-color: rgba(128, 128, 128, 0.6);
}

/* Override to ensure code blocks display properly */
:deep(pre) {
  margin: 0;
}

:deep(code) {
  font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;
  tab-size: 4;
  hyphens: none;
}

.editor-footer {
  padding: 10px;
  background-color: var(--bg-sidebar);
  border-top: 1px solid var(--border-color);
  display: flex;
}

/* Dark mode adjustments */
html[data-theme='dark'] .limited-height-preview,
body.dark-mode .limited-height-preview {
  background-color: #1e1e3f;
}
</style>
