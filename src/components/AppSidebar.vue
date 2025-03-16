<template>
  <aside class="sidebar" :class="{ collapsed: isCollapsed }">
    <!-- Top Navigation Row -->
    <div class="sidebar-top-nav" :class="{ stacked: isCollapsed }">
      <!-- Home Button -->
      <div class="sidebar-nav-button">
        <router-link
          to="/"
          class="home-nav-link"
          :class="{ active: isHomeActive() }"
          title="Home"
          @click="handleHomeClick"
        >
          <i class="bi bi-house-door-fill"></i>
        </router-link>
      </div>

      <!-- Collapse/Expand Button - Hidden on mobile -->
      <div class="sidebar-nav-button sidebar-toggle d-none d-md-flex" @click="$emit('toggle')">
        <i class="bi" :class="isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'"></i>
      </div>
    </div>

    <div class="sidebar-content" ref="sidebarContent">
      <!-- Interview Questions - Highlighted with a distinct style -->
      <div class="section-item interview-questions-item">
        <router-link
          to="/interview-questions"
          class="interview-nav-link"
          :class="{ active: isInterviewActive(), collapsed: isCollapsed }"
          title="Interview Questions"
          @click="handleItemClick"
        >
          <span class="section-icon"><i class="bi bi-question-circle-fill"></i></span>
          <span class="section-title" v-show="!isCollapsed">Interview Questions</span>
        </router-link>
      </div>

      <!-- Curriculum Sections -->
      <div
        v-for="(section, index) in curriculum"
        :key="`section-${index}`"
        class="section-item"
        :ref="
          (el) => {
            if (el) sectionRefs[index] = el
          }
        "
      >
        <div
          class="section-header"
          @click="handleSectionClick(index)"
          :class="{
            completed: isSectionCompleted(index),
            active: isSectionActive(index),
          }"
        >
          <span class="section-number">{{ index + 1 }}</span>
          <span class="section-title" v-show="!isCollapsed">{{ section.title }}</span>
          <i
            class="bi"
            :class="openSections.includes(index) ? 'bi-chevron-up' : 'bi-chevron-down'"
            v-show="!isCollapsed"
          ></i>
        </div>

        <div v-if="openSections.includes(index) && !isCollapsed" class="lesson-list">
          <router-link
            v-for="(lesson, lessonIndex) in section.lessons"
            :key="`lesson-${lessonIndex}`"
            :to="{ name: 'lesson', params: { sectionId: index + 1, lessonId: lessonIndex + 1 } }"
            class="lesson-item"
            :class="{
              completed: isLessonCompleted(index, lessonIndex),
              active: isLessonActive(index, lessonIndex),
            }"
            @click="scrollToSection(index)"
          >
            {{ lesson.title }}
          </router-link>

          <router-link
            :to="{ name: 'challenge', params: { sectionId: index + 1 } }"
            class="challenge-item"
            :class="{
              completed: isChallengeCompleted(index),
              active: isChallengeActive(index),
            }"
            @click="scrollToSection(index)"
          >
            Section Challenge
          </router-link>
        </div>
      </div>
    </div>

    <!-- Bottom Home Button (keeping this for consistency) -->
    <div class="home-button">
      <router-link to="/" title="Home" :class="{ active: isHomeActive() }" @click="handleHomeClick">
        <i class="bi bi-house-door-fill"></i>
        <span v-show="!isCollapsed">Home</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { useProgressStore } from '../store/progress'
import { curriculum } from '../data/curriculum'
import { useRoute } from 'vue-router'

