import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  applyCoupon,
  removeCoupon,
} from "./cart";
import {
  placeOrder,
  getUserOrders,
  getOrderDetails,
  searchOrders,
  getOrderStatusHistory,
  cancelOrder,
} from "./orders";
import {
  registerUser,
  loginUser,
  phoneLogin,
  verifyPhoneOtp,
  googleOAuth,
  sendPhoneOtp,
  verifyPhone,
  verifyEmail,
} from "./auth";
import {
  getProductById,
  getAllProducts,
  getProductsWithFilters,
} from "./products";
import { healthCheck } from "./health";
import { getAllCategories } from "./categories";
import { getAvailableCoupons, validateCoupon } from "./coupons";
import {
  getUserAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "./addresses";
import type {
  RegisterUserRequest,
  LoginUserRequest,
  PhoneLoginRequest,
  VerifyPhoneOtpRequest,
  AuthResponse,
} from "../interfaces/auth";
import type { HealthCheckResponse } from "../interfaces/health";
import type {
  PlaceOrderRequest,
  SearchOrdersResponse,
  OrderHistory,
} from "../interfaces/orders";
import type { GetAllCategoriesResponse } from "../interfaces/categories";
import type {
  ProductFilters,
  GetProductsResponse,
} from "../interfaces/products";
import type {
  CreateAddressRequest,
  UpdateAddressRequest,
  Address,
} from "./addresses";
import type { AvailableCouponsResponse } from "./coupons";
import type { ApplyCouponResponse } from "../interfaces/cart";

class APIS {
  private showLoader = () => {};
  private hideLoader = () => {};
  private static instance: APIS | null = null;
  public instanceId = "SH";

  constructor(instanceId: string) {
    this.instanceId = instanceId;
  }

  static getInstance() {
    return APIS.instance || (APIS.instance = new APIS("SH INSTANCE"));
  }

  initialize(showLoader: () => void, hideLoader: () => void) {
    this.showLoader = showLoader;
    this.hideLoader = hideLoader;
  }

  // Health Check
  healthCheck(): Promise<HealthCheckResponse> {
    this.showLoader();
    return healthCheck().finally(() => this.hideLoader());
  }

  // Auth
  registerUser(data: RegisterUserRequest): Promise<AuthResponse> {
    this.showLoader();
    return registerUser(data).finally(() => this.hideLoader());
  }

  loginUser(data: LoginUserRequest): Promise<AuthResponse> {
    this.showLoader();
    return loginUser(data).finally(() => this.hideLoader());
  }

  phoneLogin(data: PhoneLoginRequest): Promise<void> {
    this.showLoader();
    return phoneLogin(data).finally(() => this.hideLoader());
  }

  verifyPhoneOtp(data: VerifyPhoneOtpRequest): Promise<AuthResponse> {
    this.showLoader();
    return verifyPhoneOtp(data).finally(() => this.hideLoader());
  }

  googleOAuth(credential: string): Promise<AuthResponse> {
    this.showLoader();
    return googleOAuth(credential).finally(() => this.hideLoader());
  }

  sendPhoneOtp(data: { phone: string }): Promise<void> {
    this.showLoader();
    return sendPhoneOtp(data).finally(() => this.hideLoader());
  }

  verifyPhone(data: { phone: string; otp: string }): Promise<void> {
    this.showLoader();
    return verifyPhone(data).finally(() => this.hideLoader());
  }

  verifyEmail(token: string): Promise<void> {
    this.showLoader();
    return verifyEmail(token).finally(() => this.hideLoader());
  }

  // Cart APIs
  fetchCart() {
    return getCart();
  }

  addItemToCart(data: { productId: string; quantity: number }) {
    return addToCart(data);
  }

  updateCartItem(id: string, data: { quantity: number }) {
    return updateCartItem(id, data);
  }

  removeItemFromCart(id: string) {
    return removeFromCart(id);
  }

  // Cart Coupon APIs
  applyCouponToCart(data: {
    couponCode: string;
  }): Promise<ApplyCouponResponse> {
    return applyCoupon(data);
  }

  removeCouponFromCart(): Promise<void> {
    return removeCoupon();
  }

  // Orders APIs
  placeOrder(data: PlaceOrderRequest) {
    return placeOrder(data);
  }

  fetchUserOrders() {
    return getUserOrders();
  }

  fetchOrderDetails(id: string) {
    return getOrderDetails(id);
  }

  // Additional Order APIs
  searchUserOrders(
    filters: Partial<{
      status: string;
      startDate: string;
      endDate: string;
      page: number;
      limit: number;
    }>
  ): Promise<SearchOrdersResponse> {
    return searchOrders(filters);
  }

  fetchOrderStatusHistory(id: string): Promise<OrderHistory[]> {
    return getOrderStatusHistory(id);
  }

  cancelUserOrder(id: string): Promise<void> {
    return cancelOrder(id);
  }

  // Product Details API
  fetchProductById(id: string) {
    return getProductById(id);
  }

  fetchAllProducts() {
    return getAllProducts();
  }

  // Products with Filters API
  fetchProductsWithFilters(
    filters: ProductFilters
  ): Promise<GetProductsResponse> {
    return getProductsWithFilters(filters);
  }

  // Categories APIs
  fetchAllCategories(): Promise<GetAllCategoriesResponse> {
    return getAllCategories();
  }

  // Coupons APIs
  fetchAvailableCoupons(): Promise<AvailableCouponsResponse> {
    return getAvailableCoupons();
  }

  validateCouponCode(couponCode: string): Promise<{
    valid: boolean;
    discount: number;
    message: string;
  }> {
    return validateCoupon(couponCode);
  }

  // Address APIs
  fetchUserAddresses(): Promise<Address[]> {
    return getUserAddresses();
  }

  createUserAddress(data: CreateAddressRequest): Promise<Address> {
    return createAddress(data);
  }

  updateUserAddress(data: UpdateAddressRequest): Promise<Address> {
    return updateAddress(data);
  }

  deleteUserAddress(id: string): Promise<void> {
    return deleteAddress(id);
  }

  setUserDefaultAddress(id: string): Promise<Address> {
    return setDefaultAddress(id);
  }
}

const API = APIS.getInstance();
export default API;
