"use client";

import { useState, type FormEvent } from "react";
import { 
  CreditCard, 
  Plus, 
  Check, 
  Clock, 
  Users, 
  X 
} from "lucide-react";

// Tipado del modelo de Membresía
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

// Datos iniciales precargados
const initialPlanes: PlanItem[] = [
  {
    id: "plan-1",
    nombre: "Plan Mensual",
    precio: 15000,
    duracionDias: 30,
    descripcion: "Acceso ilimitado a sala de musculación y vestuarios.",
    activa: true,
    beneficios: ["Acceso libre a máquinas", "Seguimiento básico en sala", "Casilleros de uso diario"],
    totalSocios: 540,
  },
  {
    id: "plan-2",
    nombre: "Plan Trimestral",
    precio: 38000,
    duracionDias: 90,
    descripcion: "Ahorro del 10% trimestral con rutinas personalizadas.",
    activa: true,
    beneficios: ["Acceso libre total", "Rutina personalizada de 3 días", "Descuento en suplementos"],
    totalSocios: 310,
  },
  {
    id: "plan-3",
    nombre: "Plan Semestral",
    precio: 70000,
    duracionDias: 180,
    descripcion: "Tarifa preferencial para miembros de media y larga duración.",
    activa: true,
    beneficios: ["Acceso libre multisede", "Evaluaciones funcionales", "Pase libre para 1 invitado al mes"],
    totalSocios: 210,
  },
  {
    id: "plan-4",
    nombre: "Plan Anual",
    precio: 120000,
    duracionDias: 365,
    descripcion: "Máxima fidelización con beneficios VIP y congelamiento.",
    activa: true,
    beneficios: ["Congelamiento de cuota por 30 días", "Plan nutricional trimestral", "Indumentaria IronGym"],
    totalSocios: 188,
  },
];

export function DashboardMembresias({
  plansSummary,
}: {
  plansSummary?: Array<{ nombre: string; total: number; porcentaje: number }>;
}) {
  const [planes, setPlanes] = useState<PlanItem[]>(initialPlanes);
  const [modalOpen, setModalOpen] = useState(false);

  const [nuevoPlan, setNuevoPlan] = useState({
    nombre: "",
    descripcion: "",
    precio: 15000,
    duracion: 30,
  });

  const handleCrearPlan = (e: FormEvent) => {
    e.preventDefault();
    if (!nuevoPlan.nombre) return;

    const planCreado: PlanItem = {
      id: `plan-${Date.now()}`,
      nombre: nuevoPlan.nombre,
      precio: Number(nuevoPlan.precio),
      duracionDias: Number(nuevoPlan.duracion),
      descripcion:
        nuevoPlan.descripcion || "Membresía estándar para entrenamiento.",
      activa: true,
      beneficios: [
        "Acceso a sala de musculación",
        "Atención de profesores de piso",
      ],
      totalSocios: 0,
    };

    setPlanes((prev) => [...prev, planCreado]);
    setModalOpen(false);
    setNuevoPlan({ nombre: "", descripcion: "", precio: 15000, duracion: 30 });
  };

  const toggleEstadoPlan = (id: string) => {
    setPlanes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, activa: !p.activa } : p)),
    );
  };

  return (
    <div className="space-y-6">
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
          onClick={() => setModalOpen(true)}
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
                  onClick={() => toggleEstadoPlan(plan.id)}
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

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-1.5 font-medium">
                <Users className="h-3.5 w-3.5 text-stone-400" />
                {plan.totalSocios} suscriptos
              </span>
              <button className="text-xs font-semibold text-amber-700 hover:text-amber-800 transition">
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Creación */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  Nuevo Plan de Membresía
                </h3>
                <p className="text-xs text-stone-500">POST /api/membrecia</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCrearPlan} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nombre del Plan
                </label>
                <input
                  type="text"
                  placeholder="Ej: Plan Estudiantes"
                  value={nuevoPlan.nombre}
                  onChange={(e) =>
                    setNuevoPlan((prev) => ({
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
                  value={nuevoPlan.descripcion}
                  onChange={(e) =>
                    setNuevoPlan((prev) => ({
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
                    value={nuevoPlan.precio}
                    onChange={(e) =>
                      setNuevoPlan((prev) => ({
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
                    value={nuevoPlan.duracion}
                    onChange={(e) =>
                      setNuevoPlan((prev) => ({
                        ...prev,
                        duracion: Number(e.target.value),
                      }))
                    }
                    className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm font-mono text-stone-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-lg transition cursor-pointer"
                >
                  Guardar Membresía
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}