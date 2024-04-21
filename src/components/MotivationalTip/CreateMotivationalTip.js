import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CreateMotivationalTip = () => {
  const navigate = useNavigate();

  const [motivationalTipData, setMotivationalTipData] = useState({
    title: '',
    content: '',
  });

  const handleCreateMotivationalTip = async () => {
    try {
      const response = await api.post('/motitips', motivationalTipData); // Corrected endpoint to '/motitips'
      console.log(response.data);

      navigate('/get-motivational-tip');
    } catch (error) {
      console.error('Error creating motivational tip:', error);
    }
  };

  const handleChange = (e) => {
    setMotivationalTipData({
      ...motivationalTipData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Motivational Tip</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={motivationalTipData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Content:</label>
          <textarea
            name="content"
            value={motivationalTipData.content}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button
          type="button"
          onClick={handleCreateMotivationalTip}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Create Motivational Tip
        </button>
      </form>
    </div>
  );
};

export default CreateMotivationalTip;
