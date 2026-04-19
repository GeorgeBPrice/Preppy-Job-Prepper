<template>
  <nav v-if="items.length" class="app-breadcrumb" aria-label="Breadcrumb">
    <ol>
      <li v-for="(item, idx) in items" :key="idx">
        <router-link v-if="item.to && idx < items.length - 1" :to="item.to">
          <i v-if="item.icon" class="bi" :class="item.icon" />
          {{ item.label }}
        </router-link>
        <span v-else class="crumb-current">
          <i v-if="item.icon" class="bi" :class="item.icon" />
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTopicStore } from '../store/topic'
import { getCurrentCurriculum } from '../utils/curriculumLoader'

const route = useRoute()
const topicStore = useTopicStore()
const curriculum = ref([])

async function reload() {
  try {
    curriculum.value = await getCurrentCurriculum()
  } catch {
    curriculum.value = []
  }
}

watch(
  () => topicStore.currentTopic,
  () => reload(),
  { immediate: true },
)

const items = computed(() => {
  const name = route.name

  if (name === 'topic-home') {
    return [
      { label: 'All Topics', to: '/', icon: 'bi-house' },
      { label: topicStore.currentTopicName },
    ]
  }

  const sectionId = Number(route.params.sectionId)
  const lessonId = Number(route.params.lessonId)
  if (!['lesson', 'challenge'].includes(name) || !sectionId) return []

  const section = curriculum.value?.[sectionId - 1]
  if (!section) return []

  const crumbs = [
    { label: 'All Topics', to: '/', icon: 'bi-house' },
    { label: topicStore.currentTopicName, to: { name: 'topic-home' } },
    { label: section.title || `Section ${sectionId}` },
  ]

  if (name === 'lesson') {
    const lesson = section.lessons?.[lessonId - 1]
    if (lesson) crumbs.push({ label: lesson.title || `Lesson ${lessonId}` })
  } else if (name === 'challenge') {
    crumbs.push({ label: 'Section Challenge', icon: 'bi-trophy' })
  }

  return crumbs
})
</script>

<style scoped>
.app-breadcrumb {
  max-width: 900px;
  margin: 0 auto 12px;
  padding: 6px 4px;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.app-breadcrumb ol {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 8px;
}

.app-breadcrumb li {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.app-breadcrumb li + li::before {
  content: '›';
  color: var(--text-muted);
  opacity: 0.7;
  margin-right: 4px;
}

.app-breadcrumb a {
  color: var(--primary-color);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.app-breadcrumb a:hover {
  text-decoration: underline;
}

.crumb-current {
  color: var(--text-color);
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
