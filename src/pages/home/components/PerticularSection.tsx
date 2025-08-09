import { useEffect, useState } from "react";
import ProductCard from "../../../components/ProductCard";
import FilterModal from "../../../components/FilterModal/FilterModal";
import { getAllCategories, getProductsWithFilters } from "../../../api";
import type { Category } from "../../../interfaces/categories";
import type { Product } from "../../../interfaces/products";
import { normalizeProductsResponse } from "../../../utils/apiHelpers";
import "./PerticularSection.scss";

interface PerticularSectionProps {
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getProductsWithFilters({ category });
        const productsArray = normalizeProductsResponse(response);
        setProducts(productsArray);
      } catch {
        setError("Failed to fetch products. Please try again later.");
        setProducts([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response);
      } catch {
        setCategoryError("Failed to fetch categories. Please try again later.");
      }
    };

    fetchCategories();
  }, []);

  const handleProductClick = (id: string) => {
    console.log(`Product clicked: ${id}`);
    // Add navigation to product detail page
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleApplyFilters = (filters: FilterState) => {
    console.log("Applied filters:", filters);
    // Here you would typically filter the products based on the selected filters
  };

  const handleClearFilters = () => {
    console.log("Filters cleared");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (categoryError) {
    return <div>{categoryError}</div>;
  }

  if (!categories) {
    return <div>Loading categories...</div>;
  }

  const categoryData = categories.find((cat) => cat.id === category) || {
    id: "",
    name: "",
    description: "",
    image: "",
    title: "",
    subtitle: "",
    heroImages: [],
    breadcrumb: "",
  };

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
            {(categoryData.heroImages ?? []).map(
              (
                item: { image: string; title: string; category: string },
                index: number
              ) => (
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
              )
            )}
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
                  title={product.name}
                  price={product.price.toString()}
                  image={product.images[0]}
                  category={product.category.name}
                  availableColors={product.color}
                  availableSizes={product.size}
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
