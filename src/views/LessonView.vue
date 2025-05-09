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
</style>
