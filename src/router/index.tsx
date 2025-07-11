import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../lib/consts";
import Home from "../pages/home/Home";

export const AllRoutes = () => {
  return (
    <Routes key={location.pathname}>
      <Route path={ROUTES.HOME} element={<Home />} />
    </Routes>
  );
};
export default AllRoutes;
