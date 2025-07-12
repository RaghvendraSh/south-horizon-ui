import DiscoverCollection from "./components/DiscoverCollection";
import NewCollections from "./components/NewCollections";

const Home = () => {
  return (
    <div className="home">
      <DiscoverCollection />
      <NewCollections />
    </div>
  );
};

export default Home;
