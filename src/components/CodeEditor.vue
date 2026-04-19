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
      <div class="cm-mount" ref="cmMount"></div>
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
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useProgressStore } from '../store/progress'
import { useAIStore } from '../store/ai'
import { useTopicStore } from '../store/topic'
import { useThemeStore } from '../theme/theme'
import { submitCodeForGrading } from '../utils/aiService'
import { getSection, getLesson } from '../utils/curriculumLoader'
import { EditorState, Compartment } from '@codemirror/state'
import { EditorView, keymap, lineNumbers, highlightActiveLine } from '@codemirror/view'
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
import {
  bracketMatching,
  indentOnInput,
  foldGutter,
  foldKeymap,
  syntaxHighlighting,
  defaultHighlightStyle,
} from '@codemirror/language'
import { javascript } from '@codemirror/lang-javascript'
import { yaml as legacyYaml } from '@codemirror/legacy-modes/mode/yaml'
import { shell } from '@codemirror/legacy-modes/mode/shell'
import { csharp as legacyCsharp } from '@codemirror/legacy-modes/mode/clike'
import { StreamLanguage } from '@codemirror/language'
import { oneDark } from '@codemirror/theme-one-dark'

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
const topicStore = useTopicStore()
const themeStore = useThemeStore()
const code = ref('')
const isGrading = computed(() => aiStore.isLoading)
const hasApiKey = computed(() => aiStore.hasApiKey)
const cmMount = ref(null)

let editorView = null
const languageCompartment = new Compartment()
const themeCompartment = new Compartment()

function resolveLanguageExtension(topic) {
  switch (topic) {
    case 'typescript':
      return javascript({ typescript: true })
    case 'react':
      return javascript({ typescript: true, jsx: true })
    case 'csharp':
      return StreamLanguage.define(legacyCsharp)
    case 'devops':
      return StreamLanguage.define(legacyYaml)
    case 'ai':
      return StreamLanguage.define(shell)
    default:
      return javascript()
  }
}

function resolveThemeExtension(isDark) {
  return isDark ? oneDark : []
}

function baseExtensions() {
  return [
    lineNumbers(),
    highlightActiveLine(),
    history(),
    foldGutter(),
    bracketMatching(),
    indentOnInput(),
    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    keymap.of([...defaultKeymap, ...historyKeymap, ...foldKeymap, indentWithTab]),
    EditorView.lineWrapping,
    EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        const value = update.state.doc.toString()
        if (value !== code.value) code.value = value
      }
    }),
  ]
}

function createEditor() {
  if (!cmMount.value) return
  const state = EditorState.create({
    doc: code.value,
    extensions: [
      ...baseExtensions(),
      languageCompartment.of(resolveLanguageExtension(topicStore.currentTopic)),
      themeCompartment.of(resolveThemeExtension(themeStore.isDarkMode)),
    ],
  })
  editorView = new EditorView({ state, parent: cmMount.value })
}

function setEditorValue(next) {
  if (!editorView) return
  const current = editorView.state.doc.toString()
  if (current === next) return
  editorView.dispatch({
    changes: { from: 0, to: current.length, insert: next ?? '' },
  })
}

onMounted(() => {
  loadSavedCode()
  nextTick(createEditor)

  if (!aiStore.isLoaded) {
    aiStore.loadSettings()
  }

  if (props.isChallenge) {
    const savedResponse = aiStore.getSavedResponse(props.sectionId)
    if (savedResponse) {
      aiStore.setLastResponse(savedResponse.response)
    }
  }
})

onBeforeUnmount(() => {
  if (editorView) {
    editorView.destroy()
    editorView = null
  }
})

watch(
  () => [props.sectionId, props.lessonId, props.isChallenge],
  () => {
    loadSavedCode()
    setEditorValue(code.value)
  },
)

watch(code, (value) => {
  setEditorValue(value)
})

watch(
  () => topicStore.currentTopic,
  (topic) => {
    if (!editorView) return
    editorView.dispatch({
      effects: languageCompartment.reconfigure(resolveLanguageExtension(topic)),
    })
  },
)

watch(
  () => themeStore.isDarkMode,
  (isDark) => {
    if (!editorView) return
    editorView.dispatch({
      effects: themeCompartment.reconfigure(resolveThemeExtension(isDark)),
    })
  },
)

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
      let sectionTitle = ''
      let challengeDescription = ''

      try {
        if (props.isChallenge) {
          const section = await getSection(props.sectionId)
          if (section) {
            sectionTitle = section.title || ''
            challengeDescription =
              section.challenge?.description ||
              section.challenge?.instructions ||
              'Complete the coding challenge'
          }
        } else {
          const section = await getSection(props.sectionId)
          const lesson = await getLesson(props.sectionId, props.lessonId)
          if (section) {
            sectionTitle = section.title || ''
          }
          if (lesson) {
            challengeDescription = lesson.description || 'Complete the lesson exercise'
          }
        }
      } catch (contextError) {
        console.warn('Could not load lesson context for AI grading:', contextError)
      }

      if (!sectionTitle) sectionTitle = 'Code Review'
      if (!challengeDescription) challengeDescription = 'Review the submitted code.'

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

.cm-mount {
  margin: 0 20px;
  border-radius: 6px;
  overflow: hidden;
  background-color: var(--bg-code);
}

.cm-mount :deep(.cm-editor) {
  min-height: 220px;
  max-height: 520px;
  font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.45;
  background-color: var(--bg-code);
  color: var(--text-color);
}

.cm-mount :deep(.cm-editor.cm-focused) {
  outline: none;
}

.cm-mount :deep(.cm-scroller) {
  font-family: inherit;
}

.cm-mount :deep(.cm-gutters) {
  background-color: var(--bg-sidebar);
  color: var(--text-muted);
  border-right: 1px solid var(--border-color);
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

:root[data-theme='dark'] .cm-mount,
:root[data-theme='dark'] .limited-height-preview {
  background-color: #0f172a;
  color: #f3f4f6;
}

:root[data-theme='light'] .cm-mount,
:root[data-theme='light'] .limited-height-preview {
  background-color: #f8f9fa;
  color: #333333;
}

@media (max-width: 768px) {
  .editor-footer {
    flex-direction: column;
  }

  .editor-footer .btn {
    width: 100%;
    margin-bottom: 5px;
  }

  .cm-mount :deep(.cm-editor) {
    font-size: 0.85rem;
  }
}
</style>
