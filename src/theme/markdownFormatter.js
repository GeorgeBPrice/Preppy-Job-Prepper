/**
 * Formats markdown text for optimal display
 * Uses regex to transform markdown elements into styled HTML
 */

import Prism from 'prismjs'

/**
 * Format markdown with proper styling
 */
export const formatMarkdown = (markdown) => {
  if (!markdown) return ''

  let formatted = markdown

  // Process code blocks first (to avoid processing markdown inside code blocks)
  formatted = formatCodeBlocks(formatted)

  // Simple graphics
  formatted = formatGraphics(formatted)

  // Format headers
  formatted = formatHeaders(formatted)

  // Format lists
  formatted = formatLists(formatted)

  // Format bold and italic text
  formatted = formatEmphasis(formatted)

  // Format horizontal rules
  formatted = formatted.replace(/^\s*---\s*$/gm, '<hr class="md-hr">')

  // Format single backtick code
  formatted = formatInlineCode(formatted)

  // Format blockquotes
  formatted = formatBlockquotes(formatted)

  // Format automatic links
  formatted = formatLinks(formatted)

  // Convert newlines to <br> in paragraphs
  formatted = formatParagraphs(formatted)

  return formatted
}

/**
 * Process custom graphic tags
 */
function formatGraphics(text) {
  return text.replace(
    /<graphic type="([^"]+)" title="([^"]+)">([\s\S]*?)<\/graphic>/g,
    (match, type, title, content) => {
      const items =
        content.match(/<item label="([^"]+)" color="([^"]+)" (?:size|width)="([^"]+)"\/>/g) || []
      const graphicItems = items.map((item) => {
        const [, label, color, dimension] = item.match(
          /label="([^"]+)" color="([^"]+)" (?:size|width)="([^"]+)"/,
        )
        return { label, color, dimension }
      })

      if (type === 'circle-diagram') {
        return `
          <div class="graphic-circle-diagram">
            <h5>${title}</h5>
            <div class="circles">
              ${graphicItems
                .map(
                  (item) => `
                <div class="circle" style="background: ${item.color}; width: ${item.dimension}; height: ${item.dimension};">
                  <span>${item.label}</span>
                </div>
              `,
                )
                .join('')}
            </div>
          </div>
        `
      } else if (type === 'bar-diagram') {
        return `
          <div class="graphic-bar-diagram">
            <h5>${title}</h5>
            <div class="bars">
              ${graphicItems
                .map(
                  (item) => `
                <div class="bar" style="background: ${item.color}; width: ${item.dimension};">
                  <span>${item.label}</span>
                </div>
              `,
                )
                .join('')}
            </div>
          </div>
        `
      } else if (type === 'nested-circles') {
        return `
          <div class="graphic-nested-circles">
            <h5>${title}</h5>
            <div class="nested-circles-container">
              ${graphicItems
                .map(
                  (item, i) => `
                <div class="nested-circle" style="background: ${item.color}; width: ${item.dimension}; height: ${item.dimension}; z-index: ${graphicItems.length - i};">
                  <span>${item.label}</span>
                </div>
              `,
                )
                .join('')}
            </div>
          </div>
        `
      }
      return `<p>Unsupported graphic type: ${type}</p>`
    },
  )
}
/**
 * Format code blocks with syntax highlighting
 */
const formatCodeBlocks = (text) => {
  return text.replace(/```([\w-]*)\n([\s\S]+?)\n```/g, (match, language, code) => {
    language = language.trim().toLowerCase()

    // Map some common language aliases
    const languageMap = {
      js: 'javascript',
      ts: 'typescript',
      py: 'python',
      rb: 'ruby',
      csharp: 'cs',
      'c#': 'cs',
    }

    if (languageMap[language]) {
      language = languageMap[language]
    }

    // Default to javascript if no language is specified
    if (!language) language = 'javascript'

    // Apply syntax highlighting if Prism supports this language
    try {
      if (Prism.languages[language]) {
        const highlighted = Prism.highlight(code.trim(), Prism.languages[language], language)

        return `<pre class="language-${language} scrollable-code"><code class="language-${language}">${highlighted}</code></pre>`
      }
    } catch (e) {
      console.warn('Error highlighting code:', e)
    }

    // Fallback to plain code block
    return `<pre class="scrollable-code"><code>${escapeHtml(code.trim())}</code></pre>`
  })
}

