import { create } from 'zustand';
import {
  registerOwner,
  type RegisterOwnerRequest,
  type RegisterOwnerResult,
} from '../api/auth';

export type { RegisterOwnerRequest, RegisterOwnerResult } from '../api/auth';

export type UserRole = 'ADMIN' | 'OWNER' | 'OPERATOR' | 'ENTRY';

// Kredensial demo mock — ganti dengan panggilan API /login saat backend tersedia
export const DEMO_CREDENTIALS = {
  email: 'op@k-pos.com',
  password: 'op123',
  name: 'Smooth Operator',
  role: 'OPERATOR' as UserRole,
};

// Mock OWNER — development/testing hanya. Bukan hasil dari /register (register
// nyata membuat user baru di backend); akun ini hanya untuk uji coba role-based UI.
export const MOCK_OWNER = {
  email: 'owner@k-pos.com',
  password: 'owner123',
  name: 'Owner Demo',
  role: 'OWNER' as UserRole,
};

export interface AuthUser {
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (email: string, password: string) => boolean;
  register: (request: RegisterOwnerRequest) => Promise<RegisterOwnerResult>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (email, password) => {
    const account = [DEMO_CREDENTIALS, MOCK_OWNER].find(
      (cred) =>
        email.trim().toLowerCase() === cred.email &&
        password === cred.password
    );
    if (account) {
      set({
        isAuthenticated: true,
        user: { name: account.name, email: account.email, role: account.role },
      });
    }
    return Boolean(account);
  },
  // Integration point untuk POST /auth/register. Sukses hanya berarti akun
  // dibuat — backend tidak mengembalikan token, jadi tidak ada auto-login.
  register: (request) => registerOwner(request),
  logout: () => set({ isAuthenticated: false, user: null }),
}));
