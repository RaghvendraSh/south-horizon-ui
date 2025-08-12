import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { ROUTES } from "../../lib/consts";
import type { Product } from "../../interfaces/products";
import { getProductsWithFilters } from "../../api";
import { normalizeProductsResponse } from "../../utils/apiHelpers";
import "./FeaturedHorizonPage.scss";

const FeaturedHorizonPage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 12;

  const fetchFeaturedProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch products using the API with featured filter
      const response = await getProductsWithFilters({ isFeatured: true });
      const productsArray = normalizeProductsResponse(response);

      // Filter for featured products (double check in case API doesn't filter properly)
      const featuredProducts = productsArray.filter(
        (product: Product) => product.isFeatured
      );

      // Sort products
      const sortedProducts = [...featuredProducts].sort((a, b) => {
        switch (sortBy) {
          case "name":
            return a.name.localeCompare(b.name);
          case "price-low":
            return a.price - b.price;
          case "price-high":
            return b.price - a.price;
          case "newest":
            // Assuming products have id as proxy for newest
            return b.id.localeCompare(a.id);
          default:
            return 0;
        }
      });

      // Calculate pagination
      const totalItems = sortedProducts.length;
      const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);
      setTotalPages(calculatedTotalPages);

      // Get products for current page
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

      setProducts(paginatedProducts);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      setError("Failed to load featured products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, sortBy]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        className="pagination-btn"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹ Previous
      </button>
    );

    // First page + ellipsis
    if (startPage > 1) {
      pages.push(
        <button
          key="1"
          className="pagination-btn"
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="start-ellipsis" className="pagination-dots">
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-btn ${i === currentPage ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Last page + ellipsis
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis" className="pagination-dots">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          className="pagination-btn"
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        className="pagination-btn"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next ›
      </button>
    );

    return <div className="pagination">{pages}</div>;
  };

  return (
    <div className="featured-horizon-page">
      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <div className="breadcrumb">
            <button
              className="breadcrumb-link"
              onClick={() => navigate(ROUTES.HOME)}
            >
              Home
            </button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Featured Horizon</span>
          </div>
          <h1 className="page-title">Featured Horizon</h1>
          <p className="page-subtitle">
            Discover our hand-picked selection of premium products. Each item in
            our featured collection represents the pinnacle of quality and
            innovation.
          </p>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filters-left">
            <span className="results-count">
              {loading ? "Loading..." : `${products.length} products`}
            </span>
          </div>
          <div className="filters-right">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="sort-select"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Products */}
        <div className="products-section">
          {loading && (
            <div className="loading-state">
              <div className="loading-grid">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="loading-card">
                    <div className="loading-shimmer"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="error-state">
              <h3>Oops! Something went wrong</h3>
              <p>{error}</p>
              <button className="btn-primary" onClick={fetchFeaturedProducts}>
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="empty-state">
              <h3>No Featured Products Found</h3>
              <p>
                We're currently updating our featured collection. Check back
                soon!
              </p>
              <button
                className="btn-primary"
                onClick={() => navigate(ROUTES.HOME)}
              >
                Browse All Products
              </button>
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.name}
                  price={`₹${product.price}`}
                  image={product.images?.[0] || "/placeholder-image.jpg"}
                  category={product.category?.name || "Product"}
                  availableColors={product.color || []}
                  availableSizes={product.size || []}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && !error && products.length > 0 && renderPagination()}
      </div>
    </div>
  );
};

export default FeaturedHorizonPage;
