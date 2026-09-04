import {
  Users,
  UserCheck,
  Clock,
  type LucideIcon,
} from "lucide-react";

type DashboardResumenProps = {
  cards: Array<{
    label: string;
    value: string;
    detail: string;
    icon: LucideIcon;
    tone: string;
  }>;

  recentEntries: Array<{
    nombre: string;
    dni: string;
    ingreso: string;
    estado: string;
  }>;
  plansSummary: Array<{ nombre: string; total: number; porcentaje: number }>;
  sociosActivos: number;
  socios: Array<{
    nombre: string;
    dni: string;
    telefono: string;
    plan: string;
    estado: "Activo" | "Suspendido" | "Inactivo";
    vencimiento: string;
  }>;
  onOpenIngresos: () => void;
};

export default function DashboardResumen({
  cards,
  recentEntries,
  plansSummary,
  sociosActivos,
  socios,
  onOpenIngresos,
}: DashboardResumenProps) {
  return (
    // Agregamos min-w-0 al contenedor principal por seguridad
    <div className="space-y-6 min-w-0 w-full overflow-hidden">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900">
            Resumen Operativo
          </h1>
          <p className="text-sm text-stone-500">
            Métricas clave y actividad en tiempo real de IronGym.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Servicio sincronizado
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  {card.label}
                </span>
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                    card.tone === "amber"
                      ? "bg-amber-100 text-amber-800"
                      : card.tone === "emerald"
                        ? "bg-emerald-100 text-emerald-800"
                        : card.tone === "rose"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-sky-100 text-sky-800"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold font-mono text-stone-900">
                  {card.value}
                </p>
                <p className="mt-1 text-xs text-stone-500">{card.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* LA CLAVE ESTÁ AQUÍ: El grid padre */}
      <div className="grid gap-6 xl:grid-cols-3">
        
        {/* TARJETA 1: Agregamos min-w-0 aquí */}
        <div className="xl:col-span-2 rounded-2xl border border-stone-200 bg-white p-4 sm:p-6 shadow-xs min-w-0">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-stone-900">
                Últimos accesos en portería
              </h2>
              <p className="text-xs text-stone-500">
                Ingresos verificados hoy en recepción
              </p>
            </div>
          </div>

          {/* Wrapper responsivo de la tabla asegurado con max-w-full */}
          <div className="max-w-full overflow-x-auto rounded-xl border border-stone-200">
            <table className="w-full text-left text-sm min-w-max">
              <thead className="bg-stone-50 text-stone-600 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-4 py-3 whitespace-nowrap">Socio</th>
                  <th className="px-4 py-3 whitespace-nowrap">DNI</th>
                  <th className="px-4 py-3 whitespace-nowrap">Hora</th>
                  <th className="px-4 py-3 whitespace-nowrap">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {recentEntries.map((entry) => (
                  <tr
                    key={entry.dni}
                    className="hover:bg-stone-50/70 transition"
                  >
                    <td className="px-4 py-3 font-medium text-stone-900 whitespace-nowrap">
                      {entry.nombre}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-stone-600 whitespace-nowrap">
                      {entry.dni}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-stone-600 whitespace-nowrap">
                      {entry.ingreso} hs
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          entry.estado === "Activo"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {entry.estado === "Activo" ? (
                          <UserCheck className="h-3 w-3" />
                        ) : (
                          <Clock className="h-3 w-3" />
                        )}
                        {entry.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* COLUMNA DERECHA: Agregamos min-w-0 aquí también */}
        <div className="space-y-6 min-w-0">
          
          {/* TARJETA 2: PLANES */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-6 shadow-xs">
            <h2 className="text-base font-bold text-stone-900 mb-4">
              Planes más elegidos
            </h2>
            <div className="space-y-4">
              {plansSummary.map((plan) => (
                <div key={plan.nombre} className="space-y-1.5 w-full">
                  <div className="flex items-center justify-between text-xs font-medium gap-2">
                    <span className="text-stone-700 truncate">{plan.nombre}</span>
                    <span className="font-mono text-stone-500 shrink-0">
                      {plan.total} socios ({plan.porcentaje}%)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-amber-500"
                      style={{ width: `${plan.porcentaje}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TARJETA 3: ESTADO DEL PADRÓN */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-6 shadow-xs">
            <h2 className="text-base font-bold text-stone-900 mb-4">
              Estado del padrón
            </h2>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 gap-2">
                <span className="text-xs font-semibold text-emerald-800">
                  Socios Activos
                </span>
                <span className="text-base font-bold font-mono text-emerald-800 shrink-0">
                  {sociosActivos}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/70 border border-amber-100 gap-2">
                <span className="text-xs font-semibold text-amber-800 truncate">
                  Suspendidos
                </span>
                <span className="text-base font-bold font-mono text-amber-800 shrink-0">
                  {socios.filter((s) => s.estado === "Suspendido").length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-rose-50/70 border border-rose-100 gap-2">
                <span className="text-xs font-semibold text-rose-800 truncate">
                  Inactivos / Vencidos
                </span>
                <span className="text-base font-bold font-mono text-rose-800 shrink-0">
                  {socios.filter((s) => s.estado === "Inactivo").length}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}