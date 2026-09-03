import { apiRequest, getAuthHeaders } from "@/lib/api/client";

export async function getResumenDashboard(token?: string | null) {
  const response = await apiRequest<{
    data?: Record<string, unknown>;
  }>('/api/stats/dashboard', {
    method: 'GET',
    headers: getAuthHeaders(token),
  });

  return response.data ?? {};
}
