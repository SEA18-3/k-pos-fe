import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ReceiptText } from 'lucide-react';
import { Header } from '../../components/Header';
import { StatusBadge } from '../../components/StatusBadge';
import { useConnectionStore } from '../../store/connection';
import { useTransactionStore } from '../../store/transactions';
import { formatDateTime, formatIDR } from '../../utils/format';
import { summarizeSync, summarizeToday } from '../../utils/reports';

const NETWORK_META: Record<string, { label: string; dot: string }> = {
  online: { label: 'Online', dot: 'bg-emerald-500' },
  offline: { label: 'Offline', dot: 'bg-slate-400' },
};

const BACKEND_META: Record<string, { label: string; dot: string }> = {
  reachable: { label: 'Reachable', dot: 'bg-emerald-500' },
  unreachable: { label: 'Unreachable', dot: 'bg-red-500' },
  unknown: { label: 'Checking', dot: 'bg-amber-500' },
};

interface ReportSectionProps {
  title: string;
  children: React.ReactNode;
}

const ReportSection: React.FC<ReportSectionProps> = ({ title, children }) => (
  <section className="flex flex-col gap-3">
    <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
      {title}
    </h2>
    {children}
  </section>
);

export const ReportsPage: React.FC = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const networkStatus = useConnectionStore((state) => state.networkStatus);
  const backendStatus = useConnectionStore((state) => state.backendStatus);

  const today = summarizeToday(transactions);
  const sync = summarizeSync(transactions);
  const recentTransactions = transactions.slice(0, 5);
  const todayLabel = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const networkMeta = NETWORK_META[networkStatus];
  const backendMeta = BACKEND_META[backendStatus];

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-slate-100">
      <Header />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-5">
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
              <h1 className="text-xl font-black text-gray-900 tracking-wide m-0">Reports</h1>
              <p className="text-xs text-gray-500 font-medium mt-0.5">{todayLabel}</p>
            </div>
          </div>

          {/* Today's Transactions */}
          <ReportSection title="Today's Transactions">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Total Transactions
                </span>
                <span className="text-2xl font-black text-gray-900 leading-tight">
                  {today.totalTransactions}
                </span>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Total Sales
                </span>
                <span className="text-lg sm:text-xl font-black text-brand-blue leading-tight break-words">
                  {formatIDR(today.totalSales)}
                </span>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-1">
                <StatusBadge type="transaction" status="PROVISIONAL" />
                <span className="text-2xl font-black text-gray-900 leading-tight">
                  {today.provisional}
                </span>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-1">
                <StatusBadge type="transaction" status="SETTLED" />
                <span className="text-2xl font-black text-gray-900 leading-tight">
                  {today.settled}
                </span>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-1">
                <StatusBadge type="transaction" status="VOIDED" />
                <span className="text-2xl font-black text-gray-900 leading-tight">
                  {today.voided}
                </span>
              </div>
            </div>
          </ReportSection>

          {/* Sync Status */}
          <ReportSection title="Sync Status">
            <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col divide-y divide-gray-100">
              <div className="flex items-center justify-between py-2">
                <StatusBadge type="sync" status="SYNCED" />
                <span className="font-black text-gray-900 text-lg">{sync.synced}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <StatusBadge type="sync" status="PENDING" />
                <span className="font-black text-gray-900 text-lg">{sync.pending}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <StatusBadge type="sync" status="SYNCING" />
                <span className="font-black text-gray-900 text-lg">{sync.syncing}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <StatusBadge type="sync" status="FAILED" />
                <span className="font-black text-gray-900 text-lg">{sync.failed}</span>
              </div>
            </div>
          </ReportSection>

          {/* Recent Transactions */}
          <ReportSection title="Recent Transactions">
            {recentTransactions.length > 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100 overflow-hidden">
                {recentTransactions.map((transaction) => (
                  <Link
                    key={transaction.id}
                    to={`/history/${transaction.id}`}
                    className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-blue"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-gray-900 text-sm truncate">
                        {transaction.invoiceNumber}
                      </p>
                      <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                        {formatDateTime(transaction.createdAt)}
                      </p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1">
                      <span className="font-black text-brand-blue text-sm">
                        {formatIDR(transaction.total)}
                      </span>
                      <span className="flex flex-wrap justify-end gap-1">
                        <StatusBadge type="transaction" status={transaction.transactionStatus} />
                        <StatusBadge type="sync" status={transaction.syncStatus} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-400 p-8">
                <ReceiptText className="w-10 h-10 mb-3 text-gray-200" />
                <p className="text-sm font-semibold">Belum ada transaksi</p>
                <p className="text-xs text-gray-400 mt-1">
                  Transaksi yang dibuat dari POS akan muncul di sini
                </p>
              </div>
            )}
          </ReportSection>

          {/* System Status */}
          <ReportSection title="System Status">
            <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-700">Network</span>
                <span className="flex items-center gap-2 text-xs font-bold text-gray-800">
                  <span className={`w-2.5 h-2.5 rounded-full ${networkMeta.dot}`} />
                  {networkMeta.label}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-700">Backend</span>
                <span className="flex items-center gap-2 text-xs font-bold text-gray-800">
                  <span className={`w-2.5 h-2.5 rounded-full ${backendMeta.dot}`} />
                  {backendMeta.label}
                </span>
              </div>
            </div>
          </ReportSection>
        </div>
      </main>
    </div>
  );
};