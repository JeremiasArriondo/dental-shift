import Image from 'next/image'
import Link from 'next/link'

export const Hero = () => {
  return (
    <section className="min-h-[calc(100vh-72px)] max-w-screen-xl flex items-center xl:mx-auto p-8">
      <div className="grid md:grid-cols-2 items-center gap-8">
        <div>
          <h1 className="text-5xl font-semibold">
            Odontología de Calidad: <br />
            Tu Sonrisa en Buenas Manos
          </h1>
          <p className="md:w-[75%] mt-3 text-gray-500">
            Descubre la odontología de calidad de la mano de una profesional
            apasionada por tu sonrisa. En mi consulta, tu bienestar bucal es mi
            prioridad. Desde limpiezas regulares hasta tratamientos avanzados,
            te ofrezco una atención personalizada y de calidad. Tu sonrisa está
            en buenas manos.
          </p>
          <div className="flex gap-4 my-4">
            <Link
              href="/login"
              className="p-2 rounded-md text-greenDark bg-greenLigth"
            >
              Agenda un turno
            </Link>
          </div>
        </div>
        <div className="w-full">
          <Image
            src="/images/sonrisa-hero.avif"
            height={300}
            width={600}
            className="rounded-3xl object-cover"
            alt="Sonrisa de mujer"
            priority
            style={{
              width: '100%'
            }}
          />
        </div>
      </div>
    </section>
  )
}
