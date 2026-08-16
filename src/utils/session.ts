import type { AuthUser } from '../store/auth';

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

const STORAGE_KEY = 'kpos.auth.session';

const VALID_ROLES = ['ADMIN', 'OWNER', 'OPERATOR', 'ENTRY'];

// Restore session dari localStorage saat aplikasi bootstrap.
// JSON corrupted/invalid tidak boleh membuat app crash — langsung clear.
export function loadAuthSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed: unknown = JSON.parse(raw);
    if (!isValidSession(parsed)) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // localStorage tidak tersedia — biarkan memori kosong.
    }
    return null;
  }
}

export function saveAuthSession(session: AuthSession): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Quota/private mode — session tetap hidup di memori untuk sesi ini.
  }
}

export function clearAuthSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}

function isValidSession(value: unknown): value is AuthSession {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const session = value as Record<string, unknown>;
  const user = session.user;
  if (typeof session.accessToken !== 'string' || typeof session.refreshToken !== 'string') {
    return false;
  }
  if (typeof user !== 'object' || user === null) {
    return false;
  }
  const userRecord = user as Record<string, unknown>;
  return (
    typeof userRecord.name === 'string' &&
    typeof userRecord.email === 'string' &&
    typeof userRecord.role === 'string' &&
    VALID_ROLES.includes(userRecord.role)
  );
}