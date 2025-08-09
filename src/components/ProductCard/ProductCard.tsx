import { useState } from "react";
import { useSelector } from "react-redux";
import { addToCart } from "../../api";
import { getIsAuthenticated } from "../../store/slices/authSlice";
import { showToast } from "../../utils/toastService";
import "./ProductCard.scss";
import { ASSETS } from "../../lib/assets";

// Custom event for cart updates
const CART_UPDATED_EVENT = "cartUpdated";

interface ProductCardProps {
  id: string;
  title: string;
  price: string;
  image: string;
  category: string;
  availableColors?: string[];
  availableSizes?: string[];
  onClick?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  image,
  category,
  availableColors = [],
  availableSizes = [],
  onClick,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = useSelector(getIsAuthenticated);

  // Convert API arrays to format expected by component
  const colors =
    availableColors.length > 0
      ? availableColors.map((color) => ({
          code: color,
          name: color,
          isDisabled: false,
        }))
      : [];

  const sizes =
    availableSizes.length > 0
      ? availableSizes.map((size) => ({
          label: size,
          isDisabled: false,
        }))
      : [];

  const [selectedColor, setSelectedColor] = useState(
    colors.find((c) => !c.isDisabled)?.code || colors[0].code
  );
  const [selectedSize, setSelectedSize] = useState(
    sizes.find((s) => !s.isDisabled)?.label || sizes[0].label
  );

  const handleBagClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptions(true);
  };

  const handleCollapse = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptions(false);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!selectedColor || !selectedSize) {
      showToast("Please select color and size", "error");
      return;
    }

    if (!isAuthenticated) {
      showToast("Please login to add items to cart", "error");
      return;
    }

    setIsLoading(true);
    try {
      await addToCart({ productId: id, quantity: 1 });
      showToast(`Added ${title} to cart`, "success");
      setShowOptions(false); // Close options after successful add

      // Dispatch custom event to notify header to refresh cart
      window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
    } catch (error) {
      console.error("Add to cart error:", error);
      showToast("Failed to add to cart", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) onClick(id);
  };

  return (
    <div className="product-card">
      <div className="product-card__image">
        <img src={image} alt={title} loading="lazy" />
      </div>
      <div className="product-card__content">
        <div className="product-card__category">
          {category}
          {showOptions ? (
            <span
              className="product-card__collapse"
              onClick={handleCollapse}
              style={{ color: "#e94e4e", cursor: "pointer", fontWeight: 600 }}
            >
              CLOSE&nbsp;<span style={{ fontWeight: 700 }}>-</span>
            </span>
          ) : (
            <img
              src={ASSETS.HEADER.BAG_ICON}
              alt="Bag Icon"
              className="product-card__bag-icon"
              onClick={handleBagClick}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
        <h3 className="product-card__title">{title}</h3>
        <div className="product-card__details">
          <div className="product-card__price">₹ {price}</div>
        </div>
        <div
          className={`product-card__options-wrapper${
            showOptions ? " open" : ""
          }`}
        >
          <div className="product-card__options">
            <div className="product-card__option-group">
              <div className="product-card__option-label">COLOR</div>
              <div className="product-card__colors">
                {colors.map((color) => (
                  <button
                    key={color.code}
                    className={`product-card__color-swatch${
                      selectedColor === color.code ? " selected" : ""
                    }`}
                    style={{ backgroundColor: color.code }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!color.isDisabled) setSelectedColor(color.code);
                    }}
                    aria-label={color.name}
                    disabled={color.isDisabled}
                  />
                ))}
              </div>
            </div>
            <div className="product-card__option-group">
              <div className="product-card__option-label">SIZE</div>
              <div className="product-card__sizes">
                {sizes.map((size) => (
                  <button
                    key={size.label}
                    className={`product-card__size-btn${
                      selectedSize === size.label ? " selected" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!size.isDisabled) setSelectedSize(size.label);
                    }}
                    disabled={size.isDisabled}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="product-card__actions-row">
              <button
                className="product-card__view-details"
                onClick={handleViewDetails}
              >
                VIEW DETAILS
              </button>
              <button
                className="product-card__add-to-cart"
                onClick={handleAddToCart}
                disabled={isLoading}
              >
                {isLoading ? "ADDING..." : "ADD TO CART"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
