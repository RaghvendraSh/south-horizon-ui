export interface Order {
  id: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderHistory {
  status: string;
  timestamp: string;
}

export interface PlaceOrderRequest {
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
}

export interface SearchOrdersResponse {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
}
