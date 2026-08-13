export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
