<template>
  <div class="lesson-content">
    <div class="lesson-header">
      <h2>{{ lesson.title }}</h2>
      <div class="completion-status">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            :id="`lesson-${sectionId}-${lessonId}-completed`"
            v-model="isCompleted"
            @change="toggleCompletion"
          />
          <label class="form-check-label" :for="`lesson-${sectionId}-${lessonId}-completed`">
            Mark as completed
          </label>
        </div>
      </div>
    </div>

    <div class="lesson-description">
      <p>{{ lesson.description }}</p>

      <!-- Added section navigation links -->
      <div class="section-navigation" v-if="lesson.sections && lesson.sections.length > 0">
        <span class="section-nav-label">Jump to: </span>
        <div class="section-links">
          <a
            v-for="(section, index) in lesson.sections"
            :key="`nav-${index}`"
            @click="scrollToSection(`section-${index}`)"
            class="section-link"
          >
            {{ section.title }}
          </a>
        </div>
      </div>
    </div>

    <div class="lesson-sections">
      <div
        v-for="(section, index) in lesson.sections"
        :key="`section-${index}`"
        class="lesson-section"
        :id="`section-${index}`"
      >
        <h3>{{ section.title }}</h3>
        <div class="concept-explanation" v-html="section.explanation"></div>

        <div class="code-example" v-if="section.codeExample">
          <h4>Example:</h4>
          <div class="code-wrapper">
            <pre class="scrollable-code"><code>{{ section.codeExample }}</code></pre>
            <div class="code-copy-btn" @click="copyCode(section.codeExample)" title="Copy code">
              <i class="bi bi-clipboard"></i>
            </div>
          </div>
        </div>

        <div class="exercise" v-if="section.exercise">
          <h4>Practice Exercise:</h4>
          <p>{{ section.exercise.instructions }}</p>
          <div class="code-wrapper" v-if="section.exercise.starterCode">
            <pre class="scrollable-code"><code>{{ section.exercise.starterCode }}</code></pre>
            <div
              class="code-copy-btn"
              @click="copyCode(section.exercise.starterCode)"
              title="Copy code"
            >
              <i class="bi bi-clipboard"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <CodeEditor :sectionId="sectionId" :lessonId="lessonId" :isChallenge="false" />

    <div class="navigation-buttons">
      <button v-if="hasPrevious" @click="navigateToPrevious" class="btn btn-outline-primary">
        Previous Lesson
      </button>

      <button v-if="hasNext" @click="navigateToNext" class="btn btn-primary float-end">
        Next Lesson
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useProgressStore } from '../store/progress'
import { curriculum } from '../data/curriculum'
import CodeEditor from './CodeEditor.vue'

const props = defineProps({
  sectionId: {
    type: Number,
    required: true,
  },
  lessonId: {
    type: Number,
    required: true,
  },
})

const router = useRouter()
const progressStore = useProgressStore()
const copySuccess = ref(false)

const section = computed(() => curriculum[props.sectionId - 1] || null)
const lesson = computed(() => section.value?.lessons[props.lessonId - 1] || null)

const isCompleted = ref(false)

onMounted(() => {
  checkCompletion()
})

watch(
  () => [props.sectionId, props.lessonId],
  () => {
    checkCompletion()
  },
)

const checkCompletion = () => {
  isCompleted.value = progressStore.isLessonCompleted(props.sectionId - 1, props.lessonId - 1)
}

const toggleCompletion = () => {
  if (isCompleted.value) {
    progressStore.completeLesson(props.sectionId - 1, props.lessonId - 1)
  } else {
    progressStore.uncompleteLesson(props.sectionId - 1, props.lessonId - 1)
  }
}

// Function to scroll to a specific section
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const offset = 80 // Adjust offset for header height
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
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

const hasPrevious = computed(() => {
  return props.lessonId > 1 || props.sectionId > 1
})

