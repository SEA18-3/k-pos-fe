import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="h-16 bg-brand-blue flex items-center justify-between px-6 text-white shadow-md z-10 flex-shrink-0 select-none">
      {/* Menu Icon */}
      <button 
        type="button"
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 active:bg-white/20 transition-colors focus:outline-none"
        aria-label="Menu"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-white"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {/* Brand Title */}
      <h1 className="text-2xl font-bold tracking-[0.1em] text-white m-0">K-POS</h1>
    </header>
  );
};
