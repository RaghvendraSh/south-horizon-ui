// Export the main API class (recommended way)
export { default as API } from "./api";

// Export individual functions for backward compatibility
export {
  getAllProducts,
  getProductsWithFilters,
  getProductById,
} from "./products";
export { getAllCategories } from "./categories";
export {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  applyCoupon,
  removeCoupon,
} from "./cart";
export {
  getUserOrders,
  placeOrder,
  getOrderDetails,
  searchOrders,
  getOrderStatusHistory,
  cancelOrder,
} from "./orders";
export {
  getUserAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "./addresses";
export {
  registerUser,
  loginUser,
  phoneLogin,
  verifyPhoneOtp,
  googleOAuth,
} from "./auth";
export { getAvailableCoupons, validateCoupon } from "./coupons";
export { healthCheck } from "./health";
