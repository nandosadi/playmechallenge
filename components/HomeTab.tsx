'use client'

// Clementine Bank — Home Tab
// Shows balance hero, quick actions, PlayMe AI missions, upcoming payments

interface HomeTabProps {
  onStartFlowA: () => void
  onStartFlowB: () => void
}

const ACCOUNTS = [
  { name: 'Checking', balance: '$4,210' },
  { name: 'HYSA',     balance: '$31,400' },
  { name: 'Savings',  balance: '$12,230' },
]

const UPCOMING = [
  { name: 'Electricity', date: 'Jun 6',  amount: '$148',    urgent: true },
  { name: 'Rent',        date: 'Jun 14', amount: '$1,800',  urgent: false },
  { name: 'Subscriptions', date: 'Jun 18', amount: '$47',   urgent: false },
]

// Quick action icon SVGs
function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 14V6M10 6L7 9M10 6L13 9" stroke="#2D6BFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function PayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 6V14M10 14L7 11M10 14L13 11" stroke="#2D6BFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function TransferIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 8L8 4L12 8M16 12L12 16L8 12" stroke="#2D6BFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 4V13M12 16V7" stroke="#2D6BFF" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
function MoreIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="5" cy="10" r="1.5" fill="#2D6BFF" />
      <circle cx="10" cy="10" r="1.5" fill="#2D6BFF" />
      <circle cx="15" cy="10" r="1.5" fill="#2D6BFF" />
    </svg>
  )
}

// Clementine micro logo mark for use in-app
function ClementineMarkSm() {
  return (
    <svg width="18" height="18" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="28" fill="#FF6B2B" />
      <circle cx="28" cy="28" r="7" fill="#FF8C52" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180
        return (
          <line key={angle} x1="28" y1="28"
            x2={28 + 21 * Math.cos(rad)} y2={28 + 21 * Math.sin(rad)}
            stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"
          />
        )
      })}
      <circle cx="28" cy="28" r="21" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
    </svg>
  )
}

// PlayMe AI spark mark
function AISparkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2L9.2 6.8L14 8L9.2 9.2L8 14L6.8 9.2L2 8L6.8 6.8L8 2Z" fill="#2D6BFF" />
    </svg>
  )
}

