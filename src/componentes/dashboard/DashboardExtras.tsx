export function DashboardIngresos() {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-6">
      <div>
        <h2 className="text-xl font-bold text-stone-900">Control de Caja e Ingresos</h2>
        <p className="text-sm text-stone-500">Resumen monetario derivado de membresías y renovaciones del mes.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total recaudado mes", value: "$185.400", sub: "30 renovaciones" },
          { label: "Renovaciones cerradas", value: "132", sub: "Membresías renovadas" },
          { label: "Promedio diario estimado", value: "$6.180", sub: "Cálculo en 30 días" },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-stone-200 bg-stone-50/70 p-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">{item.label}</span>
            <p className="mt-2 text-2xl font-bold font-mono text-stone-900">{item.value}</p>
            <p className="mt-1 text-xs text-stone-400">{item.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardMembresias({ plansSummary }: { plansSummary: Array<{ nombre: string; total: number; porcentaje: number }> }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-6">
      <div>
        <h2 className="text-xl font-bold text-stone-900">Planes de Membresías</h2>
        <p className="text-sm text-stone-500">Configuración de planes en el sistema y socios inscritos.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {plansSummary.map((plan) => (
          <div key={plan.nombre} className="rounded-xl border border-stone-200 bg-stone-50/60 p-5 hover:border-amber-400/50 transition">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">{plan.nombre}</span>
            <p className="mt-3 text-3xl font-bold font-mono text-stone-900">{plan.total}</p>
            <p className="mt-1 text-xs text-stone-500">Socios activos en este plan</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardConfiguracion() {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-6">
      <div>
        <h2 className="text-xl font-bold text-stone-900">Configuración del Sistema</h2>
        <p className="text-sm text-stone-500">Parámetros del servidor, roles de usuario y alertas.</p>
      </div>

      <div className="space-y-3">
        <div className="rounded-xl border border-stone-200 p-4 hover:bg-stone-50/50 transition">
          <p className="font-semibold text-stone-900 text-sm">Roles y Permisos</p>
          <p className="mt-1 text-xs text-stone-500">Control de usuarios con acceso admin, superadmin y moderador.</p>
        </div>
        <div className="rounded-xl border border-stone-200 p-4 hover:bg-stone-50/50 transition">
          <p className="font-semibold text-stone-900 text-sm">Rutina Cron Automática</p>
          <p className="mt-1 text-xs text-stone-500">Desactivación automática de socios a la medianoche (00:00 ART).</p>
        </div>
      </div>
    </div>
  );
}
