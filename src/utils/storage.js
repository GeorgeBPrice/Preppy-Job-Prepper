import Cookies from 'js-cookie'

// Cookies have a ~4 KB per-cookie hard cap. Writing anything larger silently
// fails, so the previous "always back up to a cookie" behavior was a no-op
// for any realistic progress blob. We now only write a cookie when the
// payload comfortably fits.
const COOKIE_SIZE_LIMIT_BYTES = 3072

export const saveToStorage = (data, key) => {
  try {
    const serialized = JSON.stringify(data)

    try {
      localStorage.setItem(key, serialized)
    } catch (e) {
      // If localStorage fails (typically quota exceeded), try to at least save
      // current topic data so the user doesn't lose all of it.
      if (data && data.topicProgress && data.currentTopic) {
        const reducedData = {
          topicProgress: {
            [data.currentTopic]: data.topicProgress[data.currentTopic],
          },
        }
        try {
          localStorage.setItem(key, JSON.stringify(reducedData))
        } catch (innerErr) {
          console.warn('Storage quota exceeded; could not persist progress', innerErr)
        }
      } else {
        console.warn('Storage quota exceeded; could not persist data for key', key, e)
      }
    }

    // Cookie backup: only for small payloads (topic prefs, theme, etc.). Skip
    // silently for anything that would bust the 4 KB cookie cap.
    if (serialized.length <= COOKIE_SIZE_LIMIT_BYTES) {
      try {
        Cookies.set(key, serialized, { expires: 30, sameSite: 'Lax' })
      } catch (e) {
        console.warn('Failed to save cookie backup for key', key, e)
      }
    }

    return true
  } catch (error) {
    console.error('Error saving to storage:', error)
    return false
  }
}

export const loadFromStorage = (key) => {
  try {
    let data = localStorage.getItem(key)

    if (!data) {
      data = Cookies.get(key)
    }

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
