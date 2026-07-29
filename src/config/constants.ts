export const APP_CONFIG = {
  name: 'Claude Opus 5 Free Desktop',
  version: '1.0.0',
  defaultModel: 'claude-opus-5' as const,
  apiEndpoint: '/api/claude/opus',
  maxRetries: 3,
  rateLimitDelayMs: 2000,
  streamEnabled: true,
  autoFallback: true,
  fallbackModel: 'claude-sonnet-5',
}

export const STORAGE_KEYS = {
  sessions: 'opus5_sessions',
  settings: 'opus5_settings',
  model: 'opus5_model',
}

export const MODEL_DESCRIPTIONS: Record<string, string> = {
  'claude-opus-5': 'Anthropic flagship — hardest reasoning, best accuracy',
  'claude-sonnet-5': 'Fast coding, daily work, 200K context',
  'claude-fable-5': '1M token context for autonomous long sessions',
}

export const FAQ_ENTRIES = [
  { q: 'What is Claude Opus 5?', a: 'The flagship reasoning model from Anthropic.' },
  { q: 'Opus 5 vs Sonnet 5?', a: 'Opus is smarter but slower. Sonnet is the daily driver.' },
  { q: 'Opus 5 vs Fable 5?', a: 'Opus is more accurate. Fable handles 1M tokens.' },
  { q: 'Is this free?', a: 'Yes — no subscription or API key needed.' },
]