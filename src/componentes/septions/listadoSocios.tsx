"use client";

import { User, Calendar, RefreshCw, Trash2 } from "lucide-react";
import type { Socio } from "./types";

type ListadoSociosProps = {
  sociosFiltrados: Socio[];
  onOpenRenovar: (socio: Socio) => void;
  onDeleteSocio: (dni: string) => void;
};

export default function ListadoSocios({
  sociosFiltrados,
  onOpenRenovar,
  onDeleteSocio,
}: ListadoSociosProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs">
      <div className="border-b border-stone-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-stone-900">
          Socios registrados
        </h2>
        <p className="mt-1 text-sm text-stone-500">
          Listado de socios del gimnasio.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-225">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                Socio
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                DNI
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                Membresía
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                Estado
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                Vencimiento
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-stone-500">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
            {sociosFiltrados.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <User className="mb-3 h-10 w-10 text-stone-300" />
                    <p className="text-sm font-medium text-stone-500">
                      No se encontraron socios
                    </p>
                    <p className="mt-1 text-xs text-stone-400">
                      Intenta modificar la búsqueda.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              sociosFiltrados.map((socio) => (
                <tr
                  key={socio.dni}
                  className="border-b border-stone-100 transition hover:bg-stone-50"
                >
                  {/* SOCIO */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500/10">
                        <User className="h-4 w-4 text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-stone-900">
                          {socio.nombre} {socio.apellido}
                        </p>
                        {socio.telefono && (
                          <p className="text-xs text-stone-500">
                            {socio.telefono}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* DNI */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-stone-700">{socio.dni}</span>
                  </td>

                  {/* MEMBRESIA */}
                  <td className="px-6 py-4">
                    <span className="rounded-lg bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400">
                      {socio.membresia}
                    </span>
                  </td>

                  {/* ESTADO */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                        socio.estado === "Activo"
                          ? "bg-green-500/10 text-green-400"
                          : socio.estado === "Suspendido"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {socio.estado}
                    </span>
                  </td>

                  {/* VENCIMIENTO */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-stone-700">
                      <Calendar className="h-4 w-4 text-stone-400" />
                      {socio.vencimiento}
                    </div>
                  </td>

                  {/* ACCIONES */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenRenovar(socio)}
                        title="Renovar membresía"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition hover:bg-blue-500/20"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteSocio(socio.dni)}
                        title="Eliminar socio"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-400 transition hover:bg-red-500/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
