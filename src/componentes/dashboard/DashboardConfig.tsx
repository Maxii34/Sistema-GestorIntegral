import { useState } from "react";
import {
  Play,
  Users2,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

export function DashboardConfiguracion() {
  const [cronLoading, setCronLoading] = useState(false);
  const [cronResult, setCronResult] = useState<string | null>(null);

  const ejecutarVerificacionVencimientos = async () => {
    setCronLoading(true);
    setCronResult(null);
    try {
      const res = await fetch("http://localhost:3001/api/usuarios/verificar-vencimientos", {
        method: "POST",
      });
      const data = await res.json();
      setCronResult(
        `Verificación completada: ${data.usuariosDesactivados ?? 0} socios dados de baja.`
      );
    } catch {
      setCronResult("Error al contactar con el servidor.");
    } finally {
      setCronLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-stone-900">
          Configuración y Administración
        </h1>
        <p className="text-sm text-stone-500">
          Control de operadores de sistema y mantenimiento de membresías activas.
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                <Play className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-stone-900">
                  Control de Vencimientos
                </h2>
                <p className="text-xs text-stone-500">
                  Revisa el padrón y suspende automáticamente a los socios con fecha expirada.
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Automático a las 00:00 hs
            </span>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            Podés forzar una comprobación manual en cualquier momento del día si necesitás actualizar
            el estado de acceso del molinete de inmediato.
          </p>

          <div className="pt-1 flex items-center gap-3">
            <button
              onClick={ejecutarVerificacionVencimientos}
              disabled={cronLoading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white px-5 py-2.5 text-xs font-bold transition active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${cronLoading ? "animate-spin" : ""}`} />
              <span>{cronLoading ? "Verificando padrón..." : "Verificar Vencimientos Ahora"}</span>
            </button>
          </div>

          {cronResult && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0" />
              <span>{cronResult}</span>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-800">
                <Users2 className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-stone-900">
                  Operadores de Sistema
                </h2>
                <p className="text-xs text-stone-500">
                  Cuentas habilitadas para cobros, inscripciones y recepción.
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-stone-500">2 cuentas registradas</span>
          </div>

          <div className="divide-y divide-stone-100">
            <div className="py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 text-stone-700">
                  <ShieldCheck className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <span className="font-semibold text-stone-900 block text-sm">
                    Administrador Principal
                  </span>
                  <span className="text-xs text-stone-500">admin@forcegym.com</span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                superadmin
              </span>
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 text-stone-700">
                  <UserCheck className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <span className="font-semibold text-stone-900 block text-sm">
                    Recepción Mañana
                  </span>
                  <span className="text-xs text-stone-500">recepcion@forcegym.com</span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-full">
                moderador
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
