import { useState } from "react";
import type { Coupon } from "../../../api/coupons";
import { validateCoupon } from "../../../api/coupons";
import { showToast } from "../../../utils/toastService";
import "./CouponModal.scss";

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableCoupons: Coupon[];
  onCouponApply: (couponCode: string) => void;
}

const CouponModal: React.FC<CouponModalProps> = ({
  isOpen,
  onClose,
  availableCoupons,
  onCouponApply,
}) => {
  const [customCouponCode, setCustomCouponCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCouponApply = (couponCode: string) => {
    onCouponApply(couponCode);
  };

  const handleCustomCouponApply = async () => {
    if (!customCouponCode.trim()) {
      showToast("Please enter a coupon code", "error");
      return;
    }

    try {
      setIsValidating(true);
      const validation = await validateCoupon(customCouponCode);

      if (validation.valid) {
        onCouponApply(customCouponCode);
      } else {
        showToast(validation.message, "error");
      }
    } catch (error) {
      console.error("Coupon validation error:", error);
      showToast("Invalid coupon code", "error");
    } finally {
      setIsValidating(false);
    }
  };

  const formatDiscountValue = (coupon: Coupon) => {
    if (coupon.discountType === "percentage") {
      return `${coupon.discountValue}% OFF`;
    } else {
      return `₹${coupon.discountValue} OFF`;
    }
  };

  const isExpiringSoon = (validTo: string) => {
    const expiryDate = new Date(validTo);
    const now = new Date();
    const diffTime = expiryDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays > 0;
  };

  return (
    <div className="coupon-modal-overlay" onClick={handleOverlayClick}>
      <div className="coupon-modal">
        <div className="coupon-modal-header">
          <h2>Apply Coupon</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="coupon-modal-content">
          {/* Custom Coupon Input */}
          <div className="custom-coupon-section">
            <h3>Enter Coupon Code</h3>
            <div className="custom-coupon-input">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={customCouponCode}
                onChange={(e) =>
                  setCustomCouponCode(e.target.value.toUpperCase())
                }
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleCustomCouponApply();
                  }
                }}
              />
              <button
                className="apply-btn"
                onClick={handleCustomCouponApply}
                disabled={isValidating || !customCouponCode.trim()}
              >
                {isValidating ? "Validating..." : "Apply"}
              </button>
            </div>
          </div>

          {/* Available Coupons */}
          <div className="available-coupons-section">
            <h3>Available Coupons</h3>

            {availableCoupons.length === 0 ? (
              <div className="no-coupons">
                <p>No coupons available at the moment</p>
              </div>
            ) : (
              <div className="coupons-list">
                {availableCoupons.map((coupon) => (
                  <div key={coupon.id} className="coupon-card">
                    <div className="coupon-content">
                      <div className="coupon-left">
                        <div className="coupon-discount">
                          {formatDiscountValue(coupon)}
                        </div>
                        <div className="coupon-code">{coupon.code}</div>
                      </div>

                      <div className="coupon-details">
                        <p className="coupon-description">
                          {coupon.description}
                        </p>

                        <div className="coupon-conditions">
                          {coupon.minOrderAmount > 0 && (
                            <span className="condition">
                              Min order: ₹{coupon.minOrderAmount}
                            </span>
                          )}
                          {coupon.maxDiscountAmount && (
                            <span className="condition">
                              Max discount: ₹{coupon.maxDiscountAmount}
                            </span>
                          )}
                        </div>

                        <div className="coupon-validity">
                          <span
                            className={`validity ${
                              isExpiringSoon(coupon.validTo) ? "expiring" : ""
                            }`}
                          >
                            Valid till:{" "}
                            {new Date(coupon.validTo).toLocaleDateString()}
                            {isExpiringSoon(coupon.validTo) &&
                              " (Expiring Soon!)"}
                          </span>
                        </div>
                      </div>

                      <div className="coupon-right">
                        <button
                          className="coupon-apply-btn"
                          onClick={() => handleCouponApply(coupon.code)}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponModal;
