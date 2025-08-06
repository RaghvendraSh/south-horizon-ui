import React, { useState } from "react";
import "./OrderHistory.scss";
import { ASSETS } from "../../../lib/assets";

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

const OrderHistory: React.FC = () => {
  const [orders] = useState<Order[]>([
    {
      id: "1",
      orderNumber: "SH202412001",
      date: "2024-12-15",
      status: "delivered",
      total: 2399,
      trackingNumber: "TRK123456789",
      shippingAddress: "123 Main Street, Mumbai, Maharashtra - 400001",
      items: [
        {
          id: "1",
          name: "Men's Cotton T-Shirt",
          image: ASSETS.HEADER.P1,
          price: 899,
          quantity: 1,
          size: "M",
          color: "Black",
        },
        {
          id: "2",
          name: "Women's Track Pants",
          image: ASSETS.HEADER.P1,
          price: 1500,
          quantity: 1,
          size: "S",
          color: "Navy",
        },
      ],
    },
    {
      id: "2",
      orderNumber: "SH202412002",
      date: "2024-12-10",
      status: "shipped",
      total: 1799,
      trackingNumber: "TRK987654321",
      shippingAddress: "456 Business Avenue, Mumbai, Maharashtra - 400002",
      items: [
        {
          id: "3",
          name: "Unisex Hoodie",
          image: ASSETS.HEADER.P1,
          price: 1799,
          quantity: 1,
          size: "L",
          color: "Gray",
        },
      ],
    },
    {
      id: "3",
      orderNumber: "SH202412003",
      date: "2024-12-05",
      status: "processing",
      total: 2999,
      shippingAddress: "123 Main Street, Mumbai, Maharashtra - 400001",
      items: [
        {
          id: "4",
          name: "Premium Sweatshirt",
          image: ASSETS.HEADER.P1,
          price: 2999,
          quantity: 1,
          size: "XL",
          color: "White",
        },
      ],
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

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
        return "#666";
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

  const filteredOrders = orders.filter(
    (order) => filterStatus === "all" || order.status === filterStatus
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleReorder = (order: Order) => {
    console.log("Reordering:", order);
    // Add items to cart logic here
  };

  const handleTrackOrder = (trackingNumber: string) => {
    console.log("Tracking order:", trackingNumber);
    // Open tracking page logic here
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
            <p>{selectedOrder.shippingAddress}</p>
          </div>
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
    );
  }

  return (
    <div className="order-history">
      <div className="order-history__header">
        <h2 className="order-history__title">Order History</h2>
        <div className="order-history__filters">
          <select
            className="order-history__filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
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
        {filteredOrders.length === 0 ? (
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
                    Ordered on {formatDate(order.date)}
                  </p>
                </div>
                <div className="order-history__item-status">
                  <span
                    className="order-history__status"
                    style={{ color: getStatusColor(order.status) }}
                  >
                    {getStatusText(order.status)}
                  </span>
                  <span className="order-history__total">₹{order.total}</span>
                </div>
              </div>

              <div className="order-history__item-content">
                <div className="order-history__items">
                  {order.items.slice(0, 2).map((item) => (
                    <div key={item.id} className="order-history__product">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="order-history__product-image"
                      />
                      <div className="order-history__product-info">
                        <p className="order-history__product-name">
                          {item.name}
                        </p>
                        <div className="order-history__product-details">
                          {item.size && <span>Size: {item.size}</span>}
                          {item.color && <span>Color: {item.color}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <p className="order-history__more-items">
                      +{order.items.length - 2} more items
                    </p>
                  )}
                </div>

                <div className="order-history__item-actions">
                  <button
                    className="order-history__action-btn"
                    onClick={() => handleViewDetails(order)}
                  >
                    View Details
                  </button>
                  {order.trackingNumber && (
                    <button
                      className="order-history__action-btn"
                      onClick={() => handleTrackOrder(order.trackingNumber!)}
                    >
                      Track Order
                    </button>
                  )}
                  <button
                    className="order-history__action-btn primary"
                    onClick={() => handleReorder(order)}
                  >
                    Reorder
                  </button>
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
