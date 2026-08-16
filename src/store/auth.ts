import { create } from 'zustand';

export type UserRole = 'ADMIN' | 'OWNER' | 'OPERATOR' | 'ENTRY';

// Kredensial demo mock — ganti dengan panggilan API /login saat backend tersedia
export const DEMO_CREDENTIALS = {
  email: 'admin@k-pos.com',
  password: 'admin123',
  name: 'Administrator',
  role: 'OPERATOR' as UserRole,
};

// Mock OWNER — development/testing hanya. Bukan hasil dari /register (register
// selalu gagal sampai backend tersedia), jadi role OWNER hanya berasal dari akun
// mock ini untuk keperluan uji coba role-based UI.
export const MOCK_OWNER = {
  email: 'owner@k-pos.com',
  password: 'owner123',
  name: 'Owner Demo',
  role: 'OWNER' as UserRole,
};

export interface RegisterOwnerRequest {
  name: string;
  email: string;
  password: string;
  merchantName: string;
}

export type RegisterOwnerResult = { ok: true } | { ok: false; error: string };

export interface AuthUser {
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (email: string, password: string) => boolean;
  register: (request: RegisterOwnerRequest) => RegisterOwnerResult;
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
  // Integration point untuk POST /register saat backend tersedia.
  // Tidak ada fake success — backend belum tersedia, jadi selalu kembalikan error.
  register: (request) => {
    void request;
    return {
      ok: false,
      error: 'Backend belum tersedia. Registrasi belum dapat diproses.',
    };
  },
  logout: () => set({ isAuthenticated: false, user: null }),
}));
