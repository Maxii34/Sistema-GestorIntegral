const admins = [
  { nombre: "Ana Gómez", email: "ana@forcegym.com", rol: "Superadmin", estado: "Activo" },
  { nombre: "Luciano Vega", email: "luciano@forcegym.com", rol: "Admin", estado: "Activo" },
  { nombre: "Marina Costa", email: "marina@forcegym.com", rol: "Moderador", estado: "Activo" },
  { nombre: "Federico Ruiz", email: "federico@forcegym.com", rol: "Admin", estado: "Suspendido" },
];

export default function AdministradoresPage() {
  return (
    <main className="min-h-[calc(100vh-130px)] bg-zinc-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">Administración</p>
            <h1 className="mt-2 text-3xl font-black uppercase tracking-tight text-zinc-900 sm:text-4xl">
              Panel de administradores
            </h1>
          </div>
          <button className="rounded-xl bg-amber-500 px-5 py-3 text-sm font-black uppercase tracking-wide text-zinc-950 transition hover:bg-amber-400">
            Crear admin
          </button>
        </div>

        <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-zinc-100 text-zinc-600">
                <tr>
                  <th className="px-4 py-3 font-bold uppercase tracking-wide">Nombre</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wide">Email</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wide">Rol</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wide">Estado</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wide">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.email} className="border-t border-zinc-200 bg-white">
                    <td className="px-4 py-3 font-semibold text-zinc-800">{admin.nombre}</td>
                    <td className="px-4 py-3 text-zinc-600">{admin.email}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-zinc-700">
                        {admin.rol}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${
                          admin.estado === "Activo"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {admin.estado}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="rounded-lg bg-zinc-100 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-zinc-700 hover:bg-zinc-200">
                          Editar
                        </button>
                        <button className="rounded-lg bg-rose-50 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-rose-700 hover:bg-rose-100">
                          Borrar
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
