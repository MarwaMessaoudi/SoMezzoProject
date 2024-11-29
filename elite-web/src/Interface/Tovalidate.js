import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import './Tovalidate.css'; // Custom styles

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 5 minutes

const CompteValide = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [sessionExpired, setSessionExpired] = useState(false);

  // Function to perform logout
  const performLogout = () => {
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");
    alert("Session expired. Redirecting to the login page.");
    navigate("/sign-in");
  };

  // Handle token expiration
  const handleTokenExpiry = () => {
    const accessToken =
      localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        const expiryTime = decodedToken.exp * 1000;
        const currentTime = Date.now();

        if (expiryTime > currentTime) {
          setTimeout(() => performLogout(), expiryTime - currentTime);
        } else {
          performLogout();
        }
      } catch (error) {
        console.error("Error decoding the token:", error);
        performLogout();
      }
    } else {
      performLogout();
    }
  };

  // Handle inactivity
  useEffect(() => {
    let inactivityTimer;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        setSessionExpired(true);
        performLogout();
      }, INACTIVITY_TIMEOUT);
    };

    const events = ["mousemove", "keydown", "click"];
    events.forEach((event) => window.addEventListener(event, resetInactivityTimer));
    resetInactivityTimer();

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach((event) => window.removeEventListener(event, resetInactivityTimer));
    };
  }, []);

  // Load users from the API
  useEffect(() => {
    if (!sessionExpired) {
      const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

      if (!token) {
        alert("Invalid session. Please log in again.");
        navigate("/sign-in");
        return;
      }

      axios
        .get("http://localhost:8084/Users/alluser", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUsers(response.data))
        .catch((error) => console.error("Error loading users:", error));
    }
  }, [sessionExpired, navigate]);

  // Delete a user
  const deleteUser = (id) => {
    const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

    if (!token) {
      alert("You must be logged in to delete a user.");
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
          console.error("Error deleting the user:", error);
          alert("Failed to delete the user. Please try again later.");
        });
    }
  };

  // Redirect to the edit page
  const handleEditClick = (id) => {
    navigate(`/edit-user/${id}`);
  };

  // Render the user table
  return (
       <div className="container mt-5">
      <h2 className="text-center mb-4">User List</h2>
      <table className="table custom-table">
        <thead className="thead-light">
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Birth date</th>
            <th>Position</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">No users found</td>
              </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.birthDate}</td>
                
                <td>{user.role}</td>
                <td>{user.isActive ? "Yes" : "No"}</td>
                <td>
                  {user.isActive ? (
                    <button className="btn btn-deactivate"  onClick={() => handleEditClick(user.id)} >Deactivate</button>  ) : (
                    <button                       className="btn btn-activate"

                     onClick={() => handleEditClick(user.id)}>Activate</button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default CompteValide;
