// src/utils/curriculumIds.js
//
// Stable content IDs for curriculum sections, lessons and challenges.
//
// Index-based progress keys silently corrupt when a section or lesson gets
// reordered. Instead of regex-injecting `id` fields into ~60 section files by
// hand, we derive IDs at load time from the slugified title. Collisions are
// deterministically disambiguated in declaration order. Authors can still put
// an explicit `id` in source; that always wins.
//
// Same input (curriculum objects) -> same IDs. Deterministic and idempotent.

const SLUG_CACHE = new WeakMap()
const TOPIC_ID_MAPS = new Map()

export function slugify(value) {
  return (value || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function uniqueSlug(base, seen) {
  const fallback = base || 'item'
  let slug = fallback
  let suffix = 2
  while (seen.has(slug)) {
    slug = `${fallback}-${suffix}`
    suffix++
  }
  seen.add(slug)
  return slug
}

function ensureId(target, base, seen) {
  if (target.id && typeof target.id === 'string') {
    seen.add(target.id)
    return target.id
  }
  const id = uniqueSlug(base, seen)
  Object.defineProperty(target, 'id', {
    value: id,
    enumerable: true,
    writable: false,
    configurable: false,
  })
  return id
}

/**
 * Walk a curriculum array and inject stable IDs on every section, lesson and
 * challenge. Idempotent — subsequent calls are no-ops. Returns an idMap that
 * callers can use to translate 0-based indexes to IDs.
 */
export function augmentCurriculumWithIds(curriculum, topicSlug) {
  if (!Array.isArray(curriculum)) return { sections: [] }
  if (SLUG_CACHE.has(curriculum)) return SLUG_CACHE.get(curriculum)

  const sectionSlugs = new Set()
  const idMap = { topic: topicSlug, sections: [] }

  curriculum.forEach((section, sectionIndex) => {
    if (!section || typeof section !== 'object') return
    const sectionBase = slugify(section.title) || `section-${sectionIndex + 1}`
    const sectionId = ensureId(section, sectionBase, sectionSlugs)

    const lessonSlugs = new Set()
    const sectionEntry = {
      id: sectionId,
      index: sectionIndex,
      lessons: [],
      challengeId: null,
    }

    if (Array.isArray(section.lessons)) {
      section.lessons.forEach((lesson, lessonIndex) => {
        if (!lesson || typeof lesson !== 'object') return
        const lessonBase = slugify(lesson.title) || `lesson-${lessonIndex + 1}`
        const lessonId = ensureId(lesson, lessonBase, lessonSlugs)
        sectionEntry.lessons.push({ id: lessonId, index: lessonIndex })
      })
    }

    if (section.challenge && typeof section.challenge === 'object') {
      const challengeSeen = new Set()
      const challengeBase =
        slugify(section.challenge.title) || `${sectionId}-challenge`
      sectionEntry.challengeId = ensureId(section.challenge, challengeBase, challengeSeen)
    }

    idMap.sections.push(sectionEntry)
  })

  SLUG_CACHE.set(curriculum, idMap)
  if (topicSlug) TOPIC_ID_MAPS.set(topicSlug, idMap)
  return idMap
}

export function getCachedIdMap(topicSlug) {
  return TOPIC_ID_MAPS.get(topicSlug) || null
}

/**
 * Resolve a (sectionIndex, lessonIndex) pair to stable IDs using a
 * previously-computed map. Returns null fields when the map is absent or the
 * indexes don't match. Callers can fall back to index keys when this returns
 * null — that keeps the app working before the curriculum has loaded.
 */
export function resolveIdsFromIndexes(topicSlug, sectionIndex, lessonIndex) {
  const map = TOPIC_ID_MAPS.get(topicSlug)
  if (!map) return { sectionId: null, lessonId: null, challengeId: null }

  const section = map.sections[sectionIndex]
  if (!section) return { sectionId: null, lessonId: null, challengeId: null }

  if (lessonIndex == null) {
    return {
      sectionId: section.id,
      lessonId: null,
      challengeId: section.challengeId,
    }
  }

  const lesson = section.lessons[lessonIndex]
  return {
    sectionId: section.id,
    lessonId: lesson ? lesson.id : null,
    challengeId: section.challengeId,
  }
}

export function clearIdCaches() {
  TOPIC_ID_MAPS.clear()
}
