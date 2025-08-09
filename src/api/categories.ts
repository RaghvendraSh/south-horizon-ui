import { unauthorizedApiCall } from "./apiClient";
import type { GetAllCategoriesResponse } from "../interfaces/categories";

// Get All Categories
export const getAllCategories = (): Promise<GetAllCategoriesResponse> => {
  return unauthorizedApiCall("/api/categories", undefined, "GET", {
    success: "Categories fetched successfully!",
    error: "Failed to fetch categories.",
  });
};
