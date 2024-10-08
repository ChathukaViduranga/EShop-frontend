import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ProfileComponent from "../Components/ProfilePage/profileComponent";

function Profile() {
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
      <ProfileComponent />
    </div>
  );
}

export default Profile;
