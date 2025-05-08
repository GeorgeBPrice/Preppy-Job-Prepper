// curriculum-shortlist.js - A short version of the course, 20 main concepts.

// Import shortlist curriculum sections
import section from './sections/curriculum-section-shortlist.js'

// Combine all sections into a single curriculum array
export const shortlistCurriculum = [section]

// Export individual sections for direct access if needed
export { section as shortlistPrepper }

// Helper function to get a specific section by index (1-based)
export function getSection(sectionIndex) {
  if (sectionIndex < 1 || sectionIndex > shortlistCurriculum.length) {
    throw new Error(
      `Section ${sectionIndex} does not exist. Valid range: 1-${shortlistCurriculum.length}`,
    )
  }
  return shortlistCurriculum[sectionIndex - 1]
}

// Helper function to get a specific lesson from a section
export function getLesson(sectionIndex, lessonIndex) {
  const section = getSection(sectionIndex)
  if (lessonIndex < 1 || lessonIndex > section.lessons.length) {
    throw new Error(
      `Lesson ${lessonIndex} does not exist in section ${sectionIndex}. Valid range: 1-${section.lessons.length}`,
    )
  }
  return section.lessons[lessonIndex - 1]
}
