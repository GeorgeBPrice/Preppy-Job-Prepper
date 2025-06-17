<template>
  <aside class="sidebar" :class="{ collapsed: isCollapsed }">
    <!-- Top Navigation Row -->
    <div class="sidebar-top-nav" :class="{ stacked: isCollapsed }">
      <!-- Home Button -->
      <router-link
        to="/"
        class="home-nav-link sidebar-nav-button sidebar-toggle d-none d-md-flex"
        :class="{ active: isHomeActive() }"
        title="Home"
        @click="closeMobileMenuOnNavigation"
      >
        <i class="bi bi-house-door-fill"></i>
      </router-link>

      <!-- Collapse/Expand Button - Hidden on mobile -->
      <div class="sidebar-nav-button sidebar-toggle d-none d-md-flex" @click="$emit('toggle')">
        <i class="bi" :class="isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'"></i>
      </div>
    </div>

    <!-- Curriculum Menu -->
    <div class="sidebar-content" ref="sidebarContent">
      <!-- Prepper section -->
      <div :class="{ 'menu-label collapsed': isCollapsed, 'menu-label': !isCollapsed }">
        <label>{{ isCollapsed ? 'Recap' : 'Quick Recap' }}</label>
      </div>
      <div class="section-item interview-questions-item">
        <!-- Shortlist Prepper -->
        <router-link
          to="/minicourse-recapper"
          class="interview-nav-link"
          :class="{ active: isShortListActive(), collapsed: isCollapsed }"
          title="Minicourse Recapper"
          @click="closeMobileMenuOnNavigation"
        >
          <span class="section-icon"><i class="bi bi-list-check"></i></span>
          <span class="section-title" v-show="!isCollapsed">Minicourse Recapper</span>
        </router-link>

        <!-- Interview Questions -->
        <router-link
          to="/interview-questions"
          class="interview-nav-link last"
          :class="{ active: isInterviewActive(), collapsed: isCollapsed }"
          title="Prep Interview Questions"
          @click="closeMobileMenuOnNavigation"
        >
          <span class="section-icon"><i class="bi bi-question-circle-fill"></i></span>
          <span class="section-title" v-show="!isCollapsed">Prep Interview Questions</span>
        </router-link>
      </div>

      <!-- Curriculum Sections - Only show if curriculum exists for the topic -->
      <div
        v-if="topicStore.hasCurriculum && currentCurriculum.length > 0"
        :class="{ 'menu-label collapsed': isCollapsed, 'menu-label': !isCollapsed }"
      >
        <label>{{ isCollapsed ? 'Course' : 'Full Prepper Course' }}</label>
      </div>
      <div
        v-for="(section, index) in currentCurriculum"
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
            @click="closeMobileMenuOnNavigation"
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
            @click="closeMobileMenuOnNavigation"
          >
            Section Challenge
          </router-link>
        </div>
      </div>

      <!-- Show message if no curriculum is available -->
      <div
        v-if="
          !loading && topicStore.hasCurriculum && currentCurriculum.length === 0 && !isCollapsed
        "
        class="no-curriculum-message"
      >
        <p class="text-center">
          You can take the <strong>Minicourse Recapper</strong>, or try
          <strong>Prep Interview Questions</strong>.
        </p>
        <p style="font-style: italic">
          The full {{ topicStore.currentTopicName }} course is unavailable.
        </p>
      </div>

      <div v-if="loading" class="loading-message">
        <p class="text-center">Loading {{ topicStore.currentTopicName }} curriculum...</p>
      </div>
    </div>

    <!-- Sidebar resizer draggable edge -->
    <div class="sidebar-resize-handle" @mousedown="startResize" @touchstart="startResize"></div>

    <div class="section-bottom"></div>
  </aside>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, onUnmounted } from 'vue'
import { useProgressStore } from '../store/progress'
import { useTopicStore } from '../store/topic'
import { useRoute } from 'vue-router'
import { getCurrentCurriculum } from '../utils/curriculumLoader'

