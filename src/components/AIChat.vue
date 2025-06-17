<template>
  <div
    class="ai-chat-container"
    :class="{
      open: aiChatStore.isOpen,
      'mobile-view': isMobileView,
      expanded: isExpanded,
    }"
  >
    <!-- Confirm Dialog for deletions -->
    <ConfirmDialog
      :show="showConfirmDialog"
      :message="confirmMessage"
      @confirm="handleConfirmAction"
      @cancel="cancelConfirmDialog"
    />

    <div class="chat-toggle" @click="toggleChat" :class="{ open: aiChatStore.isOpen }">
      <i class="bi" :class="aiChatStore.isOpen ? 'bi-x-lg' : 'bi-chat-dots'"></i>
      <span v-if="!aiChatStore.isOpen">Ask Preppy</span>
    </div>

    <!-- Expand/collapse width button below toggle (desktop/tablet only) -->
    <button
      v-if="aiChatStore.isOpen && !isMobileView"
      class="expand-toggle-btn"
      @click.stop="toggleExpand"
      title="Toggle Width"
    >
      <i class="bi" :class="isExpanded ? 'bi-arrow-right' : 'bi-arrow-left'"></i>
    </button>

    <!-- Chat main panel -->
    <div class="chat-panel">
      <div class="chat-header">
        <div class="conversations-dropdown" v-if="!showSettings">
          <div class="dropdown">
            <button
              class="dropdown-toggle"
              type="button"
              @click.stop="toggleDropdown"
              aria-expanded="dropdownOpen"
            >
              <span class="conversation-title">{{ activeConversationTitle }}</span>
            </button>
            <ul class="dropdown-menu" :class="{ show: dropdownOpen }" style="z-index: 2002">
              <li v-for="conv in aiChatStore.sortedConversations" :key="conv.id">
                <button
                  class="dropdown-item"
                  :class="{ active: conv.id === aiChatStore.activeConversationId }"
                  @click="selectConversation(conv.id)"
                >
                  <span>
                    <span class="truncate">{{ conv.title }}</span>
                    <button
                      @click.stop="confirmDeleteConversation(conv.id)"
                      class="btn-delete"
                      :disabled="aiChatStore.conversations.length <= 1"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </span>
                </button>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <button class="dropdown-item new-chat" @click="createNewConversationAndClose">
                  <i class="bi bi-plus-circle"></i> New Conversation
                </button>
              </li>
              <li>
                <button class="dropdown-item clear-all" @click="confirmClearAllConversations">
                  <i class="bi bi-trash"></i> Clear All
                </button>
              </li>
            </ul>
          </div>
        </div>

        <!-- Settings -->
        <div class="chat-title" v-if="showSettings">
          <i class="bi bi-gear me-2"></i>
          <span>Chat Settings</span>
        </div>

        <div class="chat-actions">
          <button
            v-if="!showSettings"
            @click="createNewConversation"
            class="action-button"
            title="New Conversation"
          >
            <i class="bi bi-plus-lg"></i>
          </button>
          <button
            v-if="!showSettings"
            @click="showSettings = !showSettings"
            class="action-button"
            title="Settings"
          >
            <i class="bi bi-gear"></i>
          </button>
          <button
            v-if="showSettings"
            @click="showSettings = false"
            class="action-button"
            title="Back to Chat"
          >
            <i class="bi bi-arrow-left"></i>
          </button>
          <button @click="toggleChat" class="action-button" title="Close">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      </div>

      <!-- Chat content area -->
      <div v-if="!showSettings" class="chat-content">
        <div ref="messagesContainer" class="messages-container">
          <div v-if="aiChatStore.messages.length === 0" class="welcome-message">
            <div class="welcome-icon">
              <i class="bi bi-robot"></i>
            </div>
            <h3>Preppy AI Assistant</h3>
            <p>
              Ask me questions about {{ currentTopicName }} programming concepts, or anything
              related to your coding lessons. I'm here to help you learn!
            </p>
            <div v-if="!aiChatStore.apiKey" class="api-key-warning">
              <i class="bi bi-exclamation-triangle-fill me-2"></i>
              <span
                >You need to configure an API key in settings to get started.
                <button @click="showSettings = true" class="btn-link">
                  <i class="bi bi-gear"></i> Configure Settings
                </button>
              </span>
            </div>
          </div>

          <!-- Messages -->
          <template v-else>
            <ChatMessage
              v-for="(message, index) in aiChatStore.messages"
              :key="`msg-${index}`"
              :message="message"
            />
          </template>

          <!-- Chat Message Loading Indicator (only show for non-streaming) -->
          <div v-if="aiChatStore.isSending && !aiChatStore.useStreaming" class="typing-indicator">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>

        <!-- Current topic indicator above the input -->
        <div class="current-topic-indicator">
          <span
            >Your topic is <strong>{{ currentTopicName }}</strong></span
          >
        </div>

        <!-- Chat input -->
        <ChatInput @send="sendMessage" :disabled="aiChatStore.isSending || !aiChatStore.apiKey" />
      </div>

      <!-- Settings panel -->
      <div v-else class="settings-container">
        <ChatSettings />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick, onUnmounted } from 'vue'
