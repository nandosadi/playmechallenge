'use client'

import { TrendUp, CheckCircle, ArrowCounterClockwise, Target, House, CreditCard, ChartBar } from '@phosphor-icons/react'

interface MissionAnalyticsProps {
  onBack: () => void
}

function StatCard({ label, value, sub, color = '#2D6BFF' }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: 14, padding: '16px', border: '1px solid #E5E9F0', boxShadow: '0 1px 3px rgba(14,17,22,0.05)', flex: 1 }}>
      <p style={{ fontSize: 11, fontWeight: 600, color: '#9AA3B2', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{label}</p>
      <p style={{ fontSize: 22, fontWeight: 700, color, letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ fontSize: 11, color: '#9AA3B2', marginTop: 4 }}>{sub}</p>}
    </div>
  )
}

const MISSION_HISTORY = [
  {
    icon: <TrendUp size={16} weight="fill" color="#1A7A47" />,
    iconBg: '#EBF9F1',
    title: 'Moved $3,200 to High-Yield Savings',
    meta: 'Jun 3, 2026 · Est. +$12.76/mo',
    tag: 'Completed',
    tagColor: '#1A7A47',
    tagBg: '#EBF9F1',
    detail: 'Bills covered, buffer protected, goal prioritized.',
  },
  {
    icon: <CreditCard size={16} weight="fill" color="#2D6BFF" />,
    iconBg: '#EEF3FF',
    title: 'Rewards Card for electricity payment',
    meta: 'Jun 3, 2026 · 444 pts captured',
    tag: 'Rule enabled',
    tagColor: '#2D6BFF',
    tagBg: '#EEF3FF',
    detail: 'Checking buffer preserved at $4,210.',
  },
  {
    icon: <CheckCircle size={16} weight="fill" color="#2D6BFF" />,
    iconBg: '#EEF3FF',
    title: 'Rewards Card for internet bill',
    meta: 'May 28, 2026 · 238 pts captured',
    tag: 'Rule applied',
    tagColor: '#2D6BFF',
    tagBg: '#EEF3FF',
    detail: 'Automatic — no action needed.',
  },
  {
    icon: <ArrowCounterClockwise size={16} weight="fill" color="#9AA3B2" />,
    iconBg: '#F4F6FA',
    title: 'No idle cash move · rent due in 4 days',
    meta: 'May 10, 2026 · PlayMe held',
    tag: 'Held back',
    tagColor: '#6B7280',
    tagBg: '#F4F6FA',
    detail: 'Checking buffer kept intact for upcoming rent.',
  },
]

