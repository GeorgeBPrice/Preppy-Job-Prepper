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
        <div v-html="sectionContent.explanation" class="explanation" ref="explanationContent"></div>

        <div v-if="sectionContent.codeExample" class="code-example">
          <h5>Interview Focus Examples:</h5>
          <div class="code-wrapper">
            <pre
              class="scrollable-code"
            ><code class="language-javascript" v-html="highlightedCode(sectionContent.codeExample)"></code></pre>
            <div
              class="code-copy-btn"
              @click="copyCode(sectionContent.codeExample)"
              title="Copy code"
            >
              <i class="bi bi-clipboard"></i>
            </div>
          </div>
        </div>

        <div v-if="sectionContent.exercise" class="exercise">
          <h5>Prep Exercise:</h5>
          <p>{{ sectionContent.exercise.instructions }}</p>
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
        <div class="code-wrapper">
          <pre
            class="scrollable-code"
          ><code class="language-javascript" v-html="highlightedCode(challenge.starterCode)"></code></pre>
          <div class="code-copy-btn" @click="copyCode(challenge.starterCode)" title="Copy code">
            <i class="bi bi-clipboard"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading">Loading curriculum...</div>
</template>

<script setup>
import { computed, ref, watch, onMounted, onUpdated, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { getSection as getMainSection } from '../data/curriculum'
import { getSection as getShortlistSection } from '../data/curriculum-shortlist'
import { useProgressStore } from '../store/progress'
import { applyCustomPrismStyling } from '../theme/customContentPrismStyling.js'
import Prism from 'prismjs'

// Custom syntax highlighting styling for better readability
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'

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

const route = useRoute()
const progressStore = useProgressStore()
const explanationContent = ref(null)

// Check if we're on the shortlist route
const isShortlistRoute = computed(() => {
  return route.path.includes('/minicourse-recapper')
})

// Choose the appropriate getSection function based on the route
const getSection = (sectionId) => {
  if (isShortlistRoute.value) {
    return getShortlistSection(sectionId)
  } else {
    return getMainSection(sectionId)
  }
}

const section = computed(() => {
  try {
    return getSection(props.sectionId)
  } catch (error) {
    console.error(error.message)
    return null
  }
})

const lesson = computed(() => {
  if (!section.value || props.isChallenge || !props.lessonId) {
    return null
  }

  try {
    return section.value.lessons[props.lessonId - 1]
  } catch (error) {
    console.error(
      `Lesson ${props.lessonId} not found in section ${props.sectionId}: ${error.message}`,
    )
    return null
  }
})

const challenge = computed(() => {
  if (!section.value || !props.isChallenge) {
    return null
  }

  return section.value.challenge
})

// Using a ref for the checkbox state to keep both checkboxes in sync (at top and bottom of page)
const isLessonCompleted = ref(false)

// Initialize checkbox state and add copy buttons to explanation code blocks
onMounted(() => {
  checkCompletion()

  // Apply custom Prism styling directly
  applyCustomPrismStyling()

  // Add copy buttons to explanation code blocks after DOM update
  nextTick(() => {
    addCopyButtonsToExplanationCode()
  })
})

// Watch for progress store changes
watch(
  () => progressStore.completedLessons,
  () => {
    checkCompletion()
  },
  { deep: true },
)

// Function to add copy buttons to explanation code blocks
// This function is called after the DOM is updated
// Because VUE is rendering unknown elements using 'v-if' as random elements (lesson descriptions)
// that may or may not have code blocks, we need to then stylise these blocks of 'code' examples AFTER the dom renders.
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
        copyCode(codeText)
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
    progressStore.completeLesson(sectionIndex, lessonIndex)
  } else {
    progressStore.uncompleteLesson(sectionIndex, lessonIndex)
  }
}

// Function to escape HTML in the code examples
const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Function to highlight code using Prism
const highlightedCode = (code) => {
  const escapedCode = escapeHtml(code)

  // Return escaped code (Prism will highlight it after mounting)
  return escapedCode
}

// Copy code to clipboard, from explanations and challenges
const copyCode = (code) => {
  navigator.clipboard.writeText(code)
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
  margin-right: 8px;
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
  border-left: 4px solid #cd5c5c;
  position: relative;
}

.code-example h5 {
  color: var(--text-color);
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.code-wrapper {
  position: relative;
  border-radius: 6px;
  overflow: hidden;
}

.code-wrapper code {
  color: #e4e4e4;
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
