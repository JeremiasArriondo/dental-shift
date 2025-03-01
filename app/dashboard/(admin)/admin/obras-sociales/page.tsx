import { DashboardHeader } from '@/components/header'
import { CreateObraSocial } from '@/components/obras-sociales-create'
import { ObrasSocialesList } from '@/components/obras-sociales-list'
import { DashboardShell } from '@/components/shell'
import { supabase as supabaseConnection } from '@/lib/connections/supabase'
import { Database } from '@/types/database'
import { ObrasSociales } from '@/types/shift'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Obras sociales'
}

export default async function ObrasSocialesPage() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  const { data: obraSociales } = await supabaseConnection
    .from('obra_social')
    .select('*')

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Obras sociales"
        text="Gestioná las obras sociales"
      />
      <CreateObraSocial />
      <ObrasSocialesList obrasSociales={obraSociales as ObrasSociales[]} />
    </DashboardShell>
  )
}
