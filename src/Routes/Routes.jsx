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
import Mp4ToMp3Converter from "../Pages/Mp4-mp3/videoToAudio";

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
        path: "/ybvidtoaudio",
        element: <YbVideoToaudio></YbVideoToaudio>,
      },
      {
        path: "/video",
        element: <Mp4ToMp3Converter></Mp4ToMp3Converter>,
      },

      {
        path: "/watermark",
        element: <PdfWatermark></PdfWatermark>,
      },
    ],
  },
]);
