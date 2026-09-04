"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CreditCard, Plus, Check, Clock, Users, X, Pencil } from "lucide-react";
import Swal from "sweetalert2";
import {
  actualizarMembresia,
  crearMembresia,
  eliminarMembresia,
  getMembresias,
} from "@/lib/api";

export interface PlanItem {
  id: string;
  nombre: string;
  precio: number;
  duracionDias: number;
  descripcion: string;
  activa: boolean;
  beneficios: string[];
  totalSocios: number;
}

const initialFormState = {
  nombre: "",
  descripcion: "",
  precio: "" as number | string,
  duracion: 30 as number | string,
  beneficiosText: "", // <-- Cambiamos a texto simple
};

// Configuración de Notificación Toast (Flotante)
const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    popup: "rounded-xl border border-stone-200 shadow-lg",
  },
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

const toPlan = (raw: Record<string, unknown>): PlanItem => ({
  id: String(raw.id ?? raw._id ?? ""),
  nombre: String(raw.nombre ?? "Membresía sin nombre"),
  precio: Number(raw.precio ?? raw.pagoMensual ?? 0),
  duracionDias: Number(raw.duracionDias ?? raw.duracion ?? 0),
  descripcion: String(raw.descripcion ?? ""),
  activa: raw.activa !== false,
  beneficios: Array.isArray(raw.beneficios) ? raw.beneficios.map(String) : [],
  totalSocios: Number(raw.totalSocios ?? raw.usuariosActivos ?? 0),
});

