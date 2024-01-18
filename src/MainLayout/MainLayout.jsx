import { Outlet } from "react-router-dom";
import NavBar from "../Component/NavBar/NavBar";
import Footer from "../Component/Footer/Footer";
import FooterR from "../Component/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <FooterR></FooterR>
    </div>
  );
};

export default MainLayout;