import { useAIChatStore } from '../store/aiChat'
import { useTopicStore } from '../store/topic'
import ChatMessage from './ChatMessage.vue'
import ChatInput from './ChatInput.vue'
import ChatSettings from './ChatSettings.vue'
import ConfirmDialog from './ConfirmDialog.vue'

const aiChatStore = useAIChatStore()
const topicStore = useTopicStore()
const messagesContainer = ref(null)
const showSettings = ref(false)
const isMobileView = ref(window.innerWidth < 768)
const isExpanded = ref(false)
const dropdownOpen = ref(false)
const showConfirmDialog = ref(false)
const confirmMessage = ref('')
const pendingAction = ref(null)
const actionData = ref(null)

// active conversation title
const activeConversationTitle = computed(() => {
  const activeConv = aiChatStore.activeConversation
  return activeConv ? activeConv.title : 'New Conversation'
})

// topic name from topic store
const currentTopicName = computed(() => {
  return topicStore.currentTopicName
})

const toggleChat = () => {
  aiChatStore.toggleChat()
  if (aiChatStore.isOpen) {
    showSettings.value = false
  } else {
    isExpanded.value = false
    closeDropdown()
  }
}

// Toggle chat expanded width
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

// Dropdown management functions
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

// Conversation management
const createNewConversation = () => {
  aiChatStore.createNewConversation()
}

const createNewConversationAndClose = () => {
  createNewConversation()
  closeDropdown()
}

const switchConversation = (id) => {
  aiChatStore.switchConversation(id)
}

const selectConversation = (id) => {
  switchConversation(id)
  closeDropdown()
}

// Confirm dialog actions
const confirmDeleteConversation = (id) => {
  confirmMessage.value = 'Delete this conversation? This action cannot be undone.'
  pendingAction.value = 'deleteConversation'
  actionData.value = id
  showConfirmDialog.value = true
}

const confirmClearAllConversations = () => {
  confirmMessage.value = 'Delete all conversations? This action cannot be undone.'
  pendingAction.value = 'clearAllConversations'
  actionData.value = null
  showConfirmDialog.value = true
}

const handleConfirmAction = () => {
  if (pendingAction.value === 'deleteConversation') {
    aiChatStore.deleteConversation(actionData.value)
  } else if (pendingAction.value === 'clearAllConversations') {
    aiChatStore.clearAllConversations()
  }

  cancelConfirmDialog()
  closeDropdown()
}

const cancelConfirmDialog = () => {
  showConfirmDialog.value = false
  pendingAction.value = null
  actionData.value = null
}

// Send userss message to the AI
const sendMessage = async (content) => {
  if (!content || !aiChatStore.apiKey) return

  // Include the current topic in the conversation context (Context for the LLM)
  if (aiChatStore.conversationContext) {
    aiChatStore.conversationContext += `\nCurrent topic: ${currentTopicName.value}`
  } else {
    aiChatStore.setConversationContext(`Current topic: ${currentTopicName.value}`)
  }

  await aiChatStore.sendMessage(content, currentTopicName.value)

  // keep the chat scrolled to the bottom.
  await nextTick()
  scrollToBottom()
}

// We could make this a config option for users to toggle
const scrollToBottom = () => {
  if (messagesContainer.value) {
    const container = messagesContainer.value
    container.scrollTop = container.scrollHeight
  }
}

// Watch for new messages to auto-scroll
watch(
  () => aiChatStore.messages.length,
  () => {
    nextTick(() => {
      scrollToBottom()
    })
  },
)

// Watch for streaming message content changes
watch(
  () => {
    const streamingMessage = aiChatStore.messages.find(
      (msg) => msg.id === aiChatStore.streamingMessageId,
    )
    return streamingMessage?.content
  },
  () => {
    nextTick(() => {
      scrollToBottom()
    })
  },
)

// Handle clicks outside element, close it
const handleClickOutside = (event) => {
  const dropdown = document.querySelector('.conversations-dropdown')
  if (dropdown && !dropdown.contains(event.target) && dropdownOpen.value) {
    closeDropdown()
  }
}

