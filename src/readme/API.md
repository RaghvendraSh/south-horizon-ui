# API Usage Guide

This project now has all APIs consolidated into a single `api.tsx` file. You can use APIs in two ways:

## Method 1: Using the Consolidated API Class (Recommended)

```typescript
import API from "../api";

// Initialize with loader functions (optional)
API.initialize(showLoader, hideLoader);

// Products
const products = await API.fetchAllProducts();
const filteredProducts = await API.fetchProductsWithFilters({ isNew: true });
const product = await API.fetchProductById("123");

// Categories
const categories = await API.fetchAllCategories();

// Cart
const cart = await API.fetchCart();
await API.addItemToCart({ productId: "123", quantity: 2 });
await API.updateCartItem("item-id", { quantity: 3 });
await API.removeItemFromCart("item-id");
await API.applyCouponToCart({ couponCode: "SAVE10" });
await API.removeCouponFromCart();

// Orders
await API.placeOrder(orderData);
const orders = await API.fetchUserOrders();
const order = await API.fetchOrderDetails("order-id");
const searchResults = await API.searchUserOrders({ status: "pending" });
const history = await API.fetchOrderStatusHistory("order-id");
await API.cancelUserOrder("order-id");

// Addresses
const addresses = await API.fetchUserAddresses();
const address = await API.createUserAddress(addressData);
await API.updateUserAddress(addressData);
await API.deleteUserAddress("address-id");
await API.setUserDefaultAddress("address-id");

// Coupons
const coupons = await API.fetchAvailableCoupons();
const validation = await API.validateCouponCode("SAVE10");

// Auth
await API.registerUser(userData);
await API.loginUser({ email, password });
await API.phoneLogin({ phone });
await API.verifyPhoneOtp({ phone, otp });
await API.googleOAuth();
await API.sendPhoneOtp({ phone });
await API.verifyPhone({ phone, otp });
await API.verifyEmail(token);

// Health
await API.healthCheck();
```

## Method 2: Using Individual Function Imports (Backward Compatibility)

```typescript
import { getProductsWithFilters, getAllCategories, getCart } from "../api";

// This method still works for backward compatibility
const products = await getProductsWithFilters({ isNew: true });
const categories = await getAllCategories();
const cart = await getCart();
```

## Benefits of Using the API Class

1. **Centralized**: All APIs in one place
2. **Loader Integration**: Automatic loading states
3. **Consistent Interface**: Uniform method naming
4. **Better Error Handling**: Centralized error management
5. **Type Safety**: Full TypeScript support
6. **Easy Mocking**: Simple to mock for testing

## Migration Guide

To migrate from individual imports to the API class:

**Before:**

```typescript
import { getProductsWithFilters } from "../api";
const products = await getProductsWithFilters({ isNew: true });
```

**After:**

```typescript
import API from "../api";
const products = await API.fetchProductsWithFilters({ isNew: true });
```

## Current Usage in Codebase

Most files are currently using individual imports. Both methods work, but the API class is recommended for new code.
