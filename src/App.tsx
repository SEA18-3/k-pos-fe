import { useState } from 'react';
import { Header } from './components/Header';
import { ProductCatalog } from './components/ProductCatalog';
import { Cart } from './components/Cart';
import { SuccessModal } from './components/SuccessModal';
import type { Product, CartItem } from './types';

// Import local assets
import planetaryGearImg from './assets/planetary_gear.jpg';
import pneumaticValveImg from './assets/pneumatic_valve.jpg';
import hexBoltImg from './assets/hex_bolt.jpg';

// Catalog Products List
const PRODUCTS: Product[] = [
  {
    id: 'planetary-gear',
    name: 'Planetary Gear',
    sku: 'SKU-892A',
    price: 72.75, // Qty 2 = $145.50
    image: planetaryGearImg,
    category: 'Gears',
  },
  {
    id: 'pneumatic-valve',
    name: 'Pneumatic Valve',
    sku: 'VAL-104',
    price: 89.00, // Qty 2 = $178.00
    image: pneumaticValveImg,
    category: 'Valves',
  },
  {
    id: 'hex-bolt-m12',
    name: 'Hex Bolt M12',
    sku: 'FST-991',
    price: 37.50, // Qty 2 = $75.00
    image: hexBoltImg,
    category: 'Fasteners',
  },
  {
    id: 'planetary-gear-heavy',
    name: 'Planetary Gear Heavy',
    sku: 'SKU-894C',
    price: 210.00,
    image: planetaryGearImg,
    category: 'Gears',
  },
  {
    id: 'high-pressure-valve',
    name: 'High-Pressure Valve',
    sku: 'VAL-108',
    price: 145.00,
    image: pneumaticValveImg,
    category: 'Valves',
  },
  {
    id: 'hex-bolt-m16',
    name: 'Hex Bolt M16',
    sku: 'FST-992',
    price: 45.00,
    image: hexBoltImg,
    category: 'Fasteners',
  },
  {
    id: 'planetary-gear-pro',
    name: 'Planetary Gear Pro',
    sku: 'SKU-892B',
    price: 120.00,
    image: planetaryGearImg,
    category: 'Gears',
  },
  {
    id: 'needle-valve',
    name: 'Needle Valve',
    sku: 'VAL-201',
    price: 95.00,
    image: pneumaticValveImg,
    category: 'Valves',
  },
  {
    id: 'anchor-hex-bolt',
    name: 'Anchor Hex Bolt',
    sku: 'FST-995',
    price: 55.00,
    image: hexBoltImg,
    category: 'Fasteners',
  },
  {
    id: 'mini-planetary-gear',
    name: 'Mini Planetary Gear',
    sku: 'SKU-890A',
    price: 48.50,
    image: planetaryGearImg,
    category: 'Gears',
  },
  {
    id: 'brass-flow-valve',
    name: 'Brass Flow Valve',
    sku: 'VAL-102',
    price: 68.00,
    image: pneumaticValveImg,
    category: 'Valves',
  },
  {
    id: 'titanium-bolt-m12',
    name: 'Titanium Bolt M12',
    sku: 'FST-998',
    price: 115.00,
    image: hexBoltImg,
    category: 'Fasteners',
  },
];

// Initial mock cart items preset to replicate the exact state in Figma screenshot
const INITIAL_CART: CartItem[] = [
  {
    product: PRODUCTS[1], // Pneumatic Valve (VAL-104)
    quantity: 2,
  },
  {
    product: PRODUCTS[2], // Hex Bolt M12 (FST-991)
    quantity: 2,
  },
  {
    product: PRODUCTS[0], // Planetary Gear (SKU-892A)
    quantity: 2,
  },
];

function App() {
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
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
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
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
}

export default App;
