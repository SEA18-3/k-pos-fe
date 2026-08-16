import { create } from 'zustand';
import {
  login as loginRequest,
  logout as logoutRequest,
  registerOwner,
  type AuthUser,
  type LoginResult,
  type RegisterOwnerRequest,
  type RegisterOwnerResult,
} from '../api/auth';
import {
  clearAuthSession,
  loadAuthSession,
  saveAuthSession,
} from '../utils/session';

export type {
  AuthUser,
  LoginRequest,
  LoginResult,
  RegisterOwnerRequest,
  RegisterOwnerResult,
  UserRole,
} from '../api/auth';

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<LoginResult>;
  register: (request: RegisterOwnerRequest) => Promise<RegisterOwnerResult>;
  logout: () => void;
}

// Bootstrap: restore session secara sinkron dari localStorage supaya
// session survive browser refresh dan tersedia pada render pertama.
const initialSession = loadAuthSession();

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: Boolean(initialSession),
  user: initialSession?.user ?? null,
  accessToken: initialSession?.accessToken ?? null,
  refreshToken: initialSession?.refreshToken ?? null,
  // Login nyata ke POST /api/v1/auth/login. Tidak ada mock credentials.
  // Failure tidak mengubah session yang sedang aktif.
  login: async (email, password) => {
    const result = await loginRequest({ email, password });
    if (!result.ok) {
      return result;
    }
    const session = {
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    };
    saveAuthSession(session);
    set({
      isAuthenticated: true,
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
    return result;
  },
  // Integration point untuk POST /auth/register. Sukses hanya berarti akun
  // dibuat — backend tidak mengembalikan token, jadi tidak ada auto-login.
  register: (request) => registerOwner(request),
  // Clear session lokal secara sinkron lebih dulu supaya routing langsung
  // bereaksi (tanpa redirect loop), baru panggil API logout (best-effort).
  logout: () => {
    const refreshToken = useAuthStore.getState().refreshToken;
    set({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      refreshToken: null,
    });
    clearAuthSession();
    if (refreshToken) {
      void logoutRequest(refreshToken);
    }
  },
}));