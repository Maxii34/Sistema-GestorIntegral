import { apiRequest, getAuthHeaders } from "@/lib/api/client";

export type MembresiaPayload = {
  nombre?: string;
  precio?: number;
  duracion?: number;
  duracionDias?: number;
  descripcion?: string;
  beneficios?: string[];
  activa?: boolean;
};

export async function getMembresias(token?: string | null) {
  const response = await apiRequest<
    Array<Record<string, unknown>> | { membresias?: Array<Record<string, unknown>>; data?: unknown }
  >('/api/membrecia', {
    method: 'GET',
    headers: getAuthHeaders(token),
  });

  if (Array.isArray(response)) return response;
  if (Array.isArray(response.membresias)) return response.membresias;
  if (Array.isArray(response.data)) return response.data;
  if (
    response.data &&
    typeof response.data === 'object' &&
    'membresias' in response.data &&
    Array.isArray(response.data.membresias)
  ) {
    return response.data.membresias;
  }

  throw new Error('La respuesta de membresías no tiene un formato válido.');
}

export async function getMembresiasActivas(token?: string | null) {
  const response = await apiRequest<
    Array<Record<string, unknown>> | { data?: unknown }
  >('/api/membrecia/activas', {
    method: 'GET',
    headers: getAuthHeaders(token),
  });

  if (Array.isArray(response)) return response;
  if (Array.isArray(response.data)) return response.data;

  throw new Error('La respuesta de membresías activas no tiene un formato válido.');
}

export async function crearMembresia(payload: MembresiaPayload, token?: string | null) {
  return apiRequest<Record<string, unknown>>('/api/membrecia', {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload),
  });
}

export async function actualizarMembresia(id: string, payload: MembresiaPayload, token?: string | null) {
  return apiRequest<Record<string, unknown>>(`/api/membrecia/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload),
  });
}

export async function eliminarMembresia(id: string, token?: string | null) {
  return apiRequest<Record<string, unknown>>(`/api/membrecia/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });
}
