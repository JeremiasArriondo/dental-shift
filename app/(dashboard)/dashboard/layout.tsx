import { redirect } from 'next/navigation'
import { MainNav } from '@/components/main-nav'
import { DashboardNav } from '@/components/nav'
import { UserAccountNav } from '@/components/user-account-nav'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/database'
import { cookies } from 'next/headers'

interface DashboardLayoutProps {
  children?: React.ReactNode
}

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

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-bgColor">
        <div className="flex h-16 items-center justify-between py-4 px-8">
          <MainNav items={[]} />
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
          <DashboardNav
            items={[
              {
                title: 'Turnos',
                href: '/dashboard',
                icon: 'calendar'
              },
              {
                title: 'Datos personales',
                href: '/dashboard/settings',
                icon: 'settings'
              }
            ]}
          />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
