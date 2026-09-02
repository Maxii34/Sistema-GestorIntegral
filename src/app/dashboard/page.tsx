const cards = [
  { label: "Socios activos", value: "1.248", tone: "amber" },
  { label: "Ingresos del mes", value: "$185.400", tone: "emerald" },
  { label: "Membresías vencidas", value: "19", tone: "rose" },
  { label: "Ingresos hoy", value: "42", tone: "sky" },
];

const recentEntries = [
  { nombre: "Ana Ponce", dni: "40123456", ingreso: "08:45", estado: "Activo" },
  { nombre: "Tomás Ruiz", dni: "37654892", ingreso: "09:10", estado: "Activo" },
  { nombre: "Lucía Méndez", dni: "25258444", ingreso: "09:28", estado: "Pendiente" },
  { nombre: "Sergio Díaz", dni: "41333456", ingreso: "10:03", estado: "Activo" },
];

const plansSummary = [
  { nombre: "Mensual", total: 540 },
  { nombre: "Trimestral", total: 310 },
  { nombre: "Semestral", total: 210 },
  { nombre: "Anual", total: 188 },
];

export default function DashboardPage() {
  return (
    <main className="min-h-[calc(100vh-130px)] bg-zinc-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">Panel</p>
            <h1 className="mt-2 text-3xl font-black uppercase tracking-tight text-zinc-900 sm:text-4xl">
              Dashboard general
            </h1>
          </div>
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700">
            Actualizado hace 5 min
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.label}
              className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                  {card.label}
                </span>
                <span
                  className={`h-3 w-3 rounded-full ${
                    card.tone === "amber"
                      ? "bg-amber-500"
                      : card.tone === "emerald"
                        ? "bg-emerald-500"
                        : card.tone === "rose"
                          ? "bg-rose-500"
                          : "bg-sky-500"
                  }`}
                />
              </div>
              <p className="mt-6 text-3xl font-black text-zinc-900">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-black uppercase tracking-wide text-zinc-900">Últimos ingresos</h2>
              <button className="text-xs font-bold uppercase tracking-wide text-amber-600">Ver historial</button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-zinc-200">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-zinc-100 text-zinc-600">
                  <tr>
                    <th className="px-4 py-3 font-bold uppercase tracking-wide">Socio</th>
                    <th className="px-4 py-3 font-bold uppercase tracking-wide">DNI</th>
                    <th className="px-4 py-3 font-bold uppercase tracking-wide">Ingreso</th>
                    <th className="px-4 py-3 font-bold uppercase tracking-wide">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEntries.map((entry) => (
                    <tr key={entry.dni} className="border-t border-zinc-200 bg-white">
                      <td className="px-4 py-3 font-semibold text-zinc-800">{entry.nombre}</td>
                      <td className="px-4 py-3 text-zinc-600">{entry.dni}</td>
                      <td className="px-4 py-3 text-zinc-600">{entry.ingreso}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${
                            entry.estado === "Activo"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {entry.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-zinc-200 bg-zinc-950 p-6 text-white shadow-sm">
              <h2 className="text-lg font-black uppercase tracking-wide text-white">Distribución por planes</h2>
              <div className="mt-6 space-y-4">
                {plansSummary.map((plan) => (
                  <div key={plan.nombre}>
                    <div className="mb-1 flex items-center justify-between text-sm text-zinc-300">
                      <span>{plan.nombre}</span>
                      <span>{plan.total}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                      <div
                        className="h-full rounded-full bg-amber-500"
                        style={{ width: `${(plan.total / 540) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-black uppercase tracking-wide text-zinc-900">Estado general</h2>
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between rounded-2xl bg-emerald-50 p-3">
                  <span className="text-sm font-semibold text-emerald-700">Activos</span>
                  <span className="text-lg font-black text-emerald-700">1.022</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-amber-50 p-3">
                  <span className="text-sm font-semibold text-amber-700">Suspendidos</span>
                  <span className="text-lg font-black text-amber-700">89</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-rose-50 p-3">
                  <span className="text-sm font-semibold text-rose-700">Inactivos</span>
                  <span className="text-lg font-black text-rose-700">137</span>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
