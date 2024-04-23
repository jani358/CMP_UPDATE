import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: '',
    categoryId: ''
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3002/category');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const courseData = {
        title: formData.title,
        image: formData.image,
        description: formData.description,
        category: formData.categoryId
      };
      const response = await axios.post('http://localhost:3002/course', courseData);
      console.log('Course created successfully:', response.data);
      setFormData({ title: '', image: '', description: '', categoryId: '' });
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create Course</h2>
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
          <label className="block">Image URL:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="border border-gray-400 rounded-md p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-400 rounded-md p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Category:</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="border border-gray-400 rounded-md p-2 w-full"
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.title}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCourse;
