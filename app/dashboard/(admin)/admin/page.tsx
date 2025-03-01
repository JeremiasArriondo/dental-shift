import { DashboardHeader } from '@/components/header'
import { DashboardShell } from '@/components/shell'
import { Database } from '@/types/database'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { ShiftListFilter } from '@/components/shift-list'
import { SkeletonCard } from '@/components/skeleton-card'
import { Suspense } from 'react'

export const metadata = {
  title: 'Dashboard - Admin'
}

export default async function DashboardPage() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Calendario" text="Agenda mensual" />
      <Suspense fallback={<SkeletonCard />}>
        <ShiftListFilter />
      </Suspense>
    </DashboardShell>
  )
}
