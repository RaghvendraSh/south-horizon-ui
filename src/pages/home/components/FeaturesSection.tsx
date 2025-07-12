import { FEATURES_DATA } from "../../../lib/consts";
import "../../../styles/pages/FeaturesSection.scss";

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="features-section__container">
        <div className="features-section__grid">
          {FEATURES_DATA.map((feature) => (
            <div key={feature.title} className="features-section__item">
              <div className="features-section__icon">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="features-section__icon-image"
                />
              </div>
              <div className="features-section__content">
                <h3 className="features-section__title">{feature.title}</h3>
                <p className="features-section__description">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
