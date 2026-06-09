'use client'

// Chip SVG
function ChipIcon() {
  return (
    <svg width="32" height="26" viewBox="0 0 32 26" fill="none">
      <rect x="1" y="1" width="30" height="24" rx="4" fill="#D4A84B" stroke="#B8902A" strokeWidth="0.5" />
      <rect x="11" y="1" width="10" height="24" fill="#C9993A" />
      <rect x="1" y="9" width="30" height="8" fill="#C9993A" />
      <rect x="11" y="9" width="10" height="8" fill="#B8902A" />
    </svg>
  )
}

const RECENT_ON_CARD = [
  { name: 'Electricity Bill',  date: 'Jun 3',  amount: '-$148.00', icon: '⚡' },
  { name: 'Whole Foods',       date: 'Jun 1',  amount: '-$67.34',  icon: '🛒' },
  { name: 'Amazon',            date: 'May 30', amount: '-$43.20',  icon: '📦' },
  { name: 'Starbucks',         date: 'May 29', amount: '-$7.50',   icon: '☕' },
  { name: 'United Airlines',   date: 'May 24', amount: '-$312.00', icon: '✈️' },
]

export default function CardsTab() {
  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      {/* Header */}
      <div style={{ paddingTop: 52, paddingBottom: 16, paddingLeft: 20, paddingRight: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0E1116', letterSpacing: '-0.01em' }}>Cards</h1>
      </div>

      <div
        className="flex-1 overflow-y-auto px-container"
        style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))' }}
      >
        {/* Visual credit card */}
        <div style={{ animation: 'slideUp 0.4s ease forwards', opacity: 0, marginBottom: 20 }}>
          <div style={{
            background: 'linear-gradient(135deg, #0E1F44 0%, #1a3570 55%, #2D6BFF 100%)',
            borderRadius: 20,
            padding: '24px 22px',
            position: 'relative',
            overflow: 'hidden',
            minHeight: 190,
            boxShadow: '0 12px 40px rgba(14,31,68,0.35)',
          }}>
            {/* Decorative circles */}
            <div style={{
              position: 'absolute', width: 220, height: 220, borderRadius: '50%',
              background: 'rgba(255,255,255,0.04)',
              top: -80, right: -60,
            }} />
            <div style={{
              position: 'absolute', width: 160, height: 160, borderRadius: '50%',
              background: 'rgba(255,255,255,0.04)',
              bottom: -50, right: 30,
            }} />
            {/* Clementine Bank label */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
              <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                clementine bank
              </span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>Sapphire Rewards</span>
            </div>
            {/* Chip */}
            <div style={{ marginBottom: 18 }}>
              <ChipIcon />
            </div>
            {/* Card number */}
            <p style={{
              color: 'rgba(255,255,255,0.9)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 16,
              letterSpacing: '0.18em',
              marginBottom: 18,
            }}>
              •••• &nbsp;•••• &nbsp;•••• &nbsp;4821
            </p>
            {/* Bottom row */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2, fontFamily: 'Inter, sans-serif' }}>Card Holder</p>
                <p style={{ color: 'white', fontSize: 13, fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>Nando Sadi</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2, fontFamily: 'Inter, sans-serif' }}>Expires</p>
                <p style={{ color: 'white', fontSize: 13, fontWeight: 500, fontFamily: 'JetBrains Mono, monospace' }}>09/28</p>
              </div>
              <p style={{ color: 'white', fontSize: 22, fontWeight: 800, fontStyle: 'italic', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}>VISA</p>
            </div>
          </div>
        </div>

        {/* Card stats */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, animation: 'slideUp 0.35s ease forwards 0.1s', opacity: 0 }}>
          {[
            { label: 'Available credit', value: '$8,500', sub: 'of $10,000' },
            { label: 'Current balance', value: '$1,247', sub: 'due Jul 15' },
          ].map(stat => (
            <div key={stat.label} style={{
              flex: 1, backgroundColor: 'white', borderRadius: 14,
              padding: '14px', border: '1px solid #E5E9F0',
              boxShadow: '0 1px 2px rgba(14,17,22,0.04)',
            }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#9AA3B2', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 4 }}>{stat.label}</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: '#0E1116', letterSpacing: '-0.01em', marginBottom: 1 }}>{stat.value}</p>
              <p style={{ fontSize: 11, color: '#9AA3B2' }}>{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Rewards via PlayMe */}
        <div style={{ animation: 'slideUp 0.35s ease forwards 0.15s', opacity: 0, marginBottom: 20 }}>
          <div style={{
            backgroundColor: '#EEF3FF', borderRadius: 14,
            padding: '14px 16px',
            border: '1px solid #B9CCFF',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8 2L9.2 6.8L14 8L9.2 9.2L8 14L6.8 9.2L2 8L6.8 6.8L8 2Z" fill="#2D6BFF" /></svg>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#2D6BFF', letterSpacing: '0.06em', textTransform: 'uppercase' }}>PlayMe rewards</span>
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#0E1116' }}>1,280 points earned this month</p>
              <p style={{ fontSize: 12, color: '#6B7280' }}>~$12.80 redemption value · travel category</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 22, fontWeight: 700, color: '#2D6BFF', letterSpacing: '-0.01em' }}>1,280</p>
              <p style={{ fontSize: 11, color: '#9AA3B2' }}>pts</p>
            </div>
          </div>
        </div>

        {/* Recent transactions on this card */}
        <div style={{ animation: 'slideUp 0.35s ease forwards 0.2s', opacity: 0 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Recent on this card</p>
          <div className="bg-card rounded-lg shadow-card">
            {RECENT_ON_CARD.map((tx, i) => (
              <div key={tx.name} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 16px',
                borderBottom: i < RECENT_ON_CARD.length - 1 ? '1px solid #EEF0F4' : 'none',
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  backgroundColor: '#F4F6FA',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, flexShrink: 0,
                }}>
                  {tx.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: '#0E1116' }}>{tx.name}</p>
                  <p style={{ fontSize: 12, color: '#9AA3B2' }}>{tx.date}</p>
                </div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#0E1116', fontFamily: 'JetBrains Mono, monospace' }}>{tx.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
