import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Component/Main";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>
    },
  ]);