import Cookies from 'js-cookie'

export const saveToStorage = (data, key) => {
  try {
    const serialized = JSON.stringify(data)

    // Handle data size - potentially large objects for multiple topics
    try {
      localStorage.setItem(key, serialized)
    } catch (e) {
      // If localStorage fails (e.g., quota exceeded), try to at least save current topic data
      if (data.topicProgress && data.currentTopic) {
        const reducedData = {
          topicProgress: {
            [data.currentTopic]: data.topicProgress[data.currentTopic],
          },
        }
        localStorage.setItem(key, JSON.stringify(reducedData))
      }
      console.warn('Storage quota exceeded, saved limited data', e)
    }

    // Always try cookies as backup, but limit size
    try {
      Cookies.set(key, serialized, { expires: 30 })
    } catch (e) {
      console.warn('Failed to save to cookies', e)
    }

    return true
  } catch (error) {
    console.error('Error saving to storage:', error)
    return false
  }
}

export const loadFromStorage = (key) => {
  try {
    // Try localStorage first
    let data = localStorage.getItem(key)

    // If not in localStorage, try cookies
    if (!data) {
      data = Cookies.get(key)
    }

    // Parse and return the data
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error loading from storage:', error)
    return null
  }
}

export const clearStorage = (key) => {
  try {
    localStorage.removeItem(key)
    Cookies.remove(key)
    return true
  } catch (error) {
    console.error('Error clearing storage:', error)
    return false
  }
}

// New utility functions for topic-specific data

// Save progress for a specific topic only
export const saveTopicProgress = (topic, progressData) => {
  try {
    // Get existing data
    const existingData = loadFromStorage('js_job_review_progress') || { topicProgress: {} }

    // Update just this topic's data
    existingData.topicProgress = existingData.topicProgress || {}
    existingData.topicProgress[topic] = progressData

    // Save back to storage
    return saveToStorage(existingData, 'js_job_review_progress')
  } catch (error) {
    console.error(`Error saving progress for topic ${topic}:`, error)
    return false
  }
}

// Load progress for a specific topic
export const loadTopicProgress = (topic) => {
  try {
    const allData = loadFromStorage('js_job_review_progress')
    if (!allData || !allData.topicProgress) {
      return null
    }

    return allData.topicProgress[topic] || null
  } catch (error) {
    console.error(`Error loading progress for topic ${topic}:`, error)
    return null
  }
}
