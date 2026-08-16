import type { UserRole } from '../store/auth';

// Mengembalikan rute default (landing) untuk role tertentu.
// ADMIN dan ENTRY belum memiliki permission UI yang ditentukan requirement,
// jadi diarahkan ke halaman terminal /access-denied agar tidak terjadi
// redirect loop dan tidak diberikan akses secara asumsi.
export function getDefaultRoute(role: UserRole): string {
  switch (role) {
    case 'OWNER':
      return '/reports';
    case 'OPERATOR':
      return '/';
    case 'ADMIN':
    case 'ENTRY':
      return '/access-denied';
  }
}