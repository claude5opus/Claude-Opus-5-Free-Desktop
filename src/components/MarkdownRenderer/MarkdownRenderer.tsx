interface Props {
  text: string
}

export function MarkdownRenderer({ text }: Props) {
  const parts = text.split(/(```[\s\S]*?```)/g)
  return (
    <div className="markdown">
      {parts.map((part, i) => {
        if (part.startsWith('```')) {
          const inner = part.replace(/^```\w*\n?/, '').replace(/```$/, '')
          return (
            <pre key={i} className="markdown__code">
              <code>{inner}</code>
            </pre>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </div>
  )
}