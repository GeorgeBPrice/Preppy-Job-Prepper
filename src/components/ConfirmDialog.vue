<template>
  <div v-if="show" class="confirm-dialog-backdrop">
    <div class="confirm-dialog">
      <div class="confirm-dialog-content">
        <div class="confirm-dialog-message">
          <slot>{{ message }}</slot>
        </div>
        <div class="confirm-dialog-actions">
          <button class="btn btn-secondary" @click="$emit('cancel')">Cancel</button>
          <button class="btn btn-danger" @click="$emit('confirm')">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// define props jsut for type checking
defineProps({
  show: Boolean,
  message: {
    type: String,
    default: 'Are you sure?',
  },
})
</script>

<style scoped>
.confirm-dialog-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.confirm-dialog {
  background: var(--bg-content, #fff);
  border-radius: 8px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
  min-width: 300px;
  max-width: 90vw;
  padding: 24px 20px 16px 20px;
  z-index: 3100;
}
.confirm-dialog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.confirm-dialog-message {
  margin-bottom: 18px;
  font-size: 1.05rem;
  color: var(--text-color);
  text-align: center;
}
.confirm-dialog-actions {
  display: flex;
  gap: 16px;
}
</style>
