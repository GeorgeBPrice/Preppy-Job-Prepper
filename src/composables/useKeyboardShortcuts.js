import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAIChatStore } from '../store/aiChat'
import { useProgressStore } from '../store/progress'
import { getCurrentCurriculum } from '../utils/curriculumLoader'

const EDITABLE_SELECTOR = 'input, textarea, select, [contenteditable=""], [contenteditable="true"]'

function isTypingContext(target) {
  if (!target || target.nodeType !== 1) return false
  if (target.closest('.cm-content')) return true
  return !!target.closest(EDITABLE_SELECTOR)
}

function isMac() {
  return typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)
}

function hasPrimaryModifier(event) {
  return isMac() ? event.metaKey : event.ctrlKey
}

export const SHORTCUTS = [
  { keys: ['Ctrl/⌘', 'K'], description: 'Focus search' },
  { keys: ['Ctrl/⌘', ';'], description: 'Toggle PreppyAI chat' },
  { keys: ['j'], description: 'Next lesson' },
  { keys: ['k'], description: 'Previous lesson' },
  { keys: ['c'], description: 'Toggle current lesson completion' },
  { keys: ['?'], description: 'Show this cheatsheet' },
]

export function useKeyboardShortcuts() {
  const router = useRouter()
  const route = useRoute()
  const aiChatStore = useAIChatStore()
  const progressStore = useProgressStore()
  const cheatsheetOpen = ref(false)

  function focusSearch() {
    const el = document.querySelector('.search-input')
    if (el && typeof el.focus === 'function') {
      el.focus()
      if (typeof el.select === 'function') el.select()
    }
  }

  async function resolveCurriculum() {
    try {
      return await getCurrentCurriculum()
    } catch {
      return []
    }
  }

  function currentLessonParams() {
    const section = Number(route.params.sectionId)
    const lesson = Number(route.params.lessonId)
    if (!section || Number.isNaN(section)) return null
    return {
      sectionIndex: section - 1,
      lessonIndex: Number.isNaN(lesson) ? null : lesson - 1,
      isChallenge: route.name === 'challenge',
    }
  }

  async function gotoNeighborLesson(direction) {
    const curr = currentLessonParams()
    if (!curr) return
    const curriculum = await resolveCurriculum()
    if (!curriculum.length) return
    let { sectionIndex, lessonIndex } = curr
    if (lessonIndex == null) lessonIndex = 0
    lessonIndex += direction
    while (sectionIndex >= 0 && sectionIndex < curriculum.length) {
      const section = curriculum[sectionIndex]
      const count = section?.lessons?.length ?? 0
      if (lessonIndex >= 0 && lessonIndex < count) {
        router.push(`/section/${sectionIndex + 1}/lesson/${lessonIndex + 1}`)
        return
      }
      sectionIndex += direction
      if (direction > 0) {
        lessonIndex = 0
      } else if (sectionIndex >= 0) {
        lessonIndex = (curriculum[sectionIndex]?.lessons?.length ?? 1) - 1
      }
    }
  }

  async function toggleCurrentCompletion() {
    const curr = currentLessonParams()
    if (!curr) return
    if (curr.isChallenge) {
      if (progressStore.isChallengeCompleted(curr.sectionIndex)) {
        progressStore.uncompleteSectionChallenge(curr.sectionIndex, true)
      } else {
        progressStore.completeSectionChallenge(curr.sectionIndex, true)
      }
      return
    }
    if (curr.lessonIndex == null) return
    if (progressStore.isLessonCompleted(curr.sectionIndex, curr.lessonIndex)) {
      progressStore.uncompleteLesson(curr.sectionIndex, curr.lessonIndex, true)
    } else {
      progressStore.completeLesson(curr.sectionIndex, curr.lessonIndex, true)
    }
  }

  function onKeydown(event) {
    if (event.defaultPrevented) return

    if (hasPrimaryModifier(event) && event.key.toLowerCase() === 'k') {
      event.preventDefault()
      focusSearch()
      return
    }
    if (hasPrimaryModifier(event) && event.key === ';') {
      event.preventDefault()
      aiChatStore.toggleChat()
      return
    }

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      if (event.key !== '?') return
    }
    if (isTypingContext(event.target)) return

    switch (event.key) {
      case 'j':
        event.preventDefault()
        gotoNeighborLesson(1)
        break
      case 'k':
        event.preventDefault()
        gotoNeighborLesson(-1)
        break
      case 'c':
        event.preventDefault()
        toggleCurrentCompletion()
        break
      case '?':
        event.preventDefault()
        cheatsheetOpen.value = !cheatsheetOpen.value
        break
      default:
        break
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', onKeydown)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown)
  })

  return { cheatsheetOpen }
}