export function DashboardMembresias() {
  const [planes, setPlanes] = useState<PlanItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [planEnEdicion, setPlanEnEdicion] = useState<PlanItem | null>(null);
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState<string | null>(null);

  const cargarPlanes = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const data = await getMembresias(token);
      setPlanes(data.map(toPlan));
      setError(null);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "No se pudieron cargar las membresías.",
      );
    }
  };

  useEffect(() => {
    void cargarPlanes();
  }, []);

  // Apertura para nuevo plan
  const handleOpenCrear = () => {
    setPlanEnEdicion(null);
    setFormData(initialFormState);
    setModalOpen(true);
  };

  // Apertura para editar un plan existente
  const handleOpenEditar = (plan: PlanItem) => {
    setPlanEnEdicion(plan);
    setFormData({
      nombre: plan.nombre,
      descripcion: plan.descripcion,
      precio: plan.precio,
      duracion: plan.duracionDias,
      beneficiosText: plan.beneficios.join("\n"),
    });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setPlanEnEdicion(null);
    setFormData(initialFormState);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !formData.nombre ||
      Number(formData.precio) <= 0 ||
      Number(formData.duracion) <= 0
    )
      return;

    try {
      const token = sessionStorage.getItem("token");
      const payload = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: Number(formData.precio),
        duracionDias: Number(formData.duracion),
        duracion: Number(formData.duracion),
        beneficios: formData.beneficiosText
          .split("\n")
          .map((beneficio) => beneficio.trim())
          .filter(Boolean),
      };

      if (planEnEdicion) {
        await actualizarMembresia(planEnEdicion.id, payload, token);
      } else {
        await crearMembresia(payload, token);
      }

      await cargarPlanes();
      setError(null);
      handleCloseModal();

      // Notificación Toast de éxito
      await Toast.fire({
        icon: "success",
        title: planEnEdicion ? "Membresía actualizada" : "Membresía creada",
      });
    } catch (submitError) {
      // Notificación Toast de error
      await Toast.fire({
        icon: "error",
        title:
          submitError instanceof Error
            ? submitError.message
            : "Error al guardar",
      });
      setError(
        submitError instanceof Error
          ? submitError.message
          : "No se pudo guardar la membresía.",
      );
    }
  };

  const toggleEstadoPlan = async (plan: PlanItem) => {
    // Confirmación modal (se mantiene central porque requiere decisión)
    const confirmacion = await Swal.fire({
      icon: "question",
      title: plan.activa ? "¿Pausar membresía?" : "¿Activar membresía?",
      showCancelButton: true,
      confirmButtonText: plan.activa ? "Pausar" : "Activar",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton:
          "bg-amber-500 text-white px-4 py-2 rounded-lg font-bold ml-2",
        cancelButton:
          "bg-stone-200 text-stone-800 px-4 py-2 rounded-lg font-bold",
      },
      buttonsStyling: false,
    });

    if (!confirmacion.isConfirmed) return;

    try {
      const token = sessionStorage.getItem("token");
      await actualizarMembresia(
        plan.id,
        {
          nombre: plan.nombre,
          precio: plan.precio,
          duracion: plan.duracionDias,
          duracionDias: plan.duracionDias,
          beneficios: plan.beneficios,
          activa: !plan.activa,
        },
        token,
      );
      await cargarPlanes();

      // Notificación Toast
      await Toast.fire({
        icon: "success",
        title: plan.activa ? "Membresía pausada" : "Membresía activada",
      });
    } catch (toggleError) {
      await Toast.fire({
        icon: "error",
        title: "No se pudo actualizar el estado",
      });
      setError(
        toggleError instanceof Error
          ? toggleError.message
          : "No se pudo actualizar el estado.",
      );
    }
  };

  const eliminarPlan = async (plan: PlanItem) => {
    // Confirmación modal destructiva
    const confirmacion = await Swal.fire({
      icon: "warning",
      title: "¿Eliminar membresía?",
      text: `Se eliminará ${plan.nombre} permanentemente.`,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton:
          "bg-rose-600 text-white px-4 py-2 rounded-lg font-bold ml-2",
        cancelButton:
          "bg-stone-200 text-stone-800 px-4 py-2 rounded-lg font-bold",
      },
      buttonsStyling: false,
    });

    if (!confirmacion.isConfirmed) return;

    try {
      const token = sessionStorage.getItem("token");
      await eliminarMembresia(plan.id, token);
      await cargarPlanes();

      // Notificación Toast
      await Toast.fire({
        icon: "success",
        title: "Membresía eliminada",
      });
    } catch (deleteError) {
      await Toast.fire({
        icon: "error",
        title: "No se pudo eliminar",
      });
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "No se pudo eliminar la membresía.",
      );
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error}
        </div>
      )}
      {/* Cabecera */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-stone-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900">
            Catálogo de Membresías
          </h1>
          <p className="text-sm text-stone-500">
            Creación, edición y administración de aranceles y vigencias.
          </p>
        </div>
        <button
          onClick={handleOpenCrear}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 px-4 py-2.5 text-xs font-bold text-stone-950 shadow-xs transition active:scale-95 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Crear Nuevo Plan</span>
        </button>
      </div>

      {/* Grilla de Planes */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {planes.map((plan) => (
          <div
            key={plan.id}
            className={`flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-xs transition hover:shadow-md ${
              plan.activa
                ? "border-stone-200"
                : "border-stone-200/60 opacity-60 bg-stone-50/50"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-stone-500">
                  <Clock className="h-3.5 w-3.5 text-amber-600" />
                  {plan.duracionDias} días
                </span>
                <button
                  onClick={() => void toggleEstadoPlan(plan)}
                  title={plan.activa ? "Desactivar plan" : "Activar plan"}
                  className="text-stone-400 hover:text-stone-700 transition cursor-pointer"
                >
                  {plan.activa ? (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      Activo
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-stone-500 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-md">
                      Pausado
                    </span>
                  )}
                </button>
              </div>

              <h3 className="text-lg font-bold text-stone-900">
                {plan.nombre}
              </h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                {plan.descripcion}
              </p>

              <div className="mt-4 pt-4 border-t border-stone-100">
                <span className="text-3xl font-black font-mono text-stone-900">
                  ${plan.precio.toLocaleString("es-AR")}
                </span>
                <span className="text-xs text-stone-400 block mt-0.5">
                  Arancel de renovación
                </span>
              </div>

              <div className="mt-5 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                  Beneficios
                </span>
                {plan.beneficios.map((b) => (
                  <div
                    key={b}
                    className="flex items-start gap-2 text-xs text-stone-600"
                  >
                    <Check className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer con botones actualizados y responsivos */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500">
              <span className="flex items-center gap-1.5 font-medium whitespace-nowrap">
                <Users className="h-4 w-4 text-stone-400" />
                {plan.totalSocios} suscriptos
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEditar(plan)}
                  title="Editar membresía"
                  aria-label={`Editar ${plan.nombre}`}
                  className="flex items-center justify-center p-2 rounded-lg border border-amber-200 text-amber-600 hover:bg-amber-50 hover:border-amber-400 hover:text-amber-700 transition-all cursor-pointer"
                >
                  <Pencil className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => void eliminarPlan(plan)}
                  title="Eliminar membresía"
                  aria-label={`Eliminar ${plan.nombre}`}
                  className="flex items-center justify-center p-2 rounded-lg border border-rose-200 text-rose-500 hover:bg-rose-50 hover:border-rose-400 hover:text-rose-600 transition-all cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Unificado (Crear y Editar) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  {planEnEdicion
                    ? "Editar Plan de Membresía"
                    : "Nuevo Plan de Membresía"}
                </h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nombre del Plan
                </label>
                <input
                  type="text"
                  placeholder="Ej: Plan Estudiantes"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      nombre: e.target.value,
                    }))
                  }
                  required
                  className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm text-stone-900 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Descripción Breve
                </label>
                <input
                  type="text"
                  placeholder="Ej: Horario reducido de 14 a 18 hs"
                  value={formData.descripcion}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      descripcion: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm text-stone-900 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Precio ($ ARS)
                  </label>
                  <input
                    type="number"
                    value={formData.precio}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        precio: Number(e.target.value),
                      }))
                    }
                    className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm font-mono text-stone-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Duración (Días)
                  </label>
                  <input
                    type="number"
                    value={formData.duracion}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        duracion: Number(e.target.value),
                      }))
                    }
                    className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm font-mono text-stone-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Beneficios (uno por línea)
                </label>
                <textarea
                  value={formData.beneficiosText}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      beneficiosText: e.target.value,
                    }))
                  }
                  placeholder={
                    "Acceso al gimnasio\nRutinas personalizadas\nEntrenador personal"
                  }
                  rows={4}
                  className="w-full resize-y rounded-xl border border-stone-200 px-3 py-2 text-sm text-stone-900 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-lg transition cursor-pointer"
                >
                  {planEnEdicion ? "Guardar Cambios" : "Guardar Membresía"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
