interface Props {
  used: number
  inputCost: number
  outputCost: number
}

function fmt(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n)
}

export function TokenCounter({ used, inputCost, outputCost }: Props) {
  return (
    <div className="token-counter">
      <span>Tokens: {fmt(used)}</span>
      <span>In: ${inputCost.toFixed(4)}</span>
      <span>Out: ${outputCost.toFixed(4)}</span>
      <span className="token-counter__brand">Opus 5 Free Desktop</span>
    </div>
  )
}