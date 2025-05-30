<template>
  <div class="interview-view">
    <div class="container">
      <h1 class="view-title">{{ topicStore.currentTopicName }} Prepper Questions</h1>
      <p class="view-description">
        Review the most common interview questions from each lesson section. Expand questions to see
        concise answers that will help you prepare for technical interviews.
      </p>

      <interview-questions
        :section-param="$route.params.section"
        :question-param="$route.params.question"
        @section-change="onSectionChange"
        @question-change="onQuestionChange"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import InterviewQuestions from '../components/InterviewQuestions.vue'
import { useTopicStore } from '../store/topic'

const router = useRouter()
const route = useRoute()
const topicStore = useTopicStore()

// Handle section changes from the component
const onSectionChange = (sectionId) => {
  if (route.name === 'interview-questions') {
    router.push({
      name: 'interview-questions-section',
      params: { section: sectionId },
    })
  } else if (route.name === 'interview-questions-detail') {
    router.push({
      name: 'interview-questions-section',
      params: { section: sectionId },
    })
  } else {
    router.push({
      name: route.name,
      params: { ...route.params, section: sectionId },
    })
  }
}

// Handle question changes from the component
const onQuestionChange = (sectionId, questionIndex) => {
  if (questionIndex === null) {
    // If question is collapsed, remove the question param
    router.push({
      name: 'interview-questions-section',
      params: { section: sectionId },
    })
  } else {
    router.push({
      name: 'interview-questions-detail',
      params: {
        section: sectionId,
        question: (questionIndex + 1).toString(),
      },
    })
  }
}

// Track page view
onMounted(() => {
  // You could add analytics tracking here if needed
  document.title = 'JavaScript Interview Questions - JS Prepper'
})
</script>

<style scoped>
.interview-view {
  max-width: 900px;
  margin: 0 auto;
  min-height: 400px;
  position: relative;
  color: var(--text-color);
  transition: all var(--transition-speed) ease;
}
</style>
