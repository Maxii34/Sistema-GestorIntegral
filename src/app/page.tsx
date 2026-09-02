import Link from "next/link";
import {
  Users,
  DollarSign,
  LogIn,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

const stats = [
  {
    label: "Socios activos",
    value: "1.248",
    detail: "+8% vs. mes anterior",
    icon: Users,
    color: "text-emerald-400",
  },
  {
    label: "Ingresos del mes",
    value: "$185.400",
    detail: "Renovaciones registradas",
    icon: DollarSign,
    color: "text-amber-400",
  },
  {
    label: "Ingresos hoy",
    value: "42",
    detail: "Llegadas al molinete",
    icon: LogIn,
    color: "text-blue-400",
  },
  {
    label: "Membresías vencidas",
    value: "19",
    detail: "Requieren renovación",
    icon: AlertTriangle,
    color: "text-rose-400",
  },
];

const planes = [
  {
    nombre: "Mensual",
    precio: "$14.000",
    detalle: "Acceso total a sala de musculación y cardio.",
  },
  {
    nombre: "Trimestral",
    precio: "$38.000",
    detalle: "Ahorro del 10% + rutina personalizada incluida.",
  },
  {
    nombre: "Semestral",
    precio: "$70.000",
    detalle: "Ahorro del 15% + acceso liberado a todas las clases.",
    popular: true,
  },
  {
    nombre: "Anual",
    precio: "$120.000",
    detalle: "Máximo beneficio + evaluaciones físicas trimestrales.",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#171614] text-stone-100 overflow-hidden">
      {/* Resplandor decorativo de fondo */}
      <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 left-0 h-96 w-96 rounded-full bg-amber-600/5 blur-[140px]" />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Columna Izquierda: Introducción */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>IronGym Management</span>
            </div>

            <h1 className="mt-6 text-4xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
              Potenciá tu <span className="text-amber-400">gimnasio</span> con
              gestión premium.
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-stone-300">
              Controlá socios, ingresos en portería, vencimientos automáticos y
              planes desde una experiencia rápida y moderna.
            </p>

            {/* Acciones principales */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/registro"
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-500 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-stone-950 shadow-[0_4px_25px_rgba(245,158,11,0.25)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_6px_30px_rgba(245,158,11,0.4)] active:scale-95"
              >
                <span>Registrar Administrador</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-stone-700/80 bg-stone-900/60 px-7 py-3.5 text-sm font-semibold tracking-wide text-stone-200 backdrop-blur-sm transition-all duration-200 hover:border-amber-400/50 hover:bg-stone-800 hover:text-amber-300 active:scale-95"
              >
                Ver Dashboard
              </Link>
            </div>

            {/* Micro métricas destacadas */}
            <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-4 border-t border-stone-800/80 pt-8">
              {[
                { label: "Tasa de retención", value: "94%" },
                { label: "Renovaciones mes", value: "320" },
                { label: "Nuevos socios", value: "+48" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-stone-800/80 bg-[#1f1c18]/60 p-3.5 backdrop-blur-sm"
                >
                  <p className="text-xl sm:text-2xl font-black text-white font-mono">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[11px] font-medium tracking-wide text-stone-400">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Tarjeta de Resumen en Vivo */}
          <div className="relative rounded-3xl border border-stone-800/90 bg-[#1c1a17] p-7 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between pb-6 border-b border-stone-800/80">
              <div className="flex items-center gap-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                <span className="text-xs font-bold uppercase tracking-widest text-stone-300">
                  Monitoreo en Tiempo Real
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Sistema Online
              </span>
            </div>

            <div className="mt-6 space-y-3.5">
              {stats.map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between rounded-xl border border-stone-800/70 bg-[#24211d]/70 p-4 transition-all duration-200 hover:border-amber-400/30 hover:bg-[#282420]"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-stone-700/60 bg-stone-900/60 text-stone-300">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-stone-200 block">
                          {stat.label}
                        </span>
                        <span className="text-xs text-stone-400">
                          {stat.detail}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-xl font-bold font-mono ${stat.color}`}
                    >
                      {stat.value}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
              <span>Cierre cron medianoche:</span>
              <span className="font-mono text-stone-300">00:00 ART</span>
            </div>
          </div>
        </div>
      </section>

      {/* Planes Section */}
      <section className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800/80 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Catálogo
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              Membresías Disponibles
            </h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {planes.map((plan) => (
            <div
              key={plan.nombre}
              className={`relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? "border-amber-400/50 bg-[#221e1a] shadow-[0_10px_35px_rgba(245,158,11,0.1)]"
                  : "border-stone-800/80 bg-[#1c1a17] hover:border-stone-700"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    {plan.nombre}
                  </span>
                  {plan.popular && (
                    <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                      Recomendado
                    </span>
                  )}
                </div>
                <p className="mt-5 text-3xl font-black text-white font-mono">
                  {plan.precio}
                </p>
                <p className="mt-3 text-sm text-stone-300 leading-relaxed">
                  {plan.detalle}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-800/60">
                <button className="w-full rounded-xl border border-stone-700/80 bg-stone-900/80 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-200 transition-all duration-200 hover:border-amber-400/60 hover:bg-stone-800 hover:text-amber-300 active:scale-95">
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