export default function MissionAnalytics({ onBack }: MissionAnalyticsProps) {
  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      {/* Header */}
      <div className="flex items-center justify-between px-container" style={{ paddingTop: 52, paddingBottom: 16 }}>
        <button onClick={onBack} className="flex items-center gap-1.5" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span style={{ fontSize: 14, color: '#6B7280' }}>Back</span>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <ChartBar size={14} weight="fill" color="#2D6BFF" />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>PlayMe · Impact</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-container" style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))' }}>

        {/* Title */}
        <div style={{ animation: 'slideUp 0.35s ease forwards', opacity: 0, marginBottom: 20 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#0E1116', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 4 }}>Optimization<br />Results</h1>
          <p style={{ fontSize: 13, color: '#9AA3B2' }}>June 2026 · 7 missions completed</p>
        </div>

        {/* Top-line value captured */}
        <div style={{ animation: 'slideUp 0.35s ease forwards 0.06s', opacity: 0, marginBottom: 20 }}>
          <div style={{ background: 'linear-gradient(135deg, #0E1F44 0%, #1a3570 60%, #2D6BFF 100%)', borderRadius: 18, padding: '20px' }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Total value captured this month</p>
            <p style={{ color: 'white', fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 6 }}>$42.18</p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>From optimized interest, rewards, and avoided idle cash.</p>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ animation: 'slideUp 0.35s ease forwards 0.1s', opacity: 0, display: 'flex', gap: 10, marginBottom: 20 }}>
          <StatCard label="Rewards" value="1,280 pts" sub="~$12.80 value" color="#2D6BFF" />
          <StatCard label="Interest" value="$29.38" sub="idle cash moved" color="#1A7A47" />
        </div>

        {/* Goal progress */}
        <div style={{ animation: 'slideUp 0.35s ease forwards 0.14s', opacity: 0, marginBottom: 20 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Goal progress impact</p>
          <div style={{ backgroundColor: 'white', borderRadius: 14, border: '1px solid #E5E9F0', boxShadow: '0 1px 3px rgba(14,17,22,0.05)', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: '#EEF3FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <House size={18} weight="fill" color="#2D6BFF" />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#0E1116' }}>Home down payment</p>
                <p style={{ fontSize: 12, color: '#9AA3B2' }}>Target: Dec 2026</p>
              </div>
              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#1A7A47' }}>+3 days closer</p>
                <p style={{ fontSize: 11, color: '#9AA3B2' }}>this month</p>
              </div>
            </div>
            <div style={{ height: 6, borderRadius: 9999, backgroundColor: '#EEF0F4', marginBottom: 6 }}>
              <div style={{ height: 6, borderRadius: 9999, background: 'linear-gradient(90deg, #2D6BFF, #3CCB7F)', width: '62%', transition: 'width 0.8s cubic-bezier(0.22,1,0.36,1)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p style={{ fontSize: 11, color: '#9AA3B2' }}>$28,600 saved</p>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#2D6BFF' }}>62% · $46,000 goal</p>
            </div>
          </div>
        </div>

        {/* Rule performance */}
        <div style={{ animation: 'slideUp 0.35s ease forwards 0.18s', opacity: 0, marginBottom: 20 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Rule performance</p>
          <div style={{ backgroundColor: '#EEF3FF', borderRadius: 14, border: '1px solid #B9CCFF', padding: '16px' }}>
            {[
              { label: 'Active rules',                  value: '1 rule enabled' },
              { label: 'Actions completed automatically', value: '8 actions' },
              { label: 'Reversals needed',              value: '0' },
              { label: 'Times PlayMe chose not to act', value: '2 this month' },
            ].map((row, i, arr) => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: i > 0 ? 10 : 0, paddingBottom: i < arr.length - 1 ? 10 : 0, borderBottom: i < arr.length - 1 ? '1px solid #D4DEFF' : 'none' }}>
                <span style={{ fontSize: 13, color: '#3A4151' }}>{row.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#2D6BFF' }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mission history */}
        <div style={{ animation: 'slideUp 0.35s ease forwards 0.22s', opacity: 0, marginBottom: 20 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Mission history</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MISSION_HISTORY.map((m, i) => (
              <div key={i} style={{ backgroundColor: 'white', borderRadius: 14, border: '1px solid #E5E9F0', boxShadow: '0 1px 3px rgba(14,17,22,0.05)', padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 9, backgroundColor: m.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {m.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 9, fontWeight: 700, color: m.tagColor, backgroundColor: m.tagBg, padding: '2px 7px', borderRadius: 9999, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{m.tag}</span>
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#0E1116', marginBottom: 2, lineHeight: 1.35 }}>{m.title}</p>
                    <p style={{ fontSize: 11, color: '#9AA3B2', marginBottom: 4 }}>{m.meta}</p>
                    <p style={{ fontSize: 11, color: '#6B7280' }}>Logic: {m.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* "Why we didn't act" highlight */}
        <div style={{ animation: 'slideUp 0.35s ease forwards 0.26s', opacity: 0, marginBottom: 8 }}>
          <div style={{ backgroundColor: '#FAFBFC', borderRadius: 14, border: '1px solid #E5E9F0', padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Target size={14} weight="fill" color="#9AA3B2" />
              <p style={{ fontSize: 11, fontWeight: 700, color: '#9AA3B2', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Why we didn't act · May 10</p>
            </div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#3A4151', marginBottom: 3 }}>No idle cash move · rent was 4 days away</p>
            <p style={{ fontSize: 12, color: '#9AA3B2' }}>PlayMe kept your checking buffer untouched. Moving cash 4 days before rent would have cut your safety margin below threshold.</p>
          </div>
        </div>

      </div>
    </div>
  )
}
