import ArrowRight from "../../../components/icons/ArrowRight";
import "../../../styles/pages/DiscoverCollection.scss";
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
    </div>
  );
};
export default DiscoverCollection;
