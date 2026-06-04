'use client'

interface CardProps {
  children: React.ReactNode
  className?: string
  navy?: boolean
}

export default function Card({ children, className = '', navy = false }: CardProps) {
  return (
    <div
      className={`
        rounded-lg shadow-card px-4 py-4
        ${navy ? 'bg-secondary text-white' : 'bg-card'}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
