import React from "react";
import CanceledOrderComp from "../Components/OrderPage/CanceledOrderComp";
import { getCanceledOrders } from "../services/orderApiService";
import { useEffect, useState } from "react";

function CanceledOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getCanceledOrders();
        setOrders(response.data);
        console.log(response.data); // Not showing orders
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <CanceledOrderComp orders={orders} />
    </div>
  );
}

export default CanceledOrder;
