import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreateCategory from './components/Category/CreateCategory';
import CreateCourse from './components/Course/CreateCourse';
import CreateTutorial from './components/Tutorial/CreateTutorial';
import CreateUser from './components/Users/CreateUser';
import ActivityComponent from './components/Activity/ActivityComponent';

// Import your image
import cmsImage from './assets/images/4854333.jpg';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-5xl font-bold mb-6 text-center animate-fade-in">Welcome to CMS App</h1>
      <div className="max-w-2xl mx-auto">
        <img src={cmsImage} alt="CMS Image" className="rounded-lg shadow-lg mb-4" />
      </div>
      <p className="text-lg text-gray-700 text-center animate-fade-in max-w-2xl">
        This is a Content Management System (CMS) application. Use the navigation bar above to manage categories, courses, tutorials, users, and activities.
      </p>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-category" element={<CreateCategory />} />
            <Route path="/create-course" element={<CreateCourse />} />
            <Route path="/create-tutorial" element={<CreateTutorial />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/activities" element={<ActivityComponent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
