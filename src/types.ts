export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type TransactionStatus = 'PROVISIONAL' | 'SETTLED' | 'VOIDED';

export type SyncStatus = 'PENDING' | 'SYNCING' | 'SYNCED' | 'FAILED';

export interface Transaction {
  id: string;
  invoiceNumber: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  transactionStatus: TransactionStatus;
  syncStatus: SyncStatus;
}
