import { create } from 'zustand';
import type { CartItem, SyncStatus, Transaction, TransactionStatus } from '../types';

const calculateTotal = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

const generateInvoiceNumber = (existing: Transaction[]): string => {
  const now = new Date();
  const datePrefix = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  const sequence =
    existing.filter((txn) => txn.invoiceNumber.startsWith(`INV-${datePrefix}`)).length + 1;
  return `INV-${datePrefix}-${String(sequence).padStart(3, '0')}`;
};

interface TransactionStore {
  transactions: Transaction[];
  createTransaction: (items: CartItem[]) => Transaction;
  getTransactionById: (id: string) => Transaction | undefined;
  setTransactionStatus: (id: string, status: TransactionStatus) => void;
  setSyncStatus: (id: string, status: SyncStatus) => void;
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],
  createTransaction: (items) => {
    const transaction: Transaction = {
      id: crypto.randomUUID(),
      invoiceNumber: generateInvoiceNumber(get().transactions),
      items,
      total: calculateTotal(items),
      createdAt: new Date().toISOString(),
      transactionStatus: 'PROVISIONAL',
      syncStatus: 'PENDING',
    };
    set((state) => ({ transactions: [transaction, ...state.transactions] }));
    return transaction;
  },
  getTransactionById: (id) =>
    get().transactions.find((txn) => txn.id === id),
  setTransactionStatus: (id, status) =>
    set((state) => ({
      transactions: state.transactions.map((txn) =>
        txn.id === id ? { ...txn, transactionStatus: status } : txn
      ),
    })),
  setSyncStatus: (id, status) =>
    set((state) => ({
      transactions: state.transactions.map((txn) =>
        txn.id === id ? { ...txn, syncStatus: status } : txn
      ),
    })),
}));
