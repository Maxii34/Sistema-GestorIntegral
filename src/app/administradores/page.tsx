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
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-zinc-500">
                    La API no expone aún un listado de administradores.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
