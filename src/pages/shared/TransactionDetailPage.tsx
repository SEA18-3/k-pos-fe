import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, SearchX } from 'lucide-react';
import { Header } from '../../components/Header';
import { StatusBadge } from '../../components/StatusBadge';
import { useTransactionStore } from '../../store/transactions';
import { formatIDR, formatDateTime } from '../../utils/format';

export const TransactionDetailPage: React.FC = () => {
  const { transactionId } = useParams<{ transactionId: string }>();
  const transaction = useTransactionStore((state) =>
    state.transactions.find((txn) => txn.id === transactionId)
  );

  if (!transaction) {
    return (
      <div className="w-screen h-screen flex flex-col overflow-hidden bg-slate-100">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto h-full min-h-[320px] flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-400 p-8">
            <SearchX className="w-12 h-12 mb-3 text-gray-200" />
            <p className="text-sm font-semibold">Transaction not found</p>
            <p className="text-xs text-gray-400 mt-1">Transaksi tidak ditemukan</p>
            <Link
              to="/history"
              className="mt-4 px-4 py-2 bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold tracking-widest rounded shadow-sm hover:shadow-md transition-all"
            >
              BACK TO HISTORY
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-slate-100">
      <Header />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          {/* Page Header */}
          <div className="flex items-center gap-3">
            <Link
              to="/history"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue"
              aria-label="Back to history"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-black text-gray-900 tracking-wide m-0 truncate">
                {transaction.invoiceNumber}
              </h1>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                {formatDateTime(transaction.createdAt)}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <StatusBadge type="transaction" status={transaction.transactionStatus} />
              <StatusBadge type="sync" status={transaction.syncStatus} />
            </div>
          </div>

          {/* Transaction Card */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Items Table */}
            <div className="px-6 py-4 flex flex-col divide-y divide-gray-100">
              {transaction.items.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between py-3 first:pt-0">
                  <div className="flex flex-col pr-4 overflow-hidden">
                    <span className="font-bold text-gray-900 text-sm truncate">
                      {item.product.name}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold mt-0.5">
                      {item.product.sku} (x{item.quantity})
                    </span>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="text-[10px] text-gray-400 font-bold">
                      {formatIDR(item.product.price)} × {item.quantity}
                    </span>
                    <span className="font-black text-gray-900 text-sm">
                      {formatIDR(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex items-center justify-between">
              <span className="font-black text-gray-900 text-sm tracking-wide">TOTAL</span>
              <span className="font-black text-brand-blue text-lg">
                {formatIDR(transaction.total)}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