// Update mobile view state on window resize
const handleResize = () => {
  isMobileView.value = window.innerWidth < 768
}

// Set conversation context based on page content
const setContextFromPage = () => {
  const sectionTitle = document.querySelector('.section-title, .challenge-title')
  const lessonTitle = document.querySelector('.lesson-title')

  let context = ''

  if (sectionTitle) {
    context += `Section: ${sectionTitle.textContent.trim()}\n`
  }

  if (lessonTitle) {
    context += `Lesson: ${lessonTitle.textContent.trim()}\n`
  }

  // Get trimmed lesson content (Context for the LLM)
  const lessonContent = document.querySelector('.lesson-content, .challenge-description')
  if (lessonContent) {
    let contentText = lessonContent.textContent.trim()
    if (contentText.length > 500) {
      contentText = contentText.substring(0, 500) + '...'
    }
    context += `Content: ${contentText}\n`
  }

  if (context) {
    aiChatStore.setConversationContext(context)
  }
}

onMounted(() => {
  // Load settings on component mount if not already loaded
  if (!aiChatStore.isLoaded) {
    aiChatStore.loadSettings()
  }
  window.addEventListener('resize', handleResize)
  document.addEventListener('click', handleClickOutside)

  // Set iniial context
  setContextFromPage()

  scrollToBottom()
})

