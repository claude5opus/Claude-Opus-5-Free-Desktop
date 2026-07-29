import { useState } from 'react'
import type { ModelInfo } from '../../types'
import { MODELS } from '../../types'
import './Settings.css'

interface Props {
  currentModel: string
  onModelChange: (id: string) => void
  onClose: () => void
}

export function Settings({ currentModel, onModelChange, onClose }: Props) {
  const [streamOutput, setStreamOutput] = useState(true)
  const [autoFallback, setAutoFallback] = useState(true)

  return (
    <div className="settings__overlay" onClick={onClose}>
      <div className="settings__dialog" onClick={e => e.stopPropagation()}>
        <h3 className="settings__title">Settings</h3>

        <label className="settings__field">
          Default model
          <select value={currentModel} onChange={e => onModelChange(e.target.value)} className="settings__select">
            {MODELS.map((m: ModelInfo) => (
              <option key={m.id} value={m.id}>{m.label} — {m.strengths}</option>
            ))}
          </select>
        </label>

        <label className="settings__checkbox">
          <input type="checkbox" checked={streamOutput} onChange={e => setStreamOutput(e.target.checked)} />
          Stream responses
        </label>

        <label className="settings__checkbox">
          <input type="checkbox" checked={autoFallback} onChange={e => setAutoFallback(e.target.checked)} />
          Auto-fallback to Sonnet 5 when Opus 5 rate-limits
        </label>

        <button onClick={onClose} className="btn btn--primary">Done</button>
      </div>
    </div>
  )
}