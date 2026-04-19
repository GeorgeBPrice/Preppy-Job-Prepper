import { defineStore } from 'pinia'
import {
  saveToStorage,
  loadFromStorage,
  saveTopicProgress,
  // loadTopicProgress,
} from '../utils/storage'
import { useTopicStore } from './topic'
import { getCurrentCurriculum, loadCurriculum } from '../utils/curriculumLoader'
import { getCachedIdMap, resolveIdsFromIndexes } from '../utils/curriculumIds'

// Progress is keyed by stable section/lesson IDs derived from slugified
// titles (see src/utils/curriculumIds.js). Earlier versions keyed by array
// index, which silently corrupts when the curriculum is reordered. We keep
// the public API in terms of indexes (sectionIndex, lessonIndex) so every
// existing call site keeps working — translation happens inside the store.
//
// When a topic's curriculum hasn't been loaded yet (idMap not cached), we
// transparently fall back to numeric-string keys; migration runs as soon as
// the curriculum becomes available.

const LEGACY_NUMERIC = /^\d+$/

function isLegacyKey(key) {
  return LEGACY_NUMERIC.test(String(key))
}

function remapCompletionMap(map, idMap) {
  if (!map || typeof map !== 'object') return {}
  const next = {}
  for (const [secKey, lessonMap] of Object.entries(map)) {
    if (!lessonMap || typeof lessonMap !== 'object') continue
    let sectionEntry = null
    let sectionKey = secKey
    if (isLegacyKey(secKey)) {
      const idx = parseInt(secKey, 10)
      sectionEntry = idMap.sections[idx]
      if (!sectionEntry) continue
      sectionKey = sectionEntry.id
    }
    const nextLessons = next[sectionKey] || {}
    for (const [lessonKey, value] of Object.entries(lessonMap)) {
      if (!value) continue
      let lessonKeyOut = lessonKey
      if (isLegacyKey(lessonKey) && sectionEntry) {
        const lessonIdx = parseInt(lessonKey, 10)
        const lessonEntry = sectionEntry.lessons[lessonIdx]
        if (!lessonEntry) continue
        lessonKeyOut = lessonEntry.id
      }
      nextLessons[lessonKeyOut] = value
    }
    next[sectionKey] = nextLessons
  }
  return next
}

function remapSectionMap(map, idMap) {
  if (!map || typeof map !== 'object') return {}
  const next = {}
  for (const [secKey, value] of Object.entries(map)) {
    if (!value) continue
    let sectionKey = secKey
    if (isLegacyKey(secKey)) {
      const idx = parseInt(secKey, 10)
      const sectionEntry = idMap.sections[idx]
      if (!sectionEntry) continue
      sectionKey = sectionEntry.id
    }
    next[sectionKey] = value
  }
  return next
}

