import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldX } from 'lucide-react';
import { useAuthStore } from '../store/auth';

// Terminal page untuk role yang belum memiliki permission UI (ADMIN/ENTRY).
// Memutus redirect loop: tidak ada menu navigasi di sini, hanya tombol logout.
export const AccessDeniedPage: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-100 p-4 select-none">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 flex flex-col items-center gap-4">
        <ShieldX className="w-12 h-12 text-brand-blue" />
        <div className="text-center flex flex-col gap-1">
          <h1 className="text-xl font-black text-gray-900 tracking-wide m-0">Akses Ditolak</h1>
          <p className="text-sm text-gray-500 font-medium">
            Akun Anda tidak memiliki akses ke fitur aplikasi ini.
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full py-3 bg-brand-blue hover:bg-brand-blue-hover active:scale-[0.98] text-white text-sm font-bold tracking-widest rounded shadow-sm hover:shadow-md transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-blue"
        >
          KELUAR
        </button>
      </div>
    </div>
  );
};