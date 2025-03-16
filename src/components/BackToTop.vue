<template>
  <div class="back-to-top" :class="{ show: showButton }" @click="scrollToTop" title="Back to top">
    <i class="bi bi-arrow-up-circle-fill"></i>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showButton = ref(false)

const checkScroll = () => {
  showButton.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-gradient);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 999;
  box-shadow: var(--shadow-md);
}

.back-to-top:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}

.back-to-top.show {
  opacity: 1;
  visibility: visible;
}

.back-to-top i {
  font-size: 24px;
  color: var(--text-light);
}
</style>
