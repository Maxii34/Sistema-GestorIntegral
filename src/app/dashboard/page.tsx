"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import DashboardSidebar from "@/componentes/dashboard/DashboardSidebar";
import DashboardResumen from "@/componentes/dashboard/DashboardResumen";
import DashboardSocios, {
  type Membresia,
  type Socio,
} from "@/componentes/dashboard/DashboardSocios";
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
  getMembresias,
  renovarUsuario,
} from "@/lib/api";

const toEstado = (value?: string | boolean | null): Socio["estado"] => {
  const estado = typeof value === "string" ? value.toLowerCase() : value;
  if (estado === false || estado === "inactivo") return "Inactivo";
  if (estado === "suspendido") return "Suspendido";
  return "Activo";
};

const getMembresiaId = (value: unknown) => {
  if (typeof value === "string" || typeof value === "number")
    return String(value);
  if (value && typeof value === "object") {
    const objectValue = value as Record<string, unknown>;
    return String(objectValue._id ?? objectValue.id ?? objectValue.$oid ?? "");
  }
  return "";
};

const getTipoMembresia = (nombre: string, duracionDias: number) => {
  const nombreNormalizado = nombre.toLowerCase();
  if (nombreNormalizado.includes("trimestral")) return "trimestral";
  if (nombreNormalizado.includes("semestral")) return "semestral";
  if (nombreNormalizado.includes("anual")) return "anual";
  if (nombreNormalizado.includes("mensual")) return "mensual";
  if (duracionDias >= 365) return "anual";
  if (duracionDias >= 180) return "semestral";
  if (duracionDias >= 90) return "trimestral";
  return "mensual";
};

const toSocio = (
  raw: Record<string, unknown>,
  membresias: Membresia[],
): Socio => {
  const nombre = String(raw.nombre ?? "");
  const apellido = String(raw.apellido ?? "");
  const nombreCompleto =
    [nombre, apellido].filter(Boolean).join(" ") || "Socio sin nombre";
  const fecha = String(raw.fechaVencimiento ?? raw.vencimiento ?? "-");
  const formatearFecha = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const membresiaRaw = raw.membresia ?? raw.membrecia ?? raw.membresiaId;
  const membresia =
    typeof membresiaRaw === "object" && membresiaRaw !== null
      ? (membresiaRaw as Record<string, unknown>)
      : null;
  const membresiaId = getMembresiaId(membresiaRaw);
  const membresiaRelacionada = membresias.find(
    (item) => item._id === membresiaId,
  );
  const membresiaNombre = membresia
    ? String(
        membresia.nombre ?? membresiaRelacionada?.nombre ?? "Sin membresía",
      )
    : (membresiaRelacionada?.nombre ?? "Sin membresía");

  return {
    nombre: nombreCompleto,
    apellido,
    dni: String(raw.dni ?? ""),
    telefono: String(raw.telefono ?? "-"),
    membresia: membresiaNombre,
    membresiaId,
    plan: membresiaNombre,
    estado: toEstado(
      String(
        raw.estado ??
          raw.status ??
          (raw.activo === false ? "Inactivo" : "Activo"),
      ),
    ),
    vencimiento: formatearFecha(fecha),
  };
};

