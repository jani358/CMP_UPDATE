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
    <div>
      <h2>Create Course</h2>
      <form>
       
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={courseData.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleChange}
          />
        </label>
        
        <br />
        <button type="button" onClick={handleCreateCourse}>
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
