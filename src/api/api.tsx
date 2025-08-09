import { getCart, addToCart, updateCartItem, removeFromCart } from "./cart";
import { placeOrder, getUserOrders, getOrderDetails } from "./orders";
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
import { getProductById, getAllProducts } from "./products";
import { healthCheck } from "./health";
import type {
  RegisterUserRequest,
  LoginUserRequest,
  PhoneLoginRequest,
  VerifyPhoneOtpRequest,
  AuthResponse,
} from "../interfaces/auth";
import type { HealthCheckResponse } from "../interfaces/health";
import type { PlaceOrderRequest } from "../interfaces/orders";

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

  googleOAuth(): Promise<void> {
    this.showLoader();
    return googleOAuth().finally(() => this.hideLoader());
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

  // Product Details API
  fetchProductById(id: string) {
    return getProductById(id);
  }

  fetchAllProducts() {
    return getAllProducts();
  }
}

const API = APIS.getInstance();
export default API;
