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

    <!-- Curriculum Lessons Overview -->
    <div class="curriculum-overview">
      <h2 class="section-title">Course Overview</h2>
      <p class="section-description core">
        <strong>10 Core Sections</strong>
      </p>

      <div class="section-cards">
        <div v-for="(section, index) in curriculum" :key="index" class="section-card">
          <div :class="['card', { 'card-completed': isSectionCompleted(index) }]">
            <div class="card-header">
              <div class="section-number">{{ index + 1 }}</div>
              <h3 class="card-title">
                {{ section.title }}
                <span v-if="isSectionCompleted(index)" class="completion-badge">
                  <i class="bi bi-check-circle-fill"></i>
                </span>
              </h3>
            </div>
            <div class="card-body">
              <p class="card-text">{{ section.description }}</p>
              <div class="lesson-topics">
                <h4>Topics covered:</h4>
                <ul>
                  <li v-for="(lesson, lessonIndex) in section.lessons" :key="lessonIndex">
                    <i class="bi bi-file-earmark-code lesson-icon"></i>
                    <span class="lesson-title">{{ lesson.title }}</span>
                    <span v-if="isLessonCompleted(index, lessonIndex)" class="lesson-completed">
                      <i class="bi bi-check-circle-fill"></i>
                    </span>
                  </li>
                </ul>
              </div>
              <router-link
                :to="{ name: 'lesson', params: { sectionId: index + 1, lessonId: 1 } }"
                class="btn btn-primary start-btn"
              >
                <template v-if="getSectionStatus(index) === 'completed'">
                  <i class="bi bi-check-circle-fill me-1"></i> Completed
                </template>
                <template v-else-if="getSectionStatus(index) === 'in-progress'">
                  <i class="bi bi-play-fill me-1"></i> Continue Lesson
                </template>
                <template v-else> <i class="bi bi-play-fill me-1"></i> Start Lesson </template>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Job Ready Section -->
    <div class="job-ready-section">
      <h2 class="section-title">Prepare for JavaScript Interview Success</h2>
      <p class="section-description">
        This curriculum is specifically designed to help you succeed in interviews for:
      </p>
      <div class="row">
        <div class="col-md-4">
          <div class="job-card">
            <div class="job-icon">
              <i class="bi bi-globe"></i>
            </div>
            <h3>Web Developer</h3>
            <p>Master DOM manipulation, event handling, and modern frameworks.</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="job-card">
            <div class="job-icon">
              <i class="bi bi-stack"></i>
            </div>
            <h3>Full-Stack Developer</h3>
            <p>Balance client-side expertise with server-side JavaScript knowledge.</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="job-card">
            <div class="job-icon">
              <i class="bi bi-code-square"></i>
            </div>
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

// Check if there is any progress (any completed lessons or challenges)
const hasProgress = computed(() => {
  return (
    Object.keys(progressStore.completedLessons).length > 0 ||
    Object.keys(progressStore.completedChallenges).length > 0
  )
})

const isSectionCompleted = (sectionIndex) => {
  return progressStore.isSectionCompleted(sectionIndex)
}

const isLessonCompleted = (sectionIndex, lessonIndex) => {
  return progressStore.isLessonCompleted(sectionIndex, lessonIndex)
}

// Return the status of a section: 'not-started', 'in-progress', or 'completed'
const getSectionStatus = (sectionIndex) => {
  if (progressStore.isSectionCompleted(sectionIndex)) {
    return 'completed'
  }
  const sectionLessons = curriculum[sectionIndex].lessons
  for (let i = 0; i < sectionLessons.length; i++) {
    if (progressStore.isLessonCompleted(sectionIndex, i)) {
      return 'in-progress'
    }
  }
  return 'not-started'
}

// Starts from the very first lesson :D
const startLearning = () => {
  router.push({ name: 'lesson', params: { sectionId: 1, lessonId: 1 } })
}

// Continues to the next uncompleted lesson or challenge
const continueProgress = () => {
  const nextItem = progressStore.nextUncompletedItem
  if (nextItem) {
    if (nextItem.type === 'lesson') {
      router.push({
        name: 'lesson',
        params: {
          sectionId: nextItem.section + 1,
          lessonId: nextItem.lesson + 1,
        },
      })
    } else if (nextItem.type === 'challenge') {
      router.push({
        name: 'challenge',
        params: {
          sectionId: nextItem.section + 1,
        },
      })
    }
  } else {
    const lastSectionIndex = curriculum.length - 1
    router.push({
      name: 'challenge',
      params: {
        sectionId: lastSectionIndex + 1,
      },
    })
  }
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: var(--text-color);
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  overflow-x: hidden;
  padding-right: 0 !important;
  background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
}

body.dark-mode {
  background-image: linear-gradient(135deg, #111827 0%, #1d5497 100%);
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
  font-size: 2.8rem;
  margin-bottom: 1rem;
  display: inline-block;
  font-weight: 700;
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

.section-title {
  color: var(--text-color);
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: 600;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 60px;
  height: 4px;
  background: var(--primary-gradient);
  border-radius: 2px;
}

.section-description {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 800px;
  color: var(--text-muted);
}

.section-description.core {
  font-size: 1.2rem;
}

.section-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.section-card {
  height: 100%;
}

.card {
  height: 100%;
  transition: all 0.3s ease;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.card-completed {
  background-color: var(--bg-card-completed);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-md);
}

.card-header {
  display: flex;
  align-items: center;
  padding: 1.25rem 1.25rem 0.5rem;
  background: none;
  border-bottom: none;
}

.section-number {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  color: white;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.25rem;
  margin-right: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-title {
  color: var(--text-color);
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.completion-badge {
  margin-left: 10px;
  color: var(--success-color);
  font-size: 1.7rem;
}

.card-body {
  padding: 1rem 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
}

.card-text {
  color: var(--text-color);
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.lesson-topics {
  margin-top: 20px;
  margin-bottom: 25px;
  flex-grow: 1;
}

.lesson-topics h4 {
  color: var(--text-color);
  font-size: 1.1rem;
  margin-bottom: 15px;
  font-weight: 600;
  position: relative;
  display: inline-block;
}

.lesson-topics h4::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 40px;
  height: 3px;
  background: var(--primary-color);
  border-radius: 1.5px;
}

.lesson-topics ul {
  padding-left: 0;
  list-style: none;
}

.lesson-topics li {
  color: var(--text-color);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.lesson-icon {
  color: var(--primary-color);
  margin-right: 10px;
  font-size: 1rem;
}

.lesson-title {
  flex: 1;
}

.lesson-completed {
  color: var(--primary-color);
  margin-left: 10px;
  font-size: 0.9rem;
}

.start-btn {
  width: 100%;
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  font-weight: 500;
  margin-top: 10px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.start-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Job ready section */
.job-ready-section {
  text-align: center;
  padding: 40px 0;
  margin-top: 20px;
}

.job-ready-section .section-title {
  margin-bottom: 1.5rem;
}

.job-card {
  background-color: var(--bg-card);
  padding: 30px 20px;
  border-radius: 12px;
  height: 100%;
  margin-top: 30px;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.job-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-md);
}

.job-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--primary-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.job-card h3 {
  color: var(--text-color);
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: 600;
}

.job-card p {
  color: var(--text-muted);
  line-height: 1.6;
}

/* Media queries for responsiveness */
@media (max-width: 768px) {
  .section-cards {
    grid-template-columns: 1fr;
  }

  .hero-section h1 {
    font-size: 2.3rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .section-description {
    font-size: 1rem;
  }
}
</style>
