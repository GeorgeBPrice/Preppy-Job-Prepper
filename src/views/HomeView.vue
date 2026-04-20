<template>
  <div class="landing">
    <div class="hero-section">
      <h1>Preppy Job Prepper</h1>
      <p class="lead">
        A friendly refresher and review companion for your next
        <strong>Mid-level to Senior</strong> Full Stack or Application Developer interview, from
        JavaScript, C#, TypeScript, React to DevOps, and more.
      </p>
      <div v-if="lastActiveTopic" class="hero-actions">
        <button class="btn btn-lg btn-primary" @click="continueLastLesson">
          <i class="bi bi-play-fill me-1"></i>
          Continue {{ lastActiveTopic.label }} Lesson
        </button>
      </div>
    </div>

    <div class="study-ways-section">
      <h2 class="section-title">Three ways to study</h2>
      <div class="study-ways-grid">
        <div class="study-way-card">
          <div class="study-way-icon study-way-icon--curriculum">
            <i class="bi bi-journal-bookmark"></i>
          </div>
          <h3>Refresher Curriculum</h3>
          <p>
            Structured sections and lessons with worked examples and per-section coding
            challenges — best when you want to go deep on a topic.
          </p>
        </div>
        <div class="study-way-card">
          <div class="study-way-icon study-way-icon--minicourse">
            <i class="bi bi-lightning-charge"></i>
          </div>
          <h3>Minicourse Recapper</h3>
          <p>
            The 20 essential concepts for each topic, distilled into a single focused walkthrough
            — perfect for last-minute cramming.
          </p>
        </div>
        <div class="study-way-card">
          <div class="study-way-icon study-way-icon--interview">
            <i class="bi bi-patch-question"></i>
          </div>
          <h3>Interview Questions</h3>
          <p>
            Curated question banks with expert answers so you can rehearse the kinds of questions
            real interviewers tend to ask.
          </p>
        </div>
      </div>
    </div>

    <div v-if="inProgressTopics.length" class="topics-section">
      <h2 class="section-title">Continue where you left off</h2>
      <p class="section-description">
        You have open progress in {{ inProgressTopics.length }}
        topic{{ inProgressTopics.length === 1 ? '' : 's' }}.
      </p>
      <div class="topic-grid">
        <article
          v-for="topic in inProgressTopics"
          :key="`progress-${topic.value}`"
          class="topic-card topic-card--progress"
        >
          <div class="topic-card__top">
            <div class="topic-icon" :style="{ background: topic.gradient }">
              <i class="bi" :class="topic.icon"></i>
            </div>
            <div>
              <h3 class="topic-card__title">{{ topic.label }}</h3>
              <p class="topic-card__sub">{{ topic.tagline }}</p>
            </div>
          </div>
          <div class="topic-card__progress">
            <div class="progress-bar-track" aria-hidden="true">
              <div class="progress-bar-fill" :style="{ width: `${topic.percent}%` }"></div>
            </div>
            <span class="progress-label">{{ topic.percent }}% complete</span>
          </div>
          <div class="topic-card__actions">
            <button class="btn btn-primary" @click="resumeTopic(topic)">
              <i class="bi bi-play-fill me-1"></i> Resume
            </button>
            <button class="btn btn-outline-primary" @click="openTopicHome(topic.value)">
              Overview
            </button>
          </div>
        </article>
      </div>
    </div>

    <div class="topics-section">
      <h2 class="section-title">All Topics</h2>
      <p class="section-description">
        Each topic has a focused curriculum plus a minicourse recapper and interview-question bank.
      </p>
      <div class="topic-grid">
        <article
          v-for="topic in allTopics"
          :key="topic.value"
          class="topic-card"
          :class="{ 'topic-card--completed': topic.percent === 100 }"
        >
          <div class="topic-card__top">
            <div class="topic-icon" :style="{ background: topic.gradient }">
              <i class="bi" :class="topic.icon"></i>
            </div>
            <div>
              <h3 class="topic-card__title">{{ topic.label }}</h3>
              <p class="topic-card__sub">{{ topic.tagline }}</p>
            </div>
          </div>
          <div class="topic-card__progress">
            <div class="progress-bar-track" aria-hidden="true">
              <div class="progress-bar-fill" :style="{ width: `${topic.percent}%` }"></div>
            </div>
            <span class="progress-label">
              <template v-if="topic.percent === 0">Not started</template>
              <template v-else-if="topic.percent === 100">Completed</template>
              <template v-else>{{ topic.percent }}% complete</template>
            </span>
          </div>
          <div class="topic-card__actions">
            <button class="btn btn-primary" @click="openTopicHome(topic.value)">
              <i class="bi bi-arrow-right me-1"></i> Go to {{ topic.shortLabel }}
            </button>
          </div>
        </article>
      </div>
    </div>

    <div class="job-ready-section">
      <h2 class="section-title">Prepare for your Interview Success</h2>
      <p class="section-description">
        Preppy is designed to help you succeed in interviews across common developer roles:
      </p>
      <div class="row">
        <div class="col-md-4 mb-3">
          <div class="job-card">
            <div class="job-icon"><i class="bi bi-globe"></i></div>
            <h3>Web Developer</h3>
            <p>Master DOM manipulation, event handling, and modern frameworks.</p>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="job-card">
            <div class="job-icon"><i class="bi bi-stack"></i></div>
            <h3>Full-Stack Developer</h3>
            <p>Balance client-side expertise with server-side knowledge.</p>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="job-card">
            <div class="job-icon"><i class="bi bi-code-square"></i></div>
            <h3>Software Developer</h3>
            <p>Develop advanced understanding of performance optimization and design patterns.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useProgressStore } from '../store/progress'
