<template>
  <div class="home">
    <div class="hero-section">
      <h1>JavaScript Job Prepper</h1>
      <p class="lead">
        Review core JavaScript concepts for <strong>Mid-level to Senior</strong> Full Stack or
        Application Developer role job interviews
      </p>
      <div class="action-buttons">
        <button @click="startLearning" class="btn btn-lg btn-primary">Start Learning</button>
        <button
          v-if="hasProgress"
          @click="continueProgress"
          class="btn btn-lg btn-outline-primary ms-3"
        >
          Continue Progress
        </button>
      </div>
    </div>

    <div class="curriculum-overview">
      <h2>Course Overview</h2>
      <p>
        This program breaks down JavaScript concepts into 10 core areas that are crucial for your
        interview success.
      </p>

      <div class="section-cards">
        <div v-for="(section, index) in curriculum" :key="index" class="section-card">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">
                {{ index + 1 }}. {{ section.title }}
                <span v-if="isSectionCompleted(index)" class="badge bg-success ms-2"
                  >Completed</span
                >
              </h3>
              <p class="card-text">{{ section.description }}</p>
              <div class="lesson-topics">
                <h4 style="margin-top: 10px !important">Topics covered:</h4>
                <ul>
                  <li v-for="(lesson, lessonIndex) in section.lessons" :key="lessonIndex">
                    {{ lesson.title }}
                    <span v-if="isLessonCompleted(index, lessonIndex)" class="badge bg-success ms-1"
                      >✓</span
                    >
                  </li>
                </ul>
              </div>
              <router-link
                :to="{ name: 'lesson', params: { sectionId: index + 1, lessonId: 1 } }"
                class="btn btn-primary"
                >Start Section</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="job-ready-section">
      <h2>Prepare for JavaScript Interview Success</h2>
      <p>This curriculum is specifically designed to help you succeed in interviews for:</p>
      <div class="row">
        <div class="col-md-4">
          <div class="job-card">
            <h3>Web Developer</h3>
            <p>Master DOM manipulation, event handling, and modern frameworks.</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="job-card">
            <h3>Full-Stack Developer</h3>
            <p>Balance client-side expertise with server-side JavaScript knowledge.</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="job-card">
            <h3>Software Developer</h3>
            <p>Develop advanced understanding of performance optimization and design patterns.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProgressStore } from '../store/progress'
import { curriculum } from '../data/curriculum'

const router = useRouter()
const progressStore = useProgressStore()

const hasProgress = computed(() => {
  return progressStore.currentLesson.section > 0
})

const isSectionCompleted = (sectionIndex) => {
  return progressStore.isSectionCompleted(sectionIndex)
}

const isLessonCompleted = (sectionIndex, lessonIndex) => {
  return progressStore.isLessonCompleted(sectionIndex, lessonIndex)
}

const startLearning = () => {
  router.push({ name: 'lesson', params: { sectionId: 1, lessonId: 1 } })
}

const continueProgress = () => {
  const { section, lesson } = progressStore.currentLesson
  router.push({
    name: 'lesson',
    params: {
      sectionId: section + 1,
      lessonId: lesson + 1,
    },
  })
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: var(--text-color);
}

.hero-section {
  text-align: center;
  padding: 50px 0;
  margin-bottom: 40px;
}

.hero-section h1 {
  background: var(--primary-gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: inline-block;
}

.lead {
  font-size: 1.25rem;
  margin-bottom: 30px;
  color: var(--text-color);
}

.action-buttons {
  margin-top: 30px;
}

.curriculum-overview {
  margin-bottom: 60px;
}

.curriculum-overview h2 {
  color: var(--text-color);
  margin-bottom: 1rem;
}

.section-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.section-card {
  height: 100%;
}

.card {
  height: 100%;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  color: var(--text-color);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.card-title {
  color: var(--text-color);
  margin-top: 5px !important;
}

.card-text {
  color: var(--text-color);
}

.lesson-topics {
  margin-top: 20px;
  margin-bottom: 20px;
  color: var(--text-color);
}

.lesson-topics h4 {
  color: var(--text-color);
}

.lesson-topics ul {
  padding-left: 1.5rem;
}

.lesson-topics li {
  color: var(--text-color);
}

.badge {
  transition: background-color 0.3s ease;
}

.job-ready-section {
  text-align: center;
  padding: 40px 0;
}

.job-ready-section h2 {
  color: var(--text-color);
  margin-bottom: 1.5rem;
}

.job-card {
  background-color: var(--bg-card);
  padding: 20px;
  border-radius: 5px;
  height: 100%;
  margin-top: 30px;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.job-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.job-card h3 {
  color: var(--text-color);
  margin-bottom: 1rem;
}

.job-card p {
  color: var(--text-color);
}
</style>
