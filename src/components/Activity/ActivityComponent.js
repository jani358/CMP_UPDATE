import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActivityComponent = () => {
  const [activities, setActivities] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newAnswers, setNewAnswers] = useState([]);
  const [newTutorialId, setNewTutorialId] = useState('');

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get('http://localhost:3002/activity');
      setActivities(response.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const handleUpdateTitle = async (activityId) => {
    try {
      await axios.put(`http://localhost:3002/activity/${activityId}`, { title: newTitle });
      fetchActivities();
      setNewTitle('');
    } catch (error) {
      console.error('Error updating title:', error);
    }
  };

  const handleUpdateAnswers = async (activityId) => {
    try {
      await axios.put(`http://localhost:3002/activity/${activityId}`, { answers: newAnswers });
      fetchActivities();
      setNewAnswers([]);
    } catch (error) {
      console.error('Error updating answers:', error);
    }
  };

  const handleUpdateTutorialId = async (activityId) => {
    try {
      await axios.put(`http://localhost:3002/activity/${activityId}`, { tutorial: newTutorialId });
      fetchActivities();
      setNewTutorialId('');
    } catch (error) {
      console.error('Error updating tutorial ID:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Activities</h2>
      {activities.length > 0 ? (
        <ul>
          {activities.map(activity => (
            <li key={activity.id} className="border border-gray-500 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold mb-2">{activity.title}</h3>
              <ul>
                {activity.answers.map((answer, index) => (
                  <li key={index} className="text-sm">{answer}</li>
                ))}
              </ul>
              <div className="flex items-center mt-4">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter new title"
                  className="border border-gray-400 rounded-md p-2 mr-2"
                />
                <button onClick={() => handleUpdateTitle(activity.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Update Title</button>
              </div>
              {/* Similar input/button combinations for answers and tutorial ID */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No activities available</p>
      )}
    </div>
  );
};

export default ActivityComponent;
