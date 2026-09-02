import Link from "next/link";
import { 
  Dumbbell, 
  Mail, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  ArrowUpRight 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-stone-800/80 bg-[#141311] text-stone-300">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        
        {/* Grilla Principal */}
        <div className="grid grid-cols-1 gap-10 pb-12 border-b border-stone-800/80 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Columna Marca & Bio (2 columnas en desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Link 
              href="/" 
              className="group inline-flex items-center gap-3 transition-transform duration-200 active:scale-95"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/10 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.15)] transition-all duration-300 group-hover:border-amber-400/60 group-hover:bg-amber-400/20">
                <Dumbbell className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <span className="text-xl font-black uppercase tracking-[0.2em] text-amber-400">
                Iron<span className="text-stone-100 transition-colors duration-200 group-hover:text-amber-200">Gym</span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-stone-400">
              Plataforma integral para administración deportiva: control de acceso en molinete, gestión de membresías, altas y renovaciones automatizadas.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-stone-800 bg-[#1c1a17] px-3 py-1 text-xs text-stone-400">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                <span>Panel Administrativo v1.0</span>
              </span>
            </div>
          </div>

          {/* Columna Navegación Rápida */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Plataforma
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-stone-400 transition-colors duration-200 hover:text-amber-300">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/ingreso" className="text-stone-400 transition-colors duration-200 hover:text-amber-300">
                  Control de Acceso
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-stone-400 transition-colors duration-200 hover:text-amber-300">
                  Dashboard de Métricas
                </Link>
              </li>
              <li>
                <Link href="/socios" className="text-stone-400 transition-colors duration-200 hover:text-amber-300">
                  Padrón de Socios
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna Gestión & Cuenta */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Gestión Staff
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/login" className="inline-flex items-center gap-1 text-stone-400 transition-colors duration-200 hover:text-amber-300">
                  <span>Acceso Operadores</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-stone-500" />
                </Link>
              </li>
              <li>
                <Link href="/registro" className="text-stone-400 transition-colors duration-200 hover:text-amber-300">
                  Alta de Administrador
                </Link>
              </li>
              <li>
                <Link href="/terminos-de-servicio" className="text-stone-400 transition-colors duration-200 hover:text-amber-300">
                  Términos de Servicio
                </Link>
              </li>
              <li>
                <Link href="/politica-de-privacidad" className="text-stone-400 transition-colors duration-200 hover:text-amber-300">
                  Privacidad y Datos
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna Contacto & Soporte */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Sede Central
            </p>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>San Miguel de Tucumán, Argentina</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                <span className="font-mono text-xs">+54 (381) 123-4567</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                <span className="text-xs">soporte@irongym.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Fila Inferior / Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-stone-400 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-stone-200">IronGym Management</span>. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2 text-stone-400">
            <span>Alto rendimiento y control operativo</span>
          </div>
        </div>

      </div>
    </footer>
  );
}