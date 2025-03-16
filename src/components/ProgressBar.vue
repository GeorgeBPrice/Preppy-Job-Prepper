<template>
  <div class="progress-container">
    <div class="progress">
      <div
        class="progress-bar"
        role="progressbar"
        :style="{ width: progressPercentage + '%' }"
        :aria-valuenow="progressPercentage"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {{ progressPercentage }}%
      </div>
      <button
        v-if="showResetButton"
        @click="confirmReset"
        class="reset-button"
        title="Reset Progress"
        aria-label="Reset Progress"
      >
        <i class="bi bi-x"></i>
      </button>
    </div>

    <!-- Confirmation Modal -->
    <div v-if="showResetConfirmation" class="reset-confirmation-overlay" @click.self="cancelReset">
      <div class="reset-confirmation-dialog">
        <h4>Reset Progress</h4>
        <p>Are you sure you want to reset your progress?</p>
        <p class="warning-text">This action cannot be undone.</p>
        <div class="confirmation-actions">
          <button @click="cancelReset" class="btn btn-secondary">Cancel</button>
          <button @click="resetProgress" class="btn btn-danger">Reset Progress</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useProgressStore } from '../store/progress'

const progressStore = useProgressStore()
const showResetConfirmation = ref(false)

const progressPercentage = computed(() => {
  return Math.round(progressStore.overallProgress * 100)
})

// Only show reset button if there's progress to reset
const showResetButton = computed(() => {
  return progressStore.hasAnyProgress
})

function confirmReset() {
  showResetConfirmation.value = true
}

function cancelReset() {
  showResetConfirmation.value = false
}

function resetProgress() {
  progressStore.resetProgress()
  showResetConfirmation.value = false
}
</script>

<style scoped>
.progress-container {
  margin: 10px 0;
  position: relative;
}

.progress {
  position: relative;
}

.reset-button {
  position: absolute;
  right: 3px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--danger-color);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  font-size: 12px;
  z-index: 5;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.reset-button:hover {
  transform: translateY(-50%) scale(1.1);
  background-color: var(--danger-color);
}

.reset-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.4);
}

/* Confirmation Modal */
.reset-confirmation-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(3px);
}

.reset-confirmation-dialog {
  background-color: var(--bg-card);
  border-radius: 8px;
  padding: 24px;
  width: 90%;
  max-width: 400px;
  box-shadow: var(--shadow-lg);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.reset-confirmation-dialog h4 {
  margin-top: 0;
  font-size: 1.25rem;
  margin-bottom: 16px;
  color: var(--danger-color);
}

.warning-text {
  color: var(--danger-color);
  font-size: 0.9rem;
  margin-bottom: 20px;
}

.confirmation-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* Responsive styles */
@media (max-width: 576px) {
  .reset-confirmation-dialog {
    padding: 16px;
  }

  .reset-button {
    width: 18px;
    height: 18px;
    font-size: 10px;
  }
}
</style>