onUnmounted(() => {
  // Cleanup
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.ai-chat-container {
  position: fixed;
  top: 80px;
  bottom: 20px;
  right: -360px;
  width: 350px;
  max-width: 100%;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transition:
    right 0.3s ease-in-out,
    width 0.3s ease-in-out;
  background-color: var(--bg-content);
  border-radius: 12px 0 0 12px;
  box-shadow: -2px 0 15px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  border-right: none;
  color: var(--text-color);
}

.ai-chat-container.open {
  right: 0;
}

/* Expanded mode for desktop */
.ai-chat-container.expanded {
  width: 700px;
}

.chat-toggle {
  position: absolute;
  left: -45px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #4f46e5;
  color: white;
  padding: 10px;
  border-radius: 8px 0 0 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 35px;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.chat-toggle span {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  margin-top: 8px;
  font-size: 0.9rem;
  font-weight: 500;
}

.chat-toggle:hover {
  background-color: #4338ca;
}

.chat-toggle.open {
  width: 30px;
  height: 30px;
  left: -30px;
  top: 10px;
  transform: translateY(0);
  border-radius: 8px 0 0 8px;
  background-color: #c76363;
}

.chat-toggle.open span {
  display: none;
}

.chat-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.chat-header {
  padding: 10px 15px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-title {
  font-weight: 600;
  display: flex;
  align-items: center;
}

.chat-actions {
  display: flex;
  gap: 8px;
}

.action-button {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.action-button:hover,
.action-button.active {
  background-color: rgba(79, 70, 229, 0.1);
  color: #4f46e5;
}

.chat-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Conversations dropdown styling */
.conversations-dropdown {
  position: relative;
  max-width: 200px;
  margin-right: auto;
}

.dropdown-toggle {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--text-color);
  font-weight: 600;
  padding: 5px;
  border-radius: 4px;
}

.dropdown-toggle:hover {
  background-color: rgba(79, 70, 229, 0.1);
}

.conversation-title {
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.toggle-icon {
  font-size: 0.7rem;
  margin-left: 4px;
}

.dropdown-menu {
  width: 240px;
  max-height: 300px;
  overflow-y: auto;
  padding: 5px 0;
  background-color: var(--bg-content);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  display: none;
}

.dropdown-menu.show {
  display: block;
}

.dropdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  color: var(--text-color);
  font-size: 0.9rem;
  max-width: 100%;
}

.dropdown-item:hover,
.dropdown-item:focus {
  background-color: rgba(79, 70, 229, 0.1);
  color: var(--text-color);
}

.dropdown-item.active {
  background-color: rgba(79, 70, 229, 0.2);
  color: #4f46e5;
}

.dropdown-item .truncate {
  max-width: 170px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.dropdown-item .btn-delete {
  background: none;
  border: none;
  color: var(--text-muted);
  padding: 3px;
  border-radius: 50%;
  visibility: hidden;
  opacity: 0;
  transition: all 0.2s ease;
}

.dropdown-item:hover .btn-delete {
  visibility: visible;
  opacity: 1;
}

.dropdown-item .btn-delete:hover {
  color: #dc3545;
  background-color: rgba(220, 53, 69, 0.1);
}

.dropdown-item .btn-delete:disabled {
  color: var(--text-muted);
  opacity: 0.3;
  cursor: not-allowed;
}

.dropdown-item.new-chat {
  color: #4f46e5;
}

.dropdown-item.clear-all {
  color: #dc3545;
}

.dropdown-divider {
  border-top: 1px solid var(--border-color);
  margin: 5px 0;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  scrollbar-width: thin;
  scrollbar-color: rgba(128, 128, 128, 0.4) transparent;
}

.messages-container::-webkit-scrollbar {
  width: 5px;
}

.messages-container::-webkit-scrollbar-track {
  background: transparent;
}

.messages-container::-webkit-scrollbar-thumb {
  background-color: rgba(128, 128, 128, 0.4);
  border-radius: 3px;
}

.welcome-message {
  text-align: center;
  padding: 20px;
  max-width: 280px;
  margin: 20px auto;
}

.welcome-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: #4f46e5; /* Always blue */
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.welcome-message h3 {
  margin-bottom: 10px;
  color: var(--text-color);
}

.welcome-message p {
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.5;
}

.api-key-warning {
  margin-top: 15px;
  padding: 10px;
  background-color: rgba(var(--warning-color-rgb, 255, 193, 7), 0.1);
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--warning-color);
  text-align: left;
  display: flex;
  align-items: flex-start;
}

.btn-link {
  background: none;
  border: none;
  color: #4f46e5;
  padding: 0;
  font-size: inherit;
  text-decoration: underline;
  cursor: pointer;
}

.btn-link:hover {
  color: #4338ca;
}

.typing-indicator {
  display: flex;
  align-items: center;
  column-gap: 6px;
  padding: 8px 12px;
  background-color: rgba(79, 70, 229, 0.1);
  border-radius: 12px;
  width: fit-content;
  margin-top: 8px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.typing-indicator .dot {
  width: 8px;
  height: 8px;
  background-color: #4f46e5;
  border-radius: 50%;
  animation: bounce 1.5s infinite ease-in-out;
  opacity: 0.5;
}

.typing-indicator .dot:nth-child(1) {
  animation-delay: 0s;
}

.typing-indicator .dot:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator .dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%,
  60%,
  100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-4px);
  }
}

.settings-container {
  flex: 1;
  overflow-y: auto;
  padding: 0 15px;
  scrollbar-width: thin;
  scrollbar-color: rgba(128, 128, 128, 0.4) transparent;
}

.settings-container::-webkit-scrollbar {
  width: 5px;
}

.settings-container::-webkit-scrollbar-track {
  background: transparent;
}

.settings-container::-webkit-scrollbar-thumb {
  background-color: rgba(128, 128, 128, 0.4);
  border-radius: 3px;
}

/* Mobile styles */
.mobile-view {
  width: 80%;
  height: 70vh;
  right: -80%;
  top: 15vh;
  bottom: 15vh;
  border-radius: 12px 0 0 12px;
  border: 1px solid var(--border-color);
  border-right: none;
}

.mobile-view.open {
  right: 0;
}

@media (max-width: 767px) {
  /* Mobile chat style */
  .ai-chat-container {
    width: 80%;
    right: -80%;
    height: 70vh;
    top: 15vh;
    bottom: 15vh;
    border-radius: 12px 0 0 12px;
    border: 1px solid var(--border-color);
    border-right: none;
  }

  /* Mobile chat toggle */
  .chat-toggle {
    position: fixed;
    bottom: 80px;
    right: 20px;
    left: auto;
    top: auto;
    transform: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    flex-direction: row;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 999;
    background-color: #4f46e5;
  }

  .chat-toggle span {
    display: none;
  }

  .chat-toggle.open {
    display: block;
    position: absolute;
    width: 30px;
    height: 30px;
    left: -30px;
    top: 10px;
    bottom: auto;
    right: auto;
    border-radius: 8px 0 0 8px;
  }

  .conversations-dropdown {
    max-width: 150px;
  }

  .conversation-title {
    max-width: 110px;
  }
}

/* Current topic indicator */
.current-topic-indicator {
  padding: 8px 15px 0;
  font-size: 0.85rem;
  color: var(--text-muted);
  text-align: center;
}

.current-topic-indicator strong {
  color: #4f46e5;
}

.expand-toggle-btn {
  position: absolute;
  left: -22px;
  bottom: 20px;
  width: 22px;
  height: 85px;
  background: #6a62f6;
  color: white;
  border: none;
  border-radius: 8px 0 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2001;
  margin-top: 8px;
  transition: background 0.2s;
}
.expand-toggle-btn:hover {
  background: #4338ca;
}
.expand-toggle-btn.expanded {
  background: #a9a4ff;
}
</style>
