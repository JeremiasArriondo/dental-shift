'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  type Session,
  createClientComponentClient
} from '@supabase/auth-helpers-nextjs'

export function AuthButton({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient()

  const route = useRouter()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    route.refresh()
  }

  return (
    <header>
      {session === null ? (
        <Button onClick={handleSignIn}>Ingresar con google </Button>
      ) : (
        <Button onClick={handleSignOut}>Cerrar sessión </Button>
      )}
    </header>
  )
}
