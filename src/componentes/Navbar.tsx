import Link from "next/link";
import {
  Dumbbell,
  Home,
  DoorOpen,
  LayoutDashboard,
  LogIn,
  UserPlus,
} from "lucide-react";

export default function Navbar() {
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
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-[15px] font-medium text-stone-300 transition-all duration-200 hover:bg-stone-800/60 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
          >
            <LayoutDashboard className="h-4 w-4 text-stone-400 transition-colors duration-200 group-hover:text-amber-300" />
            <span>Dashboard</span>
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
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
        </div>
      </div>
    </header>
  );
}
