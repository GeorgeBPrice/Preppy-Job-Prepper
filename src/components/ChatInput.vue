<template>
  <div class="chat-input">
    <form @submit.prevent="sendMessage" class="message-form">
      <textarea
        v-model="message"
        class="message-textarea form-control"
        placeholder="Type your question..."
        @keydown.enter.prevent="handleEnterKey"
        :disabled="disabled"
        ref="messageInput"
        rows="4"
      ></textarea>
      <button
        type="submit"
        class="send-button"
        :disabled="!canSend || disabled"
        :class="{ 'btn-disabled': !canSend || disabled }"
      >
        <i class="bi" :class="buttonIcon"></i>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['send'])

const message = ref('')
const messageInput = ref(null)

const canSend = computed(() => {
  return message.value.trim().length > 0
})

const buttonIcon = computed(() => {
  if (props.disabled) {
    return 'bi-hourglass-split'
  }
  return canSend.value ? 'bi-send-fill' : 'bi-send'
})

const sendMessage = () => {
  if (!canSend.value || props.disabled) return

  const content = message.value.trim()
  emit('send', content)
  message.value = ''

  // Focus the input after sending
  nextTick(() => {
    if (messageInput.value) {
      messageInput.value.focus()
    }
  })
}

const handleEnterKey = (event) => {
  // Send on Enter (without Shift key needed)
  if (!event.shiftKey) {
    sendMessage()
  }
}

// Watch for disabled prop to change to re-focus input when enabled
watch(
  () => props.disabled,
  (newValue) => {
    if (!newValue) {
      nextTick(() => {
        if (messageInput.value) {
          messageInput.value.focus()
        }
      })
    }
  },
)
</script>

<style scoped>
.chat-input {
  margin-top: 10px;
  padding: 10px;
  border-top: 1px solid var(--border-color);
}

.message-form {
  display: flex;
  position: relative;
}

.message-textarea {
  border-radius: 20px;
  padding: 8px 45px 8px 15px;
  resize: none;
  background-color: var(--bg-input);
  color: var(--text-color);
  border-color: var(--border-color);
  font-size: 0.95rem;
  line-height: 1.5;
}

.message-textarea:focus {
  box-shadow: 0 0 0 0.25rem rgba(var(--primary-color-rgb), 0.25);
  border-color: var(--primary-color);
}

.message-textarea::placeholder {
  color: var(--text-muted);
  opacity: 0.6;
}

.send-button {
  position: absolute;
  bottom: 8px;
  right: 10px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.send-button:hover:not(.btn-disabled) {
  background-color: var(--primary-color-dark, #4338ca);
  transform: scale(1.05);
}

.send-button:active:not(.btn-disabled) {
  transform: scale(0.95);
}

.btn-disabled {
  background-color: var(--border-color);
  cursor: not-allowed;
}

.bi {
  font-size: 1rem;
}
</style>
