// src/utils/aiProviders.js
//
// Single source of truth for AI provider catalogue.
// Replaces the four parallel catalogues that used to live in:
//   - src/utils/aiChatService.js (API_ENDPOINTS + CHAT_MODEL_MAPPINGS)
//   - src/utils/aiService.js      (API_ENDPOINTS + MODEL_MAPPINGS)
//   - src/store/aiChat.js         (availableProviders + providerEndpoints getters)
//   - src/store/ai.js             (availableProviders + providerEndpoints getters)
//
// This file owns TRANSPORT-LAYER facts only: endpoint URL, model ID, family,
// auth header shape, streaming support, cost tier. It does NOT hold system
// prompts, refusals, or per-feature policy — that lives in promptBuilder.js.
//
// Adding a new provider: add one entry to PROVIDERS. The derived helpers
// (API_ENDPOINTS, MODEL_MAPPINGS, availableProviders) update automatically.
// Request-shaping dispatch happens via `family` (see aiChatService.js /
// aiService.js). Never reintroduce `provider.startsWith('claude')` — that
// breaks the moment someone names a model 'claude-compatible' or similar.
//
// Last verified against provider docs: 2026-04-21.
// Model IDs rot quickly. When you touch this file for any reason, spot-check
// a handful of entries against each provider's public model list and bump
// the date above. Stale IDs silently route to legacy snapshots or 404.

// Family values drive request/response shaping. Keep this list short —
// anything OpenAI-shape goes into 'openai-compat'.
//   claude         → Anthropic Messages API (top-level `system`)
//   openai         → OpenAI /v1/chat/completions
//   openai-compat  → OpenAI-compatible shape (DeepSeek, Grok, Together, Mistral, Qwen compat mode)
//   gemini         → Google Gen AI (uses `system_instruction` + `contents`)
//   cohere         → Cohere /v1/chat (preamble + chat_history + message)
//   ollama         → Local Ollama /api/generate (flattened prompt)
//   custom         → user-defined endpoint + headers
const AUTH = {
  ANTHROPIC: 'anthropic', // x-api-key + anthropic-version
  BEARER: 'bearer', // Authorization: Bearer <key>
  GOOGLE: 'google', // x-goog-api-key
  COHERE: 'cohere', // Authorization: Bearer <key>
  NONE: 'none', // no auth (Ollama)
  CUSTOM: 'custom', // user-provided JSON headers
}

