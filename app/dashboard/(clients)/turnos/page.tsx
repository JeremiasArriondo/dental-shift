import { DrawerShiftCreate } from '@/components/drawer-shift-create'
import { DashboardHeader } from '@/components/header'
import { DashboardShell } from '@/components/shell'
import { SkeletonCard } from '@/components/skeleton-card'
import { UserTurnosList } from '@/components/user-turnos-list'
import { supabase as supabaseConnection } from '@/lib/connections/supabase'
import { Database } from '@/types/database'
import { Turno } from '@/types/shift'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

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
