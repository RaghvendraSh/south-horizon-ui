import { authorizedApiCall } from "./apiClient";
import type { Cart, CartItem, ApplyCouponResponse } from "../interfaces/cart";
import { debugCartResponse } from "../utils/debug";

// Get Cart
export const getCart = (): Promise<Cart> => {
  return authorizedApiCall("/api/cart", undefined, "GET", {
    success: "Cart fetched successfully!",
    error: "Failed to fetch cart.",
  })
    .then((response) => {
      debugCartResponse(response, "GET /api/cart");

      // Handle different response structures
      let finalResponse = response;

      // If response has a data wrapper, unwrap it
      if (response && response.data && response.data.items) {
        finalResponse = response.data;
      }

      // If cart is null or undefined, return empty cart structure
      if (!finalResponse) {
        finalResponse = {
          items: [],
          total: 0,
          discount: 0,
          finalTotal: 0,
          coupon: null,
        };
      }

      // Ensure items array exists
      if (!finalResponse.items) {
        finalResponse.items = [];
      }

      console.log("Final cart response:", finalResponse);
      return finalResponse;
    })
    .catch((error) => {
      console.error("Cart API error:", error);
      // Return empty cart on error
      return {
        items: [],
        total: 0,
        discount: 0,
        finalTotal: 0,
        coupon: null,
      };
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
