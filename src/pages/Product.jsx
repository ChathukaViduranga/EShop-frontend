//Product Page

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AllProducts from "../Components/ProductPage/AllProducts";
import SideNavbar from "../Components/ProductPage/SideNavbar";
import NotificationButton from "../Components/ProductPage/NotificationButton";
import { vendorGetLowStockProducts } from "../services/productApiService";
import { getUserPermissions } from "../services/userApiService";

function Product() {
  const navigate = useNavigate();
  const checkUser = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  };

  const [notifications, setNotifications] = useState([]);
  const [notificationPermission, setNotificationPermission] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await vendorGetLowStockProducts();
        setNotifications(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await getUserPermissions("productNotification");
        setNotificationPermission(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPermissions();
  }, []);

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <div className="product-page">
      <SideNavbar />
      <AllProducts />
      {notificationPermission && (
        <NotificationButton notifications={notifications} />
      )}
    </div>
  );
}

export default Product;
