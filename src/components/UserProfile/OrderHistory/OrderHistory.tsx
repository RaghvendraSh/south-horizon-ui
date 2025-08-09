import { useState, useEffect } from "react";
import { getUserOrders, cancelOrder } from "../../../api";
import { showToast } from "../../../utils/toastService";
import "./OrderHistory.scss";
import { ASSETS } from "../../../lib/assets";

interface AddressObject {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  zip?: string;
  country?: string;
}

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "delivered" | "shipped" | "processing" | "cancelled";
  total: number;
  items: OrderItem[];
  shippingAddress: string;
  trackingNumber?: string;
}

// API response interfaces
interface ApiOrderItem {
  id?: string;
  _id?: string;
  name?: string;
  productName?: string;
  image?: string;
  price?: number;
  unitPrice?: number;
  quantity: number;
  size?: string;
  color?: string;
}

interface ApiOrder {
  id?: string;
  _id?: string;
  orderNumber?: string;
  createdAt?: string;
  date?: string;
  status?: string;
  total?: number;
  totalAmount?: number;
  shippingAddress?: string;
  trackingNumber?: string;
  items?: ApiOrderItem[];
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getUserOrders();
      // Transform the API response to match the local Order interface
      const transformedOrders: Order[] = response.map((apiOrder: ApiOrder) => ({
        id: apiOrder.id || apiOrder._id || "",
        orderNumber: apiOrder.orderNumber || `SH${apiOrder.id || apiOrder._id}`,
        date: apiOrder.createdAt || apiOrder.date || "",
        status: (apiOrder.status as Order["status"]) || "processing",
        total: apiOrder.total || apiOrder.totalAmount || 0,
        shippingAddress: apiOrder.shippingAddress || "No address provided",
        trackingNumber: apiOrder.trackingNumber,
        items:
          apiOrder.items?.map((item: ApiOrderItem) => ({
            id: item.id || item._id || "",
            name: item.name || item.productName || "",
            image: item.image || ASSETS.HEADER.P1, // fallback image
            price: item.price || item.unitPrice || 0,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
          })) || [],
      }));
      setOrders(transformedOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      showToast("Failed to load orders", "error");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "#4CAF50";
      case "shipped":
        return "#2196F3";
      case "processing":
        return "#FF9800";
      case "cancelled":
        return "#F44336";
      default:
        return "#757575";
    }
  };

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "Delivered";
      case "shipped":
        return "Shipped";
      case "processing":
        return "Processing";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  const formatShippingAddress = (address: string) => {
    if (!address || address === "No address provided")
      return "No address provided";

    // Try to parse as JSON first (for structured address objects)
    try {
      const parsedAddress: AddressObject = JSON.parse(address);
      if (typeof parsedAddress === "object" && parsedAddress !== null) {
        // Extract address components in logical order
        const parts = [
          parsedAddress.street,
          parsedAddress.city,
          parsedAddress.state,
          parsedAddress.zipCode || parsedAddress.zip,
          parsedAddress.country,
        ].filter((part) => part && part.toString().trim().length > 0);

        return parts.join(", ");
      }
    } catch {
      // Not a JSON object, continue with string parsing
    }

    // If the address is already comma-separated, clean it up
    if (address.includes(",")) {
      return address
        .split(",")
        .map((part) => part.trim())
        .filter((part) => part.length > 0)
        .join(", ");
    }

    // If the address contains newlines or pipe separators, convert to comma-separated
    const separators = /[\n\r|;]+/;
    if (separators.test(address)) {
      return address
        .split(separators)
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .join(", ");
    }

    // If it's a single line address, try to parse common patterns
    // Example: "123 Main St New York NY 10001" -> "123 Main St, New York, NY, 10001"
    const words = address.trim().split(/\s+/);
    if (words.length > 4) {
      // Simple heuristic: group every 2-3 words for better readability
      const formatted = [];
      for (let i = 0; i < words.length; i += 2) {
        const group = words.slice(i, i + 2).join(" ");
        formatted.push(group);
      }
      return formatted.join(", ");
    }

    // Return as is if no special formatting is needed
    return address;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleReorder = (order: Order) => {
    console.log("Reorder:", order);
    // Add reorder logic here
  };

  const handleTrackOrder = (trackingNumber: string) => {
    console.log("Track order:", trackingNumber);
    // Add tracking logic here
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      await cancelOrder(orderId);
      // Update the order status in local state
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? { ...order, status: "cancelled" as const }
            : order
        )
      );
      showToast("Order cancelled successfully", "success");
    } catch (error) {
      console.error("Failed to cancel order:", error);
      showToast("Failed to cancel order", "error");
    }
  };

  if (selectedOrder) {
    return (
      <div className="order-details">
        <div className="order-details__header">
          <button
            className="order-details__back"
            onClick={() => setSelectedOrder(null)}
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Orders
          </button>
          <h2 className="order-details__title">Order Details</h2>
        </div>

        <div className="order-details__info">
          <div className="order-details__summary">
            <div className="order-details__row">
              <span>Order Number:</span>
              <span>{selectedOrder.orderNumber}</span>
            </div>
            <div className="order-details__row">
              <span>Order Date:</span>
              <span>{formatDate(selectedOrder.date)}</span>
            </div>
            <div className="order-details__row">
              <span>Status:</span>
              <span
                className="order-details__status"
                style={{ color: getStatusColor(selectedOrder.status) }}
              >
                {getStatusText(selectedOrder.status)}
              </span>
            </div>
            {selectedOrder.trackingNumber && (
              <div className="order-details__row">
                <span>Tracking Number:</span>
                <button
                  className="order-details__track-btn"
                  onClick={() =>
                    handleTrackOrder(selectedOrder.trackingNumber!)
                  }
                >
                  {selectedOrder.trackingNumber}
                </button>
              </div>
            )}
            <div className="order-details__row">
              <span>Total Amount:</span>
              <span className="order-details__total">
                ₹{selectedOrder.total}
              </span>
            </div>
          </div>

          <div className="order-details__shipping">
            <h3>Shipping Address</h3>
            <p>{formatShippingAddress(selectedOrder.shippingAddress)}</p>
          </div>

          <div className="order-details__items">
            <h3>Order Items</h3>
            {selectedOrder.items.map((item) => (
              <div key={item.id} className="order-details__item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="order-details__item-image"
                />
                <div className="order-details__item-info">
                  <h4 className="order-details__item-name">{item.name}</h4>
                  <div className="order-details__item-details">
                    {item.size && <span>Size: {item.size}</span>}
                    {item.color && <span>Color: {item.color}</span>}
                    <span>Qty: {item.quantity}</span>
                  </div>
                  <p className="order-details__item-price">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-history">
      <div className="order-history__header">
        <h2 className="order-history__title">Order History</h2>
        <div className="order-history__filter">
          <label htmlFor="status-filter">Filter by status:</label>
          <select
            id="status-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="order-history__filter-select"
          >
            <option value="all">All Orders</option>
            <option value="delivered">Delivered</option>
            <option value="shipped">Shipped</option>
            <option value="processing">Processing</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="order-history__list">
        {loading ? (
          <div className="order-history__loading">
            <p>Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="order-history__empty">
            <p>No orders found.</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="order-history__item">
              <div className="order-history__item-header">
                <div className="order-history__item-info">
                  <h3 className="order-history__order-number">
                    {order.orderNumber}
                  </h3>
                  <p className="order-history__order-date">
                    {formatDate(order.date)}
                  </p>
                </div>
                <div className="order-history__item-status">
                  <span
                    className="order-history__status-badge"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>

              <div className="order-history__item-content">
                <div className="order-history__item-summary">
                  <div className="order-history__item-images">
                    {order.items.slice(0, 3).map((item, index) => (
                      <img
                        key={index}
                        src={item.image}
                        alt={item.name}
                        className="order-history__item-image"
                      />
                    ))}
                    {order.items.length > 3 && (
                      <div className="order-history__item-more">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="order-history__item-details">
                    <p className="order-history__item-count">
                      {order.items.length} item
                      {order.items.length > 1 ? "s" : ""}
                    </p>
                    <p className="order-history__item-total">₹{order.total}</p>
                  </div>
                </div>

                <div className="order-history__item-actions">
                  <button
                    className="order-history__action-btn order-history__action-btn--primary"
                    onClick={() => handleViewDetails(order)}
                  >
                    View Details
                  </button>
                  {order.status === "delivered" && (
                    <button
                      className="order-history__action-btn"
                      onClick={() => handleReorder(order)}
                    >
                      Reorder
                    </button>
                  )}
                  {order.trackingNumber && order.status !== "delivered" && (
                    <button
                      className="order-history__action-btn"
                      onClick={() => handleTrackOrder(order.trackingNumber!)}
                    >
                      Track Order
                    </button>
                  )}
                  {(order.status === "processing" ||
                    order.status === "shipped") && (
                    <button
                      className="order-history__action-btn order-history__action-btn--danger"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
