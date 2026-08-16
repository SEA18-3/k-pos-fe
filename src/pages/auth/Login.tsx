import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import logo from '/logo.png'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  email?: string;
  password?: string;
  form?: string;
}

export const Login: React.FC = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!EMAIL_REGEX.test(email.trim())) {
      newErrors.email = 'Email tidak valid';
    }

    if (!password) {
      newErrors.password = 'Password wajib diisi';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const success = login(email.trim(), password);
    if (!success) {
      setErrors({ form: 'Email atau password salah' });
      return;
    }

    navigate('/', { replace: true });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-red-700  p-4 select-none">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header Banner */}
        <div className='w-full flex justify-center pt-4'>
          <img src={logo} className='h-50' alt="" />
        </div>
        {/* <div className="bg-brand-blue px-8 py-8 text-center text-white">
          <h1 className="text-3xl font-bold tracking-[0.1em] m-0">K-POS</h1>
          <p className="mt-1.5 text-sm text-white/80 font-medium">
            Silakan masuk untuk melanjutkan
          </p>
        </div> */}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="p-8 flex flex-col gap-5">
          {errors.form && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded">
              {errors.form}
            </div>
          )}

          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-bold text-gray-700">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email || errors.form) {
                    setErrors((prev) => ({ ...prev, email: undefined, form: undefined }));
                  }
                }}
                placeholder="nama@email.com"
                className={`w-full pl-10 pr-3 py-2.5 rounded border text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-colors ${
                  errors.email ? 'border-red-400' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.email && (
              <span className="text-xs text-red-600 font-medium">{errors.email}</span>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-bold text-gray-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password || errors.form) {
                    setErrors((prev) => ({ ...prev, password: undefined, form: undefined }));
                  }
                }}
                placeholder="Masukkan password"
                className={`w-full pl-10 pr-11 py-2.5 rounded border text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-colors ${
                  errors.password ? 'border-red-400' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <span className="text-xs text-red-600 font-medium">{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className="mt-1 w-full py-3 bg-brand-blue hover:bg-brand-blue-hover active:scale-[0.98] text-white text-sm font-bold tracking-widest rounded shadow-sm hover:shadow-md transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-blue flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            MASUK
          </button>

          <p className="text-sm text-gray-500 font-medium text-center">
            Belum punya akun?{' '}
            <Link
              to="/register"
              className="font-bold text-brand-blue hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-brand-blue rounded"
            >
              Daftar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
