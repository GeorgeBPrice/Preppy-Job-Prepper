// src/store/topic.js
import { defineStore } from 'pinia'
import { saveToStorage, loadFromStorage } from '../utils/storage'

export const useTopicStore = defineStore('topic', {
  state: () => ({
    currentTopic: 'javascript',
    availableTopics: [
      { value: 'javascript', label: 'JavaScript' },
      { value: 'csharp', label: 'C# .NET' },
      { value: 'typescript', label: 'TypeScript' },
      { value: 'react', label: 'React' },
      { value: 'devops', label: 'Azure DevOps' },
      { value: 'ai', label: 'AI Concepts' },
    ],
    topicsWithCurriculum: ['javascript', 'csharp', 'ai', 'typescript', 'react', 'devops'],
    isLoaded: false,
  }),

  getters: {
    currentTopicName() {
      const topic = this.availableTopics.find((t) => t.value === this.currentTopic)
      return topic ? topic.label : 'JavaScript'
    },

    topicShortName() {
      // Return abbreviated name for mobile displays
      if (this.currentTopic === 'javascript') return 'JS'
      if (this.currentTopic === 'typescript') return 'TS'
      if (this.currentTopic === 'csharp') return 'C#'
      if (this.currentTopic === 'react') return 'React'
      if (this.currentTopic === 'devops') return 'DevOps'
      if (this.currentTopic === 'ai') return 'AI'

      const topic = this.availableTopics.find((t) => t.value === this.currentTopic)
      return topic ? topic.label.substring(0, 2) : 'JS'
    },

    hasCurriculum() {
      return this.topicsWithCurriculum.includes(this.currentTopic)
    },
  },

  actions: {
    setTopic(topic) {
      this.currentTopic = topic
      this.saveTopicPreference()
    },

    loadTopicPreference() {
      const data = loadFromStorage('js_job_review_topic')
      if (data) {
        this.currentTopic = data.currentTopic || 'javascript'
      }
      this.isLoaded = true
    },

    saveTopicPreference() {
      const data = {
        currentTopic: this.currentTopic,
      }
      saveToStorage(data, 'js_job_review_topic')
    },

    // Add this method to check if curriculum exists for a topic
    async checkTopicCurriculum(topic) {
      try {
        // Try to dynamically import the curriculum
        const module = await import(`../data/topic/${topic}/curriculum.js`)

        // Verify that the module has content
        if (module) {
          // Add to available topics if not already there
          if (!this.topicsWithCurriculum.includes(topic)) {
            this.topicsWithCurriculum.push(topic)
          }
          return true
        } else {
          console.error(`Curriculum for topic ${topic} exists but has invalid format`)
          return false
        }
      } catch (e) {
        try {
          // Try alternative import approach for sections
          const sectionModule = await import(
            `../data/topic/${topic}/sections/curriculum-section1.js`
          )
          if (sectionModule) {
            if (!this.topicsWithCurriculum.includes(topic)) {
              this.topicsWithCurriculum.push(topic)
            }
            return true
          }
        } catch {
          // If both imports fail, the curriculum doesn't exist
          console.error(`Curriculum not found for topic: ${topic}`, e)
          return false
        }
      }
    },

    // Update the initializeTopics method to include default topics
    async initializeTopics() {
      const defaultTopics = ['javascript', 'csharp', 'ai', 'typescript', 'react', 'devops']
      for (const topic of defaultTopics) {
        if (!this.topicsWithCurriculum.includes(topic)) {
          this.topicsWithCurriculum.push(topic)
        }
      }

      // available topics for curriculum
      for (const topic of this.availableTopics) {
        await this.checkTopicCurriculum(topic.value)
      }
    },
  },
})
