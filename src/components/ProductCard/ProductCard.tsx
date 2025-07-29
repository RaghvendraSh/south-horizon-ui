import React from "react";
import "./ProductCard.scss";
import { ASSETS } from "../../lib/assets";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
  onClick?: (id: string) => void;
}

import { useState } from "react";

const COLORS = [
  { name: "Beige", code: "#e7dbc7", isDisabled: false },
  { name: "Pink", code: "#e94e77", isDisabled: false },
  { name: "Navy", code: "#23263a", isDisabled: true },
  { name: "Red", code: "#e94e4e", isDisabled: true },
  { name: "Blue", code: "#3a5ca8", isDisabled: false },
  { name: "Olive", code: "#bfc2a5", isDisabled: false },
  { name: "Black", code: "#232323", isDisabled: true },
];
const SIZES = [
  { label: "XXS", isDisabled: false },
  { label: "XS", isDisabled: false },
  { label: "S", isDisabled: false },
  { label: "M", isDisabled: true },
  { label: "L", isDisabled: false },
  { label: "XL", isDisabled: false },
  { label: "XXL", isDisabled: true },
];

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  price,
  image,
  category,
  onClick,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    COLORS.find((c) => !c.isDisabled)?.code || COLORS[0].code
  );
  const [selectedSize, setSelectedSize] = useState(
    SIZES.find((s) => !s.isDisabled)?.label || SIZES[0].label
  );

  const handleBagClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptions(true);
  };
  const handleCollapse = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptions(false);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add to cart logic here
    alert(
      `Added to cart: ${title}, Color: ${selectedColor}, Size: ${selectedSize}`
    );
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
          <p className="product-card__description">{description}</p>
          <div className="product-card__price">{price}</div>
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
                {COLORS.map((color) => (
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
                {SIZES.map((size) => (
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
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
