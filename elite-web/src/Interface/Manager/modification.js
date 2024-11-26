import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    // Charger les utilisateurs depuis l'API
    useEffect(() => {
        axios.get("http://localhost:8080/api/users/")
            .then(response => setUsers(response.data))
            .catch(error => console.error("Erreur lors du chargement des utilisateurs:", error));
    }, []);

    // Fonction pour naviguer vers la page de modification
    const handleEditClick = (id) => {
        navigate(`/edit/${id}`); // Redirection avec l'ID de l'utilisateur
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
                            <td>{user.isActive }</td>
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
