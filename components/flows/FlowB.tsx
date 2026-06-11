'use client'

import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Row from '@/components/ui/Row'
import StepDots from '@/components/ui/StepDots'
import AnimatedCheck from '@/components/ui/AnimatedCheck'
import CountUp from '@/components/ui/CountUp'
import { Clock, ArrowCounterClockwise, ChartBar } from '@phosphor-icons/react'

const PRODUCTS = [
  { id: 'hysa', name: 'High-Yield Savings', rate: '4.85%', liquidity: 'Instant',   liquidityVariant: 'green' as const, risk: 'FDIC-insured', protection: 'Fully liquid', note: 'Fully liquid any time. Best for cash you might need soon.', annual: 155.20 },
  { id: 'cd',   name: 'No-Penalty CD',      rate: '5.10%', liquidity: '7-day exit', liquidityVariant: 'amber' as const, risk: 'FDIC-insured', protection: 'Exit after 7d', note: 'Slightly better rate. Exit after 7 days with no penalty.', annual: 163.20 },
  { id: 'tbill',name: 'T-Bill (3-month)',   rate: '5.28%', liquidity: 'Locked 90d', liquidityVariant: 'red'   as const, risk: "Gov't backed",  protection: 'Locked 90 days', note: 'Best rate. US Treasury backed. Locked until Sep 1. Not a bank deposit.', annual: 168.96 },
]
const AMOUNT = 3200
const liquidityColors = {
  green: { bg: '#EBF9F1', text: '#1A7A47' },
  amber: { bg: '#FFF7ED', text: '#B45309' },
  red:   { bg: '#FFF1F2', text: '#BE123C' },
}

interface FlowBProps {
  step: number   // 0=Analysis, 1=Choose, 2=Confirm, 3=Outcome
  selectedProduct: string | null
  onNext: () => void
  onBack: () => void
  onSelectProduct: (id: string) => void
  onFinish: () => void
  onViewAnalytics: () => void
}

function SectionLabel({ children, centered }: { children: React.ReactNode; centered?: boolean }) {
  return <p className={`text-label-sm text-muted uppercase mb-4 ${centered ? 'text-center' : ''}`}>{children}</p>
}

function ARow({ children, delay }: { children: React.ReactNode; delay: number }) {
  return <div style={{ animation: `slideUp 0.35s ease forwards ${delay}s`, opacity: 0 }}>{children}</div>
}

// Step 0 — Analysis
function ScreenAnalysis({ onNext }: { onNext: () => void }) {
  const opportunityCost = ((AMOUNT * 0.0485) / 365 * 45).toFixed(2)
  return (
    <div className="flex flex-col gap-4">
      <div>
        <SectionLabel>Opportunity detected</SectionLabel>
        <h1 className="text-headline-lg text-ink"><span className="text-primary">$3,200 sitting still</span><br />for 45 days.</h1>
      </div>

      {/* Why now */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, backgroundColor: '#FFF7ED', borderRadius: 10, padding: '12px 14px', border: '1px solid #FFD4BB' }}>
        <Clock size={16} weight="fill" color="#FF6B2B" style={{ flexShrink: 0, marginTop: 1 }} />
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#FF6B2B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>Why now</p>
          <p style={{ fontSize: 13, color: '#3A4151', lineHeight: 1.45 }}>Your upcoming bills are covered, and $3,200 has been sitting in checking for 45 days. Moving it now puts it to work before your next billing cycle.</p>
        </div>
      </div>

      <Card>
        <p className="text-label-sm text-muted uppercase mb-3">Opportunity cost</p>
        <div className="flex items-baseline justify-between mb-2">
          <p className="text-display text-ink">${opportunityCost}</p>
          <p className="text-body-md text-muted">in 45 days</p>
        </div>
        <p className="text-body-md text-muted">At 4.85% APY, this money could have earned ${opportunityCost}. Instead it earned ~$0.14 in checking.</p>
      </Card>

      <div className="flex gap-3">
        <div className="flex-1 rounded-md border border-hairline bg-canvas p-3">
          <p className="text-label-sm text-muted uppercase mb-2">Earning now</p>
          <p className="text-headline-lg text-muted font-bold">0.01%</p>
          <p className="text-body-md text-muted mt-1">~$0.32/yr</p>
        </div>
        <div className="flex-1 rounded-md border border-primary-dis bg-soft p-3">
          <p className="text-label-sm text-primary-active uppercase mb-2">Could earn</p>
          <p className="text-headline-lg text-primary-active font-bold">4.85%+</p>
          <p className="text-body-md text-muted mt-1">$155–$169/yr</p>
        </div>
      </div>

      <Card>
        <p className="text-label-sm text-muted uppercase mb-1">Why $3,200 is moveable</p>
        <Row label="Checking balance" value="$4,210" valueVariant="mono" />
        <Row label="Bills before paycheck" value="$1,010" valueVariant="mono" />
        <Row label="Safely moveable" value="$3,200" valueVariant="primary" noBorder />
      </Card>

      <Button variant="primary" label="Choose where to move it" onClick={onNext} />
    </div>
  )
}

