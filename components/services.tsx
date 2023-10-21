import Image from 'next/image'
import { Card } from './card'

export const Services = () => {
  return (
    <section className="mx-4">
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
    </section>
  )
}

// Limpieza dental - ortodoncia - endodoncia - odontologia general
/*
 odontologia general
 niño y adultos
 protesis removiblr y fija
 blanquamiento
 endodoncia mecanizada
 limpirza con ultra
*/