// ---------------------------------------------------------------------------
// PROVIDERS — the catalogue.
//
// For each entry:
//   label              — human-readable name for the dropdown
//   family             — dispatch family (see comment block above)
//   endpoint           — base URL used in dev; in prod the proxy forwards here
//   model              — exact model ID sent in the request body
//   authHeader         — AUTH.* constant
//   supportsStreaming  — whether SSE/chunked streaming is expected to work
//   requiresApiKey     — false for Ollama
//   devOnly            — true entries are hidden from the prod dropdown
//   classifierSibling  — key of a cheap sibling model in the SAME family,
//                        used by §5 classifier stage; null if none available
//   costTier           — 'low' | 'medium' | 'high' — rough hint for UI badges
//   deprecated         — true entries are hidden from the dropdown but still
//                        resolve (backward-compat for stored user settings)
//   replacedBy         — when deprecated, which key to migrate to
// ---------------------------------------------------------------------------
export const PROVIDERS = {
  // ========== Anthropic Claude ==========
  'claude-opus-4-7': {
    label: 'Claude Opus 4.7',
    family: 'claude',
    endpoint: 'https://api.anthropic.com/v1/messages',
    model: 'claude-opus-4-7',
    authHeader: AUTH.ANTHROPIC,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: 'claude-haiku-4-5',
    costTier: 'high',
  },
  'claude-sonnet-4-6': {
    label: 'Claude Sonnet 4.6',
    family: 'claude',
    endpoint: 'https://api.anthropic.com/v1/messages',
    model: 'claude-sonnet-4-6',
    authHeader: AUTH.ANTHROPIC,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: 'claude-haiku-4-5',
    costTier: 'medium',
  },
  'claude-haiku-4-5': {
    label: 'Claude Haiku 4.5',
    family: 'claude',
    endpoint: 'https://api.anthropic.com/v1/messages',
    model: 'claude-haiku-4-5-20251001',
    authHeader: AUTH.ANTHROPIC,
    supportsStreaming: true,
    requiresApiKey: true,
    // Haiku is itself the cheap sibling — no cheaper Claude.
    classifierSibling: null,
    costTier: 'low',
  },
  'claude-3-7-sonnet': {
    label: 'Claude 3.7 Sonnet',
    family: 'claude',
    endpoint: 'https://api.anthropic.com/v1/messages',
    model: 'claude-3-7-sonnet-20250219',
    authHeader: AUTH.ANTHROPIC,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: 'claude-3-haiku',
    costTier: 'medium',
  },
  'claude-3-5-sonnet': {
    label: 'Claude 3.5 Sonnet',
    family: 'claude',
    endpoint: 'https://api.anthropic.com/v1/messages',
    model: 'claude-3-5-sonnet-20241022',
    authHeader: AUTH.ANTHROPIC,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: 'claude-3-haiku',
    costTier: 'medium',
  },
  'claude-3-opus': {
    label: 'Claude 3 Opus',
    family: 'claude',
    endpoint: 'https://api.anthropic.com/v1/messages',
    model: 'claude-3-opus-20240229',
    authHeader: AUTH.ANTHROPIC,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: 'claude-3-haiku',
    costTier: 'high',
  },
  'claude-3-haiku': {
    label: 'Claude 3 Haiku',
    family: 'claude',
    endpoint: 'https://api.anthropic.com/v1/messages',
    model: 'claude-3-haiku-20240307',
    authHeader: AUTH.ANTHROPIC,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: null,
    costTier: 'low',
  },
  // Deprecated Claude 4 placeholders — stored settings migrate forward.
  'claude-opus-4': {
    label: 'Claude Opus 4 (deprecated)',
    family: 'claude',
    endpoint: 'https://api.anthropic.com/v1/messages',
    model: 'claude-opus-4-7',
    authHeader: AUTH.ANTHROPIC,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: 'claude-haiku-4-5',
    costTier: 'high',
    deprecated: true,
    replacedBy: 'claude-opus-4-7',
  },
  'claude-sonnet-4': {
    label: 'Claude Sonnet 4 (deprecated)',
    family: 'claude',
    endpoint: 'https://api.anthropic.com/v1/messages',
    model: 'claude-sonnet-4-6',
    authHeader: AUTH.ANTHROPIC,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: 'claude-haiku-4-5',
    costTier: 'medium',
    deprecated: true,
    replacedBy: 'claude-sonnet-4-6',
  },

  // ========== OpenAI ==========
  'gpt-5': {
    label: 'GPT-5',
    family: 'openai',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-5',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: 'gpt-5-mini',
    costTier: 'high',
  },
  'gpt-5-mini': {
    label: 'GPT-5 Mini',
    family: 'openai',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-5-mini',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: null,
    costTier: 'low',
  },
  'gpt-4.1': {
    label: 'GPT-4.1',
    family: 'openai',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4.1',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: 'gpt-4o-mini',
    costTier: 'medium',
  },
  'gpt-4o': {
    label: 'GPT-4o',
    family: 'openai',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: 'gpt-4o-mini',
    costTier: 'medium',
  },
  'gpt-4o-mini': {
    label: 'GPT-4o Mini',
    family: 'openai',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o-mini',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: null,
    costTier: 'low',
  },
  'gpt-4': {
    label: 'GPT-4 Turbo',
    family: 'openai',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4-turbo',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: 'gpt-4o-mini',
    costTier: 'high',
  },
  'gpt-3.5-turbo': {
    label: 'GPT-3.5 Turbo',
    family: 'openai',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-3.5-turbo',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: null,
    costTier: 'low',
  },
  // OpenAI reasoning models
  o3: {
    label: 'o3',
    family: 'openai',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'o3',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: 'o4-mini',
    costTier: 'high',
  },
  'o4-mini': {
    label: 'o4-mini',
    family: 'openai',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'o4-mini',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: null,
    costTier: 'medium',
  },
  o1: {
    label: 'o1',
    family: 'openai',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'o1',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: 'o4-mini',
    costTier: 'high',
  },
  // Deprecated OpenAI aliases — stored settings migrate forward.
  'gpt-3.5': {
    label: 'GPT-3.5 (deprecated)',
    family: 'openai',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-3.5-turbo',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: null,
    costTier: 'low',
    deprecated: true,
    replacedBy: 'gpt-3.5-turbo',
  },
  'gpt-4.5': {
    // The "gpt-4.5" moniker never shipped as a stable public model — the
    // previous catalogue silently mapped it to gpt-4o-mini. Keep that
    // fallback so existing users aren't broken, but hide it from the UI.
    label: 'GPT-4.5 (deprecated)',
    family: 'openai',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: 'gpt-4o-mini',
    costTier: 'medium',
    deprecated: true,
    replacedBy: 'gpt-4o',
  },
  'gpt-o1': {
    label: 'GPT-o1 (deprecated)',
    family: 'openai',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'o1',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: 'o4-mini',
    costTier: 'high',
    deprecated: true,
    replacedBy: 'o1',
  },
  'gpt-o3': {
    label: 'GPT-o3 (deprecated)',
    family: 'openai',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'o3',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: 'o4-mini',
    costTier: 'high',
    deprecated: true,
    replacedBy: 'o3',
  },
  'gpt-o4-mini': {
    label: 'GPT-o4 Mini (deprecated)',
    family: 'openai',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'o4-mini',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: null,
    costTier: 'medium',
    deprecated: true,
    replacedBy: 'o4-mini',
  },

  // ========== Google Gemini ==========
  'gemini-2.5-pro': {
    label: 'Gemini 2.5 Pro',
    family: 'gemini',
    endpoint:
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent',
    streamEndpoint:
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:streamGenerateContent?alt=sse',
    model: 'gemini-2.5-pro',
    authHeader: AUTH.GOOGLE,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: 'gemini-2.5-flash',
    costTier: 'high',
  },
  'gemini-2.5-flash': {
    label: 'Gemini 2.5 Flash',
    family: 'gemini',
    endpoint:
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
    streamEndpoint:
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse',
    model: 'gemini-2.5-flash',
    authHeader: AUTH.GOOGLE,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: 'gemini-2.0-flash',
    costTier: 'medium',
  },
  'gemini-2.0-flash': {
    label: 'Gemini 2.0 Flash',
    family: 'gemini',
    endpoint:
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    streamEndpoint:
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse',
    model: 'gemini-2.0-flash',
    authHeader: AUTH.GOOGLE,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: null,
    costTier: 'low',
  },
  'gemini-1.5-pro': {
    label: 'Gemini 1.5 Pro (deprecated)',
    family: 'gemini',
    endpoint:
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent',
    streamEndpoint:
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:streamGenerateContent?alt=sse',
    model: 'gemini-1.5-pro-latest',
    authHeader: AUTH.GOOGLE,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: 'gemini-2.5-flash',
    costTier: 'medium',
    deprecated: true,
    replacedBy: 'gemini-2.5-pro',
  },

  // ========== DeepSeek (OpenAI-compatible) ==========
  'deepseek-chat': {
    label: 'DeepSeek V3',
    family: 'openai-compat',
    endpoint: 'https://api.deepseek.com/v1/chat/completions',
    model: 'deepseek-chat',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: null,
    costTier: 'low',
  },
  'deepseek-reasoner': {
    label: 'DeepSeek-R1',
    family: 'openai-compat',
    endpoint: 'https://api.deepseek.com/v1/chat/completions',
    model: 'deepseek-reasoner',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: 'deepseek-chat',
    costTier: 'medium',
  },
  'deepseek-r1-distill': {
    label: 'DeepSeek R1 Distill (deprecated)',
    family: 'openai-compat',
    endpoint: 'https://api.deepseek.com/v1/chat/completions',
    model: 'deepseek-reasoner',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: 'deepseek-chat',
    costTier: 'medium',
    deprecated: true,
    replacedBy: 'deepseek-reasoner',
  },

  // ========== xAI Grok (OpenAI-compatible) ==========
  'grok-4': {
    label: 'Grok 4',
    family: 'openai-compat',
    endpoint: 'https://api.x.ai/v1/chat/completions',
    model: 'grok-4',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: 'grok-3',
    costTier: 'high',
  },
  'grok-3': {
    label: 'Grok 3',
    family: 'openai-compat',
    endpoint: 'https://api.x.ai/v1/chat/completions',
    model: 'grok-3',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: null,
    costTier: 'medium',
  },

  // ========== Mistral (OpenAI-compatible) ==========
  'mistral-large': {
    label: 'Mistral Large',
    family: 'openai-compat',
    endpoint: 'https://api.mistral.ai/v1/chat/completions',
    model: 'mistral-large-latest',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: 'codestral',
    costTier: 'medium',
  },
  codestral: {
    label: 'Codestral',
    family: 'openai-compat',
    endpoint: 'https://api.mistral.ai/v1/chat/completions',
    model: 'codestral-latest',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: null,
    costTier: 'low',
  },
  'mistral-large-2': {
    // Collapsed into mistral-large — both point at -latest. Kept as
    // deprecated alias so stored settings still resolve.
    label: 'Mistral Large 2 (deprecated)',
    family: 'openai-compat',
    endpoint: 'https://api.mistral.ai/v1/chat/completions',
    model: 'mistral-large-latest',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: 'codestral',
    costTier: 'medium',
    deprecated: true,
    replacedBy: 'mistral-large',
  },

  // ========== Meta Llama (via Together AI, OpenAI-compatible) ==========
  'llama-3.3': {
    label: 'Llama 3.3 70B',
    family: 'openai-compat',
    endpoint: 'https://api.together.xyz/v1/chat/completions',
    model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: null,
    costTier: 'medium',
  },
  'llama-3.1': {
    label: 'Llama 3.1 70B',
    family: 'openai-compat',
    endpoint: 'https://api.together.xyz/v1/chat/completions',
    model: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: null,
    costTier: 'medium',
  },
  'llama-3': {
    label: 'Llama 3 (deprecated)',
    family: 'openai-compat',
    endpoint: 'https://api.together.xyz/v1/chat/completions',
    model: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: null,
    costTier: 'medium',
    deprecated: true,
    replacedBy: 'llama-3.1',
  },
  'llama-3.2': {
    label: 'Llama 3.2 (deprecated)',
    family: 'openai-compat',
    endpoint: 'https://api.together.xyz/v1/chat/completions',
    model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: null,
    costTier: 'medium',
    deprecated: true,
    replacedBy: 'llama-3.3',
  },

  // ========== Qwen (OpenAI-compatible mode) ==========
  'qwen-3': {
    label: 'Qwen 3',
    // Alibaba DashScope OpenAI-compatible mode — replaces the old DashScope
    // native endpoint that required a different request shape.
    family: 'openai-compat',
    endpoint: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
    model: 'qwen3-235b-a22b-instruct',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: null,
    costTier: 'medium',
  },
  'qwen-2.5': {
    label: 'Qwen 2.5 (deprecated)',
    family: 'openai-compat',
    endpoint: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
    model: 'qwen2.5-72b-instruct',
    authHeader: AUTH.BEARER,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: null,
    costTier: 'medium',
    deprecated: true,
    replacedBy: 'qwen-3',
  },

  // ========== Cohere ==========
  'cohere-command-r-plus': {
    label: 'Cohere Command R+',
    family: 'cohere',
    // Fixed: was /v1/generate (text-completion, deprecated). /v1/chat is
    // the current chat endpoint that matches the preamble + chat_history shape.
    endpoint: 'https://api.cohere.ai/v1/chat',
    model: 'command-r-plus',
    authHeader: AUTH.COHERE,
    supportsStreaming: true,
    requiresApiKey: true,
    classifierSibling: null,
    costTier: 'medium',
  },

  // ========== Ollama (local) ==========
  ollama: {
    label: 'Ollama (Local)',
    family: 'ollama',
    endpoint: 'http://localhost:11434/api/generate',
    model: 'llama3', // default; overridden by user's `version` field
    authHeader: AUTH.NONE,
    supportsStreaming: true,
    requiresApiKey: false,
    devOnly: true,
    classifierSibling: null,
    costTier: 'low',
  },

  // ========== Custom ==========
  other: {
    label: 'Other...',
    family: 'custom',
    endpoint: 'custom-endpoint', // placeholder; user supplies customEndpoint
    model: 'custom-model', // placeholder; user supplies customModel
    authHeader: AUTH.CUSTOM,
    supportsStreaming: true,
    requiresApiKey: true, // validated as "non-empty string"
    classifierSibling: null,
    costTier: 'medium',
  },
}

