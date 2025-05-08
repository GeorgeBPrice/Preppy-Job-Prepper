<template>
  <header class="app-header">
    <div class="container-fluid">
      <div class="header-content">
        <!-- Left section: Logo, menu toggle and title -->
        <div class="header-left">
          <!-- Mobile menu toggle button -->
          <div class="mobile-menu-toggle d-md-none" @click="toggleMobileMenu">
            <i class="bi" :class="mobileMenuOpen ? 'bi-x-lg' : 'bi-list'"></i>
          </div>

          <!-- Logo -->
          <div class="logo">
            <svg width="50" height="30" viewBox="0 0 70 40" class="logo-svg">
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#4F46E5" />
                  <stop offset="100%" stop-color="#7C3AED" />
                </linearGradient>
              </defs>
              <rect width="70" height="40" rx="8" fill="url(#logoGradient)" />
              <text
                x="10"
                y="25"
                font-family="Arial, sans-serif"
                font-size="14"
                font-weight="bold"
                fill="white"
              >
                PreppY
              </text>
            </svg>
          </div>

          <!-- Topic Selector Dropdown -->
          <div class="topic-selector d-none d-md-flex">
            <label for="topic-select" class="topic-label">Topic:</label>
            <select
              id="topic-select"
              v-model="selectedTopic"
              @change="changeTopic"
              class="topic-select"
            >
              <option
                v-for="topic in topicStore.availableTopics"
                :key="topic.value"
                :value="topic.value"
              >
                {{ topic.label }}
              </option>
            </select>
          </div>

          <h1 class="gradient-text d-none d-md-block">
            {{ topicStore.currentTopicName }} Job Prepper
          </h1>
          <h1 class="gradient-text d-inline-block d-md-none">
            {{ topicStore.topicShortName }} Prepper
          </h1>
        </div>
        <!-- Middle section: Search bar (only visible on desktop) -->
        <div class="header-center d-none d-md-block">
          <SearchBar @search-closed="searchExpanded = false" />
        </div>

        <!-- Right section: Theme toggle, Progress, Continue, and mobile search icon -->
        <div class="header-right">
          <!-- Mobile Topic Selector -->
          <div class="mobile-topic-selector d-md-none">
            <select
              v-model="selectedTopic"
              @change="changeTopic"
              class="topic-select-mobile"
              aria-label="Select topic"
            >
              <option
                v-for="topic in topicStore.availableTopics"
                :key="topic.value"
                :value="topic.value"
              >
                {{ topic.label }}
              </option>
            </select>
          </div>

          <div class="progress-container d-flex">
            <ProgressBar />
          </div>

          <button
            v-if="hasProgress"
            @click="goToCurrentProgress"
            class="btn btn-primary continue-btn"
          >
            Continue
          </button>

          <ThemeToggle />
        </div>
      </div>
    </div>

    <!-- Mobile full-screen search overlay -->
    <div v-if="searchExpanded" class="mobile-search-overlay d-md-none">
      <SearchBar @search-closed="searchExpanded = false" @search-opened="searchExpanded = true" />
    </div>
  </header>
</template>

<script setup>
import ProgressBar from './ProgressBar.vue'
import ThemeToggle from './ThemeToggle.vue'
import SearchBar from './SearchBar.vue'
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useProgressStore } from '../store/progress'
import { useTopicStore } from '../store/topic'

const emit = defineEmits(['toggle-mobile-menu'])
const router = useRouter()
const progressStore = useProgressStore()
const topicStore = useTopicStore()

const mobileMenuOpen = ref(false)
const searchExpanded = ref(false)
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)
const selectedTopic = ref('javascript') // Added ref for topic selection

// Check if there's any user progress to determine if we should show the continue button
const hasProgress = computed(() => {
  return (
    progressStore.currentLesson &&
    (progressStore.currentLesson.section > 0 ||
      Object.keys(progressStore.completedLessons).length > 0)
  )
})

onMounted(() => {
  // set progress state
  if (!progressStore.isLoaded) {
    progressStore.loadProgress()
  }

  // Load topic preference
  if (!topicStore.isLoaded) {
    topicStore.loadTopicPreference()
  }
  selectedTopic.value = topicStore.currentTopic

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize)
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize)
  }
})

const handleResize = () => {
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth
    if (windowWidth.value >= 768 && searchExpanded.value) {
      searchExpanded.value = false
    }
  }
}

// Handle topic change - redirect to home page
const changeTopic = () => {
  // Only take action if there's actually a change
  if (selectedTopic.value !== topicStore.currentTopic) {
    // Set the new topic
    topicStore.setTopic(selectedTopic.value)

    // Always navigate to home page when switching topics
    router.push('/')
  }
}

const goToCurrentProgress = async () => {
  try {
    const nextItem = await progressStore.nextUncompletedItem
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
      // If all items are completed, navigate to home
      router.push('/')
    }
  } catch (error) {
    console.error('Error navigating to current progress:', error)
    router.push('/')
  }
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  emit('toggle-mobile-menu', mobileMenuOpen.value)
}
</script>

<style scoped>
.section-header .bi {
  font-size: 1.2rem;
}
h1.gradient-text {
  font-weight: 300;
}
.app-header {
  padding: 0.5rem 0.75rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1010;
  background-color: var(--bg-header);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-speed) ease;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  height: 50px;
}

.header-left {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.header-center {
  flex-grow: 1;
  max-width: 500px;
  padding: 0 1rem;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo {
  display: flex;
  align-items: center;
  margin-right: 0.75rem;
}

.logo-svg {
  width: 50px;
  height: 30px;

  @media (max-width: 576px) {
    width: 40px;
    height: 25px;
  }
}

h1 {
  font-size: 1.4rem;
  margin: 0;

  @media (max-width: 576px) {
    font-size: 1.1rem;
  }
}

.mobile-menu-toggle {
  font-size: 1.5rem;
  margin-right: 0.75rem;
  cursor: pointer;
  color: var(--text-color);

  @media (max-width: 576px) {
    font-size: 1.2rem;
    margin-right: 0.5rem;
  }
}

.search-toggle {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: var(--text-color);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.progress-container {
  width: 150px;
  transition: width 0.3s ease;
}

.continue-btn {
  white-space: nowrap;
  padding: 0.375rem 0.75rem;
  font-size: 0.9rem;
}

.mobile-search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--bg-header);
  z-index: 1050;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

/* Topic selector styles */
.topic-selector {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.topic-label {
  margin-right: 5px;
  font-size: 0.9rem;
  color: var(--text-color);
  white-space: nowrap;
}

.topic-select {
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-content);
  color: var(--text-color);
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s ease;
}

.topic-select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
}

.mobile-topic-selector {
  margin-right: 10px;
}

.topic-select-mobile {
  padding: 2px 5px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-content);
  color: var(--text-color);
  font-size: 0.8rem;
  max-width: 95px;
  outline: none;
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .topic-label {
    display: none;
  }

  .topic-select-mobile {
    max-width: 80px;
    font-size: 0.75rem;
  }
}

@media (max-width: 767px) {
  .progress-container {
    width: 80px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .progress-container {
    width: 120px;
  }
}

@media (min-width: 992px) {
  .progress-container {
    width: 300px;
  }
}
</style>
