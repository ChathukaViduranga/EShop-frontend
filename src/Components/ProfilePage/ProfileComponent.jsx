import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserDetails } from "../../services/userApiService";

function profileComponent() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getUserDetails();
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100  text-white">
      <div
        className="card bg-dark border-light  justify-content-center align-items-center"
        style={{ width: "30rem", padding: "2rem" }}
      >
        <img
          src="profile.png" // Update with a valid image path or URL
          className="rounded-circle mb-3"
          alt="User Profile"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
        <div
          className="text-start"
          style={{ textAlign: "left", color: "white" }}
        >
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Username: {user.username}</p>
          <p>Role: {user.role}</p>
          <p>Email: {user.email}</p>
        </div>
        <button
          type="button"
          className="btn btn-danger mt-4 w-100 "
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default profileComponent;
