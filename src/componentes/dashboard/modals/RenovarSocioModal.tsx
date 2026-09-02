"use client";

import { X } from "lucide-react";

type RenovarSocioModalProps = {
  socio: {
    nombre: string;
    dni: string;
  };
  form: {
    pagoMensual: number | "";
    tipoMembresia: string;
  };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function RenovarSocioModal({
  socio,
  form,
  onChange,
  onClose,
  onSubmit,
}: RenovarSocioModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-150">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h3 className="text-base font-bold text-stone-900">
            Renovar Membresía
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar renovación"
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-4 space-y-4">
          <div className="rounded-xl bg-stone-50 p-3 border border-stone-100">
            <span className="text-xs text-stone-500 block">Socio</span>
            <span className="text-sm font-bold text-stone-900">
              {socio.nombre}
            </span>
            <span className="text-xs font-mono text-stone-600 block mt-0.5">
              DNI: {socio.dni}
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Membresía / Período
            </label>
            <select
              name="tipoMembresia"
              value={form.tipoMembresia}
              onChange={onChange}
              className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 focus:border-amber-500 focus:outline-none"
            >
              <option value="mensual">Mensual (30 días)</option>
              <option value="trimestral">Trimestral (90 días)</option>
              <option value="semestral">Semestral (180 días)</option>
              <option value="anual">Anual (365 días)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Importe Abonado ($ ARS)
            </label>
            <input
              type="number"
              name="pagoMensual"
              min="1"
              value={form.pagoMensual}
              onChange={onChange}
              required
              className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm font-mono text-stone-900 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-lg transition"
            >
              Confirmar Renovación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
