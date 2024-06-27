import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    image: '',
    description: '',
    categoryId: ''
  });
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchCourses();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3002/category');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3002/course');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
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

      let response;
      if (formData.id) {
        response = await axios.put(`http://localhost:3002/course/${formData.id}`, courseData);
        setSuccessMessage('Course updated successfully');
      } else {
        response = await axios.post('http://localhost:3002/course', courseData);
        setSuccessMessage('Course created successfully');
      }
      fetchCourses();
      setFormData({ id: '', title: '', image: '', description: '', categoryId: '' });
    } catch (error) {
      console.error('Error creating/updating course:', error);
    }
  };

  const handleEdit = (course) => {
    setFormData({
      id: course.id,
      title: course.title,
      image: course.image,
      description: course.description,
      categoryId: course.category
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/course/${id}`);
      fetchCourses();
      setSuccessMessage('Course deleted successfully');
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">{formData.id ? 'Update Course' : 'Create Course'}</h2>
      {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">{successMessage}</div>}
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
          <label className="block">Image:</label>
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          {formData.id ? 'Update Course' : 'Create Course'}
        </button>
      </form>
      <h2 className="text-xl font-bold mt-8 mb-4">Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id} className="mb-2">
            <div className="flex justify-between items-center">
              <span>{course.title}</span>
              <div>
                <button onClick={() => handleEdit(course)} className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2">Edit</button>
                <button onClick={() => handleDelete(course.id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateCourse;
