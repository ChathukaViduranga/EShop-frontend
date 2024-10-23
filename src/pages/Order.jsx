import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideNavbar from "../Components/OrderPage/SideNavbar";

import AllOrders from "../Components/OrderPage/AllOrders";
import { getAllOrders } from "../services/orderApiService";

function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        setOrders(response.data);
        console.log(response.data); // Not showing orders
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

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
      <AllOrders orders={orders} />
      <SideNavbar />
    </div>
  );
}

export default Order;
