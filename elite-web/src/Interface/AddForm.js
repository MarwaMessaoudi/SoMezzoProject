import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for HTTP requests

// Declaration of the AddForm component
function AddForm() {
  const navigate = useNavigate();  // Hook for navigation

  // State to store form data
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    birthDate: "",
    role: "",
    password: "",
    confirmPassword: ""
  });

  // State to store form validation errors
  const [errors, setErrors] = useState({});

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = "First Name required";
    if (!formData.last_name) newErrors.last_name = "Last Name required";
    if (!formData.email) newErrors.email = "Email required";
    if (!formData.birthDate) newErrors.birthDate = "Birth Date required";
    if (!formData.role) newErrors.role = "Position required";
    if (!formData.password) newErrors.password = "Password required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    if (validateForm()) {
      const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
  
      if (!token) {
        alert("You need to be logged in to add a user.");
        navigate("/sign-in");
        return;
      }
  
      try {
        const response = await axios.post("http://localhost:8084/Users/add", {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          birthDate: formData.birthDate,
          role: formData.role,
          password: formData.password
        }, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });
  
        if (response.status === 200) {
          navigate("/confirmation");  // Redirect on success
        }
      } catch (error) {
        console.error("Error adding user:", error);
  
        if (error.response && error.response.status === 400) {
          // Specific error handling for duplicate email
          if (error.response.data === "Email already exists.") {
            alert("The email address you provided is already registered. Please use a different email.");
          } else {
            alert("Failed to add the user due to a bad request. Please try again.");
          }
        } else {
          alert("Failed to add the user. Please try again later.");
        }
      }
    }
  };
  

  return (
    <div className="registration-form">
      <h2 className="form-title">Add User</h2>
      <form onSubmit={handleSubmit}>
        {/* Same input fields as the registration form */}
        <div>
          <label>First Name :</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
          {errors.first_name && <p className="error">{errors.first_name}</p>}
        </div>

        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
          {errors.last_name && <p className="error">{errors.last_name}</p>}
        </div>

        <div>
          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <label>Birth Date:</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
          {errors.birthDate && <p className="error">{errors.birthDate}</p>}
        </div>

        <div>
          <label>Position:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select Position</option>
            <option value="EMPLOYEE">Employee</option>
            <option value="CONTROLLER">Controller</option>
          </select>
          {errors.role && <p className="error">{errors.role}</p>}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>

        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default AddForm;
