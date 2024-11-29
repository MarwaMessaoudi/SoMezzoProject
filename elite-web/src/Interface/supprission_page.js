import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./supprission.css";

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 5 minutes

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

  //-------------------- Load Users -----------------------//
  useEffect(() => {
    if (!sessionExpired) {
      axios
        .get("http://localhost:8084/Users/alluser")
        .then((response) => setUsers(response.data))
        .catch((error) => console.error("Error loading users:", error));
    }
  }, [sessionExpired]); // Reload users only when session is active

  //-------------------- Delete User -----------------------//
  const deleteUser = (id) => {
    const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
  
    if (!token) {
      alert("You need to be logged in to delete a user.");
      navigate("/sign-in");
      return;
    }
  
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:8084/Users/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting:", error);
          alert("Failed to delete the user. Please try again later.");
        });
    }
  };
  
  //-------------------- Render -----------------------//
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
                    <th>Actif</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.isActive ? "Yes" : "No"}</td>
                        <td>
                            <button onClick={() => deleteUser(user.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
};

export default UserTable;

