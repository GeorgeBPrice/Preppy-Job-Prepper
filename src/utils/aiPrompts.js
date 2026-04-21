// src/utils/aiPrompts.js
//
// Named prompt templates for the lesson quick-action buttons (see §3.2 of
// AI_CHATBOT_AUDIT_&_IMPROVEMENTS.md). Each template receives a context object
// and returns the user-visible message string that gets pushed through the
// chat store. Keep templates short and deterministic — the user sees them
// appear as their own message in the chat thread.
//
// Lesson context is wrapped in <lesson_context> tags via promptBuilder.js so
// the model treats the lesson excerpt as untrusted data rather than
// instructions — consistent with the defense-in-depth policy enforced in
// buildChatSystemPrompt.

import { wrapLessonContext } from './promptBuilder'

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

function lessonBlock(ctx) {
  return wrapLessonContext({
    topic: ctx.topic,
    sectionTitle: ctx.sectionTitle,
    lessonTitle: ctx.lessonTitle,
    subsectionTitle: ctx.subsectionTitle,
    excerpt: clip(stripHtml(ctx.explanation)),
  })
}

export const LESSON_QUICK_ACTIONS = [
  {
    id: 'ask',
    label: 'Ask questions',
    icon: 'bi-chat-dots',
    build(ctx) {
      return `I'd like to ask you questions about the specific lesson block below. Please keep every answer scoped strictly to this content — do not branch into unrelated topics or add material that isn't grounded in the block. Acknowledge briefly, then wait for my first question.

${lessonBlock(ctx)}`
    },
  },
  {
    id: 'simpler',
    label: 'Explain simpler',
    icon: 'bi-zoom-out',
    build(ctx) {
      return `Please re-explain the concept in the lesson block below for a complete beginner — shorter sentences, plain language, skip jargon, and lean on everyday analogies. Do NOT include any code samples or code blocks in your response; keep it purely written prose.

${lessonBlock(ctx)}`
    },
  },
  {
    id: 'examples',
    label: 'More examples',
    icon: 'bi-braces',
    build(ctx) {
      return `Please give 2–3 fresh, runnable code examples that illustrate the concept in the lesson block below. Keep each example small and annotate key lines with short comments.

${lessonBlock(ctx)}`
    },
  },
  {
    id: 'quiz',
    label: 'Quiz me',
    icon: 'bi-question-circle',
    build(ctx) {
      return `Quiz me on the concept in the lesson block below. Ask 5 short questions one at a time, wait for my answer between each, then grade me at the end with a concise rubric.

${lessonBlock(ctx)}`
    },
  },
  {
    id: 'practice',
    label: 'Practice problem',
    icon: 'bi-lightning-charge',
    build(ctx) {
      return `Generate a small practice problem that targets the concept in the lesson block below. Include: the problem statement, any starter code, 2–3 test cases, and — hidden at the end inside a <details> block — a worked solution.

${lessonBlock(ctx)}`
    },
  },
]