const hasNext = computed(() => {
  const currentSection = curriculum[props.sectionId - 1]
  return props.lessonId < currentSection.lessons.length || props.sectionId < curriculum.length
})

const navigateToPrevious = () => {
  if (props.lessonId > 1) {
    router.push({
      name: 'lesson',
      params: {
        sectionId: props.sectionId,
        lessonId: props.lessonId - 1,
      },
    })
  } else if (props.sectionId > 1) {
    const previousSection = curriculum[props.sectionId - 2]
    router.push({
      name: 'lesson',
      params: {
        sectionId: props.sectionId - 1,
        lessonId: previousSection.lessons.length,
      },
    })
  }
}

const navigateToNext = () => {
  const currentSection = curriculum[props.sectionId - 1]
  if (props.lessonId < currentSection.lessons.length) {
    router.push({
      name: 'lesson',
      params: {
        sectionId: props.sectionId,
        lessonId: props.lessonId + 1,
      },
    })
  } else if (props.sectionId < curriculum.length) {
    router.push({
      name: 'lesson',
      params: {
        sectionId: props.sectionId + 1,
        lessonId: 1,
      },
    })
  }
}
</script>

<style scoped>
.lesson-content {
  max-width: 900px;
  margin: 0 auto;
  color: var(--text-color);
}

.lesson-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.lesson-description {
  margin-bottom: 30px;
  padding: 15px;
  background-color: var(--bg-card);
  border-radius: 5px;
  box-shadow: var(--shadow-sm);
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

.lesson-section {
  margin-bottom: 40px;
  color: var(--text-color);
  scroll-margin-top: 80px; /* Adds space when scrolling to this element */
}

.concept-explanation {
  margin-bottom: 20px;
  color: var(--text-color);
}

/* Code example with scrolling */
.code-example {
  background-color: var(--bg-code-example);
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
}

.code-wrapper {
  position: relative;
  border-radius: 5px;
  overflow: hidden;
}

.scrollable-code {
  margin: 0;
  background-color: var(--bg-code);
  overflow-x: auto;
  overflow-y: auto;
  max-height: 70vh; /* Maximum height of 70% of viewport height */
  scrollbar-width: thin;
  scrollbar-color: rgba(128, 128, 128, 0.4) transparent;
  padding: 15px;
  border-radius: 5px;
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
  background-color: rgba(128, 128, 128, 0.4);
  border-radius: 4px;
}

.scrollable-code::-webkit-scrollbar-thumb:hover {
  background-color: rgba(128, 128, 128, 0.6);
}

.code-copy-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--text-muted);
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

.exercise {
  background-color: var(--bg-exercise);
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  border-left: 4px solid var(--secondary-color);
}

.navigation-buttons {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
}

/* Form elements theme support */
:deep(.form-check-input) {
  background-color: var(--bg-content);
  border-color: var(--border-color);
}

:deep(.form-check-input:checked) {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

:deep(.form-check-label) {
  color: var(--text-color);
}

/* Add dark mode styles for embedded HTML content */
:deep(h1),
:deep(h2),
:deep(h3),
:deep(h4),
:deep(h5),
:deep(h6) {
  color: var(--text-color);
}

:deep(p),
:deep(li),
:deep(ul),
:deep(ol) {
  color: var(--text-color);
}

:deep(a) {
  color: var(--primary-color);
}

:deep(pre),
:deep(code) {
  background-color: var(--bg-code);
  font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;
  tab-size: 4;
  hyphens: none;
}

/* Responsive styles */
@media (max-width: 767px) {
  .lesson-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .completion-status {
    margin-top: 10px;
  }

  .section-navigation {
    margin-top: 10px;
  }

  .section-nav-label {
    margin-bottom: 5px;
  }

  .section-links {
    margin-top: 5px;
    gap: 6px;
  }

  .section-link {
    font-size: 0.8rem;
    padding: 3px 8px;
  }
}
</style>
