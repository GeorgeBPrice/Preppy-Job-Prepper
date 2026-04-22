<template>
  <div class="lesson-ai-actions">
    <span class="lesson-ai-actions__label">
      <i class="bi bi-magic"></i>
      Ask Preppy:
    </span>
    <button
      v-for="action in actions"
      :key="action.id"
      type="button"
      class="lesson-ai-actions__btn"
      :disabled="aiChatStore.isSending"
      @click="runAction(action)"
      :title="action.label"
    >
      <i class="bi" :class="action.icon"></i>
      <span>{{ action.label }}</span>
    </button>
  </div>
</template>

<script setup>
import { useAIChatStore } from '../store/aiChat'
import { useTopicStore } from '../store/topic'
import { LESSON_QUICK_ACTIONS } from '../utils/aiPrompts'

const props = defineProps({
  sectionTitle: { type: String, default: '' },
  lessonTitle: { type: String, default: '' },
  subsectionTitle: { type: String, default: '' },
  explanation: { type: String, default: '' },
})

const aiChatStore = useAIChatStore()
const topicStore = useTopicStore()
const actions = LESSON_QUICK_ACTIONS

async function runAction(action) {
  if (aiChatStore.isSending) return
  const hasApiKey = !!aiChatStore.apiKey && aiChatStore.apiKey.trim() !== ''
  // No key configured — open the chat so its landing view prompts the
  // user to configure. Skip the send; we don't want a silent failure.
  if (!hasApiKey) {
    aiChatStore.openChat()
    return
  }
  const ctx = {
    topic: topicStore.currentTopicName,
    sectionTitle: props.sectionTitle,
    lessonTitle: props.lessonTitle,
    subsectionTitle: props.subsectionTitle,
    explanation: props.explanation,
  }
  const message = action.build(ctx)
  // Seed structured lesson context so the system prompt is grounded in
  // this specific lesson block — overrides whatever AIChat.vue's page
  // scraper produced, which may be stale or empty on some views.
  aiChatStore.setLessonContext({
    topic: ctx.topic,
    sectionTitle: ctx.sectionTitle,
    lessonTitle: ctx.lessonTitle,
    subsectionTitle: ctx.subsectionTitle,
    excerpt: ctx.explanation,
  })
  aiChatStore.openChat()
  await aiChatStore.sendMessage(message, topicStore.currentTopic)
}
</script>

<style scoped>
.lesson-ai-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin: 0.75rem 0 1rem;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px dashed var(--border-color);
  background-color: var(--bg-card);
}

.lesson-ai-actions__label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-right: 4px;
}

.lesson-ai-actions__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  font-size: 0.82rem;
  line-height: 1.4;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-sidebar);
  color: var(--text-color);
  cursor: pointer;
  transition: background-color 0.15s ease, transform 0.15s ease;
}

.lesson-ai-actions__btn:hover:not(:disabled) {
  background-color: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
  transform: translateY(-1px);
}

.lesson-ai-actions__btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

@media (max-width: 576px) {
  .lesson-ai-actions__btn span {
    display: none;
  }
}
</style>
