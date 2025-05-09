<template>
  <div>
    <!-- Modal Trigger Button -->
    <button @click="openModal" class="btn btn-link terms-link p-0" type="button">
      Terms and Conditions
    </button>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="terms-modal"
      @click="closeModalOnBackgroundClick"
      :class="{ 'dark-mode': isDarkMode }"
    >
      <div class="terms-modal-content" @click.stop>
        <div class="terms-modal-header">
          <h3>Terms and Conditions for AI Code Review</h3>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="terms-modal-body">
          <div class="terms-text">
            <h4>1. ACCEPTANCE OF TERMS</h4>
            <p>
              By accessing and using the AI Code Review feature ("Service"), you agree to be bound
              by these Terms and Conditions ("Terms"). If you do not agree to these Terms, do not
              use the Service.
            </p>

            <h4>2. DESCRIPTION OF SERVICE</h4>
            <p>
              The Service allows you to submit your programming code to third-party artificial
              intelligence services using your own API keys for the purpose of receiving feedback
              and suggestions.
            </p>

            <h4>3. YOUR RESPONSIBILITIES</h4>
            <p>
              3.1 <strong>API Keys</strong>: You are solely responsible for obtaining, managing, and
              securing your API keys for third-party services. We do not provide any API keys.
            </p>
            <p>
              3.2 <strong>Code Submission</strong>: You acknowledge that any code you submit through
              the Service will be transmitted to third-party services and may be stored, processed,
              and analyzed by those services according to their own terms and privacy policies.
            </p>
            <p>
              3.3 <strong>Compliance</strong>: You agree to comply with all applicable third-party
              terms of service when using their APIs through our Service.
            </p>

            <h4>4. DATA STORAGE</h4>
            <p>
              4.1 <strong>Local Storage</strong>: Your API keys, settings, and responses are stored
              locally in your browser's localStorage and are not transmitted to our servers.
            </p>
            <p>
              4.2 <strong>Data Security</strong>: While we implement reasonable security measures
              within the application, we cannot guarantee the security of data stored in your
              browser's localStorage or transmitted to third-party services.
            </p>

            <h4>5. DISCLAIMER OF WARRANTIES</h4>
            <p>
              5.1 THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY
              KIND, EXPRESS OR IMPLIED.
            </p>
            <p>
              5.2 WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR
              ERROR-FREE, OR THAT ANY CONTENT, INCLUDING FEEDBACK FROM AI SERVICES, WILL BE ACCURATE
              OR RELIABLE.
            </p>
            <p>
              5.3 WE DO NOT MAKE ANY WARRANTIES REGARDING THE THIRD-PARTY AI SERVICES THAT YOU
              ACCESS THROUGH OUR APPLICATION.
            </p>

            <h4>6. LIMITATION OF LIABILITY</h4>
            <p>
              6.1 TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION,
              LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
            </p>
            <p>
              (a) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE;<br />
              (b) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE;<br />
              (c) ANY CONTENT OBTAINED FROM THE SERVICE; AND<br />
              (d) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT.
            </p>

            <h4>7. API USAGE AND COSTS</h4>
            <p>
              7.1 You are solely responsible for any costs, fees, or charges associated with your
              use of third-party API services.
            </p>
            <p>
              7.2 We are not responsible for any charges you may incur as a result of using your API
              keys with our Service.
            </p>

            <h4>8. CHANGES TO TERMS</h4>
            <p>
              We reserve the right to modify these Terms at any time. We will provide notice of
              significant changes to the Terms by posting the new Terms within the application.
            </p>

            <h4>9. GOVERNING LAW</h4>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the
              jurisdiction in which the Service operator is established, without regard to its
              conflict of law provisions.
            </p>
          </div>
        </div>
        <div class="terms-modal-footer">
          <button @click="acceptTerms" class="btn btn-primary">
            <i class="bi bi-check-circle me-1"></i> I Accept
          </button>
          <button @click="closeModal" class="btn btn-outline-secondary">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAIStore } from '../store/ai'

const showModal = ref(false)
const aiStore = useAIStore()

// Check if dark mode is active
const isDarkMode = computed(() => {
  if (typeof document !== 'undefined') {
    return (
      document.documentElement.getAttribute('data-theme') === 'dark' ||
      document.body.classList.contains('dark-mode')
    )
  }
  return false
})

// Open modal
const openModal = () => {
  showModal.value = true
  document.body.style.overflow = 'hidden' // Prevent scrolling when modal is open
}

// Close modal
const closeModal = () => {
  showModal.value = false
  document.body.style.overflow = '' // Restore scrolling
}

// Close modal when clicking outside
const closeModalOnBackgroundClick = (event) => {
  if (event.target.classList.contains('terms-modal')) {
    closeModal()
  }
}

// Accept terms and notify user
const acceptTerms = () => {
  aiStore.acceptTerms()

  // Emit an event that can be listened to by parent components
  const event = new CustomEvent('terms-accepted', {
    bubbles: true,
    detail: { accepted: true },
  })
  document.dispatchEvent(event)

  closeModal()
}
</script>

<style scoped>
.terms-link {
  font-size: 0.85rem;
  text-decoration: underline;
  color: var(--primary-color);
  font-weight: 500;
}

.terms-link:hover {
  color: var(--primary-color-dark);
  text-decoration: underline;
}

.terms-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  padding: 1rem;
}

.terms-modal-content {
  background-color: var(--bg-card);
  border-radius: 8px;
  box-shadow: var(--shadow-lg);
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.terms-modal-header {
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-content);
}

.terms-modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
}

.terms-modal-body {
  padding: 1rem;
  overflow-y: auto;
  flex: 1;
  background-color: var(--bg-card);
}

.terms-text {
  line-height: 1.5;
}

.terms-text h4 {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text-color);
}

.terms-text h4:first-child {
  margin-top: 0;
}

.terms-text p {
  margin-bottom: 1rem;
  color: var(--text-color);
}

.terms-modal-footer {
  padding: 1rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  background-color: var(--bg-content);
}

/* Dark mode specific styles */
.dark-mode .terms-modal-content {
  background-color: var(--bg-card);
  color: var(--text-color);
}

.btn-close {
  background: transparent;
  border: none;
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  padding: 0.25rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-close:hover {
  color: var(--text-color);
}

@media (max-width: 576px) {
  .terms-modal-content {
    width: 95%;
    max-height: 95vh;
  }

  .terms-modal-header h3 {
    font-size: 1.1rem;
  }

  .terms-text h4 {
    font-size: 1rem;
  }
}
</style>
