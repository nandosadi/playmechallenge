'use client'

import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Row from '@/components/ui/Row'
import NotifCard from '@/components/ui/NotifCard'
import Toggle from '@/components/ui/Toggle'
import StepDots from '@/components/ui/StepDots'
import AnimatedCheck from '@/components/ui/AnimatedCheck'
import CountUp from '@/components/ui/CountUp'

interface FlowAProps {
  step: number
  ruleEnabled: boolean
  onNext: () => void
  onBack: () => void
  onToggleRule: (val: boolean) => void
  onFinish: () => void
}

function SectionLabel({ children, centered }: { children: React.ReactNode; centered?: boolean }) {
  return <p className={`text-label-sm text-muted uppercase mb-4 ${centered ? 'text-center' : ''}`}>{children}</p>
}

// Staggered animated row wrapper
function ARow({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <div style={{ animation: `slideUp 0.35s ease forwards ${delay}s`, opacity: 0 }}>
      {children}
    </div>
  )
}

// Screen 0 — Home
function ScreenHome({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div style={{ animation: 'slideUp 0.4s ease forwards', opacity: 0 }}>
        <SectionLabel>PlayMe · Mission Engine</SectionLabel>
        <p className="text-body-md text-muted mb-1">Wednesday, Jun 3 · 2:14 PM</p>
        <p className="text-display text-ink">$47,840</p>
        <p className="text-body-md text-muted">across 4 accounts</p>
      </div>

      <div style={{ animation: 'notifBounce 0.55s cubic-bezier(0.22,1,0.36,1) forwards 0.15s', opacity: 0 }}>
        <NotifCard
          label="OPTIMIZATION MISSION READY"
          text="You're about to pay your electricity bill. There's a smarter way to do this."
          sub="Tap to see system recommendation"
          onClick={onNext}
        />
      </div>

      <div style={{ animation: 'slideUp 0.35s ease forwards 0.3s', opacity: 0 }}>
        <Card>
          <p className="text-label-sm text-muted uppercase mb-2">Active goals</p>
          <Row label="Home down payment" value="61% · Mar 2027" valueVariant="primary" />
          <Row label="Barcelona trip" value="71% · Nov 2026" noBorder />
        </Card>
      </div>

      <div style={{ animation: 'slideUp 0.35s ease forwards 0.4s', opacity: 0 }}>
        <Card>
          <p className="text-label-sm text-muted uppercase mb-2">Upcoming payments</p>
          <Row label="Electricity bill" value="$148 · Jun 6" valueVariant="mono" />
          <Row label="Rent" value="$1,800 · Jun 14" valueVariant="mono" />
          <Row label="Subscriptions" value="$47 · Jun 18" valueVariant="mono" noBorder />
        </Card>
      </div>
    </div>
  )
}

