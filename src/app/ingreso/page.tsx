"use client";

import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import {
  Dumbbell,
  CheckCircle2,
  XCircle,
  Calendar,
  Clock,
  CreditCard,
  RotateCcw,
  Loader2,
  IdCard,
  AlertTriangle,
} from "lucide-react";
import { registrarIngreso } from "@/lib/api";
import Swal from "sweetalert2";

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
  };
}

const obtenerMensajeIngreso = (error: unknown) => {
  const mensaje = error instanceof Error ? error.message : "";
  const mensajeNormalizado = mensaje.toLowerCase();

  if (
    mensajeNormalizado.includes("no existe") ||
    mensajeNormalizado.includes("no pertenece") ||
    mensajeNormalizado.includes("dni")
  ) {
    return {
      titulo: "Socio no encontrado",
      mensaje: "No existe un socio registrado con ese DNI.",
      icono: "warning" as const,
    };
  }

  if (
    mensajeNormalizado.includes("expirada") ||
    mensajeNormalizado.includes("membres")
  ) {
    return {
      titulo: "Membresía vencida",
      mensaje: "La membresía está vencida. Debe renovarse antes de ingresar.",
      icono: "warning" as const,
    };
  }

  if (mensajeNormalizado.includes("activo")) {
    return {
      titulo: "Acceso inactivo",
      mensaje: "El socio no tiene habilitado el acceso al gimnasio.",
      icono: "warning" as const,
    };
  }

  return {
    titulo: "No se pudo registrar el ingreso",
    mensaje: mensaje || "No se pudo conectar con el servidor. Intentá nuevamente.",
    icono: "error" as const,
  };
};

