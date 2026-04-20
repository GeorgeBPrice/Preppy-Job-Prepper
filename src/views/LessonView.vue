<template>
  <div class="lesson-view">
    <div v-if="loading" class="loading">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="!validSection" class="error-message">
      <div class="alert alert-danger">
        Section not found. Please check the URL or go back to the
        <router-link to="/">home page</router-link>.
      </div>
    </div>

    <div v-else-if="!validLesson" class="error-message">
      <div class="alert alert-danger">
        Lesson not found. Please check the URL or go back to the
        <router-link :to="{ name: 'lesson', params: { sectionId: sectionId, lessonId: 1 } }"
          >first lesson</router-link
        >.
      </div>
    </div>

    <div v-else class="lesson-content">
      <div class="lesson-top-nav">
        <button
          type="button"
          class="lesson-nav-icon"
          :disabled="!hasPrevious"
          aria-label="Previous lesson"
          title="Previous lesson"
          @click="navigateToPrevious"
        >
          <i class="bi bi-chevron-left"></i>
        </button>
        <button
          type="button"
          class="lesson-mark-complete"
          :class="{ completed: isCompleted }"
          :aria-pressed="isCompleted"
          @click="toggleLessonComplete"
        >
          <i class="bi" :class="isCompleted ? 'bi-check-square-fill' : 'bi-square'"></i>
          <span>{{ isCompleted ? 'Completed' : 'Mark Completed' }}</span>
        </button>
        <button
          type="button"
          class="lesson-nav-icon"
          :disabled="!hasNext"
          aria-label="Next lesson"
          title="Next lesson"
          @click="navigateToNext"
        >
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>

      <CurriculumContent
        :sectionId="Number(sectionId)"
        :lessonId="Number(lessonId)"
        :isChallenge="false"
      />

      <div class="navigation-buttons">
        <button v-if="hasPrevious" @click="navigateToPrevious" class="btn btn-outline-primary">
          Previous Lesson
        </button>

        <button v-if="hasNext" @click="navigateToNext" class="btn btn-primary float-end">
          Next Lesson
        </button>
      </div>
    </div>

    <BackToTop />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProgressStore } from '../store/progress'
import { useTopicStore } from '../store/topic'
import { getCurrentCurriculum } from '../utils/curriculumLoader'
import CurriculumContent from '../components/CurriculumContent.vue'
import BackToTop from '../components/BackToTop.vue'

const route = useRoute()
const router = useRouter()
const progressStore = useProgressStore()
const topicStore = useTopicStore()
const loading = ref(true)
const isCompleted = ref(false)
const currentCurriculum = ref([])

const sectionId = computed(() => route.params.sectionId)
const lessonId = computed(() => route.params.lessonId)

// Load curriculum for the current topic
const loadCurriculum = async () => {
  try {
    currentCurriculum.value = await getCurrentCurriculum()
  } catch (error) {
    console.error('Error loading curriculum:', error)
    currentCurriculum.value = []
  }
}

const validSection = computed(() => {
  const index = Number(sectionId.value) - 1
  return index >= 0 && index < currentCurriculum.value.length
})

const validLesson = computed(() => {
  if (!validSection.value) return false

  const sectionIndex = Number(sectionId.value) - 1
  const lessonIndex = Number(lessonId.value) - 1

  return lessonIndex >= 0 && lessonIndex < currentCurriculum.value[sectionIndex]?.lessons?.length
})

const checkCompletion = () => {
  if (!validSection.value || !validLesson.value) return

  const sectionIndex = Number(sectionId.value) - 1
  const lessonIndex = Number(lessonId.value) - 1

  isCompleted.value = progressStore.isLessonCompleted(sectionIndex, lessonIndex)
}

const toggleLessonComplete = () => {
  if (!validSection.value || !validLesson.value) return

  const sectionIndex = Number(sectionId.value) - 1
  const lessonIndex = Number(lessonId.value) - 1

  if (isCompleted.value) {
    progressStore.uncompleteLesson(sectionIndex, lessonIndex, true)
    isCompleted.value = false
  } else {
    progressStore.completeLesson(sectionIndex, lessonIndex, true)
    isCompleted.value = true
  }
}

const hasPrevious = computed(() => {
  if (!validSection.value || !validLesson.value) return false

  const currentSectionIndex = Number(sectionId.value) - 1
  const currentLessonIndex = Number(lessonId.value) - 1

  return currentLessonIndex > 0 || currentSectionIndex > 0
})

