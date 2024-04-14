import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './GetUser.css'; // Import the CSS file for styling

const GetUser = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetUser = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/users/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error getting user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="delete-user-container"> {/* Apply delete-user-container class */}
      <h2>Get User by ID</h2>
      <label>
        User ID:
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </label>
      <button onClick={handleGetUser} disabled={loading}>
        {loading ? 'Loading...' : 'Get User'}
      </button>

      {userData && (
        <div>
          <h3>User Data:</h3>
          <p>
            <strong>ID:</strong> {userData.id}
          </p>
          <p>
            <strong>Username:</strong> {userData.username}
          </p>
          <p>
            <strong>Password:</strong> {userData.password}
          </p>
          <p>
            <strong>Created At:</strong>{' '}
            {new Date(userData.createdAt).toLocaleString()}
          </p>
        </div>
      )}

      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
};

export default GetUser;
