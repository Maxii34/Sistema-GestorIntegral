"use client";

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
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
  getResumenDashboard,
  getDetalleIngresosHoy,
  renovarUsuario,
} from "@/lib/api";

const PLANES_VALIDOS = ["mensual", "trimestral", "semestral", "anual"] as const;

const normalizarPlan = (plan: string): string => {
  const limpio = plan.toLowerCase().trim();
  return PLANES_VALIDOS.find((p) => limpio.includes(p)) ?? "mensual";
};

const toEstado = (value?: string | boolean | null): Socio["estado"] => {
  const estado = typeof value === "string" ? value.toLowerCase() : value;
  if (estado === false || estado === "inactivo") return "Inactivo";
  if (estado === "suspendido") return "Suspendido";
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
    plan: String(raw.plan ?? raw.tipoMembresia ?? raw.membresia ?? "Sin plan"),
    estado: toEstado(String(raw.estado ?? raw.status ?? (raw.activo === false ? "Inactivo" : "Activo"))),
    vencimiento: formatearFecha(fecha),
    // 👇 nuevo: ajustá "pagoMensual"/"cuota" al nombre real que devuelva tu backend
    pagoMensual: Number(raw.pagoMensual ?? raw.cuota ?? raw.monto ?? 0),
  };
};

export default function DashboardPage() {
  const router = useRouter();
  const [authReady, setAuthReady] = useState(false);
  const [activeSection, setActiveSection] = useState("socios");
  const [socios, setSocios] = useState<Socio[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [resumen, setResumen] = useState<Record<string, unknown>>({});
  const [recentEntries, setRecentEntries] = useState<Array<{ nombre: string; dni: string; ingreso: string; estado: string }>>([]);
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
    pagoMensual: 15000 as number | "",
    tipoMembresia: "mensual",
  });

  const sociosActivos = useMemo(
    () => socios.filter((s) => s.estado === "Activo").length,
    [socios],
  );

  const plansSummary = useMemo(() => {
    const totals = new Map<string, number>();
    socios.forEach((socio) => {
      const nombre = socio.plan || "Sin plan";
      totals.set(nombre, (totals.get(nombre) ?? 0) + 1);
    });
    const totalSociosConPlan = socios.length || 1;

    return Array.from(totals, ([nombre, total]) => ({
      nombre,
      total,
      porcentaje: Math.round((total / totalSociosConPlan) * 100),
    }));
  }, [socios]);

  const obtenerNumero = (...keys: string[]) => {
    for (const key of keys) {
      const value = resumen[key];
      if (typeof value === "number") return value;
      if (typeof value === "string" && value.trim() !== "") {
        const number = Number(value);
        if (!Number.isNaN(number)) return number;
      }
    }
    return 0;
  };

  const sociosPorEstado = Array.isArray(resumen.sociosPorEstado)
    ? resumen.sociosPorEstado
    : [];
  const activosDesdeResumen = sociosPorEstado.find(
    (item) => typeof item === "object" && item !== null && String(item._id).toLowerCase() === "activo",
  );
  const ingresosMesActual =
    typeof resumen.ingresosMesActual === "object" && resumen.ingresosMesActual !== null
      ? resumen.ingresosMesActual as Record<string, unknown>
      : {};
  const planesDesdeResumen = Array.isArray(resumen.distribucionPlanes)
    ? resumen.distribucionPlanes
        .filter((plan): plan is Record<string, unknown> => typeof plan === "object" && plan !== null)
        .map((plan) => ({
          nombre: String(plan._id ?? "Sin plan"),
          total: Number(plan.total ?? 0),
          porcentaje: Math.round((Number(plan.total ?? 0) / (socios.length || 1)) * 100),
        }))
    : [];

  const formatearMoneda = (value: number) =>
    `$${value.toLocaleString("es-AR")}`;

  const cards = [
    { label: "Socios activos", value: String(activosDesdeResumen && typeof activosDesdeResumen === "object" && "total" in activosDesdeResumen ? activosDesdeResumen.total : sociosActivos), detail: "Datos del padrón", icon: Users, tone: "amber" },
    { label: "Ingresos del mes", value: formatearMoneda(Number(ingresosMesActual.total ?? obtenerNumero("ingresosMes", "totalMes", "recaudacionMes"))), detail: "Datos del resumen", icon: DollarSign, tone: "emerald" },
    { label: "Membresías vencidas", value: String(obtenerNumero("membresiasVencidas", "vencidos", "usuariosVencidos")), detail: "Datos del resumen", icon: AlertCircle, tone: "rose" },
    { label: "Ingresos hoy", value: String(obtenerNumero("ingresosHoy", "ingresosDia", "accesosHoy")), detail: "Datos del resumen", icon: DoorOpen, tone: "sky" },
  ];

  const cargarResumen = async () => {
    try {
      const token = localStorage.getItem("token");
      setResumen(await getResumenDashboard(token));
      const ingresos = await getDetalleIngresosHoy(token);
      setRecentEntries(ingresos.map((ingreso) => {
        const socio = typeof ingreso.usuarioId === "object" && ingreso.usuarioId !== null
          ? ingreso.usuarioId as Record<string, unknown>
          : {};
        const fecha = new Date(String(ingreso.fechaIngreso ?? ""));
        return {
          nombre: `${String(socio.nombre ?? "Socio")} ${String(socio.apellido ?? "")}`.trim(),
          dni: String(ingreso.dni ?? ""),
          ingreso: Number.isNaN(fecha.getTime()) ? "-" : fecha.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }),
          estado: String(socio.estado ?? "activo").toLowerCase() === "activo" ? "Activo" : "Inactivo",
        };
      }));
    } catch (error) {
      setSociosError(error instanceof Error ? error.message : "No se pudo cargar el resumen.");
    }
  };

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
    if (!localStorage.getItem("token")) {
      router.replace("/login");
      return;
    }
    setAuthReady(true);
    const timeoutId = window.setTimeout(() => {
      void cargarSocios();
      void cargarResumen();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [router]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "pagoMensual" ? (value === "" ? 0 : Number(value)) : value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.nombre || !form.apellido || form.dni.length !== 8 || !form.telefono) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await crearUsuario({
        ...form,
        tipoMembresia: form.plan,
        estado: form.estado.toLowerCase(),
      }, token);
      await cargarSocios();
      await Swal.fire({ icon: "success", title: "Socio registrado", text: "El socio fue agregado correctamente.", timer: 1800, showConfirmButton: false });
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
      await Swal.fire({ icon: "error", title: "No se pudo registrar", text: error instanceof Error ? error.message : "Error del servidor." });
      setSociosError(error instanceof Error ? error.message : "No se pudo registrar el socio.");
    }
  };

  const handleDeleteSocio = async (dni: string) => {
    const confirmacion = await Swal.fire({
      icon: "warning",
      title: "¿Eliminar socio?",
      text: "Esta acción no se puede deshacer.",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#e11d48",
    });
    if (confirmacion.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await eliminarUsuario(dni, token);
        await cargarSocios();
        await Swal.fire({ icon: "success", title: "Socio eliminado", timer: 1600, showConfirmButton: false });
      } catch (error) {
        await Swal.fire({ icon: "error", title: "No se pudo eliminar", text: error instanceof Error ? error.message : "Error del servidor." });
        setSociosError(error instanceof Error ? error.message : "No se pudo eliminar el socio.");
      }
    }
  };

  const handleRenovarSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!renovarModal.socio || renovacionForm.pagoMensual === "") return;

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
      await Swal.fire({ icon: "success", title: "Renovación confirmada", text: "La membresía fue actualizada.", timer: 1800, showConfirmButton: false });
    } catch (error) {
      await Swal.fire({ icon: "error", title: "No se pudo renovar", text: error instanceof Error ? error.message : "Error del servidor." });
      setSociosError(error instanceof Error ? error.message : "No se pudo renovar la membresía.");
    }
  };

  if (!authReady) return null;

  const handleRenovacionChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setRenovacionForm((prev) => ({
      ...prev,
      [name]: name === "pagoMensual" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const renderContent = () => {
    if (activeSection === "resumen") {
      return (
        <DashboardResumen
          cards={cards}
          recentEntries={recentEntries}
          plansSummary={planesDesdeResumen.length ? planesDesdeResumen : plansSummary}
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
                pagoMensual: socio.pagoMensual,
                tipoMembresia: normalizarPlan(socio.plan),
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
      return <DashboardMembresias />;
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