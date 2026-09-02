import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/80 bg-[#171614]/95 backdrop-blur-xl text-white shadow-[0_10px_30px_rgba(17,17,17,0.12)]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-black uppercase tracking-[0.22em] text-amber-400">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-amber-400/60 bg-amber-400/10 text-sm text-amber-300">
            IG
          </span>
          <span>
            Iron<span className="text-stone-100">Gym</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-stone-300 md:flex">
          <Link href="/" className="transition hover:text-amber-300">Inicio</Link>
          <Link href="/ingreso" className="transition hover:text-amber-300">Ingreso</Link>
          <Link href="/dashboard" className="transition hover:text-amber-300">Dashboard</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login" className="rounded-full border border-stone-700 px-4 py-2 text-sm font-semibold text-stone-200 transition hover:border-amber-400 hover:text-amber-300">
            Login
          </Link>
          <Link href="/registro" className="rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2 text-sm font-black uppercase tracking-[0.12em] text-stone-950 shadow-[0_8px_25px_rgba(217,164,65,0.35)] transition hover:brightness-110">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
