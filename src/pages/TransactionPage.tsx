import { useState } from 'react';
import { Header } from '../components/Header';
import { ProductCatalog } from '../components/ProductCatalog';
import { Cart } from '../components/Cart';
import { SuccessModal } from '../components/SuccessModal';
import { PRODUCTS } from '../store/items';
import type { Product, CartItem } from '../types';

// Initial mock cart items preset to replicate the exact state in Figma screenshot
const INITIAL_CART: CartItem[] = [
  {
    product: PRODUCTS[1],
    quantity: 2,
  },
  {
    product: PRODUCTS[2],
    quantity: 2,
  },
  {
    product: PRODUCTS[0],
    quantity: 2,
  },
];

export const TransactionPage = () => {
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [dateStr, setDateStr] = useState('');

  // Add a product to the cart (or increment quantity if already exists)
  const handleAddProduct = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  // Update item quantity in the cart (removes item if quantity reaches 0)
  const handleUpdateQty = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  // Clear/Reset the Cart state
  const handleClearCart = () => {
    setCart([]);
  };

  // Complete checkout process and show Success Modal
  const handleCheckout = () => {
    if (cart.length > 0) {
      setInvoiceNumber(`INV-${Math.floor(100000 + Math.random() * 900000)}`);
      setDateStr(new Date().toLocaleString());
      setIsCheckoutSuccess(true);
    }
  };

  // Close success modal and reset cart to start a new transaction
  const handleCloseModal = () => {
    setIsCheckoutSuccess(false);
    setCart([]);
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
          onAddProduct={handleAddProduct}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Right Column - Transaction Cart Panel */}
        <Cart
          cart={cart}
          onUpdateQty={handleUpdateQty}
          onClear={handleClearCart}
          onCheckout={handleCheckout}
        />
      </main>

      {/* Success checkout popup */}
      <SuccessModal
        isOpen={isCheckoutSuccess}
        cart={cart}
        invoiceNumber={invoiceNumber}
        dateStr={dateStr}
        onClose={handleCloseModal}
      />
    </div>
  );
};
