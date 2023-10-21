import { Metadata } from 'next'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { AuthButtonServer } from '@/components/auth-btn-server'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account'
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-4 top-4 md:left-8 md:top-8'
        )}
      >
        <ChevronLeft />
        Volver
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 items-center">
          <Image
            src="/images/logo-circle.webp"
            height={40}
            width={40}
            alt="Eliana Ginocchio logo"
          />
          <h1 className="text-2xl font-semibold tracking-tight">Bienvenido</h1>
          <p className="text-sm text-muted-foreground">
            Inicia sesión con tu cuenta de Google
          </p>
          <div>
            <AuthButtonServer />
          </div>
        </div>
      </div>
    </div>
  )
}
