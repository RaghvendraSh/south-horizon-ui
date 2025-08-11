import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../lib/consts";
import Home from "../pages/home/Home";
import MenPage from "../pages/men/MenPage";
import WomenPage from "../pages/women/WomenPage";
import KidsPage from "../pages/kids/KidsPage";
import HorizonXPage from "../pages/horizon-x/HorizonXPage";
import Checkout from "../pages/Checkout/Checkout";

export const AllRoutes = () => {
  return (
    <Routes key={location.pathname}>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.MEN} element={<MenPage />} />
      <Route path={ROUTES.WOMEN} element={<WomenPage />} />
      <Route path={ROUTES.KIDS} element={<KidsPage />} />
      <Route path={ROUTES.HORIZON_X} element={<HorizonXPage />} />
      <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
    </Routes>
  );
};
export default AllRoutes;
