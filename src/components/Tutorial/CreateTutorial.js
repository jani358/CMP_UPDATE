import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateTutorial = () => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    tuto_url: '',
    course: ''
  });
  const [categories, setCategories] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchTutorials();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3002/course');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Error fetching categories');
    }
  };

  const fetchTutorials = async () => {
    try {
      const response = await axios.get('http://localhost:3002/tutorial');
      setTutorials(response.data);
    } catch (error) {
      console.error('Error fetching tutorials:', error);
      setError('Error fetching tutorials');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tutorialData = {
        title: formData.title,
        tuto_url: formData.tuto_url,
        course: formData.course
      };

      let response;
      if (formData.id) {
        response = await axios.put(`http://localhost:3002/tutorial/${formData.id}`, tutorialData);
        setSuccessMessage('Tutorial updated successfully');
      } else {
        response = await axios.post('http://localhost:3002/tutorial', tutorialData);
        setSuccessMessage('Tutorial created successfully');
      }
      fetchTutorials();
      setFormData({ id: '', title: '', tuto_url: '', course: '' });
    } catch (error) {
      if (error.response) {
        console.error('Server Error:', error.response.data);
        setError(error.response.data.message);
      } else if (error.request) {
        console.error('Network Error:', error.request);
        setError('Network Error. Please try again later.');
      } else {
        console.error('Error:', error.message);
        setError('An error occurred. Please try again later.');
      }
    }
  };

  const handleEdit = (tutorial) => {
    setFormData({
      id: tutorial.id,
      title: tutorial.title,
      tuto_url: tutorial.tuto_url,
      course: tutorial.course
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/tutorial/${id}`);
      fetchTutorials();
      setSuccessMessage('Tutorial deleted successfully');
    } catch (error) {
      console.error('Error deleting tutorial:', error);
      setError('Error deleting tutorial');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">{formData.id ? 'Update Tutorial' : 'Create Tutorial'}</h2>
      {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">{successMessage}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
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
          <label className="block">Tutorial URL:</label>
          <input
            type="text"
            name="tuto_url"
            value={formData.tuto_url}
            onChange={handleChange}
            className="border border-gray-400 rounded-md p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Course:</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="border border-gray-400 rounded-md p-2 w-full"
            required
          >
            <option value="">Select Course</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.title}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          {formData.id ? 'Update Tutorial' : 'Create Tutorial'}
        </button>
      </form>
      <h2 className="text-xl font-bold mt-8 mb-4">Tutorials</h2>
      <ul>
        {tutorials.map(tutorial => (
          <li key={tutorial.id} className="mb-2">
            <div className="flex justify-between items-center">
              <span>{tutorial.title}</span>
              <div>
                <button onClick={() => handleEdit(tutorial)} className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2">Edit</button>
                <button onClick={() => handleDelete(tutorial.id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateTutorial;
