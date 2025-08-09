export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  color: string[];
  size: string[];
  images: string[];
  isFeatured: boolean;
  isTop: boolean;
  isNew: boolean;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  reviews: Review[];
  inventory: Inventory;
}

export interface Category {
  id: string;
  name: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
}

export interface Inventory {
  id: string;
  productId: string;
  quantity: number;
}
