<template>
  <div class="lesson-view">
    <div v-if="loading" class="loading">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="!validSection" class="error-message">
      <div class="alert alert-danger">
        The shortlist section was not found. Please check the URL or go back to the
        <router-link to="/">home page</router-link>.
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
import { useRoute } from 'vue-router'
import { useProgressStore } from '../store/progress'
import { shortlistCurriculum } from '../data/curriculum-shortlist'
import CurriculumContent from '../components/CurriculumContent.vue'
import BackToTop from '../components/BackToTop.vue'

const route = useRoute()
const progressStore = useProgressStore()
const loading = ref(true)
const isCompleted = ref(false)

// For shortlist, we always use section 1, but might have different lessons
// const sectionId = ref(1)
const lessonId = computed(() => route.params.lessonId || 1)

// The shortlist only has one section
const validSection = computed(() => shortlistCurriculum.length > 0)

const validLesson = computed(() => {
  if (!validSection.value) return false

  const lessonIndex = Number(lessonId.value) - 1
  return lessonIndex >= 0 && lessonIndex < shortlistCurriculum[0].lessons.length
})

const checkCompletion = () => {
  if (!validLesson.value) return

  // Using a special prefix for shortlist progress tracking to differentiate from regular lessons
  const lessonIndex = Number(lessonId.value) - 1
  isCompleted.value = progressStore.isLessonCompleted('shortlist', lessonIndex)
}

const loadContent = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    checkCompletion()
  }, 300)
}

onMounted(() => {
  loadContent()
})

watch(lessonId, () => {
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

/* Add any additional styling for shortlist-specific elements */
</style>
