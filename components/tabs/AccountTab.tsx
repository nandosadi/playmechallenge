'use client'

const ACCOUNTS_LIST = [
  { name: 'Chase Checking',    balance: '$4,210',  icon: '🏦', type: 'Checking' },
  { name: 'High-Yield Pocket', balance: '$31,400', icon: '📈', type: 'HYSA · 4.85% APY' },
  { name: 'Savings',           balance: '$12,230', icon: '🏺', type: 'Savings' },
]

const SETTINGS_ROWS = [
  { icon: '🔔', label: 'Notifications',   sub: 'Missions, payments, alerts' },
  { icon: '🔐', label: 'Security',         sub: 'Face ID, passcode' },
  { icon: '🎨', label: 'Appearance',       sub: 'Dark mode, text size' },
  { icon: '🤝', label: 'Linked accounts',  sub: '3 connected' },
  { icon: '❓', label: 'Help & Support',   sub: 'Chat, FAQ' },
]

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 4L10 8L6 12" stroke="#9AA3B2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function AccountTab() {
  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      {/* Header */}
      <div style={{ paddingTop: 52, paddingBottom: 0, paddingLeft: 20, paddingRight: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0E1116', letterSpacing: '-0.01em', marginBottom: 16 }}>Account</h1>
      </div>

      <div
        className="flex-1 overflow-y-auto px-container"
        style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))' }}
      >
        {/* Profile card */}
        <div style={{ animation: 'slideUp 0.35s ease forwards', opacity: 0, marginBottom: 20 }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: 16,
            padding: '20px',
            border: '1px solid #E5E9F0',
            boxShadow: '0 1px 2px rgba(14,17,22,0.04)',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'linear-gradient(135deg, #2D6BFF 0%, #0E1F44 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ color: 'white', fontSize: 20, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>NS</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 17, fontWeight: 700, color: '#0E1116', marginBottom: 2 }}>Nando Sadi</p>
              <p style={{ fontSize: 13, color: '#6B7280' }}>nandosadi@gmail.com</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, color: '#FF6B2B',
                  backgroundColor: '#FFF1EB', padding: '2px 8px',
                  borderRadius: 9999, letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>Clementine Premium</span>
                <span style={{ fontSize: 11, color: '#9AA3B2' }}>Since 2021</span>
              </div>
            </div>
          </div>
        </div>

        {/* My accounts */}
        <div style={{ animation: 'slideUp 0.35s ease forwards 0.08s', opacity: 0, marginBottom: 20 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>My Accounts</p>
          <div className="bg-card rounded-lg shadow-card">
            {ACCOUNTS_LIST.map((acc, i) => (
              <div key={acc.name} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 16px',
                borderBottom: i < ACCOUNTS_LIST.length - 1 ? '1px solid #EEF0F4' : 'none',
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  backgroundColor: '#F4F6FA',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 17,
                }}>
                  {acc.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: '#0E1116' }}>{acc.name}</p>
                  <p style={{ fontSize: 12, color: '#9AA3B2' }}>{acc.type}</p>
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#0E1116', fontFamily: 'JetBrains Mono, monospace' }}>{acc.balance}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PlayMe AI summary */}
        <div style={{ animation: 'slideUp 0.35s ease forwards 0.13s', opacity: 0, marginBottom: 20 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>PlayMe · AI Summary</p>
          <div style={{
            backgroundColor: '#EEF3FF',
            borderRadius: 14,
            border: '1px solid #B9CCFF',
            overflow: 'hidden',
          }}>
            {[
              { label: 'Active rules',           value: '1 rule enabled' },
              { label: 'Missions this month',     value: '7 completed' },
              { label: 'Rewards via PlayMe',      value: '1,280 pts' },
              { label: 'Est. annual impact',      value: '~$80/yr' },
            ].map((row, i) => (
              <div key={row.label} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 16px',
                borderBottom: i < 3 ? '1px solid #D4DEFF' : 'none',
              }}>
                <span style={{ fontSize: 14, color: '#3A4151' }}>{row.label}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#2D6BFF' }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div style={{ animation: 'slideUp 0.35s ease forwards 0.18s', opacity: 0, marginBottom: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Settings</p>
          <div className="bg-card rounded-lg shadow-card">
            {SETTINGS_ROWS.map((row, i) => (
              <button key={row.label} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 16px',
                borderBottom: i < SETTINGS_ROWS.length - 1 ? '1px solid #EEF0F4' : 'none',
                background: 'none', border: 'none', cursor: 'pointer',
                textAlign: 'left',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9,
                  backgroundColor: '#F4F6FA',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, flexShrink: 0,
                }}>
                  {row.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: '#0E1116' }}>{row.label}</p>
                  <p style={{ fontSize: 12, color: '#9AA3B2' }}>{row.sub}</p>
                </div>
                <ChevronIcon />
              </button>
            ))}
          </div>
        </div>

        {/* Sign out */}
        <button style={{
          width: '100%', padding: '14px',
          backgroundColor: 'white', borderRadius: 12,
          border: '1px solid #E5E9F0',
          fontSize: 14, fontWeight: 600, color: '#E5484D',
          fontFamily: 'Inter, sans-serif', cursor: 'pointer',
        }}>
          Sign out
        </button>
      </div>
    </div>
  )
}
