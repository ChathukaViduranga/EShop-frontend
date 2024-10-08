//All Orders Details Component
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function AllOrders() {
  const orderData = {
    id: "6703a56308599eadd3a75a6f",
    userId: "6702652d1a6a34bf70d2d7ec",
    items: [
      {
        productId: "6703a52008599eadd3a75a6e",
        quantity: 1,
        price: 19.99,
        vendorId: "67021d9d0e4b4d264f5a205d",
        status: "Delivered",
      },
      {
        productId: "6703a51808599eadd3a75a6d",
        quantity: 1,
        price: 19.99,
        vendorId: "67021d9d0e4b4d264f5a205d",
        status: "Delivered",
      },
    ],
    orderDate: "2024-10-07T09:09:55.171Z",
    status: "Processing",
    cancellationNote: null,
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Order Details</h2>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Cancellation Note</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderData.id}</td>
            <td>{orderData.userId}</td>
            <td>{new Date(orderData.orderDate).toLocaleDateString()}</td>
            <td>{orderData.status}</td>
            <td>{orderData.cancellationNote || "N/A"}</td>
          </tr>
        </tbody>
      </table>

      <h3 className="text-center mt-5">Item Details</h3>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Vendor ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orderData.items.map((item, index) => (
            <tr key={index}>
              <td>{item.productId}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.vendorId}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllOrders;
