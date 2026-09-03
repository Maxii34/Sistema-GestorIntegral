"use client";

import {
  DollarSign,
  TrendingUp,
  Wallet,
  Receipt,
  Calendar,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  getRenovacionesRecientes,
  getResumenDashboard,
  getMembresias,
  getUsuarios,
} from "@/lib/api";

type Pago = {
  id: string;
  socio: string;
  dni: string;
  plan: string;
  monto: number;
  hora: string;
  operador: string;
};

const toPago = (
  raw: Record<string, unknown>,
  usuariosPorDni: Map<string, Record<string, unknown>>,
  membresiasPorId: Map<string, Record<string, unknown>>,
  operadorActual: string,
): Pago => {
  const usuario = usuariosPorDni.get(String(raw.dni ?? ""));
  const usuarioRelacionado =
    typeof raw.usuarioId === "object" && raw.usuarioId !== null
      ? (raw.usuarioId as Record<string, unknown>)
      : {};
  const nombre =
    String(raw.socio ?? raw.nombre ?? "") ||
    [usuario?.nombre, usuario?.apellido].filter(Boolean).join(" ") ||
    [usuarioRelacionado.nombre, usuarioRelacionado.apellido]
      .filter(Boolean)
      .join(" ") ||
    "Sin nombre";
  const fecha = raw.hora ?? raw.fecha ?? raw.fechaInicio;
  const fechaHora = fecha ? new Date(String(fecha)) : null;
  const hora =
    fechaHora && !Number.isNaN(fechaHora.getTime())
      ? fechaHora.toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : String(fecha ?? "-");
  const membresiaRaw = raw.membresia ?? usuario?.membresia;
  const membresiaId =
    typeof membresiaRaw === "object" && membresiaRaw !== null
      ? String(
          (membresiaRaw as Record<string, unknown>)._id ??
            (membresiaRaw as Record<string, unknown>).id ??
            "",
        )
      : String(membresiaRaw ?? "");
  const membresia =
    typeof membresiaRaw === "object" && membresiaRaw !== null
      ? String((membresiaRaw as Record<string, unknown>).nombre ?? "")
      : String(membresiasPorId.get(membresiaId)?.nombre ?? "");

  return {
    id: String(raw.id ?? raw._id ?? raw.comprobante ?? ""),
    socio: nombre,
    dni: String(raw.dni ?? ""),
    plan: String(raw.plan ?? raw.tipoMembresia ?? membresia ?? ""),
    monto: Number(raw.monto ?? raw.pagoMensual ?? 0),
    hora,
    operador: String(raw.operador ?? operadorActual),
  };
};

const getOperadorActual = () => {
  try {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado) return "Operador actual";

    const usuario = JSON.parse(usuarioGuardado) as Record<string, unknown>;
    return (
      [usuario.nombre, usuario.apellido].filter(Boolean).join(" ") ||
      String(usuario.email ?? "Operador actual")
    );
  } catch {
    return "Operador actual";
  }
};

