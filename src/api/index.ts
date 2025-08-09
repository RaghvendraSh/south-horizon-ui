export {
  getAllProducts,
  getProductsWithFilters,
  getProductById,
} from "./products";
export { getAllCategories } from "./categories";
export { getCart, addToCart, updateCartItem, removeFromCart } from "./cart";
export {
  getUserOrders,
  placeOrder,
  getOrderDetails,
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
