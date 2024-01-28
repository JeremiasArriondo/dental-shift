import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DashboardHeader } from '@/components/header'
import { DashboardShell } from '@/components/shell'
import { SelectShiftDay } from '@/components/select-shift-day'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Database } from '@/types/database'
import { UserTurnosList } from '@/components/user-turnos-list'

export const metadata = {
  title: 'Dashboard'
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
      <DashboardHeader heading="Turnos" text="Agenda un turno">
        {/* @todo quizas implementar notificaciones/recordatorios */}
      </DashboardHeader>
      <Tabs defaultValue="new-shift" className="w-[600px]">
        <TabsList>
          <TabsTrigger value="new-shift">Crear turno</TabsTrigger>
          <TabsTrigger value="my-shift">Mis turnos</TabsTrigger>
        </TabsList>
        <TabsContent value="new-shift">
          <SelectShiftDay />
        </TabsContent>
        <TabsContent value="my-shift">
          <UserTurnosList />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
