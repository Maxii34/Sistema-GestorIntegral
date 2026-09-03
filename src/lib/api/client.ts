const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export type ApiErrorPayload = {
  mensaje?: string;
  message?: string;
  error?: string;
  errors?: Array<{ msg?: string }>;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function parseJson<T>(response: Response): Promise<T> {
  try {
    return (await response.json()) as T;
  } catch {
    return {} as T;
  }
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers ?? {});

  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await parseJson<T & ApiErrorPayload>(response);

  if (!response.ok) {
    const validationMessage = (data as ApiErrorPayload).errors
      ?.map((error) => error.msg)
      .filter(Boolean)
      .join(" ");
    const message =
      (data as ApiErrorPayload)?.mensaje ??
      (data as ApiErrorPayload)?.message ??
      (data as ApiErrorPayload)?.error ??
      validationMessage ??
      "No se pudo completar la solicitud.";

    throw new ApiError(message, response.status);
  }

  return data as T;
}

export function getAuthHeaders(token?: string | null): HeadersInit {
  return token ? { Authorization: `Bearer ${token}` } : {};
}