// The preferred default provider keys for the two features. These are the
// defaults new users will land on before they pick their own provider.
export const DEFAULT_CHAT_PROVIDER = 'gpt-4o-mini'
export const DEFAULT_GRADING_PROVIDER = 'gpt-4o-mini'

// Detect dev mode — used to gate devOnly providers (Ollama) out of the
// prod dropdown. Matches the detection logic the services use.
export const isDevelopment =
  typeof window !== 'undefined' &&
  (window.ENV === 'development' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1')

// ---------------------------------------------------------------------------
// Accessors / helpers
// ---------------------------------------------------------------------------

/**
 * Look up a provider entry, transparently migrating deprecated keys forward.
 * Stores call this before every network request so users with old stored
 * settings silently upgrade to the replacement provider.
 */
export function resolveProviderKey(key) {
  const entry = PROVIDERS[key]
  if (!entry) return key
  if (entry.deprecated && entry.replacedBy && PROVIDERS[entry.replacedBy]) {
    return entry.replacedBy
  }
  return key
}

export function getProvider(key) {
  const resolved = resolveProviderKey(key)
  return PROVIDERS[resolved] || null
}

/**
 * List of providers for the dropdown UI. Filters out deprecated entries
 * and, in production, devOnly providers (Ollama).
 */
export function availableProviders({ includeDevOnly = isDevelopment } = {}) {
  return Object.entries(PROVIDERS)
    .filter(([, p]) => !p.deprecated)
    .filter(([, p]) => includeDevOnly || !p.devOnly)
    .map(([value, p]) => ({ value, label: p.label }))
}

/**
 * Back-compat exports — preserve the old API surface so callers that still
 * import API_ENDPOINTS / MODEL_MAPPINGS keep working while we migrate them.
 */
export const API_ENDPOINTS = Object.fromEntries(
  Object.entries(PROVIDERS).map(([key, p]) => [key, p.endpoint]),
)

export const MODEL_MAPPINGS = Object.fromEntries(
  Object.entries(PROVIDERS).map(([key, p]) => [key, p.model]),
)
