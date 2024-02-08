import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./Routes/Routes.jsx";
import Authprovider from "./Pages/Authentication/AuthProvider/Authprovider.jsx";
import { HelmetProvider } from "react-helmet-async";


const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Authprovider>
          <RouterProvider router={router} />
        </Authprovider>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
