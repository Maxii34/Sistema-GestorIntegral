import { apiRequest, getAuthHeaders } from "@/lib/api/client";

export type UsuarioPayload = {
  nombre?: string;
  apellido?: string;
  dni?: string;
  telefono?: string;
  email?: string;
  plan?: string;
  tipoMembresia?: string;
  pagoMensual?: number;
  estado?: string;
  fechaVencimiento?: string;
};

export type UsuarioResponse = {
  ok?: boolean;
  mensaje?: string;
  usuarios?: Array<Record<string, unknown>>;
  usuario?: Record<string, unknown>;
  data?: Record<string, unknown>;
};

export async function getUsuarios(token?: string | null) {
  return apiRequest<Array<Record<string, unknown>>>('/api/usuarios', {
    method: 'GET',
    headers: getAuthHeaders(token),
  });
}

export async function crearUsuario(payload: UsuarioPayload, token?: string | null) {
  return apiRequest<UsuarioResponse>('/api/usuarios', {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload),
  });
}

export async function eliminarUsuario(dni: string, token?: string | null) {
  return apiRequest<UsuarioResponse>(`/api/usuarios/${dni}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token),
  });
}

export async function renovarUsuario(payload: Record<string, unknown>, token?: string | null) {
  return apiRequest<UsuarioResponse>('/api/renovar', {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload),
  });
}
