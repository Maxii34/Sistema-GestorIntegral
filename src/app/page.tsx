import Link from "next/link";

const stats = [
  { label: "Socios activos", value: "1.248", detail: "+8% vs. mes anterior" },
  { label: "Ingresos del mes", value: "$185.400", detail: "Renovaciones y membresías" },
  { label: "Ingresos hoy", value: "42", detail: "Llegadas registradas" },
  { label: "Membresías vencidas", value: "19", detail: "Requieren seguimiento" },
];

const planes = [
  { nombre: "Mensual", precio: "$14.000", detalle: "Acceso total + clases" },
  { nombre: "Trimestral", precio: "$38.000", detalle: "Descuento del 10%" },
  { nombre: "Semestral", precio: "$70.000", detalle: "Ahorro del 15%" },
  { nombre: "Anual", precio: "$120.000", detalle: "Incluye evaluaciones" },
];

export default function Home() {
  return (
    <main className="bg-zinc-100">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-amber-700">
              FORCE GYM
            </span>
            <h1 className="mt-6 text-4xl font-black uppercase tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
              Potenciá tu <span className="text-amber-600">gimnasio</span> con gestión real.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-zinc-600">
              Control de socios, ingresos, vencimientos y accesos desde un panel pensado para equipos de fitness y entrenamiento.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/registro"
                className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-black uppercase tracking-wide text-zinc-950 transition hover:bg-amber-400"
              >
                Registrar administrador
              </Link>
              <Link
                href="/dashboard"
                className="rounded-xl border border-zinc-300 bg-white px-6 py-3 text-sm font-black uppercase tracking-wide text-zinc-800 transition hover:border-zinc-400 hover:text-zinc-950"
              >
                Ver dashboard
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Tasa de retención", value: "94%" },
                { label: "Renovaciones", value: "320" },
                { label: "Nuevos socios", value: "+48" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                  <p className="text-2xl font-black text-zinc-900">{item.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-zinc-950 p-6 text-white shadow-2xl shadow-zinc-300/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">Resumen</span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-300">
                Online
              </span>
            </div>

            <div className="mt-8 space-y-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-zinc-400">{stat.label}</span>
                    <span className="text-xl font-black text-amber-400">{stat.value}</span>
                  </div>
                  <p className="mt-2 text-xs text-zinc-500">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">Planes</p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-zinc-900">Membresías disponibles</h2>
          </div>
          <Link href="/socios" className="text-sm font-bold uppercase tracking-wide text-amber-600 hover:text-amber-700">
            Ver socios
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {planes.map((plan) => (
            <div key={plan.nombre} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">{plan.nombre}</p>
              <p className="mt-6 text-3xl font-black text-zinc-900">{plan.precio}</p>
              <p className="mt-3 text-sm text-zinc-600">{plan.detalle}</p>
              <button className="mt-6 w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-zinc-800">
                Ver detalle
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
