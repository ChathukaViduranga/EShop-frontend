//Product Page

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import InactiveProductComponent from "../Components/ProductPage/InactiveProductComponent";
import SideNavbar from "../Components/ProductPage/SideNavbar";

function InactiveProduct() {
  const navigate = useNavigate();
  const checkUser = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <div className="product-page">
      <SideNavbar />
      <InactiveProductComponent />
    </div>
  );
}

export default InactiveProduct;
