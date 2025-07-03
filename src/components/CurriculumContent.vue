<template>
  <div class="curriculum-content" v-if="section">
    <!-- Top "Mark as completed" checkbox -->
    <div class="top-completion-status" v-if="lesson && !isChallenge && !isShortlistRoute">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          :id="`lesson-${sectionId}-${lessonId}-completed-top`"
          v-model="isLessonCompleted"
          @change="toggleLessonComplete"
        />
        <label class="form-check-label" :for="`lesson-${sectionId}-${lessonId}-completed-top`">
          Mark as completed
        </label>
      </div>
    </div>

    <div class="section-title-wrapper">
      <div class="section-icon">
        <i class="bi bi-book-half"></i>
      </div>
      <div class="section-title">
        <h2>{{ section.title }}</h2>
        <p>{{ section.description }}</p>
      </div>
    </div>

    <div v-if="lesson">
      <div class="lesson-title-wrapper">
        <div class="lesson-icon">
          <i class="bi bi-file-earmark-code"></i>
        </div>
        <div class="lesson-title">
          <h3>{{ lesson.title }}</h3>
          <p>{{ lesson.description }}</p>

          <!-- Added section navigation links -->
          <div class="section-navigation" v-if="lesson.sections && lesson.sections.length > 0">
            <span class="section-nav-label">Jump to: </span>
            <div class="section-links">
              <a
                v-for="(sectionContent, index) in lesson.sections"
                :key="index"
                @click="scrollToSection(`section-${index}`)"
                class="section-link"
              >
                {{ sectionContent.title }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        v-for="(sectionContent, index) in lesson.sections"
        :key="index"
        class="lesson-section"
        :id="`section-${index}`"
      >
        <h4>{{ sectionContent.title }}</h4>
        <div
          v-html="processedExplanation(sectionContent.explanation)"
          class="explanation"
          ref="explanationContent"
        ></div>

        <CodeExample v-if="sectionContent.codeExample" :code="sectionContent.codeExample" />

        <div v-if="sectionContent.exercise" class="exercise">
          <h5>Prep Exercise:</h5>
          <div
            v-html="parseExerciseInstructions(sectionContent.exercise.instructions)"
            class="exercise-instructions"
          ></div>
        </div>
      </div>

      <div v-if="lesson && lesson.prepperSummary" class="prepper-summary-container">
        <div v-html="lesson.prepperSummary" class="prepper-summary"></div>
      </div>

      <!-- Bottom "Mark as completed" checkbox -->
      <div class="bottom-completion-status">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            :id="`lesson-${sectionId}-${lessonId}-completed-bottom`"
            v-model="isLessonCompleted"
            @change="toggleLessonComplete"
          />
          <label class="form-check-label" :for="`lesson-${sectionId}-${lessonId}-completed-bottom`">
            Mark as completed
          </label>
        </div>
      </div>
    </div>

    <div v-else-if="challenge">
      <div class="challenge-title-wrapper">
        <div class="challenge-icon">
          <i class="bi bi-trophy"></i>
        </div>
        <div class="challenge-title">
          <h3>Section Challenge</h3>
          <p>{{ challenge.description }}</p>
        </div>
      </div>

      <h4>Requirements:</h4>
      <ul>
        <li v-for="(requirement, index) in challenge.requirements" :key="index">
          {{ requirement }}
        </li>
      </ul>

      <div v-if="challenge.starterCode" class="starter-code">
        <h4>Starter Code:</h4>
        <CodeExample :code="challenge.starterCode" />
      </div>
    </div>
  </div>
  <div v-else class="loading">Loading curriculum...</div>
</template>

<script setup>
import { computed, ref, watch, onMounted, onUpdated, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useProgressStore } from '../store/progress'
import { useTopicStore } from '../store/topic'
import { applyCustomPrismStyling } from '../theme/customContentPrismStyling.js'
import Prism from 'prismjs'
import { getSection, getShortlistSection } from '../utils/curriculumLoader'
import CodeExample from './CodeExample.vue'

// Custom syntax highlighting styling for better readability
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-yaml'

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
  curriculumSource: {
    type: Array,
    default: null,
  },
})

