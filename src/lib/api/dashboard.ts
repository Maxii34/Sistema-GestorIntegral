import { apiRequest, getAuthHeaders } from "@/lib/api/client";

export type VerificacionVencimientosResponse = {
  ok?: boolean;
  mensaje?: string;
  usuariosDesactivados?: number;
};

export async function verificarVencimientos(token?: string | null) {
  return apiRequest<VerificacionVencimientosResponse>("/api/usuarios/verificar-vencimientos", {
    method: "POST",
    headers: getAuthHeaders(token),
  });
}
