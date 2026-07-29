import { useState, useRef, useEffect } from 'react'
import { useClaudeOpusChat } from './hooks/useClaudeOpusChat'
import { ModelComparison } from './components/ModelComparison/ModelComparison'
import { MarkdownRenderer } from './components/MarkdownRenderer/MarkdownRenderer'
import type { ClaudeModel } from './types'

export default function App() {
  const [model, setModel] = useState<ClaudeModel>('claude-opus-5')
  const { messages, loading, rateLimited, send, clear } = useClaudeOpusChat(model)
  const [input, setInput] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])

  const submit = () => {
    if (!input.trim() || loading || rateLimited) return
    send(input.trim())
    setInput('')
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Claude Opus 5 — Free Desktop</h1>
      </header>

      <ModelComparison selected={model} onSelect={(id) => setModel(id as ClaudeModel)} />

      <main className="app__messages">
        {messages.length === 0 && (
          <p className="app__empty">Ask Opus 5 anything — coding, architecture, research, analysis.</p>
        )}
        {messages.map(m => (
          <div key={m.id} className={`msg msg--${m.role}`}>
            <div className="msg__bubble">
              {m.role === 'assistant' ? <MarkdownRenderer text={m.content} /> : m.content}
            </div>
            {m.role === 'assistant' && m.model && (
              <span className="msg__meta">{m.model}{m.inputTokens ? ` · ${m.inputTokens} in / ${m.outputTokens} out` : ''}</span>
            )}
          </div>
        ))}
        {loading && <p className="app__typing">Opus 5 is reasoning…</p>}
        {rateLimited && (
          <div className="app__ratelimit">Rate limit hit on Opus 5 — switch to Sonnet 5 for faster access</div>
        )}
        <div ref={endRef} />
      </main>

      <footer className="app__input">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() } }}
          rows={1}
          placeholder="Message Claude Opus 5…"
          className="app__textarea"
        />
        <button onClick={submit} disabled={loading || rateLimited || !input.trim()} className="btn btn--primary">
          Send
        </button>
        {messages.length > 0 && (
          <button onClick={clear} className="btn btn--ghost">Clear</button>
        )}
      </footer>
    </div>
  )
}