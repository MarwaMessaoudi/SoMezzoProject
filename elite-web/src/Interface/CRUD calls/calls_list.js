import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8084/calls'; // Vérifiez que cette URL est correcte

const CallList = () => {
  const navigate = useNavigate();
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

  // Récupération des appels depuis l'API
  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await axios.get(`${API_URL}/getcalls`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCalls(response.data);
      } catch (err) {
        setError('Failed to fetch calls');
      } finally {
        setLoading(false);
      }
    };

    fetchCalls();
  }, [token]);

  // Redirection vers la page d'ajout d'appel
  const handleAddCall = () => {
    navigate('/add-call');
  };

  // Redirection vers la page d'édition d'un appel
  const handleEditCall = (id) => {
    navigate(`/edit-call/${id}`);
  };

  return (
    <div className="call-list-container">
      <h2>Call List</h2>
      {loading && <p>Loading calls...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <>
          <table className="call-list-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Date</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {calls.map((call) => (
                <tr key={call.id}>
                  <td>{call.description}</td>
                  <td>{new Date(call.date).toLocaleString()}</td>
                  <td>{call.duration} min</td>
                  <td>
                    <button
                      onClick={() => handleEditCall(call.id)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-call-button" onClick={handleAddCall}>
            Add New Call
          </button>
        </>
      )}
    </div>
  );
};

export default CallList;
