import { Outlet } from "react-router-dom";
import { NavbarComp } from "./navbar";

export const Layout = () => {
  return (
    <div>
      <NavbarComp />
      <Outlet />
    </div>
  );
};
