import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CreateTutorial = () => {
  const navigate = useNavigate();

  const [tutorialData, setTutorialData] = useState({
    title: '',
    description: '',
  });

  const handleCreateTutorial = async () => {
    try {
      const response = await api.post('/tutorials', tutorialData);
      console.log(response.data);

      navigate('/get-tutorial');
    } catch (error) {
      console.error('Error creating tutorial:', error);
    }
  };

  const handleChange = (e) => {
    setTutorialData({
      ...tutorialData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Tutorial</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={tutorialData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description:</label>
          <textarea
            name="description"
            value={tutorialData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button
          type="button"
          onClick={handleCreateTutorial}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Create Tutorial
        </button>
      </form>
    </div>
  );
};

export default CreateTutorial;
