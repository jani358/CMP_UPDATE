import React, { useState } from 'react';
import api from '../../services/api';

const CreateCourse = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
  });

  const handleCreateCourse = async () => {
    try {
      const response = await api.post('/courses', courseData);
      console.log(response.data);
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const handleChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Course</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={courseData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description:</label>
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button
          type="button"
          onClick={handleCreateCourse}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
