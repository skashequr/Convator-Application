import { Outlet } from "react-router-dom";
import FooterR from "../Component/Footer/Footer";
import NavBar from "../Component/NavBar/NavBar";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Pages/Authentication/AuthProvider/Authprovider";
import "./MainLayout.css";

const MainLayout = () => {
  const { mode } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={mode ? "dark" : "light"}>
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <div class="loader"></div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-background to-background2">
          <NavBar></NavBar>
          <Outlet></Outlet>
          <Toaster></Toaster>
          <FooterR></FooterR>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
