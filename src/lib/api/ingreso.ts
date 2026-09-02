import { apiRequest, getAuthHeaders } from "@/lib/api/client";

export type IngresoResponse = {
  ok: boolean;
  acceso: boolean;
  mensaje: string;
  usuario?: {
    nombre: string;
    apellido: string;
    tipoMembresia: string;
    fechaVencimiento: string;
  };
  ingreso?: {
    usuarioId: string;
    dni: string;
    _id: string;
    fechaIngreso: string;
  };
};

export async function registrarIngreso(dni: string, token?: string | null) {
  return apiRequest<IngresoResponse>("/api/ingreso", {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify({ dni }),
  });
}

export async function getIngresosHoy(token?: string | null) {
  return apiRequest<{ data?: Array<Record<string, unknown>> }>('/api/ingreso/hoy', {
    method: 'GET',
    headers: getAuthHeaders(token),
  });
}
