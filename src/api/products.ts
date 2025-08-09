import { unauthorizedApiCall } from "./apiClient";
import type {
  Product,
  GetProductsResponse,
  ProductFilters,
} from "../interfaces/products";

// Get All Products
export const getAllProducts = (): Promise<GetProductsResponse> => {
  return unauthorizedApiCall("/api/products", undefined, "GET", {
    success: "Products fetched successfully!",
    error: "Failed to fetch products.",
  });
};

// Get Products with Filters
export const getProductsWithFilters = (
  filters: ProductFilters
): Promise<GetProductsResponse> => {
  return unauthorizedApiCall("/api/products", filters, "GET", {
    success: "Filtered products fetched successfully!",
    error: "Failed to fetch filtered products.",
  });
};

// Get Product by ID
export const getProductById = (id: string): Promise<Product> => {
  return unauthorizedApiCall(`/api/products/${id}`, undefined, "GET", {
    success: "Product details fetched successfully!",
    error: "Failed to fetch product details.",
  });
};
