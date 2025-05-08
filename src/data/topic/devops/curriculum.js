// curriculum.js - Main file that imports all JavaScript curriculum sections

// Import all curriculum sections
// import section1 from './sections/curriculum-section1.js'
// import ...

// Import shortlist curriculum
import section from './sections/curriculum-section-shortlist.js'

// Combine all sections into a single curriculum array
export const curriculum = [
  // section1,
]

// Export shortlist curriculum
export const shortlistCurriculum = [section]

// Export individual sections for direct access if needed
export //   section1 as reactFundamentals,
 {}

// Helper function to get a specific section by index (1-based)
export function getSection(sectionIndex) {
  if (sectionIndex < 1 || sectionIndex > curriculum.length) {
    throw new Error(`Section ${sectionIndex} does not exist. Valid range: 1-${curriculum.length}`)
  }
  return curriculum[sectionIndex - 1]
}

// Helper function to get a specific shortlist section by index (1-based)
export function getShortlistSection(sectionIndex) {
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
