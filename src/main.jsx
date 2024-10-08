import { StrictMode } from "react";
import * as bootstrap from "bootstrap";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import User from "./pages/User.jsx";
import Customer from "./pages/Customer.jsx";
import Product from "./pages/Product.jsx";
import Order from "./pages/Order.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";

import Navbar from "./Components/Navbar.jsx";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/user",
    element: (
      <>
        <Navbar />
        <User />
      </>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/customer",
    element: (
      <>
        <Navbar />
        <Customer />
      </>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/product",
    element: (
      <>
        <Navbar />
        <Product />
      </>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/order",
    element: (
      <>
        <Navbar />
        <Order />
      </>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/profile",
    element: (
      <>
        <Navbar />
        <Profile />
      </>
    ),
    errorElement: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
