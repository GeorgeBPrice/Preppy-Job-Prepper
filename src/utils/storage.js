import Cookies from 'js-cookie'

const PROGRESS_STORAGE_KEY = 'js_job_review_progress'
const EXPIRY_DAYS = 30

export const saveToStorage = (data, key = PROGRESS_STORAGE_KEY) => {
  try {
    const serialized = JSON.stringify(data)
    localStorage.setItem(key, serialized)
    Cookies.set(key, serialized, { expires: EXPIRY_DAYS })
    return true
  } catch (error) {
    console.error('Error saving to storage:', error)
    return false
  }
}

export const loadFromStorage = (key = PROGRESS_STORAGE_KEY) => {
  try {
    // Try localStorage first
    let data = localStorage.getItem(key)

    // If not in localStorage, try cookies
    if (!data) {
      data = Cookies.get(key)
    }

    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error loading from storage:', error)
    return null
  }
}

export const clearStorage = (key = PROGRESS_STORAGE_KEY) => {
  try {
    localStorage.removeItem(key)
    Cookies.remove(key)
    return true
  } catch (error) {
    console.error('Error clearing storage:', error)
    return false
  }
}
