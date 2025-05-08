<template>
  <div class="interview-questions">
    <!-- Section tabs -->
    <div class="section-tabs">
      <button
        v-for="(section, index) in sections"
        :key="section.id"
        :class="['tab-button', { active: activeSection === index }]"
        @click="selectSection(index)"
      >
        {{ section.title }}
      </button>
    </div>

    <!-- Questions accordion -->
    <div class="questions-container">
      <div v-if="sections[activeSection]?.questions?.length">
        <div
          v-for="(question, qIndex) in sections[activeSection].questions"
          :key="qIndex"
          class="question-item"
        >
          <div
            class="question-header"
            :class="{ active: expandedQuestions[activeSection] === qIndex }"
            @click="toggleQuestion(qIndex)"
            role="button"
            tabindex="0"
            :aria-expanded="expandedQuestions[activeSection] === qIndex"
            :aria-controls="'answer-' + sections[activeSection].id + '-' + qIndex"
            @keydown.enter="toggleQuestion(qIndex)"
            @keydown.space.prevent="toggleQuestion(qIndex)"
          >
            <span class="question-number">{{ qIndex + 1 }}</span>
            <h3 class="question-text">{{ question.text }}</h3>
            <span class="expand-icon">{{
              expandedQuestions[activeSection] === qIndex ? '−' : '+'
            }}</span>
          </div>

          <div
            class="answer-container"
            :class="{ expanded: expandedQuestions[activeSection] === qIndex }"
            :id="'answer-' + sections[activeSection].id + '-' + qIndex"
            role="region"
            :aria-hidden="expandedQuestions[activeSection] !== qIndex"
          >
            <div class="answer-content scrollable-answers">
              <p v-html="question.answer"></p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="no-questions">
        <p v-if="loading">Loading interview questions...</p>
        <p v-else>
          No interview questions found for this topic. Select a different topic or check back later.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { useTopicStore } from '../store/topic'
import { getCurrentInterviewQuestions } from '../utils/curriculumLoader'

const props = defineProps({
  // Optional params from the route
  sectionParam: {
    type: String,
    default: null,
  },
  questionParam: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['section-change', 'question-change'])

const topicStore = useTopicStore()
const activeSection = ref(0)
const expandedQuestions = reactive({})
const sections = ref([])
const loading = ref(true)

// Load interview questions for the current topic
const loadInterviewQuestions = async () => {
  loading.value = true

  try {
    const questions = await getCurrentInterviewQuestions()
    sections.value = questions || []
  } catch (error) {
    console.error('Error loading interview questions:', error)
    sections.value = []
  } finally {
    loading.value = false
  }
}

// Initialize from URL params if provided
onMounted(async () => {
  await loadInterviewQuestions()

  if (props.sectionParam) {
    const sectionIndex = sections.value.findIndex((s) => s.id === props.sectionParam)
    if (sectionIndex >= 0) {
      activeSection.value = sectionIndex

      // If question param is also provided, expand that question
      if (props.questionParam) {
        const questionIndex = parseInt(props.questionParam) - 1
        if (questionIndex >= 0 && questionIndex < sections.value[sectionIndex].questions.length) {
          expandedQuestions[sectionIndex] = questionIndex
        }
      }
    }
  }
})

// Watch for changes in topic to reload the questions
watch(
  () => topicStore.currentTopic,
  async () => {
    await loadInterviewQuestions()
    activeSection.value = 0
    expandedQuestions[activeSection.value] = null
  },
)

// Watch for prop changes to update the component state
watch(
  () => props.sectionParam,
  (newValue) => {
    if (newValue) {
      const sectionIndex = sections.value.findIndex((s) => s.id === newValue)
      if (sectionIndex >= 0 && sectionIndex !== activeSection.value) {
        activeSection.value = sectionIndex
      }
    }
  },
)

watch(
  () => props.questionParam,
  (newValue) => {
    if (newValue && props.sectionParam) {
      const sectionIndex = sections.value.findIndex((s) => s.id === props.sectionParam)
      if (sectionIndex >= 0) {
        const questionIndex = parseInt(newValue) - 1
        if (questionIndex >= 0 && questionIndex < sections.value[sectionIndex].questions.length) {
          expandedQuestions[sectionIndex] = questionIndex
        }
      }
    } else if (!newValue) {
      // If questionParam is cleared, collapse any expanded question
      const sectionIndex = activeSection.value
      if (expandedQuestions[sectionIndex] !== undefined) {
        expandedQuestions[sectionIndex] = null
      }
    }
  },
)

// Handle section selection
const selectSection = (index) => {
  if (activeSection.value !== index) {
    activeSection.value = index
    // Emit section change event for the parent to update route if needed
    emit('section-change', sections.value[index].id)
  }
}

// Toggle question expansion
const toggleQuestion = (index) => {
  const currentValue = expandedQuestions[activeSection.value]
  const newValue = currentValue === index ? null : index

  // Update the expanded state
  expandedQuestions[activeSection.value] = newValue

  // Emit question change event
  if (sections.value[activeSection.value]) {
    emit('question-change', sections.value[activeSection.value].id, newValue)
  }
}
</script>

<style>
.interview-questions {
  max-width: 900px;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  color: var(--text-color);
  transition: all var(--transition-speed) ease;
}

.section-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 12px;
}

