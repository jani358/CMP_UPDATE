import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Home link with animation */}
        <Link to="/" className="text-white text-lg font-semibold animate-bounce">Home</Link>
        <div>
          <Link to="/create-category" className="text-white mx-2 animate-bounce">Create Category</Link>
          <Link to="/create-course" className="text-white mx-2 animate-bounce">Create Course</Link>
          <Link to="/create-tutorial" className="text-white mx-2 animate-bounce">Create Tutorial</Link>
          <Link to="/create-user" className="text-white mx-2 animate-bounce">Create User</Link>
          <Link to="/activities" className="text-white mx-2 animate-bounce">Activities</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
