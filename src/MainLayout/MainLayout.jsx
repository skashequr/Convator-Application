import { Outlet } from "react-router-dom";
import FooterR from "../Component/Footer/Footer";
import NavBar from "../Component/NavBar/NavBar";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Toaster></Toaster>
      <FooterR></FooterR>
    </div>
  );
};

export default MainLayout;
