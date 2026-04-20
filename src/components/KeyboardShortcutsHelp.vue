<template>
  <div v-if="modelValue" class="shortcuts-overlay" @click.self="close" role="dialog" aria-modal="true">
    <div class="shortcuts-dialog">
      <div class="shortcuts-header">
        <h4>Keyboard shortcuts</h4>
        <button class="close-btn" @click="close" aria-label="Close shortcuts">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <ul class="shortcuts-list">
        <li v-for="(row, i) in shortcuts" :key="i">
          <span class="shortcut-keys">
            <kbd v-for="key in row.keys" :key="key">{{ key }}</kbd>
          </span>
          <span class="shortcut-description">{{ row.description }}</span>
        </li>
      </ul>
      <p class="shortcuts-hint">
        Single-key shortcuts are ignored while typing in an input, textarea, or the code editor.
      </p>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, watch } from 'vue'
import { SHORTCUTS } from '../composables/useKeyboardShortcuts'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue'])

const shortcuts = SHORTCUTS

function close() {
  emit('update:modelValue', false)
}

function onEsc(event) {
  if (event.key === 'Escape' && props.modelValue) {
    event.preventDefault()
    close()
  }
}

watch(
  () => props.modelValue,
  (open) => {
    if (open) window.addEventListener('keydown', onEsc)
    else window.removeEventListener('keydown', onEsc)
  },
)

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onEsc)
})
</script>

<style scoped>
.shortcuts-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.shortcuts-dialog {
  background-color: var(--bg-card);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 20px 24px;
  width: min(92vw, 440px);
  box-shadow: var(--shadow-lg);
}

.shortcuts-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.shortcuts-header h4 {
  margin: 0;
  font-size: 1.15rem;
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.1rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
}

.close-btn:hover {
  background-color: var(--bg-sidebar);
  color: var(--text-color);
}

.shortcuts-list {
  list-style: none;
  padding: 0;
  margin: 0 0 12px 0;
  display: grid;
  row-gap: 10px;
}

.shortcuts-list li {
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
}

.shortcut-keys {
  display: inline-flex;
  gap: 4px;
  flex-shrink: 0;
}

kbd {
  font-family: 'Fira Code', Consolas, monospace;
  font-size: 0.8rem;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-sidebar);
  color: var(--text-color);
  box-shadow: 0 1px 0 var(--border-color);
}

.shortcut-description {
  color: var(--text-color);
  font-size: 0.9rem;
  text-align: right;
}

.shortcuts-hint {
  margin: 0;
  font-size: 0.8rem;
  color: var(--text-muted);
}
</style>
