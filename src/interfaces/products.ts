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
  inventory: number;
  category: {
    id: string;
    name: string;
  };
}

export type GetProductsResponse = {
  products: Product[];
};

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  size?: string;
  isFeatured?: boolean;
  isTop?: boolean;
  isNew?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}
