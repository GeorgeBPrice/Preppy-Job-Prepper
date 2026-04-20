<template>
  <div class="search-container" :class="{ active: isSearchActive }">
    <div class="search-input-wrapper">
      <div class="search-input-inner">
        <i class="bi bi-search search-icon"></i>
        <input
          ref="searchInput"
          v-model="searchQuery"
          type="search"
          enterkeyhint="search"
          inputmode="search"
          autocapitalize="off"
          autocorrect="off"
          spellcheck="false"
          class="search-input"
          placeholder="Search curriculum..."
          @focus="isSearchActive = true"
          @blur="handleBlur"
          @keydown.esc="clearSearch"
          @keydown.down.prevent="onArrowDown"
          @keydown.up.prevent="onArrowUp"
          @keydown.enter.prevent="onEnter"
        />
        <i
          v-if="searchQuery"
          class="bi bi-x-circle clear-icon"
          @click="clearSearch"
          @mousedown.prevent
        ></i>
      </div>
      <button
        v-if="searchQuery"
        type="button"
        class="search-find-btn"
        @mousedown.prevent
        @click="commitSearch"
        aria-label="Hide keyboard and show results"
      >
        <span>Search</span>
      </button>
    </div>

    <div v-if="isSearchActive && searchResults.length > 0" class="search-results">
      <div
        v-for="(result, index) in searchResults"
        :key="index"
        class="search-result-item"
        :class="{ active: selectedIndex === index }"
        @mousedown.prevent
        @click="navigateToResult(result)"
        @mouseover="selectedIndex = index"
      >
        <div class="result-type">
          <span v-if="result.type === 'lesson'" class="badge-lesson">Lesson</span>
          <span v-else-if="result.type === 'section'" class="badge-section">Section</span>
          <span v-else-if="result.type === 'interview'" class="badge-interview">Interview</span>
          <span v-else-if="result.type === 'shortlist'" class="badge-shortlist">Shortlist</span>
        </div>
        <div class="result-content">
          <div class="result-title" v-html="highlightMatch(result.title, searchQuery)"></div>
          <div
            v-if="result.context"
            class="result-context"
            v-html="highlightMatch(result.context, searchQuery)"
          ></div>
          <div v-if="result.topic" class="result-topic">{{ result.topic }}</div>
        </div>
      </div>
    </div>

    <div
      v-else-if="isSearchActive && searchQuery && searchResults.length === 0"
      class="search-no-results"
    >
      <div v-if="loading">Searching...</div>
      <div v-else>No results found for "{{ searchQuery }}"</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useTopicStore } from '../store/topic'
import { loadCurriculum } from '../utils/curriculumLoader'

// Component state
const searchQuery = ref('')
const isSearchActive = ref(false)
const selectedIndex = ref(0)
const searchInput = ref(null)
const router = useRouter()
const topicStore = useTopicStore()
const allTopicsCurricula = ref({})
const loading = ref(false)
const emit = defineEmits(['search-closed', 'search-opened'])

// Load curricula for all available topics
const loadAllCurricula = async () => {
  loading.value = true
  try {
    const topics = topicStore.topicsWithCurriculum

    for (const topic of topics) {
      if (!allTopicsCurricula.value[topic]) {
        try {
          const curriculumData = await loadCurriculum(topic)
          allTopicsCurricula.value[topic] = {
            curriculum: curriculumData.curriculum || [],
            shortlist: curriculumData.shortlistCurriculum || [],
          }

          // Load interview questions
          try {
            const questionsModule = await import(`../data/topic/${topic}/interviewQuestions.js`)
            allTopicsCurricula.value[topic].interviewQuestions = questionsModule.default || []
          } catch (error) {
            console.error(`Failed to load interview questions for ${topic}:`, error)
            allTopicsCurricula.value[topic].interviewQuestions = []
          }
        } catch (error) {
          console.error(`Error loading curriculum for ${topic}:`, error)
          allTopicsCurricula.value[topic] = {
            curriculum: [],
            shortlist: [],
            interviewQuestions: [],
          }
        }
      }
    }
  } catch (error) {
    console.error('Error loading curricula:', error)
  } finally {
    loading.value = false
  }
}

function matches(text, query) {
  return typeof text === 'string' && text.toLowerCase().includes(query)
}

