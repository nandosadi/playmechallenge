'use client'

interface ToggleProps {
  enabled: boolean
  onChange: (val: boolean) => void
  navyContext?: boolean
}

export default function Toggle({ enabled, onChange, navyContext = false }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className="relative inline-flex flex-shrink-0 focus:outline-none"
      style={{ width: 40, height: 22, borderRadius: 9999 }}
    >
      <span
        style={{
          position: 'absolute', inset: 0, borderRadius: 9999,
          backgroundColor: enabled ? '#2D6BFF' : (navyContext ? '#3A4151' : '#D1D5DB'),
          transition: 'background 200ms ease',
        }}
      />
      <span
        style={{
          position: 'absolute',
          width: 18, height: 18,
          borderRadius: 9999,
          backgroundColor: 'white',
          top: 2,
          left: enabled ? 20 : 2,
          transition: 'left 200ms ease',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }}
      />
    </button>
  )
}
