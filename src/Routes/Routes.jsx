import { createBrowserRouter } from "react-router-dom";
import EditImg from "../Component/EditImg";
import Pdfimg from "../Component/Image to Pdf/ImageToPDF";
import MainLayout from "../MainLayout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/edit-img",
        element: <EditImg />,
      },
      {
        path: "/img-to-pdf",
        element: <Pdfimg></Pdfimg>,
      },
    ],
  },
]);
