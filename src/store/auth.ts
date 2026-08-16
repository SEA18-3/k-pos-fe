import { create } from 'zustand';

// Kredensial demo mock — ganti dengan panggilan API /login saat backend tersedia
export const DEMO_CREDENTIALS = {
  email: 'admin@k-pos.com',
  password: 'admin123',
  name: 'Administrator',
};

export interface RegisterOwnerRequest {
  name: string;
  email: string;
  password: string;
  merchantName: string;
}

export type RegisterOwnerResult = { ok: true } | { ok: false; error: string };

interface AuthState {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  login: (email: string, password: string) => boolean;
  register: (request: RegisterOwnerRequest) => RegisterOwnerResult;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (email, password) => {
    const isValid =
      email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
      password === DEMO_CREDENTIALS.password;
    if (isValid) {
      set({
        isAuthenticated: true,
        user: { name: DEMO_CREDENTIALS.name, email: DEMO_CREDENTIALS.email },
      });
    }
    return isValid;
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