const route = useRoute()
const progressStore = useProgressStore()
const topicStore = useTopicStore()
const explanationContent = ref(null)
const section = ref(null)
const lesson = ref(null)
const challenge = ref(null)
const loading = ref(true)

// Map topics to PrismJS language identifiers
const topicLanguageMap = {
  javascript: 'javascript',
  csharp: 'csharp',
  typescript: 'typescript',
  react: 'jsx',
  devops: 'yaml',
  ai: 'python',
}

// Get current language based on topic
const currentLanguage = computed(() => {
  return topicLanguageMap[topicStore.currentTopic] || 'javascript'
})

// Check if we're on the shortlist route
const isShortlistRoute = computed(() => {
  return route.path.includes('/minicourse-recapper')
})

// Load the appropriate section and lesson
const loadContent = async () => {
  loading.value = true

  try {
    // Load section based on the route type
    if (isShortlistRoute.value) {
      section.value = await getShortlistSection(props.sectionId)
    } else {
      section.value = await getSection(props.sectionId)
    }

    // Load lesson or challenge
    if (props.isChallenge) {
      challenge.value = section.value?.challenge || null
      lesson.value = null
    } else if (props.lessonId && section.value) {
      lesson.value = section.value.lessons[props.lessonId - 1] || null
      challenge.value = null
    } else {
      lesson.value = null
      challenge.value = null
    }

    checkCompletion()
  } catch (error) {
    console.error('Error loading curriculum content:', error)
    section.value = null
    lesson.value = null
    challenge.value = null
  } finally {
    loading.value = false
  }
}

// Using a ref for the checkbox state to keep both checkboxes in sync (at top and bottom of page)
const isLessonCompleted = ref(false)

// Initialize checkbox state and add copy buttons to explanation code blocks
onMounted(() => {
  loadContent()

  // Apply custom Prism styling directly
  applyCustomPrismStyling()

  // Add copy buttons to explanation code blocks after DOM update
  nextTick(() => {
    addCopyButtonsToExplanationCode()
  })
})

// Watch for changes to section, lesson, or topic
watch(
  [
    () => props.sectionId,
    () => props.lessonId,
    () => topicStore.currentTopic,
    () => props.isChallenge,
  ],
  () => {
    loadContent()
  },
)

// Watch for progress store changes
watch(
  () => progressStore.currentTopicProgress,
  () => {
    checkCompletion()
  },
  { deep: true },
)

watch(
  () => progressStore._forceUpdate,
  () => {
    checkCompletion()
  },
)

// Function to add copy buttons to explanation code blocks
const addCopyButtonsToExplanationCode = () => {
  const sections = document.querySelectorAll('.explanation pre')

  sections.forEach((preElement) => {
    // Check if button already exists to avoid duplicates
    if (!preElement.parentElement.querySelector('.code-copy-btn')) {
      // Create wrapper if needed
      if (preElement.parentElement.style.position !== 'relative') {
        preElement.parentElement.style.position = 'relative'
      }

      // Create copy button
      const copyButton = document.createElement('div')
      copyButton.className = 'code-copy-btn'
      copyButton.title = 'Copy code'

      // Create icon
      const icon = document.createElement('i')
      icon.className = 'bi bi-clipboard'
      copyButton.appendChild(icon)

      // Add click event
      copyButton.addEventListener('click', () => {
        const codeText = preElement.textContent
        navigator.clipboard.writeText(codeText)
        copyButton.style.transition = 'background-color 0.3s ease'
        copyButton.style.backgroundColor = 'white'
        setTimeout(() => {
          copyButton.style.backgroundColor = ''
        }, 300)
      })

      // Add button to parent of pre element
      preElement.parentElement.appendChild(copyButton)
    }
  })
}

// Function to scroll to a specific section
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const offset = 80 // Adjust offset if you have a fixed header
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

// Check if the current lesson is completed
const checkCompletion = () => {
  if (!props.isChallenge && props.sectionId && props.lessonId) {
    // The store uses zero-based indices, while props are one-based
    isLessonCompleted.value = progressStore.isLessonCompleted(
      props.sectionId - 1,
      props.lessonId - 1,
    )
  }
}

