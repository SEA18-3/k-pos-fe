import React from 'react';
import ProductCard from './CardProduct';
import type { Product } from '../types';

interface ProductCatalogProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onAddProduct,
  searchQuery,
  setSearchQuery,
}) => {
  // Extract unique categories

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
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
      </div>

       {/* Grid Container */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
        {filteredProducts.length > 0 ? (
          // Penggantian grid statis dengan grid responsif berbasis breakpoint Tailwind
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 sm:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddProduct={onAddProduct}
              />
            ))}
          </div>
        ) : (
          <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-gray-400">
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
            <p className="text-sm font-semibold">Tidak ada barang yang cocok dengan pencarian</p>
          </div>
        )}
      </div>
    </div>
  );
};
