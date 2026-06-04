'use client'

import { useState, useEffect } from 'react'

export function useCountUp(to: number, duration = 900, delay = 0) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    let raf: number
    let startTime: number | null = null

    timeout = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        // ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(to * eased))
        if (progress < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, delay)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(raf)
    }
  }, [to, duration, delay])

  return value
}

interface CountUpProps {
  to: number
  duration?: number
  delay?: number
  prefix?: string
  suffix?: string
  className?: string
}

export default function CountUp({ to, duration = 900, delay = 0, prefix = '', suffix = '', className = '' }: CountUpProps) {
  const value = useCountUp(to, duration, delay)
  return <span className={className}>{prefix}{value.toLocaleString()}{suffix}</span>
}
