import { apiRequest, getAuthHeaders } from "@/lib/api/client";

export async function getResumenDashboard(token?: string | null) {
  return apiRequest<Record<string, unknown>>('/api/dashboard/resumen', {
    method: 'GET',
    headers: getAuthHeaders(token),
  });
}