// Toggle lesson completion status
const toggleLessonComplete = () => {
  // The store uses zero-based indices, while props are one-based
  const sectionIndex = props.sectionId - 1
  const lessonIndex = props.lessonId - 1

  if (isLessonCompleted.value) {
    progressStore.completeLesson(sectionIndex, lessonIndex, true)
  } else {
    progressStore.uncompleteLesson(sectionIndex, lessonIndex, true)
  }

  // Force reactivity update
  progressStore._forceUpdate++
}

// Process explanation content to update embedded code blocks with proper language detection
const processedExplanation = (explanation) => {
  if (!explanation) return ''

  // Replace embedded code blocks with proper language detection
  return explanation
    .replace(
      /<code class="language-javascript">/g,
      `<code class="language-${currentLanguage.value}">`,
    )
    .replace(/<code class="language-[\w-]+">/g, `<code class="language-${currentLanguage.value}">`)
    .replace(/<code(?!\s+class=)>/g, `<code class="language-${currentLanguage.value}">`)
}

// Apply Prism highlighting after the component updates
onMounted(() => {
  Prism.highlightAll()
})

onUpdated(() => {
  Prism.highlightAll()
  // Re-add copy buttons after DOM updates
  nextTick(() => {
    addCopyButtonsToExplanationCode()
  })
})

// Function to parse exercise instructions and convert numbered lists and structured content into proper HTML lists for better readability
const parseExerciseInstructions = (instructions) => {
  if (!instructions) return ''

  let parsedText = instructions

  // First, let's handle the specific case of parenthesized numbers like "(1)", "(2)", etc.
  // We'll temporarily replace them with a unique marker to avoid conflicts
  const parenthesizedNumbers = []
  let counter = 0

  parsedText = parsedText.replace(/\((\d+)\)/g, (match, number) => {
    const marker = `__PARENTHESIZED_${counter}__`
    parenthesizedNumbers[counter] = `(${number})`
    counter++
    return marker
  })

  // Now convert numbered lists with patterns like "1)", "2)", "1.", "2.", etc.
  parsedText = parsedText.replace(/(\d+[).])\s+/g, '<li>$1 ')

  // Convert bullet points with patterns like "•", "-", "*"
  parsedText = parsedText.replace(/^[\s]*[•\-*]\s+/gm, '<li>')

  // Restore the parenthesized numbers and convert them to list items
  parenthesizedNumbers.forEach((number, index) => {
    const marker = `__PARENTHESIZED_${index}__`
    parsedText = parsedText.replace(marker, `<li>${number} `)
  })

  // Handle cases where list items don't have closing tags (common in instructions)
  parsedText = parsedText.replace(/(<li>.*?)(?=<li>|$)/gs, '$1</li>')

  // Wrap consecutive list items in <ul> tags
  parsedText = parsedText.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>')

  // Convert line breaks to paragraphs for better structure
  parsedText = parsedText.replace(/\n\n+/g, '</p><p>')

  // Wrap the entire content in paragraphs if not already wrapped
  if (!parsedText.startsWith('<p>') && !parsedText.startsWith('<ul>')) {
    parsedText = '<p>' + parsedText + '</p>'
  }

  // Clean up any double-wrapped paragraphs
  parsedText = parsedText.replace(/<p><p>/g, '<p>')
  parsedText = parsedText.replace(/<\/p><\/p>/g, '</p>')

  // Handle special cases where instructions start with "Implement:" or similar
  parsedText = parsedText.replace(/(Implement:|Create:|Using.*?:)\s*/gi, '<strong>$1</strong><br>')

  // Convert any remaining line breaks to <br> tags
  parsedText = parsedText.replace(/\n/g, '<br>')

  return parsedText
}
</script>

<style scoped>
.curriculum-content {
  max-width: 900px;
  margin: 0 auto;
  color: var(--text-color);
}

/* Top "Mark as completed" checkbox */
.top-completion-status {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

/* Bottom "Mark as completed" checkbox */
.bottom-completion-status {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

/* Section Title Styling */
.section-title-wrapper {
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--bg-card);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  border-left: 5px solid var(--primary-color);
  position: relative;
  overflow: hidden;
}

.section-title-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100%;
  background: var(--primary-gradient);
  opacity: 0.1;
  clip-path: polygon(100% 0, 0% 0, 100% 100%);
}

