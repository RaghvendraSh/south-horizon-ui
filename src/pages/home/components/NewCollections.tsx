import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ArrowRight from "../../../components/icons/ArrowRight";
import ProductCard from "../../../components/ProductCard";
import "../../../styles/pages/NewCollections.scss";
import { getProductsWithFilters } from "../../../api";
import type { Product } from "../../../interfaces/products";
import { normalizeProductsResponse } from "../../../utils/apiHelpers";
import { ROUTES } from "../../../lib/consts";

const NewCollections = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Use API filtering for better performance
        const response = await getProductsWithFilters({ isNew: true });
        const productsArray = normalizeProductsResponse(response);
        setProducts(productsArray);
      } catch (error) {
        console.error("Failed to fetch new products:", error);
        setProducts([]); // Set empty array on error
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId: string) => {
    console.log("Product clicked:", productId);
    // todo: Add your product click logic here (e.g., navigate to product page)
  };

  const handleShopAll = () => {
    navigate(ROUTES.NEW_COLLECTIONS);
  };

  return (
    <section className="new-collections">
      <div className="new-collections__container">
        <div className="new-collections__content">
          <div className="new-collections__left">
            <h2 className="new-collections__title">
              New
              <br />
              Collection
            </h2>
            <p className="new-collections__subtitle">Handpicked for you</p>
            <button className="new-collections__cta" onClick={handleShopAll}>
              <span>Shop All</span>
              <div className="new-collections__arrow">
                <ArrowRight color="currentColor" />
              </div>
            </button>
          </div>

          <div className="new-collections__right">
            <div className="new-collections__slider-container">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView="auto"
                navigation={{
                  prevEl: ".new-collections__nav-btn--prev",
                  nextEl: ".new-collections__nav-btn--next",
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
                className="new-collections__slider"
              >
                {products.map((product) => (
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

              <div className="new-collections__navigation">
                <button
                  className="new-collections__nav-btn new-collections__nav-btn--prev"
                  aria-label="Previous slide"
                >
                  <ArrowRight color="currentColor" />
                </button>
                <button
                  className="new-collections__nav-btn new-collections__nav-btn--next"
                  aria-label="Next slide"
                >
                  <ArrowRight color="currentColor" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewCollections;
