import { MainNav } from '@/components/main-nav'
import { DashboardNav } from '@/components/nav'
import { UserAccountNav } from '@/components/user-account-nav'
import { dashboardConfig } from '@/config/dashboard'
import { Database } from '@/types/database'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

interface DashboardLayoutProps {
  children?: React.ReactNode
}

const ADMIN = 'admin'

export default async function DashboardLayout({
  children
}: DashboardLayoutProps) {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  const { data: user } = await supabase
    .from('users')
    .select('role')
    .eq('id', session.user.id)
    .single()

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-bgColor backdrop-filter backdrop-blur-3xl backdrop-saturate-200">
        <div className="flex h-16 items-center justify-between py-4 px-8">
          <MainNav
            items={dashboardConfig.adminNav}
            isAdmin={user?.role === ADMIN}
          />
          <UserAccountNav
            user={{
              name: session.user.user_metadata.name,
              image: session.user.user_metadata.avatar_url,
              email: session.user.email!
            }}
          />
        </div>
      </header>

      <div className="grid mx-8 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.adminNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
