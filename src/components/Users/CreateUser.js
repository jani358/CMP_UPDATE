import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/users', formData);
      console.log('User created successfully:', response.data);
      setFormData({ username: '', password: '' });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border border-gray-400 rounded-md p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-400 rounded-md p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
