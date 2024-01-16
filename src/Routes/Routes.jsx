import {
    createBrowserRouter,
  } from "react-router-dom";
import EditImg from "../Component/EditImg";
import Pdfimg from "../Component/Image to Pdf/ImageToPDF";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <EditImg></EditImg>
    },
    {
      path: "img",
      element: <Pdfimg></Pdfimg>
    }
  ]);