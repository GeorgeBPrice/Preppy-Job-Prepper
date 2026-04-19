// src/utils/aiPrompts.js
//
// Named prompt templates for the lesson quick-action buttons (see §3.2 of
// AUDIT_REVIEW_AND_REVISED_PLAN.md). Each template receives a context object
// and returns the user-visible message string that gets pushed through the
// chat store. Keep templates short and deterministic — the user sees them
// appear as their own message in the chat thread.

function stripHtml(html) {
  if (!html) return ''
  const tmp = typeof document !== 'undefined' ? document.createElement('div') : null
  if (tmp) {
    tmp.innerHTML = html
    return (tmp.textContent || tmp.innerText || '').trim()
  }
  return String(html).replace(/<[^>]*>/g, '').trim()
}

function clip(text, max = 1400) {
  const t = (text || '').toString().trim()
  if (t.length <= max) return t
  return t.slice(0, max).trimEnd() + '…'
}

function header(ctx) {
  const bits = []
  if (ctx.topic) bits.push(ctx.topic)
  if (ctx.sectionTitle) bits.push(`Section: ${ctx.sectionTitle}`)
  if (ctx.lessonTitle) bits.push(`Lesson: ${ctx.lessonTitle}`)
  if (ctx.subsectionTitle) bits.push(`Subsection: ${ctx.subsectionTitle}`)
  return bits.join(' | ')
}

function body(ctx) {
  const plain = stripHtml(ctx.explanation)
  return clip(plain)
}

export const LESSON_QUICK_ACTIONS = [
  {
    id: 'simpler',
    label: 'Explain simpler',
    icon: 'bi-emoji-smile',
    build(ctx) {
      return `Please re-explain the following concept for a beginner — shorter sentences, concrete examples, skip jargon.

${header(ctx)}

---
${body(ctx)}`
    },
  },
  {
    id: 'deeper',
    label: 'Explain deeper',
    icon: 'bi-zoom-in',
    build(ctx) {
      return `Please go deeper on the following concept — edge cases, common gotchas, how experienced ${ctx.topic || 'engineers'} reason about it, and how it tends to come up in interviews.

${header(ctx)}

---
${body(ctx)}`
    },
  },
  {
    id: 'examples',
    label: 'More examples',
    icon: 'bi-braces',
    build(ctx) {
      return `Please give 2–3 fresh, runnable code examples that illustrate the following concept. Keep each example small and annotate key lines with short comments.

${header(ctx)}

---
${body(ctx)}`
    },
  },
  {
    id: 'quiz',
    label: 'Quiz me',
    icon: 'bi-question-circle',
    build(ctx) {
      return `Quiz me on the following concept. Ask 5 short questions one at a time, wait for my answer between each, then grade me at the end with a concise rubric.

${header(ctx)}

---
${body(ctx)}`
    },
  },
  {
    id: 'practice',
    label: 'Practice problem',
    icon: 'bi-lightning-charge',
    build(ctx) {
      return `Generate a small practice problem that targets the following concept. Include: the problem statement, any starter code, 2–3 test cases, and — hidden at the end inside a <details> block — a worked solution.

${header(ctx)}

---
${body(ctx)}`
    },
  },
]
