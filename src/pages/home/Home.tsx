import DiscoverCollection from "./components/DiscoverCollection";
import NewCollections from "./components/NewCollections";
import FeaturedCollection from "./components/FeaturedCollection";
import AgeCollection from "./components/AgeCollection";
import FeaturesSection from "./components/FeaturesSection";
import TopCollection from "./components/TopCollection";
import Footer from "./components/Footer";

const Home = () => {
  return (
    <div className="home">
      <DiscoverCollection />
      <NewCollections />
      <FeaturedCollection />
      <AgeCollection />
      <TopCollection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Home;
