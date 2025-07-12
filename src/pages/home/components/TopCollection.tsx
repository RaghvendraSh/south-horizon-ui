import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ArrowRight from "../../../components/icons/ArrowRight";
import ProductCard from "../../../components/ProductCard";
import "../../../styles/pages/TopCollection.scss";
import { products } from "../../../lib/consts";

const TopCollection = () => {
  const handleProductClick = (productId: string) => {
    console.log("Top product clicked:", productId);
    // Add your product click logic here (e.g., navigate to product page)
  };

  const handleSeeAll = () => {
    console.log("See all top products");
    // Add navigation to top products page
  };

  // Get first 8 products for top collection
  const topProducts = products.slice(0, 8);

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

        <div className="top-collection__content">
          <div className="top-collection__slider-container">
            <Swiper
              modules={[Navigation]}
              spaceBetween={30}
              slidesPerView={4}
              navigation={{
                prevEl: ".top-collection__nav-btn--prev",
                nextEl: ".top-collection__nav-btn--next",
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
              className="top-collection__slider"
            >
              {topProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                    category={product.category}
                    onClick={handleProductClick}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation */}
            <div className="top-collection__navigation">
              <button className="top-collection__nav-btn top-collection__nav-btn--prev">
                <ArrowRight color="currentColor" />
              </button>
              <button className="top-collection__nav-btn top-collection__nav-btn--next">
                <ArrowRight color="currentColor" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopCollection;
