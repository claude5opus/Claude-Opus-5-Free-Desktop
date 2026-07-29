import { useState } from 'react'
import type { ClaudeSession } from '../types'

const SESSIONS_KEY = 'opus5_sessions'

export function useSessions() {
  const [sessions, setSessions] = useState<ClaudeSession[]>(() => {
    try { return JSON.parse(localStorage.getItem(SESSIONS_KEY) ?? '[]') } catch { return [] }
  })

  const persist = (s: ClaudeSession[]) => {
    setSessions(s)
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(s))
  }

  const add    = (s: ClaudeSession)    => persist([s, ...sessions])
  const remove = (id: string)          => persist(sessions.filter(s => s.id !== id))
  const update = (id: string, p: Partial<ClaudeSession>) =>
    persist(sessions.map(s => s.id === id ? { ...s, ...p } : s))

  return { sessions, add, remove, update }
}