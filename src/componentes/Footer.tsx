import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-stone-200/80 bg-[#171614] text-stone-300">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 border-b border-stone-800 pb-8 md:flex-row">
          <Link href="/" className="text-xl font-black uppercase tracking-[0.2em] text-amber-400">
            Iron<span className="text-stone-100">Gym</span>
          </Link>

          <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium text-stone-300">
            <Link href="/politica-de-privacidad" className="transition hover:text-amber-300">Política de Privacidad</Link>
            <Link href="/terminos-de-servicio" className="transition hover:text-amber-300">Términos de Servicio</Link>
            <Link href="/contacto" className="transition hover:text-amber-300">Contacto</Link>
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-stone-400 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} <span className="font-semibold uppercase text-stone-200">IronGym</span>. Todos los derechos reservados.
          </p>
          <p>Built for performance and growth.</p>
        </div>
      </div>
    </footer>
  );
}
