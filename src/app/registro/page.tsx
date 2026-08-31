"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterAdminPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
    rol: "admin", // 'admin' | 'recepcion' | 'entrenador'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      // Reemplaza con tu endpoint de registro de staff:
      // const res = await fetch("/api/auth/register-admin", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });
      // const data = await res.json();
      // if (!res.ok) throw new Error(data.mensaje || "Error al crear administrador");

      console.log("Datos de staff enviados:", formData);
    } catch (err: any) {
      setError(err.message || "Hubo un problema al crear la cuenta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-130px)] bg-zinc-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg">
        
        {/* Encabezado */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
            Panel de Control
          </span>
          <h1 className="text-3xl sm:text-4xl font-black italic tracking-tight text-zinc-900 uppercase mt-3">
            Nuevo <span className="text-amber-600">Administrador</span>
          </h1>
          <p className="text-zinc-600 text-sm mt-1">
            Registro de usuarios con privilegios de gestión y staff.
          </p>
        </div>

        {/* Tarjeta del Formulario */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl shadow-zinc-200/50 border border-zinc-200">
          
          {error && (
            <div className="mb-6 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Nombre y Apellido */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label 
                  htmlFor="nombre" 
                  className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  required
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Franco"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 placeholder-zinc-400 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm"
                />
              </div>

              <div>
                <label 
                  htmlFor="apellido" 
                  className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2"
                >
                  Apellido
                </label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  required
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Colapinto"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 placeholder-zinc-400 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm"
                />
              </div>
            </div>

            {/* Email y Rol */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label 
                  htmlFor="email" 
                  className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2"
                >
                  Correo Corporativo
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@irongym.com"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 placeholder-zinc-400 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm"
                />
              </div>

              <div>
                <label 
                  htmlFor="rol" 
                  className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2"
                >
                  Rol
                </label>
                <select
                  id="rol"
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm cursor-pointer"
                >
                  <option value="admin">Admin</option>
                  <option value="recepcion">Recepción</option>
                  <option value="entrenador">Trainer</option>
                </select>
              </div>
            </div>

            {/* Contraseñas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label 
                  htmlFor="password" 
                  className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2"
                >
                  Contraseña
                </label>
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

              <div>
                <label 
                  htmlFor="confirmPassword" 
                  className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2"
                >
                  Confirmar Clave
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 placeholder-zinc-400 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm"
                />
              </div>
            </div>

            {/* Botón Guardar */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-300 text-zinc-950 font-black py-3 px-6 rounded-xl uppercase tracking-wider transition-colors shadow-md shadow-amber-500/20 cursor-pointer mt-4"
            >
              {loading ? "Creando usuario..." : "Registrar Administrador"}
            </button>

          </form>

          {/* Enlace al Login */}
          <div className="mt-8 pt-6 border-t border-zinc-100 text-center">
            <p className="text-xs text-zinc-500">
              ¿Ya tienes credenciales de staff?{" "}
              <Link
                href="/login"
                className="font-bold text-amber-600 hover:text-amber-700 transition-colors uppercase tracking-wider ml-1"
              >
                Inicia sesión
              </Link>
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}