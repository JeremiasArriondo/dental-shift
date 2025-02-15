import { EmptyPlaceholder } from '@/components/empty-placeholder'
import { DashboardHeader } from '@/components/header'
import { ShiftCreateButton } from '@/components/shift-create-button'
import { DashboardShell } from '@/components/shell'
import { SelectShiftDay } from '@/components/select-shift-day'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Database } from '@/types/database'
import { supabase as supabaseConnection } from '@/lib/connections/supabase'
import { Calendar } from '@/components/ui/calendar'
import { SimpleCalendar } from '@/components/simple-calendar'
import { ShiftListFilter } from '@/components/shift-list'
import { useState } from 'react'

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

  if (session === null) {
    redirect('/login')
  }

  const today = new Date().toISOString().split('T')[0]

  // const { data: turnos } = await supabaseConnection
  //   .from('turnos')
  //   .select('*, users(*)')
  //   .eq('date', today)

  return (
    <DashboardShell>
      <DashboardHeader heading="Calendario" text="Agenda mensual" />
      <div className="flex gap-8">
        <ShiftListFilter />
      </div>
    </DashboardShell>
  )
}
