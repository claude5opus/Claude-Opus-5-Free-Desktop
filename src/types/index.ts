export interface ClaudeMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  model?: ClaudeModel
  inputTokens?: number
  outputTokens?: number
  timestamp: Date
}

export interface ClaudeSession {
  id: string
  title: string
  messages: ClaudeMessage[]
  model: ClaudeModel
  createdAt: Date
  totalTokens: number
}

export type ClaudeModel =
  | 'claude-opus-5'
  | 'claude-sonnet-5'
  | 'claude-fable-5'
  | 'claude-mythos-5'
  | 'claude-opus-4.8'

export interface ModelInfo {
  id: ClaudeModel
  label: string
  contextWindow: number
  pricePerMTokInput: number
  pricePerMTokOutput: number
  benchmarkSwebench: number
  benchmarkMmlu: number
  benchmarkHumanEval: number
  strengths: string
}

export const MODELS: ModelInfo[] = [
  {
    id: 'claude-opus-5',
    label: 'Claude Opus 5',
    contextWindow: 200000,
    pricePerMTokInput: 15,
    pricePerMTokOutput: 75,
    benchmarkSwebench: 72.5,
    benchmarkMmlu: 89.1,
    benchmarkHumanEval: 95.3,
    strengths: 'Best reasoning accuracy, highest benchmark scores',
  },
  {
    id: 'claude-fable-5',
    label: 'Claude Fable 5',
    contextWindow: 1000000,
    pricePerMTokInput: 8,
    pricePerMTokOutput: 40,
    benchmarkSwebench: 70.0,
    benchmarkMmlu: 87.8,
    benchmarkHumanEval: 93.5,
    strengths: '1M token context for very long documents and autonomous tasks',
  },
  {
    id: 'claude-sonnet-5',
    label: 'Claude Sonnet 5',
    contextWindow: 200000,
    pricePerMTokInput: 3,
    pricePerMTokOutput: 15,
    benchmarkSwebench: 68.2,
    benchmarkMmlu: 86.4,
    benchmarkHumanEval: 92.1,
    strengths: 'Fast daily coding and conversations',
  },
  {
    id: 'claude-mythos-5',
    label: 'Claude Mythos 5',
    contextWindow: 200000,
    pricePerMTokInput: 12,
    pricePerMTokOutput: 60,
    benchmarkSwebench: 71.8,
    benchmarkMmlu: 88.5,
    benchmarkHumanEval: 94.2,
    strengths: 'Advanced multimodal reasoning',
  },
  {
    id: 'claude-opus-4.8',
    label: 'Claude Opus 4.8',
    contextWindow: 200000,
    pricePerMTokInput: 15,
    pricePerMTokOutput: 75,
    benchmarkSwebench: 65.1,
    benchmarkMmlu: 84.2,
    benchmarkHumanEval: 90.3,
    strengths: 'Previous flagship — stable, proven',
  },
]