import { EmptyPlaceholder } from '@/components/empty-placeholder'
import { DashboardHeader } from '@/components/header'
import { ShiftCreateButton } from '@/components/shift-create-button'
import { DashboardShell } from '@/components/shell'
import { SelectShiftDay } from '@/components/select-shift-day'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Database } from '@/types/database'
import { Calendar } from '@/components/ui/calendar'
import { SimpleCalendar } from '@/components/simple-calendar'
import { ShiftList } from '@/components/shift-list'

export const metadata = {
  title: 'Dashboard - Admin'
}

export default async function DashboardPage() {
  // TODO: obtener informacion del usuario
  // TODO: Proteger ruta
  // TODO: hacer query para obtener turnos
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()
  console.log(session)
  if (session === null) {
    redirect('/login')
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Calendario" text="Agenda mensual" />
      <div className="flex gap-8">
        <SimpleCalendar />
        <ShiftList />
      </div>
    </DashboardShell>
  )
}
