import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CreateCategory = () => {
  const navigate = useNavigate();

  const [categoryData, setCategoryData] = useState({
    title: '',
    description: '',
    image: '',
  });

  const [showImageDropdown, setShowImageDropdown] = useState(false);

  const handleCreateCategory = async () => {
    try {
      const response = await api.post('/categories', categoryData);
      console.log(response.data);
      navigate('/get-user');
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleChange = (e) => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setCategoryData({
      ...categoryData,
      image: e.target.value,
    });
    setShowImageDropdown(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Category</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            name="title"
            value={categoryData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description:</label>
          <textarea
            name="description"
            value={categoryData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <button
            type="button"
            onClick={() => setShowImageDropdown(!showImageDropdown)}
            className="bg-blue-500 text-white p-2 rounded-md mr-2"
          >
            Select Image
          </button>
          {showImageDropdown && (
            <div>
              <label className="block mb-2">Select Image:</label>
              <select onChange={handleImageChange} className="w-full p-2 border rounded-md">
                <option value="">Select an image</option>
                <option value="Image 1">Image 1</option>
                <option value="Image 2">Image 2</option>
                <option value="Image 3">Image 3</option>
              </select>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={handleCreateCategory}
          className="bg-green-500 text-white p-2 rounded-md mt-4"
        >
          Create Category
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
