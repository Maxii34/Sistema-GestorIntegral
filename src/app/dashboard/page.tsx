"use client";

import { useMemo, useState, FormEvent, ChangeEvent } from "react";
import { 
  LayoutDashboard, 
  Users, 
  DoorOpen, 
  CreditCard, 
  Settings, 
  Search, 
  Plus, 
  ArrowUpRight, 
  Calendar, 
  Phone, 
  UserCheck, 
  User,
  IdCard,
  Clock, 
  Filter,
  DollarSign,
  AlertCircle,
  RefreshCw,
  Pencil,
  Trash2,
  X
} from "lucide-react";

// Tipado según los modelos de backend de IronGym
interface Socio {
  nombre: string;
  dni: string;
  telefono: string;
  plan: string;
  estado: "Activo" | "Suspendido" | "Inactivo";
  vencimiento: string;
}

const cards = [
  { label: "Socios activos", value: "1.248", detail: "+8% este mes", icon: Users, tone: "amber" },
  { label: "Ingresos del mes", value: "$185.400", detail: "Renovaciones cerradas", icon: DollarSign, tone: "emerald" },
  { label: "Membresías vencidas", value: "19", detail: "Requieren renovación", icon: AlertCircle, tone: "rose" },
  { label: "Ingresos hoy", value: "42", detail: "Molinete activo", icon: DoorOpen, tone: "sky" },
];

const recentEntries = [
  { nombre: "Ana Ponce", dni: "40123456", ingreso: "08:45", estado: "Activo" },
  { nombre: "Tomás Ruiz", dni: "37654892", ingreso: "09:10", estado: "Activo" },
  { nombre: "Lucía Méndez", dni: "25258444", ingreso: "09:28", estado: "Pendiente" },
  { nombre: "Sergio Díaz", dni: "41333456", ingreso: "10:03", estado: "Activo" },
];

const plansSummary = [
  { nombre: "Mensual", total: 540, porcentaje: 43 },
  { nombre: "Trimestral", total: 310, porcentaje: 25 },
  { nombre: "Semestral", total: 210, porcentaje: 17 },
  { nombre: "Anual", total: 188, porcentaje: 15 },
];

const initialSocios: Socio[] = [
  { nombre: "Carlos Ruiz", dni: "40123456", telefono: "381-1234567", plan: "Mensual", estado: "Activo", vencimiento: "12/09/2026" },
  { nombre: "María López", dni: "35222333", telefono: "381-4567890", plan: "Trimestral", estado: "Activo", vencimiento: "28/09/2026" },
  { nombre: "Sofía Torres", dni: "30887654", telefono: "381-7654321", plan: "Semestral", estado: "Suspendido", vencimiento: "04/09/2026" },
  { nombre: "Diego Salas", dni: "29876543", telefono: "381-9876543", plan: "Anual", estado: "Inactivo", vencimiento: "14/08/2026" },
];