.section-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-gradient);
  color: white;
  border-radius: 50%;
  margin-right: 1rem;
  box-shadow: var(--shadow-sm);
}

.section-icon i {
  font-size: 1.5rem;
}

.section-title {
  flex-grow: 1;
}

.section-title h2 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
  font-weight: 600;
}

.section-title p {
  margin-bottom: 0;
  opacity: 0.9;
}

/* Navigation section styling */
.section-navigation {
  display: flex;
  align-items: center;
  margin-top: 12px;
  flex-wrap: wrap;
}

.section-nav-label {
  font-weight: 500;
  color: var(--text-muted);
  margin: 0 0 5px;
  white-space: nowrap;
}

.section-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.section-link {
  color: var(--primary-color);
  font-size: 0.9rem;
  font-weight: 500;
  background-color: rgba(var(--primary-color-rgb, 79, 70, 229), 0.1);
  padding: 4px 10px;
  border-radius: 20px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  display: inline-block;
}

.section-link:hover {
  background-color: rgba(var(--primary-color-rgb, 79, 70, 229), 0.2);
  transform: translateY(-2px);
}

/* Lesson Title Styling */
.lesson-title-wrapper {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  background: var(--bg-card);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  border-left: 4px solid var(--info-color);
}

.lesson-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--info-color), #3a9fc5);
  color: white;
  border-radius: 50%;
  margin-right: 1rem;
  box-shadow: var(--shadow-sm);
}

.lesson-icon i {
  font-size: 1.25rem;
}

.lesson-title {
  flex-grow: 1;
}

.lesson-title h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--info-color);
  font-weight: 600;
}

.lesson-title p {
  margin-bottom: 0.5rem;
  opacity: 0.9;
}

/* Challenge Title Styling */
.challenge-title-wrapper {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  background: var(--bg-card);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  border-left: 4px solid var(--success-color);
}

.challenge-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--success-color), #0d9668);
  color: white;
  border-radius: 50%;
  margin-right: 1rem;
  box-shadow: var(--shadow-sm);
}

.challenge-icon i {
  font-size: 1.25rem;
}

.challenge-title {
  flex-grow: 1;
}

.challenge-title h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--success-color);
  font-weight: 600;
}

.challenge-title p {
  margin-bottom: 0;
  opacity: 0.9;
}

/* Lesson Section Styling */
.lesson-section {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  scroll-margin-top: 80px; /* Adds space when scrolling to this element */
}

.lesson-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.lesson-section h4 {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--primary-color);
  display: inline-block;
  color: var(--text-color);
}

.explanation {
  margin-bottom: 1rem;
  color: var(--text-color);
  line-height: 1.6;
}

/* Style for code blocks in explanations */
.explanation :deep(pre) {
  background-color: var(--bg-code);
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin: 1rem 0;
  border-left: 3px solid var(--primary-color);
  overflow-x: auto;
  max-height: 70vh; /* Added max-height */
}

.explanation :deep(pre code) {
  font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  color: var(--text-color);
  background: transparent;
  padding: 0;
  border: none;
}

/* Improved Code Example Styling with scrolling */
.code-example {
  margin: 1rem 0;
  overflow: hidden;
  background-color: var(--bg-code-example);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #6366f1;
  position: relative;
  box-shadow: var(--shadow-sm);
}

