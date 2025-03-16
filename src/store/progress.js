import { defineStore } from 'pinia'
import { saveToStorage, loadFromStorage } from '../utils/storage'
import { curriculum } from '../data/curriculum'

export const useProgressStore = defineStore('progress', {
  state: () => ({
    completedLessons: {}, // Format: {sectionIndex: {lessonIndex: true}}
    completedChallenges: {}, // Format: {sectionIndex: true}
    lessonCode: {}, // Format: {sectionIndex: {lessonIndex: 'code'}}
    challengeCode: {}, // Format: {sectionIndex: 'code'}
    currentLesson: {
      section: 0,
      lesson: 0,
    },
    isLoaded: false,
  }),

  getters: {
    overallProgress: (state) => {
      let totalItems = 0
      let completedItems = 0

      curriculum.forEach((section, sectionIndex) => {
        // Count lessons
        section.lessons.forEach((_, lessonIndex) => {
          totalItems++
          if (state.completedLessons[sectionIndex]?.[lessonIndex]) {
            completedItems++
          }
        })

        // Count challenge
        totalItems++
        if (state.completedChallenges[sectionIndex]) {
          completedItems++
        }
      })

      return totalItems > 0 ? completedItems / totalItems : 0
    },

    hasAnyProgress: (state) => {
      // Check if the user has made any progress in the app
      return (
        state.currentLesson.section > 0 ||
        Object.keys(state.completedLessons).length > 0 ||
        Object.keys(state.completedChallenges).length > 0
      )
    },
  },

  actions: {
    loadProgress() {
      const data = loadFromStorage()
      if (data) {
        this.completedLessons = data.completedLessons || {}
        this.completedChallenges = data.completedChallenges || {}
        this.lessonCode = data.lessonCode || {}
        this.challengeCode = data.challengeCode || {}
        this.currentLesson = data.currentLesson || { section: 0, lesson: 0 }
      }

      // If there's no current lesson set but the user has completed lessons,
      // set the current lesson to the first completed one
      if (this.currentLesson.section === 0 && Object.keys(this.completedLessons).length > 0) {
        const firstSectionIndex = parseInt(Object.keys(this.completedLessons)[0])
        const firstLessonIndex = parseInt(Object.keys(this.completedLessons[firstSectionIndex])[0])

        this.currentLesson = {
          section: firstSectionIndex,
          lesson: firstLessonIndex,
        }
      }

      this.isLoaded = true
    },

    saveProgress() {
      const data = {
        completedLessons: this.completedLessons,
        completedChallenges: this.completedChallenges,
        lessonCode: this.lessonCode,
        challengeCode: this.challengeCode,
        currentLesson: this.currentLesson,
      }

      saveToStorage(data)
    },

    completeLesson(sectionIndex, lessonIndex) {
      if (!this.completedLessons[sectionIndex]) {
        this.completedLessons[sectionIndex] = {}
      }

      this.completedLessons[sectionIndex][lessonIndex] = true

      // Update current lesson
      this.updateCurrentLesson(sectionIndex, lessonIndex)

      this.saveProgress()
    },

    uncompleteLesson(sectionIndex, lessonIndex) {
      if (this.completedLessons[sectionIndex]) {
        delete this.completedLessons[sectionIndex][lessonIndex]
      }

      this.saveProgress()
    },

    completeSectionChallenge(sectionIndex) {
      this.completedChallenges[sectionIndex] = true

      // Move to next section
      if (sectionIndex < curriculum.length - 1) {
        this.updateCurrentLesson(sectionIndex + 1, 0)
      }

      this.saveProgress()
    },

    uncompleteSectionChallenge(sectionIndex) {
      delete this.completedChallenges[sectionIndex]
      this.saveProgress()
    },

    saveLessonCode(sectionIndex, lessonIndex, code) {
      if (!this.lessonCode[sectionIndex]) {
        this.lessonCode[sectionIndex] = {}
      }

      this.lessonCode[sectionIndex][lessonIndex] = code
      this.saveProgress()
    },

    getLessonCode(sectionIndex, lessonIndex) {
      return this.lessonCode[sectionIndex]?.[lessonIndex] || ''
    },

    saveSectionChallengeCode(sectionIndex, code) {
      this.challengeCode[sectionIndex] = code
      this.saveProgress()
    },

    getSectionChallengeCode(sectionIndex) {
      return this.challengeCode[sectionIndex] || ''
    },

    isLessonCompleted(sectionIndex, lessonIndex) {
      return !!this.completedLessons[sectionIndex]?.[lessonIndex]
    },

    isChallengeCompleted(sectionIndex) {
      return !!this.completedChallenges[sectionIndex]
    },

    isSectionCompleted(sectionIndex) {
      const section = curriculum[sectionIndex]
      if (!section) return false

      // Check if all lessons are completed
      for (let i = 0; i < section.lessons.length; i++) {
        if (!this.isLessonCompleted(sectionIndex, i)) {
          return false
        }
      }

      // Check if the challenge is completed
      if (!this.isChallengeCompleted(sectionIndex)) {
        return false
      }

      return true
    },

    updateCurrentLesson(sectionIndex, lessonIndex) {
      this.currentLesson = {
        section: sectionIndex,
        lesson: lessonIndex,
      }
    },

    resetProgress() {
      this.completedLessons = {}
      this.completedChallenges = {}
      this.lessonCode = {}
      this.challengeCode = {}
      this.currentLesson = { section: 0, lesson: 0 }
      this.saveProgress()
    },
  },
})
