import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ArrowRight from "../../../components/icons/ArrowRight";
import ProductCard from "../../../components/ProductCard";
import "../../../styles/pages/FeaturedCollection.scss";
import { getProductsWithFilters } from "../../../api";
import type { Product } from "../../../interfaces/products";
import { normalizeProductsResponse } from "../../../utils/apiHelpers";
import { ROUTES } from "../../../lib/consts";

const FeaturedCollection = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // Use API filtering for better performance
        const response = await getProductsWithFilters({ isFeatured: true });
        const productsArray = normalizeProductsResponse(response);
        setFeaturedProducts(productsArray);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
        setFeaturedProducts([]); // Set empty array on error
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleProductClick = (productId: string) => {
    console.log("Featured product clicked:", productId);
    // Add your product click logic here (e.g., navigate to product page)
  };

  const handleSeeAll = () => {
    navigate(ROUTES.FEATURED_HORIZON);
  };

  return (
    <section className="featured-collection">
      <div className="featured-collection__container">
        <div className="featured-collection__header">
          <h2 className="featured-collection__title">FEATURED HORIZON</h2>
          <button
            className="featured-collection__see-all"
            onClick={handleSeeAll}
          >
            <span>SEE ALL</span>
            <div className="featured-collection__arrow">
              <ArrowRight color="currentColor" />
            </div>
          </button>
        </div>

        <div className="featured-collection__content">
          <div className="featured-collection__slider-container">
            <Swiper
              modules={[Navigation]}
              spaceBetween={30}
              slidesPerView={4}
              navigation={{
                prevEl: ".featured-collection__nav-btn--prev",
                nextEl: ".featured-collection__nav-btn--next",
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 25,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              className="featured-collection__slider"
            >
              {featuredProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard
                    id={product.id}
                    title={product.name} // Corrected from 'title' to 'name'
                    price={product.price.toString()}
                    image={product.images[0]} // Corrected from 'image' to 'images[0]'
                    category={product.category.name}
                    availableColors={product.color}
                    availableSizes={product.size}
                    onClick={handleProductClick}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation */}
            <div className="featured-collection__navigation">
              <button className="featured-collection__nav-btn featured-collection__nav-btn--prev">
                <ArrowRight color="currentColor" />
              </button>
              <button className="featured-collection__nav-btn featured-collection__nav-btn--next">
                <ArrowRight color="currentColor" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