// Screen 1 — Intercept
function ScreenIntercept({ onNext, onApply }: { onNext: () => void; onApply: () => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <SectionLabel>Purchase intercept</SectionLabel>
        <h1 className="text-headline-lg text-ink">
          Before you pay —<br />
          <span className="text-primary">here's the smarter path.</span>
        </h1>
      </div>

      <div className="rounded-lg p-4 bg-primary text-white">
        <p className="text-label-sm uppercase mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>System recommendation</p>
        <p className="text-headline-md font-semibold mb-2">Pay with Rewards Card ending 4821, not your checking account.</p>
        <p className="text-body-md" style={{ color: 'rgba(255,255,255,0.8)' }}>Earn 3x points on utilities. Keep checking buffer intact. Goal stays on track.</p>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 rounded-md border border-hairline bg-canvas p-3">
          <p className="text-label-sm text-muted uppercase mb-2">Your plan</p>
          <p className="text-headline-md text-muted font-bold">Checking</p>
          <p className="text-body-md text-muted mt-1">Direct debit · $148 / 0 rewards earned / Buffer drops to $4,062</p>
        </div>
        <div className="flex-1 rounded-md border border-primary-dis bg-soft p-3">
          <p className="text-label-sm text-primary-active uppercase mb-2">Recommended</p>
          <p className="text-headline-md text-primary-active font-bold">Rewards Card</p>
          <p className="text-body-md text-muted mt-1">3x points · $148 / 444 pts earned / Buffer stays at $4,210</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {['3x utility points', 'buffer preserved', 'goal on track'].map(tag => (
          <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-soft text-primary text-label-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" />
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-3 mt-2">
        <Button variant="primary" label="See the reasoning" onClick={onNext} />
        <Button variant="secondary" label="Apply recommendation" onClick={onApply} />
      </div>
    </div>
  )
}

// Screen 2 — Logic
function ScreenLogic({ onApply, onSetRule }: { onApply: () => void; onSetRule: () => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <SectionLabel>System logic</SectionLabel>
        <h1 className="text-headline-lg text-ink">
          Why this is the<br />
          <span className="text-primary">best move right now.</span>
        </h1>
      </div>

      <Card>
        <p className="text-label-sm text-muted uppercase mb-3">Three signals checked</p>
        {[
          {
            icon: '💳',
            title: 'Rewards card eligible',
            detail: 'Your Sapphire card earns 3x on utilities. Bill qualifies as a utility merchant.',
            value: '+444 points on $148',
          },
          {
            icon: '🛡️',
            title: 'Cash flow protected',
            detail: 'Checking stays at $4,210 — well above your $1,200 floor. Rent on Jun 14 unaffected.',
            value: '$3,010 above floor after rent',
          },
          {
            icon: '🎯',
            title: 'Goal velocity maintained',
            detail: 'Keeping checking intact means your $500 goal transfer on Jun 8 executes without risk.',
            value: 'Down payment on track for Dec 2026',
          },
        ].map((item, i) => (
          <div key={i} className={`flex gap-3 py-3 ${i < 2 ? 'border-b border-hairline-soft' : ''}`}>
            <div className="w-9 h-9 rounded-md bg-soft flex items-center justify-center flex-shrink-0 text-lg">
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-headline-md text-ink mb-0.5">{item.title}</p>
              <p className="text-body-md text-muted mb-1">{item.detail}</p>
              <p className="text-body-md text-primary font-semibold">{item.value}</p>
            </div>
          </div>
        ))}
      </Card>

      <Card>
        <p className="text-label-sm text-muted uppercase mb-1">Points value</p>
        <Row label="Points earned" value="444 pts" valueVariant="mono" />
        <Row label="Redemption value (travel)" value="~$6.66" valueVariant="primary" />
        <Row label="Annual impact at this rate" value="~$80/yr" valueVariant="primary" noBorder />
      </Card>

      <div className="flex flex-col gap-3 mt-2">
        <Button variant="primary" label="Apply recommendation" onClick={onApply} />
        <Button variant="secondary" label="Set as rule for utility bills" onClick={onSetRule} />
      </div>
    </div>
  )
}

// Screen 3 — Confirm + rule
function ScreenConfirm({ ruleEnabled, onToggleRule, onConfirm, onPayFromChecking }: {
  ruleEnabled: boolean
  onToggleRule: (val: boolean) => void
  onConfirm: () => void
  onPayFromChecking: () => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <SectionLabel>Confirm + set rule</SectionLabel>
        <h1 className="text-headline-lg text-ink">
          Apply this once,<br />
          <span className="text-primary">or make it automatic.</span>
        </h1>
      </div>

      <Card>
        <p className="text-label-sm text-muted uppercase mb-1">Applying now</p>
        <Row label="Payment method" value="Rewards Card · 4821" />
        <Row label="Amount" value="$148.00" valueVariant="mono" />
        <Row label="Points earned" value="444 pts" valueVariant="primary" />
        <Row label="Checking buffer after" value="$4,210 (unchanged)" noBorder />
      </Card>

      <Card navy>
        <p className="text-headline-md font-semibold text-white mb-2">Save as rule</p>
        <p className="text-body-md mb-4" style={{ color: 'rgba(255,255,255,0.75)' }}>
          "Always use my Rewards Card for utility payments when the rewards rate is 2x or higher and checking buffer stays above $1,200."
        </p>
        <div className="flex items-center justify-between">
          <span className="text-body-md text-white font-medium">Enable this rule</span>
          <Toggle enabled={ruleEnabled} onChange={onToggleRule} navyContext />
        </div>
        {ruleEnabled && (
          <p className="text-body-md mt-3" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Future utility bills will automatically use your Rewards Card. You'll be notified after each action.
          </p>
        )}
      </Card>

      <div className="flex flex-col gap-3 mt-2">
        <Button
          variant="primary"
          label={ruleEnabled ? 'Confirm + save rule' : 'Confirm this payment'}
          onClick={onConfirm}
        />
        <Button variant="tertiary" label="Pay from checking instead" onClick={onPayFromChecking} />
      </div>
      <p className="text-body-md text-muted text-center -mt-1">
        {ruleEnabled
          ? 'Rule active from next payment · editable anytime in settings'
          : 'You can set this as a rule after confirming'}
      </p>
    </div>
  )
}

// Screen 4 — Outcome
function ScreenOutcome({ onFinish }: { onFinish: () => void }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Animated header */}
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">
          <AnimatedCheck />
        </div>
        <div style={{ animation: 'fadeIn 0.3s ease forwards 0.6s', opacity: 0 }}>
          <SectionLabel centered>Mission complete</SectionLabel>
        </div>
        <div style={{ animation: 'slideUp 0.35s ease forwards 0.65s', opacity: 0 }}>
          <h1 className="text-headline-lg text-ink">
            Payment made.<br />
            <span className="text-primary">Rewards captured.</span>
          </h1>
        </div>
      </div>

      {/* Win strip — slides in from left */}
      <div style={{ animation: 'slideInLeft 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards 0.75s', opacity: 0 }}>
        <Card className="flex items-center gap-3">
          <span
            className="w-2 h-2 rounded-full bg-success flex-shrink-0"
            style={{ animation: 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards 0.9s', opacity: 0 }}
          />
          <div>
            <p className="text-headline-md text-ink">
              +<CountUp to={444} duration={800} delay={900} /> points earned
            </p>
            <p className="text-body-md text-muted">~$6.66 value · 3x on utilities</p>
          </div>
        </Card>
      </div>

      {/* Payment summary — staggered rows */}
      <div style={{ animation: 'cardEntrance 0.4s ease forwards 0.85s', opacity: 0 }}>
        <Card>
          <p className="text-label-sm text-muted uppercase mb-1">Payment summary</p>
          {[
            { label: 'Electricity · Jun 3', value: '$148.00',          variant: 'mono'    as const },
            { label: 'Paid with',           value: 'Rewards Card · 4821', variant: 'default' as const },
            { label: 'Points earned',       value: '444 pts',          variant: 'primary' as const },
            { label: 'Checking buffer',     value: '$4,210 · intact',  variant: 'default' as const },
            { label: 'Down payment goal',   value: 'On track ↑',       variant: 'green'   as const },
          ].map((row, i) => (
            <ARow key={row.label} delay={0.9 + i * 0.06}>
              <Row label={row.label} value={row.value} valueVariant={row.variant} noBorder={i === 4} />
            </ARow>
          ))}
        </Card>
      </div>

      {/* Running totals — staggered rows */}
      <div style={{ animation: 'cardEntrance 0.4s ease forwards 1.1s', opacity: 0 }}>
        <Card>
          <p className="text-label-sm text-muted uppercase mb-1">Running totals · this month</p>
          {[
            { label: 'Total points via PlayMe',   value: '1,280 pts', variant: 'primary' as const },
            { label: 'Est. annual rewards value', value: '~$80',      variant: 'primary' as const },
            { label: 'Optimization missions run', value: '7 this month', variant: 'default' as const },
          ].map((row, i) => (
            <ARow key={row.label} delay={1.15 + i * 0.06}>
              <Row label={row.label} value={row.value} valueVariant={row.variant} noBorder={i === 2} />
            </ARow>
          ))}
        </Card>
      </div>

      <div style={{ animation: 'fadeIn 0.3s ease forwards 1.35s', opacity: 0 }}>
        <Button variant="primary" label="Back to home" onClick={onFinish} />
      </div>
    </div>
  )
}

export default function FlowA({ step, ruleEnabled, onNext, onBack, onToggleRule, onFinish }: FlowAProps) {
  const screens = [
    <ScreenHome key="home" onNext={onNext} />,
    <ScreenIntercept key="intercept" onNext={onNext} onApply={onNext} />,
    <ScreenLogic key="logic" onApply={onNext} onSetRule={onNext} />,
    <ScreenConfirm
      key="confirm"
      ruleEnabled={ruleEnabled}
      onToggleRule={onToggleRule}
      onConfirm={onNext}
      onPayFromChecking={onNext}
    />,
    <ScreenOutcome key="outcome" onFinish={onFinish} />,
  ]

  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      <div className="flex items-center justify-between px-container pt-12 pb-4">
        <div className="flex items-center gap-2">
          {step > 0 && (
            <button onClick={onBack} className="text-muted text-body-lg p-1 -ml-1">
              ←
            </button>
          )}
          <span className="text-label-sm text-muted uppercase tracking-wider">PlayMe</span>
        </div>
        <StepDots total={5} current={step} />
      </div>

      <div className="flex-1 px-container pb-8 overflow-y-auto">
        {screens[step]}
      </div>
    </div>
  )
}
