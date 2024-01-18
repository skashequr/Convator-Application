import { Outlet } from "react-router-dom";
import FooterR from "../Component/Footer/Footer";
import NavBar from "../Component/NavBar/NavBar";

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