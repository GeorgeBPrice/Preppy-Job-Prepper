<template>
  <div class="search-container" :class="{ active: isSearchActive }">
    <div class="search-input-wrapper">
      <i class="bi bi-search search-icon"></i>
      <input
        ref="searchInput"
        v-model="searchQuery"
        type="text"
        class="search-input"
        placeholder="Search curriculum..."
        @focus="isSearchActive = true"
        @blur="handleBlur"
        @keydown.esc="clearSearch"
        @keydown.down.prevent="navigateResults(1)"
        @keydown.up.prevent="navigateResults(-1)"
        @keydown.enter="selectResult"
      />
      <i
        v-if="searchQuery"
        class="bi bi-x-circle clear-icon"
        @click="clearSearch"
        @mousedown.prevent
      ></i>
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
        </div>
        <div class="result-content">
          <div class="result-title" v-html="highlightMatch(result.title, searchQuery)"></div>
          <div
            v-if="result.context"
            class="result-context"
            v-html="highlightMatch(result.context, searchQuery)"
          ></div>
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
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useTopicStore } from '../store/topic'
import { getCurrentCurriculum } from '../utils/curriculumLoader'

// Component state
const searchQuery = ref('')
const isSearchActive = ref(false)
const selectedIndex = ref(0)
const searchInput = ref(null)
const router = useRouter()
const topicStore = useTopicStore()
const currentCurriculum = ref([])
const loading = ref(false)

// Load the curriculum for the current topic
const loadCurriculum = async () => {
  loading.value = true
  try {
    currentCurriculum.value = await getCurrentCurriculum()
  } catch (error) {
    console.error('Error loading curriculum for search:', error)
    currentCurriculum.value = []
  } finally {
    loading.value = false
  }
}

// Search logic
const searchResults = computed(() => {
  if (!searchQuery.value.trim() || !currentCurriculum.value.length) return []

  const query = searchQuery.value.trim().toLowerCase()
  const results = []

  // First add an entry for interview questions if it matches
  if ('interview questions'.includes(query)) {
    results.push({
      type: 'interview',
      title: 'Interview Questions',
      path: { name: 'interview-questions' },
      context: `Review common ${topicStore.currentTopicName} interview questions`,
    })
  }

  // Search through curriculum
  currentCurriculum.value.forEach((section, sectionIndex) => {
    // Check section title
    if (section.title.toLowerCase().includes(query)) {
      results.push({
        type: 'section',
        title: section.title,
        path: {
          name: 'lesson',
          params: { sectionId: sectionIndex + 1, lessonId: 1 },
        },
        context: section.description,
      })
    }

    // Check section lessons
    if (section.lessons) {
      section.lessons.forEach((lesson, lessonIndex) => {
        if (lesson.title.toLowerCase().includes(query)) {
          results.push({
            type: 'lesson',
            title: `${section.title}: ${lesson.title}`,
            path: {
              name: 'lesson',
              params: { sectionId: sectionIndex + 1, lessonId: lessonIndex + 1 },
            },
            context: lesson.description,
          })
        }

        // Search through lesson sections if they exist
        if (lesson.sections) {
          lesson.sections.forEach((subSection) => {
            if (subSection.title.toLowerCase().includes(query)) {
              results.push({
                type: 'lesson',
                title: `${section.title}: ${lesson.title}`,
                subTitle: subSection.title,
                path: {
                  name: 'lesson',
                  params: { sectionId: sectionIndex + 1, lessonId: lessonIndex + 1 },
                },
                context: subSection.title,
              })
            }

            // Deep search in explanation text (simplified version, could be enhanced)
            if (subSection.explanation && subSection.explanation.toLowerCase().includes(query)) {
              results.push({
                type: 'lesson',
                title: `${section.title}: ${lesson.title}`,
                path: {
                  name: 'lesson',
                  params: { sectionId: sectionIndex + 1, lessonId: lessonIndex + 1 },
                },
                context: extractContext(subSection.explanation, query),
              })
            }
          })
        }
      })
    }
  })

  // Limit to avoid too many results
  return results.slice(0, 8)
})

// Reset selected index when search results change
watch(searchResults, () => {
  selectedIndex.value = 0
})

// Reset selected index when search query changes
watch(searchQuery, () => {
  selectedIndex.value = 0
})

// Watch for topic changes to reload curriculum
watch(
  () => topicStore.currentTopic,
  async () => {
    searchQuery.value = '' // Clear search when topic changes
    await loadCurriculum()
  },
)

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
}

// Handle input blur
function handleBlur() {
  // Use setTimeout to allow click events on results to fire first
  setTimeout(() => {
    isSearchActive.value = false
  }, 200)
}

// Navigate through results with keyboard
function navigateResults(direction) {
  if (searchResults.value.length === 0) return

  const newIndex = selectedIndex.value + direction
  if (newIndex >= 0 && newIndex < searchResults.value.length) {
    selectedIndex.value = newIndex
  }
}

// Select the currently highlighted result
function selectResult() {
  if (searchResults.value.length === 0) return
  navigateToResult(searchResults.value[selectedIndex.value])
}

// Navigate to the selected result
function navigateToResult(result) {
  router.push(result.path)
  clearSearch()
}

// Focus search on keyboard shortcut (Ctrl/Cmd + K)
function handleKeyDown(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    searchInput.value.focus()
  }
}

// Add global event listener for keyboard shortcut
onMounted(async () => {
  document.addEventListener('keydown', handleKeyDown)
  await loadCurriculum()
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
  position: relative;
  display: flex;
  align-items: center;
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
  top: 100%;
  left: 0;
  right: 0;
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
.badge-interview {
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
  .search-container {
    max-width: 220px;
  }

  .search-input {
    height: 32px;
    font-size: 0.8rem;
  }
}
</style>