const hasNext = computed(() => {
  if (!validSection.value || !validLesson.value) return false

  const currentSectionIndex = Number(sectionId.value) - 1
  const currentLessonIndex = Number(lessonId.value) - 1
  const currentSection = currentCurriculum.value[currentSectionIndex]

  return (
    currentLessonIndex < currentSection?.lessons?.length - 1 ||
    currentSectionIndex < currentCurriculum.value.length - 1
  )
})

const navigateToPrevious = () => {
  const currentSectionIndex = Number(sectionId.value) - 1
  const currentLessonIndex = Number(lessonId.value) - 1

  if (currentLessonIndex > 0) {
    // Go to previous lesson in the same section
    router.push({
      name: 'lesson',
      params: {
        sectionId: sectionId.value,
        lessonId: currentLessonIndex,
      },
    })
  } else if (currentSectionIndex > 0) {
    // Go to the last lesson of the previous section
    const previousSection = currentCurriculum.value[currentSectionIndex - 1]
    router.push({
      name: 'lesson',
      params: {
        sectionId: currentSectionIndex,
        lessonId: previousSection.lessons.length,
      },
    })
  }
}

const navigateToNext = () => {
  const currentSectionIndex = Number(sectionId.value) - 1
  const currentLessonIndex = Number(lessonId.value) - 1
  const currentSection = currentCurriculum.value[currentSectionIndex]

  if (currentLessonIndex < currentSection.lessons.length - 1) {
    // Go to next lesson in the same section
    router.push({
      name: 'lesson',
      params: {
        sectionId: sectionId.value,
        lessonId: currentLessonIndex + 2, // +2 because indices start at 0 but route params at 1
      },
    })
  } else if (currentSectionIndex < currentCurriculum.value.length - 1) {
    // Go to the first lesson of the next section
    router.push({
      name: 'lesson',
      params: {
        sectionId: currentSectionIndex + 2,
        lessonId: 1,
      },
    })
  }
}

const loadContent = async () => {
  loading.value = true
  await loadCurriculum()

  setTimeout(() => {
    loading.value = false
    checkCompletion()
  }, 300)
}

onMounted(() => {
  loadContent()
})

// Watch for changes in route params or topic
watch([sectionId, lessonId, () => topicStore.currentTopic], () => {
  loadContent()
})

// Keep the mark-complete toggle in sync when completion is changed from
// elsewhere (e.g. the sidebar tick for this lesson).
watch(() => progressStore._forceUpdate, checkCompletion)
</script>

<style scoped>
/* interview highlight */
.interview-tip {
  margin-top: 30px;
  border: 1px solid #cd5c5c;
  padding: 20px;
  border-radius: 8px;
  background-color: #ffe3e524;
}

.lesson-view {
  min-height: 400px;
  position: relative;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.error-message {
  max-width: 800px;
  margin: 40px auto;
}

.lesson-content {
  max-width: 900px;
  margin: 0 auto;
}

.lesson-top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  gap: 8px;
}

.lesson-nav-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-content);
  color: var(--text-color);
  cursor: pointer;
  font-size: 1.1rem;
  transition:
    background-color 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;
}

.lesson-nav-icon:hover:not(:disabled),
.lesson-nav-icon:focus-visible:not(:disabled) {
  background-color: var(--primary-color-dark);
  color: #fff;
  border-color: var(--primary-color-dark);
}

.lesson-nav-icon:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.lesson-mark-complete {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 14px;
  height: 36px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-content);
  color: var(--text-color);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition:
    background-color 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;
}

.lesson-mark-complete:hover,
.lesson-mark-complete:focus-visible {
  border-color: var(--primary-color-dark);
  color: var(--primary-color-dark);
}

.lesson-mark-complete.completed {
  background-color: var(--success-color);
  border-color: var(--success-color);
  color: #fff;
}

.lesson-mark-complete.completed:hover,
.lesson-mark-complete.completed:focus-visible {
  opacity: 0.9;
  color: #fff;
}

@media (max-width: 576px) {
  .lesson-mark-complete span {
    display: none;
  }
  .lesson-mark-complete {
    width: 36px;
    padding: 0;
    justify-content: center;
    border-radius: 8px;
  }
}
</style>
