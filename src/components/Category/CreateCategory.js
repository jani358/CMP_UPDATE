import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateCategory = () => {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: '',
    parentId: ''
  });
  const [existingCategories, setExistingCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

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
      if (editingCategory) {
        await axios.put(`http://localhost:3002/category/${editingCategory.id}`, formData);
        console.log('Category updated successfully');
      } else {
        await axios.post('http://localhost:3002/category', formData);
        console.log('Category created successfully');
      }
      setFormData({ title: '', image: '', description: '', parentId: '' });
      setEditingCategory(null);
      fetchExistingCategories();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (category) => {
    setFormData({
      title: category.title,
      image: category.image || '',
      description: category.description || '',
      parentId: category.parentId || ''
    });
    setEditingCategory(category);
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:3002/category/${categoryId}`);
      console.log('Category deleted successfully');
      fetchExistingCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create or Update Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
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
          <div className="flex-1">
            <label className="block">Image ID:</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="border border-gray-400 rounded-md p-2 w-full"
            />
          </div>
        </div>
        <div>
          <label className="block max-w-2xl">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-400 rounded-md p-2 w-full max-w-2xl"
            maxLength={200}
            rows={4}
          ></textarea>
        </div>
        <div>
          <label className="block">Parent Category:</label>
          <select
            name="parentId"
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
        <div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            {editingCategory ? 'Update Category' : 'Create Category'}
          </button>
          {editingCategory && (
            <button
              type="button"
              className="ml-2 text-red-500"
              onClick={() => {
                setEditingCategory(null);
                setFormData({ title: '', image: '', description: '', parentId: '' });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Existing Categories</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {existingCategories.map(category => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap max-w-2xl">{category.title}</td>
                <td className="px-6 py-4 whitespace-nowrap max-w-2xl overflow-hidden">{category.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="ml-2 text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(category.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateCategory;
