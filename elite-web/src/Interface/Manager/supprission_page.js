import React, { useState, useEffect } from "react";
import axios from "axios";
import "./supprission.css";

const UserTable = () => {
    const [users, setUsers] = useState([]);

    // Charger les utilisateurs depuis l'API
    useEffect(() => {
        axios.get("http://localhost:8080/api/users/")
            .then(response => setUsers(response.data))
            .catch(error => console.error("Error loading users:", error));
    }, []);

    // Fonction pour supprimer un utilisateur
    const deleteUser = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            axios.delete(`http://localhost:8080/api/users/${id}`)
                .then(() => {
                    setUsers(users.filter(user => user.id !== id));
                })
                .catch(error => console.error("Error deleting: ", error));
        }
    };

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
                            <td>{user.actif}</td>
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
