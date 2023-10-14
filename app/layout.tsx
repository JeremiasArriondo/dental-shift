import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from './components/Layout/Navbar'

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
    <html lang="en">
      <body className={inter.className}>
        <div className="flex relative min-h-screen flex-col justify-between">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  )
}
