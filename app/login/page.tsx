import { AuthButtonServer } from '@/components/auth-btn-server'

export const metadata = {
  title: 'Login',
  description: 'Inicia sesión'
}

export default function LoginPage() {
  return (
    <main className="grid place-content-center min-h-screen">
      <AuthButtonServer />
    </main>
  )
}
