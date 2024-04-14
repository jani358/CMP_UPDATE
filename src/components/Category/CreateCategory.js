import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CreateActivity = () => {
  const navigate = useNavigate();

  const [activityData, setActivityData] = useState({
    name: '',
    description: '',
    selectedImage: null,
  });

  const [showImageDropdown, setShowImageDropdown] = useState(false);

  const handleCreateActivity = async () => {
    try {
      const dataToSend = {
        ...activityData,
        imageId: activityData.selectedImage,
      };

      const response = await api.post('/activities', dataToSend);
      console.log(response.data);

      navigate('/get-user');
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  const handleChange = (e) => {
    setActivityData({
      ...activityData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const selectedImageId = parseInt(e.target.value);
    setActivityData({
      ...activityData,
      selectedImage: selectedImageId,
    });
    setShowImageDropdown(false);
  };

  return (
    <div>
      <h2>Create Category</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={activityData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={activityData.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <div>
          <button type="button" onClick={() => setShowImageDropdown(!showImageDropdown)}>
            Select Image
          </button>
          {showImageDropdown && (
            <div>
              <label style={{marginLeft:'80px'}}>
                Select Image:
                <select onChange={handleImageChange}>
                  <option value="">Select an image</option>
                  <option value="1">Image 1</option>
                  <option value="2">Image 2</option>
                  <option value="3">Image 3</option>
                </select>
              </label>
              <br />
            </div>
          )}
        </div>
        <button type="button" onClick={handleCreateActivity} style={{ marginTop: '20px' }}>
          Create Category
        </button>
      </form>
    </div>
  );
};

export default CreateActivity;
