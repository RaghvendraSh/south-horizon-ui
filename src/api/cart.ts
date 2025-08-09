import { authorizedApiCall } from "./apiClient";
import type { Cart, CartItem, ApplyCouponResponse } from "../interfaces/cart";

// Get Cart
export const getCart = (): Promise<Cart> => {
  return authorizedApiCall("/api/cart", undefined, "GET", {
    success: "Cart fetched successfully!",
    error: "Failed to fetch cart.",
  });
};

// Add to Cart
export const addToCart = (data: {
  productId: string;
  quantity: number;
}): Promise<CartItem> => {
  return authorizedApiCall("/api/cart/add", data, "POST", {
    success: "Item added to cart!",
    error: "Failed to add item to cart.",
  });
};

// Update Cart Item
export const updateCartItem = (
  id: string,
  data: { quantity: number }
): Promise<CartItem> => {
  return authorizedApiCall(`/api/cart/items/${id}`, data, "PUT", {
    success: "Cart item updated!",
    error: "Failed to update cart item.",
  });
};

// Remove from Cart
export const removeFromCart = (id: string): Promise<void> => {
  return authorizedApiCall(`/api/cart/items/${id}`, undefined, "DELETE", {
    success: "Item removed from cart!",
    error: "Failed to remove item from cart.",
  });
};

// Apply Coupon
export const applyCoupon = (data: {
  couponCode: string;
}): Promise<ApplyCouponResponse> => {
  return authorizedApiCall("/api/cart/apply-coupon", data, "POST", {
    success: "Coupon applied successfully!",
    error: "Failed to apply coupon.",
  });
};

// Remove Coupon
export const removeCoupon = (): Promise<void> => {
  return authorizedApiCall("/api/cart/remove-coupon", undefined, "DELETE", {
    success: "Coupon removed successfully!",
    error: "Failed to remove coupon.",
  });
};
