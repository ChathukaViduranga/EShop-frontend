//user page

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AddUsers from "../Components/User/AddUsers";

function User() {
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
      <AddUsers />
    </div>
  );
}

export default User;
