import React, { useState } from "react";
import "./FilterModal.scss";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  onClear: () => void;
}

interface FilterState {
  sortBy: string;
  productType: string[];
  colors: string[];
  sizes: string[];
  gender: string[];
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApply,
  onClear,
}) => {
  const [filters, setFilters] = useState<FilterState>({
    sortBy: "",
    productType: [],
    colors: [],
    sizes: [],
    gender: [],
  });

  const sortOptions = [
    { value: "new-in", label: "New In" },
    { value: "trending", label: "Trending" },
    { value: "price-high-low", label: "Price High to Low" },
    { value: "price-low-high", label: "Price Low to High" },
  ];

  const productTypes = [
    "Hoodies",
    "Track Pants",
    "Shorts",
    "T-Shirts",
    "Sweatshirts",
  ];

  const colors = [
    { name: "Beige", value: "#F5E6D3" },
    { name: "Pink", value: "#E91E63" },
    { name: "Black", value: "#000000" },
    { name: "Red", value: "#F44336" },
    { name: "Navy", value: "#1565C0" },
    { name: "Olive", value: "#689F38" },
    { name: "Cream", value: "#FFF8E1" },
    { name: "Gray", value: "#424242" },
  ];

  const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

  const genders = ["Women", "Men", "Kids"];

  const handleSortChange = (value: string) => {
    setFilters((prev) => ({ ...prev, sortBy: value }));
  };

  const handleArrayToggle = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: (prev[key] as string[]).includes(value)
        ? (prev[key] as string[]).filter((item) => item !== value)
        : [...(prev[key] as string[]), value],
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleClear = () => {
    setFilters({
      sortBy: "",
      productType: [],
      colors: [],
      sizes: [],
      gender: [],
    });
    onClear();
  };

  const handleOverlayClick = () => {
    // Only close on desktop (screen width > 768px)
    if (window.innerWidth > 768) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="filter-modal">
      <div className="filter-modal__overlay" onClick={handleOverlayClick}></div>
      <div className="filter-modal__content">
        <div className="filter-modal__header">
          <h2 className="filter-modal__title">Sorts & Filters</h2>
          <button className="filter-modal__close" onClick={onClose}>
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="filter-modal__body">
          {/* Sort By Section */}
          <div className="filter-modal__section">
            <h3 className="filter-modal__section-title">SORT BY</h3>
            <div className="filter-modal__options">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  className={`filter-modal__option ${
                    filters.sortBy === option.value ? "active" : ""
                  }`}
                  onClick={() => handleSortChange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Type Section */}
          <div className="filter-modal__section">
            <h3 className="filter-modal__section-title">PRODUCT TYPE</h3>
            <div className="filter-modal__options">
              {productTypes.map((type) => (
                <button
                  key={type}
                  className={`filter-modal__option ${
                    filters.productType.includes(type) ? "active" : ""
                  }`}
                  onClick={() => handleArrayToggle("productType", type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Color Section */}
          <div className="filter-modal__section">
            <h3 className="filter-modal__section-title">COLOR</h3>
            <div className="filter-modal__colors">
              {colors.map((color) => (
                <button
                  key={color.name}
                  className={`filter-modal__color ${
                    filters.colors.includes(color.name) ? "active" : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleArrayToggle("colors", color.name)}
                  title={color.name}
                ></button>
              ))}
            </div>
          </div>

          {/* Size Section */}
          <div className="filter-modal__section">
            <h3 className="filter-modal__section-title">SIZE</h3>
            <div className="filter-modal__options">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`filter-modal__option ${
                    filters.sizes.includes(size) ? "active" : ""
                  }`}
                  onClick={() => handleArrayToggle("sizes", size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Gender Section */}
          <div className="filter-modal__section">
            <h3 className="filter-modal__section-title">GENDER</h3>
            <div className="filter-modal__options">
              {genders.map((gender) => (
                <button
                  key={gender}
                  className={`filter-modal__option ${
                    filters.gender.includes(gender) ? "active" : ""
                  }`}
                  onClick={() => handleArrayToggle("gender", gender)}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="filter-modal__footer">
          <button className="filter-modal__clear" onClick={handleClear}>
            CLEAR
          </button>
          <button className="filter-modal__apply" onClick={handleApply}>
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
