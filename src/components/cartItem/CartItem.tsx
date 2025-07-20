import React from "react";
import "./CartItem.scss";

export interface CartProduct {
  id: string;
  name: string;
  image: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
}

export interface CartItemProps {
  open: boolean;
  onClose: () => void;
  products: CartProduct[];
  recommendations: CartProduct[];
  subtotal: number;
  onQuantityChange: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  open,
  onClose,
  products,
  recommendations,
  subtotal,
  onQuantityChange,
  onRemove,
  onCheckout,
}) => {
  return (
    <div className={`cart-drawer${open ? " open" : ""}`}>
      <div className="cart-drawer__header">
        <span className="cart-drawer__title">
          Your Cart ({products.length} Items)
        </span>
        <button
          className="cart-drawer__close"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="#222"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <div className="cart-drawer__ready">
        <div className="cart-drawer__ready-title">Ready when you are.</div>
        <div className="cart-drawer__ready-desc">
          Your essentials for effortless dressing are in the bag.
        </div>
      </div>
      <div className="cart-drawer__body">
        <div className="cart-drawer__list">
          {products.map((product) => (
            <div className="cart-drawer__item" key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                className="cart-drawer__item-img"
              />
              <div className="cart-drawer__item-info">
                <div className="cart-drawer__item-name">{product.name}</div>
                <div className="cart-drawer__item-meta">
                  <span>Color: {product.color}</span>
                  <span>Size: {product.size}</span>
                </div>
                <div className="cart-drawer__item-price">₹{product.price}</div>
              </div>
              <div className="cart-drawer__item-actions">
                <div className="cart-drawer__qty-group">
                  <button
                    onClick={() =>
                      onQuantityChange(product.id, product.quantity - 1)
                    }
                    disabled={product.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    onClick={() =>
                      onQuantityChange(product.id, product.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  className="cart-drawer__remove"
                  onClick={() => onRemove(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-drawer__recommend">
          <div className="cart-drawer__recommend-header">
            <span className="cart-drawer__recommend-title">
              YOU MAY ALSO LIKE
            </span>
            <button className="cart-drawer__recommend-seeall">
              SEE ALL <span>&rarr;</span>
            </button>
          </div>
          <div className="cart-drawer__recommend-slider">
            {recommendations.map((rec) => (
              <div className="cart-drawer__recommend-card" key={rec.id}>
                <img
                  src={rec.image}
                  alt={rec.name}
                  className="cart-drawer__recommend-img"
                />
                <div className="cart-drawer__recommend-type">
                  Men's {rec.name.includes("Short") ? "Shorts" : "Sweatshirt"}
                </div>
                <div className="cart-drawer__recommend-name">{rec.name}</div>
                <div className="cart-drawer__recommend-price">₹{rec.price}</div>
              </div>
            ))}
          </div>
          <div className="cart-drawer__recommend-nav">
            <button className="cart-drawer__nav-btn">&lt;</button>
            <button className="cart-drawer__nav-btn">&gt;</button>
          </div>
        </div>
        <div className="cart-drawer__checkout">
          <div className="cart-drawer__subtotal-row">
            <span className="cart-drawer__subtotal-label">Subtotal</span>
            <span className="cart-drawer__subtotal-value">₹{subtotal}</span>
          </div>
          <div className="cart-drawer__checkout-meta">
            <span>Shipping</span>
            <span>Duties, Taxes & Shipping at Checkout</span>
          </div>
          <button className="cart-drawer__checkout-btn" onClick={onCheckout}>
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
