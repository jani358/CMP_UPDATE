import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './DeleteUser.css'; // Import the CSS file for styling

const DeleteUser = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');

  const handleDeleteUser = async () => {
    try {
      const response = await api.delete(`/users/${userId}`);
      console.log(response.data);

      // Redirect to another route after successful deletion
      navigate('/get-user');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="delete-user-container">
      <h2>Delete User by ID</h2>
      <label>
        User ID:
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </label>
      <button onClick={handleDeleteUser}>Delete User</button>
    </div>
  );
};

export default DeleteUser;
