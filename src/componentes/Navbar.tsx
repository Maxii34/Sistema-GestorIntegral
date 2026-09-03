"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Dumbbell,
  Home,
  DoorOpen,
  LayoutDashboard,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { logoutAdmin } from "@/lib/api";

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
      "rounded-md border border-stone-700 shadow-xl !py-2 !px-3 !min-h-0 !mt-24 !mr-4",
    title: "!text-sm !font-semibold !m-0 !p-0 !pl-2",
    icon: "!m-0 !scale-75 !border-0",
  },
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export default function Navbar() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const syncAuth = () => setLoggedIn(Boolean(localStorage.getItem("token")));
    syncAuth();
    window.addEventListener("storage", syncAuth);
    window.addEventListener("auth-change", syncAuth);
    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("auth-change", syncAuth);
    };
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        await logoutAdmin(token);
      }
    } catch (error) {
      console.error("No se pudo cerrar la sesión en el servidor.", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      setLoggedIn(false);
      window.dispatchEvent(new Event("auth-change"));
    }

    await Toast.fire({
      icon: "success",
      title: "Sesión cerrada exitosamente!",
    });

    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-800/80 bg-[#171614]/90 backdrop-blur-md text-white shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-transform duration-200 active:scale-95"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/10 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.15)] transition-all duration-300 group-hover:border-amber-400/60 group-hover:bg-amber-400/20 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]">
            <Dumbbell className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
          </div>
          <span className="text-xl font-black uppercase tracking-[0.2em] text-amber-400 drop-shadow-sm">
            Iron
            <span className="text-stone-100 transition-colors duration-200 group-hover:text-amber-200">
              Gym
            </span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-1.5 md:flex">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-[15px] font-medium text-stone-300 transition-all duration-200 hover:bg-stone-800/60 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
          >
            <Home className="h-4 w-4 text-stone-400 transition-colors duration-200 group-hover:text-amber-300" />
            <span>Inicio</span>
          </Link>
          <Link
            href="/ingreso"
            className="inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-[15px] font-medium text-stone-300 transition-all duration-200 hover:bg-stone-800/60 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
          >
            <DoorOpen className="h-4 w-4 text-stone-400 transition-colors duration-200 group-hover:text-amber-300" />
            <span>Ingreso</span>
          </Link>
          {loggedIn && (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-[15px] font-medium text-stone-300 transition-all duration-200 hover:bg-stone-800/60 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
            >
              <LayoutDashboard className="h-4 w-4 text-stone-400 transition-colors duration-200 group-hover:text-amber-300" />
              <span>Dashboard</span>
            </Link>
          )}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {loggedIn ? (
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-200 transition-all duration-200 hover:bg-rose-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/50 active:scale-95"
            >
              <LogOut className="h-4 w-4" />
              <span>Cerrar sesión</span>
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-stone-700/80 bg-stone-900/40 px-4 py-2 text-sm font-semibold text-stone-200 transition-all duration-200 hover:border-amber-400/60 hover:bg-stone-800/80 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 active:scale-95"
              >
                <LogIn className="h-4 w-4 text-stone-400" />
                <span>Login</span>
              </Link>
              <Link
                href="/registro"
                className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-amber-400 via-amber-500 to-amber-500 px-4 py-2 text-sm font-bold uppercase tracking-wider text-stone-950 shadow-[0_4px_20px_rgba(245,158,11,0.25)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_6px_25px_rgba(245,158,11,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-95"
              >
                <UserPlus className="h-4 w-4 text-stone-950" />
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
