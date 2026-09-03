import { apiRequest, getAuthHeaders } from "@/lib/api/client";

export async function getRenovacionesRecientes(token?: string | null) {
  const response = await apiRequest<{ data?: Array<Record<string, unknown>> }>(
    "/api/renovar/recientes",
    { method: "GET", headers: getAuthHeaders(token) },
  );

  return response.data ?? [];
}
