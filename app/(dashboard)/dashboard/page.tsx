import { EmptyPlaceholder } from '@/components/empty-placeholder'
import { DashboardHeader } from '@/components/header'
import { ShiftCreateButton } from '@/components/shift-create-button'
import { DashboardShell } from '@/components/shell'
import { SelectShiftDay } from '@/components/select-shift-day'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Database } from '@/types/database'

export const metadata = {
  title: 'Dashboard'
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

  return (
    <DashboardShell>
      <DashboardHeader heading="Turnos" text="Agenda un turno">
        {/* <ShiftCreateButton /> */}
      </DashboardHeader>
      <SelectShiftDay />
      <div>
        {/* TODO: Recorrrer turnos */}
        {[]?.length ? (
          <div className="divide-y divide-border rounded-md border">
            <h3>Mis turnos:</h3>
            {/* {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))} */}
          </div>
        ) : (
          <EmptyPlaceholder className="border-greenDark">
            <EmptyPlaceholder.Title>
              Ningún turno reservado
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Puedes solicitar un turno con simples clicks
            </EmptyPlaceholder.Description>
            <ShiftCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
