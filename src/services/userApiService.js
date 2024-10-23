// user Service Api

import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const userLogin = async (email, password) => {
  try {
    const response = await axios.post(`${baseUrl}/user/login`, {
      Email: email,
      PasswordHash: password,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getUserPermissions = async (permission) => {
  const role = localStorage.getItem("role");

  if (role === "Administrator") {
    const adminPermissions = [
      "productpage",
      "customerpage",
      "orderpage",
      "userpage",
      "singleproductpage",
      "lowstockpage",
    ];
    return adminPermissions.includes(permission);
  }
  if (role === "Vendor") {
    const vendorPermissions = [
      "productpage",
      "addproductpage",
      "productNotification",
      "orderpage",
    ];
    return vendorPermissions.includes(permission);
  }

  // If role is 'user' or any other role, return false for all permissions
  return false;
};

//get current user details
export const getUserDetails = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseUrl}/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

//delete current user account
export const deleteMyAccount = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${baseUrl}/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

//getAllCustomers
export const getAllCustomers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseUrl}/user/customers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getInactiveCustomers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseUrl}/user/inactive-users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const activateCustomer = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${baseUrl}/user/reactivate/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseUrl}/user/all-users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const addUser = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${baseUrl}/user/register`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const passwordRest = async (data) => {
  try {
    const response = await axios.put(`${baseUrl}/user/reset-password`, data);
    return response;
  } catch (error) {
    return error;
  }
};
