import Link from "next/link";
import { Dumbbell, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#171614] text-stone-100 overflow-hidden px-4">
      {/* Resplandores decorativos de fondo */}
      <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-amber-600/5 blur-[140px]" />

      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        {/* Ícono central */}
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-stone-800/80 bg-[#1f1c18]/60 shadow-[0_0_30px_rgba(245,158,11,0.15)] backdrop-blur-sm">
          <Dumbbell className="h-12 w-12 text-amber-400" />
        </div>

        {/* Número 404 gigante */}
        <h1 className="text-8xl font-black uppercase tracking-tight text-white sm:text-9xl">
          4<span className="text-amber-500">0</span>4
        </h1>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300">
          <span>Error de Navegación</span>
        </div>

        <h2 className="mt-8 text-2xl font-black uppercase tracking-tight text-white sm:text-4xl">
          Módulo no encontrado
        </h2>

        <p className="mt-4 max-w-md text-center text-base leading-relaxed text-stone-400 sm:text-lg">
          La sección o herramienta de gestión que intentás consultar no existe.
          <span className="mt-2 block text-sm font-medium text-stone-300 sm:text-base">
            Volvé al panel principal para continuar administrando tu gimnasio.
          </span>
        </p>

        {/* Botones de acción */}
        <div className="mt-10 flex flex-col w-full gap-4 sm:w-auto sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-linear-to-r from-amber-400 via-amber-500 to-amber-500 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-stone-950 shadow-[0_4px_25px_rgba(245,158,11,0.25)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_6px_30px_rgba(245,158,11,0.4)] active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver atrás</span>
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-700/80 bg-stone-900/60 px-7 py-3.5 text-sm font-semibold tracking-wide text-stone-200 backdrop-blur-sm transition-all duration-200 hover:border-amber-400/50 hover:bg-stone-800 hover:text-amber-300 active:scale-95"
          >
            <Home className="h-4 w-4" />
            <span>Ir al Dashboard</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
