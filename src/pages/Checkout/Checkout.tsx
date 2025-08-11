import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsAuthenticated } from "../../store/slices/authSlice";
import { getUserDetails } from "../../store/slices/userSlice";
import { getCart, applyCoupon, removeCoupon } from "../../api/cart";
import { getUserAddresses } from "../../api/addresses";
import { getAvailableCoupons } from "../../api/coupons";
import { placeOrder } from "../../api";
import type { Cart } from "../../interfaces/cart";
import type { Address } from "../../api/addresses";
import type { Coupon } from "../../api/coupons";
import type { PlaceOrderRequest } from "../../interfaces/orders";
import { showToast } from "../../utils/toastService";
import RazorpayPayment, {
  type PaymentData,
} from "../../components/RazorpayPayment/RazorpayPayment";
import AddressSelectionModal from "./components/AddressSelectionModal";
import CouponModal from "./components/CouponModal";
import "./Checkout.scss";
import { ROUTES } from "../../lib/consts";

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const currentUser = useSelector(getUserDetails) as {
    name?: string;
    email?: string;
    fullName?: string;
    phone?: string;
  };

  // State
  const [cart, setCart] = useState<Cart | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Load initial data
  useEffect(() => {
    if (!isAuthenticated) {
      showToast("Please login to access checkout", "error");
      navigate(ROUTES.HOME);
      return;
    }

    loadCheckoutData();
  }, [isAuthenticated, navigate]);

  const loadCheckoutData = async () => {
    try {
      setIsLoading(true);
      console.log("Starting loadCheckoutData...");

      // Load cart data first (most important)
      let cartData;
      try {
        cartData = await getCart();
        console.log("Cart data loaded successfully:", cartData);
        setCart(cartData);
      } catch (error) {
        console.error("Failed to load cart data:", error);
        setCart({
          items: [],
          total: 0,
          discount: 0,
          finalTotal: 0,
          coupon: null,
        });
      }

      // Load addresses (handle failure gracefully)
      let addressesData = [];
      try {
        addressesData = await getUserAddresses();
        console.log("Addresses loaded successfully:", addressesData);
        setAddresses(addressesData);

        // Set default address if available
        const defaultAddress = addressesData.find((addr) => addr.isDefault);
        if (defaultAddress) {
          setSelectedAddress(defaultAddress);
        }
      } catch (error) {
        console.error("Failed to load addresses:", error);
        setAddresses([]);
      }

      // Load coupons (handle failure gracefully)
      try {
        const couponsResponse = await getAvailableCoupons();
        console.log("Coupons loaded successfully:", couponsResponse);
        setAvailableCoupons(couponsResponse.coupons);
      } catch (error) {
        console.error("Failed to load coupons:", error);
        setAvailableCoupons([]);
      }

      // Set applied coupon if exists in cart
      if (cartData && cartData.coupon) {
        setAppliedCoupon(cartData.coupon);
      }
    } catch (error) {
      console.error("Failed to load checkout data:", error);
      showToast("Failed to load checkout data", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
    setIsAddressModalOpen(false);
  };

  const handleAddressAdded = async () => {
    // Refresh addresses list after adding new address
    try {
      const updatedAddresses = await getUserAddresses();
      setAddresses(updatedAddresses);

      // If this is the first address or it's set as default, select it
      const newDefaultAddress = updatedAddresses.find((addr) => addr.isDefault);
      if (
        newDefaultAddress &&
        (!selectedAddress || newDefaultAddress.id !== selectedAddress.id)
      ) {
        setSelectedAddress(newDefaultAddress);
      }
    } catch (error) {
      console.error("Failed to refresh addresses:", error);
    }
  };

  const handleCouponApply = async (couponCode: string) => {
    try {
      const response = await applyCoupon({ couponCode });

      // Update cart with new totals
      if (cart) {
        setCart({
          ...cart,
          discount: response.discount,
          finalTotal: response.newTotal,
          coupon: couponCode,
        });
      }

      setAppliedCoupon(couponCode);
      setIsCouponModalOpen(false);
      showToast("Coupon applied successfully!", "success");
    } catch (error) {
      console.error("Failed to apply coupon:", error);
      showToast("Failed to apply coupon", "error");
    }
  };

  const handleCouponRemove = async () => {
    try {
      await removeCoupon();

      // Update cart totals
      if (cart) {
        const newTotal = cart.total; // Original total without discount
        setCart({
          ...cart,
          discount: 0,
          finalTotal: newTotal,
          coupon: null,
        });
      }

      setAppliedCoupon(null);
      showToast("Coupon removed successfully!", "success");
    } catch (error) {
      console.error("Failed to remove coupon:", error);
      showToast("Failed to remove coupon", "error");
    }
  };

  const handlePlaceOrder = async (
    initiatePayment: (data: PaymentData) => Promise<void>
  ) => {
    if (!selectedAddress) {
      showToast("Please select a delivery address", "error");
      return;
    }

    if (!cart || cart.items.length === 0) {
      showToast("Your cart is empty", "error");
      return;
    }

    try {
      setIsPlacingOrder(true);

      const orderData: PlaceOrderRequest = {
        shippingAddress: {
          street: `${selectedAddress.addressLine1}${
            selectedAddress.addressLine2
              ? ", " + selectedAddress.addressLine2
              : ""
          }`,
          city: selectedAddress.city,
          state: selectedAddress.state,
          zipCode: selectedAddress.pincode,
          country: "India",
        },
        paymentMethod: "razorpay",
      };

      const order = await placeOrder(orderData);

      // Initiate payment
      const paymentData: PaymentData = {
        amount: cart.finalTotal,
        orderId: order.id,
        customerInfo: {
          name: currentUser?.fullName || selectedAddress.name,
          email: currentUser?.email || "",
          phone: currentUser?.phone || selectedAddress.phone,
        },
        description: `Order Payment - ${order.id}`,
        onSuccess: (response) => {
          console.log("Payment successful:", response);
          showToast("Order placed successfully!", "success");
          navigate(`/order-confirmation/${order.id}`);
        },
        onCancel: () => {
          showToast("Payment cancelled", "error");
        },
        onError: (error) => {
          console.error("Payment failed:", error);
          showToast("Payment failed. Please try again.", "error");
        },
      };

      await initiatePayment(paymentData);
    } catch (error) {
      console.error("Failed to place order:", error);
      showToast("Failed to place order", "error");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (isLoading) {
    return (
      <div className="checkout-loading">
        <div className="spinner"></div>
        <p>Loading checkout...</p>
      </div>
    );
  }

  // Debug: cart information
  console.log("=== CHECKOUT RENDER DEBUG ===");
  console.log("cart:", cart);
  console.log("cart?.items:", cart?.items);
  console.log("cart?.items?.length:", cart?.items?.length);
  console.log("isLoading:", isLoading);
  console.log("=== END DEBUG ===");

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <p>You haven't added any items to your cart yet.</p>
        {/* Show debug info only in development */}
        {/* {import.meta.env.DEV && (
          <details
            style={{
              marginTop: "1rem",
              padding: "1rem",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          >
            <summary>Debug Information (Development Mode)</summary>
            <div style={{ marginTop: "1rem" }}>
              <p>
                <strong>Cart exists:</strong> {cart ? "Yes" : "No"}
              </p>
              <p>
                <strong>Items array exists:</strong>{" "}
                {cart?.items ? "Yes" : "No"}
              </p>
              <p>
                <strong>Items count:</strong> {cart?.items?.length || 0}
              </p>
              <p>
                <strong>Cart total:</strong> ₹{cart?.total || 0}
              </p>
              {cart && (
                <pre
                  style={{
                    fontSize: "10px",
                    overflow: "auto",
                    marginTop: "0.5rem",
                  }}
                >
                  {JSON.stringify(cart, null, 2)}
                </pre>
              )}
            </div>
          </details>
        )} */}
        <button
          onClick={() => navigate("/")}
          className="btn-primary"
          style={{ marginTop: "2rem" }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <RazorpayPayment>
      {(initiatePayment) => (
        <div className="checkout-page">
          <div className="checkout-container">
            <h1 className="checkout-title">Checkout</h1>

            <div className="checkout-content">
              {/* Left Column - Address & Coupon */}
              <div className="checkout-left">
                {/* Delivery Address Section */}
                <div className="checkout-section">
                  <div className="section-header">
                    <h2>Delivery Address</h2>
                    <button
                      className="change-btn"
                      onClick={() => setIsAddressModalOpen(true)}
                    >
                      {selectedAddress ? "Change" : "Select Address"}
                    </button>
                  </div>

                  {selectedAddress ? (
                    <div className="selected-address">
                      <div className="address-header">
                        <span className="address-name">
                          {selectedAddress.name}
                        </span>
                        <span className="address-type">
                          {selectedAddress.type}
                        </span>
                      </div>
                      <div className="address-details">
                        <p>{selectedAddress.addressLine1}</p>
                        {selectedAddress.addressLine2 && (
                          <p>{selectedAddress.addressLine2}</p>
                        )}
                        <p>
                          {selectedAddress.city}, {selectedAddress.state}{" "}
                          {selectedAddress.pincode}
                        </p>
                        <p>Phone: {selectedAddress.phone}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="no-address">
                      <p>No address selected</p>
                    </div>
                  )}
                </div>

                {/* Coupon Section */}
                <div className="checkout-section">
                  <div className="section-header">
                    <h2>Coupons</h2>
                    <button
                      className="change-btn"
                      onClick={() => setIsCouponModalOpen(true)}
                    >
                      {appliedCoupon ? "Change Coupon" : "Apply Coupon"}
                    </button>
                  </div>

                  {appliedCoupon ? (
                    <div className="applied-coupon">
                      <div className="coupon-info">
                        <span className="coupon-code">{appliedCoupon}</span>
                        <span className="coupon-discount">
                          -₹{cart?.discount || 0}
                        </span>
                      </div>
                      <button
                        className="remove-coupon-btn"
                        onClick={handleCouponRemove}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="no-coupon">
                      <p>No coupon applied</p>
                    </div>
                  )}
                </div>

                {/* Order Items */}
                <div className="checkout-section">
                  <h2>Order Items ({cart?.items?.length || 0})</h2>
                  <div className="order-items">
                    {cart?.items?.map((item) => (
                      <div key={item.id} className="order-item">
                        <div className="item-details">
                          <span className="item-name">
                            {item.product?.name}
                          </span>
                          <span className="item-quantity">
                            Qty: {item.quantity}
                          </span>
                        </div>
                        <div className="item-price">₹{item.product?.price}</div>
                      </div>
                    )) || <p>No items in cart</p>}
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="checkout-right">
                <div className="order-summary">
                  <h2>Order Summary</h2>

                  <div className="summary-row">
                    <span>Subtotal ({cart?.items?.length || 0} items)</span>
                    <span>₹{cart?.total || 0}</span>
                  </div>

                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>

                  {(cart?.discount || 0) > 0 && (
                    <div className="summary-row discount">
                      <span>Coupon Discount</span>
                      <span>-₹{cart?.discount || 0}</span>
                    </div>
                  )}

                  <div className="summary-divider"></div>

                  <div className="summary-row total">
                    <span>Total</span>
                    <span>₹{cart?.finalTotal || 0}</span>
                  </div>

                  <button
                    className="pay-button"
                    onClick={() => handlePlaceOrder(initiatePayment)}
                    disabled={!selectedAddress || isPlacingOrder}
                  >
                    {isPlacingOrder
                      ? "Processing..."
                      : `Pay ₹${cart?.finalTotal || 0}`}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Modals */}
          <AddressSelectionModal
            isOpen={isAddressModalOpen}
            onClose={() => setIsAddressModalOpen(false)}
            addresses={addresses}
            selectedAddress={selectedAddress}
            onAddressSelect={handleAddressSelect}
            onAddressAdded={handleAddressAdded}
          />

          <CouponModal
            isOpen={isCouponModalOpen}
            onClose={() => setIsCouponModalOpen(false)}
            availableCoupons={availableCoupons}
            onCouponApply={handleCouponApply}
          />
        </div>
      )}
    </RazorpayPayment>
  );
};

export default Checkout;
