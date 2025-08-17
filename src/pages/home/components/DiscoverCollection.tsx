import { Swiper, SwiperSlide } from "swiper/react";
import ArrowRight from "../../../components/icons/ArrowRight";
import "../../../styles/pages/DiscoverCollection.scss";
import { Navigation } from "swiper/modules";
import { ASSETS } from "../../../lib/assets";
const DiscoverCollection = () => {
  return (
    <div className="discover-collection">
      <div className="discover-collection__content">
        <h1 className="discover-collection__title">
          Introducing the new standard
        </h1>
        <p className="discover-collection__description">
          Today, South Horizon™ is more than clothing — it’s a mindset. A call
          to live lighter, braver, and bolder — one breathable, purpose-built
          piece at a time.
        </p>
        <button className="discover-collection__button">
          <span>Discover Collection</span>
          <span className="discover-collection__button-icon">
            <ArrowRight color="currentColor" />
          </span>
        </button>
      </div>
      <div className="discover-collection__slider-container">
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          navigation={{
            prevEl: ".discover-collection__nav-btn--prev",
            nextEl: ".discover-collection__nav-btn--next",
          }}
          className="discover-collection__slider"
        >
          <SwiperSlide>
            <img src={ASSETS.BANNER_IMG} alt="" className="banner-img" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ASSETS.BANNER_IMG} alt="" className="banner-img" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ASSETS.BANNER_IMG} alt="" className="banner-img" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ASSETS.BANNER_IMG} alt="" className="banner-img" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ASSETS.BANNER_IMG} alt="" className="banner-img" />
          </SwiperSlide>
        </Swiper>

        {/* Custom Navigation */}
        <div className="discover-collection__navigation">
          <button className="discover-collection__nav-btn discover-collection__nav-btn--prev">
            <ArrowRight color="currentColor" />
          </button>
          <button className="discover-collection__nav-btn discover-collection__nav-btn--next">
            <ArrowRight color="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default DiscoverCollection;
