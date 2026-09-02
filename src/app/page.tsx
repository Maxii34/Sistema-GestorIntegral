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
    <main className="relative overflow-hidden bg-transparent">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative">
            <span className="inline-flex items-center rounded-full border border-amber-400/40 bg-amber-100/70 px-3 py-1 text-[10px] font-black uppercase tracking-[0.32em] text-amber-800 shadow-sm backdrop-blur-sm">
              FORCE GYM
            </span>
            <h1 className="mt-6 max-w-xl text-4xl font-black uppercase tracking-[-0.06em] text-zinc-900 sm:text-5xl lg:text-6xl">
              Potenciá tu <span className="text-amber-600">gimnasio</span> con gestión premium.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-stone-700">
              Controlá socios, ingresos, vencimientos y accesos desde una experiencia moderna pensada para equipos de fitness y alto rendimiento.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/registro" className="rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-stone-950 shadow-[0_14px_30px_rgba(217,164,65,0.35)] transition hover:brightness-110">
                Registrar administrador
              </Link>
              <Link href="/dashboard" className="rounded-full border border-stone-300 bg-white/80 px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-stone-800 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm transition hover:border-stone-400 hover:text-stone-950">
                Ver dashboard
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Tasa de retención", value: "94%" },
                { label: "Renovaciones", value: "320" },
                { label: "Nuevos socios", value: "+48" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-stone-200 bg-white/75 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur-sm">
                  <p className="text-2xl font-black text-zinc-900">{item.value}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-[#171614] p-6 text-white shadow-[0_25px_60px_rgba(17,17,17,0.22)]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-300">Resumen</span>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-300">
                Online
              </span>
            </div>

            <div className="mt-8 space-y-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-stone-800 bg-[#201d1a] p-4 shadow-inner shadow-black/20">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-stone-300">{stat.label}</span>
                    <span className="text-xl font-black text-amber-400">{stat.value}</span>
                  </div>
                  <p className="mt-2 text-xs text-stone-400">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-600">Planes</p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-zinc-900">Membresías disponibles</h2>
          </div>
          <Link href="/socios" className="text-sm font-black uppercase tracking-[0.16em] text-amber-700 transition hover:text-amber-800">
            Ver socios
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {planes.map((plan) => (
            <div key={plan.nombre} className="group rounded-[1.75rem] border border-stone-200 bg-white/85 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(15,23,42,0.1)]">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-stone-500">{plan.nombre}</p>
                <span className="rounded-full bg-amber-100 px-2 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-amber-700">Popular</span>
              </div>
              <p className="mt-6 text-3xl font-black text-zinc-900">{plan.precio}</p>
              <p className="mt-3 text-sm leading-6 text-stone-600">{plan.detalle}</p>
              <button className="mt-6 w-full rounded-full bg-[#171614] px-4 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-stone-800">
                Ver detalle
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
