<template>
  <div class="theme-toggle" :title="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
    <button @click="toggleTheme" class="btn btn-icon" aria-label="Toggle Dark Mode">
      <transition name="theme-icon" mode="out-in">
        <i v-if="isDarkMode" class="bi bi-sun-fill"></i>
        <i v-else class="bi bi-moon-fill"></i>
      </transition>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '../theme/theme'

const themeStore = useThemeStore()

const isDarkMode = computed(() => themeStore.isDarkMode)

const toggleTheme = () => {
  themeStore.toggleTheme()
}
</script>

<style scoped>
.theme-toggle {
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 50%;
}

.btn-icon {
  background: transparent;
  border: none;
  cursor: pointer;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.6s ease;
  color: var(--lida-icon-color);
}

.dark-mode .btn-icon {
  color: var(--lida-icon-color);
}

.btn-icon:hover {
  transform: translateY(-2px);
}

.dark-mode .btn-icon:hover {
  background-color: var(--lida-hover-color);
}

.btn-icon:hover {
  background-color: var(--lida-hover-color);
}

.btn-icon i {
  font-size: 1.25rem;
}

/* Icon transition */
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition:
    transform 0.3s,
    opacity 0.3s;
}

.theme-icon-enter-from,
.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(30deg) scale(0.7);
}

.theme-icon-enter-to,
.theme-icon-leave-from {
  opacity: 1;
  transform: rotate(0) scale(1);
}
</style>
