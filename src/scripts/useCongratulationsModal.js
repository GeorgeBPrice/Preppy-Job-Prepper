/**
 * This script provides functionality to display a congratulations modal
 * with a confetti animation when the progressbar reaches 100%. The modal
 * is the component CourseCompletedModal.vue.
 */
import { useThemeStore } from '../theme/theme'
import confetti from 'canvas-confetti'

export default function useCongratulationsModal() {
  // light/dark theme
  useThemeStore()

  const modal = document.getElementById('congratulations-modal')
  modal.classList.add('show')
  modal.style.display = 'block'

  // Add a white 50% background to the entire page behind the modal
  const overlay = document.createElement('div')
  overlay.style.position = 'fixed'
  overlay.style.top = '0'
  overlay.style.left = '0'
  overlay.style.width = '100%'
  overlay.style.height = '100%'
  overlay.style.background = 'var(--bg-congrats)'
  overlay.style.zIndex = '999'
  document.body.appendChild(overlay)

  // we set this new config in local storage, so the congrats dosnt show again.
  localStorage.setItem('congratulated', 'true')

  modal.querySelector('.modal-footer .btn-secondary').addEventListener('click', () => {
    modal.classList.remove('show')
    modal.style.display = 'none'
    overlay.remove()
    localStorage.removeItem('congratulated')
  })
  modal.querySelector('.modal-header .close').addEventListener('click', () => {
    modal.classList.remove('show')
    modal.style.display = 'none'
    overlay.remove()
  })

  confetti({
    particleCount: 500,
    spread: 150,
    origin: { x: 0.5, y: 0.5 },
    colors: ['#FF69B4', '#FFC67D', '#8BC34A'],
    duration: 9000,
    zIndex: 9999,
  })
}
