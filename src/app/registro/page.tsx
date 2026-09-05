"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UserPlus,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { registerAdmin } from "@/lib/api";
import Swal from "sweetalert2";

export default function RegisterAdminPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
    rol: "administrador", // Compatible con el validador de Express en /api/admin/crear
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden. Verificalas antes de continuar.");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const token =
        typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

      await registerAdmin(
        {
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          password: formData.password,
          rol: formData.rol,
        },
        token,
      );

      setSuccess("Operador registrado exitosamente. Redirigiendo al login...");
      await Swal.fire({
        icon: "success",
        title: "Administrador registrado",
        text: "Serás redirigido al inicio de sesión.",
        timer: 1800,
        showConfirmButton: false,
      });
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Error al conectar con el servidor (puerto 3001).";
      setError(message);
      await Swal.fire({
        icon: "error",
        title: "No se pudo registrar",
        text: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#f8f9fa] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center antialiased">
      <div className="w-full max-w-xl space-y-6">
        {/* Cabecera y Marca */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-200/80 shadow-xs mb-2">
            <UserPlus className="h-6 w-6" />
          </div>
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Gestión de Personal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
            Alta de Administrador
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Registrá nuevas credenciales para recepción, cobros o supervisión de
            sede.
          </p>
        </div>

        {/* Tarjeta del Formulario */}
        <div className="rounded-2xl border border-stone-200/90 bg-white p-6 sm:p-8 shadow-xs">
          {error && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50/80 p-3.5 text-xs font-semibold text-rose-800">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50/80 p-3.5 text-xs font-semibold text-emerald-800">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre y Apellido */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
                >
                  Nombre
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Franco"
                    className="w-full rounded-xl border border-stone-300 bg-stone-50/50 pl-10 pr-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="apellido"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
                >
                  Apellido
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    required
                    value={formData.apellido}
                    onChange={handleChange}
                    placeholder="Gómez"
                    className="w-full rounded-xl border border-stone-300 bg-stone-50/50 pl-10 pr-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition"
                  />
                </div>
              </div>
            </div>

            {/* Email y Rol */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
                >
                  Correo Corporativo
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="operador@forcegym.com"
                    className="w-full rounded-xl border border-stone-300 bg-stone-50/50 pl-10 pr-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="rol"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
                >
                  Nivel de Rol
                </label>
                <div className="relative">
                  <Shield className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                  <select
                    id="rol"
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-stone-300 bg-stone-50/50 pl-10 pr-3 py-2.5 text-sm text-stone-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition cursor-pointer"
                  >
                    <option value="administrador">Admin</option>
                    <option value="usuario">Moderador</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contraseñas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-stone-300 bg-stone-50/50 pl-10 pr-10 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-stone-400 hover:text-stone-600 transition cursor-pointer"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
                >
                  Confirmar Clave
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-stone-300 bg-stone-50/50 pl-10 pr-10 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-3 text-stone-400 hover:text-stone-600 transition cursor-pointer"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Botón Registrar */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-[0.98] disabled:opacity-60 text-stone-950 font-bold py-2.5 px-4 text-sm uppercase tracking-wider shadow-xs hover:shadow transition-all cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Creando Operador...</span>
                  </>
                ) : (
                  <>
                    <span>Registrar Administrador</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Enlace al Login */}
          <div className="mt-6 pt-5 border-t border-stone-100 text-center">
            <p className="text-xs text-stone-500">
              ¿Ya contás con un usuario habilitado?{" "}
              <Link
                href="/login"
                className="font-bold text-amber-700 hover:text-amber-800 transition ml-1"
              >
                Iniciar sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
