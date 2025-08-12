import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { getProductsWithFilters } from "../../api";
import type { Product } from "../../interfaces/products";
import { normalizeProductsResponse } from "../../utils/apiHelpers";
import { showToast } from "../../utils/toastService";
import "./TopCollectionsPage.scss";

const TopCollectionsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 12;

  const fetchTopProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getProductsWithFilters({
        isTop: true,
        page: currentPage,
        limit: productsPerPage,
      });

      const productsArray = normalizeProductsResponse(response);
      setProducts(productsArray);

      // Calculate total pages (using products length for now)
      setTotalPages(Math.ceil(productsArray.length / productsPerPage) || 1);
    } catch (error) {
      console.error("Failed to fetch top products:", error);
      showToast("Failed to load top collections", "error");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, productsPerPage]);

  useEffect(() => {
    fetchTopProducts();
  }, [fetchTopProducts]);

  const handleProductClick = (productId: string) => {
    // Navigate to product detail page
    console.log("Product clicked:", productId);
    // navigate(`/product/${productId}`);
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

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-btn ${currentPage === i ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ‹ Prev
        </button>
        {startPage > 1 && (
          <>
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(1)}
            >
              1
            </button>
            {startPage > 2 && <span className="pagination-dots">...</span>}
          </>
        )}
        {pages}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="pagination-dots">...</span>
            )}
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          className="pagination-btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next ›
        </button>
      </div>
    );
  };

  return (
    <div className="top-collections-page">
      <div className="page-container">
        {/* Header Section */}
        <div className="page-header">
          <div className="breadcrumb">
            <button onClick={() => navigate("/")} className="breadcrumb-link">
              Home
            </button>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">Top Collections</span>
          </div>
          <h1 className="page-title">Top Collections</h1>
          <p className="page-subtitle">
            Discover our most popular and trending products, handpicked for
            their exceptional quality and style.
          </p>
        </div>

        {/* Filter Section */}
        <div className="filters-section">
          <div className="filters-left">
            <span className="results-count">
              {loading ? "Loading..." : `${products.length} products`}
            </span>
          </div>
          <div className="filters-right">
            <select className="sort-select">
              <option value="popularity">Sort by Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-section">
          {loading ? (
            <div className="loading-state">
              <div className="loading-grid">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="loading-card">
                    <div className="loading-shimmer"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <h3>No products found</h3>
              <p>We couldn't find any top collections at the moment.</p>
              <button onClick={() => navigate("/")} className="btn-primary">
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
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
                    onClick={() => handleProductClick(product.id)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {renderPagination()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopCollectionsPage;
