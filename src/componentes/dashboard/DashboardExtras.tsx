"use client";

import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Wallet,
  Receipt,
  Calendar,
  ArrowDownToLine,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  getRenovacionesRecientes,
  getResumenDashboard,
} from "@/lib/api";

type Pago = {
  id: string;
  socio: string;
  dni: string;
  plan: string;
  monto: number;
  metodo: string;
  hora: string;
  operador: string;
};

const toPago = (raw: Record<string, unknown>): Pago => ({
  id: String(raw.id ?? raw._id ?? raw.comprobante ?? ""),
  socio: String(raw.socio ?? raw.nombre ?? ""),
  dni: String(raw.dni ?? ""),
  plan: String(raw.plan ?? raw.tipoMembresia ?? ""),
  monto: Number(raw.monto ?? raw.pagoMensual ?? 0),
  metodo: String(raw.metodo ?? raw.metodoPago ?? ""),
  hora: String(raw.hora ?? raw.fecha ?? ""),
  operador: String(raw.operador ?? ""),
});

export function DashboardIngresos() {
  const [resumen, setResumen] = useState<Record<string, unknown>>({});
  const [pagos, setPagos] = useState<Pago[]>([]);

  useEffect(() => {
    const cargarResumen = async () => {
      try {
        const token = localStorage.getItem("token");
        const [resumenData, renovacionesData] = await Promise.all([
          getResumenDashboard(token),
          getRenovacionesRecientes(token),
        ]);
        setResumen(resumenData);
        setPagos(renovacionesData.map(toPago));
      } catch {
        setResumen({});
      }
    };
    void cargarResumen();
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
  const canales = Array.isArray(resumen.distribucionMetodos)
    ? resumen.distribucionMetodos
        .filter((canal): canal is Record<string, unknown> => typeof canal === "object" && canal !== null)
        .map((canal) => ({
          nombre: String(canal.nombre ?? canal.metodo ?? ""),
          monto: Number(canal.monto ?? canal.total ?? 0),
          porcentaje: Number(canal.porcentaje ?? 0),
        }))
    : [];

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

      {/* Desglose de Canales de Pago */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-stone-800">
          Distribución por Método de Cobro
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {canales.map((canal, index) => (
            <div key={canal.nombre || index} className="p-4 rounded-xl bg-stone-50 border border-stone-100">
              <div className="flex justify-between items-center text-xs text-stone-600 font-semibold mb-2">
                <span>{canal.nombre}</span>
                <span className="font-mono text-stone-900">{moneda(canal.monto)} ({canal.porcentaje}%)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
                <div className={`h-full rounded-full ${index % 2 === 0 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${canal.porcentaje}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historial Detallado de Cobros */}
      <div className="rounded-2xl border border-stone-200 bg-white shadow-xs overflow-hidden">
        <div className="border-b border-stone-100 px-6 py-4 flex items-center justify-between bg-stone-50/40">
          <div>
            <h2 className="text-sm font-bold text-stone-900">
              Últimos Cobros y Renovaciones
            </h2>
            <p className="text-xs text-stone-500">
              Transacciones procesadas vía /api/renovar.
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
                <th className="py-3.5 pl-6 pr-4">Comprobante</th>
                <th className="px-4 py-3.5">Socio</th>
                <th className="px-4 py-3.5">Membresía</th>
                <th className="px-4 py-3.5">Método</th>
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
                  <td className="py-3.5 pl-6 pr-4 font-mono text-xs text-stone-500">
                    {pago.id}
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-stone-900">
                    {pago.socio}
                    <span className="block font-mono text-[11px] font-normal text-stone-400">
                      DNI: {pago.dni}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-stone-700">
                    {pago.plan}
                  </td>
                  <td className="px-4 py-3.5 text-xs text-stone-600">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-stone-100 px-2 py-0.5">
                      <CreditCard className="h-3 w-3 text-stone-400" />
                      {pago.metodo}
                    </span>
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
                  <td colSpan={7} className="px-6 py-10 text-center text-sm text-stone-500">
                    No hay cobros registrados en el resumen del backend.
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
