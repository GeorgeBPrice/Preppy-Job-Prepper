<template>
  <div class="lesson-view">
    <div v-if="loading" class="loading">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="!validSection" class="error-message">
      <div class="alert alert-danger">
        <p>The shortlist section was not found for {{ topicStore.currentTopicName }}.</p>
        <p>Please check the URL or go back to the <router-link to="/">home page</router-link>.</p>
      </div>
    </div>

    <div v-else-if="!validLesson" class="error-message">
      <div class="alert alert-danger">
        Lesson not found in the shortlist. Please check the URL or go back to the
        <router-link :to="{ name: 'shortlist', params: { lessonId: 1 } }">first lesson</router-link
        >.
      </div>
    </div>

    <div v-else class="lesson-content">
      <CurriculumContent
        :sectionId="1"
        :lessonId="Number(lessonId)"
        :isChallenge="false"
        :curriculumSource="shortlistCurriculum"
      />

      <div class="navigation-buttons">
        <button v-if="hasPrevious" @click="navigateToPrevious" class="btn btn-outline-primary">
          Previous Concept
        </button>

        <button v-if="hasNext" @click="navigateToNext" class="btn btn-primary float-end">
          Next Concept
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
import { getCurrentShortlistCurriculum } from '../utils/curriculumLoader'
import CurriculumContent from '../components/CurriculumContent.vue'
import BackToTop from '../components/BackToTop.vue'

const route = useRoute()
const router = useRouter()
const progressStore = useProgressStore()
const topicStore = useTopicStore()
const loading = ref(true)
const isCompleted = ref(false)
const shortlistCurriculum = ref([])

// For shortlist, we always use section 1, but might have different lessons
const lessonId = computed(() => route.params.lessonId || 1)

// Load shortlist curriculum based on the current topic
const loadCurriculum = async () => {
  try {
    shortlistCurriculum.value = await getCurrentShortlistCurriculum()
  } catch (error) {
    console.error('Error loading shortlist curriculum:', error)
    shortlistCurriculum.value = []
  }
}

// The shortlist only has one section
const validSection = computed(() => shortlistCurriculum.value.length > 0)

const validLesson = computed(() => {
  if (!validSection.value) return false

  const lessonIndex = Number(lessonId.value) - 1
  return lessonIndex >= 0 && lessonIndex < shortlistCurriculum.value[0]?.lessons?.length
})

const checkCompletion = () => {
  if (!validLesson.value) return

  // Using a special prefix for shortlist progress tracking to differentiate from regular lessons
  const lessonIndex = Number(lessonId.value) - 1
  isCompleted.value = progressStore.isLessonCompleted('shortlist', lessonIndex)
}

// Navigation helpers
const hasPrevious = computed(() => {
  if (!validLesson.value) return false
  return Number(lessonId.value) > 1
})

const hasNext = computed(() => {
  if (!validLesson.value) return false
  const lessonIndex = Number(lessonId.value) - 1
  return lessonIndex < shortlistCurriculum.value[0]?.lessons?.length - 1
})

const navigateToPrevious = () => {
  if (hasPrevious.value) {
    router.push({
      name: 'shortlist',
      params: { lessonId: Number(lessonId.value) - 1 },
    })
  }
}

const navigateToNext = () => {
  if (hasNext.value) {
    router.push({
      name: 'shortlist',
      params: { lessonId: Number(lessonId.value) + 1 },
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
watch([lessonId, () => topicStore.currentTopic], () => {
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
