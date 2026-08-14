import React, { useState } from 'react';
import { Menu, X, ShoppingCart, History, BarChart3 } from 'lucide-react';

export const Header: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <>
      <header className="h-16 bg-brand-blue flex items-center justify-between px-6 text-white shadow-md z-10 flex-shrink-0 select-none">
        {/* Menu Icon */}
        <button 
          type="button"
          onClick={toggleNav}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 active:bg-white/20 transition-colors focus:outline-none"
          aria-label="Menu"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>

        {/* Brand Title */}
        <h1 className="text-2xl font-bold tracking-[0.1em] text-white m-0">K-POS</h1>
      </header>

      {/* Backdrop */}
      {isNavOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={toggleNav}
        />
      )}

      {/* Side Navigation */}
      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-brand-blue text-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isNavOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Side Nav Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-white/10 select-none">
          <span className="text-xl font-bold tracking-wider">K-POS</span>
          <button 
            type="button"
            onClick={toggleNav}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 active:bg-white/20 transition-colors focus:outline-none"
            aria-label="Close Menu"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          <a 
            href="#transaction" 
            onClick={() => setIsNavOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-white/10 active:bg-white/20 transition-colors font-medium"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Transaction</span>
          </a>

          <a 
            href="#history" 
            onClick={() => setIsNavOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-white/10 active:bg-white/20 transition-colors font-medium"
          >
            <History className="w-5 h-5" />
            <span>History</span>
          </a>

          <a 
            href="#reports" 
            onClick={() => setIsNavOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-white/10 active:bg-white/20 transition-colors font-medium"
          >
            <BarChart3 className="w-5 h-5" />
            <span>Reports</span>
          </a>
        </nav>
      </aside>
    </>
  );
};