/**
 * Format headers (h1, h2, h3, etc.)
 */
const formatHeaders = (text) => {
  // H1 through H6
  return text
    .replace(/^# (.*?)$/gm, '<h1 class="md-h1">$1</h1>')
    .replace(/^## (.*?)$/gm, '<h2 class="md-h2">$1</h2>')
    .replace(/^### (.*?)$/gm, '<h3 class="md-h3">$1</h3>')
    .replace(/^#### (.*?)$/gm, '<h4 class="md-h4">$1</h4>')
    .replace(/^##### (.*?)$/gm, '<h5 class="md-h5">$1</h5>')
    .replace(/^###### (.*?)$/gm, '<h6 class="md-h6">$1</h6>')
}

/**
 * Format ordered and unordered lists
 */
const formatLists = (text) => {
  let formatted = text

  // Process unordered lists
  let unorderedMatches = formatted.match(/(?:^|\n)((?:- .+?\n)+)/g)
  if (unorderedMatches) {
    unorderedMatches.forEach((match) => {
      const listItems = match
        .trim()
        .split('\n')
        .map((item) => {
          return `<li class="md-li">${item.substring(2)}</li>`
        })
        .join('')

      const list = `<ul class="md-ul">${listItems}</ul>`
      formatted = formatted.replace(match, list)
    })
  }

  // Process ordered lists
  let orderedMatches = formatted.match(/(?:^|\n)((?:\d+\. .+?\n)+)/g)
  if (orderedMatches) {
    orderedMatches.forEach((match) => {
      const listItems = match
        .trim()
        .split('\n')
        .map((item) => {
          // Extract the text after the number and period
          return `<li class="md-li">${item.replace(/^\d+\.\s*/, '')}</li>`
        })
        .join('')

      const list = `<ol class="md-ol">${listItems}</ol>`
      formatted = formatted.replace(match, list)
    })
  }

  return formatted
}

/**
 * Format emphasis (bold, italic)
 */
const formatEmphasis = (text) => {
  // Bold (double asterisks or double underscores)
  let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong class="md-strong">$1</strong>')
  formatted = formatted.replace(/__(.*?)__/g, '<strong class="md-strong">$1</strong>')

  // Italic (single asterisk or single underscore)
  formatted = formatted.replace(/\*(.*?)\*/g, '<em class="md-em">$1</em>')
  formatted = formatted.replace(/_(.*?)_/g, '<em class="md-em">$1</em>')

  return formatted
}

/**
 * Format inline code snippets
 */
const formatInlineCode = (text) => {
  return text.replace(/`([^`]+)`/g, '<code class="md-inline-code">$1</code>')
}

/**
 * Format blockquotes
 */
const formatBlockquotes = (text) => {
  // Find all blockquotes
  const blockquoteRegex = /(^>.*(\n>.*)*)/gm
  let match
  let formatted = text

  while ((match = blockquoteRegex.exec(text)) !== null) {
    const blockquote = match[0]
    const content = blockquote
      .split('\n')
      .map((line) => line.substring(1).trim())
      .join(' ')

    formatted = formatted.replace(
      blockquote,
      `<blockquote class="md-blockquote">${content}</blockquote>`,
    )
  }

  return formatted
}

/**
 * Format links
 */
const formatLinks = (text) => {
  // Markdown links [text](url)
  let formatted = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="md-link" target="_blank" rel="noopener noreferrer">$1</a>',
  )

  // Auto-linked URLs
  formatted = formatted.replace(
    /(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g,
    '<a href="$1" class="md-link" target="_blank" rel="noopener noreferrer">$1</a>',
  )

  return formatted
}

/**
 * Format paragraphs with proper spacing
 */
const formatParagraphs = (text) => {
  // First, split by double newlines (paragraph breaks)
  const paragraphs = text.split(/\n\n+/)

  return paragraphs
    .map((p) => {
      // Skip if this is already an HTML element
      if (p.trim().startsWith('<')) return p

      // Convert single newlines to <br> within a paragraph
      const withLineBreaks = p.replace(/\n/g, '<br>')

      // Wrap in paragraph tags if not already a special element
      if (!withLineBreaks.match(/^<(h[1-6]|ul|ol|blockquote|pre|hr)/)) {
        return `<p class="md-p">${withLineBreaks}</p>`
      }

      return withLineBreaks
    })
    .join('\n\n')
}

/**
 * Escape HTML in text
 */
const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
