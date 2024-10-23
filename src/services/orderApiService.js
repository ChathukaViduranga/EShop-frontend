import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getAllOrders = async () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  try {
    if (role === "Administrator") {
      const response = await axios.get(`${baseUrl}/order/all`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the bearer token here
        },
      });

      return response;
    }

    if (role === "Vendor") {
      const response = await axios.get(`${baseUrl}/order/vendor-orders`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the bearer token here
        },
      });
      return response;
    }
  } catch (error) {
    return error;
  }
};

export const getOrderById = async (orderId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${baseUrl}/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the bearer token here
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const vendorUpdateOrderDelivered = async (OrderId, ProductId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `${baseUrl}/order/mark-product-delivered`,
      { OrderId, ProductId },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the bearer token here
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getCanceledOrders = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${baseUrl}/order/cancellation-requests`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the bearer token here
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
