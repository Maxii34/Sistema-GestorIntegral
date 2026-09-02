const socios = [
  { nombre: "Carlos Ruiz", dni: "40123456", telefono: "381-1234567", plan: "Mensual", estado: "Activo", vencimiento: "12/09/2026" },
  { nombre: "María López", dni: "35222333", telefono: "381-4567890", plan: "Trimestral", estado: "Activo", vencimiento: "28/09/2026" },
  { nombre: "Sofía Torres", dni: "30887654", telefono: "381-7654321", plan: "Semestral", estado: "Suspendido", vencimiento: "04/09/2026" },
  { nombre: "Diego Salas", dni: "29876543", telefono: "381-9876543", plan: "Anual", estado: "Inactivo", vencimiento: "14/08/2026" },
];

const estados = ["Todos", "Activo", "Suspendido", "Inactivo"];

export default function SociosPage() {
  return (
    <main className="min-h-[calc(100vh-130px)] bg-zinc-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">Socios</p>
            <h1 className="mt-2 text-3xl font-black uppercase tracking-tight text-zinc-900 sm:text-4xl">
              Gestión de miembros
            </h1>
          </div>
          <button className="rounded-xl bg-amber-500 px-5 py-3 text-sm font-black uppercase tracking-wide text-zinc-950 transition hover:bg-amber-400">
            Nuevo socio
          </button>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          {estados.map((estado) => (
            <button
              key={estado}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition ${
                estado === "Todos"
                  ? "bg-zinc-900 text-white"
                  : "bg-white text-zinc-700 ring-1 ring-zinc-200 hover:bg-zinc-50"
              }`}
            >
              {estado}
            </button>
          ))}
        </div>

        <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-zinc-100 text-zinc-600">
                <tr>
                  <th className="px-4 py-3 font-bold uppercase tracking-wide">Socio</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wide">DNI</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wide">Teléfono</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wide">Plan</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wide">Estado</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wide">Vence</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wide">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {socios.map((socio) => (
                  <tr key={socio.dni} className="border-t border-zinc-200 bg-white">
                    <td className="px-4 py-3 font-semibold text-zinc-800">{socio.nombre}</td>
                    <td className="px-4 py-3 text-zinc-600">{socio.dni}</td>
                    <td className="px-4 py-3 text-zinc-600">{socio.telefono}</td>
                    <td className="px-4 py-3 text-zinc-600">{socio.plan}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${
                          socio.estado === "Activo"
                            ? "bg-emerald-100 text-emerald-700"
                            : socio.estado === "Suspendido"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {socio.estado}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-600">{socio.vencimiento}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="rounded-lg bg-zinc-100 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-zinc-700 hover:bg-zinc-200">
                          Editar
                        </button>
                        <button className="rounded-lg bg-rose-50 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-rose-700 hover:bg-rose-100">
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