.code-example h5 {
  color: var(--text-color);
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

/* Enhanced code styling for code-example */
.code-example :deep(pre) {
  background-color: var(--bg-code);
  padding: 1rem;
  border-radius: 6px;
  margin: 0;
  overflow-x: auto;
  border: 1px solid var(--border-color);
  font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

.code-example :deep(code) {
  font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-color);
  background: transparent;
  padding: 0;
  border: none;
}

/* Syntax highlighting for code-example with blues and purples */
.code-example :deep(.token.comment) {
  color: #6b7280;
  font-style: italic;
}

.code-example :deep(.token.keyword) {
  color: #6366f1;
  font-weight: 600;
}

.code-example :deep(.token.string) {
  color: #3b82f6;
}

.code-example :deep(.token.number) {
  color: #8b5cf6;
}

.code-example :deep(.token.function) {
  color: #06b6d4;
}

.code-example :deep(.token.operator) {
  color: var(--text-color);
}

.code-example :deep(.token.punctuation) {
  color: #6b7280;
}

.code-example :deep(.token.class-name) {
  color: #8b5cf6;
}

.code-example :deep(.token.variable) {
  color: var(--text-color);
}

.code-example :deep(.token.property) {
  color: #06b6d4;
}

.code-example :deep(.token.boolean) {
  color: #10b981;
}

.code-example :deep(.token.null) {
  color: #6b7280;
}

.code-example :deep(.token.undefined) {
  color: #6b7280;
}

.code-example :deep(.token.regex) {
  color: #ec4899;
}

.code-example :deep(.token.template-string) {
  color: #3b82f6;
}

.code-example :deep(.token.template-punctuation) {
  color: #6b7280;
}

/* Dark mode specific improvements for code-example */
:root[data-theme='dark'] .code-example {
  background-color: #1e293b;
  border-left-color: #6366f1;
}

:root[data-theme='dark'] .code-example :deep(pre) {
  background-color: #0f172a;
  border-color: #374151;
}

:root[data-theme='dark'] .code-example :deep(code) {
  color: #f3f4f6;
}

:root[data-theme='dark'] .code-example :deep(.token.comment) {
  color: #9ca3af;
}

:root[data-theme='dark'] .code-example :deep(.token.keyword) {
  color: #818cf8;
}

:root[data-theme='dark'] .code-example :deep(.token.string) {
  color: #60a5fa;
}

:root[data-theme='dark'] .code-example :deep(.token.number) {
  color: #a78bfa;
}

:root[data-theme='dark'] .code-example :deep(.token.function) {
  color: #22d3ee;
}

:root[data-theme='dark'] .code-example :deep(.token.punctuation) {
  color: #9ca3af;
}

:root[data-theme='dark'] .code-example :deep(.token.class-name) {
  color: #a78bfa;
}

:root[data-theme='dark'] .code-example :deep(.token.property) {
  color: #22d3ee;
}

:root[data-theme='dark'] .code-example :deep(.token.boolean) {
  color: #34d399;
}

:root[data-theme='dark'] .code-example :deep(.token.null) {
  color: #9ca3af;
}

:root[data-theme='dark'] .code-example :deep(.token.undefined) {
  color: #9ca3af;
}

:root[data-theme='dark'] .code-example :deep(.token.regex) {
  color: #f472b6;
}

:root[data-theme='dark'] .code-example :deep(.token.template-string) {
  color: #60a5fa;
}

:root[data-theme='dark'] .code-example :deep(.token.template-punctuation) {
  color: #9ca3af;
}

/* Light mode specific improvements for code-example */
:root[data-theme='light'] .code-example {
  background-color: #f8fafc;
  border-left-color: #6366f1;
}

:root[data-theme='light'] .code-example :deep(pre) {
  background-color: #ffffff;
  border-color: #e2e8f0;
}

:root[data-theme='light'] .code-example :deep(code) {
  color: #1e293b;
}

:root[data-theme='light'] .code-example :deep(.token.comment) {
  color: #64748b;
}

:root[data-theme='light'] .code-example :deep(.token.keyword) {
  color: #4f46e5;
}

:root[data-theme='light'] .code-example :deep(.token.string) {
  color: #2563eb;
}

:root[data-theme='light'] .code-example :deep(.token.number) {
  color: #7c3aed;
}

:root[data-theme='light'] .code-example :deep(.token.function) {
  color: #0891b2;
}

:root[data-theme='light'] .code-example :deep(.token.punctuation) {
  color: #64748b;
}

:root[data-theme='light'] .code-example :deep(.token.class-name) {
  color: #7c3aed;
}

:root[data-theme='light'] .code-example :deep(.token.property) {
  color: #0891b2;
}

:root[data-theme='light'] .code-example :deep(.token.boolean) {
  color: #059669;
}

:root[data-theme='light'] .code-example :deep(.token.null) {
  color: #64748b;
}

:root[data-theme='light'] .code-example :deep(.token.undefined) {
  color: #64748b;
}

:root[data-theme='light'] .code-example :deep(.token.regex) {
  color: #db2777;
}

:root[data-theme='light'] .code-example :deep(.token.template-string) {
  color: #2563eb;
}

:root[data-theme='light'] .code-example :deep(.token.template-punctuation) {
  color: #64748b;
}

.exercise {
  background-color: var(--bg-exercise);
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  border-left: 4px solid var(--success-color);
  color: var(--text-color);
}

.exercise h5 {
  color: var(--text-color);
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.exercise-instructions {
  line-height: 1.2;
  color: var(--text-color);
}

.exercise-instructions :deep(p) {
  margin-bottom: 0.5rem;
}

.exercise-instructions :deep(strong) {
  font-weight: 600;
}

.exercise-instructions :deep(ul) {
  margin: 1rem 0;
  padding-left: 1.5rem;
  list-style-type: none;
}

.exercise-instructions :deep(li) {
  margin-bottom: 0;
  line-height: 1.2;
  color: var(--text-color);
}

.exercise-instructions :deep(br) {
  margin-bottom: 0;
}

.starter-code {
  margin: 1rem 0;
  overflow: hidden;
  background-color: var(--bg-code-example);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid var(--info-color);
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  font-size: 1.2rem;
  color: var(--text-muted);
}

.prepper-summary-container {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: var(--bg-card);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  border-left: 4px solid var(--primary-color);
}

.prepper-summary h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.prepper-summary ul,
.prepper-summary ol {
  padding-left: 1.5rem;
}

.prepper-summary li {
  margin-bottom: 0.5rem;
}

.form-check {
  background-color: var(--primary-gradient);
}

:deep(.prepper-summary h4) {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

/* Form elements theme support */
:deep(.form-check-input) {
  background-color: var(--bg-content);
  border-color: var(--border-color);
}

:deep(.form-check-label) {
  color: var(--text-color);
}

/* Override to ensure code blocks display properly */
:deep(pre) {
  margin: 0;
  background-color: var(--bg-code); /* Use theme variable */
  border-radius: 5px;
  padding: 1rem;
  line-height: 1.5;
  max-height: 70vh; /* Added max-height */
  overflow-y: auto; /* Allow vertical scrolling */
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
  font-size: 0.95rem;
}

/* Inline code formatting in explanations */
:deep(.explanation p code),
:deep(.explanation li code),
:deep(.explanation h1 code),
:deep(.explanation h2 code),
:deep(.explanation h3 code),
:deep(.explanation h4 code),
:deep(.explanation h5 code),
:deep(.explanation h6 code) {
  background-color: rgba(79, 70, 229, 0.2);
  color: var(--text-color);
  font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  padding: 0.15rem 0.35rem;
  border-radius: 3px;
  font-size: 0.9em;
  font-weight: 500;
  white-space: nowrap;
  border: 1px solid rgba(79, 70, 229, 0.2);
}

[data-theme='dark'] :deep(.explanation p code),
[data-theme='dark'] :deep(.explanation li code),
[data-theme='dark'] :deep(.explanation h1 code),
[data-theme='dark'] :deep(.explanation h2 code),
[data-theme='dark'] :deep(.explanation h3 code),
[data-theme='dark'] :deep(.explanation h4 code),
[data-theme='dark'] :deep(.explanation h5 code),
[data-theme='dark'] :deep(.explanation h6 code) {
  background-color: rgba(99, 102, 241, 0.15);
  border-color: rgba(99, 102, 241, 0.3);
  color: #8b8eef;
}

:deep(a) {
  color: var(--primary-color);
}

:deep(table) {
  color: var(--text-color);
  border-color: var(--border-color);
}

/* Responsive adjustments */
@media (max-width: 767px) {
  .section-title-wrapper {
    padding: 1rem;
    margin-bottom: 1.5rem;
  }

  .section-icon {
    width: 40px;
    height: 40px;
  }

  .section-icon i {
    font-size: 1.25rem;
  }

  .lesson-title-wrapper,
  .challenge-title-wrapper {
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .lesson-icon,
  .challenge-icon {
    width: 32px;
    height: 32px;
  }

  .lesson-icon i,
  .challenge-icon i {
    font-size: 1rem;
  }

  :deep(code) {
    font-size: 0.85rem;
  }

  .section-navigation {
    margin-top: 10px;
  }

  .section-links {
    margin-top: 6px;
    gap: 6px;
  }
}
</style>