import { useTopicStore } from '../store/topic'
import { loadCurriculum } from '../utils/curriculumLoader'
import { resolveIdsFromIndexes } from '../utils/curriculumIds'

const router = useRouter()
const progressStore = useProgressStore()
const topicStore = useTopicStore()

const TOPIC_META = {
  javascript: {
    shortLabel: 'JavaScript',
    tagline: 'Core language fundamentals, async, and patterns.',
    icon: 'bi-braces',
    gradient: 'linear-gradient(135deg, #f7df1e 0%, #e6a800 100%)',
  },
  typescript: {
    shortLabel: 'TypeScript',
    tagline: 'Types, generics, and modern JS tooling.',
    icon: 'bi-file-earmark-code',
    gradient: 'linear-gradient(135deg, #3178c6 0%, #1e5ea8 100%)',
  },
  react: {
    shortLabel: 'React',
    tagline: 'Components, hooks, and state management.',
    icon: 'bi-bounding-box-circles',
    gradient: 'linear-gradient(135deg, #61dafb 0%, #2196c9 100%)',
  },
  csharp: {
    shortLabel: 'C# .NET',
    tagline: 'OOP, LINQ, async, and the .NET runtime.',
    icon: 'bi-hash',
    gradient: 'linear-gradient(135deg, #68217a 0%, #512bd4 100%)',
  },
  devops: {
    shortLabel: 'DevOps',
    tagline: 'Pipelines, IaC, and release strategies.',
    icon: 'bi-cloud-arrow-up',
    gradient: 'linear-gradient(135deg, #0078d4 0%, #004c87 100%)',
  },
  ai: {
    shortLabel: 'AI',
    tagline: 'LLMs, prompting, and common ML concepts.',
    icon: 'bi-stars',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
  },
}

function metaFor(topicValue) {
  return (
    TOPIC_META[topicValue] || {
      shortLabel: topicValue,
      tagline: '',
      icon: 'bi-journal-code',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    }
  )
}

const topicStats = ref({})

