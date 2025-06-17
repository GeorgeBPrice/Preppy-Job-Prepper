<template>
  <div class="chat-message" :class="messageClass">
    <div class="message-content">
      <div class="message-header">
        <div class="sender-container">
          <i v-if="role === 'user'" class="bi bi-person user-inline-icon"></i>
          <i v-if="role === 'assistant'" class="bi bi-robot assistant-inline-icon"></i>
          <i v-if="role === 'system'" class="bi bi-info-circle system-inline-icon"></i>
          <span class="message-sender">{{ sender }}</span>
        </div>
        <span class="message-time">{{ formattedTime }}</span>
      </div>
      <div class="message-body" v-if="role === 'assistant' || role === 'system'">
        <div v-html="formattedContent" class="markdown-content"></div>
        <span v-if="isStreaming" class="typing-cursor"></span>
      </div>
      <div class="message-body" v-else>
        {{ message.content }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatMarkdown, resetStreamingState } from '../theme/markdownFormatter'
import { useAIChatStore } from '../store/aiChat'

const aiChatStore = useAIChatStore()

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
})

const role = computed(() => props.message.role)

const sender = computed(() => {
  switch (role.value) {
    case 'user':
      return 'You'
    case 'assistant':
      return 'AI Assistant'
    case 'system':
      return 'System'
    default:
      return 'Unknown'
  }
})

const messageClass = computed(() => {
  return {
    'user-message': role.value === 'user',
    'assistant-message': role.value === 'assistant',
    'system-message': role.value === 'system',
    'streaming-message': isStreaming.value,
  }
})

const isStreaming = computed(() => {
  return props.message.id === aiChatStore.streamingMessageId
})

const formattedTime = computed(() => {
  if (!props.message.timestamp) return ''

  try {
    const date = new Date(props.message.timestamp)
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date)
  } catch {
    return ''
  }
})

const formattedContent = computed(() => {
  // Reset streaming state when message changes
  if (props.message.id !== aiChatStore.streamingMessageId) {
    resetStreamingState()
  }

  // Format the message
  return formatMarkdown(props.message.content, isStreaming.value)
})
</script>

<style scoped>
.chat-message {
  display: flex;
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 12px;
  color: var(--text-color);
  transition: background-color var(--transition-speed) ease;
}

.user-message {
  background-color: rgba(var(--primary-color-rgb), 0.08);
}

.assistant-message {
  background-color: var(--bg-card);
}

.system-message {
  background-color: rgba(var(--warning-color-rgb), 0.1);
  border-left: 3px solid var(--warning-color);
}

.streaming-message {
  border-left: 3px solid var(--primary-color);
  position: relative;
}

.streaming-message::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--primary-color) 0%, transparent 100%);
  animation: streaming-progress 1s infinite linear;
}

@keyframes streaming-progress {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  font-size: 0.85rem;
  align-items: center;
}

.sender-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.message-sender {
  font-weight: 600;
}

.message-time {
  color: var(--text-muted);
  font-size: 0.8rem;
}

/* Styles for the inline icons */
.user-inline-icon {
  color: var(--primary-color);
  font-size: 0.9rem;
}

.assistant-inline-icon {
  color: var(--secondary-color);
  font-size: 0.9rem;
}

.system-inline-icon {
  color: var(--warning-color);
  font-size: 0.9rem;
}

.message-body {
  line-height: 1.5;
  overflow-wrap: break-word;
  word-break: break-word;
  position: relative;
}

.typing-cursor {
  display: inline-block;
  width: 2px;
  height: 16px;
  background-color: var(--primary-color);
  margin-left: 2px;
  vertical-align: text-bottom;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

:deep(.markdown-content) {
  font-size: 0.95rem;
}

:deep(.markdown-content pre) {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 12px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 10px 0;
}

:deep(.markdown-content code) {
  font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 0.9em;
}

:deep(.markdown-content p) {
  margin-bottom: 10px;
}

:deep(.markdown-content ul),
:deep(.markdown-content ol) {
  padding-left: 20px;
  margin-bottom: 10px;
}

:deep(.markdown-content h1),
:deep(.markdown-content h2),
:deep(.markdown-content h3),
:deep(.markdown-content h4) {
  margin-top: 15px;
  margin-bottom: 10px;
}

:deep(.markdown-content .md-inline-code) {
  background-color: var(--bg-code);
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-size: 0.9em;
  border: 1px solid rgba(var(--primary-color-rgb), 0.2);
}

/* Streaming message styles */
:deep(.streaming-code) {
  background-color: var(--bg-code);
  padding: 12px;
  border-radius: 6px;
  font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 0.9em;
  color: var(--text-muted);
  border: 1px dashed var(--border-color);
}

:deep(.streaming-bold) {
  font-weight: 500;
  color: var(--text-muted);
}

:deep(.streaming-italic) {
  font-style: italic;
  color: var(--text-muted);
}
</style>
