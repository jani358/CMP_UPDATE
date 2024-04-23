import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateCategory = () => {
  const [formData, setFormData] = useState({
    title: '',
    imageId: '', 
    description: '',
    parentId: ''
  });
  const [existingCategories, setExistingCategories] = useState([]);

  useEffect(() => {
    fetchExistingCategories();
  }, []);

  const fetchExistingCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3002/category');
      setExistingCategories(response.data);
    } catch (error) {
      console.error('Error fetching existing categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/category', formData);
      console.log('Category created successfully:', response.data);
      setFormData({ title: '', imageId: '', description: '', parentId: '' }); // Reset imageId as well
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create Category</h2>
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
          <label className="block">Image ID:</label>
          <input
            type="text"
            name="imageId"
            value={formData.imageId}
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
          ></textarea>
        </div>
        <div>
          <label className="block">Parent Category:</label>
          <select
            name="parentId" // Changed from existingCategory to parentId to match the state
            value={formData.parentId}
            onChange={handleChange}
            className="border border-gray-400 rounded-md p-2 w-full"
          >
            <option value="">Select Parent Category</option>
            {existingCategories.map(category => (
              <option key={category.id} value={category.id}>{category.title}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Create Category</button>
      </form>
    </div>
  );
};

export default CreateCategory;
