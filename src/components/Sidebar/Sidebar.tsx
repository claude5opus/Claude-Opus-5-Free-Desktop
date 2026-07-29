import { useState } from 'react'
import type { ClaudeSession } from '../../types'
import './Sidebar.css'

interface Props {
  sessions: ClaudeSession[]
  activeId: string | null
  onSelect: (id: string) => void
  onNew: () => void
  onDelete: (id: string) => void
}

export function Sidebar({ sessions, activeId, onSelect, onNew, onDelete }: Props) {
  const [search, setSearch] = useState('')
  const filtered = sessions.filter(s => s.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <button onClick={onNew} className="sidebar__new">+ New chat</button>
      </div>
      <div className="sidebar__search">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search sessions…"
          className="sidebar__input"
        />
      </div>
      <div className="sidebar__list">
        {filtered.map(s => (
          <div
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`sidebar__item ${s.id === activeId ? 'sidebar__item--active' : ''}`}
          >
            <div className="sidebar__item-text">
              <span className="sidebar__item-title">{s.title}</span>
              <span className="sidebar__item-model">{s.model}</span>
            </div>
            <span onClick={e => { e.stopPropagation(); onDelete(s.id) }} className="sidebar__delete">×</span>
          </div>
        ))}
      </div>
    </div>
  )
}