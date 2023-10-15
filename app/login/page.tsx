import { AuthButton } from '@/components/auth-btn-client'

export const metadata = {
  title: 'Login',
  description: 'Inicia sesión'
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-16">
      <AuthButton />
    </main>
  )
}
