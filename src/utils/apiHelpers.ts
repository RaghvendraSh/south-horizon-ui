import type { Product } from "../interfaces/products";

/**
 * Normalizes API response to ensure we get an array of products
 * Handles cases where API returns:
 * - Direct array: Product[]
 * - Wrapped in data: { data: Product[] }
 * - Wrapped in products: { products: Product[] }
 */
export const normalizeProductsResponse = (response: unknown): Product[] => {
  if (Array.isArray(response)) {
    return response;
  }

  const responseObj = response as { data?: Product[]; products?: Product[] };
  return responseObj?.data || responseObj?.products || [];
};
