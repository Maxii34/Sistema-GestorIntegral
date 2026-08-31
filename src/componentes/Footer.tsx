import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-800 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Sección Superior: Marca y Enlaces */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-900">
          
          {/* Logo / Brand */}
          <Link href="/" className="text-xl font-black italic tracking-wider text-amber-500 uppercase">
            Iron<span className="text-white">Gym</span>
          </Link>

          {/* Navegación Secundaria */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <Link 
              href="/politica-de-privacidad" 
              className="hover:text-amber-500 transition-colors"
            >
              Política de Privacidad
            </Link>
            <Link 
              href="/terminos-de-servicio" 
              className="hover:text-amber-500 transition-colors"
            >
              Términos de Servicio
            </Link>
            <Link 
              href="/contacto" 
              className="hover:text-amber-500 transition-colors"
            >
              Contacto
            </Link>
          </nav>

        </div>

        {/* Sección Inferior: Copyright */}
        <div className="pt-8 text-center md:text-left text-xs text-zinc-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>
            &copy; {new Date().getFullYear()} <span className="text-zinc-300 font-semibold uppercase">IronGym</span>. Todos los derechos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
}