async function computeTopicStats() {
  const stats = {}
  for (const t of topicStore.availableTopics) {
    stats[t.value] = { percent: 0, total: 0, completed: 0 }
    try {
      const data = await loadCurriculum(t.value)
      const curriculum = Array.isArray(data?.curriculum) ? data.curriculum : []
      const shortlist = Array.isArray(data?.shortlistCurriculum) ? data.shortlistCurriculum : []
      const topicProgress = progressStore.topicProgress[t.value] || {}
      const completedLessons = topicProgress.completedLessons || {}
      const completedChallenges = topicProgress.completedChallenges || {}

      // Progress is stored nested as completedLessons[sectionKey][lessonKey],
      // where keys are stable slug IDs (with legacy numeric-index fallback).
      const lessonDone = (sectionIndex, lessonIndex) => {
        const { sectionId, lessonId } = resolveIdsFromIndexes(
          t.value,
          sectionIndex,
          lessonIndex,
        )
        if (sectionId && lessonId && completedLessons[sectionId]?.[lessonId]) return true
        return !!completedLessons[String(sectionIndex)]?.[String(lessonIndex)]
      }
      const challengeDone = (sectionIndex) => {
        const { sectionId } = resolveIdsFromIndexes(t.value, sectionIndex)
        if (sectionId && completedChallenges[sectionId]) return true
        return !!completedChallenges[String(sectionIndex)]
      }

      let total = 0
      let completed = 0
      curriculum.forEach((section, sectionIndex) => {
        const lessons = Array.isArray(section?.lessons) ? section.lessons : []
        lessons.forEach((_, lessonIndex) => {
          total++
          if (lessonDone(sectionIndex, lessonIndex)) completed++
        })
        if (section?.challenge) {
          total++
          if (challengeDone(sectionIndex)) completed++
        }
      })

      // Shortlist/minicourse lessons are tracked under the virtual section
      // key 'shortlist' (see ShortlistView.vue -> isLessonCompleted('shortlist', i)).
      shortlist.forEach((section) => {
        const lessons = Array.isArray(section?.lessons) ? section.lessons : []
        lessons.forEach((_, lessonIndex) => {
          total++
          if (completedLessons.shortlist?.[String(lessonIndex)]) completed++
        })
      })

      stats[t.value] = {
        total,
        completed,
        percent: total === 0 ? 0 : Math.round((completed / total) * 100),
      }
    } catch (error) {
      console.error(`Failed to compute progress for topic ${t.value}:`, error)
    }
  }
  topicStats.value = stats
}

const allTopics = computed(() => {
  const mapped = topicStore.availableTopics.map((t) => {
    const meta = metaFor(t.value)
    const stat = topicStats.value[t.value] || { percent: 0 }
    return {
      value: t.value,
      label: t.label,
      shortLabel: meta.shortLabel,
      tagline: meta.tagline,
      icon: meta.icon,
      gradient: meta.gradient,
      percent: stat.percent,
    }
  })
  // Started topics first (descending by percent), then not-started in original order.
  return [...mapped].sort((a, b) => {
    const aStarted = a.percent > 0 ? 1 : 0
    const bStarted = b.percent > 0 ? 1 : 0
    if (aStarted !== bStarted) return bStarted - aStarted
    return b.percent - a.percent
  })
})

const inProgressTopics = computed(() =>
  allTopics.value.filter((t) => t.percent > 0 && t.percent < 100),
)

function topicHasAnyProgress(topicValue) {
  const tp = progressStore.topicProgress[topicValue] || {}
  const cl = tp.currentLesson
  return (
    (cl && (cl.section > 0 || cl.lesson > 0)) ||
    Object.keys(tp.completedLessons || {}).length > 0 ||
    Object.keys(tp.completedChallenges || {}).length > 0
  )
}

// Picks the topic the user most recently worked on. Prefers the topic that
// the store already has selected when it has progress, so a user who just
// switched topics doesn't get yanked back to an older one.
const lastActiveTopic = computed(() => {
  // Reference _forceUpdate so progress mutations (complete/uncomplete/reset)
  // retrigger this computation.
  void progressStore._forceUpdate
  const candidates = []
  if (topicHasAnyProgress(topicStore.currentTopic)) {
    candidates.push(topicStore.currentTopic)
  }
  for (const t of topicStore.availableTopics) {
    if (t.value !== topicStore.currentTopic && topicHasAnyProgress(t.value)) {
      candidates.push(t.value)
    }
  }
  if (candidates.length === 0) return null
  const topicValue = candidates[0]
  const meta = topicStore.availableTopics.find((t) => t.value === topicValue)
  return { value: topicValue, label: meta ? meta.label : topicValue }
})

async function continueLastLesson() {
  if (!lastActiveTopic.value) return
  const topicValue = lastActiveTopic.value.value
  if (topicStore.currentTopic !== topicValue) {
    topicStore.setTopic(topicValue)
  }
  const tp = progressStore.topicProgress[topicValue] || {}
  const current = tp.currentLesson
  if (current && (current.section > 0 || current.lesson > 0)) {
    router.push({
      name: 'lesson',
      params: { sectionId: current.section + 1, lessonId: current.lesson + 1 },
    })
    return
  }
  try {
    const next = await progressStore.nextUncompletedItem
    if (next?.type === 'lesson') {
      router.push({
        name: 'lesson',
        params: { sectionId: next.section + 1, lessonId: next.lesson + 1 },
      })
      return
    }
    if (next?.type === 'challenge') {
      router.push({
        name: 'challenge',
        params: { sectionId: next.section + 1 },
      })
      return
    }
  } catch (error) {
    console.error('continueLastLesson failed:', error)
  }
  router.push({ name: 'topic-home' })
}

