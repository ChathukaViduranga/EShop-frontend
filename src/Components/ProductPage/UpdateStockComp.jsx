// UpdateStock.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  updateProductQuantity,
  deactivateProduct,
  deleteProduct,
} from "../../services/productApiService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UpdateStock.css"; // Optional CSS file for styling

function UpdateStock({ product, onUpdate }) {
  const [stock, setStock] = useState(product.stock);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleStockChange = (e) => {
    setStock(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const updatedStock = parseInt(stock, 10);
      if (isNaN(updatedStock) || updatedStock < 0) {
        setError("Please enter a valid stock quantity.");
        setLoading(false);
        return;
      }

      await updateProductQuantity(product.id, updatedStock);
      setLoading(false);
      // Call the onUpdate callback to refresh the product data
      if (onUpdate) {
        onUpdate();
      }
    } catch (err) {
      console.error("Error updating stock:", err);
      setError("Failed to update stock. Please try again.");
      setLoading(false);
    }
  };

  const deactivate = async () => {
    try {
      await deactivateProduct(product.id);
      if (onUpdate) {
        onUpdate();
      }
    } catch (err) {
      console.error("Error deactivating product:", err);
      setError("Failed to deactivate product. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      navigate("/product");

      if (onUpdate) {
        onUpdate();
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product. Please try again.");
    }
  };

  return (
    <div className="update-stock-container container  mt-4">
      {role === "Administrator" && (
        <>
          {" "}
          <h3 className="mt-4">Deactivate Listing</h3>
          <button onClick={deactivate} className="btn btn-danger mb-2 ml-2">
            Deactivate
          </button>
        </>
      )}

      {role === "Vendor" && (
        <>
          <h3>Add Stock</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit} className="form-inline">
            <div className="form-group mb-2">
              <label htmlFor="stock" className="sr-only">
                Add Stock
              </label>
              <input
                type="number"
                className="form-control"
                id="stock"
                onChange={handleStockChange}
                min="0"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary mb-2 ml-2"
              disabled={loading}
            >
              {loading ? "adding..." : "Add Stock"}
            </button>
          </form>
          <h3 className="mt-4">Delete Listing</h3>
          <button onClick={handleDelete} className="btn btn-danger mb-2 ml-2">
            Delete Listing
          </button>
        </>
      )}
    </div>
  );
}

export default UpdateStock;
