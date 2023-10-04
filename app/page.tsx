import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";

export const metadata = {
  title: "Inicio",
  description: "Conoce más sobre mis servicios odontológicos y de salud dental",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Hero />
      <Contact />
    </main>
  );
}
