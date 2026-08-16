import { ApiError, postJson } from './client';

export interface RegisterOwnerRequest {
  name: string;
  email: string;
  password: string;
  merchantName: string;
}

export type RegisterOwnerResult = { ok: true } | { ok: false; error: string };

interface RegisterResponse {
  status: string;
  message: string;
  data: {
    user: {
      id_user: string;
      full_name: string;
      email: string;
      role: string;
      id_merchant: string;
      is_active: boolean;
      created_at: string;
    };
  };
}

// POST /api/v1/auth/register
// Backend tidak mengembalikan token — hasil sukses hanya berarti akun dibuat.
// User tidak menjadi authenticated; login harus dilakukan eksplisit.
export async function registerOwner(request: RegisterOwnerRequest): Promise<RegisterOwnerResult> {
  try {
    await postJson<RegisterResponse>('/auth/register', {
      full_name: request.name,
      email: request.email,
      password: request.password,
      merchant_name: request.merchantName,
    });
    return { ok: true };
  } catch (err) {
    if (err instanceof ApiError) {
      const error = err.status === 409 ? 'Email sudah terdaftar.' : err.message;
      return { ok: false, error };
    }
    return { ok: false, error: 'Tidak dapat terhubung ke server. Silakan coba lagi.' };
  }
}