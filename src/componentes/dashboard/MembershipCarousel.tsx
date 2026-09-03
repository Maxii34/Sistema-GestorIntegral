"use client";

import { useRef } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

// Definimos la interfaz para los props (ya que estás usando TypeScript)
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
    carouselRef.current?.scrollBy({
      left: direccion === "derecha" ? 344 : -344,
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
    <div className="relative">
      <button
        type="button"
        onClick={() => desplazar("izquierda")}
        aria-label="Ver membresías anteriores"
        className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-stone-700 bg-stone-900/90 p-2 text-stone-200 shadow-lg transition hover:border-amber-400 hover:text-amber-400 sm:block"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto pb-8 pt-4 snap-x snap-mandatory scroll-smooth scrollbar-none"
      >
        {planes.map((plan) => (
          <article
            key={plan.id}
            className="relative flex min-w-70 shrink-0 snap-center flex-col justify-between rounded-2xl border border-stone-800/80 bg-[#1c1a17] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-stone-700 sm:min-w-80"
          >
          <div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                {plan.nombre}
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider ${
                  plan.activa ? "text-emerald-400" : "text-stone-500"
                }`}
              >
                {plan.activa ? "Disponible" : "No disponible"}
              </span>
            </div>
            <p className="mt-5 text-3xl font-black text-white font-mono">
              {plan.precio}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              {plan.duracionDias} días
            </p>
            <p className="mt-3 text-sm text-stone-300 leading-relaxed">
              {plan.detalle}
            </p>
            {plan.beneficios.length > 0 && (
              <ul className="mt-5 space-y-2 border-t border-stone-800/60 pt-4">
                {plan.beneficios.map((beneficio, index) => (
                  <li
                    key={`${plan.id}-${index}`}
                    className="flex gap-2 text-xs text-stone-300"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                    <span>{beneficio}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-8 border-t border-stone-800/60 pt-6 text-xs text-stone-500">
            {plan.activa ? "Membresía vigente" : "Membresía pausada"}
          </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        onClick={() => desplazar("derecha")}
        aria-label="Ver más membresías"
        className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-stone-700 bg-stone-900/90 p-2 text-stone-200 shadow-lg transition hover:border-amber-400 hover:text-amber-400 sm:block"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}