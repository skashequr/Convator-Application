import { createBrowserRouter } from "react-router-dom";

import Homepage from "../Homepage/Homepage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage></Homepage>,
  },
]);
