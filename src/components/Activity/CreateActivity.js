import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './CreateActivity.css';

const CreateActivity = () => {
  const navigate = useNavigate();

  const [activityData, setActivityData] = useState({
    name: '',
    description: '',
  });

  const handleCreateActivity = async () => {
    try {
      const response = await api.post('/activities', activityData);
      console.log(response.data);

      
      navigate('/get-user'); 
    } catch (error) {
      console.error('Error activity:', error);
    }
  };

  const handleChange = (e) => {
    setActivityData({
      ...activityData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Create Activity</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={activityData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={activityData.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleCreateActivity}>
          Create Activity
        </button>
      </form>
    </div>
  );
};

export default CreateActivity;
