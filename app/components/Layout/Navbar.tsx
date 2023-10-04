import Image from "next/image";

export const Navbar = () => {
  return (
    <header className="z-50 sticky top-0">
      <nav className="bg-bgColor supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="flex flex-wrap gap-y-2 md:gap-0 justify-between items-center mx-auto max-w-screen-xl p-4">
          <a href="https://flowbite.com" className="flex items-center gap-2">
            <Image
              src="/images/logo-circle.webp"
              height={40}
              width={40}
              alt="Eliana Ginocchio logo"
            />
            <span className="text-greenDark self-center text-2xl font-semibold whitespace-nowrap">
              Eliana Ginocchio
            </span>
          </a>
          <div className="order-3 xs:order-none">
            <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
              <li>
                <a
                  href="#"
                  className="text-base hover:underline"
                  aria-current="page"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" className="text-base hover:underline">
                  Turnos
                </a>
              </li>
              <li>
                <a href="#" className="text-base hover:underline">
                  Admin
                </a>
              </li>
            </ul>
          </div>
          <div className="flex items-center">
            <a href="#" className="text-sm  text-baseLigth hover:underline">
              Login
            </a>
          </div>
        </div>
      </nav>
      {/* <nav className="bg-greenLigth">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
              <li>
                <a
                  href="#"
                  className="text-base hover:underline"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-base hover:underline">
                  Turnos
                </a>
              </li>
              <li>
                <a href="#" className="text-base hover:underline">
                  Admin
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
    </header>
  );
};
