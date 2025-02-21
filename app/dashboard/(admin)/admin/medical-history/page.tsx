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
import { UserList } from '@/components/user-list'
import { UsersMedicalHistory } from '@/components/users-medical-history'

export const metadata = {
  title: 'Mis datos personales'
}

export default async function MedicalHistoryPage() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  const { data: users } = await supabaseConnection
    .from('users')
    .select('*, obra_social(*)')

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Historiales clínicos"
        text="Busqueda por paciente"
      />
      <UsersMedicalHistory users={users} />
    </DashboardShell>
  )
}
