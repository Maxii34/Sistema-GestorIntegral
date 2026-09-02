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
  data?: unknown;
};

export async function getUsuarios(token?: string | null) {
  const response = await apiRequest<
    Array<Record<string, unknown>> | UsuarioResponse
  >('/api/usuarios', {
    method: 'GET',
    headers: getAuthHeaders(token),
  });

  if (Array.isArray(response)) return response;
  if (Array.isArray(response.usuarios)) return response.usuarios;
  if (Array.isArray(response.data)) return response.data;

  if (
    response.data &&
    typeof response.data === 'object' &&
    'usuarios' in response.data &&
    Array.isArray(response.data.usuarios)
  ) {
    return response.data.usuarios;
  }

  throw new Error('La respuesta de socios no tiene un formato válido.');
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
