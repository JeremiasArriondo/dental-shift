import { Card } from '@/components/card'
import { Check } from 'lucide-react'

export const Services = () => {
  return (
    <section className="max-w-screen-xl mx-auto p-8">
      <h2 className="text-3xl font-semibold my-4">Mis servicios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          title="Limpieza dental"
          text="Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order."
          image={{
            src: '/images/services/dental-clean.webp',
            width: 1000,
            height: 1000,
            alt: 'Limpieza dental'
          }}
        />
        <Card
          title="Ortodoncia"
          text="Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order."
          image={{
            src: '/images/services/ortodoncia.webp',
            width: 1000,
            height: 1000,
            alt: 'Limpieza dental'
          }}
        />
        <Card
          title="Endodoncia"
          text="Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order."
          image={{
            src: '/images/services/endodoncia.webp',
            width: 1000,
            height: 1000,
            alt: 'Limpieza dental'
          }}
        />
        <Card
          title="Odontologia general"
          text="Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order."
          image={{
            src: '/images/services/general-odonto.webp',
            width: 1000,
            height: 1000,
            alt: 'Limpieza dental'
          }}
        />
      </div>
      <div>
        <h3 className="text-2xl font-semibold my-4">Otros servicios</h3>
        <ul className="grid md:grid-cols-2 gap-4">
          <li className="flex items-center space-x-3">
            <Check />
            <span>Odontología niños y adultos</span>
          </li>
          <li className="flex items-center space-x-3">
            <Check /> <span>Prótesis removible y fija</span>
          </li>
          <li className="flex items-center space-x-3">
            <Check /> <span>Blanqueamiento</span>
          </li>
          <li className="flex items-center space-x-3">
            <Check />
            <span>Endodoncia mecanizada</span>
          </li>
          <li className="flex items-center space-x-3">
            <Check />
            <span>Limpieza con ultra</span>
          </li>
        </ul>
      </div>
    </section>
  )
}
