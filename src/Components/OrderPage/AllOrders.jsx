import React from "react";
import OrderTable from "./OrderTable";
import "bootstrap/dist/css/bootstrap.min.css";

function AllOrders({ orders }) {
  return (
    <div>
      <OrderTable orders={orders} />
    </div>
  );
}

export default AllOrders;