// Search logic
const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return []

  const query = searchQuery.value.trim().toLowerCase()
  const results = []
  const topics = Object.keys(allTopicsCurricula.value)

  for (const topic of topics) {
    const topicData = allTopicsCurricula.value[topic]
    const topicLabel = topicStore.availableTopics.find((t) => t.value === topic)?.label || topic

    // Interview questions entry point
    if (topicData.interviewQuestions && topicData.interviewQuestions.length > 0) {
      if (`${topicLabel} interview questions`.toLowerCase().includes(query)) {
        results.push({
          type: 'interview',
          title: `${topicLabel} Interview Questions`,
          path: { name: 'interview-questions' },
          context: `Review common ${topicLabel} interview questions`,
          topic: topicLabel,
          topicValue: topic,
        })
      }
    }

    // Full curriculum: sections → lessons → subsections
    if (Array.isArray(topicData.curriculum)) {
      topicData.curriculum.forEach((section, sectionIndex) => {
        if (!section) return
        if (matches(section.title, query)) {
          results.push({
            type: 'section',
            title: section.title,
            path: {
              name: 'lesson',
              params: { sectionId: sectionIndex + 1, lessonId: 1 },
            },
            context: section.description,
            topic: topicLabel,
            topicValue: topic,
          })
        }

        if (Array.isArray(section.lessons)) {
          section.lessons.forEach((lesson, lessonIndex) => {
            if (!lesson) return
            const lessonPath = {
              name: 'lesson',
              params: { sectionId: sectionIndex + 1, lessonId: lessonIndex + 1 },
            }
            if (matches(lesson.title, query)) {
              results.push({
                type: 'lesson',
                title: `${section.title}: ${lesson.title}`,
                path: lessonPath,
                context: lesson.description,
                topic: topicLabel,
                topicValue: topic,
              })
            }
            if (Array.isArray(lesson.sections)) {
              lesson.sections.forEach((subSection) => {
                if (!subSection) return
                if (matches(subSection.title, query)) {
                  results.push({
                    type: 'lesson',
                    title: `${section.title}: ${lesson.title}`,
                    subTitle: subSection.title,
                    path: lessonPath,
                    context: subSection.title,
                    topic: topicLabel,
                    topicValue: topic,
                  })
                }
                if (matches(subSection.explanation, query)) {
                  results.push({
                    type: 'lesson',
                    title: `${section.title}: ${lesson.title}`,
                    path: lessonPath,
                    context: extractContext(subSection.explanation, query),
                    topic: topicLabel,
                    topicValue: topic,
                  })
                }
              })
            }
          })
        }
      })
    }

    // Shortlist (minicourse recapper): single section with lessons + subsections
    if (Array.isArray(topicData.shortlist)) {
      topicData.shortlist.forEach((section) => {
        if (!section) return
        if (matches(section.title, query)) {
          results.push({
            type: 'shortlist',
            title: section.title,
            path: { name: 'shortlist' },
            context: section.description,
            topic: topicLabel,
            topicValue: topic,
          })
        }

        if (Array.isArray(section.lessons)) {
          section.lessons.forEach((lesson, lessonIndex) => {
            if (!lesson) return
            const lessonPath = {
              name: 'shortlist-lesson',
              params: { lessonId: lessonIndex + 1 },
            }
            if (matches(lesson.title, query)) {
              results.push({
                type: 'shortlist',
                title: `${section.title}: ${lesson.title}`,
                path: lessonPath,
                context: lesson.description,
                topic: topicLabel,
                topicValue: topic,
              })
            }
            if (Array.isArray(lesson.sections)) {
              lesson.sections.forEach((subSection) => {
                if (!subSection) return
                if (matches(subSection.title, query)) {
                  results.push({
                    type: 'shortlist',
                    title: `${section.title}: ${lesson.title}`,
                    subTitle: subSection.title,
                    path: lessonPath,
                    context: subSection.title,
                    topic: topicLabel,
                    topicValue: topic,
                  })
                }
                if (matches(subSection.explanation, query)) {
                  results.push({
                    type: 'shortlist',
                    title: `${section.title}: ${lesson.title}`,
                    path: lessonPath,
                    context: extractContext(subSection.explanation, query),
                    topic: topicLabel,
                    topicValue: topic,
                  })
                }
              })
            }
          })
        }
      })
    }
  }

  return results.slice(0, 20)
})

// Reset selected index when search results change
watch(searchResults, () => {
  selectedIndex.value = 0
})

