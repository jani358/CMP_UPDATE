import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateTutorial = () => {
  const [formData, setFormData] = useState({
    title: '',
    tuto_url: '',
    categoryId: '' 
  });
  const [categories, setCategories] = useState([]); 
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories(); 
  }, []);

  const fetchCategories = async () => { 
    try {
      const response = await axios.get('http://localhost:3002/category'); 
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error); 
      setError('Error fetching categories'); 
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/tutorial', formData);
      console.log('Tutorial created successfully:', response.data);
      setFormData({ title: '', tuto_url: '', categoryId: '' });
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
  

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create Tutorial</h2>
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
          <label className="block">Category:</label> {/* Changed from Course to Category */}
          <select
            name="categoryId" // Changed from courseId to categoryId to match the backend
            value={formData.categoryId} // Changed from courseId to categoryId to match the backend
            onChange={handleChange}
            className="border border-gray-400 rounded-md p-2 w-full"
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.title}</option> // Changed from course.id to category.id and course.title to category.title
            ))}
          </select>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Create Tutorial</button>
      </form>
    </div>
  );
};

export default CreateTutorial;
