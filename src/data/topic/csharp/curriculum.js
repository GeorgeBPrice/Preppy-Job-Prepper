// curriculum.js - Main file that imports all JavaScript curriculum sections

// Import all curriculum sections
import section1 from './sections/curriculum-section1.js'
import section2 from './sections/curriculum-section2.js'
import section3 from './sections/curriculum-section3.js'
import section4 from './sections/curriculum-section4.js'
import section5 from './sections/curriculum-section5.js'
import section6 from './sections/curriculum-section6.js'
import section7 from './sections/curriculum-section7.js'
import section8 from './sections/curriculum-section8.js'

// Import shortlist curriculum
import shortlistPrepper from './sections/curriculum-section-shortlist.js'

// Combine all sections into a single curriculum array
export const curriculum = [
  section1,
  section2,
  section3,
  section4,
  section5,
  section6,
  section7,
  section8,
]

// Export shortlist curriculum
export const shortlistCurriculum = [shortlistPrepper]

// Export individual sections for direct access if needed
export {
  section1 as csharpFundamentals,
  section2 as objectOrientedProgramming,
  section3 as advancedCSharpFeatures,
  section4 as memoryManagementAndPerformance,
  section5 as aspNetCoreFundamentals,
  section6 as buildingWebAPIs,
  section7 as dataAccessWithEFCore,
  section8 as dotNetCoreApplicationDevelopment,
}

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
