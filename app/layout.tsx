// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jednoduchá ukázka',
  description: 'ProxyQB-3D',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body className="w-full h-full bg-surface-light dark:bg-surface-dark text-content-dark dark:text-content-light transition-colors duration-300">
        {children}
      </body>
    </html>
  )
}