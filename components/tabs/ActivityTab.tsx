'use client'

import { useState } from 'react'

const TRANSACTIONS = [
  { id: 1,  date: 'Jun 3',  name: 'Electricity Bill',  category: 'Utilities',   amount: -148.00, card: 'Rewards · 4821', icon: '⚡', income: false },
  { id: 2,  date: 'Jun 3',  name: 'Spotify',            category: 'Subscriptions', amount: -9.99, card: 'Checking',        icon: '🎵', income: false },
  { id: 3,  date: 'Jun 2',  name: 'Direct Deposit',     category: 'Income',      amount: 3800.00, card: 'Checking',        icon: '💼', income: true  },
  { id: 4,  date: 'Jun 1',  name: 'Whole Foods',        category: 'Groceries',   amount: -67.34, card: 'Rewards · 4821',  icon: '🛒', income: false },
  { id: 5,  date: 'Jun 1',  name: 'Netflix',            category: 'Subscriptions', amount: -15.99, card: 'Checking',      icon: '🎬', income: false },
  { id: 6,  date: 'May 30', name: 'Amazon',             category: 'Shopping',    amount: -43.20, card: 'Rewards · 4821',  icon: '📦', income: false },
  { id: 7,  date: 'May 29', name: 'Starbucks',          category: 'Dining',      amount: -7.50,  card: 'Rewards · 4821',  icon: '☕', income: false },
  { id: 8,  date: 'May 28', name: 'Direct Deposit',     category: 'Income',      amount: 3800.00, card: 'Checking',       icon: '💼', income: true  },
  { id: 9,  date: 'May 27', name: 'Trader Joe\'s',      category: 'Groceries',   amount: -54.11, card: 'Rewards · 4821',  icon: '🛒', income: false },
  { id: 10, date: 'May 26', name: 'Con Edison',         category: 'Utilities',   amount: -134.00, card: 'Checking',       icon: '⚡', income: false },
  { id: 11, date: 'May 25', name: 'Apple One',          category: 'Subscriptions', amount: -21.95, card: 'Checking',      icon: '🍎', income: false },
  { id: 12, date: 'May 24', name: 'United Airlines',    category: 'Travel',      amount: -312.00, card: 'Rewards · 4821', icon: '✈️', income: false },
]

type Filter = 'all' | 'income' | 'expenses'

export default function ActivityTab() {
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = TRANSACTIONS.filter(t => {
    if (filter === 'income') return t.income
    if (filter === 'expenses') return !t.income
    return true
  })

  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      {/* Header */}
      <div style={{ paddingTop: 52, paddingBottom: 16, paddingLeft: 20, paddingRight: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0E1116', letterSpacing: '-0.01em', marginBottom: 14 }}>Activity</h1>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8 }}>
          {(['all', 'income', 'expenses'] as Filter[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '6px 14px',
                borderRadius: 9999,
                fontSize: 13,
                fontWeight: filter === f ? 600 : 400,
                color: filter === f ? 'white' : '#6B7280',
                backgroundColor: filter === f ? '#2D6BFF' : 'white',
                border: filter === f ? 'none' : '1px solid #E5E9F0',
                textTransform: 'capitalize',
                fontFamily: 'Inter, sans-serif',
                transition: 'all 150ms ease',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Transaction list */}
      <div
        className="flex-1 overflow-y-auto px-container"
        style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="bg-card rounded-lg shadow-card">
          {filtered.map((tx, i) => (
            <div
              key={tx.id}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 16px',
                borderBottom: i < filtered.length - 1 ? '1px solid #EEF0F4' : 'none',
                animation: `slideUp 0.3s ease forwards ${i * 0.04}s`,
                opacity: 0,
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                backgroundColor: tx.income ? '#EBF9F1' : '#F4F6FA',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, flexShrink: 0,
              }}>
                {tx.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: '#0E1116', marginBottom: 1 }}>{tx.name}</p>
                <p style={{ fontSize: 12, color: '#9AA3B2' }}>{tx.date} · {tx.card}</p>
              </div>
              <p style={{
                fontSize: 14, fontWeight: 600,
                color: tx.income ? '#3CCB7F' : '#0E1116',
                fontFamily: 'JetBrains Mono, monospace',
                flexShrink: 0,
              }}>
                {tx.income ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: '#9AA3B2', marginTop: 16, marginBottom: 8 }}>
          Showing {filtered.length} transactions
        </p>
      </div>
    </div>
  )
}
