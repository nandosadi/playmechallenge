'use client'

type ValueVariant = 'default' | 'primary' | 'green' | 'mono'

interface RowProps {
  label: string
  value: string
  valueVariant?: ValueVariant
  noBorder?: boolean
}

const valueColors: Record<ValueVariant, string> = {
  default: 'text-ink',
  primary: 'text-primary',
  green:   'text-success',
  mono:    'text-ink font-mono',
}

export default function Row({ label, value, valueVariant = 'default', noBorder = false }: RowProps) {
  return (
    <div className={`flex items-center justify-between py-3 ${!noBorder ? 'border-b border-hairline-soft last:border-b-0' : ''}`}>
      <span className="text-body-md text-body">{label}</span>
      <span className={`text-body-md font-medium ${valueColors[valueVariant]}`}>{value}</span>
    </div>
  )
}
