import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
  return <div>User</div>;
}

export default User;
