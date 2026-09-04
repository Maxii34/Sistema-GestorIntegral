"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Dumbbell,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { loginAdmin } from "@/lib/api";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  background: "#1c1a17",
  color: "#ffffff",
  customClass: {
    popup:
      "rounded-lg border border-stone-700 shadow-xl !py-2 !px-3 !min-h-0 !mt-24 !mr-4",
    title: "!text-sm !font-semibold !m-0 !p-0 !pl-2",
    icon: "!m-0 !scale-75 !border-0",
  },
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await loginAdmin(formData);

      if (!data.ok) {
        throw new Error(
          data.mensaje || "Credenciales incorrectas o acceso no autorizado.",
        );
      }

      if (data.token) {
        sessionStorage.setItem("token", data.token);
        if (data.usuario) {
          sessionStorage.setItem("usuario", JSON.stringify(data.usuario));
        }
        window.dispatchEvent(new Event("auth-change"));
      }
      router.push("/dashboard");
      await Toast.fire({
        icon: "success",
        title: "Sesión iniciada",
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "No se pudo conectar con el servidor.";
      setError(message);

      // Reemplazado por la notificación tipo Toast para errores
      await Toast.fire({
        icon: "error",
        title: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#f8f9fa] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center antialiased">
      <div className="w-full max-w-md space-y-6">
        {/* Marca y Encabezado */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-200/80 shadow-xs mb-2">
            <Dumbbell className="h-6 w-6" />
          </div>
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>IronGym Staff</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
            Acceso Administrativo
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Ingresá tus credenciales de operador para gestionar el gimnasio.
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

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
              >
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoFocus
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@forcegym.com"
                  className="w-full rounded-xl border border-stone-300 bg-stone-50/50 pl-10 pr-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition"
                />
              </div>
            </div>

            {/* Campo Contraseña */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-700"
                >
                  Contraseña
                </label>
                <Link
                  href="/recuperar-password"
                  className="text-xs font-semibold text-amber-700 hover:text-amber-800 transition"
                >
                  ¿Olvidaste tu clave?
                </Link>
              </div>
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

            {/* Botón Ingresar */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-[0.98] disabled:opacity-60 text-stone-950 font-bold py-2.5 px-4 text-sm uppercase tracking-wider shadow-xs hover:shadow transition-all cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Verificando...</span>
                  </>
                ) : (
                  <>
                    <span>Entrar al Panel</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Enlace al Registro */}
          <div className="mt-6 pt-5 border-t border-stone-100 text-center">
            <p className="text-xs text-stone-500">
              ¿Tenés que dar de alta a otro administrador?{" "}
              <Link
                href="/registro"
                className="font-bold text-amber-700 hover:text-amber-800 transition ml-1"
              >
                Registrar operador
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
