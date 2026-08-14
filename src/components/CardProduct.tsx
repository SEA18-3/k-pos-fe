import React from 'react';
import type { Product } from '../types';

// Ekstraksi komponen utilitas format mata uang
const formatIDR = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Ekstraksi komponen kartu agar file utama tidak membengkak
interface ProductCardProps {
  product: Product;
  onAddProduct: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddProduct }) => {
  return (
    <button
      type="button"
      onClick={() => onAddProduct(product)}
      // Transisi interaksi diletakkan pada elemen button untuk mendukung aksesibilitas keyboard (Tab & Enter)
      className="w-full flex flex-col bg-white border border-gray-200 rounded-md overflow-hidden hover:shadow-lg hover:border-brand-blue/30 active:scale-[0.98] transition-all duration-200 group text-left focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent select-none"
    >
      {/* Penggunaan aspect-ratio menggantikan hardcode tinggi/lebar, membuat gambar tetap proporsional di layar manapun */}
      <div className="w-full  aspect-[4/3] bg-gray-50 p-2 relative flex-shrink-0 border-b border-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy" // Optimasi lazy loading
          className="h-full w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-brand-blue text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-sm">
            + TAMBAH
          </span>
        </div>
      </div>

      <div className="flex-1 p-3 flex flex-col justify-between overflow-hidden w-full">
        <div className="flex flex-col gap-0.5 overflow-hidden">
          <h3 className="font-bold text-gray-800 text-sm truncate" title={product.name}>
            {product.name}
          </h3>
          <span className="text-[11px] text-gray-400 font-medium tracking-wide">
            {product.sku}
          </span>
        </div>
        <div className="text-right mt-3">
          <span className="font-black text-brand-blue text-sm">
            {formatIDR(product.price)}
          </span>
        </div>
      </div>
    </button>
  );
};

export default ProductCard