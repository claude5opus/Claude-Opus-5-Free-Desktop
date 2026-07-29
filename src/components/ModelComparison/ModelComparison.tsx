import { useState } from 'react'
import type { ModelInfo } from '../../types'
import { MODELS } from '../../types'
import './ModelComparison.css'

interface Props {
  selected: string
  onSelect: (id: string) => void
}

export function ModelComparison({ selected, onSelect }: Props) {
  const [showBenchmarks, setShowBenchmarks] = useState(false)

  return (
    <div className="model-comparison">
      <div className="model-comparison__row">
        <span className="model-comparison__label">Model:</span>
        {MODELS.map(m => (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className={`model-btn ${selected === m.id ? 'model-btn--active' : ''}`}
          >
            {m.label}
          </button>
        ))}
        <button onClick={() => setShowBenchmarks(!showBenchmarks)} className="model-comparison__toggle">
          {showBenchmarks ? 'Hide' : 'Benchmarks'}
        </button>
      </div>

      {showBenchmarks && (
        <table className="benchmark-table">
          <thead>
            <tr>
              <th>Model</th><th>Context</th><th>SWE-bench</th>
              <th>MMLU</th><th>HumanEval</th><th>$/M in</th><th>$/M out</th>
            </tr>
          </thead>
          <tbody>
            {MODELS.map((m: ModelInfo) => (
              <tr key={m.id} className={m.id === selected ? 'benchmark-table__row--active' : ''}>
                <td>{m.label}</td>
                <td>{m.contextWindow >= 1000000 ? '1M' : `${m.contextWindow / 1000}K`}</td>
                <td>{m.benchmarkSwebench}%</td>
                <td>{m.benchmarkMmlu}%</td>
                <td>{m.benchmarkHumanEval}%</td>
                <td>${m.pricePerMTokInput}</td>
                <td>${m.pricePerMTokOutput}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showBenchmarks && (
        <p className="model-comparison__note">
          {MODELS.find(m => m.id === selected)?.strengths} — Opus 5 leads on SWE-bench and MMLU; Fable 5 wins on context length.
        </p>
      )}
    </div>
  )
}