import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes

const UpdateEmp = ({ userId, onSubmit, onLogout }) => {
  const navigate = useNavigate();
  const [sessionExpired, setSessionExpired] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    birthDate: "",
    role: "",
    password: "",
    isActive: false,
  });

  //-------------------------- Token Expiration Logic --------------------------//
  const performLogout = () => {
    // Clear tokens from storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    // Redirect to login page
    navigate("/sign-in");
  };

  const handleTokenExpiry = () => {
    const accessToken =
      localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        const expiryTime = decodedToken.exp * 1000; // Convert expiry time to milliseconds
        const currentTime = Date.now();

        if (expiryTime > currentTime) {
          // Set a timeout to log out when the token expires
          setTimeout(() => {
            performLogout();
          }, expiryTime - currentTime);
        } else {
          performLogout(); // Immediate logout if the token is already expired
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        performLogout(); // Logout in case of any decoding errors
      }
    } else {
      performLogout(); // Logout if no token is found
    }
  };

  //------------------ Session Timeout Logic ------------------ //
  useEffect(() => {
    handleTokenExpiry();
  }, []); // Runs once when the component is mounted
  
  useEffect(() => {
    let inactivityTimer;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        setSessionExpired(true);
        onLogout(); // Perform logout when the session times out
        alert("Your session has expired due to inactivity. Redirecting to login...");
        navigate("/sign-in"); // Redirect to login page
      }, INACTIVITY_TIMEOUT);
    };

    const events = ["mousemove", "keydown", "scroll", "click"];
    events.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer);
    });

    resetInactivityTimer(); // Initialize inactivity timer

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach((event) => {
        window.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, [onLogout, navigate]);

  // Fetch user data for editing
  useEffect(() => {
    if (userId) {
      axios.get(`/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")}`,
        },
      })
      .then(response => {
        setFormData({
          first_name: response.data.first_name || "",
          last_name: response.data.last_name || "",
          email: response.data.email || "",
          birthDate: response.data.birthDate ? response.data.birthDate.split("T")[0] : "",
          role: response.data.role || "",
          password: response.data.password || "",
          isActive: response.data.isActive || false,
        });
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        // Optionally, handle error here (e.g., show alert)
      });
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make PUT request to update user
    axios.put(`localhost:8084/Users/update/{id}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")}`,
      },
    })
    .then(response => {
      onSubmit(response.data);  // Handle success, e.g., show confirmation
      alert("User updated successfully!");
    })
    .catch(error => {
      console.error("Error updating user:", error);
      // Optionally, handle error here (e.g., show alert)
    });
  };

  if (sessionExpired) {
    return null; // No UI is rendered if the session is expired
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group" key="first_name">
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="Enter first name"
          required
          className="form-control"
        />
      </div>
      <div className="form-group" key="last_name">
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Enter last name"
          required
          className="form-control"
        />
      </div>
      <div className="form-group" key="email">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          required
          className="form-control"
        />
      </div>
      <div className="form-group" key="birthDate">
        <label htmlFor="birthDate">Birth Date</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group" key="password">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary" style={{ marginTop: "1rem" }}>
        Update User
      </button>
    </form>
  );
};

export default UpdateEmp;