// Reset selected index when search query changes
watch(searchQuery, () => {
  selectedIndex.value = 0
  hasArrowNavigated.value = false
})

// Extract context around the match
function extractContext(text, query) {
  // Remove HTML tags for context extraction
  const plainText = text.replace(/<[^>]*>/g, '')

  const index = plainText.toLowerCase().indexOf(query.toLowerCase())
  if (index === -1) return ''

  const start = Math.max(0, index - 40)
  const end = Math.min(plainText.length, index + query.length + 40)
  let context = plainText.substring(start, end)

  if (start > 0) context = '...' + context
  if (end < plainText.length) context = context + '...'

  return context
}

// Highlight the matching part of text
function highlightMatch(text, query) {
  if (!query.trim()) return text

  const regex = new RegExp(`(${query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

// Clear search and reset state
function clearSearch() {
  searchQuery.value = ''
  isSearchActive.value = false
  selectedIndex.value = 0
}

// Tracks whether the user has moved selection with the arrow keys.
// Reset on each query change — we only treat Enter as "open the highlighted
// result" after an explicit up/down navigation, otherwise Enter on mobile
// should dismiss the keyboard without navigating away.
const hasArrowNavigated = ref(false)

// Handle input blur with improved focus check
function handleBlur(event) {
  setTimeout(() => {
    const searchContainer = event.target.closest('.search-container')
    const activeElement = document.activeElement

    // Mobile flow: tapping Done/Go blurs the input so the on-screen keyboard
    // hides. Keep the results panel open as long as a query is entered so
    // the user can scroll and tap a result. The panel only closes via the
    // clear (X) / Esc, or when the user taps outside the container.
    if (searchQuery.value.trim()) return

    if (!searchContainer.contains(activeElement)) {
      isSearchActive.value = false
    }
  }, 200)
}

// Arrow-key navigation of the results list (desktop power-user flow).
function onArrowDown() {
  if (searchResults.value.length === 0) return
  hasArrowNavigated.value = true
  const next = selectedIndex.value + 1
  if (next < searchResults.value.length) selectedIndex.value = next
}

function onArrowUp() {
  if (searchResults.value.length === 0) return
  hasArrowNavigated.value = true
  const next = selectedIndex.value - 1
  if (next >= 0) selectedIndex.value = next
}

// Enter / mobile "Go" behaviour:
// - If the user has explicitly highlighted a result via arrow keys, open it
//   (desktop keyboard flow stays intact).
// - Otherwise treat it as "commit" — blur the input so the mobile keyboard
//   hides and the live results list is fully visible. No auto-navigation.
function onEnter() {
  if (hasArrowNavigated.value && searchResults.value.length > 0) {
    navigateToResult(searchResults.value[selectedIndex.value])
  } else {
    commitSearch()
  }
}

// Mobile-friendly commit: dismiss the on-screen keyboard but keep results
// open so the user can tap a specific result.
function commitSearch() {
  if (searchInput.value) searchInput.value.blur()
}

// Navigate to the selected result
function navigateToResult(result) {
  // Clear search before navigation to ensure clean state
  clearSearch()
  // Notify the parent (mobile overlay needs to close so the user sees the
  // destination page instead of the still-open search UI).
  emit('search-closed')
  // Results span every topic, so switch the store's current topic when the
  // hit belongs to a different one — otherwise the route resolves against
  // the wrong curriculum and shows "lesson not found".
  if (result.topicValue && result.topicValue !== topicStore.currentTopic) {
    topicStore.setTopic(result.topicValue)
  }
  // Use nextTick to ensure DOM updates before navigation
  nextTick(() => {
    router.push(result.path)
  })
}

// Focus search on keyboard shortcut (Ctrl/Cmd + K)
function handleKeyDown(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    searchInput.value.focus()
  }
}

// Ensure search can be used multiple times
function resetSearch() {
  searchQuery.value = ''
  isSearchActive.value = false
  selectedIndex.value = 0

  // Force focus away from the search input to fully reset state
  if (document.activeElement === searchInput.value) {
    searchInput.value.blur()
  }
}

// Add global event listener for keyboard shortcut
onMounted(async () => {
  document.addEventListener('keydown', handleKeyDown)
  await loadAllCurricula()

  // Listen for route changes to reset search
  router.afterEach(() => {
    resetSearch()
  })
})

// Clean up
onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.search-container {
  position: relative;
  width: 100%;
  max-width: 300px;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
}

.search-input-inner {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.search-input {
  width: 100%;
  height: 36px;
  padding: 0 36px;
  border-radius: 18px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-content);
  color: var(--text-color);
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.search-input::-webkit-search-cancel-button,
.search-input::-webkit-search-decoration {
  -webkit-appearance: none;
  appearance: none;
}

.search-find-btn {
  display: none;
  align-items: center;
  gap: 4px;
  margin-left: 8px;
  padding: 0 14px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid var(--primary-color-dark, var(--primary-color));
  background-color: var(--primary-color-dark, var(--primary-color));
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background-color 0.15s ease,
    opacity 0.15s ease;
}

.search-find-btn:hover:not(:disabled) {
  background-color: var(--primary-color-dark, var(--primary-color));
  border-color: var(--primary-color-dark, var(--primary-color));
}

.search-find-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.search-find-btn i {
  font-size: 0.95rem;
}

.search-hint {
  margin-top: 10px;
  padding: 8px 12px;
  font-size: 0.85rem;
  color: var(--text-muted);
  background-color: rgba(var(--primary-color-rgb, 79, 70, 229), 0.08);
  border: 1px dashed rgba(var(--primary-color-rgb, 79, 70, 229), 0.3);
  border-radius: 6px;
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 6px;
}

.search-hint strong {
  color: var(--text-color);
}

.search-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--primary-color);
  border-color: var(--primary-color);
}

.search-icon {
  position: absolute;
  left: 12px;
  color: var(--text-muted);
}

.clear-icon {
  position: absolute;
  right: 12px;
  color: var(--text-muted);
  cursor: pointer;
}

.clear-icon:hover {
  color: var(--danger-color);
}

.search-results {
  position: absolute;
  width: 500px;
  max-width: calc(100vw - 32px);
  top: 100%;
  left: 0;
  margin-top: 8px;
  background-color: var(--bg-card);
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  max-height: 400px;
  overflow-y: auto;
  z-index: 1020;
  border: 1px solid var(--border-color);
}

.search-result-item {
  display: flex;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid var(--border-color);
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-item:hover,
.search-result-item.active {
  background-color: var(--hover-color);
}

.result-type {
  margin-right: 12px;
  min-width: 70px;
  display: flex;
  align-items: flex-start;
  padding-top: 2px;
}

.badge-lesson,
.badge-section,
.badge-interview,
.badge-shortlist {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
}

.badge-lesson {
  background-color: var(--info-color);
  color: var(--text-light);
}

.badge-section {
  background-color: var(--primary-color);
  color: var(--text-light);
}

.badge-interview {
  background-color: var(--success-color);
  color: var(--text-light);
}

.badge-shortlist {
  background-color: var(--warning-color);
  color: var(--text-light);
}

.result-content {
  flex: 1;
}

.result-title {
  font-weight: 500;
  margin-bottom: 4px;
}

.result-context {
  font-size: 0.85rem;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result-topic {
  font-size: 0.75rem;
  margin-top: 4px;
  color: var(--text-muted);
  font-weight: 500;
}

.search-no-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 8px;
  background-color: var(--bg-card);
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  padding: 16px;
  text-align: center;
  color: var(--text-muted);
  z-index: 1020;
  border: 1px solid var(--border-color);
}

mark {
  background-color: rgba(var(--primary-color-rgb, 79, 70, 229), 0.2);
  color: inherit;
  padding: 0 2px;
  border-radius: 2px;
}

/* Responsive styles */
@media (max-width: 768px) {
  /* Inside the full-screen mobile overlay — stretch to the overlay's
     inner width (~90% of the screen after the overlay's 1rem padding). */
  .mobile-search-overlay .search-container {
    width: 100%;
    max-width: none;
  }

  .mobile-search-overlay .search-input-wrapper {
    width: 100%;
  }

  .mobile-search-overlay .search-input {
    height: 44px;
    font-size: 1rem; /* 16px so iOS does not auto-zoom on focus */
    padding: 0 44px;
  }

  .mobile-search-overlay .search-icon,
  .mobile-search-overlay .clear-icon {
    font-size: 1.05rem;
  }

  .mobile-search-overlay .search-find-btn {
    display: inline-flex;
  }

  .mobile-search-overlay .search-results,
  .mobile-search-overlay .search-no-results {
    position: static;
    width: 100%;
    max-width: 100%;
    margin-top: 10px;
    max-height: calc(100vh - 220px);
  }
}
</style>
