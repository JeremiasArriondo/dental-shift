import Image from 'next/image'

type CardProps = {
  title: string
  text: string
  image: {
    src: string
    height: number
    width: number
    alt: string
  }
}

export const Card = ({ title, text, image }: CardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="max-h-52 h-52 md:max-h-64 md:h-64 overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="rounded-t-md object-bottom"
        />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {text}
        </p>
      </div>
    </div>
  )
}
