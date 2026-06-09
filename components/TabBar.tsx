'use client'

type Tab = 'home' | 'activity' | 'cards' | 'account'

interface TabBarProps {
  active: Tab
  onChange: (tab: Tab) => void
  visible: boolean
  notifBadge?: boolean
}

const tabs: { id: Tab; label: string; icon: (active: boolean) => React.ReactNode }[] = [
  {
    id: 'home',
    label: 'Home',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M3 9.5L11 3L19 9.5V19C19 19.55 18.55 20 18 20H14V14H8V20H4C3.45 20 3 19.55 3 19V9.5Z"
          stroke={active ? '#2D6BFF' : '#9AA3B2'}
          strokeWidth="1.6"
          fill={active ? '#EEF3FF' : 'none'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'activity',
    label: 'Activity',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 6H18M4 11H14M4 16H10" stroke={active ? '#2D6BFF' : '#9AA3B2'} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="18" cy="15" r="3" fill={active ? '#2D6BFF' : 'none'} stroke={active ? '#2D6BFF' : '#9AA3B2'} strokeWidth="1.6" />
        <path d="M18 14V16M17 15H19" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'cards',
    label: 'Cards',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="5" width="18" height="12" rx="2" stroke={active ? '#2D6BFF' : '#9AA3B2'} strokeWidth="1.6" fill={active ? '#EEF3FF' : 'none'} />
        <path d="M2 9H20" stroke={active ? '#2D6BFF' : '#9AA3B2'} strokeWidth="1.6" />
        <rect x="5" y="13" width="4" height="1.5" rx="0.75" fill={active ? '#2D6BFF' : '#9AA3B2'} />
      </svg>
    ),
  },
  {
    id: 'account',
    label: 'Account',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="8" r="3.5" stroke={active ? '#2D6BFF' : '#9AA3B2'} strokeWidth="1.6" fill={active ? '#EEF3FF' : 'none'} />
        <path d="M4 19C4 15.686 7.134 13 11 13C14.866 13 18 15.686 18 19" stroke={active ? '#2D6BFF' : '#9AA3B2'} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function TabBar({ active, onChange, visible, notifBadge = false }: TabBarProps) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid #E5E9F0',
        paddingBottom: 'env(safe-area-inset-bottom, 8px)',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 300ms cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <div style={{ display: 'flex', height: 60 }}>
        {tabs.map((tab) => {
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                position: 'relative',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <div style={{ position: 'relative' }}>
                {tab.icon(isActive)}
                {/* Notification badge on Home tab */}
                {tab.id === 'home' && notifBadge && (
                  <span style={{
                    position: 'absolute',
                    top: -2, right: -2,
                    width: 8, height: 8,
                    borderRadius: 9999,
                    backgroundColor: '#FF6B2B',
                    border: '1.5px solid white',
                  }} />
                )}
              </div>
              <span style={{
                fontSize: 10,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#2D6BFF' : '#9AA3B2',
                letterSpacing: '0.01em',
                fontFamily: 'Inter, sans-serif',
              }}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
