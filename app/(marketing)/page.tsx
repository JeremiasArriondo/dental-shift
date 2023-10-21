import { Contact } from '@/components/contact'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'

export const metadata = {
  title: 'Inicio',
  description: 'Conoce más sobre mis servicios odontológicos y de salud dental'
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <Contact />
    </main>
  )
}
