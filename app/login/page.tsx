import { AuthButton } from '@/components/auth-btn'
import { AuthButtonServer } from '@/components/auth-btn-server'

export const metadata = {
  title: 'Login',
  description: 'Inicia sesión'
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-16">
      <AuthButtonServer />
    </main>
  )
}
