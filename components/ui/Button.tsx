'use client'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary'

interface ButtonProps {
  variant: ButtonVariant
  label: string
  onClick: () => void
  disabled?: boolean
  fullWidth?: boolean
}

export default function Button({ variant, label, onClick, disabled = false, fullWidth = true }: ButtonProps) {
  const base = `h-[52px] rounded-md text-headline-md font-semibold transition-all duration-150 active:scale-[0.98] ${fullWidth ? 'w-full' : 'px-6'}`

  const variants: Record<ButtonVariant, string> = {
    primary: `bg-primary text-white ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-primary-active active:bg-primary-active'}`,
    secondary: `bg-card text-primary border border-primary ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-soft active:bg-soft'}`,
    tertiary: `bg-transparent text-muted text-body-md underline underline-offset-2 h-auto py-2 ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`,
  }

  return (
    <button
      className={`${base} ${variants[variant]}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}
