import {
    createBrowserRouter,
  } from "react-router-dom";
// import EditImg from "../Component/EditImg";
import Pdfimg from "../Component/Image to Pdf/ImageToPDF";
import AboutUs from "../Pages/AboutUs/AboutUs";
import MainLayout from "../MainLayout/MainLayout";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
          path: "/",
          element: <h1>frtyurtfy</h1>
          
        },
        {
          path: "/about-us",
          element:<AboutUs></AboutUs>
        },
        {

        }
      ]
    },
    {
      path: "img",
      element: <Pdfimg></Pdfimg>
    },
    {
      path: "imgsome",
      element: <Pdfimg></Pdfimg>
    }
  ]);