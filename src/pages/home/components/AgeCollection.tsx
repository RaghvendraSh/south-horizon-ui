import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowRight from "../../../components/icons/ArrowRight";
import { getAllCategories } from "../../../api";
import type { Category } from "../../../interfaces/categories";
import "../../../styles/pages/AgeCollection.scss";
import { ASSETS } from "../../../lib/assets";

const AgeCollection = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "men",
      name: "SHOP FOR MEN",
      image: ASSETS.PRODUCTS.MEN_IMG,
    },
    {
      id: "women",
      name: "SHOP FOR WOMEN",
      image: ASSETS.PRODUCTS.WOMEN_IMG,
    },
    {
      id: "kids",
      name: "SHOP FOR KIDS",
      image: ASSETS.PRODUCTS.BOY_IMG,
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        if (response.length > 0) {
          setCategories(response);
        }
      } catch (error) {
        console.error("Failed to fetch categories, using dummy data:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category: string) => {
    navigate(`/${category}`);
  };

  return (
    <section className="age-collection">
      <div className="age-collection__container">
        <div className="age-collection__grid">
          {categories.map((category) => (
            <div key={category.id} className="age-collection__card">
              <div className="age-collection__image-container">
                <img
                  src={category.image}
                  alt={category.name}
                  className="age-collection__image"
                  loading="lazy"
                />
              </div>
              <div className="age-collection__content">
                <button
                  className="age-collection__cta"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <span>{category.name}</span>
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
