import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { DashboardHeader } from '@/components/header'
import { DashboardShell } from '@/components/shell'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Database } from '@/types/database'
import { supabase as supabaseConnection } from '@/lib/connections/supabase'

import { UserPersonalData } from '@/components/user-personal-data'
import { Suspense } from 'react'

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

  const { data: user } = await supabaseConnection
    .from('users')
    .select('*, obra_social(*)')
    .eq('id', session.user.id)
    .single()

  const { data: obraSociales } = await supabaseConnection
    .from('obra_social')
    .select('*')

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Datos personales"
        text="Mantén tu información actualizada"
      />{' '}
      <Suspense fallback={<p>Loadding...</p>}>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Cuenta</TabsTrigger>
            <TabsTrigger value="notification">Notificaciones</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <UserPersonalData
              user={user}
              obraSociales={obraSociales as any[]}
            />
          </TabsContent>
          <TabsContent value="notification">
            <div>Notificaciones</div>
          </TabsContent>
        </Tabs>
      </Suspense>
    </DashboardShell>
  )
}