export function DashboardIngresos() {
  const [resumen, setResumen] = useState<Record<string, unknown>>({});
  const [pagos, setPagos] = useState<Pago[]>([]);

  useEffect(() => {
    const cargarResumen = async () => {
      try {
        const token = localStorage.getItem("token");
        const [resumenData, renovacionesData, usuarios, membresias] = await Promise.all([
          getResumenDashboard(token),
          getRenovacionesRecientes(token),
          getUsuarios(token),
          getMembresias(token),
        ]);
        setResumen(resumenData);
        const usuariosPorDni = new Map(
          usuarios.map((usuario) => [String(usuario.dni ?? ""), usuario]),
        );
        const operadorActual = getOperadorActual();
        const membresiasPorId = new Map(
          membresias.map((membresia) => [
            String(membresia._id ?? membresia.id ?? ""),
            membresia,
          ]),
        );
        const renovacionesPorDni = new Set(
          renovacionesData.map((renovacion) => String(renovacion.dni ?? "")),
        );
        const altas = usuarios
          .filter((usuario) => !renovacionesPorDni.has(String(usuario.dni ?? "")))
          .map((usuario) => ({
            _id: `alta-${String(usuario._id ?? usuario.id ?? usuario.dni)}`,
            nombre: [usuario.nombre, usuario.apellido]
              .filter(Boolean)
              .join(" "),
            dni: usuario.dni,
            membresia: usuario.membresia,
            fechaInicio: usuario.fechaInicio,
            pagoMensual: 0,
          }));
        setPagos(
          [...renovacionesData, ...altas]
            .map((movimiento) =>
              toPago(
                movimiento,
                usuariosPorDni,
                membresiasPorId,
                operadorActual,
              ),
            )
            .sort((a, b) => b.hora.localeCompare(a.hora)),
        );
      } catch {
        setResumen({});
      }
    };
    const actualizarDatos = () => {
      void cargarResumen();
    };

    window.addEventListener("dashboard-data-change", actualizarDatos);
    void cargarResumen();

    return () => {
      window.removeEventListener("dashboard-data-change", actualizarDatos);
    };
  }, []);
  const numero = (...keys: string[]) => {
    for (const key of keys) {
      const value = resumen[key];
      if (typeof value === "number") return value;
      if (typeof value === "string" && value.trim() !== "" && !Number.isNaN(Number(value))) {
        return Number(value);
      }
    }
    return 0;
  };
  const moneda = (value: number) => `$${value.toLocaleString("es-AR")}`;
  const ingresosMesActual =
    typeof resumen.ingresosMesActual === "object" && resumen.ingresosMesActual !== null
      ? resumen.ingresosMesActual as Record<string, unknown>
      : {};
  const totalMes = Number(ingresosMesActual.total ?? numero("recaudacionMes", "ingresosMes", "totalMes"));
  const cantidadMes = Number(ingresosMesActual.cantidad ?? 0);
  const renovacionesHoy =
    typeof resumen.renovacionesHoy === "object" && resumen.renovacionesHoy !== null
      ? resumen.renovacionesHoy as Record<string, unknown>
      : {};
  const variacionIngresos = numero("variacionIngresos", "variacionMes");
  return (
    <div className="space-y-6">
      {/* Cabecera */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-stone-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900">
            Control de Caja e Ingresos
          </h1>
          <p className="text-sm text-stone-500">
            Arqueo financiero, renovaciones de membresías y balance mensual.
          </p>
        </div>
      </div>

      {/* Tarjetas Superiores */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Recaudación Mes
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold font-mono text-stone-900">
            {moneda(totalMes)}
          </p>
          <p className="mt-1 text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> {variacionIngresos}% vs mes previo
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Caja Hoy (Mostrador)
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
              <Receipt className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold font-mono text-stone-900">
            {moneda(Number(renovacionesHoy.total ?? numero("cajaHoy")))}
          </p>
          <p className="mt-1 text-xs text-stone-500">
            {Number(renovacionesHoy.cantidad ?? numero("transaccionesHoy", "cantidadTransacciones"))} transacciones registradas
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Ticket Promedio
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <Wallet className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold font-mono text-stone-900">
            {moneda(numero("ticketPromedio", "promedioTicket") || (cantidadMes ? totalMes / cantidadMes : 0))}
          </p>
          <p className="mt-1 text-xs text-stone-500">
            Calculado sobre datos del backend
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Proyección Cierre
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 text-stone-700">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold font-mono text-stone-900">
            {moneda(numero("proyeccionCierre", "proyeccionMes"))}
          </p>
          <p className="mt-1 text-xs text-stone-500">Estimado a fin de mes</p>
        </div>
      </div>

      {/* Historial Detallado de Cobros */}
      <div className="rounded-2xl border border-stone-200 bg-white shadow-xs overflow-hidden">
        <div className="border-b border-stone-100 px-6 py-4 flex items-center justify-between bg-stone-50/40">
          <div>
            <h2 className="text-sm font-bold text-stone-900">
              Últimos Movimientos
            </h2>
            <p className="text-xs text-stone-500">
              Altas y renovaciones registradas.
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
            Caja Abierta
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50 text-[11px] font-bold uppercase tracking-wider text-stone-500">
                <th className="py-3.5 pl-6 pr-4">Nombre</th>
                <th className="px-4 py-3.5">Dni</th>
                <th className="px-4 py-3.5">Membresía</th>
                <th className="px-4 py-3.5">Operador</th>
                <th className="px-4 py-3.5">Hora</th>
                <th className="py-3.5 pl-4 pr-6 text-right">Monto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {pagos.map((pago) => (
                <tr
                  key={pago.id}
                  className="hover:bg-amber-50/20 transition-colors"
                >
                  <td className="py-3.5 pl-6 pr-4 font-semibold text-stone-900">
                    {pago.socio}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-stone-600">
                    {pago.dni}
                  </td>
                  <td className="px-4 py-3.5 text-xs text-stone-700">
                    {pago.plan}
                  </td>
                  <td className="px-4 py-3.5 text-xs text-stone-500">
                    {pago.operador}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-stone-500">
                    {pago.hora} hs
                  </td>
                  <td className="py-3.5 pl-4 pr-6 text-right font-mono font-bold text-stone-900">
                    {moneda(pago.monto)}
                  </td>
                </tr>
              ))}
              {pagos.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-sm text-stone-500">
                    No hay altas ni renovaciones registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
