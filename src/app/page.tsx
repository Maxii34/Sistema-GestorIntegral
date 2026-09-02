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
import { getMembresiasActivas, getResumenDashboard } from "@/lib/api";

export default async function Home() {
  const [resumen, membresias] = await Promise.allSettled([
    getResumenDashboard(),
    getMembresiasActivas(),
  ]);
  const resumenData = resumen.status === "fulfilled" ? resumen.value : {};
  const planesData = membresias.status === "fulfilled" ? membresias.value : [];
  const numero = (...keys: string[]) => {
    for (const key of keys) {
      const value = resumenData[key];
      if (typeof value === "number") return value;
      if (
        typeof value === "string" &&
        value.trim() !== "" &&
        !Number.isNaN(Number(value))
      )
        return Number(value);
    }
    return 0;
  };
  const sociosPorEstado = Array.isArray(resumenData.sociosPorEstado)
    ? resumenData.sociosPorEstado
    : [];
  const activos = sociosPorEstado.find(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      String(item._id).toLowerCase() === "activo",
  );
  const ingresosMes =
    typeof resumenData.ingresosMesActual === "object" &&
    resumenData.ingresosMesActual !== null
      ? (resumenData.ingresosMesActual as Record<string, unknown>)
      : {};
  const moneda = (value: number) => `$${value.toLocaleString("es-AR")}`;
  const stats = [
    {
      label: "Socios activos",
      value: String(
        activos && typeof activos === "object" && "total" in activos
          ? activos.total
          : numero("sociosActivos", "usuariosActivos"),
      ),
      detail: "Datos del Sistema",
      icon: Users,
      color: "text-emerald-400",
    },
    {
      label: "Ingresos del mes",
      value: moneda(
        Number(
          ingresosMes.total ??
            numero("ingresosMes", "totalMes", "recaudacionMes"),
        ),
      ),
      detail: "Datos del Sistema",
      icon: DollarSign,
      color: "text-amber-400",
    },
    {
      label: "Ingresos hoy",
      value: String(numero("ingresosHoy", "ingresosDia", "accesosHoy")),
      detail: "Datos del Sistema",
      icon: LogIn,
      color: "text-blue-400",
    },
    {
      label: "Membresías vencidas",
      value: String(
        numero("membresiasVencidas", "vencidos", "usuariosVencidos"),
      ),
      detail: "Datos del Sistema",
      icon: AlertTriangle,
      color: "text-rose-400",
    },
  ];
  const planes = planesData.map((plan) => ({
    id: String(plan._id ?? plan.id ?? plan.nombre ?? "plan"),
    nombre: String(plan.nombre ?? ""),
    precio: moneda(Number(plan.precio ?? 0)),
    detalle: String(plan.descripcion ?? ""),
    duracionDias: Number(plan.duracionDias ?? plan.duracion ?? 0),
    beneficios: Array.isArray(plan.beneficios)
      ? (plan.beneficios as unknown[]).filter(
          (beneficio: unknown): beneficio is string =>
            typeof beneficio === "string",
        )
      : [],
    activa: plan.activa !== false,
  }));

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
              <span>IronGym </span>
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
                className="inline-flex items-center gap-2.5 rounded-full bg-linear-to-r from-amber-400 via-amber-500 to-amber-500 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-stone-950 shadow-[0_4px_25px_rgba(245,158,11,0.25)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_6px_30px_rgba(245,158,11,0.4)] active:scale-95"
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

            {/* Características destacadas */}
            <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-4 border-t border-stone-800/80 pt-8">
              {[
                {
                  label: "Sistema Intuitivo",
                  desc: "Fácil de usar",
                  icon: CheckCircle2,
                },
                {
                  label: "Escalabilidad",
                  desc: "Crece con tu gym",
                  icon: TrendingUp,
                },
                {
                  label: "Datos Seguros",
                  desc: "Privacidad total",
                  icon: ShieldCheck,
                },
              ].map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex flex-col items-start justify-center rounded-xl border border-stone-800/80 bg-[#1f1c18]/60 p-3.5 backdrop-blur-sm"
                  >
                    <IconComponent className="mb-2 h-5 w-5 text-amber-400" />
                    <p className="text-sm sm:text-base font-bold text-white">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium tracking-wide text-stone-400">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
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
            </div>

            <div className="mt-6 space-y-3.5">
              {stats.map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between rounded-xl border border-stone-800/70 bg-[#24211d]/70 p-4 transition-all duration-800 hover:border-amber-500/60 hover:bg-[#282420]"
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
              <span>Cierre medianoche:</span>
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
            <h2 className="mt-2 text-2xl sm:text-3xl font-black uppercase tracking-tight text-white text-center sm:text-left">
              Membresías Disponibles
            </h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {planes.map((plan) => (
            <div
              key={plan.id}
              className="relative flex flex-col justify-between rounded-2xl border border-stone-800/80 bg-[#1c1a17] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-stone-700"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    {plan.nombre}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${plan.activa ? "text-emerald-400" : "text-stone-500"}`}>
                    {plan.activa ? "Disponible" : "No disponible"}
                  </span>
                </div>
                <p className="mt-5 text-3xl font-black text-white font-mono">
                  {plan.precio}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                  {plan.duracionDias} días
                </p>
                <p className="mt-3 text-sm text-stone-300 leading-relaxed">
                  {plan.detalle}
                </p>
                {plan.beneficios.length > 0 && (
                  <ul className="mt-5 space-y-2 border-t border-stone-800/60 pt-4">
                    {plan.beneficios.map((beneficio, index) => (
                      <li key={`${plan.id}-${index}`} className="flex gap-2 text-xs text-stone-300">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                        <span>{beneficio}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-8 border-t border-stone-800/60 pt-6 text-xs text-stone-500">
                {plan.activa ? "Membresía vigente" : "Membresía pausada"}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
