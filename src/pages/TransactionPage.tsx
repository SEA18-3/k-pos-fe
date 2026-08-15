import { useState } from 'react';
import { Header } from '../components/Header';
import { ProductCatalog } from '../components/ProductCatalog';
import { Cart } from '../components/Cart';
import { SuccessModal } from '../components/SuccessModal';
import { PRODUCTS } from '../store/items';
import { useCartStore } from '../store/cart';
import { useTransactionStore } from '../store/transactions';
import type { Transaction } from '../types';

export const TransactionPage = () => {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const createTransaction = useTransactionStore((state) => state.createTransaction);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTransaction, setActiveTransaction] = useState<Transaction | null>(null);

  // Complete checkout process, create a real transaction, then show Success Modal
  const handleCheckout = () => {
    if (items.length > 0) {
      setActiveTransaction(createTransaction(items));
      clearCart();
    }
  };

  // Close success modal and reset active transaction
  const handleCloseModal = () => {
    setActiveTransaction(null);
  };

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-slate-100">
      {/* Top Application Bar */}
      <Header />

      {/* Main Terminal Screen Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Column - Product Catalog Grid */}
        <ProductCatalog
          products={PRODUCTS}
          onAddProduct={addItem}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Right Column - Transaction Cart Panel */}
        <Cart
          cart={items}
          onUpdateQty={updateQuantity}
          onClear={clearCart}
          onCheckout={handleCheckout}
        />
      </main>

      {/* Success checkout popup */}
      <SuccessModal
        transaction={activeTransaction}
        onClose={handleCloseModal}
      />
    </div>
  );
};
