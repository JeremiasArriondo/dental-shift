import { EmptyPlaceholder } from '@/components/empty-placeholder'
import { DashboardHeader } from '@/components/header'
import { ShiftCreateButton } from '@/components/shift-create-button'
import { DashboardShell } from '@/components/shell'

export const metadata = {
  title: 'Dashboard'
}

export default async function DashboardPage() {
  // TODO: obtener informacion del usuario

  // TODO: Proteger ruta

  // TODO: hacer query para obtener turnos

  return (
    <DashboardShell>
      <DashboardHeader heading="Turnos" text="Agenda un turno">
        <ShiftCreateButton />
      </DashboardHeader>
      <div>
        {/* TODO: Recorrrer turnos */}
        {[]?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {/* {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))} */}
          </div>
        ) : (
          <EmptyPlaceholder>
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
