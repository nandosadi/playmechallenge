'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import FlowA from '@/components/flows/FlowA'
import FlowB from '@/components/flows/FlowB'

type Flow = 'A' | 'B'
type Phase = 'flow' | 'transition'

interface AppState {
  flow: Flow
  step: number
  ruleEnabled: boolean
  selectedProduct: string | null
}

// Animated screen wrapper — isNew=true slides in from right, false=instant
function AnimatedScreen({
  children,
  isNew,
}: {
  children: React.ReactNode
  isNew: boolean
}) {
  const [visible, setVisible] = useState(!isNew)

  useEffect(() => {
    if (isNew) {
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true))
      })
      return () => cancelAnimationFrame(id)
    }
  }, [isNew])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        transform: visible ? 'translateX(0)' : 'translateX(100%)',
        opacity: visible ? 1 : 0,
        transition: isNew ? 'transform 300ms cubic-bezier(0.4,0,0.2,1), opacity 300ms cubic-bezier(0.4,0,0.2,1)' : 'none',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      {children}
    </div>
  )
}

// Transition screen between Flow A and Flow B
function TransitionScreen() {
  const [dotsPhase, setDotsPhase] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setDotsPhase(p => (p + 1) % 3), 300)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-canvas px-container">
      <p className="text-label-sm text-muted-soft uppercase tracking-widest mb-8">PlayMe</p>
      <h1 className="text-display text-ink text-center mb-2">Next up</h1>
      <p className="text-body-md text-muted text-center mb-12">Let's look at your idle cash.</p>
      {/* Three pulsing dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map(i => (
          <span
            key={i}
            style={{
              width: 8, height: 8, borderRadius: 9999,
              backgroundColor: '#2D6BFF',
              opacity: dotsPhase === i ? 1 : 0.25,
              transition: 'opacity 200ms ease',
              display: 'block',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function AppShell() {
  const [state, setState] = useState<AppState>({
    flow: 'A',
    step: 0,
    ruleEnabled: false,
    selectedProduct: null,
  })
  const [phase, setPhase] = useState<Phase>('flow')
  const [screenKey, setScreenKey] = useState('A-0-initial')
  const isInitialRef = useRef(true)

  const advanceStep = () => {
    isInitialRef.current = false
    setState(prev => {
      const newStep = prev.step + 1
      setScreenKey(`${prev.flow}-${newStep}`)
      return { ...prev, step: newStep }
    })
  }

  const goBack = () => {
    isInitialRef.current = false
    setState(prev => {
      if (prev.step === 0) return prev
      const newStep = prev.step - 1
      setScreenKey(`${prev.flow}-${newStep}-back`)
      return { ...prev, step: newStep }
    })
  }

  const handleFlowAFinish = () => {
    setPhase('transition')
    setTimeout(() => {
      isInitialRef.current = false
      setState({ flow: 'B', step: 0, ruleEnabled: false, selectedProduct: null })
      setScreenKey('B-0')
      setPhase('flow')
    }, 900)
  }

  const handleFlowBFinish = () => {
    isInitialRef.current = false
    setState({ flow: 'A', step: 0, ruleEnabled: false, selectedProduct: null })
    setScreenKey('A-0-reset-' + Date.now())
  }

  const setRuleEnabled = (val: boolean) => {
    setState(prev => ({ ...prev, ruleEnabled: val }))
  }

  const setSelectedProduct = (id: string) => {
    setState(prev => ({ ...prev, selectedProduct: id }))
  }

  if (phase === 'transition') {
    return <TransitionScreen />
  }

  const isNewScreen = !isInitialRef.current

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100dvh', overflow: 'hidden' }}>
      <AnimatedScreen key={screenKey} isNew={isNewScreen}>
        {state.flow === 'A' ? (
          <FlowA
            step={state.step}
            ruleEnabled={state.ruleEnabled}
            onNext={advanceStep}
            onBack={goBack}
            onToggleRule={setRuleEnabled}
            onFinish={handleFlowAFinish}
          />
        ) : (
          <FlowB
            step={state.step}
            selectedProduct={state.selectedProduct}
            onNext={advanceStep}
            onBack={goBack}
            onSelectProduct={setSelectedProduct}
            onFinish={handleFlowBFinish}
          />
        )}
      </AnimatedScreen>
    </div>
  )
}
