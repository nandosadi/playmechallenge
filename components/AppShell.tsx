'use client'

import { useState, useEffect, useRef } from 'react'
import Splash from '@/components/Splash'
import HomeTab from '@/components/HomeTab'
import TabBar from '@/components/TabBar'
import ActivityTab from '@/components/tabs/ActivityTab'
import CardsTab from '@/components/tabs/CardsTab'
import AccountTab from '@/components/tabs/AccountTab'
import FlowA from '@/components/flows/FlowA'
import FlowB from '@/components/flows/FlowB'
import MissionAnalytics from '@/components/MissionAnalytics'

type Tab = 'home' | 'activity' | 'cards' | 'account'
type ActiveFlow = 'A' | 'B' | null
type TransitionPhase = 'idle' | 'running'

// Animated screen wrapper
function AnimatedScreen({
  children,
  isNew,
  screenKey,
}: {
  children: React.ReactNode
  isNew: boolean
  screenKey: string
}) {
  const [visible, setVisible] = useState(!isNew)

  useEffect(() => {
    if (isNew) {
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
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
        transition: isNew
          ? 'transform 300ms cubic-bezier(0.4,0,0.2,1), opacity 300ms cubic-bezier(0.4,0,0.2,1)'
          : 'none',
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
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % 3), 300)
    return () => clearInterval(id)
  }, [])
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      minHeight: '100dvh', backgroundColor: '#F4F6FA',
    }}>
      <p style={{ fontSize: 11, fontWeight: 600, color: '#9AA3B2', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 28 }}>
        PlayMe
      </p>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0E1116', letterSpacing: '-0.02em', marginBottom: 6, textAlign: 'center' }}>
        Next up
      </h1>
      <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 48 }}>Let's look at your idle cash.</p>
      <div style={{ display: 'flex', gap: 8 }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: 8, height: 8, borderRadius: 9999,
            backgroundColor: '#2D6BFF',
            opacity: phase === i ? 1 : 0.2,
            transition: 'opacity 200ms ease',
            display: 'block',
          }} />
        ))}
      </div>
    </div>
  )
}

export default function AppShell() {
  const [splashDone, setSplashDone] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [activeFlow, setActiveFlow] = useState<ActiveFlow>(null)
  const [flowStep, setFlowStep] = useState(0)
  const [transitionPhase, setTransitionPhase] = useState<TransitionPhase>('idle')
  const [ruleEnabled, setRuleEnabled] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [screenKey, setScreenKey] = useState('home')
  const [showAnalytics, setShowAnalytics] = useState(false)
  const isFirstNavRef = useRef(true)

  const inFlow = activeFlow !== null
  const tabBarVisible = splashDone && !inFlow && !showAnalytics

  // Start a flow
  const startFlow = (flow: 'A' | 'B') => {
    isFirstNavRef.current = false
    setActiveFlow(flow)
    setFlowStep(0)
    setScreenKey(`${flow}-0`)
    if (flow === 'B') setSelectedProduct(null)
  }

  // Advance step within a flow
  const advanceStep = () => {
    isFirstNavRef.current = false
    setFlowStep(prev => {
      const next = prev + 1
      setScreenKey(`${activeFlow}-${next}`)
      return next
    })
  }

  // Go back within a flow (or exit flow)
  const goBack = () => {
    isFirstNavRef.current = false
    if (flowStep === 0) {
      setActiveFlow(null)
      setScreenKey('home')
    } else {
      setFlowStep(prev => {
        const next = prev - 1
        setScreenKey(`${activeFlow}-${next}-back`)
        return next
      })
    }
  }

  // Flow A finished → transition to Flow B
  const handleFlowAFinish = () => {
    setTransitionPhase('running')
    setTimeout(() => {
      startFlow('B')
      setTransitionPhase('idle')
    }, 900)
  }

  // Flow B finished → back to home
  const handleFlowBFinish = () => {
    setActiveFlow(null)
    setActiveTab('home')
    setScreenKey('home-' + Date.now())
  }

  // Tab content
  const tabContent: Record<Tab, React.ReactNode> = {
    home:     <HomeTab onStartFlowA={() => startFlow('A')} onStartFlowB={() => startFlow('B')} />,
    activity: <ActivityTab />,
    cards:    <CardsTab />,
    account:  <AccountTab />,
  }

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100dvh', overflow: 'hidden', backgroundColor: '#F4F6FA' }}>
      {/* Splash overlay */}
      {!splashDone && <Splash onDone={() => setSplashDone(true)} />}

      {/* Main app (always rendered, hidden behind splash) */}
      {transitionPhase === 'running' ? (
        <TransitionScreen />
      ) : showAnalytics ? (
        <AnimatedScreen key="analytics" isNew screenKey="analytics">
          <MissionAnalytics onBack={() => setShowAnalytics(false)} />
        </AnimatedScreen>
      ) : inFlow ? (
        // Flow screens — full screen, no tab bar
        <AnimatedScreen key={screenKey} isNew={!isFirstNavRef.current} screenKey={screenKey}>
          {activeFlow === 'A' ? (
            <FlowA
              step={flowStep}
              ruleEnabled={ruleEnabled}
              onNext={advanceStep}
              onBack={goBack}
              onToggleRule={setRuleEnabled}
              onFinish={handleFlowAFinish}
              onViewAnalytics={() => setShowAnalytics(true)}
            />
          ) : (
            <FlowB
              step={flowStep}
              selectedProduct={selectedProduct}
              onNext={advanceStep}
              onBack={goBack}
              onSelectProduct={setSelectedProduct}
              onFinish={handleFlowBFinish}
              onViewAnalytics={() => setShowAnalytics(true)}
            />
          )}
        </AnimatedScreen>
      ) : (
        // Tab views
        <AnimatedScreen key={screenKey} isNew={false} screenKey={screenKey}>
          {tabContent[activeTab]}
        </AnimatedScreen>
      )}

      {/* Tab bar */}
      <TabBar
        active={activeTab}
        onChange={(tab) => {
          setActiveTab(tab)
          setScreenKey(`tab-${tab}`)
        }}
        visible={tabBarVisible}
        notifBadge={activeTab !== 'home'}
      />
    </div>
  )
}
