"use client";

import { useMemo, useState } from "react";

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

const initialSocios = [
  { nombre: "Carlos Ruiz", dni: "40123456", telefono: "381-1234567", plan: "Mensual", estado: "Activo", vencimiento: "12/09/2026" },
  { nombre: "María López", dni: "35222333", telefono: "381-4567890", plan: "Trimestral", estado: "Activo", vencimiento: "28/09/2026" },
  { nombre: "Sofía Torres", dni: "30887654", telefono: "381-7654321", plan: "Semestral", estado: "Suspendido", vencimiento: "04/09/2026" },
  { nombre: "Diego Salas", dni: "29876543", telefono: "381-9876543", plan: "Anual", estado: "Inactivo", vencimiento: "14/08/2026" },
];

const menuItems = [
  { key: "resumen", label: "Resumen" },
  { key: "socios", label: "Socios" },
  { key: "ingresos", label: "Ingresos" },
  { key: "membresias", label: "Membresías" },
  { key: "configuracion", label: "Configuración" },
];

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("socios");
  const [socios, setSocios] = useState(initialSocios);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    plan: "Mensual",
    estado: "Activo",
  });

  const sociosActivos = useMemo(
    () => socios.filter((socio) => socio.estado === "Activo").length,
    [socios],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.nombre || !form.apellido || !form.dni || !form.telefono) {
      return;
    }

    const nuevoSocio = {
      nombre: `${form.nombre} ${form.apellido}`,
      dni: form.dni,
      telefono: form.telefono,
      plan: form.plan,
      estado: form.estado,
      vencimiento: "30/09/2026",
    };

    setSocios((prev) => [nuevoSocio, ...prev]);
    setForm({ nombre: "", apellido: "", dni: "", telefono: "", plan: "Mensual", estado: "Activo" });
    setActiveSection("socios");
  };

  const renderResumen = () => (
    <>
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
          <div key={card.label} className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">{card.label}</span>
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
                    <div className="h-full rounded-full bg-amber-500" style={{ width: `${(plan.total / 540) * 100}%` }} />
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
                <span className="text-lg font-black text-emerald-700">{sociosActivos}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-amber-50 p-3">
                <span className="text-sm font-semibold text-amber-700">Suspendidos</span>
                <span className="text-lg font-black text-amber-700">{socios.filter((s) => s.estado === "Suspendido").length}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-rose-50 p-3">
                <span className="text-sm font-semibold text-rose-700">Inactivos</span>
                <span className="text-lg font-black text-rose-700">{socios.filter((s) => s.estado === "Inactivo").length}</span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </>
  );

  const renderSocios = () => (
    <>
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">Socios</p>
          <h1 className="mt-2 text-3xl font-black uppercase tracking-tight text-zinc-900 sm:text-4xl">
            Gestión de miembros
          </h1>
        </div>
        <span className="inline-flex items-center rounded-full bg-zinc-900 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
          {socios.length} registrados
        </span>
      </div>

      <section className="mb-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-black uppercase tracking-wide text-zinc-900">Agregar socio</h2>
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-amber-700">
            Nuevo ingreso
          </span>
        </div>

        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Nombre</span>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-amber-400 focus:bg-white"
              placeholder="Ej: Carlos"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Apellido</span>
            <input
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-amber-400 focus:bg-white"
              placeholder="Ej: Ruiz"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">DNI</span>
            <input
              name="dni"
              value={form.dni}
              onChange={handleChange}
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-amber-400 focus:bg-white"
              placeholder="40123456"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Teléfono</span>
            <input
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-amber-400 focus:bg-white"
              placeholder="381-1234567"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Plan</span>
            <select
              name="plan"
              value={form.plan}
              onChange={handleChange}
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-amber-400 focus:bg-white"
            >
              <option>Mensual</option>
              <option>Trimestral</option>
              <option>Semestral</option>
              <option>Anual</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Estado</span>
            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-amber-400 focus:bg-white"
            >
              <option>Activo</option>
              <option>Suspendido</option>
              <option>Inactivo</option>
            </select>
          </label>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-black uppercase tracking-wide text-zinc-950 transition hover:bg-amber-400"
            >
              Guardar socio
            </button>
          </div>
        </form>
      </section>

      <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
          <h2 className="text-lg font-black uppercase tracking-wide text-zinc-900">Listado de socios</h2>
          <button className="text-xs font-bold uppercase tracking-wide text-amber-600">Filtrar</button>
        </div>

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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );

  const renderIngresos = () => (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-black uppercase tracking-wide text-zinc-900">Ingresos</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { label: "Total mes", value: "$185.400" },
          { label: "Renovaciones", value: "132" },
          { label: "Promedio diario", value: "$6.180" },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl bg-zinc-100 p-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">{item.label}</p>
            <p className="mt-3 text-2xl font-black text-zinc-900">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );

  const renderMembresias = () => (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-black uppercase tracking-wide text-zinc-900">Membresías</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plansSummary.map((plan) => (
          <div key={plan.nombre} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">{plan.nombre}</p>
            <p className="mt-4 text-2xl font-black text-zinc-900">{plan.total}</p>
            <p className="mt-2 text-sm text-zinc-600">Socios registrados</p>
          </div>
        ))}
      </div>
    </section>
  );

  const renderConfiguracion = () => (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-black uppercase tracking-wide text-zinc-900">Configuración</h2>
      <div className="mt-6 space-y-4 text-sm text-zinc-600">
        <div className="rounded-2xl border border-zinc-200 p-4">
          <p className="font-bold uppercase tracking-wide text-zinc-800">Accesos</p>
          <p className="mt-2">Control de usuarios, permisos y roles del panel.</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 p-4">
          <p className="font-bold uppercase tracking-wide text-zinc-800">Notificaciones</p>
          <p className="mt-2">Alertas de vencimientos y nuevos ingresos.</p>
        </div>
      </div>
    </section>
  );

  return (
    <main className="min-h-[calc(100vh-130px)] bg-zinc-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-zinc-200 bg-zinc-950 p-5 text-white shadow-sm">
            <div className="mb-8">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-400">Force Gym</p>
              <h2 className="mt-2 text-xl font-black uppercase tracking-tight">Administración</h2>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveSection(item.key)}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-bold uppercase tracking-wide transition ${
                    activeSection === item.key
                      ? "bg-amber-500 text-zinc-950"
                      : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs">→</span>
                </button>
              ))}
            </nav>

            <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Estado</p>
              <p className="mt-2 text-lg font-black text-emerald-400">Sistema activo</p>
            </div>
          </aside>

          <div className="space-y-6">
            {activeSection === "resumen" && renderResumen()}
            {activeSection === "socios" && renderSocios()}
            {activeSection === "ingresos" && renderIngresos()}
            {activeSection === "membresias" && renderMembresias()}
            {activeSection === "configuracion" && renderConfiguracion()}
          </div>
        </div>
      </div>
    </main>
  );
}
