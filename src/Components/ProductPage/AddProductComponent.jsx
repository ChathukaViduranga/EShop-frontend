// AddProduct.js
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddProduct.css"; // Import custom CSS for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTag,
  faList,
  faInfoCircle,
  faDollarSign,
  faImage,
  faBoxes,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

import { getAllCategories, addProduct } from "../../services/productApiService";

function AddProductComponent() {
  const [formData, setFormData] = useState({
    name: "",
    category: "", // This will hold the category ID
    description: "",
    price: "",
    ImageBase64: null, // Changed from 'image' to 'ImageBase64'
    quantity: "",
    lowStockThreshold: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // For success feedback

  const [categories, setCategories] = useState([]); // State variable for categories

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data); // Adjust based on your API response structure
        console.log("Categories:", response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Function to handle image file and convert it to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size (optional)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ImageBase64: "Image size should be less than 5MB.",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          ImageBase64: reader.result.split(",")[1], // Remove the data URL prefix
        }));
        setErrors((prevErrors) => ({
          ...prevErrors,
          ImageBase64: null,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required.";
    if (!formData.category) newErrors.category = "Category is required.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!formData.price) {
      newErrors.price = "Price is required.";
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = "Enter a valid positive number.";
    }
    if (!formData.quantity) {
      newErrors.quantity = "Quantity is required.";
    } else if (
      !Number.isInteger(Number(formData.quantity)) ||
      Number(formData.quantity) < 0
    ) {
      newErrors.quantity = "Enter a valid non-negative integer.";
    }
    if (!formData.lowStockThreshold) {
      newErrors.lowStockThreshold = "Low stock threshold is required.";
    } else if (
      !Number.isInteger(Number(formData.lowStockThreshold)) ||
      Number(formData.lowStockThreshold) < 0
    ) {
      newErrors.lowStockThreshold = "Enter a valid non-negative integer.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Updated handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form is valid. Ready to submit.");

      // Create data object
      const data = {
        name: formData.name,
        CategoryIds: [formData.category], // Use 'categoryId' and send the category ID
        description: formData.description,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        lowStockThreshold: Number(formData.lowStockThreshold),
        ImageBase64: formData.ImageBase64, // Use 'ImageBase64' as the key
      };

      try {
        // Call the addProduct function
        const response = await addProduct(data);
        console.log("Product added successfully:", response.data);

        // Clear the form and display success message
        setFormData({
          name: "",
          CategoryIds: [],
          description: "",
          price: "",
          ImageBase64: null,
          quantity: "",
          lowStockThreshold: "",
        });
        setErrors({});
        setSuccessMessage("Product added successfully!");
      } catch (error) {
        console.error("Error adding product:", error);
        setErrors({ submit: "Error adding product. Please try again." });
      }
    } else {
      console.log("Form has errors.");
    }
  };

  return (
    <div className="container mt-4 add-product-container">
      <div className="card bg-black text-white">
        <div className="card-body">
          <h2 className="text-center mb-4">Add a New Product</h2>

          {/* Display success message */}
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}

          {/* Display submission errors */}
          {errors.submit && (
            <div className="alert alert-danger" role="alert">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Product Name */}
            <div className="form-group mb-3">
              <label htmlFor="name">
                <FontAwesomeIcon icon={faTag} /> Product Name
              </label>
              <input
                type="text"
                className={`form-control bg-secondary text-white ${
                  errors.name ? "is-invalid" : ""
                }`}
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

            {/* Category */}
            <div className="form-group mb-3">
              <label htmlFor="category">
                <FontAwesomeIcon icon={faList} /> Category
              </label>
              <select
                className={`form-control bg-secondary text-white ${
                  errors.category ? "is-invalid" : ""
                }`}
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <div className="invalid-feedback">{errors.category}</div>
              )}
            </div>

            {/* Description */}
            <div className="form-group mb-3">
              <label htmlFor="description">
                <FontAwesomeIcon icon={faInfoCircle} /> Description
              </label>
              <textarea
                className={`form-control bg-secondary text-white ${
                  errors.description ? "is-invalid" : ""
                }`}
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
              {errors.description && (
                <div className="invalid-feedback">{errors.description}</div>
              )}
            </div>

            {/* Price */}
            <div className="form-group mb-3">
              <label htmlFor="price">
                <FontAwesomeIcon icon={faDollarSign} /> Price
              </label>
              <input
                type="number"
                className={`form-control bg-secondary text-white ${
                  errors.price ? "is-invalid" : ""
                }`}
                id="price"
                name="price"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
              />
              {errors.price && (
                <div className="invalid-feedback">{errors.price}</div>
              )}
            </div>

            {/* Image */}
            <div className="form-group mb-3">
              <label htmlFor="image">
                <FontAwesomeIcon icon={faImage} /> Image
              </label>
              <input
                type="file"
                className={`form-control bg-secondary text-white ${
                  errors.ImageBase64 ? "is-invalid" : ""
                }`}
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
              {errors.ImageBase64 && (
                <div className="invalid-feedback">{errors.ImageBase64}</div>
              )}
            </div>

            {/* Quantity */}
            <div className="form-group mb-3">
              <label htmlFor="quantity">
                <FontAwesomeIcon icon={faBoxes} /> Quantity
              </label>
              <input
                type="number"
                className={`form-control bg-secondary text-white ${
                  errors.quantity ? "is-invalid" : ""
                }`}
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
              />
              {errors.quantity && (
                <div className="invalid-feedback">{errors.quantity}</div>
              )}
            </div>

            {/* Low Stock Threshold */}
            <div className="form-group mb-4">
              <label htmlFor="lowStockThreshold">
                <FontAwesomeIcon icon={faExclamationTriangle} /> Low Stock
                Threshold
              </label>
              <input
                type="number"
                className={`form-control bg-secondary text-white ${
                  errors.lowStockThreshold ? "is-invalid" : ""
                }`}
                id="lowStockThreshold"
                name="lowStockThreshold"
                value={formData.lowStockThreshold}
                onChange={handleInputChange}
              />
              {errors.lowStockThreshold && (
                <div className="invalid-feedback">
                  {errors.lowStockThreshold}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary btn-block">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProductComponent;
