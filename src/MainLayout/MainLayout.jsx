import { Outlet } from "react-router-dom";
import FooterR from "../Component/Footer/Footer";
import NavBar from "../Component/NavBar/NavBar";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../Pages/Authentication/AuthProvider/Authprovider";

const MainLayout = () => {
  const { mode } = useContext(AuthContext);

  return (
    <div className={mode ? "dark" : "light"}>
      <div className="bg-gradient-to-r from-background to-background2">
        <NavBar></NavBar>
        <Outlet></Outlet>
        <Toaster></Toaster>
        <FooterR></FooterR>
      </div>
    </div>
  );
};

export default MainLayout;