export const useProgressStore = defineStore('progress', {
  state: () => ({
    topicProgress: {},
    isLoaded: false,
    _forceUpdate: 0,
    _migratedTopics: {},
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
        // eslint-disable-next-line no-unused-vars
        const _ = this._forceUpdate

        let totalItems = 0
        let completedItems = 0

        const curriculum = await getCurrentCurriculum()
        if (!curriculum || curriculum.length === 0) {
          return 0
        }

        curriculum.forEach((section, sectionIndex) => {
          if (section.lessons && section.lessons.length > 0) {
            section.lessons.forEach((_, lessonIndex) => {
              totalItems++
              if (this.isLessonCompleted(sectionIndex, lessonIndex)) {
                completedItems++
              }
            })
          }

          if (section.challenge) {
            totalItems++
            if (this.isChallengeCompleted(sectionIndex)) {
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

          if (section.lessons && section.lessons.length > 0) {
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
    _sectionKey(sectionIndex) {
      const topicStore = useTopicStore()
      const { sectionId } = resolveIdsFromIndexes(topicStore.currentTopic, sectionIndex)
      return sectionId || String(sectionIndex)
    },

    _lessonKeys(sectionIndex, lessonIndex) {
      const topicStore = useTopicStore()
      const { sectionId, lessonId } = resolveIdsFromIndexes(
        topicStore.currentTopic,
        sectionIndex,
        lessonIndex,
      )
      return {
        sectionKey: sectionId || String(sectionIndex),
        lessonKey: lessonId || String(lessonIndex),
      }
    },

    /**
     * Read helper: accept both ID-keyed and legacy index-keyed storage for a
     * given (sectionIndex, lessonIndex). Returns the first hit. Handles users
     * whose localStorage still has legacy keys because migration hasn't run
     * yet (e.g. curriculum still loading).
     */
    _readLesson(map, sectionIndex, lessonIndex) {
      if (!map) return undefined
      const { sectionKey, lessonKey } = this._lessonKeys(sectionIndex, lessonIndex)
      const byId = map[sectionKey]?.[lessonKey]
      if (byId !== undefined) return byId
      // Fall back to legacy index keys if the store hasn't been migrated.
      return map[String(sectionIndex)]?.[String(lessonIndex)]
    },

    _readSection(map, sectionIndex) {
      if (!map) return undefined
      const sectionKey = this._sectionKey(sectionIndex)
      const byId = map[sectionKey]
      if (byId !== undefined) return byId
      return map[String(sectionIndex)]
    },

    async ensureIdMap(topic) {
      if (getCachedIdMap(topic)) return
      try {
        await loadCurriculum(topic)
      } catch (err) {
        console.warn(`ensureIdMap: failed to load curriculum for ${topic}`, err)
      }
    },

    /**
     * Convert any numeric-string (legacy index) keys in the given topic's
     * progress to stable content IDs. One-shot per topic — we track which
     * topics have been migrated in _migratedTopics to avoid repeated work.
     */
    migrateLegacyKeysForTopic(topic) {
      if (this._migratedTopics[topic]) return
      const idMap = getCachedIdMap(topic)
      if (!idMap) return

      const progress = this.topicProgress[topic]
      if (!progress) {
        this._migratedTopics[topic] = true
        return
      }

      progress.completedLessons = remapCompletionMap(progress.completedLessons, idMap)
      progress.lessonCode = remapCompletionMap(progress.lessonCode, idMap)
      progress.completedChallenges = remapSectionMap(progress.completedChallenges, idMap)
      progress.challengeCode = remapSectionMap(progress.challengeCode, idMap)

      // currentLesson: preserve index fields (legacy components read them) but
      // also record IDs so we can recover after a reorder.
      const current = progress.currentLesson
      if (current && typeof current.section === 'number') {
        const section = idMap.sections[current.section]
        const lesson = section?.lessons[current.lesson]
        if (section) {
          progress.currentLesson = {
            section: current.section,
            lesson: current.lesson,
            sectionId: section.id,
            lessonId: lesson ? lesson.id : null,
          }
        }
      }

      this._migratedTopics[topic] = true
      this.saveProgress()
    },

    async loadProgress() {
      const data = loadFromStorage('js_job_review_progress')
      if (data) {
        if (data.completedLessons) {
          // Legacy pre-topic-separation format: everything was under the
          // default topic's namespace.
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

      // Fire-and-forget: load the current topic's curriculum so the idMap is
      // cached, then migrate legacy keys. We don't await this because load
      // callers (App.vue onMounted) may themselves be awaiting other work;
      // the migration is self-contained.
      this.ensureIdMap(topicStore.currentTopic).then(() => {
        this.migrateLegacyKeysForTopic(topicStore.currentTopic)
      })

      this.saveProgress()
    },

    saveProgress() {
      const data = {
        topicProgress: this.topicProgress,
      }

      saveToStorage(data, 'js_job_review_progress')

      const topicStore = useTopicStore()
      saveTopicProgress(topicStore.currentTopic, this.currentTopicProgress)
    },

    completeLesson(sectionIndex, lessonIndex, updateProgress = false) {
      const progress = this.currentTopicProgress
      if (!progress.completedLessons) {
        progress.completedLessons = {}
      }

      const { sectionKey, lessonKey } = this._lessonKeys(sectionIndex, lessonIndex)

      if (!progress.completedLessons[sectionKey]) {
        progress.completedLessons[sectionKey] = {}
      }

      progress.completedLessons[sectionKey][lessonKey] = true
      this.updateCurrentLesson(sectionIndex, lessonIndex)
      this._forceUpdate++
      this.saveProgress()

      if (updateProgress) {
        this.$patch({ _forceUpdate: this._forceUpdate + 1 })
      }
    },

    uncompleteLesson(sectionIndex, lessonIndex, updateProgress = false) {
      const progress = this.currentTopicProgress
      if (!progress.completedLessons) return
      const { sectionKey, lessonKey } = this._lessonKeys(sectionIndex, lessonIndex)

      // Delete both the canonical ID key and any lingering legacy index key so
      // toggling off works even mid-migration.
      const legacySectionKey = String(sectionIndex)
      const legacyLessonKey = String(lessonIndex)

      if (progress.completedLessons[sectionKey]) {
        delete progress.completedLessons[sectionKey][lessonKey]
        if (Object.keys(progress.completedLessons[sectionKey]).length === 0) {
          delete progress.completedLessons[sectionKey]
        }
      }
      if (
        sectionKey !== legacySectionKey &&
        progress.completedLessons[legacySectionKey]
      ) {
        delete progress.completedLessons[legacySectionKey][legacyLessonKey]
        if (Object.keys(progress.completedLessons[legacySectionKey]).length === 0) {
          delete progress.completedLessons[legacySectionKey]
        }
      }

      this._forceUpdate++
      this.saveProgress()

      if (updateProgress) {
        this.$patch({ _forceUpdate: this._forceUpdate + 1 })
      }
    },

    completeSectionChallenge(sectionIndex, updateProgress = false) {
      const progress = this.currentTopicProgress
      if (!progress.completedChallenges) {
        progress.completedChallenges = {}
      }

      const sectionKey = this._sectionKey(sectionIndex)
      progress.completedChallenges[sectionKey] = true
      this._forceUpdate++

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

      if (updateProgress) {
        this.$patch({ _forceUpdate: this._forceUpdate + 1 })
      }
    },

    uncompleteSectionChallenge(sectionIndex, updateProgress = false) {
      const progress = this.currentTopicProgress
      if (!progress.completedChallenges) return
      const sectionKey = this._sectionKey(sectionIndex)
      const legacyKey = String(sectionIndex)
      delete progress.completedChallenges[sectionKey]
      if (sectionKey !== legacyKey) {
        delete progress.completedChallenges[legacyKey]
      }
      this._forceUpdate++
      this.saveProgress()

      if (updateProgress) {
        this.$patch({ _forceUpdate: this._forceUpdate + 1 })
      }
    },

    saveLessonCode(sectionIndex, lessonIndex, code) {
      const progress = this.currentTopicProgress
      if (!progress.lessonCode) {
        progress.lessonCode = {}
      }

      const { sectionKey, lessonKey } = this._lessonKeys(sectionIndex, lessonIndex)

      if (!progress.lessonCode[sectionKey]) {
        progress.lessonCode[sectionKey] = {}
      }

      progress.lessonCode[sectionKey][lessonKey] = code
      this.saveProgress()
    },

    getLessonCode(sectionIndex, lessonIndex) {
      const progress = this.currentTopicProgress
      return this._readLesson(progress.lessonCode, sectionIndex, lessonIndex) || ''
    },

    saveSectionChallengeCode(sectionIndex, code) {
      const progress = this.currentTopicProgress
      if (!progress.challengeCode) {
        progress.challengeCode = {}
      }

      const sectionKey = this._sectionKey(sectionIndex)
      progress.challengeCode[sectionKey] = code
      this.saveProgress()
    },

    getSectionChallengeCode(sectionIndex) {
      const progress = this.currentTopicProgress
      return this._readSection(progress.challengeCode, sectionIndex) || ''
    },

    isLessonCompleted(sectionIndex, lessonIndex) {
      const progress = this.currentTopicProgress
      return !!this._readLesson(progress.completedLessons, sectionIndex, lessonIndex)
    },

    isChallengeCompleted(sectionIndex) {
      const progress = this.currentTopicProgress
      return !!this._readSection(progress.completedChallenges, sectionIndex)
    },

    async isSectionCompleted(sectionIndex) {
      try {
        const curriculum = await getCurrentCurriculum()
        if (!curriculum || curriculum.length <= sectionIndex) return false

        const section = curriculum[sectionIndex]
        if (!section) return false

        if (!section.lessons || section.lessons.length === 0) return false

        // Opportunistically migrate once curriculum has been loaded.
        const topicStore = useTopicStore()
        this.migrateLegacyKeysForTopic(topicStore.currentTopic)

        for (let i = 0; i < section.lessons.length; i++) {
          if (!this.isLessonCompleted(sectionIndex, i)) {
            return false
          }
        }

        if (section.challenge && !this.isChallengeCompleted(sectionIndex)) {
          return false
        }

        return true
      } catch (error) {
        console.error('Error checking if section is completed:', error)
        return false
      }
    },

    updateCurrentLesson(sectionIndex, lessonIndex) {
      const progress = this.currentTopicProgress
      const { sectionKey, lessonKey } = this._lessonKeys(sectionIndex, lessonIndex)
      progress.currentLesson = {
        section: sectionIndex,
        lesson: lessonIndex,
        sectionId: sectionKey,
        lessonId: lessonKey,
      }
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

      delete this._migratedTopics[currentTopic]
      // Bump the invalidation counter so the async `overallProgress` getter
      // re-runs — without this the progress bar keeps its pre-reset value.
      this._forceUpdate++
      this.saveProgress()
      this.$patch({ _forceUpdate: this._forceUpdate + 1 })
    },

    resetAllProgress() {
      this.topicProgress = {}
      this._migratedTopics = {}
      this._forceUpdate++
      this.saveProgress()
      this.$patch({ _forceUpdate: this._forceUpdate + 1 })
    },
  },
})
