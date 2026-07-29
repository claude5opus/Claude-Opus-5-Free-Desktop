export function formatDate(d: Date): string {
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  if (diff < 60000) return 'just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return d.toLocaleDateString()
}

export function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function truncate(s: string, max = 60): string {
  return s.length > max ? s.slice(0, max) + '…' : s
}

export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4)
}

export function calculateCost(inputTokens: number, outputTokens: number, modelId: string): { input: number; output: number } {
  const rates: Record<string, { in: number; out: number }> = {
    'claude-opus-5':    { in: 15, out: 75 },
    'claude-sonnet-5':  { in: 3,  out: 15 },
    'claude-fable-5':   { in: 8,  out: 40 },
  }
  const rate = rates[modelId] ?? { in: 15, out: 75 }
  return {
    input:  (inputTokens / 1000000) * rate.in,
    output: (outputTokens / 1000000) * rate.out,
  }
}