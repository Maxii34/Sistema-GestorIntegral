import { apiRequest, getAuthHeaders } from "@/lib/api/client";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterAdminPayload = {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol: string;
};

export type LoginResponse = {
  ok: boolean;
  token?: string;
  mensaje?: string;
  usuario?: {
    id?: string;
    nombre?: string;
    apellido?: string;
    email?: string;
    rol?: string;
  };
};

export async function loginAdmin(payload: LoginPayload) {
  return apiRequest<LoginResponse>("/api/admin/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function registerAdmin(payload: RegisterAdminPayload, token?: string | null) {
  return apiRequest<LoginResponse>("/api/admin/crear", {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload),
  });
}
