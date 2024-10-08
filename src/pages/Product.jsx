//Product Page

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AllProducts from "../Components/ProductPage/AllProducts";

function Product() {
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
    <div>
      <AllProducts />
    </div>
  );
}

export default Product;
