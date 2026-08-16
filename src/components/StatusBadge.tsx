import React from 'react';
import type { SyncStatus, TransactionStatus } from '../types';

interface StatusBadgeProps {
  type: 'transaction' | 'sync';
  status: TransactionStatus | SyncStatus;
}

const TRANSACTION_STYLES: Record<TransactionStatus, string> = {
  PROVISIONAL: 'bg-amber-50 text-amber-700 border-amber-200',
  SETTLED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  VOIDED: 'bg-slate-100 text-slate-600 border-slate-200',
};

const SYNC_STYLES: Record<SyncStatus, string> = {
  PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
  SYNCING: 'bg-sky-50 text-sky-700 border-sky-200',
  SYNCED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  FAILED: 'bg-red-50 text-red-700 border-red-200',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ type, status }) => {
  const className =
    type === 'transaction'
      ? TRANSACTION_STYLES[status as TransactionStatus]
      : SYNC_STYLES[status as SyncStatus];

  return (
    <span
      className={`inline-block px-2 py-0.5 rounded border text-[10px] font-bold tracking-wide ${className}`}
    >
      {status}
    </span>
  );
};
