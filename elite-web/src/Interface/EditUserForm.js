import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUserForm = () => {
  const { id } = useParams(); // Assuming you're getting the user ID from the URL
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    role: '',
    isActive: false
  });

  // Fetch user data when the component is mounted
  useEffect(() => {
    axios
      .get(`http://localhost:8084/Users/update/${id}`)
      .then((response) => {
        setUser(response.data); // Assuming response.data has the user details
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);



  


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

    axios
      .put(`http://localhost:8084/Users/update/${id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert("User updated successfully!");
        navigate("/users"); // Redirect to the user list page
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={user.first_name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={user.last_name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Role:
          <input
            type="text"
            name="role"
            value={user.role}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Active:
          <input
            type="checkbox"
            name="isActive"
            checked={user.isActive}
            onChange={() => setUser({ ...user, isActive: !user.isActive })}
          />
        </label>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUserForm;
