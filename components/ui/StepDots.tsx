'use client'

interface StepDotsProps {
  total: number
  current: number
}

export default function StepDots({ total, current }: StepDotsProps) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          style={{
            height: 5,
            width: i === current ? 16 : 5,
            borderRadius: 9999,
            backgroundColor: i === current ? '#2D6BFF' : '#E5E9F0',
            transition: 'all 200ms',
            display: 'block',
          }}
        />
      ))}
    </div>
  )
}
