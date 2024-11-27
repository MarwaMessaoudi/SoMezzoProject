import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes

const UserTable = ({ onLogout }) => {
  const navigate = useNavigate();
  const [sessionExpired, setSessionExpired] = useState(false);
  const [users, setUsers] = useState([]);

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

  // Monitor session expiration and token expiry on component mount
  useEffect(() => {
    handleTokenExpiry();
  }, []); // Runs once when the component is mounted

  //---------------------------- Session Timeout Logic ------------------------//
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

  //-------------------- Fetch Users Logic --------------------//
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error loading users:", error));
  }, []);

  //-------------------- Handle Edit Click --------------------//
  const handleEditClick = (id) => {
    navigate(`/edit/${id}`); // Redirect with the user ID
  };

  //-------------------- Render Based on Session Expiry -----------------------//
  if (sessionExpired) {
    return null; // No UI is rendered if the session is expired
  }

  return (
    <div>
      <h2>User List</h2>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First name</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isActive ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => handleEditClick(user.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
