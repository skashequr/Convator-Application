import { createBrowserRouter } from "react-router-dom";

import Homepage from "../Homepage/Homepage";
import EditImg from "../Component/EditImg";
import Login from "../Pages/Authentication/Login/Login";
import Signup from "../Pages/Authentication/SignIn/Signup";
import ErrorPage from "../Pages/Errorpage/Errorpage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <Homepage></Homepage>,
  },
  {
    path: "editimg",
    element: <EditImg></EditImg>,
  },
  {
    path: "login",
    element: <Login></Login>,
  },
  {
    path: "signup",
    element: <Signup></Signup>,
  },
]);
