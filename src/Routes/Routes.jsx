import { createBrowserRouter } from "react-router-dom";

// import Homepage from "../Homepage/Homepage";
import EditImg from "../Component/EditImg";
import Login from "../Pages/Authentication/Login/Login";
import Signup from "../Pages/Authentication/SignIn/Signup";
import ErrorPage from "../Pages/Errorpage/Errorpage";
import Pdfimg from "../Component/Image to Pdf/ImageToPDF";
import AboutUs from "../Pages/AboutUs/AboutUs";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Features from "../Pages/Features/Features";
import PdfWatermark from "../Pages/Watermarkpdf/Watermarkpdf";
import YbVideoToaudio from "../Pages/Yb-vid-mp3/YbVideoToaudio";
import Massage from "../Pages/Massage/Massage";
import WelcomeMassage from "../Pages/Massage/WelcomeMassage";
import OpenChat from "../Pages/Massage/OpenChat";
import MassageLogin from "../Pages/Massage/MassageLogin";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/aboutUs",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/editimg",
        element: <EditImg></EditImg>,
      },
      {
        path: "/imgtopdf",
        element: <Pdfimg></Pdfimg>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/aboutUs",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/feateres",
        element: <Features></Features>,
      },
      {
        path: "/watermark",
        element: <PdfWatermark></PdfWatermark>,
      },
      {
        path: "/ybvidtoaudio",
        element: <YbVideoToaudio></YbVideoToaudio>,
      },
      
    ],
  },
  {
    path: "/massage",
    // element: <Massage></Massage>,
    element: <MassageLogin></MassageLogin>,
    children: [
      {
        path: "ok" ,
        element: <OpenChat></OpenChat>
      },
      {
        path: "/massage/massagestart",
        element: <Massage></Massage>,
      },
      {
        path: "/massage/massagelogin",

      }
     
    ]
  }
]);
