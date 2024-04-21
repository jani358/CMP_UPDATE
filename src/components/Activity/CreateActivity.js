import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CreateActivity = () => {
  const navigate = useNavigate();

  const [activityData, setActivityData] = useState({
    title: '',
    answers: [],
  });

  const handleCreateActivity = async () => {
    try {
      const response = await api.post('/activities', activityData);
      console.log(response.data);
      navigate('/get-user'); 
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  const handleChange = (e) => {
    setActivityData({
      ...activityData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...activityData.answers];
    newAnswers[index] = value;
    setActivityData({
      ...activityData,
      answers: newAnswers,
    });
  };

  const handleAddAnswer = () => {
    setActivityData({
      ...activityData,
      answers: [...activityData.answers, ''],
    });
  };

  const handleRemoveAnswer = (index) => {
    const newAnswers = [...activityData.answers];
    newAnswers.splice(index, 1);
    setActivityData({
      ...activityData,
      answers: newAnswers,
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Activity</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={activityData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Answers:</label>
          {activityData.answers.map((answer, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={answer}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className="flex-1 p-2 border rounded-l-md"
              />
              <button
                type="button"
                onClick={() => handleRemoveAnswer(index)}
                className="bg-red-500 text-white p-2 rounded-r-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddAnswer}
            className="bg-green-500 text-white p-2 rounded-md"
          >
            Add Answer
          </button>
        </div>
        <button
          type="button"
          onClick={handleCreateActivity}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Create Activity
        </button>
      </form>
    </div>
  );
};

export default CreateActivity;
