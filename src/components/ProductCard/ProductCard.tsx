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

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  price,
  image,
  category,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-card__image">
        <img src={image} alt={title} loading="lazy" />
        {/* <div className="product-card__overlay">
          <button className="product-card__quick-view">Quick View</button>
        </div> */}
      </div>
      <div className="product-card__content">
        <div className="product-card__category">
          {category}
          <img src={ASSETS.HEADER.BAG_ICON} alt="Bag Icon" />
        </div>
        <h3 className="product-card__title">{title}</h3>
        <div className="product-card__details">
          <p className="product-card__description">{description}</p>
          <div className="product-card__price">{price}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
