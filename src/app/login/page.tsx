"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Reemplaza con tu endpoint real de autenticación:
      // const res = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });
      // const data = await res.json();
      // if (!res.ok) throw new Error(data.mensaje || "Error al iniciar sesión");

      console.log("Credenciales enviadas:", formData);
    } catch (err: any) {
      setError(err.message || "Credenciales incorrectas. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-130px)] bg-zinc-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        
        {/* Encabezado */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
            Área de Miembros
          </span>
          <h1 className="text-3xl sm:text-4xl font-black italic tracking-tight text-zinc-900 uppercase mt-3">
            Iniciar <span className="text-amber-600">Sesión</span>
          </h1>
          <p className="text-zinc-600 text-sm mt-1">
            Accede a tu panel para gestionar tus entrenamientos y cuotas.
          </p>
        </div>

        {/* Tarjeta del Formulario */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl shadow-zinc-200/50 border border-zinc-200">
          
          {error && (
            <div className="mb-6 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Campo Email */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 placeholder-zinc-400 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm"
              />
            </div>

            {/* Campo Contraseña */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label 
                  htmlFor="password" 
                  className="block text-xs font-bold text-zinc-700 uppercase tracking-wider"
                >
                  Contraseña
                </label>
                <Link
                  href="/recuperar-password"
                  className="text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                >
                  ¿Olvidaste tu clave?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 placeholder-zinc-400 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm"
              />
            </div>

            {/* Botón Ingresar */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-300 text-zinc-950 font-black py-3 px-6 rounded-xl uppercase tracking-wider transition-colors shadow-md shadow-amber-500/20 cursor-pointer mt-2"
            >
              {loading ? "Entrando..." : "Entrar al Panel"}
            </button>

          </form>

          {/* Enlace a Registro */}
          <div className="mt-8 pt-6 border-t border-zinc-100 text-center">
            <p className="text-xs text-zinc-500">
              ¿Aún no tienes cuenta?{" "}
              <Link
                href="/registro"
                className="font-bold text-amber-600 hover:text-amber-700 transition-colors uppercase tracking-wider ml-1"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}