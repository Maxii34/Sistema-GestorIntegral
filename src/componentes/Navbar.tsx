import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-950 border-b border-zinc-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="text-xl font-black italic tracking-wider text-amber-500 uppercase"
        >
          Iron<span className="text-white">Gym</span>
        </Link>

        {/* Navegación Principal */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="text-zinc-300 hover:text-amber-500 transition-colors"
          >
            Inicio
          </Link>

          <Link
            href="/ingreso"
            className="text-zinc-300 hover:text-amber-500 transition-colors"
          >
            Ingreso
          </Link>

          <Link
            href="/dashboard"
            className="text-zinc-300 hover:text-amber-500 transition-colors"
          >
            Dashboard
          </Link>
        </nav>

        {/* Botones de Autenticación */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-semibold px-4 py-2 text-zinc-300 hover:text-white transition-colors"
          >
            Login
          </Link>

          <Link
            href="/registro"
            className="text-sm font-bold px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 rounded-md transition-colors uppercase tracking-wide"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
