import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import Navbar component
import Home from './components/Home';
import CreateUser from './components/User/CreateUser';
import GetUser from './components/User/GetUser';
import UpdateUser from './components/User/UpdateUser';
import DeleteUser from './components/User/DeleteUser';
import CreateTutorial from './components/Tutorial/CreateTutorial';
import CreateMotivationalTip from './components/MotivationalTip/CreateMotivationalTip';
import CreateJobAlert from './components/JobAlert/CreateJobAlert';
import CreateCourse from './components/Course/CreateCourse';
import CreateCategory from './components/Category/CreateCategory';
import CreateActivity from './components/Activity/CreateActivity';
import CreateAccMaintain from './components/AccMaintain/CreateAccMaintain';

function App() {
  return (
    <Router>
      <Navbar /> {/* Render Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/get-user" element={<GetUser />} />
        <Route path="/update-user" element={<UpdateUser />} />
        <Route path="/delete-user" element={<DeleteUser />} />
        <Route path="/create-tutorial" element={<CreateTutorial />} />
        <Route path="/create-motivational-tip" element={<CreateMotivationalTip />} />
        <Route path="/create-job-alert" element={<CreateJobAlert />} />
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/create-category" element={<CreateCategory />} />
        <Route path="/create-activity" element={<CreateActivity />} />
        <Route path="/create-acc-maintain" element={<CreateAccMaintain />} />
      </Routes>
    </Router>
  );
}

export default App;
