// AddUser.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddUser.css"; // Import custom CSS for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addUser } from "../../services/userApiService";
import {
  faUser,
  faEnvelope,
  faLock,
  faUserTag,
  faFileImage,
  faUserCircle,
  faKey,
} from "@fortawesome/free-solid-svg-icons";

function AddUser() {
  const [formData, setFormData] = useState({
    profilePic: null,
    email: "",
    tempPassword: "",
    confirmPassword: "",
    role: "",
    firstName: "",
    lastName: "",
    VendorName: "",
    VendorDescription: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const roles = ["Administrator", "Vendor", "CSR"]; // Roles for the dropdown

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "profilePic" ? files[0] : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    // Temporary password validation
    if (!formData.tempPassword.trim()) {
      newErrors.tempPassword = "Temporary password is required.";
    } else if (formData.tempPassword.length < 6) {
      newErrors.tempPassword = "Password must be at least 6 characters.";
    }

    // Confirm password validation
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm the temporary password.";
    } else if (formData.tempPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = "Role is required.";
    }

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    // Vendor fields validation (only if role is Vendor)
    if (formData.role === "Vendor") {
      if (!formData.VendorName.trim()) {
        newErrors.VendorName = "Vendor name is required for Vendor role.";
      }
      if (!formData.VendorDescription.trim()) {
        newErrors.VendorDescription =
          "Vendor description is required for Vendor role.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const data = {
        email: formData.email,
        username: formData.email,
        passwordHash: formData.tempPassword,
        role: formData.role,
        firstName: formData.firstName,
        lastName: formData.lastName,
        VendorName: formData.VendorName,
        VendorDescription: formData.VendorDescription,
      };

      try {
        await addUser(data);
        // Set success message and clear the form
        setSuccessMessage("User added successfully!");
        setFormData({
          profilePic: null,
          email: "",
          tempPassword: "",
          confirmPassword: "",
          role: "",
          firstName: "",
          lastName: "",
          VendorName: "",
          VendorDescription: "",
        });
        setErrors({});
      } catch (error) {
        console.error("Error adding user:", error);
        setErrors({ submit: "Error adding user. Please try again." });
      }
    } else {
      console.log("Form has errors.");
    }
  };

  return (
    <div className="container mt-4 add-user-container">
      <div className="card bg-black text-white">
        <div className="card-body">
          <h2 className="text-center mb-4">Add New User</h2>
          {/* Display success message */}
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          {/* Display submission errors */}
          {errors.submit && (
            <div className="alert alert-danger" role="alert">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Profile Picture */}
            <div className="form-group mb-3">
              <label htmlFor="profilePic">
                <FontAwesomeIcon icon={faFileImage} /> Profile Picture
              </label>
              <input
                type="file"
                className="form-control bg-secondary text-white"
                id="profilePic"
                name="profilePic"
                accept="image/*"
                onChange={handleInputChange}
              />
            </div>

            {/* Email */}
            <div className="form-group mb-3">
              <label htmlFor="email">
                <FontAwesomeIcon icon={faEnvelope} /> Email
              </label>
              <input
                type="email"
                className={`form-control bg-secondary text-white ${
                  errors.email ? "is-invalid" : ""
                }`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            {/* Temporary Password */}
            <div className="form-group mb-3">
              <label htmlFor="tempPassword">
                <FontAwesomeIcon icon={faLock} /> Temporary Password
              </label>
              <input
                type="password"
                className={`form-control bg-secondary text-white ${
                  errors.tempPassword ? "is-invalid" : ""
                }`}
                id="tempPassword"
                name="tempPassword"
                value={formData.tempPassword}
                onChange={handleInputChange}
              />
              {errors.tempPassword && (
                <div className="invalid-feedback">{errors.tempPassword}</div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group mb-3">
              <label htmlFor="confirmPassword">
                <FontAwesomeIcon icon={faKey} /> Confirm Password
              </label>
              <input
                type="password"
                className={`form-control bg-secondary text-white ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </div>

            {/* Role */}
            <div className="form-group mb-3">
              <label htmlFor="role">
                <FontAwesomeIcon icon={faUserTag} /> Role
              </label>
              <select
                className={`form-control bg-secondary text-white ${
                  errors.role ? "is-invalid" : ""
                }`}
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {errors.role && (
                <div className="invalid-feedback">{errors.role}</div>
              )}
            </div>

            {/* First Name */}
            <div className="form-group mb-3">
              <label htmlFor="firstName">
                <FontAwesomeIcon icon={faUser} /> First Name
              </label>
              <input
                type="text"
                className={`form-control bg-secondary text-white ${
                  errors.firstName ? "is-invalid" : ""
                }`}
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              {errors.firstName && (
                <div className="invalid-feedback">{errors.firstName}</div>
              )}
            </div>

            {/* Last Name */}
            <div className="form-group mb-4">
              <label htmlFor="lastName">
                <FontAwesomeIcon icon={faUserCircle} /> Last Name
              </label>
              <input
                type="text"
                className={`form-control bg-secondary text-white ${
                  errors.lastName ? "is-invalid" : ""
                }`}
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              {errors.lastName && (
                <div className="invalid-feedback">{errors.lastName}</div>
              )}
            </div>

            {/* Vendor Fields (conditionally rendered) */}
            {formData.role === "Vendor" && (
              <>
                {/* Vendor Name */}
                <div className="form-group mb-4">
                  <label htmlFor="VendorName">
                    <FontAwesomeIcon icon={faUserCircle} /> Vendor Name
                  </label>
                  <input
                    type="text"
                    className={`form-control bg-secondary text-white ${
                      errors.VendorName ? "is-invalid" : ""
                    }`}
                    id="VendorName"
                    name="VendorName"
                    value={formData.VendorName}
                    onChange={handleInputChange}
                  />
                  {errors.VendorName && (
                    <div className="invalid-feedback">{errors.VendorName}</div>
                  )}
                </div>

                {/* Vendor Description */}
                <div className="form-group mb-4">
                  <label htmlFor="VendorDescription">
                    <FontAwesomeIcon icon={faUserCircle} /> Vendor Description
                  </label>
                  <input
                    type="text"
                    className={`form-control bg-secondary text-white ${
                      errors.VendorDescription ? "is-invalid" : ""
                    }`}
                    id="VendorDescription"
                    name="VendorDescription"
                    value={formData.VendorDescription}
                    onChange={handleInputChange}
                  />
                  {errors.VendorDescription && (
                    <div className="invalid-feedback">
                      {errors.VendorDescription}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary btn-block">
              Add User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
