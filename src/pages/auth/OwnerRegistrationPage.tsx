import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Store, Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import logo from '/logo.png';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  merchantName?: string;
  form?: string;
}

const INPUT_CLASS =
  'w-full pl-10 pr-3 py-2.5 rounded border text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-colors';

const PASSWORD_INPUT_CLASS =
  'w-full pl-10 pr-11 py-2.5 rounded border text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-colors';

const EYE_TOGGLE_CLASS =
  'absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue rounded cursor-pointer';

export const OwnerRegistrationPage: React.FC = () => {
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [merchantName, setMerchantName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);
  const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Bersihkan timer redirect jika halaman ditinggalkan sebelum redirect jalan.
  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
      }
    };
  }, []);

  const clearFieldError = (field: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined, form: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Nama wajib diisi';
    }

    if (!email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!EMAIL_REGEX.test(email.trim())) {
      newErrors.email = 'Email tidak valid';
    }

    if (!password) {
      newErrors.password = 'Password wajib diisi';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password wajib diisi';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }

    if (!merchantName.trim()) {
      newErrors.merchantName = 'Nama toko wajib diisi';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    const result = await register({
      name: name.trim(),
      email: email.trim(),
      password,
      merchantName: merchantName.trim(),
    });
    setSubmitting(false);

    if (!result.ok) {
      setErrors({ form: result.error });
      return;
    }

    // Akun berhasil dibuat. Backend tidak memberikan session, jadi user harus
    // login eksplisit — arahkan ke /login (replace agar /register tidak kembali).
    setRegistered(true);
    redirectTimerRef.current = setTimeout(() => {
      navigate('/login', { replace: true });
    }, 1500);
  };

  return (
    <div className="w-screen h-screen overflow-y-auto bg-red-700 p-4 select-none">
      <div className="min-h-full flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Logo */}
          <div className="w-full flex justify-center pt-4">
            <img src={logo} className="h-50" alt="" />
          </div>

          {/* Form */}
          <div className="p-8 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-black text-gray-900 tracking-wide m-0">
                Daftar Akun Owner
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                Daftarkan akun Owner beserta toko (merchant) Anda.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              {registered && (
                <div
                  role="status"
                  className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium px-4 py-3 rounded"
                >
                  Akun berhasil dibuat. Silakan masuk dengan akun baru Anda.
                </div>
              )}

              {errors.form && (
                <div
                  role="alert"
                  className="bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded"
                >
                  {errors.form}
                </div>
              )}

              {/* Account Section */}
              <div className="flex flex-col gap-3">
                <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Account
                </h2>

                {/* Name Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-bold text-gray-700">
                    Nama
                  </label>
                  <div className="relative">
                    <User aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        clearFieldError('name');
                      }}
                      placeholder="Nama lengkap"
                      aria-invalid={errors.name ? true : undefined}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={`${INPUT_CLASS} ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
                    />
                  </div>
                  {errors.name && (
                    <span id="name-error" className="text-xs text-red-600 font-medium">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-bold text-gray-700">
                    Email
                  </label>
                  <div className="relative">
                    <Mail aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clearFieldError('email');
                      }}
                      placeholder="nama@email.com"
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`${INPUT_CLASS} ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                    />
                  </div>
                  {errors.email && (
                    <span id="email-error" className="text-xs text-red-600 font-medium">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="password" className="text-sm font-bold text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <Lock aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        clearFieldError('password');
                      }}
                      placeholder="Buat password"
                      aria-invalid={errors.password ? true : undefined}
                      aria-describedby={errors.password ? 'password-error' : undefined}
                      className={`${PASSWORD_INPUT_CLASS} ${errors.password ? 'border-red-400' : 'border-gray-300'}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className={EYE_TOGGLE_CLASS}
                      aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                    >
                      {showPassword ? (
                        <EyeOff aria-hidden="true" className="w-5 h-5" />
                      ) : (
                        <Eye aria-hidden="true" className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <span id="password-error" className="text-xs text-red-600 font-medium">
                      {errors.password}
                    </span>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="confirmPassword" className="text-sm font-bold text-gray-700">
                    Konfirmasi Password
                  </label>
                  <div className="relative">
                    <Lock aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        clearFieldError('confirmPassword');
                      }}
                      placeholder="Ulangi password"
                      aria-invalid={errors.confirmPassword ? true : undefined}
                      aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                      className={`${PASSWORD_INPUT_CLASS} ${errors.confirmPassword ? 'border-red-400' : 'border-gray-300'}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className={EYE_TOGGLE_CLASS}
                      aria-label={
                        showConfirmPassword
                          ? 'Sembunyikan konfirmasi password'
                          : 'Tampilkan konfirmasi password'
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff aria-hidden="true" className="w-5 h-5" />
                      ) : (
                        <Eye aria-hidden="true" className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span id="confirmPassword-error" className="text-xs text-red-600 font-medium">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
              </div>

              {/* Merchant Section */}
              <div className="flex flex-col gap-3">
                <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Merchant
                </h2>
                <p className="text-xs text-gray-500 font-medium">
                  Toko (merchant) ini akan menjadi milik akun Owner yang Anda daftarkan.
                </p>

                {/* Merchant Name Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="merchantName" className="text-sm font-bold text-gray-700">
                    Nama Toko
                  </label>
                  <div className="relative">
                    <Store aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="merchantName"
                      type="text"
                      autoComplete="organization"
                      value={merchantName}
                      onChange={(e) => {
                        setMerchantName(e.target.value);
                        clearFieldError('merchantName');
                      }}
                      placeholder="Nama toko Anda"
                      aria-invalid={errors.merchantName ? true : undefined}
                      aria-describedby={errors.merchantName ? 'merchantName-error' : undefined}
                      className={`${INPUT_CLASS} ${errors.merchantName ? 'border-red-400' : 'border-gray-300'}`}
                    />
                  </div>
                  {errors.merchantName && (
                    <span id="merchantName-error" className="text-xs text-red-600 font-medium">
                      {errors.merchantName}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-1 w-full py-3 bg-brand-blue hover:bg-brand-blue-hover active:scale-[0.98] text-white text-sm font-bold tracking-widest rounded shadow-sm hover:shadow-md transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-blue flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <UserPlus aria-hidden="true" className="w-4 h-4" />
                {submitting ? 'MENGIRIM...' : 'DAFTAR'}
              </button>

              <p className="text-sm text-gray-500 font-medium text-center">
                Sudah punya akun?{' '}
                <Link
                  to="/login"
                  className="font-bold text-brand-blue hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-brand-blue rounded"
                >
                  Masuk
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};