import React from 'react';
import type { CartItem } from '../types';

interface SuccessModalProps {
  isOpen: boolean;
  cart: CartItem[];
  invoiceNumber: string;
  dateStr: string;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  cart,
  invoiceNumber,
  dateStr,
  onClose,
}) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 select-none">
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden animate-[scaleIn_0.3s_ease-out] flex flex-col">
        
        {/* Success Header Banner */}
        <div className="bg-emerald-600 p-6 text-center text-white flex flex-col items-center gap-2">
          {/* Animated Checkmark Icon */}
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center animate-bounce mb-1">
            <svg
              className="w-8 h-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold tracking-wide m-0">TRANSACTION COMPLETED</h2>
          <p className="text-emerald-100 text-xs font-semibold tracking-wider">
            POS Terminal Payment Approved
          </p>
        </div>

        {/* Invoice Summary Content */}
        <div className="p-6 flex-1 flex flex-col gap-4 overflow-y-auto max-h-[350px]">
          {/* Meta Info */}
          <div className="flex justify-between items-center text-xs text-gray-500 border-b border-gray-100 pb-3 font-medium">
            <div>
              <p className="font-bold text-gray-800">Invoice: {invoiceNumber}</p>
              <p className="mt-0.5">{dateStr}</p>
            </div>
            <div className="text-right">
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                PAID
              </span>
            </div>
          </div>

          {/* Items Receipt Table */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-1.5">
              Receipt Details
            </h3>
            <div className="flex flex-col gap-2.5 divide-y divide-gray-50 max-h-[180px] overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between items-start text-xs pt-2.5 first:pt-0"
                >
                  <div className="flex flex-col max-w-[240px]">
                    <span className="font-bold text-gray-800 truncate">
                      {item.product.name}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold mt-0.5">
                      {item.product.sku} (x{item.quantity})
                    </span>
                  </div>
                  <span className="font-bold text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Calculations Breakdown */}
          <div className="border-t border-gray-150 pt-3 flex flex-col gap-2 text-xs">
            <div className="flex justify-between text-gray-500 font-medium">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500 font-medium">
              <span>Sales Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-black text-gray-900 border-t border-dashed border-gray-200 pt-2.5 mt-1">
              <span className="tracking-wide">TOTAL PAID</span>
              <span className="text-lg text-emerald-600">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-center">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-sm font-bold tracking-widest rounded shadow-sm hover:shadow-md transition-all cursor-pointer focus:outline-none"
          >
            NEW TRANSACTION
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
