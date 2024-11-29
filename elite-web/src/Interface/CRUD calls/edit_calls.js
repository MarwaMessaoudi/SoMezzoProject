import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = 'http://localhost:8084/calls';

const EditCall = () => {
  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
  const isAuthenticated = Boolean(user);
  const role = user ? user.role : null;
  const { id } = useParams(); // Get the call ID from URL parameters
  const navigate = useNavigate();
  const [callData, setCallData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch the call by ID for editing
  useEffect(() => {
    if (isAuthenticated && role === 'EMPLOYEE') {
      const fetchCall = async () => {
        try {
          const response = await axios.get(`${API_URL}/getbyid/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // JWT token
            },
          });
          setCallData(response.data); // Set call data for editing
        } catch (err) {
          setError('Error fetching call details');
        }
      };

      fetchCall();
    } else {
      setError('Unauthorized');
    }
  }, [id, isAuthenticated, role]);

  const handleSave = async () => {
    if (isAuthenticated && role === 'EMPLOYEE' && callData) {
      try {
        await axios.put(`${API_URL}/update/${id}`, callData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        navigate('/calls'); // Redirect to calls list after saving
      } catch (err) {
        setError('Error updating call');
      }
    }
  };

  return (
    <div>
      <h2>Edit Call</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {callData ? (
        <div>
          <label>
            Name:
            <input
              type="text"
              value={callData.name}
              onChange={(e) => setCallData({ ...callData, name: e.target.value })}
            />
          </label>
          <br />
          <label>
            Description:
            <input
              type="text"
              value={callData.description}
              onChange={(e) =>
                setCallData({ ...callData, description: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            Date:
            <input
              type="date"
              value={callData.date}
              onChange={(e) => setCallData({ ...callData, date: e.target.value })}
            />
          </label>
          <br />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <p>Loading call details...</p>
      )}
    </div>
  );
};

export default EditCall;
