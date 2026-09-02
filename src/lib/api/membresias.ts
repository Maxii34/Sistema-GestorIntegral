import { apiRequest, getAuthHeaders } from "@/lib/api/client";

export type MembresiaPayload = {
  nombre?: string;
  precio?: number;
  duracionDias?: number;
  descripcion?: string;
  activa?: boolean;
};

export async function getMembresias(token?: string | null) {
  return apiRequest<Array<Record<string, unknown>>>('/api/membresia', {
    method: 'GET',
    headers: getAuthHeaders(token),
  });
}

export async function crearMembresia(payload: MembresiaPayload, token?: string | null) {
  return apiRequest<Record<string, unknown>>('/api/membresia', {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload),
  });
}

export async function actualizarMembresia(id: string, payload: MembresiaPayload, token?: string | null) {
  return apiRequest<Record<string, unknown>>(`/api/membresia/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload),
  });
}
