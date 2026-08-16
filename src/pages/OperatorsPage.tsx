import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, UserPlus, X, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Header } from '../components/Header';
import { formatDateTime } from '../utils/format';
import {
  useOperatorStore,
  type Operator,
} from '../store/operators';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INPUT_CLASS =
  'w-full pl-10 pr-3 py-2.5 rounded border text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-colors';

const PASSWORD_INPUT_CLASS =
  'w-full pl-10 pr-11 py-2.5 rounded border text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-colors';

const EYE_TOGGLE_CLASS =
  'absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue rounded cursor-pointer';

const OperatorStatus: React.FC<{ active: boolean }> = ({ active }) => (
  <span
    className={`inline-block px-2 py-0.5 rounded border text-[10px] font-bold tracking-wide ${
      active ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'
    }`}
  >
    {active ? 'ACTIVE' : 'INACTIVE'}
  </span>
);

interface AddFormErrors {
  name?: string;
  email?: string;
  password?: string;
  form?: string;
}

interface AddOperatorModalProps {
  onClose: () => void;
}

const AddOperatorModal: React.FC<AddOperatorModalProps> = ({ onClose }) => {
  const createOperator = useOperatorStore((state) => state.createOperator);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<AddFormErrors>({});
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const clearFieldError = (field: 'name' | 'email' | 'password') => {
    setErrors((prev) => ({ ...prev, [field]: undefined, form: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: AddFormErrors = {};

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

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const result = createOperator({ name: name.trim(), email: email.trim(), password });
    if (!result.ok) {
      setErrors({ form: result.error });
      return;
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 select-none"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-operator-title"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 id="add-operator-title" className="text-lg font-black text-gray-900 tracking-wide m-0">
            Tambah Operator
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue"
            aria-label="Tutup"
          >
            <X aria-hidden="true" className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} noValidate className="p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Operator
            </h3>

            {/* Name Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="op-name" className="text-sm font-bold text-gray-700">
                Nama
              </label>
              <div className="relative">
                <User aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  ref={nameInputRef}
                  id="op-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    clearFieldError('name');
                  }}
                  placeholder="Nama operator"
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? 'op-name-error' : undefined}
                  className={`${INPUT_CLASS} ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
                />
              </div>
              {errors.name && (
                <span id="op-name-error" className="text-xs text-red-600 font-medium">
                  {errors.name}
                </span>
              )}
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="op-email" className="text-sm font-bold text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="op-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearFieldError('email');
                  }}
                  placeholder="nama@email.com"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? 'op-email-error' : undefined}
                  className={`${INPUT_CLASS} ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                />
              </div>
              {errors.email && (
                <span id="op-email-error" className="text-xs text-red-600 font-medium">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="op-password" className="text-sm font-bold text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="op-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearFieldError('password');
                  }}
                  placeholder="Buat password"
                  aria-invalid={errors.password ? true : undefined}
                  aria-describedby={errors.password ? 'op-password-error' : undefined}
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
                <span id="op-password-error" className="text-xs text-red-600 font-medium">
                  {errors.password}
                </span>
              )}
            </div>
          </div>

          {errors.form && (
            <div
              role="alert"
              className="bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded"
            >
              {errors.form}
            </div>
          )}

          <button
            type="submit"
            className="mt-1 w-full py-3 bg-brand-blue hover:bg-brand-blue-hover active:scale-[0.98] text-white text-sm font-bold tracking-widest rounded shadow-sm hover:shadow-md transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-blue flex items-center justify-center gap-2"
          >
            <UserPlus aria-hidden="true" className="w-4 h-4" />
            TAMBAH OPERATOR
          </button>
        </form>
      </div>
    </div>
  );
};

interface ToggleOperatorModalProps {
  operator: Operator;
  nextActive: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ToggleOperatorModal: React.FC<ToggleOperatorModalProps> = ({
  operator,
  nextActive,
  onConfirm,
  onClose,
}) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const actionLabel = nextActive ? 'Aktifkan' : 'Nonaktifkan';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    cancelButtonRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 select-none"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="toggle-operator-title"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 id="toggle-operator-title" className="text-lg font-black text-gray-900 tracking-wide m-0">
            {actionLabel} Operator
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue"
            aria-label="Tutup"
          >
            <X aria-hidden="true" className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col gap-5">
          <p className="text-sm text-gray-700 font-medium">
            Operator{' '}
            <span className="font-black text-gray-900">{operator.name}</span> ({operator.email}) akan{' '}
            {nextActive ? 'diaktifkan kembali' : 'dinonaktifkan'}. Operator tetap tersimpan dalam
            daftar dan tidak akan dihapus.
          </p>

          <div className="flex gap-3">
            <button
              ref={cancelButtonRef}
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-[0.98] text-sm font-bold tracking-widest rounded shadow-sm transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-blue"
            >
              BATAL
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 py-3 bg-brand-blue hover:bg-brand-blue-hover active:scale-[0.98] text-white text-sm font-bold tracking-widest rounded shadow-sm hover:shadow-md transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-blue"
            >
              {actionLabel.toUpperCase()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OperatorsPage: React.FC = () => {
  const operators = useOperatorStore((state) => state.operators);
  const setOperatorActive = useOperatorStore((state) => state.setOperatorActive);
  const [addOpen, setAddOpen] = useState(false);
  const [pendingToggle, setPendingToggle] = useState<{ operator: Operator; nextActive: boolean } | null>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);

  const openAddModal = () => setAddOpen(true);

  const closeAddModal = () => {
    setAddOpen(false);
    addButtonRef.current?.focus();
  };

  const openToggleModal = (operator: Operator, nextActive: boolean) => {
    setPendingToggle({ operator, nextActive });
  };

  const closeToggleModal = () => setPendingToggle(null);

  const confirmToggle = () => {
    if (pendingToggle) {
      setOperatorActive(pendingToggle.operator.id, pendingToggle.nextActive);
    }
    setPendingToggle(null);
  };

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-slate-100">
      <Header />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {/* Page Header */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue"
              aria-label="Back to POS"
            >
              <ArrowLeft aria-hidden="true" className="w-4 h-4" />
            </Link>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-black text-gray-900 tracking-wide m-0">Operators</h1>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Kelola akun operator untuk toko Anda.
              </p>
            </div>
            <button
              ref={addButtonRef}
              type="button"
              onClick={openAddModal}
              className="px-4 py-2 bg-brand-blue hover:bg-brand-blue-hover active:scale-[0.98] text-white text-xs font-bold tracking-widest rounded shadow-sm hover:shadow-md transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-blue flex items-center gap-2"
            >
              <UserPlus aria-hidden="true" className="w-4 h-4" />
              + TAMBAH OPERATOR
            </button>
          </div>

          {/* Operator List */}
          <section className="flex flex-col gap-3">
            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
              Daftar Operator
            </h2>

            {operators.length > 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100 overflow-hidden">
                {operators.map((operator) => (
                  <div key={operator.id} className="flex items-center gap-3 px-5 py-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-sm truncate" title={operator.name}>
                        {operator.name}
                      </p>
                      <p className="text-[11px] text-gray-400 font-medium mt-0.5 truncate" title={operator.email}>
                        {operator.email}
                      </p>
                    </div>
                    <span className="text-[11px] text-gray-400 font-medium hidden sm:block">
                      {formatDateTime(operator.createdAt)}
                    </span>
                    <OperatorStatus active={operator.isActive} />
                    <button
                      type="button"
                      onClick={() => openToggleModal(operator, !operator.isActive)}
                      className="px-3 py-2 rounded text-xs font-bold tracking-widest text-brand-blue hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    >
                      {operator.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="h-full min-h-[320px] flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-400 p-8">
                <Users aria-hidden="true" className="w-12 h-12 mb-3 text-gray-200" />
                <p className="text-sm font-semibold">Belum ada operator</p>
                <p className="text-xs text-gray-400 mt-1">
                  Tambahkan operator pertama untuk mulai mengelola akses toko.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      {addOpen && <AddOperatorModal onClose={closeAddModal} />}

      {pendingToggle && (
        <ToggleOperatorModal
          operator={pendingToggle.operator}
          nextActive={pendingToggle.nextActive}
          onConfirm={confirmToggle}
          onClose={closeToggleModal}
        />
      )}
    </div>
  );
};