import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function AllOrders() {
  const [searchTerm, setSearchTerm] = useState("");

  const orders = [
    {
      id: "670434a88959e890b598b124",
      name: "Sample Product",
      description: "This is a sample product description.",
      price: 49.99,
      quantity: 10,
      stock: 10,
      isActive: true,
      lowStockThreshold: 10,
      vendorId: "67021d9d0e4b4d264f5a205d",
    },
    // Add more orders if needed
  ];

  return <div>AllOrders</div>;
}

export default AllOrders;
