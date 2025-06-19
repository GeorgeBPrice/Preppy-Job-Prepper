<template>
  <div class="code-editor">
    <div class="editor-header">
      <h3>Submit Your Solution</h3>
      <p class="mt-2 mb-0">
        <i class="bi bi-info-circle text-warning"></i> Configure the AI Code Reviewer below to get a
        detailed analysis of your code.
      </p>
    </div>
    <div class="editor-content">
      <div class="code-textarea-wrapper">
        <textarea
          v-model="code"
          class="code-textarea"
          rows="10"
          placeholder="Paste your code here..."
          @input="handleCodeInput"
          @keydown="handleKeydown"
          ref="codeTextarea"
        ></textarea>
        <pre class="code-highlight-overlay" ref="highlightOverlay" aria-hidden="true"></pre>
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
import { ref, computed, onMounted, watch, nextTick } from 'vue'
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
const codeTextarea = ref(null)
const highlightOverlay = ref(null)

onMounted(() => {
  loadSavedCode()
  highlightCode()
  setupSyntaxHighlighting()

  // Load AI settings if not already loaded
  if (!aiStore.isLoaded) {
    aiStore.loadSettings()
  }

  // Check if there's a saved response for this section
  if (props.isChallenge) {
    const savedResponse = aiStore.getSavedResponse(props.sectionId)
    if (savedResponse) {
      aiStore.setLastResponse(savedResponse.response)
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
  updateSyntaxHighlighting()
})

// Setup syntax highlighting for the textarea
const setupSyntaxHighlighting = () => {
  nextTick(() => {
    if (codeTextarea.value && highlightOverlay.value) {
      // Sync scroll positions
      codeTextarea.value.addEventListener('scroll', syncScroll)
      // Initial highlighting
      updateSyntaxHighlighting()
    }
  })
}

// Handle code input
const handleCodeInput = () => {
  updateSyntaxHighlighting()
}

// Handle keydown events
const handleKeydown = (event) => {
  // Handle tab key
  if (event.key === 'Tab') {
    event.preventDefault()
    const start = event.target.selectionStart
    const end = event.target.selectionEnd

    // Insert 2 spaces at cursor position
    const newCode = code.value.substring(0, start) + '  ' + code.value.substring(end)
    code.value = newCode

    // Set cursor position after the inserted spaces
    nextTick(() => {
      event.target.selectionStart = event.target.selectionEnd = start + 2
    })
  }
}

// Sync scroll between textarea and overlay
const syncScroll = () => {
  if (codeTextarea.value && highlightOverlay.value) {
    highlightOverlay.value.scrollTop = codeTextarea.value.scrollTop
    highlightOverlay.value.scrollLeft = codeTextarea.value.scrollLeft
  }
}

// Update syntax highlighting
const updateSyntaxHighlighting = () => {
  nextTick(() => {
    if (highlightOverlay.value && code.value) {
      // Highlight the code using Prism
      const highlighted = Prism.highlight(code.value, Prism.languages.javascript, 'javascript')
      highlightOverlay.value.innerHTML = highlighted
    } else if (highlightOverlay.value) {
      highlightOverlay.value.innerHTML = ''
    }
  })
}

// Apply Prism highlighting
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
      // Get the current section or lesson details (Context for the LLM)
      let sectionTitle, challengeDescription

      if (props.isChallenge) {
        const sectionIndex = props.sectionId - 1
        const section = window.curriculum?.[sectionIndex]

        if (section) {
          sectionTitle = section.title
          challengeDescription = section.challenge?.description || 'Complete the coding challenge'
        }
      } else {
        const sectionIndex = props.sectionId - 1
        const lessonIndex = props.lessonId - 1
        const section = window.curriculum?.[sectionIndex]

        if (section) {
          sectionTitle = section.title
          const lesson = section.lessons?.[lessonIndex]
          challengeDescription = lesson?.description || 'Complete the lesson exercise'
        }
      }

      // Submit the code for grading (prompt context for the LLM)
      const response = await submitCodeForGrading(
        aiStore.provider,
        aiStore.apiKey,
        challengeDescription,
        sectionTitle,
        savedCode,
        aiStore.version,
        aiStore.customModel,
        aiStore.customEndpoint,
        aiStore.customHeaders,
      )

      // Set the AI response
      aiStore.setLastResponse(response)

      // Save the response to localStorage
      if (props.isChallenge) {
        aiStore.saveResponse(props.sectionId, response, savedCode)
      }

      emit('code-graded', response)

      // Scroll to the AI Code-Review section
      nextTick(() => {
        const aiResponseSection = document.getElementById('ai-response-section')
        if (aiResponseSection) {
          aiResponseSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
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
  border-radius: 8px;
  margin: 20px 0;
  background-color: var(--bg-card);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-speed) ease;
  overflow: hidden;
}

.editor-header {
  padding: 15px 20px;
  background-color: var(--bg-sidebar);
  border-bottom: 1px solid var(--border-color);
  color: var(--text-color);
  font-weight: 600;
}

.editor-header h3 {
  margin: 0;
  color: var(--text-color);
  font-size: 1.3rem;
}

.editor-header p {
  margin: 0;
  color: var(--text-color);
  font-size: 0.85rem;
}

.editor-content {
  padding: 0;
  position: relative;
}

.code-textarea-wrapper {
  position: relative;
  margin: 0 20px;
}

.code-textarea {
  width: 100%;
  border: none;
  padding: 12px 15px;
  font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
  resize: vertical;
  background-color: transparent;
  color: transparent;
  caret-color: var(--text-color);
  transition: all var(--transition-speed) ease;
  min-height: 200px;
  position: relative;
  z-index: 2;
}

.code-highlight-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 12px 15px;
  margin: 0;
  font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
  background-color: var(--bg-code);
  color: var(--text-color);
  border: none;
  overflow: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  pointer-events: none;
  z-index: 1;
}

.code-textarea:focus {
  outline: none;
  background-color: transparent;
  color: transparent;
}

.code-textarea::placeholder {
  color: var(--text-muted);
  opacity: 0.6;
}

.preview-container {
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  background-color: var(--bg-code);
}

.limited-height-preview {
  margin: 0;
  background-color: var(--bg-code);
  border-radius: 5px;
  padding: 1rem;
  overflow-y: auto;
  max-height: calc(1.5rem * 10 + 2rem);
  scrollbar-width: thin;
  scrollbar-color: rgba(128, 128, 128, 0.4) transparent;
  color: var(--text-color);
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

.editor-footer {
  padding: 15px 20px;
  background-color: var(--bg-sidebar);
  border-top: 1px solid var(--border-color);
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

/* Button styling improvements */
.editor-footer .btn {
  transition: all 0.2s ease;
  font-weight: 500;
}

.editor-footer .btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.editor-footer .btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.editor-footer .btn-primary:hover:not(:disabled) {
  background-color: var(--primary-color-dark);
  border-color: var(--primary-color-dark);
  transform: translateY(-1px);
}

.editor-footer .btn-success {
  background-color: var(--success-color);
  border-color: var(--success-color);
  color: white;
}

.editor-footer .btn-success:hover:not(:disabled) {
  background-color: #059669;
  border-color: #059669;
  transform: translateY(-1px);
}

.editor-footer .btn-outline-danger {
  color: var(--danger-color);
  border-color: var(--danger-color);
  background-color: transparent;
}

.editor-footer .btn-outline-danger:hover {
  background-color: var(--danger-color);
  border-color: var(--danger-color);
  color: white;
  transform: translateY(-1px);
}

/* Spinner styling */
.spinner-border-sm {
  width: 1rem;
  height: 1rem;
  border-width: 0.125em;
}

/* Dark mode specific improvements */
:root[data-theme='dark'] .code-textarea {
  background-color: transparent;
  color: transparent;
  caret-color: #f3f4f6;
}

:root[data-theme='dark'] .code-textarea::placeholder {
  color: #9ca3af;
}

:root[data-theme='dark'] .code-highlight-overlay {
  background-color: #0f172a;
  color: #f3f4f6;
}

:root[data-theme='dark'] .limited-height-preview {
  background-color: #0f172a;
  color: #f3f4f6;
}

/* Remove unwanted borders on code lines in dark mode */
:root[data-theme='dark'] .code-highlight-overlay .token {
  border: none;
}

/* Light mode specific improvements */
:root[data-theme='light'] .code-textarea {
  background-color: transparent;
  color: transparent;
  caret-color: #333333;
}

:root[data-theme='light'] .code-textarea::placeholder {
  color: #6c757d;
}

:root[data-theme='light'] .code-highlight-overlay {
  background-color: #f8f9fa;
  color: #333333;
}

:root[data-theme='light'] .limited-height-preview {
  background-color: #f8f9fa;
  color: #333333;
}

/* Syntax highlighting token colors */
:deep(.token.comment) {
  color: var(--text-muted);
  font-style: italic;
}

:deep(.token.keyword) {
  color: var(--primary-color);
  font-weight: 600;
}

:deep(.token.string) {
  color: var(--success-color);
}

:deep(.token.number) {
  color: var(--info-color);
}

:deep(.token.function) {
  color: var(--warning-color);
}

:deep(.token.operator) {
  color: var(--text-color);
}

:deep(.token.punctuation) {
  color: var(--text-muted);
}

:deep(.token.class-name) {
  color: var(--info-color);
}

:deep(.token.variable) {
  color: var(--text-color);
}

:deep(.token.property) {
  color: var(--warning-color);
}

:deep(.token.boolean) {
  color: var(--danger-color);
}

:deep(.token.null) {
  color: var(--text-muted);
}

:deep(.token.undefined) {
  color: var(--text-muted);
}

/* Responsive design */
@media (max-width: 768px) {
  .editor-footer {
    flex-direction: column;
  }

  .editor-footer .btn {
    width: 100%;
    margin-bottom: 5px;
  }

  .code-textarea {
    font-size: 0.85rem;
    padding: 12px;
  }
}
</style>
