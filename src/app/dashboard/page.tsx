"use client";

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import DashboardSidebar from "@/componentes/dashboard/DashboardSidebar";
import DashboardResumen from "@/componentes/dashboard/DashboardResumen";
import DashboardSocios, { type Socio } from "@/componentes/dashboard/DashboardSocios";
import { DashboardIngresos } from "@/componentes/dashboard/DashboardExtras";
import { DashboardConfiguracion } from "@/componentes/dashboard/DashboardConfig";
import { DashboardMembresias } from "@/componentes/dashboard/DashboardMembresias";
import { Users, DoorOpen, DollarSign, AlertCircle } from "lucide-react";
import {
  crearUsuario,
  eliminarUsuario,
  getUsuarios,
  renovarUsuario,
} from "@/lib/api";

const defaultCards = [
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

const toEstado = (value?: string | boolean | null): Socio["estado"] => {
  if (value === false || value === "Inactivo") return "Inactivo";
  if (value === "Suspendido") return "Suspendido";
  return "Activo";
};

const toSocio = (raw: Record<string, unknown>): Socio => {
  const nombre = String(raw.nombre ?? "");
  const apellido = String(raw.apellido ?? "");
  const nombreCompleto = [nombre, apellido].filter(Boolean).join(" ") || "Socio sin nombre";
  const fecha = String(raw.fechaVencimiento ?? raw.vencimiento ?? "-");
  const formatearFecha = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  return {
    nombre: nombreCompleto,
    apellido,
    dni: String(raw.dni ?? ""),
    telefono: String(raw.telefono ?? "-"),
    plan: String(raw.plan ?? raw.tipoMembresia ?? raw.membresia ?? "Mensual"),
    estado: toEstado(String(raw.estado ?? raw.status ?? (raw.activo === false ? "Inactivo" : "Activo"))),
    vencimiento: formatearFecha(fecha),
  };
};

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("socios");
  const [socios, setSocios] = useState<Socio[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cards, setCards] = useState(defaultCards);
  const [sociosError, setSociosError] = useState<string | null>(null);

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    pagoMensual: 15000,
    plan: "mensual",
    estado: "Activo" as "Activo" | "Suspendido" | "Inactivo",
  });

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

  const cargarSocios = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getUsuarios(token);
      setSocios(data.map(toSocio));
      setSociosError(null);
    } catch (error) {
      setSociosError(error instanceof Error ? error.message : "No se pudieron cargar los socios.");
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void cargarSocios();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.nombre || !form.apellido || form.dni.length !== 8 || !form.telefono) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await crearUsuario(form, token);
      await cargarSocios();
      setForm({
        nombre: "",
        apellido: "",
        dni: "",
        telefono: "",
        pagoMensual: 15000,
        plan: "mensual",
        estado: "Activo",
      });
    } catch (error) {
      setSociosError(error instanceof Error ? error.message : "No se pudo registrar el socio.");
    }
  };

  const handleDeleteSocio = async (dni: string) => {
    if (confirm("¿Estás seguro de eliminar este socio del sistema?")) {
      try {
        const token = localStorage.getItem("token");
        await eliminarUsuario(dni, token);
        await cargarSocios();
      } catch (error) {
        setSociosError(error instanceof Error ? error.message : "No se pudo eliminar el socio.");
      }
    }
  };

  const handleRenovarSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!renovarModal.socio) return;

    try {
      const token = localStorage.getItem("token");
      await renovarUsuario(
        {
          dni: renovarModal.socio.dni,
          pagoMensual: renovacionForm.pagoMensual,
          tipoMembresia: renovacionForm.tipoMembresia,
        },
        token,
      );
      await cargarSocios();
      setRenovarModal({ open: false, socio: null });
    } catch (error) {
      setSociosError(error instanceof Error ? error.message : "No se pudo renovar la membresía.");
    }
  };

  const handleRenovacionChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setRenovacionForm((prev) => ({ ...prev, [name]: value }));
  };

  const renderContent = () => {
    if (activeSection === "resumen") {
      return (
        <DashboardResumen
          cards={cards}
          recentEntries={recentEntries}
          plansSummary={plansSummary}
          sociosActivos={sociosActivos}
          socios={socios}
          onOpenIngresos={() => setActiveSection("ingresos")}
        />
      );
    }

    if (activeSection === "socios") {
      return (
        <div>
          {sociosError && (
            <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
              {sociosError}
            </div>
          )}
          <DashboardSocios
            socios={socios}
            sociosActivos={sociosActivos}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          form={form}
          onFormChange={handleChange}
          onFormReset={() =>
            setForm({
              nombre: "",
              apellido: "",
              dni: "",
              telefono: "",
              pagoMensual: 15000,
              plan: "mensual",
              estado: "Activo",
            })
          }
          onSubmit={handleSubmit}
          onDeleteSocio={handleDeleteSocio}
          onOpenRenovar={(socio) => {
            setRenovarModal({ open: true, socio });
            setRenovacionForm({
              pagoMensual: 15000,
              tipoMembresia: socio.plan.toLowerCase(),
            });
          }}
          renovacionForm={renovacionForm}
          onRenovacionFormChange={handleRenovacionChange}
          renovarModal={renovarModal}
          onCloseRenovarModal={() => setRenovarModal({ open: false, socio: null })}
          onRenovarSubmit={handleRenovarSubmit}
          />
        </div>
      );
    }

    if (activeSection === "ingresos") {
      return <DashboardIngresos />;
    }

    if (activeSection === "membresias") {
      return <DashboardMembresias plansSummary={plansSummary} />;
    }

    return <DashboardConfiguracion />;
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] text-stone-800 px-4 py-8 sm:px-6 lg:px-8 antialiased">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <DashboardSidebar activeSection={activeSection} onSelectSection={setActiveSection} />
          <section className="min-w-0">{renderContent()}</section>
        </div>
      </div>
    </main>
  );
}