const menuItems = [
  { key: "resumen", label: "Resumen", icon: LayoutDashboard },
  { key: "socios", label: "Socios", icon: Users },
  { key: "ingresos", label: "Ingresos", icon: DoorOpen },
  { key: "membresias", label: "Membresías", icon: CreditCard },
  { key: "configuracion", label: "Configuración", icon: Settings },
];

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("socios");
  const [socios, setSocios] = useState<Socio[]>(initialSocios);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Estado para el formulario de alta (POST /api/usuarios)
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    pagoMensual: 15000,
    plan: "mensual",
    estado: "Activo" as "Activo" | "Suspendido" | "Inactivo",
  });

  // Estado para el modal de renovación (POST /api/renovar)
  const [renovarModal, setRenovarModal] = useState<{ open: boolean; socio: Socio | null }>({
    open: false,
    socio: null,
  });
  const [renovacionForm, setRenovacionForm] = useState({
    pagoMensual: 15000,
    tipoMembresia: "mensual",
  });

  const sociosActivos = useMemo(
    () => socios.filter((s) => s.estado === "Activo").length,
    [socios],
  );

  const filteredSocios = useMemo(() => {
    return socios.filter((s) => 
      s.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.dni.includes(searchTerm)
    );
  }, [socios, searchTerm]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Envío del alta (cumple el schema de POST /api/usuarios)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.nombre || !form.apellido || form.dni.length !== 8 || !form.telefono) return;

    const nuevoSocio: Socio = {
      nombre: `${form.nombre} ${form.apellido}`,
      dni: form.dni,
      telefono: form.telefono,
      plan: form.plan.charAt(0).toUpperCase() + form.plan.slice(1),
      estado: form.estado,
      vencimiento: "30/10/2026", // Simulado del backend
    };

    setSocios((prev) => [nuevoSocio, ...prev]);
    setForm({
      nombre: "",
      apellido: "",
      dni: "",
      telefono: "",
      pagoMensual: 15000,
      plan: "mensual",
      estado: "Activo",
    });
  };

  // Envío de la renovación (POST /api/renovar)
  const handleRenovarSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!renovarModal.socio) return;

    setSocios((prev) =>
      prev.map((s) =>
        s.dni === renovarModal.socio?.dni
          ? {
              ...s,
              plan: renovacionForm.tipoMembresia.charAt(0).toUpperCase() + renovacionForm.tipoMembresia.slice(1),
              estado: "Activo",
              vencimiento: "30/11/2026",
            }
          : s
      )
    );

    setRenovarModal({ open: false, socio: null });
  };

  const handleDeleteSocio = (dni: string) => {
    if (confirm("¿Estás seguro de eliminar este socio del sistema?")) {
      setSocios((prev) => prev.filter((s) => s.dni !== dni));
    }
  };

  // Render: Resumen
  const renderResumen = () => (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900">Resumen Operativo</h1>
          <p className="text-sm text-stone-500">Métricas clave y actividad en tiempo real de IronGym.</p>
        </div>
        <span className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Servicio sincronizado
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">{card.label}</span>
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                  card.tone === "amber" ? "bg-amber-100 text-amber-800" :
                  card.tone === "emerald" ? "bg-emerald-100 text-emerald-800" :
                  card.tone === "rose" ? "bg-rose-100 text-rose-800" :
                  "bg-sky-100 text-sky-800"
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold font-mono text-stone-900">{card.value}</p>
                <p className="mt-1 text-xs text-stone-500">{card.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-stone-900">Últimos accesos en portería</h2>
              <p className="text-xs text-stone-500">Ingresos verificados hoy en recepción</p>
            </div>
            <button 
              onClick={() => setActiveSection("ingresos")}
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-800 transition"
            >
              <span>Ver todos</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="overflow-hidden rounded-xl border border-stone-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-stone-50 text-stone-600 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-4 py-3">Socio</th>
                  <th className="px-4 py-3">DNI</th>
                  <th className="px-4 py-3">Hora</th>
                  <th className="px-4 py-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {recentEntries.map((entry) => (
                  <tr key={entry.dni} className="hover:bg-stone-50/70 transition">
                    <td className="px-4 py-3 font-medium text-stone-900">{entry.nombre}</td>
                    <td className="px-4 py-3 font-mono text-xs text-stone-600">{entry.dni}</td>
                    <td className="px-4 py-3 font-mono text-xs text-stone-600">{entry.ingreso} hs</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        entry.estado === "Activo"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}>
                        {entry.estado === "Activo" ? <UserCheck className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                        {entry.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
            <h2 className="text-base font-bold text-stone-900 mb-4">Planes más elegidos</h2>
            <div className="space-y-4">
              {plansSummary.map((plan) => (
                <div key={plan.nombre} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-stone-700">{plan.nombre}</span>
                    <span className="font-mono text-stone-500">{plan.total} socios ({plan.porcentaje}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                    <div className="h-full rounded-full bg-amber-500" style={{ width: `${plan.porcentaje}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
            <h2 className="text-base font-bold text-stone-900 mb-4">Estado del padrón</h2>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
                <span className="text-xs font-semibold text-emerald-800">Socios Activos</span>
                <span className="text-base font-bold font-mono text-emerald-800">{sociosActivos}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/70 border border-amber-100">
                <span className="text-xs font-semibold text-amber-800">Suspendidos</span>
                <span className="text-base font-bold font-mono text-amber-800">
                  {socios.filter((s) => s.estado === "Suspendido").length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-rose-50/70 border border-rose-100">
                <span className="text-xs font-semibold text-rose-800">Inactivos / Vencidos</span>
                <span className="text-base font-bold font-mono text-rose-800">
                  {socios.filter((s) => s.estado === "Inactivo").length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render: Socios (Formulario estructurado y tabla corporativa)
  const renderSocios = () => (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-stone-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900">Padrón de Socios</h1>
          <p className="text-sm text-stone-500">
            Altas, control de accesos, vigencia y renovaciones directas al backend.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {sociosActivos} Habilitados
          </span>
          <span className="rounded-lg bg-stone-100 px-3 py-1.5 text-xs font-bold text-stone-600">
            {socios.length} Totales
          </span>
        </div>
      </div>

      {/* Formulario Organizado por Bloques */}
      <div className="rounded-2xl border border-stone-200 bg-white shadow-xs overflow-hidden">
        <div className="border-b border-stone-100 bg-stone-50/60 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-700">
                <Plus className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-stone-900">Registrar Nuevo Socio</h2>
                <p className="text-xs text-stone-500">Genera el alta y habilita la entrada en el molinete.</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-stone-400 font-mono">POST /api/usuarios</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-3">
              1. Datos de Identidad y Contacto
            </span>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">Nombre</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                  <input
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Carlos"
                    required
                    className="w-full rounded-xl border border-stone-200 bg-stone-50/40 pl-9 pr-3.5 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:bg-white focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">Apellido</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                  <input
                    name="apellido"
                    value={form.apellido}
                    onChange={handleChange}
                    placeholder="Ruiz"
                    required
                    className="w-full rounded-xl border border-stone-200 bg-stone-50/40 pl-9 pr-3.5 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:bg-white focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">DNI (8 dígitos)</label>
                <div className="relative">
                  <IdCard className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                  <input
                    name="dni"
                    maxLength={8}
                    pattern="\d{8}"
                    value={form.dni}
                    onChange={(e) => setForm(prev => ({ ...prev, dni: e.target.value.replace(/\D/g, "") }))}
                    placeholder="40123456"
                    required
                    className="w-full rounded-xl border border-stone-200 bg-stone-50/40 pl-9 pr-3.5 py-2 text-sm font-mono text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:bg-white focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">Teléfono Celular</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                  <input
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    placeholder="381-1234567"
                    required
                    className="w-full rounded-xl border border-stone-200 bg-stone-50/40 pl-9 pr-3.5 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:bg-white focus:outline-none transition"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-3">
              2. Plan y Cuota Inicial
            </span>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">Tipo de Membresía</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                  <select
                    name="plan"
                    value={form.plan}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50/40 pl-9 pr-3.5 py-2 text-sm text-stone-900 focus:border-amber-500 focus:bg-white focus:outline-none transition cursor-pointer"
                  >
                    <option value="mensual">Mensual (30 días)</option>
                    <option value="trimestral">Trimestral (90 días)</option>
                    <option value="semestral">Semestral (180 días)</option>
                    <option value="anual">Anual (365 días)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">Monto Cobrado ($ ARS)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                  <input
                    type="number"
                    name="pagoMensual"
                    value={form.pagoMensual}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50/40 pl-9 pr-3.5 py-2 text-sm font-mono text-stone-900 focus:border-amber-500 focus:bg-white focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="flex items-center p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-800 leading-relaxed">
                <span>La fecha de inicio y de vencimiento se calculan automáticamente al registrar el socio.</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setForm({ nombre: "", apellido: "", dni: "", telefono: "", pagoMensual: 15000, plan: "mensual", estado: "Activo" })}
              className="px-4 py-2 text-xs font-semibold text-stone-500 hover:text-stone-800 transition"
            >
              Restablecer
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 px-6 py-2.5 text-sm font-bold text-stone-950 transition shadow-xs active:scale-95 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Guardar Socio</span>
            </button>
          </div>
        </form>
      </div>

      {/* Tabla Tabular de Socios */}
      <div className="rounded-2xl border border-stone-200 bg-white shadow-xs overflow-hidden">
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between border-b border-stone-200 bg-stone-50/40">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
            <input
              type="text"
              placeholder="Buscar por socio, apellido o DNI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-stone-300 bg-white pl-9 pr-4 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:outline-none transition"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition">
              <Filter className="h-3.5 w-3.5 text-stone-500" />
              <span>Filtrar</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50 text-[11px] font-bold uppercase tracking-wider text-stone-500">
                <th className="py-3.5 pl-6 pr-4">Socio</th>
                <th className="px-4 py-3.5">Documento (DNI)</th>
                <th className="px-4 py-3.5">Contacto</th>
                <th className="px-4 py-3.5">Plan</th>
                <th className="px-4 py-3.5">Estado</th>
                <th className="px-4 py-3.5">Vencimiento</th>
                <th className="py-3.5 pl-4 pr-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 bg-white">
              {filteredSocios.map((socio) => {
                const initials = socio.nombre.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
                return (
                  <tr key={socio.dni} className="hover:bg-amber-50/20 transition-colors group">
                    <td className="py-4 pl-6 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-xs font-bold text-amber-800 font-mono">
                          {initials}
                        </div>
                        <div>
                          <span className="font-semibold text-stone-900 block leading-tight">{socio.nombre}</span>
                          <span className="text-[11px] text-stone-400">Registrado</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-mono text-xs font-medium text-stone-700">{socio.dni}</td>
                    <td className="px-4 py-4 text-xs text-stone-600">
                      <span className="inline-flex items-center gap-1.5">
                        <Phone className="h-3 w-3 text-stone-400" />
                        {socio.telefono}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-block rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs font-semibold text-stone-800">
                        {socio.plan}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        socio.estado === "Activo"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : socio.estado === "Suspendido"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}>
                        {socio.estado === "Activo" ? <UserCheck className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                        <span>{socio.estado}</span>
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-stone-700">
                        <Calendar className="h-3.5 w-3.5 text-stone-400" />
                        <span>{socio.vencimiento}</span>
                      </div>
                    </td>
                    <td className="py-4 pl-4 pr-6 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button 
                          onClick={() => {
                            setRenovarModal({ open: true, socio });
                            setRenovacionForm({
                              pagoMensual: 15000,
                              tipoMembresia: socio.plan.toLowerCase(),
                            });
                          }}
                          title="Renovar membresía (/api/renovar)"
                          className="inline-flex items-center gap-1 rounded-lg border border-amber-200 bg-amber-50/70 px-2.5 py-1.5 text-xs font-bold text-amber-800 hover:bg-amber-100 transition"
                        >
                          <RefreshCw className="h-3 w-3" />
                          <span>Renovar</span>
                        </button>
                        <button 
                          title="Eliminar socio"
                          onClick={() => handleDeleteSocio(socio.dni)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredSocios.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-sm text-stone-500">
                    No se encontraron socios que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-stone-200 bg-stone-50/60 px-6 py-3 text-xs text-stone-500">
          <span>Mostrando {filteredSocios.length} de {socios.length} socios registrados</span>
          <div className="flex gap-2">
            <button disabled className="rounded-md border border-stone-200 bg-white px-2.5 py-1 font-medium text-stone-400 opacity-50 cursor-not-allowed">
              Anterior
            </button>
            <button disabled className="rounded-md border border-stone-200 bg-white px-2.5 py-1 font-medium text-stone-400 opacity-50 cursor-not-allowed">
              Siguiente
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Renovación de Membresía */}
      {renovarModal.open && renovarModal.socio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-stone-900">Renovar Membresía</h3>
                <p className="text-xs text-stone-500">Endpoint: POST /api/renovar</p>
              </div>
              <button
                onClick={() => setRenovarModal({ open: false, socio: null })}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleRenovarSubmit} className="mt-4 space-y-4">
              <div className="rounded-xl bg-stone-50 p-3 border border-stone-100">
                <span className="text-xs text-stone-500 block">Socio</span>
                <span className="text-sm font-bold text-stone-900">{renovarModal.socio.nombre}</span>
                <span className="text-xs font-mono text-stone-600 block mt-0.5">DNI: {renovarModal.socio.dni}</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Membresía / Período</label>
                <select
                  value={renovacionForm.tipoMembresia}
                  onChange={(e) => setRenovacionForm(prev => ({ ...prev, tipoMembresia: e.target.value }))}
                  className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 focus:border-amber-500 focus:outline-none"
                >
                  <option value="mensual">Mensual (30 días)</option>
                  <option value="trimestral">Trimestral (90 días)</option>
                  <option value="semestral">Semestral (180 días)</option>
                  <option value="anual">Anual (365 días)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Importe Abonado ($ ARS)</label>
                <input
                  type="number"
                  value={renovacionForm.pagoMensual}
                  onChange={(e) => setRenovacionForm(prev => ({ ...prev, pagoMensual: Number(e.target.value) }))}
                  className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm font-mono text-stone-900 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setRenovarModal({ open: false, socio: null })}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-lg transition"
                >
                  Confirmar Renovación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  // Render: Ingresos
  const renderIngresos = () => (
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

  // Render: Membresías
  const renderMembresias = () => (
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

  // Render: Configuración
  const renderConfiguracion = () => (
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

  return (
    <main className="min-h-screen bg-[#f8f9fa] text-stone-800 px-4 py-8 sm:px-6 lg:px-8 antialiased">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          
          {/* Barra lateral de navegación */}
          <aside className="rounded-2xl border border-stone-200/90 bg-white p-4 shadow-xs h-fit">
            <div className="mb-6 px-2">
              <span className="text-xs font-bold tracking-widest text-amber-600 uppercase">IronGym</span>
              <h2 className="text-lg font-bold text-stone-900 leading-tight">Administración</h2>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActiveSection(item.key)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition ${
                      isActive
                        ? "bg-amber-500 text-stone-950 shadow-xs font-bold"
                        : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Vistas Dinámicas */}
          <section className="min-w-0">
            {activeSection === "resumen" && renderResumen()}
            {activeSection === "socios" && renderSocios()}
            {activeSection === "ingresos" && renderIngresos()}
            {activeSection === "membresias" && renderMembresias()}
            {activeSection === "configuracion" && renderConfiguracion()}
          </section>

        </div>
      </div>
    </main>
  );
}