const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL ?? '/api/v1';

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

interface ErrorEnvelope {
  status?: string;
  message?: string | string[];
  data?: unknown;
}

function normalizeErrorMessage(message: string | string[] | undefined, status: number): string {
  // Jangan ekspos error internal server (500+) secara mentah ke user.
  if (status >= 500) {
    return 'Terjadi kesalahan pada server. Silakan coba lagi.';
  }
  if (typeof message === 'string' && message.trim()) {
    return message;
  }
  if (Array.isArray(message) && message.length > 0) {
    return message.join('. ');
  }
  return 'Terjadi kesalahan. Silakan coba lagi.';
}

export async function postJson<T>(path: string, body: unknown): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, 'Tidak dapat terhubung ke server. Silakan coba lagi.');
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    payload = undefined;
  }

  if (!response.ok) {
    const message = normalizeErrorMessage((payload as ErrorEnvelope | null)?.message, response.status);
    throw new ApiError(response.status, message);
  }

  return payload as T;
}