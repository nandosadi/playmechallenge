'use client'

export default function AnimatedCheck() {
  return (
    <div
      style={{
        width: 52, height: 52,
        animation: 'popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        opacity: 0,
      }}
    >
      <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" width="52" height="52">
        <circle cx="26" cy="26" r="26" fill="#EEF3FF" />
        <path
          d="M16 27 L22 33 L36 19"
          stroke="#2D6BFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="1"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: 1,
            animation: 'drawCheck 0.4s ease-out forwards 0.35s',
          }}
        />
      </svg>
    </div>
  )
}
