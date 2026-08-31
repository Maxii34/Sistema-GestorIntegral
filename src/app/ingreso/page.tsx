"use client";

import { useState } from "react";

interface RespuestaIngreso {
  ok: boolean;
  acceso: boolean;
  mensaje: string;
  usuario?: {
    nombre: string;
    apellido: string;
    tipoMembresia: string;
    fechaVencimiento: string;
  };
  ingreso?: {
    usuarioId: string;
    dni: string;
    _id: string;
    fechaIngreso: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export default function IngresoPage() {
  const [dni, setDni] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RespuestaIngreso | null>(null);

  // Formatear fechas ISO a formato legible (DD/MM/YYYY o HH:mm)
  const formatearFecha = (fechaIso: string) => {
    return new Date(fechaIso).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatearHora = (fechaIso: string) => {
    return new Date(fechaIso).toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calcular días restantes hasta el vencimiento
  const calcularDiasRestantes = (fechaIso: string) => {
    const hoy = new Date();
    const vencimiento = new Date(fechaIso);
    const diferenciaMs = vencimiento.getTime() - hoy.getTime();
    const dias = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));
    return dias > 0 ? dias : 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dni.trim()) return;

    setLoading(true);

    try {
      // Reemplaza con tu endpoint real:
      // const res = await fetch("/api/ingreso", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ dni }),
      // });
      // const result = await res.json();

      // Mock con los datos que proporcionaste:
      const result: RespuestaIngreso = {
        ok: true,
        acceso: true,
        mensaje: "Bienvenido, ingreso registrado",
        usuario: {
          nombre: "Carla",
          apellido: "Lopez",
          tipoMembresia: "anual",
          fechaVencimiento: "2027-04-15T19:24:09.277Z",
        },
        ingreso: {
          usuarioId: "69dfe5d99e1ccb52a2c970c1",
          dni: dni,
          _id: "6a95b1874519ea87893b1b65",
          fechaIngreso: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          __v: 0,
        },
      };

      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLimpiar = () => {
    setDni("");
    setData(null);
  };

  return (
    <main className="min-h-[calc(100vh-130px)] bg-zinc-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-xl">
        {/* Encabezado */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
            Control de Acceso
          </span>
          <h1 className="text-3xl sm:text-4xl font-black italic tracking-tight text-zinc-900 uppercase mt-3">
            Registro de <span className="text-amber-600">Ingreso</span>
          </h1>
          <p className="text-zinc-600 text-sm mt-1">
            Ingresa tu número de documento para validar tu membresía.
          </p>
        </div>

        {/* Tarjeta del Formulario */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl shadow-zinc-200/50 border border-zinc-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="dni"
                className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2"
              >
                Número de DNI / Documento
              </label>
              <input
                type="text"
                id="dni"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                placeholder="Ej: 32777888"
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 placeholder-zinc-400 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-lg tracking-wider"
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-300 text-zinc-950 font-black py-3 px-6 rounded-xl uppercase tracking-wider transition-colors shadow-md shadow-amber-500/20 cursor-pointer"
              >
                {loading ? "Verificando..." : "Verificar Pase"}
              </button>

              {data && (
                <button
                  type="button"
                  onClick={handleLimpiar}
                  className="bg-zinc-200 hover:bg-zinc-300 text-zinc-700 font-bold py-3 px-4 rounded-xl transition-colors cursor-pointer"
                >
                  Limpiar
                </button>
              )}
            </div>
          </form>

          {/* Resultado de la Respuesta */}
          {data && (
            <div className="mt-8 pt-6 border-t border-zinc-100">
              {/* Badge de Estado */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Resultado
                </span>
                <span
                  className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                    data.acceso
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-rose-100 text-rose-800 border border-rose-300"
                  }`}
                >
                  {data.acceso ? "Acceso Permitido" : "Acceso Denegado"}
                </span>
              </div>

              {/* Información del Usuario y Membresía */}
              {data.usuario && (
                <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200 space-y-3">
                  <div className="flex justify-between items-baseline border-b border-zinc-200/60 pb-2">
                    <span className="text-xs text-zinc-500 font-bold uppercase">
                      Socio
                    </span>
                    <span className="text-base font-black text-zinc-900">
                      {data.usuario.nombre} {data.usuario.apellido}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline border-b border-zinc-200/60 pb-2">
                    <span className="text-xs text-zinc-500 font-bold uppercase">
                      DNI
                    </span>
                    <span className="text-sm font-semibold text-zinc-800">
                      {data.ingreso?.dni || dni}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline border-b border-zinc-200/60 pb-2">
                    <span className="text-xs text-zinc-500 font-bold uppercase">
                      Tipo de Membresía
                    </span>
                    <span className="text-sm font-bold capitalize text-amber-600">
                      Plan {data.usuario.tipoMembresia}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline border-b border-zinc-200/60 pb-2">
                    <span className="text-xs text-zinc-500 font-bold uppercase">
                      Fecha Vencimiento
                    </span>
                    <span className="text-sm font-black text-zinc-900">
                      {formatearFecha(data.usuario.fechaVencimiento)}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-zinc-500 font-bold uppercase">
                      Días Restantes
                    </span>
                    <span className="text-sm font-bold text-zinc-700">
                      {calcularDiasRestantes(data.usuario.fechaVencimiento)}{" "}
                      días
                    </span>
                  </div>
                </div>
              )}

              {/* Mensaje de Confirmación / Horario */}
              <div className="mt-4 p-3 bg-zinc-950 text-white rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium">{data.mensaje}</p>
                  {data.ingreso && (
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      Hora de ingreso:{" "}
                      <span className="text-amber-400 font-semibold">
                        {formatearHora(data.ingreso.fechaIngreso)} hs
                      </span>
                    </p>
                  )}
                </div>

                <span className="text-[10px] uppercase font-bold text-zinc-400 bg-zinc-800 px-2 py-1 rounded">
                  OK
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
