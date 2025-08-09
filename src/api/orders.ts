import { authorizedApiCall } from "./apiClient";
import type {
  Order,
  OrderHistory,
  PlaceOrderRequest,
  SearchOrdersResponse,
} from "../interfaces/orders";

// Place Order
export const placeOrder = (data: PlaceOrderRequest): Promise<Order> => {
  return authorizedApiCall("/api/orders/place", data, "POST", {
    success: "Order placed successfully!",
    error: "Failed to place order.",
  });
};

// Get User Orders
export const getUserOrders = (): Promise<Order[]> => {
  return authorizedApiCall("/api/orders", undefined, "GET", {
    success: "Orders fetched successfully!",
    error: "Failed to fetch orders.",
  });
};

// Search Orders
export const searchOrders = (
  filters: Partial<{
    status: string;
    startDate: string;
    endDate: string;
    page: number;
    limit: number;
  }>
): Promise<SearchOrdersResponse> => {
  return authorizedApiCall("/api/orders/search", filters, "GET", {
    success: "Orders fetched successfully!",
    error: "Failed to search orders.",
  });
};

// Get Order Details
export const getOrderDetails = (id: string): Promise<Order> => {
  return authorizedApiCall(`/api/orders/${id}`, undefined, "GET", {
    success: "Order details fetched successfully!",
    error: "Failed to fetch order details.",
  });
};

// Get Order Status History
export const getOrderStatusHistory = (id: string): Promise<OrderHistory[]> => {
  return authorizedApiCall(`/api/orders/${id}/history`, undefined, "GET", {
    success: "Order status history fetched successfully!",
    error: "Failed to fetch order status history.",
  });
};

// Cancel Order
export const cancelOrder = (id: string): Promise<void> => {
  return authorizedApiCall(`/api/orders/${id}/cancel`, undefined, "DELETE", {
    success: "Order cancelled successfully!",
    error: "Failed to cancel order.",
  });
};
