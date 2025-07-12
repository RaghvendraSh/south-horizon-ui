import ArrowRight from "../../../components/icons/ArrowRight";
import { ASSETS } from "../../../lib/assets";
import "../../../styles/pages/AgeCollection.scss";

const AgeCollection = () => {
  const handleCategoryClick = (category: string) => {
    console.log(`Navigate to ${category} collection`);
    // Add navigation logic here
  };

  const categories = [
    {
      id: "men",
      title: "SHOP FOR MEN",
      image: ASSETS.HEADER.P1,
      alt: "Men's Fashion Collection",
    },
    {
      id: "women",
      title: "SHOP FOR WOMEN",
      image: ASSETS.HEADER.P1,
      alt: "Women's Fashion Collection",
    },
    {
      id: "kids",
      title: "SHOP FOR KIDS",
      image: ASSETS.HEADER.P1,
      alt: "Kids' Fashion Collection",
    },
  ];

  return (
    <section className="age-collection">
      <div className="age-collection__container">
        <div className="age-collection__grid">
          {categories.map((category) => (
            <div key={category.id} className="age-collection__card">
              <div className="age-collection__image-container">
                <img
                  src={category.image}
                  alt={category.alt}
                  className="age-collection__image"
                  loading="lazy"
                />
              </div>
              <div className="age-collection__content">
                <button
                  className="age-collection__cta"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <span>{category.title}</span>
                  <div className="age-collection__arrow">
                    <ArrowRight color="currentColor" />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgeCollection;
