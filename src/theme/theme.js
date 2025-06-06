import { defineStore } from 'pinia'

// Theme store to manage light/dark mode
export const useThemeStore = defineStore('theme', {
  state: () => ({
    darkMode: true,
    // Store the preference in localStorage if available
    isLoaded: false,
  }),

  getters: {
    isDarkMode: (state) => state.darkMode,
  },

  actions: {
    toggleTheme() {
      this.darkMode = !this.darkMode
      this.applyTheme()
      this.saveThemePreference()
    },

    setDarkMode(value) {
      this.darkMode = value
      this.applyTheme()
      this.saveThemePreference()
    },

    // Apply the theme to the document
    applyTheme() {
      if (this.darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark')
        document.body.classList.add('dark-mode')
      } else {
        document.documentElement.setAttribute('data-theme', 'light')
        document.body.classList.remove('dark-mode')
      }
    },

    // Save the theme preference to localStorage
    saveThemePreference() {
      try {
        localStorage.setItem('theme-dark-mode', this.darkMode ? 'true' : 'false')
      } catch (error) {
        console.error('Could not save theme preference:', error)
      }
    },

    // Load the theme preference from localStorage
    loadThemePreference() {
      try {
        const savedTheme = localStorage.getItem('theme-dark-mode')
        if (savedTheme !== null) {
          this.darkMode = savedTheme === 'true'
        } else {
          // Always default to dark mode regardless of system preference
          this.darkMode = true
        }
        this.applyTheme()
        this.isLoaded = true
      } catch (error) {
        console.error('Could not load theme preference:', error)
        // Default to dark mode in case of error
        this.darkMode = true
        this.applyTheme()
        this.isLoaded = true
      }
    },
  },
})
