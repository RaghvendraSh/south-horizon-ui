import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../lib/consts";
import Home from "../pages/home/Home";
import MenPage from "../pages/men/MenPage";
import WomenPage from "../pages/women/WomenPage";
import KidsPage from "../pages/kids/KidsPage";
import HorizonXPage from "../pages/horizon-x/HorizonXPage";

export const AllRoutes = () => {
  return (
    <Routes key={location.pathname}>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path="/men" element={<MenPage />} />
      <Route path="/women" element={<WomenPage />} />
      <Route path="/kids" element={<KidsPage />} />
      <Route path="/horizon-x" element={<HorizonXPage />} />
    </Routes>
  );
};
export default AllRoutes;
