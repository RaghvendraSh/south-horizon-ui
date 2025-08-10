import { authorizedApiCall } from "./apiClient";

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  validFrom: string;
  validTo: string;
  isActive: boolean;
  usageLimit?: number;
  usedCount: number;
}

export interface AvailableCouponsResponse {
  coupons: Coupon[];
}

// Get Available Coupons for User
export const getAvailableCoupons = (): Promise<AvailableCouponsResponse> => {
  return authorizedApiCall("/api/coupons/available", undefined, "GET", {
    error: "Failed to fetch available coupons.",
  });
};

// Validate Coupon
export const validateCoupon = (
  couponCode: string
): Promise<{
  valid: boolean;
  discount: number;
  message: string;
}> => {
  return authorizedApiCall(
    `/api/coupons/validate/${couponCode}`,
    undefined,
    "GET",
    {
      error: "Failed to validate coupon.",
    }
  );
};
