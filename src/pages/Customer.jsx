//Customer page

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AllCustomer from "../Components/Customer/AllCustomer";

function Customer() {
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
  return (
    <div>
      <AllCustomer />
    </div>
  );
}

export default Customer;
