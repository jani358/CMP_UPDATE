import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CreateTutorial = () => {
  const navigate = useNavigate();

  const [tutorialData, setTutorialData] = useState({
    title: '',
    description: '',
  });

  const handleCreateTutorial = async () => {
    try {
      const response = await api.post('/tutorials', tutorialData);
      console.log(response.data);


      navigate('/get-tutorial'); 
    } catch (error) {
      console.error('Error creating tutorial:', error);
    }
  };

  const handleChange = (e) => {
    setTutorialData({
      ...tutorialData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Create Tutorial</h2>
      <form>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={tutorialData.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={tutorialData.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleCreateTutorial}>
          Create Tutorial
        </button>
      </form>

    
      {/* <Link to="/get-tutorial">Go to Get Tutorial</Link> */}

      <Routes>
        <Route path="/get-tutorial" element={<GetTutorial />} />
      </Routes>
    </div>
  );
};

export default CreateTutorial;


const GetTutorial = () => {
  
  return <div>GetTutorial component content</div>;
};
