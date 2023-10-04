import { Facebook, Instagram } from "lucide-react";

export const Contact = () => {
  return (
    <section className="bg-greenLigth w-full py-8 px-8 flex flex-col items-center">
      <h2 className="text-3xl font-semibold my-4">Contacto</h2>
      <div className="grid md:grid-cols-2 w-full">
        <div>
          <p className="mt-3 text-gray-500">Puedes encontrarme en mis redes:</p>
          <ul>
            <li>
              Instagram <Instagram />{" "}
            </li>
            <li>
              Facebook <Facebook />
            </li>
            <li>WhatsApp</li>
          </ul>
        </div>
        <div className="relative w-full h-96 rounded-3xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3300.0646661076107!2d-60.73859502442636!3d-34.19582413607106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b857c4c15c5b45%3A0xac1ec83675f6351!2sConsultorio%20Odontol%C3%B3gico%20Eliana%20Ginocchio!5e0!3m2!1ses-419!2sar!4v1696389854271!5m2!1ses-419!2sar"
            className="absolute top-0 left-0 w-full h-full"
            style={{
              border: 0,
            }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};
