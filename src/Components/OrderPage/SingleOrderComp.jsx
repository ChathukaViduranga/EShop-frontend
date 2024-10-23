// SingleOrderComp.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SingleOrderComp.css"; // Import custom CSS for additional styling
import UpdateOrderStatusVendor from "./UpdateOrderStateVendorComp";

function SingleOrderComp({ order, onUpdate }) {
  console.log("order", order);
  const { id, userId, items, orderDate, status, total, cancellationNote } =
    order;

  // Format the order date
  const formattedOrderDate = new Date(orderDate).toLocaleString();

  return (
    <div className="single-order-container">
      <div className="container mt-4">
        <div className="card bg-black text-white">
          <div className="card-body">
            <h2 className="text-center mb-4">Order Details</h2>
            <table className="table table-dark table-striped">
              <tbody>
                <tr>
                  <th scope="row">Order ID</th>
                  <td>{id}</td>
                </tr>
                <tr>
                  <th scope="row">User ID</th>
                  <td>{userId}</td>
                </tr>
                <tr>
                  <th scope="row">Order Date</th>
                  <td>{formattedOrderDate}</td>
                </tr>
                <tr>
                  <th scope="row">Status</th>
                  <td>{status}</td>
                </tr>
                <tr>
                  <th scope="row">Total</th>
                  <td>${total.toFixed(2)}</td>
                </tr>
                {cancellationNote && (
                  <tr>
                    <th scope="row">Cancellation Note</th>
                    <td>{cancellationNote}</td>
                  </tr>
                )}
              </tbody>
            </table>

            <h3 className="mt-5">Items in Order</h3>
            <table className="table table-dark table-striped mt-3">
              <thead>
                <tr>
                  <th scope="col">Product ID</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Vendor ID</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.productId}</td>
                    <td>{item.productName || "N/A"}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>{item.vendorId}</td>
                    <td>{item.status}</td>
                    <td>
                      <UpdateOrderStatusVendor
                        orderId={id}
                        productID={item.productId}
                        onUpdate={onUpdate}
                        currentStatus={item.status}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* You can add buttons or additional actions here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleOrderComp;
