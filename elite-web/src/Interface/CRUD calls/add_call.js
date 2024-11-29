import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8084/calls'; // Backend URL

const AddCall = () => {
  const navigate = useNavigate();
  const [callData, setCallData] = useState({
    description: '',
    date: '',
    duration: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddCall = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    console.log('Token retrieved:', token);

    if (!token) {
      setError('Authentication error: No token found. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/add`, callData, {
        headers: {
          Authorization: `Bearer ${token}`, // Transmit the token
        },
      });
      console.log('Call added successfully:', response.data);
      navigate('/call_list'); // Redirect after success
    } catch (err) {
      console.error('Error adding call:', err.response || err.message);

      // Display backend error messages if available
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'You are not authorized to perform this action.');
      } else {
        setError('An error occurred while adding the call. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add New Call</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleAddCall}>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={callData.description}
            onChange={(e) => setCallData({ ...callData, description: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type="datetime-local"
            value={callData.date}
            onChange={(e) => setCallData({ ...callData, date: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Duration (in minutes)</label>
          <input
            type="number"
            value={callData.duration}
            onChange={(e) => setCallData({ ...callData, duration: e.target.value })}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding call...' : 'Add Call'}
        </button>
      </form>
    </div>
  );
};

export default AddCall;
