import { useState, useCallback } from 'react'
import type { ClaudeMessage, ClaudeModel } from '../src/types'

export function useClaudeOpusChat(model: ClaudeModel = 'claude-opus-5') {
  const [messages, setMessages] = useState<ClaudeMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [rateLimited, setRateLimited] = useState(false)

  const send = useCallback(async (content: string) => {
    if (rateLimited) return
    const msg: ClaudeMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, msg])
    setLoading(true)

    try {
      const res = await fetch('/api/opus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, messages: [...messages, msg] }),
      })
      if (res.status === 429) {
        setRateLimited(true)
        setMessages(prev => [...prev, {
          id: crypto.randomUUID(),
          role: 'assistant' as const,
          content: 'Claude Opus 5 rate limit reached. Switch to Sonnet 5 in the model picker for continued access.',
          model: 'claude-opus-5' as ClaudeModel,
          timestamp: new Date(),
        }])
        return
      }
      const data = await res.json()
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant' as const,
        content: data.content,
        model,
        inputTokens: data.inputTokens,
        outputTokens: data.outputTokens,
        timestamp: new Date(),
      }])
    } finally {
      setLoading(false)
    }
  }, [messages, model, rateLimited])

  return {
    messages,
    loading,
    rateLimited,
    send,
    clear: () => { setMessages([]); setRateLimited(false) },
  }
}