.tab-button {
  padding: 8px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  color: var(--text-color);
  transition: all var(--transition-speed) ease;
}

.tab-button.active {
  background: var(--sidebar-active);
  color: var(--text-color);
  border-color: var(--primary-color);
  box-shadow: var(--shadow-sm);
}

.tab-button:hover:not(.active) {
  background: var(--hover-color);
  transform: translateY(-2px);
}

.questions-container {
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  background: var(--bg-card);
  overflow: hidden;
  transition: all var(--transition-speed) ease;
}

.question-item {
  border-bottom: 1px solid var(--border-color);
  transition: all var(--transition-speed) ease;
}

.question-item:last-child {
  border-bottom: none;
}

.question-header {
  padding: 16px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color var(--transition-speed) ease;
}

.question-header:hover {
  background-color: var(--hover-color);
}

.question-header.active {
  background-color: var(--sidebar-active);
}

.question-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: var(--section-number-gradient);
  color: var(--text-light);
  border-radius: 50%;
  margin-right: 16px;
  font-weight: bold;
  box-shadow: var(--shadow-sm);
}

.question-text {
  flex: 1;
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text-color);
}

.expand-icon {
  font-size: 1.5rem;
  color: var(--text-muted);
  width: 24px;
  text-align: center;
}

.answer-container {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.answer-container.expanded {
  max-height: 500px; /* Adjust as needed */
}

.answer-content {
  padding: 20px 20px 20px 64px;
  color: var(--text-color);
  line-height: 1.5;
}

.answer-content p {
  margin-top: 0;
}

.answer-content code {
  background-color: var(--bg-code);
  padding: 2px 5px;
  border-radius: 4px;
  font-family: Menlo, Monaco, 'Courier New', monospace;
  font-size: 0.9em;
  color: var(--primary-color);
  transition: all var(--transition-speed) ease;
}

/* Dark mode specific styles */
html[data-theme='dark'] .answer-content code,
body.dark-mode .answer-content code {
  background-color: var(--bg-code);
  color: #c6c3f9;
}

.no-questions {
  padding: 40px;
  text-align: center;
  color: var(--text-muted);
  font-style: italic;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .section-tabs {
    flex-direction: column;
    gap: 6px;
  }

  .tab-button {
    width: 100%;
    text-align: left;
  }

  .question-header {
    padding: 12px 16px;
  }

  .answer-content {
    padding: 16px 16px 16px 48px;
  }

  .question-text {
    font-size: 1rem;
  }
}

/* Animation for expanding/collapsing answers */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.answer-container.expanded .answer-content {
  animation: fadeIn 0.3s ease-in-out;
}
</style>
