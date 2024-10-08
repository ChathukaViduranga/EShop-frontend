//Product Service Api

import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getAllProducts = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseUrl}/product`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the bearer token here
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

//add product
export const addProduct = async (product) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(`${baseUrl}/product`, product, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the bearer token here
        "Content-Type": "application/json", // Ensure the content type is JSON
      },
    });

    return response;
  } catch (error) {
    console.error("Error adding product:", error);
    return error;
  }
};

// update product

export const updateProduct = async (product) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${baseUrl}/product/${product.id}`,
      product,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the bearer token here
          "Content-Type": "application/json", // Ensure the content type is JSON
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error updating product:", error);
    return error;
  }
};

//update product quantity
export const updateProductQuantity = async (productId, newQuantity) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${baseUrl}/product/${productId}/quantity`,
      newQuantity,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the bearer token here
          "Content-Type": "application/json", // Ensure the content type is JSON
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error updating product quantity:", error);
    return error;
  }
};

//product activate

export const activateProduct = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${baseUrl}/product/activate/${productId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the bearer token here
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error activating product:", error);
    return error;
  }
};

//product deactivate

export const deactivateProduct = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${baseUrl}/product/deactivate/${productId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the bearer token here
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error deactivating product:", error);
    return error;
  }
};

//delete product

export const deleteProduct = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${baseUrl}/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the bearer token here
      },
    });

    return response;
  } catch (error) {
    console.error("Error deleting product:", error);
    return error;
  }
};