const props = defineProps({
  isCollapsed: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggle', 'close', 'expand'])

const route = useRoute()
const progressStore = useProgressStore()
const topicStore = useTopicStore()
const openSections = ref([])
const sidebarContent = ref(null)
const sectionRefs = ref({})
const currentCurriculum = ref([])
const loading = ref(true)
const sectionCompletionMap = ref({})

// Resize handling
const isResizing = ref(false)
const startX = ref(0)
const startWidth = ref(0)
const minWidth = 60
const maxWidth = 400

const startResize = (e) => {
  isResizing.value = true
  startX.value = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX
  startWidth.value = props.isCollapsed ? minWidth : 300

  // Tablet support, event listeners for mouse touch
  if (e.type === 'mousedown') {
    document.addEventListener('mousemove', handleResize)
    document.addEventListener('mouseup', stopResize)
  } else {
    document.addEventListener('touchmove', handleResize)
    document.addEventListener('touchend', stopResize)
  }
}

const handleResize = (e) => {
  if (!isResizing.value) return

  const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX
  const diff = currentX - startX.value
  const newWidth = Math.min(Math.max(startWidth.value + diff, minWidth), maxWidth)

  // Snapping collapse/expand by defined break widths
  if (newWidth <= minWidth + 20) {
    emit('toggle')
    stopResize()
  } else if (newWidth >= 300 - 20) {
    if (props.isCollapsed) {
      emit('toggle')
    }
  }
}

const stopResize = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
  document.removeEventListener('touchmove', handleResize)
  document.removeEventListener('touchend', stopResize)
}

// Clean up
onUnmounted(() => {
  stopResize()
})

// Load the curriculum for the current topic
const loadCurriculum = async () => {
  loading.value = true
  try {
    currentCurriculum.value = await getCurrentCurriculum()
  } catch (error) {
    console.error('Error loading curriculum for sidebar:', error)
    currentCurriculum.value = []
  } finally {
    loading.value = false
  }
}

const updateCompletionMap = async () => {
  if (!currentCurriculum.value || currentCurriculum.value.length === 0) return

  const completionMap = {}
  for (let i = 0; i < currentCurriculum.value.length; i++) {
    completionMap[i] = await progressStore.isSectionCompleted(i)
  }
  sectionCompletionMap.value = completionMap
}

// Watch for route changes to update active sections and scroll position
watch(
  () => route.params,
  async (newParams) => {
    const currentSectionId = parseInt(newParams.sectionId)

    if (currentSectionId) {
      // We only want the currently toggled menu section to be open
      openSections.value = [currentSectionId - 1]

      await nextTick()

      scrollToSection(currentSectionId - 1)
    }
  },
  { immediate: true },
)

// Watch for topic changes to update curriculum
watch(
  () => topicStore.currentTopic,
  async () => {
    openSections.value = []
    await loadCurriculum()
    updateCompletionMap()
  },
)

// watcher to update completion status when progress changes
watch(
  () => progressStore.topicProgress,
  () => {
    updateCompletionMap()
  },
  { deep: true },
)

// Initialize sidebar state based on the current route
onMounted(async () => {
  await loadCurriculum()
  updateCompletionMap()

  const currentSectionId = parseInt(route.params.sectionId)

  if (currentSectionId) {
    openSections.value = [currentSectionId - 1]

    await nextTick()

    scrollToSection(currentSectionId - 1)
  }
})

const handleSectionClick = (sectionIndex) => {
  // Prevent closing mobile menu when clicking on expandable sections
  if (window.innerWidth < 768 && typeof sectionIndex !== 'number') {
    emit('close')
  }

  // Handle how the sidebar expands when clicking on a section (if collapsed)
  if (props.isCollapsed) {
    const menuLinkURL = sectionIndex && sectionIndex.RouterLink
    // We only want to expand the menu if the section is a lesson or challenge
    if (
      menuLinkURL !== '/minicourse-recapper' ||
      menuLinkURL !== '/interview-questions' ||
      menuLinkURL !== '/'
    ) {
      // toggles the sidebar to expand
      emit('toggle')

      // then expand to the sections 'lesson' or 'challenge' sub section item on the menu
      nextTick(() => {
        openSections.value = [sectionIndex]
        nextTick(() => {
          scrollToSection(sectionIndex)
        })
      })
    }
  } else {
    toggleSection(sectionIndex)
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

const isShortListActive = () => {
  return route.name === 'shortlist' || route.name === 'shortlist-lesson'
}

const isSectionCompleted = (sectionIndex) => {
  return sectionCompletionMap.value[sectionIndex] || false
}

const isLessonCompleted = (sectionIndex, lessonIndex) => {
  return progressStore.isLessonCompleted(sectionIndex, lessonIndex)
}

const isChallengeCompleted = (sectionIndex) => {
  return progressStore.isChallengeCompleted(sectionIndex)
}

const closeMobileMenuOnNavigation = () => {
  if (window.innerWidth < 768) {
    emit('close')
  }
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
  top: 60px;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  box-shadow: var(--shadow-sm);
  user-select: none;
}

.home-nav-link {
  flex: 3;
}

.sidebar-top-nav[data-v-53430c37] {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-sidebar);
  z-index: 10;
  transition: flex-direction 0.3s ease;
}

.sidebar-toggle {
  text-align: center;
  border-left: 1px solid var(--border-color);
  transition: border 0.3s ease;
  color: var(--text-color);
}
.sidebar-toggle .bi,
.home-button .bi,
.mobile-menu-toggle .bi {
  font-size: 1.4rem;
}

.sidebar.collapsed {
  width: 60px;
  transition: width 0.3s ease;
}

.menu-label label {
  padding: 0 10px;
  font-weight: 500;
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
}

.menu-label.collapsed label {
  font-size: 0.65rem;
  padding: 0;
}

/* Improved scrollbar for sidebar */
.sidebar-content::-webkit-scrollbar {
  width: 6px;
}

.sidebar-content::-webkit-scrollbar-track {
  background: #f8f9fa;
}

.sidebar-content::-webkit-scrollbar-thumb {
  background-color: #adb5bd;
  border-radius: 6px;
}

.sidebar-content::-webkit-scrollbar-thumb:hover {
  background-color: #6c757d;
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
  flex: 3;
}

.home-nav-link:hover,
.sidebar-toggle:hover {
  background-color: var(--hover-color);
}

.home-nav-link.active {
  color: var(--primary-color);
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 5px;
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
  padding: 5px 0;
  justify-content: center;
}

.sidebar.collapsed .section-number {
  margin-right: 0;
}

.section-title {
  flex: 1;
}

.section-bottom {
  padding: 50px;
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
  padding: 0;
  border-bottom: 1px solid var(--border-color);
}

.interview-nav-link {
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  background-color: var(--bg-card);
  transition: background-color 0.2s ease;
  color: var(--text-color);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
}

.interview-nav-link.last {
  margin-top: 10px;
}

/* Handle collapsed state for interview link */
.interview-nav-link.collapsed {
  justify-content: center;
  padding: 10px 0;
  background-color: var(--bg-card);
  box-shadow: var(--shadow-sm);
}

.interview-nav-link:hover {
  background-color: var(--hover-color);
}

.interview-nav-link.active {
  background-color: var(--sidebar-active);
}

a.router-link-active.router-link-exact-active.interview-nav-link {
  background-color: var(--sidebar-active);
}

.section-icon {
  margin-right: 10px;
  font-weight: bold;
  min-width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--section-number-gradient);
  color: var(--text-light);
  border-radius: 8px;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
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

.no-curriculum-message,
.loading-message {
  padding: 15px;
  margin: 20px 0;
  color: var(--text-muted);
  text-align: center;
  font-size: 0.9rem;
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
    width: 300px;
  }

  .sidebar-resize-handle {
    display: none;
  }
}

/*  Resize handle, draggable edge */
.sidebar-resize-handle {
  position: absolute;
  top: 0;
  right: -6px;
  width: 6px;
  height: 100%;
  cursor: col-resize;
  background-color: transparent;
  transition: background-color 0.2s ease;
  z-index: 1001;
}

.sidebar-resize-handle:hover,
.sidebar-resize-handle:active {
  background-color: var(--primary-color);
}
</style>
