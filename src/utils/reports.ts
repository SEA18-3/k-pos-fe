import type { Transaction } from '../types';

export interface TodaySummary {
  totalTransactions: number;
  totalSales: number;
  provisional: number;
  settled: number;
  voided: number;
}

export interface SyncSummary {
  synced: number;
  pending: number;
  syncing: number;
  failed: number;
}

export function isToday(iso: string, now: Date = new Date()): boolean {
  const date = new Date(iso);
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

export function summarizeToday(transactions: Transaction[]): TodaySummary {
  let totalTransactions = 0;
  let totalSales = 0;
  let provisional = 0;
  let settled = 0;
  let voided = 0;

  for (const txn of transactions) {
    if (!isToday(txn.createdAt)) continue;
    totalTransactions += 1;
    totalSales += txn.total;
    if (txn.transactionStatus === 'PROVISIONAL') provisional += 1;
    else if (txn.transactionStatus === 'SETTLED') settled += 1;
    else if (txn.transactionStatus === 'VOIDED') voided += 1;
  }

  return { totalTransactions, totalSales, provisional, settled, voided };
}

export function summarizeSync(transactions: Transaction[]): SyncSummary {
  let synced = 0;
  let pending = 0;
  let syncing = 0;
  let failed = 0;

  for (const txn of transactions) {
    if (txn.syncStatus === 'SYNCED') synced += 1;
    else if (txn.syncStatus === 'PENDING') pending += 1;
    else if (txn.syncStatus === 'SYNCING') syncing += 1;
    else if (txn.syncStatus === 'FAILED') failed += 1;
  }

  return { synced, pending, syncing, failed };
}