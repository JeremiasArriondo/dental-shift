import { DashboardHeader } from '@/components/header'
import { DashboardShell } from '@/components/shell'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Database } from '@/types/database'
import { UserTurnosList } from '@/components/user-turnos-list'
import { supabase as supabaseConnection } from '@/lib/connections/supabase'
import { DrawerShiftCreate } from '@/components/drawer-shift-create'
import { Turno } from '@/types/shift'
import { Suspense } from 'react'
import { SkeletonCard } from '@/components/skeleton-card'

export const metadata = {
  title: 'Mis turnos'
}

export default async function DashboardTurnosPage() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  const { data: turnos } = await supabaseConnection
    .from('turnos')
    .select('*, users(*)')
    .eq('user_id', session.user.id)
    .order('appointment_date', { ascending: false })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Turnos"
        text="En esta sección puedes gestionar tus turnos"
      ></DashboardHeader>
      <DrawerShiftCreate />
      <Suspense fallback={<SkeletonCard />}>
        <UserTurnosList turnos={turnos as Turno[]} />
      </Suspense>
    </DashboardShell>
  )
}
