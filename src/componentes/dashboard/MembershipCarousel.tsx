"use client";

import { useRef } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import Link from "next/link"; // <-- Importamos Link de Next.js

export interface Plan {
  id: string;
  nombre: string;
  precio: string;
  detalle: string;
  duracionDias: number;
  beneficios: string[];
  activa: boolean;
}

export default function MembershipCarousel({ planes }: { planes: Plan[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const desplazar = (direccion: "izquierda" | "derecha") => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.scrollBy({
      left:
        direccion === "derecha"
          ? carousel.clientWidth * 0.8
          : -(carousel.clientWidth * 0.8),
      behavior: "smooth",
    });
  };

  if (!planes || planes.length === 0) {
    return (
      <div className="py-10 text-center text-stone-400">
        No hay membresías disponibles en este momento.
      </div>
    );
  }

  return (
    <div className="relative group">
      <button
        type="button"
        onClick={() => desplazar("izquierda")}
        aria-label="Ver membresías anteriores"
        className="absolute -left-2 sm:-left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-stone-700 bg-stone-900/95 text-stone-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-amber-500 hover:text-amber-400 opacity-90 hover:opacity-100"
      >
        <ChevronLeft className="h-5 w-5 -ml-0.5" />
      </button>

      <div
        ref={carouselRef}
        className="flex gap-5 overflow-x-auto pb-8 pt-4 snap-x snap-mandatory scroll-smooth scrollbar-none px-2 sm:px-4"
      >
        {planes.map((plan) => (
          <article
            key={plan.id}
            className="relative flex w-[85vw] max-w-70 shrink-0 snap-center flex-col justify-between rounded-2xl border border-stone-800/60 bg-linear-to-b from-[#211f1c] to-[#161412] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-500/30 hover:shadow-[0_8px_30px_rgba(245,158,11,0.06)]"
          >
            {/* Contenido principal */}
            <div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-200 line-clamp-2">
                  {plan.nombre}
                </h3>
                <span
                  className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    plan.activa
                      ? "border-amber-400/20 bg-amber-400/10 text-amber-400"
                      : "border-stone-700/50 bg-stone-800/50 text-stone-500"
                  }`}
                >
                  {plan.activa ? "Vigente" : "Pausada"}
                </span>
              </div>

              <div className="mt-5 flex items-baseline gap-2">
                <p className="text-3xl font-black tracking-tight text-white font-mono">
                  {plan.precio} <span className="text-lg">Arg.</span>
                </p>
              </div>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-amber-500/90">
                {plan.duracionDias} días
              </p>

              <p className="mt-4 text-sm text-stone-400 leading-relaxed line-clamp-3">
                {plan.detalle}
              </p>

              {plan.beneficios.length > 0 && (
                <ul className="mt-6 space-y-3 border-t border-stone-800/60 pt-5">
                  {plan.beneficios.map((beneficio, index) => (
                    <li
                      key={`${plan.id}-${index}`}
                      className="flex items-start gap-2.5 text-xs text-stone-300"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                      <span className="leading-snug">{beneficio}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* BOTÓN DE MODIFICAR (Next.js Link) */}
            <div className="mt-1 pt-1 relative z-10">
              <Link
                href="/dashboard?seccion=membresias"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-800/40 px-4 py-2.5 text-sm font-semibold text-stone-300 transition-all hover:bg-amber-500/10 hover:text-amber-400 active:scale-95"
              >
                <Pencil className="h-4 w-4" />
                <span>Modificar</span>
              </Link>
            </div>

            <div className="absolute bottom-0 left-0 h-1 w-full rounded-b-2xl bg-linear-to-r from-transparent via-stone-800/50 to-transparent transition-colors duration-300 group-hover:via-amber-500/20" />
          </article>
        ))}
      </div>
    </div>
  );
}
