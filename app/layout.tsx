import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PlayMe',
  description: 'AI-powered financial optimization — Know Me Challenge prototype',
  applicationName: 'PlayMe',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'PlayMe',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#2D6BFF',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="application-name" content="PlayMe" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PlayMe" />
        <meta name="theme-color" content="#2D6BFF" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="manifest" href="/manifest.json" />
        <style>{`
          @keyframes slideUp {
            from { transform: translateY(14px); opacity: 0; }
            to   { transform: translateY(0);    opacity: 1; }
          }
          @keyframes slideInLeft {
            from { transform: translateX(-18px); opacity: 0; }
            to   { transform: translateX(0);     opacity: 1; }
          }
          @keyframes notifBounce {
            0%   { transform: translateY(16px); opacity: 0; }
            65%  { transform: translateY(-4px); opacity: 1; }
            82%  { transform: translateY(2px);  opacity: 1; }
            100% { transform: translateY(0);    opacity: 1; }
          }
          @keyframes popIn {
            0%   { transform: scale(0.4);  opacity: 0; }
            55%  { transform: scale(1.15); opacity: 1; }
            75%  { transform: scale(0.95); opacity: 1; }
            100% { transform: scale(1);    opacity: 1; }
          }
          @keyframes drawCheck {
            to { stroke-dashoffset: 0; }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          @keyframes cardEntrance {
            from { transform: translateY(20px) scale(0.98); opacity: 0; }
            to   { transform: translateY(0)    scale(1);    opacity: 1; }
          }
        `}</style>
      </head>
      <body className={`${inter.className} bg-canvas`}>
        {children}
      </body>
    </html>
  )
}
