import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './CreateAccMaintain.css';

const CreateAccMaintain = () => {
  const navigate = useNavigate();

  const [accMaintainData, setAccMaintainData] = useState({
    accountNumber: '',
    maintenanceType: '',
  });

  const handleCreateAccMaintain = async () => {
    try {
      const response = await api.post('/acc-maintains', accMaintainData);
      console.log(response.data);

      // Redirect to another route after successful creation
      navigate('/get-user'); // Adjust the route as needed
    } catch (error) {
      console.error('Error creating account maintenance:', error);
    }
  };

  const handleChange = (e) => {
    setAccMaintainData({
      ...accMaintainData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Create Account Maintenance</h2>
      <form>
        <label>
          Account Number:
          <input
            type="text"
            name="accountNumber"
            value={accMaintainData.accountNumber}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Maintenance Type:
          <input
            type="text"
            name="maintenanceType"
            value={accMaintainData.maintenanceType}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleCreateAccMaintain}>
          Create Account Maintenance
        </button>
      </form>
    </div>
  );
};

export default CreateAccMaintain;
