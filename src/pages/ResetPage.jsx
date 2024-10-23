// PasswordReset.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ResetPage.css"; // Import custom CSS for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faKey, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { passwordRest } from "../services/userApiService";

// Import your password reset service function
// import { resetPassword } from "../../services/authApiService";

function ResetPage() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    // Current password validation
    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required.";
    }

    // New password validation
    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "New password is required.";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters.";
    }

    // Confirm new password validation
    if (!formData.confirmNewPassword.trim()) {
      newErrors.confirmNewPassword = "Please confirm the new password.";
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const data = {
        CurrentPassword: formData.currentPassword,
        NewPassword: formData.newPassword,
      };

      try {
        // Call your password reset function here
        await passwordRest(data);

        // Set success message and clear the form
        setSuccessMessage("Password has been reset successfully!");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        setErrors({});
      } catch (error) {
        console.error("Error resetting password:", error);
        setErrors({ submit: "Error resetting password. Please try again." });
      }
    } else {
      console.log("Form has errors.");
    }
  };

  return (
    <div className="container mt-4 password-reset-container">
      <div className="card bg-black text-white">
        <div className="card-body">
          <h2 className="text-center mb-4">Reset Password</h2>

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
            {/* Current Password */}
            <div className="form-group mb-3">
              <label htmlFor="currentPassword">
                <FontAwesomeIcon icon={faLock} /> Current Password
              </label>
              <input
                type="password"
                className={`form-control bg-secondary text-white ${
                  errors.currentPassword ? "is-invalid" : ""
                }`}
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
              />
              {errors.currentPassword && (
                <div className="invalid-feedback">{errors.currentPassword}</div>
              )}
            </div>

            {/* New Password */}
            <div className="form-group mb-3">
              <label htmlFor="newPassword">
                <FontAwesomeIcon icon={faUnlockAlt} /> New Password
              </label>
              <input
                type="password"
                className={`form-control bg-secondary text-white ${
                  errors.newPassword ? "is-invalid" : ""
                }`}
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
              />
              {errors.newPassword && (
                <div className="invalid-feedback">{errors.newPassword}</div>
              )}
            </div>

            {/* Confirm New Password */}
            <div className="form-group mb-4">
              <label htmlFor="confirmNewPassword">
                <FontAwesomeIcon icon={faKey} /> Confirm New Password
              </label>
              <input
                type="password"
                className={`form-control bg-secondary text-white ${
                  errors.confirmNewPassword ? "is-invalid" : ""
                }`}
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleInputChange}
              />
              {errors.confirmNewPassword && (
                <div className="invalid-feedback">
                  {errors.confirmNewPassword}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary btn-block">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPage;