const props = defineProps({
  isCollapsed: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggle', 'close', 'expand'])

const route = useRoute()
const progressStore = useProgressStore()
const openSections = ref([]) // Start with all sections collapsed
const sidebarContent = ref(null)
const sectionRefs = ref({})

// Watch for route changes to update active sections and scroll position
watch(
  () => route.params,
  async (newParams) => {
    const currentSectionId = parseInt(newParams.sectionId)

    if (currentSectionId) {
      // Close all other sections and only open the current one
      openSections.value = [currentSectionId - 1]

      // Wait for DOM update after changing openSections
      await nextTick()

      // Scroll to the active section
      scrollToSection(currentSectionId - 1)
    }
  },
  { immediate: true },
)

// Initialize sidebar state based on the current route
onMounted(async () => {
  const currentSectionId = parseInt(route.params.sectionId)

  if (currentSectionId) {
    // Only open the section that matches the current route
    openSections.value = [currentSectionId - 1]

    // Wait for DOM update
    await nextTick()

    // Scroll to active section after component is mounted and sections are expanded
    scrollToSection(currentSectionId - 1)
  }
})

// Handle click on section header
const handleSectionClick = (sectionIndex) => {
  // If sidebar is collapsed, expand it first then open the section
  if (props.isCollapsed) {
    emit('expand') // Emit event to expand sidebar

    // After sidebar expands, open the section
    nextTick(() => {
      openSections.value = [sectionIndex]
      nextTick(() => {
        scrollToSection(sectionIndex)
      })
    })
  } else {
    toggleSection(sectionIndex)
  }
}

// Handle click on any item that should expand the sidebar if collapsed
const handleItemClick = () => {
  if (props.isCollapsed) {
    emit('expand') // Emit event to expand sidebar
  }
}

// Handle click on home button
const handleHomeClick = () => {
  if (props.isCollapsed) {
    emit('expand') // Emit event to expand sidebar
  }
}

const toggleSection = (sectionIndex) => {
  if (props.isCollapsed) {
    return
  }

  if (openSections.value.includes(sectionIndex)) {
    openSections.value = openSections.value.filter((s) => s !== sectionIndex)
  } else {
    // Close all sections and only open the clicked one
    openSections.value = [sectionIndex]

    // Scroll to the section after it's open
    nextTick(() => {
      scrollToSection(sectionIndex)
    })
  }
}

// Scroll sidebar to make section visible
const scrollToSection = (sectionIndex) => {
  if (!sidebarContent.value || !sectionRefs.value[sectionIndex]) return

  const sectionElement = sectionRefs.value[sectionIndex]
  const containerTop = sidebarContent.value.scrollTop
  const containerHeight = sidebarContent.value.clientHeight
  const sectionTop = sectionElement.offsetTop
  const sectionHeight = sectionElement.clientHeight

  // Check if section is not in view
  if (sectionTop < containerTop || sectionTop + sectionHeight > containerTop + containerHeight) {
    // Scroll the section into view with some padding
    sidebarContent.value.scrollTo({
      top: sectionTop - 20,
      behavior: 'smooth',
    })
  }
}

// Check if current route is for a specific section
const isSectionActive = (sectionIndex) => {
  return parseInt(route.params.sectionId) === sectionIndex + 1
}

// Check if current route is for a specific lesson
const isLessonActive = (sectionIndex, lessonIndex) => {
  return (
    parseInt(route.params.sectionId) === sectionIndex + 1 &&
    parseInt(route.params.lessonId) === lessonIndex + 1 &&
    route.name === 'lesson'
  )
}

// Check if current route is for a section challenge
const isChallengeActive = (sectionIndex) => {
  return parseInt(route.params.sectionId) === sectionIndex + 1 && route.name === 'challenge'
}

// Check if current route is home
const isHomeActive = () => {
  return route.name === 'home'
}

// Check if current route is interview questions
const isInterviewActive = () => {
  return (
    route.name === 'interview-questions' ||
    route.name === 'interview-questions-section' ||
    route.name === 'interview-questions-detail'
  )
}

const isSectionCompleted = (sectionIndex) => {
  return progressStore.isSectionCompleted(sectionIndex)
}

const isLessonCompleted = (sectionIndex, lessonIndex) => {
  return progressStore.isLessonCompleted(sectionIndex, lessonIndex)
}

const isChallengeCompleted = (sectionIndex) => {
  return progressStore.isChallengeCompleted(sectionIndex)
}
</script>

<style scoped>
.sidebar {
  width: 300px;
  background: var(--sidebar-gradient);
  border-right: 1px solid var(--border-color);
  transition: width 0.3s ease;
  height: 100vh;
  position: fixed;
  top: 60px; /* Adjust based on your header height */
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  box-shadow: var(--shadow-sm);
}

.sidebar.collapsed {
  width: 60px;
}

/* Top Nav Section */
.sidebar-top-nav {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-sidebar);
  z-index: 10;
  transition: flex-direction 0.3s ease;
}

/* Stack buttons vertically when sidebar is collapsed */
.sidebar-top-nav.stacked {
  flex-direction: column;
}

.sidebar-nav-button {
  flex: 1;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.sidebar-toggle {
  text-align: center;
  border-left: 1px solid var(--border-color);
  transition: border 0.3s ease;
  color: var(--text-color);
}

/* Change border when stacked */
.sidebar-top-nav.stacked .sidebar-toggle {
  border-left: none;
  border-top: 1px solid var(--border-color);
}

.home-nav-link {
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 4px;
  padding: 5px;
  transition: all 0.2s ease;
}

.home-nav-link:hover,
.sidebar-toggle:hover {
  background-color: var(--hover-color);
}

.home-nav-link.active {
  color: var(--primary-color);
  background-color: var(--sidebar-active);
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.sidebar-title {
  color: var(--text-color);
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
}

.sidebar.collapsed .sidebar-title,
.sidebar.collapsed .section-title {
  display: none;
}

.section-item {
  margin-bottom: 10px;
}

.section-header {
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  background-color: var(--bg-card);
  transition: background-color 0.2s ease;
  color: var(--text-color);
  box-shadow: var(--shadow-sm);
}

.section-header:hover {
  background-color: var(--hover-color);
  transform: translateY(-1px);
}

.section-header.active {
  background-color: var(--sidebar-active);
  border-left: 4px solid var(--sidebar-active-border);
}

.section-number {
  margin-right: 10px;
  font-weight: bold;
  min-width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--section-number-gradient);
  color: var(--text-light);
  border-radius: 50%;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
}

.sidebar.collapsed .section-header {
  padding: 8px 0;
  justify-content: center;
}

.sidebar.collapsed .section-number {
  margin-right: 0;
}

.section-title {
  flex: 1;
}

.lesson-list {
  margin-left: 20px;
  margin-top: 5px;
}

.lesson-item,
.challenge-item {
  display: block;
  padding: 5px 10px;
  text-decoration: none;
  color: var(--text-color);
  border-radius: 4px;
  margin-bottom: 2px;
  transition: background-color 0.2s ease;
}

.lesson-item:hover,
.challenge-item:hover {
  background-color: var(--hover-color);
}

.lesson-item.active,
.challenge-item.active {
  background-color: var(--sidebar-active);
  border-left: 4px solid var(--sidebar-active-border);
  color: var(--primary-color);
  font-weight: 500;
}

.completed {
  color: var(--success-color);
}

.challenge-item {
  margin-top: 10px;
  font-weight: bold;
}

.home-button {
  padding: 15px;
  border-top: 1px solid var(--border-color);
  text-align: center;
}

.home-button a {
  text-decoration: none;
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.home-button a i {
  margin-right: 5px;
}

.sidebar.collapsed .home-button a i {
  margin-right: 0;
}

.home-button a:hover {
  color: var(--primary-color);
  background-color: var(--hover-color);
}

.home-button a.active {
  background-color: var(--sidebar-active);
  color: var(--primary-color);
}

/* Updated interview questions styles */
.interview-questions-item {
  margin-bottom: 20px;
  padding: 10px 0;
  border-bottom: 1px solid var(--border-color);
}

.interview-nav-link {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 8px;
  text-decoration: none;
  color: var(--text-color);
  transition: all 0.2s ease;
}

/* Handle collapsed state for interview link */
.interview-nav-link.collapsed {
  justify-content: center;
  padding: 10px 0;
}

.interview-nav-link:hover {
  background-color: var(--hover-color);
}

.interview-nav-link.active {
  background-color: var(--primary-color);
  color: white;
}

.section-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  margin-right: 10px;
  transition: margin 0.3s ease;
}

/* Remove margin when sidebar is collapsed */
.interview-nav-link.collapsed .section-icon {
  margin-right: 0;
}

.interview-nav-link.active .section-icon {
  background-color: rgba(255, 255, 255, 0.3);
}

.interview-nav-link i {
  font-size: 14px;
}

/* Media query for mobile */
@media (max-width: 767px) {
  .sidebar {
    transform: translateX(-100%);
    position: fixed;
    z-index: 1100;
  }

  .sidebar-mobile-open .sidebar {
    transform: translateX(0);
    width: 300px; /* Force full width on mobile */
  }
}
</style>
