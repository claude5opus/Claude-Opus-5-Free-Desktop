import { useState, useCallback } from 'react'
import type { ClaudeMessage, ClaudeModel } from '../types'

export function useClaudeOpusChat(model: ClaudeModel = 'claude-opus-5') {
  const [messages, setMessages] = useState<ClaudeMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [rateLimited, setRateLimited] = useState(false)

  const send = useCallback(async (content: string) => {
    if (rateLimited) return
    const msg: ClaudeMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, msg])
    setLoading(true)

    try {
      const res = await fetch('/api/claude/opus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, messages: [...messages, msg] }),
      })

      if (res.status === 429) {
        setRateLimited(true)
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Opus 5 rate limit reached. Switch to Sonnet 5 for this response.',
          model: 'claude-opus-5',
          timestamp: new Date(),
        }])
        return
      }

      const data = await res.json()
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
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

  const clear = () => { setMessages([]); setRateLimited(false) }

  return { messages, loading, rateLimited, send, clear }
}