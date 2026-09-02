import { Search, Filter, Plus, User, IdCard, Phone, CreditCard, DollarSign, Calendar, UserCheck, AlertCircle, RefreshCw, Trash2, X } from "lucide-react";

export type Socio = {
  nombre: string;
  dni: string;
  telefono: string;
  plan: string;
  estado: "Activo" | "Suspendido" | "Inactivo";
  vencimiento: string;
};

type DashboardSociosProps = {
  socios: Socio[];
  sociosActivos: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  form: {
    nombre: string;
    apellido: string;
    dni: string;
    telefono: string;
    pagoMensual: number;
    plan: string;
    estado: "Activo" | "Suspendido" | "Inactivo";
  };
  onFormChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onFormReset: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onDeleteSocio: (dni: string) => void;
  onOpenRenovar: (socio: Socio) => void;
  renovacionForm: {
    pagoMensual: number;
    tipoMembresia: string;
  };
  onRenovacionFormChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  renovarModal: { open: boolean; socio: Socio | null };
  onCloseRenovarModal: () => void;
  onRenovarSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function DashboardSocios({
  socios,
  sociosActivos,
  searchTerm,
  onSearchChange,
  form,
  onFormChange,
  onFormReset,
  onSubmit,
  onDeleteSocio,
  onOpenRenovar,
  renovacionForm,
  onRenovacionFormChange,
  renovarModal,
  onCloseRenovarModal,
  onRenovarSubmit,
}: DashboardSociosProps) {
  const filteredSocios = socios.filter(
    (socio) =>
      socio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || socio.dni.includes(searchTerm),
  );

  return (
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

        <form onSubmit={onSubmit} className="p-6 space-y-6">
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
                    onChange={onFormChange}
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
                    onChange={onFormChange}
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
                    onChange={(e) => {
                      const next = e.target.value.replace(/\D/g, "");
                      onFormChange({
                        target: { name: "dni", value: next },
                      } as React.ChangeEvent<HTMLInputElement>);
                    }}
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
                    onChange={onFormChange}
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
                    onChange={onFormChange}
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
                    onChange={onFormChange}
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
              onClick={onFormReset}
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

      <div className="rounded-2xl border border-stone-200 bg-white shadow-xs overflow-hidden">
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between border-b border-stone-200 bg-stone-50/40">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
            <input
              type="text"
              placeholder="Buscar por socio, apellido o DNI..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
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
                const initials = socio.nombre
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

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
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          socio.estado === "Activo"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : socio.estado === "Suspendido"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
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
                          onClick={() => onOpenRenovar(socio)}
                          title="Renovar membresía (/api/renovar)"
                          className="inline-flex items-center gap-1 rounded-lg border border-amber-200 bg-amber-50/70 px-2.5 py-1.5 text-xs font-bold text-amber-800 hover:bg-amber-100 transition"
                        >
                          <RefreshCw className="h-3 w-3" />
                          <span>Renovar</span>
                        </button>
                        <button
                          title="Eliminar socio"
                          onClick={() => onDeleteSocio(socio.dni)}
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

      {renovarModal.open && renovarModal.socio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-stone-900">Renovar Membresía</h3>
                <p className="text-xs text-stone-500">Endpoint: POST /api/renovar</p>
              </div>
              <button
                onClick={onCloseRenovarModal}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={onRenovarSubmit} className="mt-4 space-y-4">
              <div className="rounded-xl bg-stone-50 p-3 border border-stone-100">
                <span className="text-xs text-stone-500 block">Socio</span>
                <span className="text-sm font-bold text-stone-900">{renovarModal.socio.nombre}</span>
                <span className="text-xs font-mono text-stone-600 block mt-0.5">DNI: {renovarModal.socio.dni}</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Membresía / Período</label>
                <select
                  value={renovacionForm.tipoMembresia}
                  onChange={onRenovacionFormChange}
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
                  onChange={onRenovacionFormChange}
                  className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm font-mono text-stone-900 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={onCloseRenovarModal}
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
}
