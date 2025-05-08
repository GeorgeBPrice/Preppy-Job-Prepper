// src/utils/curriculumLoader.js
import { useTopicStore } from '../store/topic'

// Default curriculum to handle errors gracefully
const defaultCurriculum = {
  curriculum: [],
  shortlistCurriculum: [],
}

/**
 * Dynamically loads curriculum for a specified topic
 * @param {string} topic - The topic to load curriculum for
 * @returns {Promise<object>} - The loaded curriculum data
 */
export async function loadCurriculum(topic) {
  try {
    // Dynamically import the correct curriculum based on topic
    const curriculumModule = await import(`../data/topic/${topic}/curriculum.js`)
    return curriculumModule
  } catch (error) {
    console.error(`Failed to load curriculum for topic: ${topic}`, error)
    return defaultCurriculum
  }
}

/**
 * Gets curriculum for the current topic
 * @returns {Promise<Array>} - The curriculum for the current topic
 */
export async function getCurrentCurriculum() {
  const topicStore = useTopicStore()
  const curriculumData = await loadCurriculum(topicStore.currentTopic)
  return curriculumData.curriculum || []
}

/**
 * Gets shortlist curriculum for the current topic
 * @returns {Promise<Array>} - The shortlist curriculum for the current topic
 */
export async function getCurrentShortlistCurriculum() {
  const topicStore = useTopicStore()
  const curriculumData = await loadCurriculum(topicStore.currentTopic)
  return curriculumData.shortlistCurriculum || []
}

/**
 * Gets interview questions for the current topic
 * @returns {Promise<Array>} - The interview questions for the current topic
 */
export async function getCurrentInterviewQuestions() {
  const topicStore = useTopicStore()
  try {
    // Dynamically import the interview questions for the current topic
    const questionsModule = await import(
      `../data/topic/${topicStore.currentTopic}/interviewQuestions.js`
    )
    return questionsModule.default || []
  } catch (error) {
    console.error(`Failed to load interview questions for topic: ${topicStore.currentTopic}`, error)
    return []
  }
}

/**
 * Gets a specific section for the current topic
 * @param {number} sectionId - The section ID (1-based)
 * @returns {Promise<object>} - The section object
 */
export async function getSection(sectionId) {
  const topicStore = useTopicStore()
  try {
    const curriculumData = await loadCurriculum(topicStore.currentTopic)

    // The getSection function from the imported module
    if (curriculumData.getSection) {
      return curriculumData.getSection(sectionId)
    }

    // Fallback if getSection doesn't exist: direct access to curriculum array
    if (
      curriculumData.curriculum &&
      sectionId > 0 &&
      sectionId <= curriculumData.curriculum.length
    ) {
      return curriculumData.curriculum[sectionId - 1]
    }

    throw new Error(`Section ${sectionId} not found in ${topicStore.currentTopic} curriculum`)
  } catch (error) {
    console.error(`Failed to get section ${sectionId} for topic: ${topicStore.currentTopic}`, error)
    throw error
  }
}

/**
 * Gets a specific shortlist section for the current topic
 * @param {number} sectionId - The section ID (1-based)
 * @returns {Promise<object>} - The shortlist section object
 */
export async function getShortlistSection(sectionId) {
  const topicStore = useTopicStore()
  try {
    const curriculumData = await loadCurriculum(topicStore.currentTopic)

    // The getShortlistSection function from the imported module
    if (curriculumData.getShortlistSection) {
      return curriculumData.getShortlistSection(sectionId)
    }

    // Fallback if getShortlistSection doesn't exist
    if (
      curriculumData.shortlistCurriculum &&
      sectionId > 0 &&
      sectionId <= curriculumData.shortlistCurriculum.length
    ) {
      return curriculumData.shortlistCurriculum[sectionId - 1]
    }

    throw new Error(
      `Shortlist section ${sectionId} not found in ${topicStore.currentTopic} curriculum`,
    )
  } catch (error) {
    console.error(
      `Failed to get shortlist section ${sectionId} for topic: ${topicStore.currentTopic}`,
      error,
    )
    throw error
  }
}

/**
 * Gets a specific lesson for the current topic
 * @param {number} sectionId - The section ID (1-based)
 * @param {number} lessonId - The lesson ID (1-based)
 * @returns {Promise<object>} - The lesson object
 */
export async function getLesson(sectionId, lessonId) {
  const topicStore = useTopicStore()
  try {
    const curriculumData = await loadCurriculum(topicStore.currentTopic)

    // The getLesson function from the imported module
    if (curriculumData.getLesson) {
      return curriculumData.getLesson(sectionId, lessonId)
    }

    // Fallback if getLesson doesn't exist
    if (
      curriculumData.curriculum &&
      sectionId > 0 &&
      sectionId <= curriculumData.curriculum.length &&
      lessonId > 0 &&
      lessonId <= curriculumData.curriculum[sectionId - 1].lessons.length
    ) {
      return curriculumData.curriculum[sectionId - 1].lessons[lessonId - 1]
    }

    throw new Error(
      `Lesson ${lessonId} in section ${sectionId} not found in ${topicStore.currentTopic} curriculum`,
    )
  } catch (error) {
    console.error(
      `Failed to get lesson ${lessonId} in section ${sectionId} for topic: ${topicStore.currentTopic}`,
      error,
    )
    throw error
  }
}
