import { DashboardHeader } from '@/components/header'
import { DashboardShell } from '@/components/shell'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Database } from '@/types/database'
import { UserTurnosList } from '@/components/user-turnos-list'
import { supabase as supabaseConnection } from '@/lib/connections/supabase'
import { DrawerShift } from '@/components/drawer-shift'

export const metadata = {
  title: 'Dashboard'
}

export default async function DashboardTurnosPage() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  const { data: turnos } = await supabaseConnection.from('turnos').select()

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Turnos"
        text="En esta sección puedes gestionar tus turnos"
      ></DashboardHeader>
      <DrawerShift />
      <UserTurnosList turnos={turnos} />
    </DashboardShell>
  )
}
