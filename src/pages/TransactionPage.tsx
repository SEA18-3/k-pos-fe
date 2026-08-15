import { useState } from 'react';
import { Header } from '../components/Header';
import { ProductCatalog } from '../components/ProductCatalog';
import { Cart } from '../components/Cart';
import { SuccessModal } from '../components/SuccessModal';
import { PRODUCTS } from '../store/items';
import { useCartStore } from '../store/cart';

export const TransactionPage = () => {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [dateStr, setDateStr] = useState('');

  // Complete checkout process and show Success Modal
  const handleCheckout = () => {
    if (items.length > 0) {
      setInvoiceNumber(`INV-${Math.floor(100000 + Math.random() * 900000)}`);
      setDateStr(new Date().toLocaleString());
      setIsCheckoutSuccess(true);
    }
  };

  // Close success modal and reset cart to start a new transaction
  const handleCloseModal = () => {
    setIsCheckoutSuccess(false);
    clearCart();
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
        isOpen={isCheckoutSuccess}
        cart={items}
        invoiceNumber={invoiceNumber}
        dateStr={dateStr}
        onClose={handleCloseModal}
      />
    </div>
  );
};
