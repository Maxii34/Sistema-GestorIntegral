"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import DashboardSidebar from "@/componentes/dashboard/DashboardSidebar";
import DashboardResumen from "@/componentes/dashboard/DashboardResumen";
import DashboardSocios, { type Socio } from "@/componentes/dashboard/DashboardSocios";
import { DashboardIngresos, DashboardMembresias, DashboardConfiguracion } from "@/componentes/dashboard/DashboardExtras";
import { Users, DoorOpen, DollarSign, AlertCircle } from "lucide-react";

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

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("socios");
  const [socios, setSocios] = useState<Socio[]>(initialSocios);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.nombre || !form.apellido || form.dni.length !== 8 || !form.telefono) {
      return;
    }

    const nuevoSocio: Socio = {
      nombre: `${form.nombre} ${form.apellido}`,
      dni: form.dni,
      telefono: form.telefono,
      plan: form.plan.charAt(0).toUpperCase() + form.plan.slice(1),
      estado: form.estado,
      vencimiento: "30/10/2026",
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

  const handleDeleteSocio = (dni: string) => {
    if (confirm("¿Estás seguro de eliminar este socio del sistema?")) {
      setSocios((prev) => prev.filter((s) => s.dni !== dni));
    }
  };

  const handleRenovarSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
          : s,
      ),
    );

    setRenovarModal({ open: false, socio: null });
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
