//Login Page

import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { userLogin } from "../services/userApiService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
    try {
      // Make the login request
      const response = await userLogin(email, password);
      console.log(response.status);

      // If the response is successful, redirect to the home page

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/");
      } else if (response.status === 401) {
        setAlert("Invalid email or password");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      }
    } catch (error) {
      setAlert("Something Went wrong");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-90">
      <img
        src="./login.svg"
        alt=""
        style={{ width: "10rem", margin: "4rem" }}
      />
      <div className="card text-white bg-dark" style={{ width: "20rem" }}>
        <div className="card-body">
          <h5 className="card-title text-center">Login</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
              />
            </div>
            <button type="submit" className="btn btn-light w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
      {showAlert && (
        <div class="alert alert-danger" role="alert">
          {alert}
        </div>
      )}
    </div>
  );
}
