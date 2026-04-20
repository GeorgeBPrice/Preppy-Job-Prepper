// scripts/validate-curriculum-ids.mjs
//
// Walks every topic's curriculum, computes stable IDs, and flags problems:
//   - ERROR: sections/lessons missing a title entirely.
//   - WARN:  sibling titles that slugify to the same string (authors should
//            rename or set an explicit `id` to avoid brittle `-2` suffixes).
// Exit 0 on clean + warnings, exit 1 on any error. Wire as a pre-commit /
// CI step to prevent the progress-reorder bug from regressing.

import { pathToFileURL } from 'node:url'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { slugify } from '../src/utils/curriculumIds.js'

const TOPICS = ['javascript', 'csharp', 'typescript', 'react', 'devops', 'ai']
const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '..')

let errorCount = 0
let warnCount = 0

function report(level, topic, message) {
  const tag = level === 'error' ? 'ERROR' : 'WARN '
  if (level === 'error') errorCount++
  else warnCount++
  console.log(`  [${tag}] (${topic}) ${message}`)
}

function scanSiblings(topic, parentLabel, items, childKind) {
  const byBase = new Map()
  items.forEach((item, index) => {
    if (!item || typeof item !== 'object') return
    if (!item.title || typeof item.title !== 'string' || !item.title.trim()) {
      report('error', topic, `${parentLabel}: ${childKind}[${index}] has no title`)
      return
    }
    if (item.id && typeof item.id === 'string' && item.id.trim()) {
      return // explicit id, no collision risk from title
    }
    const base = slugify(item.title) || `${childKind}-${index + 1}`
    const list = byBase.get(base) || []
    list.push({ index, title: item.title })
    byBase.set(base, list)
  })
  for (const [base, list] of byBase.entries()) {
    if (list.length > 1) {
      const titles = list.map((x) => `"${x.title}" (idx ${x.index})`).join(', ')
      report(
        'warn',
        topic,
        `${parentLabel}: ${list.length} ${childKind}s slugify to "${base}" — ${titles}`,
      )
    }
  }
}

async function validateTopic(topic) {
  const moduleUrl = pathToFileURL(
    resolve(REPO_ROOT, 'src', 'data', 'topic', topic, 'curriculum.js'),
  ).href
  let mod
  try {
    mod = await import(moduleUrl)
  } catch (err) {
    report('error', topic, `failed to import curriculum.js — ${err.message}`)
    return
  }

  const curriculum = Array.isArray(mod.curriculum) ? mod.curriculum : []
  if (curriculum.length === 0) {
    report('warn', topic, 'curriculum is empty')
  }

  scanSiblings(topic, 'curriculum', curriculum, 'section')
  curriculum.forEach((section, sectionIndex) => {
    if (!section || typeof section !== 'object') return
    const label = `section[${sectionIndex}]("${section.title || '<untitled>'}")`
    if (Array.isArray(section.lessons)) {
      scanSiblings(topic, label, section.lessons, 'lesson')
    }
  })

  const shortlist = Array.isArray(mod.shortlistCurriculum) ? mod.shortlistCurriculum : []
  scanSiblings(topic, 'shortlistCurriculum', shortlist, 'section')
  shortlist.forEach((section, sectionIndex) => {
    if (!section || typeof section !== 'object') return
    const label = `shortlist[${sectionIndex}]("${section.title || '<untitled>'}")`
    if (Array.isArray(section.lessons)) {
      scanSiblings(topic, label, section.lessons, 'lesson')
    }
  })
}

console.log('Validating curriculum IDs…')
for (const topic of TOPICS) {
  console.log(`\n• ${topic}`)
   
  await validateTopic(topic)
}

console.log(`\nDone. ${errorCount} error(s), ${warnCount} warning(s).`)
process.exit(errorCount > 0 ? 1 : 0)
