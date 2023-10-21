import { redirect } from 'next/navigation'
import { AuthButtonServer } from '@/components/auth-btn-server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const metadata = {
  title: 'Turnos',
  description: 'Selecciona un turno disponible'
}

export default async function TurnosPage() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()
  if (session === null) {
    redirect('/login')
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1>Agenda un turno conmigo</h1>
    </main>
  )
}
