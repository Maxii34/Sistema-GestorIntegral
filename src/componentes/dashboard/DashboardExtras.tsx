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

const pagosRecientes = [
  {
    id: "REN-9041",
    socio: "Carlos Ruiz",
    dni: "40123456",
    plan: "Mensual",
    monto: "$15.000",
    metodo: "Efectivo",
    hora: "10:14",
    operador: "Admin",
  },
  {
    id: "REN-9040",
    socio: "María López",
    dni: "35222333",
    plan: "Trimestral",
    monto: "$38.000",
    metodo: "Transferencia",
    hora: "09:42",
    operador: "Ana G.",
  },
  {
    id: "REN-9039",
    socio: "Esteban Quiroga",
    dni: "41998231",
    plan: "Mensual",
    monto: "$15.000",
    metodo: "Débito",
    hora: "08:50",
    operador: "Admin",
  },
  {
    id: "REN-9038",
    socio: "Luciana Pereyra",
    dni: "39882110",
    plan: "Semestral",
    monto: "$70.000",
    metodo: "Efectivo",
    hora: "08:15",
    operador: "Admin",
  },
];

export function DashboardIngresos() {
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
        <button className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-stone-700 shadow-xs hover:bg-stone-50 transition cursor-pointer">
          <ArrowDownToLine className="h-3.5 w-3.5 text-stone-500" />
          <span>Exportar Resumen (CSV)</span>
        </button>
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
            $185.400
          </p>
          <p className="mt-1 text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> +12.4% vs mes previo
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
            $43.000
          </p>
          <p className="mt-1 text-xs text-stone-500">
            4 transacciones registradas
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
            $19.200
          </p>
          <p className="mt-1 text-xs text-stone-500">
            Calculado sobre 132 renovaciones
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
            $240.000
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
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
            <div className="flex justify-between items-center text-xs text-stone-600 font-semibold mb-2">
              <span>Efectivo en Caja</span>
              <span className="font-mono text-stone-900">$98.000 (53%)</span>
            </div>
            <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full"
                style={{ width: "53%" }}
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
            <div className="flex justify-between items-center text-xs text-stone-600 font-semibold mb-2">
              <span>Transferencias Bancarias</span>
              <span className="font-mono text-stone-900">$59.400 (32%)</span>
            </div>
            <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: "32%" }}
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
            <div className="flex justify-between items-center text-xs text-stone-600 font-semibold mb-2">
              <span>Tarjetas de Débito / QR</span>
              <span className="font-mono text-stone-900">$28.000 (15%)</span>
            </div>
            <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: "15%" }}
              />
            </div>
          </div>
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
              {pagosRecientes.map((pago) => (
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
                    {pago.monto}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
