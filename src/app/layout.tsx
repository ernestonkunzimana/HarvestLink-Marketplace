import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HarvestLink - Rwanda National Health API Gateway',
  description: 'Sovereign, Intelligent, and Inclusive Health Infrastructure for Rwanda',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}