export default function DashboardPage() {
  const router = useRouter();
  const [authReady, setAuthReady] = useState(false);
  const [activeSection, setActiveSection] = useState("socios");
  const [socios, setSocios] = useState<Socio[]>([]);
  const [membresias, setMembresias] = useState<Membresia[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [resumen, setResumen] = useState<Record<string, unknown>>({});
  const [recentEntries, setRecentEntries] = useState<
    Array<{ nombre: string; dni: string; ingreso: string; estado: string }>
  >([]);
  const [sociosError, setSociosError] = useState<string | null>(null);

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    membresia: "",
  });

  const [renovarModal, setRenovarModal] = useState<{
    open: boolean;
    socio: Socio | null;
  }>({
    open: false,
    socio: null,
  });

  const [renovacionForm, setRenovacionForm] = useState({
    membresia: "",
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
    (item) =>
      typeof item === "object" &&
      item !== null &&
      String(item._id).toLowerCase() === "activo",
  );
  const ingresosMesActual =
    typeof resumen.ingresosMesActual === "object" &&
    resumen.ingresosMesActual !== null
      ? (resumen.ingresosMesActual as Record<string, unknown>)
      : {};
  const planesDesdeResumen = Array.isArray(resumen.distribucionPlanes)
    ? resumen.distribucionPlanes
        .filter(
          (plan): plan is Record<string, unknown> =>
            typeof plan === "object" && plan !== null,
        )
        .map((plan) => ({
          nombre: String(plan._id ?? "Sin plan"),
          total: Number(plan.total ?? 0),
          porcentaje: Math.round(
            (Number(plan.total ?? 0) / (socios.length || 1)) * 100,
          ),
        }))
    : [];

  const formatearMoneda = (value: number) =>
    `$${value.toLocaleString("es-AR")}`;

  const cards = [
    {
      label: "Socios activos",
      value: String(
        activosDesdeResumen &&
          typeof activosDesdeResumen === "object" &&
          "total" in activosDesdeResumen
          ? activosDesdeResumen.total
          : sociosActivos,
      ),
      detail: "Datos del padrón",
      icon: Users,
      tone: "amber",
    },
    {
      label: "Ingresos del mes",
      value: formatearMoneda(
        Number(
          ingresosMesActual.total ??
            obtenerNumero("ingresosMes", "totalMes", "recaudacionMes"),
        ),
      ),
      detail: "Datos del resumen",
      icon: DollarSign,
      tone: "emerald",
    },
    {
      label: "Membresías vencidas",
      value: String(
        obtenerNumero("membresiasVencidas", "vencidos", "usuariosVencidos"),
      ),
      detail: "Datos del resumen",
      icon: AlertCircle,
      tone: "rose",
    },
    {
      label: "Ingresos hoy",
      value: String(obtenerNumero("ingresosHoy", "ingresosDia", "accesosHoy")),
      detail: "Datos del resumen",
      icon: DoorOpen,
      tone: "sky",
    },
  ];

  const cargarResumen = async () => {
    try {
      const token = sessionStorage.getItem("token");
      setResumen(await getResumenDashboard(token));
      const ingresos = await getDetalleIngresosHoy(token);
      setRecentEntries(
        ingresos.map((ingreso) => {
          const socio =
            typeof ingreso.usuarioId === "object" && ingreso.usuarioId !== null
              ? (ingreso.usuarioId as Record<string, unknown>)
              : {};
          const fecha = new Date(String(ingreso.fechaIngreso ?? ""));
          return {
            nombre:
              `${String(socio.nombre ?? "Socio")} ${String(socio.apellido ?? "")}`.trim(),
            dni: String(ingreso.dni ?? ""),
            ingreso: Number.isNaN(fecha.getTime())
              ? "-"
              : fecha.toLocaleTimeString("es-AR", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
            estado:
              String(socio.estado ?? "activo").toLowerCase() === "activo"
                ? "Activo"
                : "Inactivo",
          };
        }),
      );
    } catch (error) {
      setSociosError(
        error instanceof Error
          ? error.message
          : "No se pudo cargar el resumen.",
      );
    }
  };

  const cargarSocios = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const [data, membresiasData] = await Promise.all([
        getUsuarios(token),
        getMembresias(token),
      ]);
      const membresiasCargadas = membresiasData.map((raw) => ({
        _id: String(raw._id ?? raw.id ?? ""),
        nombre: String(raw.nombre ?? "Membresía sin nombre"),
        precio: Number(raw.precio ?? 0),
        duracionDias: Number(raw.duracionDias ?? raw.duracion ?? 0),
        activa: raw.activa !== false,
      }));
      setMembresias(membresiasCargadas);
      setSocios(data.map((raw) => toSocio(raw, membresiasCargadas)));
      setSociosError(null);
    } catch (error) {
      setSociosError(
        error instanceof Error
          ? error.message
          : "No se pudieron cargar los socios.",
      );
    }
  };

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
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

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !form.nombre ||
      !form.apellido ||
      form.dni.length !== 8 ||
      !form.telefono
    ) {
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      await crearUsuario(
        {
          nombre: form.nombre,
          apellido: form.apellido,
          dni: form.dni,
          telefono: form.telefono,
          membresia: form.membresia,
        },
        token,
      );
      window.dispatchEvent(new Event("dashboard-data-change"));
      await cargarSocios();
      await cargarResumen();
      await Swal.fire({
        icon: "success",
        title: "Socio registrado",
        text: "El socio fue agregado correctamente.",
        timer: 1800,
        showConfirmButton: false,
      });
      setForm({
        nombre: "",
        apellido: "",
        dni: "",
        telefono: "",
        membresia: "",
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "No se pudo registrar",
        text: error instanceof Error ? error.message : "Error del servidor.",
      });
      setSociosError(
        error instanceof Error
          ? error.message
          : "No se pudo registrar el socio.",
      );
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
        const token = sessionStorage.getItem("token");
        await eliminarUsuario(dni, token);
        window.dispatchEvent(new Event("dashboard-data-change"));
        await cargarSocios();
        await cargarResumen();
        await Swal.fire({
          icon: "success",
          title: "Socio eliminado",
          timer: 1600,
          showConfirmButton: false,
        });
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "No se pudo eliminar",
          text: error instanceof Error ? error.message : "Error del servidor.",
        });
        setSociosError(
          error instanceof Error
            ? error.message
            : "No se pudo eliminar el socio.",
        );
      }
    }
  };

  const handleRenovarSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!renovarModal.socio || !renovacionForm.membresia) return;

    const membresiaSeleccionada = membresias.find(
      (membresia) => membresia._id === renovacionForm.membresia,
    );
    if (!membresiaSeleccionada) return;

    try {
      const token = sessionStorage.getItem("token");
      await renovarUsuario(
        {
          dni: renovarModal.socio.dni,
          membresia: membresiaSeleccionada._id,
          pagoMensual: membresiaSeleccionada.precio,
          tipoMembresia: getTipoMembresia(
            membresiaSeleccionada.nombre,
            membresiaSeleccionada.duracionDias,
          ),
        },
        token,
      );
      window.dispatchEvent(new Event("dashboard-data-change"));
      await cargarSocios();
      await cargarResumen();
      setRenovarModal({ open: false, socio: null });
      await Swal.fire({
        icon: "success",
        title: "Renovación confirmada",
        text: "La membresía fue actualizada.",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "No se pudo renovar",
        text: error instanceof Error ? error.message : "Error del servidor.",
      });
      setSociosError(
        error instanceof Error
          ? error.message
          : "No se pudo renovar la membresía.",
      );
    }
  };

  if (!authReady) return null;

  const handleRenovacionChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setRenovacionForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderContent = () => {
    if (activeSection === "resumen") {
      return (
        <DashboardResumen
          cards={cards}
          recentEntries={recentEntries}
          plansSummary={
            planesDesdeResumen.length ? planesDesdeResumen : plansSummary
          }
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
                membresia: "",
              })
            }
            onSubmit={handleSubmit}
            onDeleteSocio={handleDeleteSocio}
            onOpenRenovar={(socio) => {
              setRenovarModal({ open: true, socio });
              setRenovacionForm({
                membresia: socio.membresiaId ?? "",
              });
            }}
            renovacionForm={renovacionForm}
            membresias={membresias}
            onRenovacionFormChange={handleRenovacionChange}
            renovarModal={renovarModal}
            onCloseRenovarModal={() =>
              setRenovarModal({ open: false, socio: null })
            }
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
          <DashboardSidebar
            activeSection={activeSection}
            onSelectSection={setActiveSection}
          />
          <section className="min-w-0">{renderContent()}</section>
        </div>
      </div>
    </main>
  );
}
