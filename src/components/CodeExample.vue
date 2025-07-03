<template>
  <div class="code-example-wrapper">
    <h5>Interview Focus Examples:</h5>
    <div class="code-example-container">
      <pre class="scrollable-code"><code 
        :class="`language-${detectedLanguage}`" 
        v-html="highlightedCode"
      ></code></pre>
      <div class="code-copy-btn" @click="copyCode" title="Copy code">
        <i class="bi bi-clipboard"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUpdated, nextTick } from 'vue'
import { useTopicStore } from '../store/topic'
import Prism from 'prismjs'

// Import additional PrismJS language components
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
})

const topicStore = useTopicStore()

// Map topics to PrismJS language identifiers
const topicLanguageMap = {
  javascript: 'javascript',
  csharp: 'csharp',
  typescript: 'typescript',
  react: 'jsx',
  devops: 'yaml', // Default for DevOps, could be bash, yaml, etc.
  ai: 'python', // Default for AI, could be python, javascript, etc.
}

// Detect language based on current topic
const detectedLanguage = computed(() => {
  return topicLanguageMap[topicStore.currentTopic] || 'javascript'
})

// Function to escape HTML in the code examples
const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Function to highlight code using Prism
const highlightedCode = computed(() => {
  if (!props.code) return ''

  try {
    // Check if Prism supports this language
    if (Prism.languages[detectedLanguage.value]) {
      return Prism.highlight(
        props.code,
        Prism.languages[detectedLanguage.value],
        detectedLanguage.value,
      )
    }
  } catch (error) {
    console.warn('Error highlighting code:', error)
  }

  // Fallback to escaped HTML if highlighting fails
  return escapeHtml(props.code)
})

// Copy code to clipboard
const copyCode = () => {
  navigator.clipboard.writeText(props.code)
}

// Apply Prism highlighting after mounting and updates
onMounted(() => {
  nextTick(() => {
    Prism.highlightAll()
  })
})

onUpdated(() => {
  nextTick(() => {
    Prism.highlightAll()
  })
})
</script>

<style scoped>
.code-example-wrapper {
  margin: 1rem 0;
  overflow: hidden;
  background-color: var(--bg-code-example);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #6366f1;
  position: relative;
  box-shadow: var(--shadow-sm);
}

.code-example-wrapper h5 {
  color: var(--text-color);
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.code-example-container {
  position: relative;
}

.code-example-container pre {
  background-color: var(--bg-code);
  padding: 1rem;
  border-radius: 6px;
  margin: 0;
  overflow-x: auto;
  border: 1px solid var(--border-color);
  font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

.code-example-container code {
  font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-color);
  background: transparent;
  padding: 0;
  border: none;
}

.code-copy-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 6px 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--text-muted);
  font-size: 0.85rem;
  opacity: 0.7;
}

.code-copy-btn:hover {
  background-color: var(--bg-primary);
  color: var(--text-color);
  opacity: 1;
  transform: translateY(-1px);
}

/* Dark mode specific styling */
:root[data-theme='dark'] .code-example-wrapper {
  background-color: #1e293b;
  border-left-color: #6366f1;
}

:root[data-theme='dark'] .code-example-container pre {
  background-color: #0f172a;
  border-color: #374151;
}

:root[data-theme='dark'] .code-example-container code {
  color: #f3f4f6;
}

/* Light mode specific styling */
:root[data-theme='light'] .code-example-wrapper {
  background-color: #f8fafc;
  border-left-color: #6366f1;
}

:root[data-theme='light'] .code-example-container pre {
  background-color: #ffffff;
  border-color: #e2e8f0;
}

:root[data-theme='light'] .code-example-container code {
  color: #1e293b;
}

/* Responsive adjustments */
@media (max-width: 767px) {
  .code-example-wrapper {
    padding: 0.75rem;
  }

  .code-example-container pre {
    padding: 0.75rem;
    font-size: 0.85rem;
  }

  .code-copy-btn {
    top: 6px;
    right: 6px;
    padding: 4px 6px;
    font-size: 0.8rem;
  }
}
</style>
