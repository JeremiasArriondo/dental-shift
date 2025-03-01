import { DashboardHeader } from '@/components/header'
import { DashboardShell } from '@/components/shell'
import { UserList } from '@/components/user-list'
import { supabase as supabaseConnection } from '@/lib/connections/supabase'
import { Database } from '@/types/database'
import { User } from '@/types/shift'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Mis datos personales'
}

export default async function PacientsPage() {
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
        heading="Pacientes"
        text="Lista de los pacientes activos"
      />
      <UserList users={users as User[]} />
    </DashboardShell>
  )
}
