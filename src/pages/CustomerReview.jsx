//Customer page

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CustomerReviewComponent from "../Components/Customer/CustomerReviewComponent";

function CustomerReview() {
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
      <CustomerReviewComponent />
    </div>
  );
}

export default CustomerReview;
