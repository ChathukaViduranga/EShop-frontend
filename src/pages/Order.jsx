//Order page

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AllOrders from "../Components/OrderPage/AllOrders";

function Order() {
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
      <AllOrders />
    </div>
  );
}

export default Order;
