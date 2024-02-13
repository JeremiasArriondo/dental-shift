import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DashboardHeader } from '@/components/header'
import { DashboardShell } from '@/components/shell'
import { SelectShiftDay } from '@/components/select-shift-day'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Database } from '@/types/database'
import { UserTurnosList } from '@/components/user-turnos-list'
import { supabase as supabaseConnection } from '@/lib/connections/supabase'

export const metadata = {
  title: 'Mis datos personales'
}

export default async function DashboardSettingsPage() {
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
        heading="Datos personales"
        text="Modifica los datos de tu historial clínico"
      ></DashboardHeader>
    </DashboardShell>
  )
}
