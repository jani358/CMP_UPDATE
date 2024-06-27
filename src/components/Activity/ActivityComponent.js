import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateActivity = () => {
  const [formData, setFormData] = useState({
    title: '',
    answers: [],
    tutorialId: ''
  });
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    fetchTutorials();
  }, []);

  const fetchTutorials = async () => {
    try {
      const response = await axios.get('http://localhost:3002/tutorial');
      setTutorials(response.data);
    } catch (error) {
      console.error('Error fetching tutorials:', error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'answers') {
      // Split answers into an array based on newline or comma separators
      const answersArray = e.target.value.split(/[\n,]+/);
      setFormData({ ...formData, answers: answersArray });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const activityData = {
        title: formData.title,
        answers: formData.answers,
        tutorialId: formData.tutorialId
      };
      const response = await axios.post('http://localhost:3002/activity', activityData);
      console.log('Activity created successfully:', response.data);
      setFormData({ title: '', answers: [], tutorialId: '' });
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create Activity</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-400 rounded-md p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Answers (comma or newline separated):</label>
          <textarea
            name="answers"
            value={formData.answers.join(', ')} // Join answers for display
            onChange={handleChange}
            className="border border-gray-400 rounded-md p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Tutorial:</label>
          <select
            name="tutorialId"
            value={formData.tutorialId}
            onChange={handleChange}
            className="border border-gray-400 rounded-md p-2 w-full"
            required
          >
            <option value="">Select Tutorial</option>
            {tutorials.map(tutorial => (
              <option key={tutorial.id} value={tutorial.id}>{tutorial.title}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Create Activity</button>
      </form>
    </div>
  );
};

export default CreateActivity;