// Step 1 — Choose product
function ScreenChoose({ selectedProduct, onSelect, onNext }: { selectedProduct: string | null; onSelect: (id: string) => void; onNext: () => void }) {
  const selected = PRODUCTS.find(p => p.id === selectedProduct)
  return (
    <div className="flex flex-col gap-4">
      <div>
        <SectionLabel>Choose a destination</SectionLabel>
        <h1 className="text-headline-lg text-ink">Pick how hard<br /><span className="text-primary">$3,200 works.</span></h1>
      </div>

      {PRODUCTS.map((product, i) => {
        const isSelected = selectedProduct === product.id
        const liqColors = liquidityColors[product.liquidityVariant]
        return (
          <button key={product.id} onClick={() => onSelect(product.id)}
            className="w-full text-left rounded-lg shadow-card transition-all duration-200 active:scale-[0.98]"
            style={{
              backgroundColor: isSelected ? '#EEF3FF' : '#FFFFFF',
              border: isSelected ? '2px solid #2D6BFF' : '1px solid #E5E9F0',
              padding: isSelected ? '15px' : '16px',
              animation: `cardEntrance 0.4s ease forwards ${0.05 + i * 0.1}s`, opacity: 0,
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-headline-md text-ink">{product.name}</span>
              <div className="flex items-center gap-1">
                <span className="text-label-sm text-muted uppercase">APY</span>
                <span className="text-headline-md text-primary font-bold">{product.rate}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className="px-2 py-0.5 rounded-full text-label-sm" style={{ backgroundColor: liqColors.bg, color: liqColors.text }}>{product.liquidity}</span>
              <span className="px-2 py-0.5 rounded-full text-label-sm" style={{ backgroundColor: '#EBF9F1', color: '#1A7A47' }}>{product.risk}</span>
              <span className="px-2 py-0.5 rounded-full text-label-sm bg-hairline-soft text-muted">{product.protection}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-body-md text-muted">Est. gain on $3,200/yr</span>
              <span className="text-headline-md text-primary font-bold">+${product.annual.toFixed(0)}</span>
            </div>
            <p className="text-body-md text-muted">{product.note}</p>
            {isSelected && (
              <div className="mt-3" style={{ animation: 'popIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards' }}>
                <span className="px-2.5 py-1 rounded-full text-label-sm bg-primary text-white">Selected</span>
              </div>
            )}
          </button>
        )
      })}

      <p className="text-body-md text-muted text-center">All three keep your money safe — the tradeoff is liquidity vs. rate.</p>
      <Button variant="primary" label={selected ? `Continue with ${selected.name}` : 'Select a product to continue'} onClick={onNext} disabled={!selectedProduct} />
    </div>
  )
}

// Step 2 — Confirm
function ScreenConfirm({ selectedProduct, onConfirm, onChangeProduct }: { selectedProduct: string | null; onConfirm: () => void; onChangeProduct: () => void }) {
  const product = PRODUCTS.find(p => p.id === selectedProduct) || PRODUCTS[0]
  const annual = product.annual
  const projections = [
    { period: '1 month',   earn: (annual / 12).toFixed(2), width: 8 },
    { period: '3 months',  earn: (annual / 4).toFixed(2),  width: 25 },
    { period: '6 months',  earn: (annual / 2).toFixed(2),  width: 50 },
    { period: '12 months', earn: annual.toFixed(2),         width: 100 },
  ]
  return (
    <div className="flex flex-col gap-4">
      <div>
        <SectionLabel>Confirm placement</SectionLabel>
        <h1 className="text-headline-lg text-ink">$3,200 →<br /><span className="text-primary">{product.name}.</span></h1>
      </div>

      <Card>
        <p className="text-label-sm text-muted uppercase mb-1">Summary</p>
        <Row label="Amount" value="$3,200" valueVariant="mono" />
        <Row label="Product" value={product.name} />
        <Row label="APY" value={product.rate} valueVariant="primary" />
        <Row label="Liquidity" value={product.liquidity} />
        <Row label="Protection" value={product.risk} />
        <Row label="Checking after move" value="$1,010 · bills covered" valueVariant="primary" />
        <Row label="Buffer remaining" value="$1,010 · rent + bills covered" valueVariant="green" noBorder />
      </Card>

      <Card className="bg-soft border-0">
        <p className="text-label-sm text-muted uppercase mb-4">Projected earnings on $3,200</p>
        <div className="flex flex-col gap-3">
          {projections.map(({ period, earn, width }, i) => (
            <div key={period} style={{ animation: `slideUp 0.3s ease forwards ${0.1 + i * 0.07}s`, opacity: 0 }}>
              <div className="flex justify-between items-baseline mb-1.5">
                <span className="text-body-md text-muted">{period}</span>
                <span className="font-mono text-primary-active text-mono-sm">+${earn}</span>
              </div>
              <div className="h-1 rounded-full bg-primary-dis">
                <div className="h-1 rounded-full bg-primary" style={{ width: `${width}%`, transition: `width 0.6s cubic-bezier(0.22,1,0.36,1) ${0.2 + i * 0.1}s` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex flex-col gap-3 mt-2">
        <Button variant="primary" label="Confirm — place $3,200" onClick={onConfirm} />
        <Button variant="secondary" label="Change product" onClick={onChangeProduct} />
      </div>
      <p className="text-body-md text-muted text-center -mt-1">No fees · reversal available per product terms</p>
    </div>
  )
}

// Step 3 — Outcome
function ScreenOutcome({ selectedProduct, onFinish, onViewAnalytics }: { selectedProduct: string | null; onFinish: () => void; onViewAnalytics: () => void }) {
  const product = PRODUCTS.find(p => p.id === selectedProduct) || PRODUCTS[0]
  const annualInt = Math.round(product.annual)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4"><AnimatedCheck /></div>
        <div style={{ animation: 'fadeIn 0.3s ease forwards 0.6s', opacity: 0 }}>
          <SectionLabel centered>Placement confirmed</SectionLabel>
        </div>
        <div style={{ animation: 'slideUp 0.35s ease forwards 0.65s', opacity: 0 }}>
          <h1 className="text-headline-lg text-ink">Your money is<br /><span className="text-primary">working now.</span></h1>
        </div>
      </div>

      {/* Reversibility notice */}
      <div style={{ animation: 'fadeIn 0.3s ease forwards 0.7s', opacity: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, backgroundColor: '#EBF9F1', borderRadius: 10, padding: '10px 14px', border: '1px solid #A7EFC5' }}>
          <ArrowCounterClockwise size={14} weight="bold" color="#1A7A47" style={{ flexShrink: 0 }} />
          <p style={{ fontSize: 12, color: '#1A7A47', lineHeight: 1.4 }}>$3,200 placed in {product.name}. <strong>Reversible per product terms. Checking buffer: $1,010 · rent covered.</strong></p>
        </div>
      </div>

      <div style={{ animation: 'slideInLeft 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards 0.75s', opacity: 0 }}>
        <Card className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-success flex-shrink-0" style={{ animation: 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards 0.9s', opacity: 0 }} />
          <div>
            <p className="text-headline-md text-ink">$3,200 placed at {product.rate} APY</p>
            <p className="text-body-md text-muted">Est. +$<CountUp to={annualInt} duration={800} delay={900} />/yr vs. ~$0.32/yr in checking</p>
          </div>
        </Card>
      </div>

      <div style={{ animation: 'cardEntrance 0.4s ease forwards 0.85s', opacity: 0 }}>
        <Card>
          <p className="text-label-sm text-muted uppercase mb-1">Placement details</p>
          {[
            { label: 'Product',              value: product.name,       variant: 'default' as const },
            { label: 'Amount placed',        value: '$3,200',           variant: 'mono'    as const },
            { label: 'APY',                  value: product.rate,       variant: 'primary' as const },
            { label: 'First interest credit',value: 'Jul 3, 2026',      variant: 'default' as const },
            { label: 'Checking balance',     value: '$1,010 · covered', variant: 'default' as const },
          ].map((row, i) => (
            <ARow key={row.label} delay={0.9 + i * 0.06}>
              <Row label={row.label} value={row.value} valueVariant={row.variant} noBorder={i === 4} />
            </ARow>
          ))}
        </Card>
      </div>

      <div style={{ animation: 'cardEntrance 0.4s ease forwards 1.1s', opacity: 0 }}>
        <Card>
          <p className="text-label-sm text-muted uppercase mb-1">What happens next</p>
          {[
            { label: 'Jul 3 — first interest', value: `+$${(product.annual / 12).toFixed(2)}`, variant: 'green'   as const },
            { label: 'Jun 14 — rent auto-pay', value: 'from checking ✓',                      variant: 'default' as const },
            { label: 'Jun 25 — next paycheck', value: 'checking replenished',                  variant: 'default' as const },
          ].map((row, i) => (
            <ARow key={row.label} delay={1.15 + i * 0.06}>
              <Row label={row.label} value={row.value} valueVariant={row.variant} noBorder={i === 2} />
            </ARow>
          ))}
        </Card>
      </div>

      {/* Mission analytics entry */}
      <div style={{ animation: 'fadeIn 0.3s ease forwards 1.3s', opacity: 0 }}>
        <button onClick={onViewAnalytics} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#EEF3FF', borderRadius: 12, padding: '12px 16px', border: '1px solid #B9CCFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ChartBar size={16} weight="fill" color="#2D6BFF" />
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#2D6BFF' }}>View mission performance</p>
              <p style={{ fontSize: 11, color: '#6B7280' }}>See how this move improved your goal progress</p>
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="#2D6BFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>

      <div style={{ animation: 'fadeIn 0.3s ease forwards 1.4s', opacity: 0 }}>
        <Button variant="primary" label="Back to home" onClick={onFinish} />
      </div>
    </div>
  )
}

export default function FlowB({ step, selectedProduct, onNext, onBack, onSelectProduct, onFinish, onViewAnalytics }: FlowBProps) {
  const screens = [
    <ScreenAnalysis key="analysis" onNext={onNext} />,
    <ScreenChoose key="choose" selectedProduct={selectedProduct} onSelect={onSelectProduct} onNext={onNext} />,
    <ScreenConfirm key="confirm" selectedProduct={selectedProduct} onConfirm={onNext} onChangeProduct={onBack} />,
    <ScreenOutcome key="outcome" selectedProduct={selectedProduct} onFinish={onFinish} onViewAnalytics={onViewAnalytics} />,
  ]

  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      <div className="flex items-center justify-between px-container pt-12 pb-4">
        <button onClick={onBack} className="flex items-center gap-1.5" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className="text-body-md text-muted">Home</span>
        </button>
        <StepDots total={4} current={step} />
      </div>
      <div className="flex-1 px-container pb-8 overflow-y-auto">
        {screens[step]}
      </div>
    </div>
  )
}
