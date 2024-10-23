//main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import User from "./pages/User.jsx";
import Customer from "./pages/Customer.jsx";
import Product from "./pages/Product.jsx";
import Order from "./pages/Order.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import SideNavbar from "./Components/ProductPage/SideNavbar.jsx";
import LowStockProducts from "./Components/ProductPage/LowStockProducts.jsx";
import Navbar from "./Components/Navbar.jsx";
import UsersSideNavbar from "./Components/User/UsersSideNavbar.jsx";
import CustomerSideNav from "./Components/Customer/CustomerSideNav.jsx";
import CustomerReview from "./pages/CustomerReview.jsx";
import InactiveProduct from "./pages/InactiveProduct.jsx";
import AllUsers from "./pages/AllUsers.jsx";
import ProfileSildeNav from "./Components/ProfilePage/ProfileSideNav.jsx";
import ResetPage from "./pages/ResetPage.jsx";
import SingleOrder from "./pages/SingleOrder.jsx";
import CanceledOrder from "./pages/CanceledOrder.jsx";

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
        <UsersSideNavbar />
      </>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/all-users",
    element: (
      <>
        <Navbar />
        <AllUsers />
        <UsersSideNavbar />
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
        <CustomerSideNav />
      </>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/customer-review",
    element: (
      <>
        <Navbar />
        <CustomerReview />
        <CustomerSideNav />
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
    path: "/add-product",
    element: (
      <>
        <Navbar />
        <AddProduct />
        <SideNavbar />
      </>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/low-stock",
    element: (
      <>
        <Navbar />
        <LowStockProducts />
        <SideNavbar />
      </>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/inactive-products",
    element: (
      <>
        <Navbar />
        <InactiveProduct />
      </>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/product/:id",
    element: (
      <>
        <Navbar />
        <SingleProduct />
        <SideNavbar />
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
    path: "/order/:id",
    element: (
      <>
        <Navbar />
        <SingleOrder />
      </>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/cancel-order",
    element: (
      <>
        <Navbar />
        <CanceledOrder />
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
        <ProfileSildeNav />
      </>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/reset",
    element: (
      <>
        <Navbar />

        <ResetPage />
        <ProfileSildeNav />
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
