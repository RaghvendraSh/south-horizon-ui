import React, { useState } from "react";
import ProductCard from "../../../components/ProductCard/ProductCard";
import FilterModal from "../../../components/FilterModal/FilterModal";
import { ASSETS } from "../../../lib/assets";
import "./PerticularSection.scss";

interface PerticularSectionProps {
  category: "men" | "women" | "kids" | "horizon-x";
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

interface FilterState {
  sortBy: string;
  productType: string[];
  colors: string[];
  sizes: string[];
  gender: string[];
}

const PerticularSection: React.FC<PerticularSectionProps> = ({ category }) => {
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    sortBy: "",
    productType: [],
    colors: [],
    sizes: [],
    gender: [],
  });

  // Dynamic data based on category
  const getCategoryData = () => {
    const baseData = {
      men: {
        title: "Featured Horizon",
        subtitle:
          "Step into the spotlight — our most loved picks of the season. This week's horizon: fresh drops, refined fits, effortless style.",
        heroImages: [
          {
            image: ASSETS.PRODUCTS.MEN_IMG,
            title: "SHOP FOR MEN",
            category: "men",
          },
          {
            image: ASSETS.PRODUCTS.WOMEN_IMG,
            title: "SHOP FOR WOMEN",
            category: "women",
          },
          {
            image: ASSETS.PRODUCTS.BOY_IMG,
            title: "SHOP FOR KIDS",
            category: "kids",
          },
        ],
        breadcrumb: "Men",
      },
      women: {
        title: "Featured Horizon",
        subtitle:
          "Step into the spotlight — our most loved picks of the season. This week's horizon: fresh drops, refined fits, effortless style.",
        heroImages: [
          {
            image: ASSETS.PRODUCTS.WOMEN_IMG,
            title: "SHOP FOR WOMEN",
            category: "women",
          },
          {
            image: ASSETS.PRODUCTS.MEN_IMG,
            title: "SHOP FOR MEN",
            category: "men",
          },
          {
            image: ASSETS.PRODUCTS.BOY_IMG,
            title: "SHOP FOR KIDS",
            category: "kids",
          },
        ],
        breadcrumb: "Women",
      },
      kids: {
        title: "Featured Horizon",
        subtitle:
          "Step into the spotlight — our most loved picks of the season. This week's horizon: fresh drops, refined fits, effortless style.",
        heroImages: [
          {
            image: ASSETS.PRODUCTS.BOY_IMG,
            title: "SHOP FOR KIDS",
            category: "kids",
          },
          {
            image: ASSETS.PRODUCTS.MEN_IMG,
            title: "SHOP FOR MEN",
            category: "men",
          },
          {
            image: ASSETS.PRODUCTS.WOMEN_IMG,
            title: "SHOP FOR WOMEN",
            category: "women",
          },
        ],
        breadcrumb: "Kids",
      },
      "horizon-x": {
        title: "Featured Horizon",
        subtitle:
          "Step into the spotlight — our most loved picks of the season. This week's horizon: fresh drops, refined fits, effortless style.",
        heroImages: [
          {
            image: ASSETS.HEADER.P1,
            title: "SHOP HORIZON X",
            category: "horizon-x",
          },
          {
            image: ASSETS.PRODUCTS.MEN_IMG,
            title: "SHOP FOR MEN",
            category: "men",
          },
          {
            image: ASSETS.PRODUCTS.WOMEN_IMG,
            title: "SHOP FOR WOMEN",
            category: "women",
          },
        ],
        breadcrumb: "Horizon X",
      },
    };
    return baseData[category];
  };

  // Dummy products based on category
  const getProducts = (): Product[] => {
    const baseProducts = [
      {
        id: "1",
        title: `${getCategoryData().breadcrumb}'s T-Shirt`,
        description: "Premium cotton blend",
        price: "₹899",
        image: ASSETS.HEADER.P1,
        category: category,
      },
      {
        id: "2",
        title: `${getCategoryData().breadcrumb}'s T-Shirt`,
        description: "Premium cotton blend",
        price: "₹899",
        image: ASSETS.HEADER.P1,
        category: category,
      },
      {
        id: "3",
        title: `${getCategoryData().breadcrumb}'s T-Shirt`,
        description: "Premium cotton blend",
        price: "₹899",
        image: ASSETS.HEADER.P1,
        category: category,
      },
      {
        id: "4",
        title: `${getCategoryData().breadcrumb}'s T-Shirt`,
        description: "Premium cotton blend",
        price: "₹899",
        image: ASSETS.HEADER.P1,
        category: category,
      },
      {
        id: "5",
        title: `${getCategoryData().breadcrumb}'s T-Shirt`,
        description: "Premium cotton blend",
        price: "₹899",
        image: ASSETS.HEADER.P1,
        category: category,
      },
      {
        id: "6",
        title: `${getCategoryData().breadcrumb}'s T-Shirt`,
        description: "Premium cotton blend",
        price: "₹899",
        image: ASSETS.HEADER.P1,
        category: category,
      },
      {
        id: "7",
        title: `${getCategoryData().breadcrumb}'s T-Shirt`,
        description: "Premium cotton blend",
        price: "₹899",
        image: ASSETS.HEADER.P1,
        category: category,
      },
      {
        id: "8",
        title: `${getCategoryData().breadcrumb}'s T-Shirt`,
        description: "Premium cotton blend",
        price: "₹899",
        image: ASSETS.HEADER.P1,
        category: category,
      },
    ];
    return baseProducts;
  };

  const handleProductClick = (id: string) => {
    console.log(`Product clicked: ${id}`);
    // Add navigation to product detail page
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleApplyFilters = (filters: FilterState) => {
    setActiveFilters(filters);
    console.log("Applied filters:", filters);
    // Here you would typically filter the products based on the selected filters
  };

  const handleClearFilters = () => {
    setActiveFilters({
      sortBy: "",
      productType: [],
      colors: [],
      sizes: [],
      gender: [],
    });
    console.log("Filters cleared");
  };

  const categoryData = getCategoryData();
  const products = getProducts();

  return (
    <div className="particular-section">
      <div className="particular-section__content">
        {/* Hero Section */}
        <div className="particular-section__hero">
          <div className="particular-section__hero-content">
            {/* Breadcrumbs */}
            <div className="particular-section__breadcrumb">
              <span>Home</span>
              <span>/</span>
              <span>Products</span>
            </div>
            <h1 className="particular-section__hero-title">
              {categoryData.title}
            </h1>
            <p className="particular-section__hero-subtitle">
              {categoryData.subtitle}
            </p>
          </div>
          <div className="particular-section__hero-grid">
            {categoryData.heroImages.map((item, index) => (
              <div key={index} className="particular-section__hero-item">
                <img src={item.image} alt={item.title} />
                <div className="particular-section__hero-overlay">
                  <button className="particular-section__hero-btn">
                    {item.title}
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12,5 19,12 12,19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="particular-section__main">
          <div className="particular-section__container">
            {/* Header with Sort and Filters */}
            <div className="particular-section__header">
              <h1 className="particular-section__title">
                {categoryData.breadcrumb}
              </h1>
              <div className="particular-section__controls">
                <div className="particular-section__sort">
                  <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="particular-section__sort-select"
                  >
                    <option value="featured">SORT BY</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest</option>
                    <option value="popularity">Most Popular</option>
                  </select>
                </div>
                <button
                  className="particular-section__filters"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  FILTERS +
                </button>
              </div>
            </div>

            {/* Product Grid */}
            <div className="particular-section__products">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                  onClick={handleProductClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />
    </div>
  );
};

export default PerticularSection;
