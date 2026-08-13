import React from 'react';
import type { Product } from '../types';

interface ProductCatalogProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onAddProduct,
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
}) => {
  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'All' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden border-r border-gray-200">
      {/* Search and Filter Bar */}
      <div className="h-20 flex items-center justify-between px-6 flex-shrink-0 border-b border-gray-100 bg-white gap-4">
        {/* Search Container */}
        <div className="flex-1 max-w-[588px] relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            className="w-full h-12 pl-11 pr-4 rounded bg-[#ebf1f5] text-gray-800 placeholder-gray-500 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 transition-shadow border-none"
            placeholder="Scan or search SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Button */}
        <button
          type="button"
          onClick={() => setActiveCategory(activeCategory === 'All' ? 'Gears' : 'All')}
          className="h-12 px-6 flex items-center justify-center gap-2 rounded border border-gray-300 bg-white text-gray-700 font-semibold text-sm hover:bg-gray-50 active:bg-gray-100 transition-colors focus:outline-none cursor-pointer"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filter
        </button>
      </div>

      {/* Category Pills (Dynamic Filter Bar) */}
      <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex gap-2 overflow-x-auto flex-shrink-0 select-none no-scrollbar">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
              activeCategory === category
                ? 'bg-brand-blue text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {category.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Grid Container */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onAddProduct(product)}
                className="w-[163px] h-[250px] flex flex-col bg-white border border-gray-200 rounded-md overflow-hidden hover:shadow-lg hover:border-brand-blue/30 active:scale-[0.98] transition-all duration-200 cursor-pointer group select-none"
              >
                {/* Image Container */}
                <div className="w-[159px] h-[140px] m-[2px] bg-gray-50 rounded-t flex items-center justify-center overflow-hidden p-2 relative flex-shrink-0 border-b border-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Subtle hovered action overlay */}
                  <div className="absolute inset-0 bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-brand-blue text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-sm">
                      + ADD TO CART
                    </span>
                  </div>
                </div>

                {/* Details Container */}
                <div className="flex-1 p-2.5 flex flex-col justify-between overflow-hidden">
                  <div className="flex flex-col gap-0.5 overflow-hidden">
                    <h3 className="font-bold text-gray-800 text-xs truncate" title={product.name}>
                      {product.name}
                    </h3>
                    <span className="text-[10px] text-gray-400 font-medium tracking-wide">
                      {product.sku}
                    </span>
                  </div>
                  <div className="text-right mt-auto">
                    <span className="font-black text-brand-blue text-sm">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <svg
              className="w-12 h-12 mb-3 text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 12H4M12 4v16"
              />
            </svg>
            <p className="text-sm font-semibold">No items match your search</p>
          </div>
        )}
      </div>
    </div>
  );
};
