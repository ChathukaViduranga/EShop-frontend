import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Order() {
  const navigate = useNavigate();
  const checkUser = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  return <div>Order</div>;
}

export default Order;
