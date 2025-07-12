import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ArrowRight from "../../../components/icons/ArrowRight";
import ProductCard from "../../../components/ProductCard";
import "../../../styles/pages/NewCollections.scss";
import { products } from "../../../lib/consts";

const NewCollections = () => {
  const handleProductClick = (productId: string) => {
    console.log("Product clicked:", productId);
    // todo:  Add your product click logic here (e.g., navigate to product page)
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
            <button className="new-collections__cta">
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
