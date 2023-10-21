import { Facebook, Instagram, MessageCircle } from 'lucide-react'

export const Contact = () => {
  return (
    <section className="bg-greenLigth">
      <div className="max-w-screen-xl mx-auto p-8 flex flex-col">
        <h2 className="text-3xl font-semibold mt-4 mb-2">Contacto</h2>
        <div className="grid md:grid-cols-2 w-full">
          <div>
            <p className="text-gray-500">Puedes escribirme en mis redes:</p>
            <ul className="my-2 flex flex-col gap-4">
              <li className="flex items-center space-x-3">
                <Instagram /> <span>Instagram</span>
              </li>
              <li className="flex items-center space-x-3">
                <Facebook />
                <span>Facebook</span>
              </li>
              <li className="flex items-center space-x-3">
                <MessageCircle />
                <span>WhatsApp</span>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-gray-500">Puedes encontrarme en:</p>
            <div className="my-2 relative w-full h-96 rounded-3xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3300.0646661076107!2d-60.73859502442636!3d-34.19582413607106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b857c4c15c5b45%3A0xac1ec83675f6351!2sConsultorio%20Odontol%C3%B3gico%20Eliana%20Ginocchio!5e0!3m2!1ses-419!2sar!4v1696389854271!5m2!1ses-419!2sar"
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  border: 0
                }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
