import React, { useState } from "react";

function AddUsers() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "Customer",
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    // Here you would typically make a request to your API to register the user
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100  text-white">
      <div
        className="card  border-dark"
        style={{ width: "40rem", padding: "2rem" }}
      >
        <h3 className="text-center mb-4">Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* User Details Column */}
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dateOfBirth" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Address Details Column */}
            <div className="col-md-6">
              <h5>Address</h5>
              <div className="mb-3">
                <label htmlFor="street" className="form-label">
                  Street
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="postalCode" className="form-label">
                  Postal Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="postalCode"
                  name="address.postalCode"
                  value={formData.address.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  name="address.country"
                  value={formData.address.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-light w-100 mt-4">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUsers;
