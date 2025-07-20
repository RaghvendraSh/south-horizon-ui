import React, { useState } from "react";
import "./SearchProduct.scss";
import { ASSETS } from "../../lib/assets";

const POPULAR_SEARCHES = [
  "T-Shirts",
  "Hoodies",
  "Shorts",
  "Track Pants",
  "Zipper",
  "Gym Wear",
  "Jersey",
];

const PRODUCTS = [
  {
    name: "Hoodies",
    image: ASSETS.HEADER.P1,
  },
  {
    name: "Women's T-Shirts",
    image: ASSETS.HEADER.P1,
  },
  {
    name: "Zipper",
    image: ASSETS.HEADER.P1,
  },
  {
    name: "Summer Shorts",
    image: ASSETS.HEADER.P1,
  },
];

const SearchProduct = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [search, setSearch] = useState("");

  return (
    <div className={`search-product__drawer${open ? " open" : ""}`}>
      <div className="search-product__header">
        <span className="search-product__icon">
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="#222"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          className="search-product__input"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="search-product__close"
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
      <div className="search-product__body">
        <h3 className="search-product__title">Popular Searches</h3>
        <div className="search-product__tags">
          {POPULAR_SEARCHES.map((tag) => (
            <button key={tag} className="search-product__tag">
              {tag}
            </button>
          ))}
        </div>
        <div className="search-product__slider">
          {PRODUCTS.map((product) => (
            <div className="search-product__card" key={product.name}>
              <img
                src={product.image}
                alt={product.name}
                className="search-product__card-img"
              />
              <div className="search-product__card-title">{product.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
