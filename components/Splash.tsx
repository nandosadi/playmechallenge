'use client'

import { useEffect, useState } from 'react'

interface SplashProps {
  onDone: () => void
}

// Clementine orange slice SVG mark
function ClementineMark({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="28" fill="#FF6B2B" />
      {/* Inner center circle */}
      <circle cx="28" cy="28" r="7" fill="#FF8C52" />
      {/* Segment dividers — 8 lines from center to edge */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180
        const x2 = 28 + 21 * Math.cos(rad)
        const y2 = 28 + 21 * Math.sin(rad)
        return (
          <line
            key={angle}
            x1="28" y1="28"
            x2={x2} y2={y2}
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1.5"
          />
        )
      })}
      {/* Outer ring */}
      <circle cx="28" cy="28" r="21" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
    </svg>
  )
}

export default function Splash({ onDone }: SplashProps) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1800)
    const doneTimer = setTimeout(() => onDone(), 2400)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [onDone])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: '#0E1F44',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity 500ms ease',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      {/* Logo mark */}
      <div style={{ animation: 'popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards', opacity: 0 }}>
        <ClementineMark size={64} />
      </div>

      {/* Wordmark */}
      <div style={{ animation: 'slideUp 0.45s ease forwards 0.3s', opacity: 0, marginTop: 20, textAlign: 'center' }}>
        <p style={{
          color: 'white',
          fontSize: 32,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1,
          fontFamily: 'Inter, sans-serif',
        }}>
          clementine
        </p>
        <p style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginTop: 4,
          fontFamily: 'Inter, sans-serif',
        }}>
          bank
        </p>
      </div>

      {/* Tagline */}
      <div style={{ animation: 'fadeIn 0.4s ease forwards 0.7s', opacity: 0, marginTop: 12 }}>
        <p style={{
          color: 'rgba(255,255,255,0.3)',
          fontSize: 13,
          fontWeight: 400,
          fontFamily: 'Inter, sans-serif',
        }}>
          Smart banking, naturally.
        </p>
      </div>

      {/* Loading dots */}
      <div style={{ position: 'absolute', bottom: 56, display: 'flex', gap: 6 }}>
        {[0, 1, 2].map(i => (
          <SplashDot key={i} delay={0.9 + i * 0.15} />
        ))}
      </div>
    </div>
  )
}

function SplashDot({ delay }: { delay: number }) {
  const [active, setActive] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setActive(true), delay * 1000)
    return () => clearTimeout(t)
  }, [delay])
  return (
    <span style={{
      width: 5, height: 5,
      borderRadius: 9999,
      backgroundColor: '#FF6B2B',
      opacity: active ? 1 : 0.2,
      transition: 'opacity 300ms ease',
      display: 'block',
    }} />
  )
}
