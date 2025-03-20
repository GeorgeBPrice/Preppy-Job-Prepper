<template>
  <div
    class="app-container"
    :class="{
      'sidebar-mobile-open': isMobileMenuOpen,
      'dark-mode': isDarkMode,
    }"
  >
    <AppHeader @toggle-mobile-menu="handleMobileMenuToggle" />
    <div
      class="main-content"
      :class="{
        'sidebar-collapsed': isSidebarCollapsed && !isMobileMenuOpen,
        'dark-mode': isDarkMode,
      }"
    >
      <AppSidebar :is-collapsed="isSidebarCollapsed && !isMobileMenuOpen" @toggle="toggleSidebar" />
      <main class="content-area" :class="{ 'dark-mode': isDarkMode }">
        <router-view></router-view>
        <BackToTop />
      </main>
    </div>
  </div>
  <!-- Modal HTML for Congratulations Popup -->
  <CourseCompletedModal />
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import BackToTop from './components/BackToTop.vue'
import { onMounted, onBeforeMount, ref, watch, computed } from 'vue'
import { useProgressStore } from './store/progress'
import { useThemeStore } from './theme/theme'
import CourseCompletedModal from '@/components/CourseCompletedModal.vue'
import useCongratulationsModal from './scripts/useCongratulationsModal'

const progressStore = useProgressStore()
const themeStore = useThemeStore()
const isSidebarCollapsed = ref(false)
const isMobileMenuOpen = ref(false)

// Create a computed property for dark mode
const isDarkMode = computed(() => themeStore.isDarkMode)

// Initialize theme
onBeforeMount(() => {
  if (!themeStore.isLoaded) {
    themeStore.loadThemePreference()
  }
})

// Watch theme changes to update body class and document attributes
watch(
  () => themeStore.isDarkMode,
  (isDark) => {
    if (isDark) {
      document.body.classList.add('dark-mode')
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.body.classList.remove('dark-mode')
      document.documentElement.setAttribute('data-theme', 'light')
    }
  },
  { immediate: true },
)

// Handle mobile menu toggle from header
const handleMobileMenuToggle = (isOpen) => {
  isMobileMenuOpen.value = isOpen

  // When mobile menu is opened, make sure sidebar is expanded
  if (isMobileMenuOpen.value && window.innerWidth < 768) {
    isSidebarCollapsed.value = false
  }
}

// Toggle sidebar collapsed state
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value

  // If on mobile, closing sidebar should also close mobile menu
  if (isSidebarCollapsed.value && window.innerWidth < 768) {
    isMobileMenuOpen.value = false
  }
}

// Watch progress and trigger completion logic
watch(
  () => Math.round(progressStore.overallProgress * 100),
  (percentage) => {
    if (percentage <= 99) {
      localStorage.removeItem('congratulated')
    }
    if (percentage === 100 && !localStorage.getItem('congratulated')) {
      // call script to fire off congrats modal
      useCongratulationsModal()
    }
  },
)

onMounted(() => {
  progressStore.loadProgress()

  // Initial theme application
  if (themeStore.isDarkMode) {
    document.body.classList.add('dark-mode')
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.body.classList.remove('dark-mode')
    document.documentElement.setAttribute('data-theme', 'light')
  }

  // Check initial screen size
  if (window.innerWidth < 768) {
    isSidebarCollapsed.value = true
  }
})
</script>

<style>
/* Base styles */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--bg-color);
}

.app-container.dark-mode {
  background-color: #111827;
}

.main-content {
  display: flex;
  flex: 1;
  padding-top: 60px;
  position: relative;
  background-color: var(--bg-color);
}

.main-content.dark-mode {
  background-color: #111827;
}

.content-area {
  flex: 1;
  padding: 20px;
  margin-left: 300px;
  transition: margin-left 0.3s ease;
  width: calc(100% - 300px);
  border-radius: 0.5rem;
  background-color: var(--bg-content);
}

/* CSS fix for content. */
.sidebar-collapsed .content-area {
  margin-left: 60px;
  width: calc(100% - 60px);
}

@media (max-width: 767px) {
  .content-area {
    margin-left: 0;
    width: 100%;
    transition:
      margin-left 0.3s ease,
      width 0.3s ease;
  }

  .sidebar-mobile-open::after {
    content: '';
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 900;
    transition: opacity 0.3s;
  }
  /* congratulations */
  button.close {
    border: none;
    background: none;
    font-size: 2em;
  }
}
</style>
