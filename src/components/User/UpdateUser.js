import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './UpdateUser.css'; // Import the CSS file for styling

const UpdateUser = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [updatedUserData, setUpdatedUserData] = useState({
    username: '',
    password: '',
  });

  const handleUpdateUser = async () => {
    try {
      const response = await api.put(`/users/${userId}`, updatedUserData);
      console.log(response.data);

      navigate('/get-user'); // Redirect to another route after successful update
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="update-user-container">
      <h2>Update User by ID</h2>
      <label>
        User ID:
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </label>
      <br />
      <label>
        Username:
        <input
          type="text"
          value={updatedUserData.username}
          onChange={(e) =>
            setUpdatedUserData({ ...updatedUserData, username: e.target.value })
          }
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={updatedUserData.password}
          onChange={(e) =>
            setUpdatedUserData({ ...updatedUserData, password: e.target.value })
          }
        />
      </label>
      <br />
      <button onClick={handleUpdateUser}>Update User</button>
    </div>
  );
};

export default UpdateUser;
