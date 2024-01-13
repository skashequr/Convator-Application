import {
    createBrowserRouter,
  } from "react-router-dom";
import EditImg from "../Component/EditImg";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <EditImg></EditImg>
    },
  ]);