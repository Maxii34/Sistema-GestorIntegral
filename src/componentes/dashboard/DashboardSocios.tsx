"use client";

import {
  Search,
  Filter,
  Plus,
  User,
  IdCard,
  Phone,
  CreditCard,
  Calendar,
  UserCheck,
  AlertCircle,
  RefreshCw,
  Trash2,
} from "lucide-react";

import RenovarSocioModal from "@/componentes/dashboard/modals/RenovarSocioModal";

export type Membresia = {
  _id: string;
  nombre: string;
  precio: number;
  duracionDias: number;
  activa: boolean;
};

export type Socio = {
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  membresia: string;
  membresiaId?: string;
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
    membresia: string;
  };

  onFormChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;

  onFormReset: () => void;

  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;

  onDeleteSocio: (dni: string) => void;

  onOpenRenovar: (socio: Socio) => void;

  renovacionForm: {
    membresia: string;
  };

  membresias: Membresia[];

  onRenovacionFormChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;

  renovarModal: {
    open: boolean;
    socio: Socio | null;
  };

  onCloseRenovarModal: () => void;

  onRenovarSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function DashboardSocios({
  socios,
  sociosActivos,
  searchTerm,
  onSearchChange,
  membresias,
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
  const sociosFiltrados = socios.filter((socio) => {
    const termino = searchTerm.toLowerCase().trim();

    return (
      socio.nombre.toLowerCase().includes(termino) ||
      socio.apellido.toLowerCase().includes(termino) ||
      socio.dni.toLowerCase().includes(termino)
    );
  });

  const membresiaSeleccionada = membresias.find(
    (membresia) => membresia._id === form.membresia,
  );

  const formatearPrecio = (precio: number) => {
    return `$${precio.toLocaleString("es-AR")}`;
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Padrón de Socios</h1>

          <p className="mt-1 text-sm text-stone-500">
            Gestión de socios y membresías del gimnasio.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 shadow-xs">
          <UserCheck className="h-5 w-5 text-green-600" />

          <div>
            <p className="text-xs text-stone-500">Socios activos</p>

            <p className="text-lg font-bold text-stone-900">{sociosActivos}</p>
          </div>
        </div>
      </div>

      {/* BUSCADOR */}
      <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Buscar por nombre, apellido o DNI..."
              className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pl-10 pr-4 text-sm text-stone-900 outline-none transition focus:border-green-500 focus:bg-white"
            />
          </div>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-5 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
          >
            <Filter className="h-4 w-4" />
            Filtrar
          </button>
        </div>
      </div>

      {/* FORMULARIO */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
            <Plus className="h-5 w-5 text-green-600" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-stone-900">
              Registrar Nuevo Socio
            </h2>

            <p className="text-sm text-stone-500">
              Completa los datos del nuevo socio.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* DATOS PERSONALES */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <User className="h-4 w-4 text-green-600" />

              <h3 className="text-sm font-semibold text-stone-900">
                Datos personales
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* NOMBRE */}
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Nombre
                </label>

                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={onFormChange}
                  placeholder="Nombre"
                  required
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-green-500 focus:bg-white"
                />
              </div>

              {/* APELLIDO */}
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Apellido
                </label>

                <input
                  type="text"
                  name="apellido"
                  value={form.apellido}
                  onChange={onFormChange}
                  placeholder="Apellido"
                  required
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-green-500 focus:bg-white"
                />
              </div>

              {/* DNI */}
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  DNI
                </label>

                <div className="relative">
                  <IdCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />

                  <input
                    type="text"
                    name="dni"
                    value={form.dni}
                    onChange={onFormChange}
                    placeholder="Ej: 40123456"
                    required
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pl-10 pr-4 text-sm text-stone-900 outline-none transition focus:border-green-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* TELEFONO */}
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Teléfono
                </label>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />

                  <input
                    type="tel"
                    name="telefono"
                    value={form.telefono}
                    onChange={onFormChange}
                    placeholder="Ej: 3815123456"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pl-10 pr-4 text-sm text-stone-900 outline-none transition focus:border-green-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* MEMBRESÍA */}
          <div className="border-t border-stone-200 pt-6">
            <div className="mb-4 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-green-400" />

              <h3 className="text-sm font-semibold text-stone-900">Membresía</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* SELECT MEMBRESIA */}
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Seleccionar membresía
                </label>

                <select
                  name="membresia"
                  value={form.membresia}
                  onChange={onFormChange}
                  required
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-green-500 focus:bg-white"
                >
                  <option value="">Seleccionar membresía</option>

                  {membresias
                    .filter((membresia) => membresia.activa)
                    .map((membresia) => (
                      <option key={membresia._id} value={membresia._id}>
                        {membresia.nombre} — {formatearPrecio(membresia.precio)}{" "}
                        — {membresia.duracionDias} días
                      </option>
                    ))}
                </select>

                {membresias.length === 0 && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-yellow-400">
                    <AlertCircle className="h-4 w-4" />

                    <span>No hay membresías disponibles.</span>
                  </div>
                )}
              </div>

              {/* INFORMACION DE MEMBRESIA */}
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                {membresiaSeleccionada ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-stone-500">Membresía</span>

                      <span className="text-sm font-medium text-stone-900">
                        {membresiaSeleccionada.nombre}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-stone-500">Precio</span>

                      <span className="text-sm font-semibold text-green-400">
                        {formatearPrecio(membresiaSeleccionada.precio)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-stone-500">Duración</span>

                      <span className="text-sm text-stone-900">
                        {membresiaSeleccionada.duracionDias} días
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full items-center gap-3 text-sm text-stone-500">
                    <CreditCard className="h-5 w-5" />

                    <span>Selecciona una membresía para ver sus detalles.</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-xl border border-blue-500/10 bg-blue-500/5 p-3">
              <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />

              <p className="text-xs leading-relaxed text-stone-500">
                La fecha de inicio y vencimiento se calcularán automáticamente
                según la duración de la membresía seleccionada.
              </p>
            </div>
          </div>

          {/* BOTONES */}
          <div className="flex flex-col-reverse gap-3 border-t border-stone-200 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onFormReset}
              className="rounded-xl border border-stone-200 bg-stone-50 px-5 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
            >
              Limpiar
            </button>

            <button
              type="submit"
              disabled={membresias.length === 0}
              className="flex items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
              Registrar Socio
            </button>
          </div>
        </form>
      </div>

      {/* TABLA DE SOCIOS */}
      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs">
        <div className="border-b border-stone-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-stone-900">
            Socios registrados
          </h2>

          <p className="mt-1 text-sm text-stone-500">
            Listado de socios del gimnasio.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-225">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Socio
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                  DNI
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Membresía
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Estado
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Vencimiento
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
              {sociosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <User className="mb-3 h-10 w-10 text-stone-300" />

                      <p className="text-sm font-medium text-stone-500">
                        No se encontraron socios
                      </p>

                      <p className="mt-1 text-xs text-stone-400">
                        Intenta modificar la búsqueda.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                sociosFiltrados.map((socio) => (
                  <tr
                    key={socio.dni}
                    className="border-b border-stone-100 transition hover:bg-stone-50"
                  >
                    {/* SOCIO */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500/10">
                          <User className="h-4 w-4 text-green-400" />
                        </div>

                        <div>
                          <p className="text-sm font-medium text-stone-900">
                            {socio.nombre} {socio.apellido}
                          </p>

                          {socio.telefono && (
                            <p className="text-xs text-stone-500">
                              {socio.telefono}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* DNI */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-stone-700">{socio.dni}</span>
                    </td>

                    {/* MEMBRESIA */}
                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400">
                        {socio.membresia}
                      </span>
                    </td>

                    {/* ESTADO */}
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                          socio.estado === "Activo"
                            ? "bg-green-500/10 text-green-400"
                            : socio.estado === "Suspendido"
                              ? "bg-yellow-500/10 text-yellow-400"
                              : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {socio.estado}
                      </span>
                    </td>

                    {/* VENCIMIENTO */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-stone-700">
                        <Calendar className="h-4 w-4 text-stone-400" />

                        {socio.vencimiento}
                      </div>
                    </td>

                    {/* ACCIONES */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onOpenRenovar(socio)}
                          title="Renovar membresía"
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition hover:bg-blue-500/20"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onDeleteSocio(socio.dni)}
                          title="Eliminar socio"
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-400 transition hover:bg-red-500/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL RENOVAR */}
      {renovarModal.open && renovarModal.socio && (
        <RenovarSocioModal
          socio={renovarModal.socio}
          form={renovacionForm}
          membresias={membresias}
          onChange={onRenovacionFormChange}
          onClose={onCloseRenovarModal}
          onSubmit={onRenovarSubmit}
        />
      )}
    </div>
  );
}
