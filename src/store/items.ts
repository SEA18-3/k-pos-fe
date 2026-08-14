import type { Product } from '../types';

export const PRODUCTS: Product[] = [
  // ===== Kategori: Sembako =====
  {
    id: 'beras-premium-5kg',
    name: 'Beras Premium 5kg',
    sku: 'SMB-101',
    price: 65000, // Qty 2 = Rp130.000
    image: 'https://picsum.photos/seed/beras-premium/400/300',
    category: 'Sembako',
  },
  {
    id: 'minyak-goreng-2l',
    name: 'Minyak Goreng 2L',
    sku: 'SMB-102',
    price: 32000, // Qty 2 = Rp64.000
    image: 'https://picsum.photos/seed/minyak-goreng/400/300',
    category: 'Sembako',
  },
  {
    id: 'gula-pasir-1kg',
    name: 'Gula Pasir 1kg',
    sku: 'SMB-103',
    price: 15000, // Qty 2 = Rp30.000
    image: 'https://picsum.photos/seed/gula-pasir/400/300',
    category: 'Sembako',
  },
  {
    id: 'tepung-terigu-1kg',
    name: 'Tepung Terigu 1kg',
    sku: 'SMB-104',
    price: 12000,
    image: 'https://picsum.photos/seed/tepung-terigu/400/300',
    category: 'Sembako',
  },

  // ===== Kategori: Pupuk & Benih =====
  {
    id: 'pupuk-npk-1kg',
    name: 'Pupuk NPK Phonska 1kg',
    sku: 'PPK-201',
    price: 3500,
    image: 'https://picsum.photos/seed/pupuk-npk/400/300',
    category: 'Pupuk & Benih',
  },
  {
    id: 'pupuk-organik-5kg',
    name: 'Pupuk Organik 5kg',
    sku: 'PPK-202',
    price: 25000,
    image: 'https://picsum.photos/seed/pupuk-organik/400/300',
    category: 'Pupuk & Benih',
  },
  {
    id: 'benih-padi-unggul-1kg',
    name: 'Benih Padi Unggul 1kg',
    sku: 'PPK-203',
    price: 18000,
    image: 'https://picsum.photos/seed/benih-padi/400/300',
    category: 'Pupuk & Benih',
  },
  {
    id: 'pupuk-urea-1kg',
    name: 'Pupuk Urea 1kg',
    sku: 'PPK-204',
    price: 3000,
    image: 'https://picsum.photos/seed/pupuk-urea/400/300',
    category: 'Pupuk & Benih',
  },

  // ===== Kategori: Alat Pertanian =====
  {
    id: 'cangkul-baja',
    name: 'Cangkul Baja',
    sku: 'ALT-301',
    price: 85000,
    image: 'https://picsum.photos/seed/cangkul-baja/400/300',
    category: 'Alat Pertanian',
  },
  {
    id: 'sabit-rumput',
    name: 'Sabit Rumput',
    sku: 'ALT-302',
    price: 35000,
    image: 'https://picsum.photos/seed/sabit-rumput/400/300',
    category: 'Alat Pertanian',
  },
  {
    id: 'sekop-tanah',
    name: 'Sekop Tanah',
    sku: 'ALT-303',
    price: 65000,
    image: 'https://picsum.photos/seed/sekop-tanah/400/300',
    category: 'Alat Pertanian',
  },
  {
    id: 'alat-semprot-hama-16l',
    name: 'Alat Semprot Hama 16L',
    sku: 'ALT-304',
    price: 250000,
    image: 'https://picsum.photos/seed/alat-semprot/400/300',
    category: 'Alat Pertanian',
  },
];