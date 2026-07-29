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
}

export type ClaudeModel = 'claude-opus-5' | 'claude-sonnet-5' | 'claude-fable-5'

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
    strengths: 'Hardest reasoning, best accuracy',
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
    strengths: 'Fast coding, daily work',
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
    strengths: '1M token context, autonomous tasks',
  },
]