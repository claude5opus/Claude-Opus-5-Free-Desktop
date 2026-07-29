import { useState } from 'react'
import type { ClaudeSession } from '../types'
import { STORAGE_KEYS } from '../config/constants'

const SESSIONS_KEY = STORAGE_KEYS.sessions

export function useSessions() {
  const [sessions, setSessions] = useState<ClaudeSession[]>(() => {
    try {
      const raw = localStorage.getItem(SESSIONS_KEY)
      return raw ? JSON.parse(raw) : []
    } catch { return [] }
  })

  const persist = (updated: ClaudeSession[]) => {
    setSessions(updated)
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(updated))
  }

  const addSession = (s: ClaudeSession) => persist([s, ...sessions])
  const removeSession = (id: string) => persist(sessions.filter(s => s.id !== id))
  const updateSession = (id: string, patch: Partial<ClaudeSession>) =>
    persist(sessions.map(s => s.id === id ? { ...s, ...patch } : s))
  const getActive = (id: string | null) => sessions.find(s => s.id === id) ?? null

  return { sessions, addSession, removeSession, updateSession, getActive }
}