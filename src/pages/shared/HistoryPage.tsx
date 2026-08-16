import React from 'react';
import { Link } from 'react-router-dom';
import { ReceiptText, ArrowLeft } from 'lucide-react';
import { Header } from '../../components/Header';
import { StatusBadge } from '../../components/StatusBadge';
import { useTransactionStore } from '../../store/transactions';
import { formatIDR, formatDateTime } from '../../utils/format';

export const HistoryPage: React.FC = () => {
  const transactions = useTransactionStore((state) => state.transactions);

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-slate-100">
      <Header />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {/* Page Header */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue"
              aria-label="Back to POS"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-xl font-black text-gray-900 tracking-wide m-0">Transaction History</h1>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                {transactions.length} transaction{transactions.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>

          {/* Transaction List */}
          {transactions.length > 0 ? (
            <div className="flex flex-col gap-3">
              {transactions.map((transaction) => (
                <Link
                  key={transaction.id}
                  to={`/history/${transaction.id}`}
                  className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate">
                      {transaction.invoiceNumber}
                    </p>
                    <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                      {formatDateTime(transaction.createdAt)} ·{' '}
                      {transaction.items.reduce((sum, item) => sum + item.quantity, 0)} items
                    </p>
                  </div>
                  <div className="hidden sm:flex flex-col items-end gap-1">
                    <StatusBadge type="transaction" status={transaction.transactionStatus} />
                    <StatusBadge type="sync" status={transaction.syncStatus} />
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <span className="font-black text-brand-blue text-sm">
                      {formatIDR(transaction.total)}
                    </span>
                    <span className="sm:hidden flex gap-1">
                      <StatusBadge type="transaction" status={transaction.transactionStatus} />
                      <StatusBadge type="sync" status={transaction.syncStatus} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="h-full min-h-[320px] flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-400 p-8">
              <ReceiptText className="w-12 h-12 mb-3 text-gray-200" />
              <p className="text-sm font-semibold">Belum ada transaksi</p>
              <p className="text-xs text-gray-400 mt-1">
                Transaksi yang dibuat dari POS akan muncul di sini
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
