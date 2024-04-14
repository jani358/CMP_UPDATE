import React, { useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './CreateUser.css'; // Import the CSS file for styling

const CreateUser = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    id: null,
    username: '',
    password: '',
    createdAt: null,
  });

  const handleCreateUser = async () => {
    try {
      console.log(userData); // Log the user data
      const response = await api.post('/users', userData);
      console.log(response.data);

      setUserData({
        id: null,
        username: '',
        password: '',
        createdAt: null,
      });

      navigate('/get-user');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="create-user-container">
      <h2>Create User</h2>
      <form>
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input
            type="number"
            id="id"
            value={userData.id || ''}
            onChange={(e) => setUserData({ ...userData, id: e.target.value })}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="createdAt">Created At:</label>
          <input
            type="text"
            id="createdAt"
            value={userData.createdAt || ''}
            onChange={(e) => setUserData({ ...userData, createdAt: e.target.value })}
            disabled
          />
        </div>
        <button type="button" onClick={handleCreateUser}>
          Create User
        </button>
      </form>

      <Link to="/get-user">Go to Get User</Link>

      <Routes>
        <Route path="/get-user" element={<GetUser />} />
      </Routes>
    </div>
  );
};

export default CreateUser;

// Add the GetUser component here
const GetUser = () => {
  // Implement the GetUser component logic here
  return <div>GetUser component content</div>;
};