export default function HomeTab({ onStartFlowA, onStartFlowB }: HomeTabProps) {
  const quickActions = [
    { label: 'Send',     icon: <SendIcon /> },
    { label: 'Pay',      icon: <PayIcon /> },
    { label: 'Transfer', icon: <TransferIcon /> },
    { label: 'More',     icon: <MoreIcon /> },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      {/* Bank header */}
      <div
        className="flex items-center justify-between px-container"
        style={{ paddingTop: 52, paddingBottom: 16 }}
      >
        <div className="flex items-center gap-2">
          <ClementineMarkSm />
          <span style={{
            fontSize: 16,
            fontWeight: 700,
            color: '#0E1116',
            letterSpacing: '-0.01em',
            fontFamily: 'Inter, sans-serif',
          }}>
            clementine
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Bell icon */}
          <button style={{ position: 'relative', padding: 4 }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C10 2 6 4 6 9V13L4 15H16L14 13V9C14 4 10 2 10 2Z" stroke="#6B7280" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M8 15C8 16.1 8.9 17 10 17C11.1 17 12 16.1 12 15" stroke="#6B7280" strokeWidth="1.6" />
            </svg>
            <span style={{
              position: 'absolute', top: 2, right: 2,
              width: 7, height: 7, borderRadius: 9999,
              backgroundColor: '#FF6B2B',
              border: '1.5px solid #F4F6FA',
            }} />
          </button>
          {/* Avatar */}
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(135deg, #2D6BFF 0%, #0E1F44 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: 'white', fontSize: 11, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>NS</span>
          </div>
        </div>
      </div>

      {/* Content — scrollable */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))' }}
      >
        {/* Greeting */}
        <div className="px-container mb-4" style={{ animation: 'slideUp 0.35s ease forwards', opacity: 0 }}>
          <p className="text-body-md text-muted">Wednesday, Jun 3 · 2:14 PM</p>
          <h1 className="text-headline-lg text-ink">Good morning, Nando 👋</h1>
        </div>

        {/* Balance hero card */}
        <div className="px-container mb-4" style={{ animation: 'slideUp 0.35s ease forwards 0.05s', opacity: 0 }}>
          <div style={{
            background: 'linear-gradient(135deg, #0E1F44 0%, #1a3570 60%, #2D6BFF 100%)',
            borderRadius: 20,
            padding: '20px',
          }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
              Total balance
            </p>
            <p style={{ color: 'white', fontSize: 34, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 16 }}>
              $47,840
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {ACCOUNTS.map(acc => (
                <div key={acc.name} style={{
                  flex: 1,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 10,
                  padding: '8px 10px',
                }}>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 600, letterSpacing: '0.04em', marginBottom: 2 }}>{acc.name.toUpperCase()}</p>
                  <p style={{ color: 'white', fontSize: 13, fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>{acc.balance}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="px-container mb-5" style={{ animation: 'slideUp 0.35s ease forwards 0.1s', opacity: 0 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {quickActions.map(({ label, icon }) => (
              <button
                key={label}
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  borderRadius: 12,
                  padding: '12px 4px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  border: '1px solid #E5E9F0',
                  boxShadow: '0 1px 2px rgba(14,17,22,0.04)',
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  backgroundColor: '#EEF3FF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {icon}
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#3A4151', fontFamily: 'Inter, sans-serif' }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* PlayMe AI Missions */}
        <div className="px-container mb-5" style={{ animation: 'slideUp 0.35s ease forwards 0.15s', opacity: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <AISparkIcon />
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', color: '#6B7280', textTransform: 'uppercase' }}>PlayMe · AI Missions</span>
            </div>
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.04em',
              color: '#FF6B2B', backgroundColor: '#FFF1EB',
              padding: '2px 7px', borderRadius: 9999, textTransform: 'uppercase',
            }}>
              2 ready
            </span>
          </div>

          {/* Mission A */}
          <div style={{ animation: 'notifBounce 0.5s cubic-bezier(0.22,1,0.36,1) forwards 0.2s', opacity: 0, marginBottom: 10 }}>
            <button
              onClick={onStartFlowA}
              className="w-full text-left bg-card shadow-card active:scale-[0.99] transition-transform"
              style={{ borderRadius: '0 16px 16px 0', borderLeft: '3px solid #2D6BFF', border: '1px solid #E5E9F0', borderLeftColor: '#2D6BFF', borderLeftWidth: 3 }}
            >
              <div style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#2D6BFF', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Optimization Mission</span>
                  <span style={{
                    fontSize: 9, fontWeight: 700, color: 'white', backgroundColor: '#2D6BFF',
                    padding: '1px 5px', borderRadius: 4, letterSpacing: '0.04em', textTransform: 'uppercase',
                  }}>NEW</span>
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#0E1116', marginBottom: 3 }}>
                  Smarter way to pay your electricity bill
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, color: '#6B7280' }}>Earn 444 pts · buffer protected</span>
                  <span style={{ fontSize: 12, color: '#3CCB7F', fontWeight: 600 }}>↑ on track</span>
                </div>
              </div>
            </button>
          </div>

          {/* Mission B */}
          <div style={{ animation: 'notifBounce 0.5s cubic-bezier(0.22,1,0.36,1) forwards 0.32s', opacity: 0 }}>
            <button
              onClick={onStartFlowB}
              className="w-full text-left bg-card shadow-card active:scale-[0.99] transition-transform"
              style={{ borderRadius: '0 16px 16px 0', border: '1px solid #E5E9F0', borderLeftColor: '#FF6B2B', borderLeftWidth: 3 }}
            >
              <div style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#FF6B2B', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Idle Cash Detected</span>
                  <span style={{
                    fontSize: 9, fontWeight: 700, color: 'white', backgroundColor: '#FF6B2B',
                    padding: '1px 5px', borderRadius: 4, letterSpacing: '0.04em', textTransform: 'uppercase',
                  }}>$3,200</span>
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#0E1116', marginBottom: 3 }}>
                  Your idle cash could earn $155–$169/yr
                </p>
                <p style={{ fontSize: 12, color: '#6B7280' }}>Sitting in checking for 45 days · no risk options</p>
              </div>
            </button>
          </div>
        </div>

        {/* Upcoming payments */}
        <div className="px-container mb-4" style={{ animation: 'slideUp 0.35s ease forwards 0.25s', opacity: 0 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Upcoming payments</p>
          <div className="bg-card rounded-lg shadow-card">
            {UPCOMING.map((item, i) => (
              <div
                key={item.name}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderBottom: i < UPCOMING.length - 1 ? '1px solid #EEF0F4' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 10,
                    backgroundColor: item.urgent ? '#EEF3FF' : '#F4F6FA',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: 16 }}>
                      {item.name === 'Electricity' ? '⚡' : item.name === 'Rent' ? '🏠' : '📱'}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: '#0E1116' }}>{item.name}</p>
                    <p style={{ fontSize: 12, color: '#9AA3B2' }}>{item.date}</p>
                  </div>
                </div>
                <p style={{
                  fontSize: 14, fontWeight: 600,
                  color: item.urgent ? '#2D6BFF' : '#0E1116',
                  fontFamily: 'JetBrains Mono, monospace',
                }}>
                  {item.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
