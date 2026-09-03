"use client";

import { Search, Filter } from "lucide-react";

type BuscadorSociosProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

export default function BuscadorSocios({
  searchTerm,
  onSearchChange,
}: BuscadorSociosProps) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs">
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar por nombre, apellido o DNI..."
            className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pl-10 pr-4 text-sm text-stone-900 outline-none transition focus:border-green-500 focus:bg-white"
          />
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-5 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
        >
          <Filter className="h-4 w-4" />
          Filtrar
        </button>
      </div>
    </div>
  );
}
