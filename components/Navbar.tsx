import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export const Navbar = () => {
  return (
    <header className="z-50 sticky top-0">
      <nav className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur">
        <div className="flex flex-wrap gap-y-2 md:gap-0 justify-between items-center mx-auto max-w-screen-xl px-8 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo-circle.webp"
              height={40}
              width={40}
              alt="Eliana Ginocchio logo"
            />
            <span className="text-greenDark self-center text-2xl font-semibold whitespace-nowrap">
              Eliana Ginocchio
            </span>
          </Link>
          <div className="flex items-center">
            <Button asChild variant="outline">
              <Link href="/login">Iniciar sesión</Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}
