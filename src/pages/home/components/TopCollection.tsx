import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ArrowRight from "../../../components/icons/ArrowRight";
import ProductCard from "../../../components/ProductCard";
import "../../../styles/pages/TopCollection.scss";
import { getProductsWithFilters } from "../../../api";
import type { Product } from "../../../interfaces/products";
import { normalizeProductsResponse } from "../../../utils/apiHelpers";

const TopCollection = () => {
  const [topProducts, setTopProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        // Use API filtering for better performance
        const response = await getProductsWithFilters({ isTop: true });
        const productsArray = normalizeProductsResponse(response);
        setTopProducts(productsArray);
      } catch (error) {
        console.error("Failed to fetch top products:", error);
        setTopProducts([]); // Set empty array on error
      }
    };

    fetchTopProducts();
  }, []);

  const handleProductClick = (productId: string) => {
    console.log("Top product clicked:", productId);
    // Add your product click logic here (e.g., navigate to product page)
  };

  const handleSeeAll = () => {
    console.log("See all top products");
    // Add navigation to top products page
  };

  return (
    <section className="top-collection">
      <div className="top-collection__container">
        <div className="top-collection__header">
          <h2 className="top-collection__title">top collections</h2>
          <button className="top-collection__see-all" onClick={handleSeeAll}>
            <span>SEE ALL</span>
            <div className="top-collection__arrow">
              <ArrowRight color="currentColor" />
            </div>
          </button>
        </div>

        <div className="top-collection__slider-container">
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView="auto"
            navigation={{
              prevEl: ".top-collection__nav-btn--prev",
              nextEl: ".top-collection__nav-btn--next",
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: {
                spaceBetween: 20,
              },
              768: {
                spaceBetween: 25,
              },
              1024: {
                spaceBetween: 30,
              },
            }}
            className="top-collection__slider"
          >
            {topProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard
                  id={product.id}
                  title={product.name}
                  price={product.price.toString()}
                  image={product.images[0]}
                  category={product.category.name}
                  availableColors={product.color}
                  availableSizes={product.size}
                  onClick={handleProductClick}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="top-collection__navigation">
            <button
              className="top-collection__nav-btn top-collection__nav-btn--prev"
              aria-label="Previous slide"
            >
              <ArrowRight color="currentColor" />
            </button>
            <button
              className="top-collection__nav-btn top-collection__nav-btn--next"
              aria-label="Next slide"
            >
              <ArrowRight color="currentColor" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopCollection;
