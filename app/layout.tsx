import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: { template: '%s | Eliana', default: 'Eliana' },
  description: 'Consultorio dental Eliana'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <div className="flex relative min-h-screen flex-col justify-between">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  )
}