export default function IngresoPage() {
  const [dni, setDni] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RespuestaIngreso | null>(null);

  // Auto-limpieza en recepción tras 7 segundos de mostrar el resultado
  useEffect(() => {
    if (!data) return;
    const timer = setTimeout(() => {
      setData(null);
      setDni("");
    }, 7000);
    return () => clearTimeout(timer);
  }, [data]);

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

  const calcularDiasRestantes = (fechaIso: string) => {
    const hoy = new Date();
    const vencimiento = new Date(fechaIso);
    const diferenciaMs = vencimiento.getTime() - hoy.getTime();
    const dias = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));
    return dias > 0 ? dias : 0;
  };

  const handleChangeDni = (e: ChangeEvent<HTMLInputElement>) => {
    // Permite únicamente números y hasta 8 dígitos
    const cleanValue = e.target.value.replace(/\D/g, "").slice(0, 8);
    setDni(cleanValue);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (dni.length !== 8) return;

    setLoading(true);
    setData(null);

    try {
      const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
      const result = await registrarIngreso(dni, token);
      setData(result);
      await Swal.fire({
        icon: result.acceso ? "success" : "warning",
        title: result.acceso ? "Acceso autorizado" : "Acceso denegado",
        text: result.mensaje,
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (error) {
      const resultado = obtenerMensajeIngreso(error);
      await Swal.fire({
        icon: resultado.icono,
        title: resultado.titulo,
        text: resultado.mensaje,
      });
      setData({
        ok: false,
        acceso: false,
        mensaje: resultado.mensaje,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLimpiar = () => {
    setDni("");
    setData(null);
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#f8f9fa] py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center antialiased">
      <div className="w-full max-w-xl space-y-6">
        
        {/* Cabecera Tipo Terminal */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-200/80 shadow-xs mb-1">
            <Dumbbell className="h-6 w-6" />
          </div>
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-700">
            <span>Terminal de Recepción</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            Control de Acceso
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
            Ingresá tu DNI para validar tu plan y habilitar el molinete.
          </p>
        </div>

        {/* Tarjeta de Entrada de DNI */}
        <div className="rounded-2xl border border-stone-200/90 bg-white p-6 sm:p-8 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="dni"
                className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2 text-center"
              >
                Número de Documento (8 dígitos)
              </label>
              <div className="relative">
                <IdCard className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
                <input
                  type="text"
                  inputMode="numeric"
                  id="dni"
                  autoFocus
                  value={dni}
                  onChange={handleChangeDni}
                  placeholder="40123456"
                  maxLength={8}
                  className="w-full rounded-xl border border-stone-300 bg-stone-50/50 pl-12 pr-4 py-3 text-center text-xl sm:text-2xl font-mono font-bold tracking-widest text-stone-900 placeholder:text-stone-300 placeholder:font-normal focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading || dni.length !== 8}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-[0.99] disabled:opacity-50 text-stone-950 font-bold py-3 px-6 text-sm uppercase tracking-wider shadow-xs hover:shadow transition-all cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Verificando Pase...</span>
                  </>
                ) : (
                  <span>Registrar Ingreso</span>
                )}
              </button>

              {data && (
                <button
                  type="button"
                  onClick={handleLimpiar}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-100 hover:bg-stone-200 px-4 py-3 text-xs font-bold uppercase text-stone-700 transition cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Nuevo</span>
                </button>
              )}
            </div>
          </form>

          {/* Tarjeta de Respuesta Visual */}
          {data && (
            <div className="mt-6 pt-6 border-t border-stone-100 animate-in fade-in zoom-in-95 duration-200">
              
              {/* Pantalla Superior de Estado */}
              <div
                className={`p-5 rounded-2xl border flex items-center gap-4 ${
                  data.acceso
                    ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                    : "bg-rose-50 border-rose-200 text-rose-900"
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl shrink-0 ${
                    data.acceso ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                  }`}
                >
                  {data.acceso ? (
                    <CheckCircle2 className="h-7 w-7" />
                  ) : (
                    <XCircle className="h-7 w-7" />
                  )}
                </div>

                <div className="space-y-0.5 min-w-0">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md inline-block ${
                      data.acceso
                        ? "bg-emerald-200/60 text-emerald-800"
                        : "bg-rose-200/60 text-rose-800"
                    }`}
                  >
                    {data.acceso ? "Pase Autorizado" : "Acceso Denegado"}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold leading-tight truncate">
                    {data.mensaje}
                  </h3>
                </div>
              </div>

              {/* Ficha del Socio y Membresía */}
              {data.usuario && (
                <div className="mt-4 rounded-xl border border-stone-200 bg-stone-50/60 p-4 space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between items-center pb-2.5 border-b border-stone-200/70">
                    <span className="text-stone-500 font-semibold uppercase text-[11px]">
                      Socio Habilitado
                    </span>
                    <span className="font-bold text-stone-900 text-base">
                      {data.usuario.nombre} {data.usuario.apellido}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-1">
                    <div>
                      <span className="text-stone-500 block text-[11px] font-semibold uppercase">
                        Plan Activo
                      </span>
                      <span className="inline-flex items-center gap-1 font-bold text-amber-700 capitalize mt-0.5">
                        <CreditCard className="h-3.5 w-3.5" />
                        Plan {data.usuario.tipoMembresia}
                      </span>
                    </div>

                    <div>
                      <span className="text-stone-500 block text-[11px] font-semibold uppercase">
                        Vigencia Restante
                      </span>
                      <span className="font-bold font-mono text-stone-800 mt-0.5 block">
                        {calcularDiasRestantes(data.usuario.fechaVencimiento)} días
                      </span>
                    </div>

                    <div>
                      <span className="text-stone-500 block text-[11px] font-semibold uppercase">
                        Fecha de Vencimiento
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-stone-700 mt-0.5">
                        <Calendar className="h-3.5 w-3.5 text-stone-400" />
                        {formatearFecha(data.usuario.fechaVencimiento)}
                      </span>
                    </div>

                    {data.ingreso && (
                      <div>
                        <span className="text-stone-500 block text-[11px] font-semibold uppercase">
                          Hora Registrada
                        </span>
                        <span className="inline-flex items-center gap-1 font-mono text-stone-700 mt-0.5">
                          <Clock className="h-3.5 w-3.5 text-stone-400" />
                          {formatearHora(data.ingreso.fechaIngreso)} hs
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Aviso cuando el socio está vencido o suspendido */}
              {!data.acceso && (
                <div className="mt-4 flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-700 mt-0.5" />
                  <span>
                    Si tu membresía finalizó, acercate al mostrador de recepción para renovar tu cuota y rehabilitar tu huella o acceso.
                  </span>
                </div>
              )}

              <div className="mt-4 text-center">
                <span className="text-[11px] text-stone-400">
                  La terminal se reiniciará automáticamente en unos segundos.
                </span>
              </div>

            </div>
          )}

        </div>

      </div>
    </main>
  );
}