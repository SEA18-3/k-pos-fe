import { ApiError, postJson } from './client';

export type UserRole = 'ADMIN' | 'OWNER' | 'OPERATOR' | 'ENTRY';

export interface AuthUser {
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResult =
  | { ok: true; user: AuthUser; accessToken: string; refreshToken: string }
  | { ok: false; error: string };

const VALID_ROLES: UserRole[] = ['ADMIN', 'OWNER', 'OPERATOR', 'ENTRY'];

// Role backend (ADMIN | OWNER | OPERATOR | ENTRY) sama persis dengan frontend.
// Role hanya boleh berasal dari response backend — jangan decode JWT.
function toUserRole(role: string): UserRole | null {
  return VALID_ROLES.includes(role as UserRole) ? (role as UserRole) : null;
}

export interface RegisterOwnerRequest {
  name: string;
  email: string;
  password: string;
  merchantName: string;
}

export type RegisterOwnerResult = { ok: true } | { ok: false; error: string };

interface LoginResponse {
  status: string;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    user: {
      id_user: string;
      full_name: string;
      email: string;
      role: string;
      is_active: boolean;
    };
  };
}

// POST /api/v1/auth/login
// Service ini tidak menyimpan token — hanya memetakan response backend
// menjadi tipe yang dibutuhkan halaman/store, dan mengembalikan hasil typed.
export async function login(request: LoginRequest): Promise<LoginResult> {
  try {
    const response = await postJson<LoginResponse>('/auth/login', {
      email: request.email,
      password: request.password,
    });
    const { access_token, refresh_token, user } = response.data;
    const role = toUserRole(user.role);
    if (!role) {
      // Role di luar yang dikenal dianggap gagal login — jangan ekspos detail.
      return { ok: false, error: 'Email atau password salah' };
    }
    return {
      ok: true,
      accessToken: access_token,
      refreshToken: refresh_token,
      user: {
        name: user.full_name,
        email: user.email,
        role,
      },
    };
  } catch (err) {
    if (err instanceof ApiError) {
      if (err.status === 401) {
        // Backend mengirim "Invalid credentials" — tampilkan pesan yang aman.
        return { ok: false, error: 'Email atau password salah' };
      }
      return { ok: false, error: err.message };
    }
    return { ok: false, error: 'Tidak dapat terhubung ke server. Silakan coba lagi.' };
  }
}

// POST /api/v1/auth/logout
// Token dikirim via header X-Refresh-Token, tanpa body.
// Best-effort: kegagalan API tidak boleh memblokir logout di sisi frontend.
export async function logout(refreshToken: string): Promise<void> {
  try {
    await postJson('/auth/logout', undefined, { refreshToken });
  } catch {
    // Ignore — session lokal tetap harus dibersihkan oleh pemanggil.
  }
}

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