function openTopicHome(topicValue) {
  if (topicStore.currentTopic !== topicValue) {
    topicStore.setTopic(topicValue)
  }
  router.push({ name: 'topic-home' })
}

async function resumeTopic(topic) {
  if (topicStore.currentTopic !== topic.value) {
    topicStore.setTopic(topic.value)
  }
  const topicProgress = progressStore.topicProgress[topic.value] || {}
  const current = topicProgress.currentLesson
  if (current && (current.section > 0 || current.lesson > 0)) {
    router.push({
      name: 'lesson',
      params: { sectionId: current.section + 1, lessonId: current.lesson + 1 },
    })
    return
  }
  try {
    const next = await progressStore.nextUncompletedItem
    if (next?.type === 'lesson') {
      router.push({
        name: 'lesson',
        params: { sectionId: next.section + 1, lessonId: next.lesson + 1 },
      })
      return
    }
    if (next?.type === 'challenge') {
      router.push({
        name: 'challenge',
        params: { sectionId: next.section + 1 },
      })
      return
    }
  } catch (error) {
    console.error('resumeTopic failed:', error)
  }
  router.push({ name: 'topic-home' })
}

onMounted(async () => {
  if (!topicStore.isLoaded) {
    topicStore.loadTopicPreference()
    await topicStore.initializeTopics()
  }
  if (!progressStore.isLoaded) {
    progressStore.loadProgress()
  }
  await computeTopicStats()
})

watch(
  () => progressStore._forceUpdate,
  () => {
    computeTopicStats()
  },
)

watch(
  () => progressStore.topicProgress,
  () => {
    computeTopicStats()
  },
  { deep: true },
)
</script>

<style scoped>
.landing {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: var(--text-color);
}

.hero-section {
  text-align: center;
  padding: 40px 0 30px;
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
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  max-width: 860px;
  margin-left: auto;
  margin-right: auto;
}

.hero-sub {
  color: var(--text-muted);
  font-size: 1rem;
}

.hero-actions {
  margin-top: 22px;
  display: flex;
  justify-content: center;
}

.hero-actions .btn {
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1.3rem;
  font-size: 1.05rem;
}

.topics-section {
  margin: 40px 0;
}

.study-ways-section {
  margin: 30px 0 40px;
}

.study-ways-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
  margin-top: 16px;
}

.study-way-card {
  position: relative;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 14px 64px 14px 16px;
  box-shadow: var(--shadow-sm);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.study-way-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.study-way-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.study-way-icon--curriculum {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
}

.study-way-icon--minicourse {
  background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
}

.study-way-icon--interview {
  background: linear-gradient(135deg, #10b981 0%, #0ea5e9 100%);
}

.study-way-card h3 {
  margin: 0 0 4px;
  color: var(--text-color);
  font-size: 1.05rem;
  padding-right: 4px;
}

.study-way-card p {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.85rem;
  line-height: 1.45;
}

.section-title {
  color: var(--text-color);
  margin-bottom: 0.5rem;
  font-size: 1.75rem;
  font-weight: 600;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 50px;
  height: 3px;
  background: var(--primary-gradient);
  border-radius: 2px;
}

.section-description {
  font-size: 1rem;
  margin: 1rem 0 1.5rem;
  color: var(--text-muted);
  max-width: 800px;
}

.topic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.topic-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 18px;
  box-shadow: var(--shadow-sm);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.topic-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.topic-card--progress {
  border-color: var(--primary-color);
}

.topic-card--completed {
  background-color: var(--bg-card-completed);
}

.topic-card__top {
  display: flex;
  align-items: center;
  gap: 14px;
}

.topic-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.5rem;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.topic-card__title {
  margin: 0;
  font-size: 1.2rem;
  color: var(--text-color);
}

.topic-card__sub {
  margin: 2px 0 0;
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.3;
}

.topic-card__progress {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.progress-bar-track {
  width: 100%;
  height: 6px;
  background-color: var(--border-color);
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: var(--primary-gradient);
  transition: width 0.3s ease;
}

.progress-label {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.topic-card__actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
}

.topic-card__actions .btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 0.6rem;
  font-size: 0.9rem;
}

.job-ready-section {
  padding: 40px 0;
  margin-top: 20px;
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

@media (max-width: 768px) {
  .topic-grid {
    grid-template-columns: 1fr;
  }
  .hero-section h1 {
    font-size: 2.3rem;
  }
  .section-title {
    font-size: 1.5rem;
  }
}
</style>
