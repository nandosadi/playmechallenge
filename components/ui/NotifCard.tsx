'use client'

interface NotifCardProps {
  label: string
  text: string
  sub: string
  onClick: () => void
}

export default function NotifCard({ label, text, sub, onClick }: NotifCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-card shadow-card border border-hairline active:scale-[0.99] transition-transform"
      style={{
        borderRadius: '0 16px 16px 0',
        borderLeft: '3px solid #2D6BFF',
      }}
    >
      <div className="px-4 py-4">
        <p className="text-label-sm text-primary mb-1">{label}</p>
        <p className="text-body-md text-ink font-medium mb-1">{text}</p>
        <p className="text-body-md text-muted">{sub}</p>
      </div>
    </button>
  )
}
