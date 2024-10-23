// UpdateOrderStatus.jsx
import React, { useState } from "react";
import "./UpdateOrderStatusVendor.css"; // Import custom CSS for styling
import { vendorUpdateOrderDelivered } from "../../services/orderApiService";

function UpdateOrderStatus({ orderId, productID, onUpdate, currentStatus }) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const statuses = ["Pending", "Delivered"];

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);
    setError(null);

    try {
      await vendorUpdateOrderDelivered(orderId, productID);
      setLoading(false);
      if (onUpdate) {
        onUpdate(); // Refresh the order data
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      setError("Failed to update order status. Please try again.");
      setLoading(false);
      setStatus(currentStatus); // Revert to previous status
    }
  };

  return (
    <div className="update-order-status-container mt-4">
      <h3>Update Order Status</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-group">
        <label htmlFor="order-status-select">Order Status:</label>
        <select
          id="order-status-select"
          className="form-control bg-secondary text-white"
          value={status}
          onChange={handleStatusChange}
          disabled={loading}
        >
          {statuses.map((statusOption) => (
            <option key={statusOption} value={statusOption}>
              {statusOption}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default UpdateOrderStatus;
