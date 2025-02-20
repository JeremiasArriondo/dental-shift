import { Navbar } from '@/components/Navbar'

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-l from-white via-green-50 to-white">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  )
}
