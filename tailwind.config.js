/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:          '#2D6BFF',
        'primary-active': '#1F52CC',
        'primary-dis':    '#B9CCFF',
        secondary:        '#0E1F44',
        canvas:           '#F4F6FA',
        soft:             '#EEF3FF',
        card:             '#FFFFFF',
        dark:             '#0E1F44',
        ink:              '#0E1116',
        body:             '#3A4151',
        muted:            '#6B7280',
        'muted-soft':     '#9AA3B2',
        hairline:         '#E5E9F0',
        'hairline-soft':  '#EEF0F4',
        success:          '#3CCB7F',
        error:            '#E5484D',
        clementine:       '#FF6B2B',
        'clementine-soft':'#FFF1EB',
      },
      borderRadius: {
        sm:   '8px',
        md:   '12px',
        lg:   '16px',
        xl:   '20px',
        full: '9999px',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display':     ['28px', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['22px', { lineHeight: '1.2',  letterSpacing: '-0.01em', fontWeight: '700' }],
        'headline-md': ['17px', { lineHeight: '1.3',  fontWeight: '600' }],
        'body-lg':     ['16px', { lineHeight: '1.5',  fontWeight: '400' }],
        'body-md':     ['14px', { lineHeight: '1.5',  fontWeight: '400' }],
        'label-sm':    ['12px', { lineHeight: '1.2',  letterSpacing: '0.06em', fontWeight: '600' }],
        'mono-sm':     ['12px', { lineHeight: '1.4',  fontWeight: '500' }],
      },
      boxShadow: {
        card: '0 1px 2px rgba(14,17,22,0.04)',
      },
      spacing: {
        container: '20px',
      },
    },
  },
  plugins: [],
}
