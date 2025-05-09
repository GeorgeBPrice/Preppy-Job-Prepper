// Applies custom styling to code blocks, called after the DOM loads.
export const applyCustomPrismStyling = () => {
  // This injects a more readable style via JavaScript
  const styleElement = document.createElement('style')
  styleElement.textContent = `
    /* Custom Syntax Highlighting for Improved Readability */
    :root {
      --code-comment: #b3bcc6;
      --code-keyword: #5a67d8;
      --code-function: #3182ce;
      --code-string: #38a169;
      --code-number: #d69e2e;
      --code-operator: #e53e3e;
      --code-variable: #2b6cb0;
      --code-class: #805ad5;
      --code-punctuation: #718096;
      --code-regex: #319795;
      --code-attr-name: #dd6b20;
      --code-attr-value: #38a169;
    }
    
    [data-theme='dark'] {
      --code-comment: #b3bcc6;
      --code-keyword: #7f9cf5;
      --code-function: #63b3ed;
      --code-string: #68d391;
      --code-number: #f6e05e;
      --code-operator: #fc8181;
      --code-variable: #90cdf4;
      --code-class: #b794f4;
      --code-punctuation: #cbd5e0;
      --code-regex: #4fd1c5;
      --code-attr-name: #fbd38d;
      --code-attr-value: #68d391;
    }
    
    /* Tokens styling */
    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: var(--code-comment);
      font-style: italic;
    }
    
    .token.namespace {
      opacity: 0.8;
    }
    
    .token.keyword {
      color: var(--code-keyword);
      font-weight: 600;
    }
    
    .token.function {
      color: var(--code-function);
    }
    
    .token.string {
      color: var(--code-string);
    }
    
    .token.number,
    .token.boolean {
      color: var(--code-number);
    }
    
    .token.operator {
      color: var(--code-operator);
    }
    
    .token.property,
    .token.variable,
    .token.symbol {
      color: var(--code-variable);
    }
    
    .token.selector,
    .token.attr-name,
    .token.builtin {
      color: var(--code-attr-name);
    }
    
    .token.attr-value {
      color: var(--code-attr-value);
    }
    
    .token.entity,
    .token.url,
    .token.regex {
      color: var(--code-regex);
    }
    
    .token.important {
      color: var(--code-operator);
      font-weight: bold;
    }
    
    .token.punctuation {
      color: var(--code-punctuation);
    }

    /* Line highlighting */
    .code-line {
      display: block;
      line-height: 1.5;
      position: relative;
    }
    
    .code-line:not(:last-child) {
      margin-bottom: 3px;
    }
    
    /* Syntax block styling */
    .syntax-block {
      border-left: 3px solid rgba(0,0,0,0.1);
      padding-left: 8px;
      margin: 5px 0;
    }
    
    [data-theme='dark'] .syntax-block {
      border-left-color: rgba(255,255,255,0.1);
    }
    
    .explanation pre {
      position: relative;
    }
  `
  document.head.appendChild(styleElement)
}
