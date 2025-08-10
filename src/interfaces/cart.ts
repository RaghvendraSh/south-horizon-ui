export interface Category {
  id: string;
  name: string;
}

export interface Inventory {
  id: string;
  productId: string;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  categoryId: string;
  category: Category;
  color: string[];
  size: string[];
  inventory: Inventory;
  isFeatured: boolean;
  isNew: boolean;
  isTop: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  price: number;
  total: number;
  product: Product;
}

export interface Cart {
  items: CartItem[];
  total: number;
  discount: number;
  finalTotal: number;
  coupon: string | null;
}

export interface ApplyCouponResponse {
  discount: number;
  newTotal: number;
}
