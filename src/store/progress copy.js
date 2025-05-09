import { defineStore } from 'pinia'
import { saveToStorage, loadFromStorage, saveTopicProgress } from '../utils/storage'
import { useTopicStore } from './topic'
import { getCurrentCurriculum } from '../utils/curriculumLoader'

export const useProgressStore = defineStore('progress', {
  state: () => ({
    topicProgress: {},
    isLoaded: false,
    _forceUpdate: 0,
  }),

  getters: {
    currentTopicProgress(state) {
      const topicStore = useTopicStore()
      const topicKey = topicStore.currentTopic

      if (!state.topicProgress[topicKey]) {
        state.topicProgress[topicKey] = {
          completedLessons: {},
          completedChallenges: {},
          lessonCode: {},
          challengeCode: {},
          currentLesson: { section: 0, lesson: 0 },
        }
      }

      return state.topicProgress[topicKey]
    },

    completedLessons() {
      return this.currentTopicProgress.completedLessons || {}
    },

    completedChallenges() {
      return this.currentTopicProgress.completedChallenges || {}
    },

    lessonCode() {
      return this.currentTopicProgress.lessonCode || {}
    },

    challengeCode() {
      return this.currentTopicProgress.challengeCode || {}
    },

    currentLesson() {
      return this.currentTopicProgress.currentLesson || { section: 0, lesson: 0 }
    },

    async overallProgress() {
      try {
        let totalItems = 0
        let completedItems = 0

        const curriculum = await getCurrentCurriculum()
        if (!curriculum || curriculum.length === 0) {
          return 0
        }

        curriculum.forEach((section, sectionIndex) => {
          if (Array.isArray(section.lessons) && section.lessons.length > 0) {
            section.lessons.forEach((_, lessonIndex) => {
              totalItems++
              if (this.completedLessons[sectionIndex]?.[lessonIndex]) {
                completedItems++
              }
            })
          }

          if (section.challenge) {
            totalItems++
            if (this.completedChallenges[sectionIndex]) {
              completedItems++
            }
          }
        })

        return totalItems > 0 ? completedItems / totalItems : 0
      } catch (error) {
        console.error('Error calculating progress:', error)
        return 0
      }
    },

    hasAnyProgress() {
      const progress = this.currentTopicProgress
      return (
        (progress.currentLesson && progress.currentLesson.section > 0) ||
        Object.keys(progress.completedLessons || {}).length > 0 ||
        Object.keys(progress.completedChallenges || {}).length > 0
      )
    },

    async nextUncompletedItem() {
      try {
        const curriculum = await getCurrentCurriculum()
        if (!curriculum || curriculum.length === 0) {
          return null
        }

        for (let sectionIndex = 0; sectionIndex < curriculum.length; sectionIndex++) {
          const section = curriculum[sectionIndex]
          if (Array.isArray(section.lessons) && section.lessons.length > 0) {
            for (let lessonIndex = 0; lessonIndex < section.lessons.length; lessonIndex++) {
              if (!this.isLessonCompleted(sectionIndex, lessonIndex)) {
                return { type: 'lesson', section: sectionIndex, lesson: lessonIndex }
              }
            }
          }

          if (section.challenge && !this.isChallengeCompleted(sectionIndex)) {
            return { type: 'challenge', section: sectionIndex }
          }
        }
        return null
      } catch (error) {
        console.error('Error finding next uncompleted item:', error)
        return null
      }
    },
  },

  actions: {
    loadProgress() {
      const data = loadFromStorage('js_job_review_progress')
      if (data) {
        if (data.completedLessons) {
          const topicStore = useTopicStore()
          const defaultTopic = topicStore.currentTopic
          this.topicProgress = {
            [defaultTopic]: {
              completedLessons: data.completedLessons || {},
              completedChallenges: data.completedChallenges || {},
              lessonCode: data.lessonCode || {},
              challengeCode: data.challengeCode || {},
              currentLesson: data.currentLesson || { section: 0, lesson: 0 },
            },
          }
        } else if (data.topicProgress) {
          this.topicProgress = data.topicProgress
        }
      }

      const topicStore = useTopicStore()
      if (!this.topicProgress[topicStore.currentTopic]) {
        this.topicProgress[topicStore.currentTopic] = {
          completedLessons: {},
          completedChallenges: {},
          lessonCode: {},
          challengeCode: {},
          currentLesson: { section: 0, lesson: 0 },
        }
      }

      this.isLoaded = true
      this.saveProgress()
    },

    saveProgress() {
      const data = {
        topicProgress: this.topicProgress,
      }

      saveToStorage(data, 'js_job_review_progress')
      const topicStore = useTopicStore()
      saveTopicProgress(topicStore.currentTopic, this.currentTopicProgress)
      this._forceUpdate++ // Trigger UI update
    },

    completeLesson(sectionIndex, lessonIndex) {
      const progress = this.currentTopicProgress
      if (!progress.completedLessons) progress.completedLessons = {}
      if (!progress.completedLessons[sectionIndex]) progress.completedLessons[sectionIndex] = {}
      progress.completedLessons[sectionIndex][lessonIndex] = true
      this.updateCurrentLesson(sectionIndex, lessonIndex)
      this.saveProgress()
    },

    uncompleteLesson(sectionIndex, lessonIndex) {
      const progress = this.currentTopicProgress
      if (progress.completedLessons && progress.completedLessons[sectionIndex]) {
        delete progress.completedLessons[sectionIndex][lessonIndex]
        if (Object.keys(progress.completedLessons[sectionIndex]).length === 0) {
          delete progress.completedLessons[sectionIndex]
        }
      }
      this.saveProgress()
    },

    completeSectionChallenge(sectionIndex) {
      const progress = this.currentTopicProgress
      if (!progress.completedChallenges) progress.completedChallenges = {}
      progress.completedChallenges[sectionIndex] = true

      const updateNextSection = async () => {
        try {
          const curriculum = await getCurrentCurriculum()
          if (curriculum && sectionIndex < curriculum.length - 1) {
            this.updateCurrentLesson(sectionIndex + 1, 0)
          }
        } catch (error) {
          console.error('Error updating next section:', error)
        }
      }

      updateNextSection()
      this.saveProgress()
    },

    uncompleteSectionChallenge(sectionIndex) {
      const progress = this.currentTopicProgress
      if (progress.completedChallenges) delete progress.completedChallenges[sectionIndex]
      this.saveProgress()
    },

    saveLessonCode(sectionIndex, lessonIndex, code) {
      const progress = this.currentTopicProgress
      if (!progress.lessonCode) progress.lessonCode = {}
      if (!progress.lessonCode[sectionIndex]) progress.lessonCode[sectionIndex] = {}
      progress.lessonCode[sectionIndex][lessonIndex] = code
      this.saveProgress()
    },

    getLessonCode(sectionIndex, lessonIndex) {
      const progress = this.currentTopicProgress
      return progress.lessonCode?.[sectionIndex]?.[lessonIndex] || ''
    },

    saveSectionChallengeCode(sectionIndex, code) {
      const progress = this.currentTopicProgress
      if (!progress.challengeCode) progress.challengeCode = {}
      progress.challengeCode[sectionIndex] = code
      this.saveProgress()
    },

    getSectionChallengeCode(sectionIndex) {
      const progress = this.currentTopicProgress
      return progress.challengeCode?.[sectionIndex] || ''
    },

    isLessonCompleted(sectionIndex, lessonIndex) {
      const progress = this.currentTopicProgress
      return !!progress.completedLessons?.[sectionIndex]?.[lessonIndex]
    },

    isChallengeCompleted(sectionIndex) {
      const progress = this.currentTopicProgress
      return !!progress.completedChallenges?.[sectionIndex]
    },

    async isSectionCompleted(sectionIndex) {
      try {
        const curriculum = await getCurrentCurriculum()
        if (!curriculum || curriculum.length <= sectionIndex) return false
        const section = curriculum[sectionIndex]
        if (!section) return false
        if (!section.lessons || section.lessons.length === 0) return false

        for (let i = 0; i < section.lessons.length; i++) {
          if (!this.isLessonCompleted(sectionIndex, i)) return false
        }

        if (section.challenge && !this.isChallengeCompleted(sectionIndex)) return false
        return true
      } catch (error) {
        console.error('Error checking if section is completed:', error)
        return false
      }
    },

    updateCurrentLesson(sectionIndex, lessonIndex) {
      const progress = this.currentTopicProgress
      progress.currentLesson = { section: sectionIndex, lesson: lessonIndex }
    },

    resetProgress() {
      const topicStore = useTopicStore()
      const currentTopic = topicStore.currentTopic
      this.topicProgress[currentTopic] = {
        completedLessons: {},
        completedChallenges: {},
        lessonCode: {},
        challengeCode: {},
        currentLesson: { section: 0, lesson: 0 },
      }
      this.saveProgress()
    },

    resetAllProgress() {
      this.topicProgress = {}
      this.saveProgress()
    },
  },
})
