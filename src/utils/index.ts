export function generateId(): string {
  return crypto.randomUUID?.() ?? Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function formatDate(d: Date): string {
  const diff = Date.now() - d.getTime()
  if (diff < 60000) return 'just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  return d.toLocaleDateString()
}

export function truncate(s: string, max = 60): string {
  return s.length > max ? s.slice(0, max) + '…' : s
}

export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4)
}

export function calculateOpusCost(inputTokens: number, outputTokens: number): {
  input: number; output: number; total: number
} {
  const rates = { 'claude-opus-5': { in: 15, out: 75 }, default: { in: 15, out: 75 } }
  const r = rates['claude-opus-5']
  const input  = (inputTokens  / 1_000_000) * r.in
  const output = (outputTokens / 1_000_000) * r.out
  return { input, output, total: input + output }
}