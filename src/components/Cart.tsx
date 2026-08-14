import React from 'react';
import type { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  onUpdateQty: (productId: string, quantity: number) => void;
  onClear: () => void;
  onCheckout: () => void;
}

export const Cart: React.FC<CartProps> = ({
  cart,
  onUpdateQty,
  onClear,
  onCheckout,
}) => {
  // Math Calculations
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const total = subtotal;

  return (
    <div className="w-[535px] h-full flex flex-col justify-between bg-white flex-shrink-0 select-none">
      {/* Receipt Table Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[1fr_90px_110px] items-center h-11 border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-widest px-6">
          <div>Item</div>
          <div className="text-center">Qty</div>
          <div className="text-right">Total</div>
        </div>

        {/* Table Body */}
        <div className="flex-grow overflow-y-auto divide-y divide-gray-100">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="grid grid-cols-[1fr_90px_110px] items-center py-4 px-6 hover:bg-gray-50/50 transition-colors"
              >
                {/* Product Detail */}
                <div className="flex flex-col pr-4 overflow-hidden">
                  <span className="font-bold text-gray-900 text-sm truncate" title={item.product.name}>
                    {item.product.name}
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold tracking-wide mt-0.5">
                    {item.product.sku}
                  </span>
                </div>

                {/* Quantity Editor */}
                <div className="flex justify-center">
                  <div className="flex items-center justify-between border border-gray-200 rounded-md w-[76px] h-8 bg-gray-50 text-xs overflow-hidden">
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.product.id, item.quantity - 1)}
                      className="w-6 h-full flex items-center justify-center font-bold text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-bold text-gray-800">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                      className="w-6 h-full flex items-center justify-center font-bold text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="text-right font-black text-gray-900 text-sm">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8">
              <svg
                className="w-12 h-12 mb-3 text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <p className="text-sm font-semibold">Transaction cart is empty</p>
              <p className="text-xs text-gray-400 mt-1">Select items from the catalog</p>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Block Section */}
      <div className="border-t border-gray-200 bg-white p-6 flex flex-col gap-5 flex-shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">

        {/* Total Price Row */}
        <div className="flex items-end justify-between px-1">
          <span className="font-black text-gray-900 text-3xl tracking-wider select-none leading-none m-0">TOTAL</span>
          <span className="font-black text-brand-blue text-3xl select-none leading-none m-0">
            ${total.toFixed(2)}
          </span>
        </div>

        {/* Action Buttons Block */}
        <div className="flex gap-2">
          {/* Delete/Clear Button */}
          <button
            type="button"
            onClick={onClear}
            disabled={cart.length === 0}
            className={`w-[61px] h-16 flex items-center justify-center rounded border transition-colors cursor-pointer focus:outline-none ${
              cart.length === 0
                ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50'
                : 'border-brand-blue text-brand-blue hover:bg-red-50 hover:text-red-600 hover:border-red-600 active:bg-red-100'
            }`}
            title="Clear Cart"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>

          {/* Complete Transaction Button */}
          <button
            type="button"
            onClick={onCheckout}
            disabled={cart.length === 0}
            className={`flex-1 h-16 flex items-center justify-center gap-3 rounded text-base font-black tracking-widest text-white shadow-sm transition-all focus:outline-none cursor-pointer ${
              cart.length === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-brand-blue hover:bg-brand-blue-hover active:scale-[0.99] shadow-brand-blue/10 hover:shadow-md'
            }`}
          >
            COMPLETE TRANSACTION
            <svg
              className="w-5 h-5 text-white animate-pulse"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
