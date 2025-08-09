export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  total: number;
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
