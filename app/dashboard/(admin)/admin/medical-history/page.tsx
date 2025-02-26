import { DashboardHeader } from '@/components/header'
import { DashboardShell } from '@/components/shell'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Database } from '@/types/database'
import { supabase as supabaseConnection } from '@/lib/connections/supabase'
import { UsersMedicalHistory } from '@/components/users-medical-history'
import { User } from '@/types/shift'

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
      <UsersMedicalHistory users={users as User[]} />
    </DashboardShell>
  )
}
