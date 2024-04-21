import React from "react";
import { Link, Route, Routes } from "react-router-dom";
// import CreateUser from "./CreateUser"; // Import CreateUser component
// import GetUser from "./GetUser"; // Import GetUser component
// import UpdateUser from "./UpdateUser"; // Import UpdateUser component
// import DeleteUser from "./DeleteUser"; // Import DeleteUser component
import CreateActivity from "./Activity/CreateActivity"; // Import CreateActivity component
import CreateCategory from "./Category/CreateCategory"; // Import CreateCategory component
import CreateCourse from "./Course/CreateCourse"; // Import CreateCourse component
import CreateMotivationalTip from "./MotivationalTip/CreateMotivationalTip"; // Import CreateMotivationalTip component
import CreateTutorial from "./Tutorial/CreateTutorial"; // Import CreateTutorial component

const Navbar = () => {
  return (
    <nav className="bg-gray-800 py-4 ">
      <ul className="flex justify-center">
        <li className="mr-6">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
        </li>
        <li className="dropdown mr-6 relative">
          <Link to="/create-user" className="text-white hover:text-gray-300">Create User</Link>
        </li>
        <li className="dropdown mr-6 relative">
          <Link to="/get-user" className="text-white hover:text-gray-300">Get User</Link>
        </li>
        <li className="dropdown mr-6 relative">
          <Link to="/update-user" className="text-white hover:text-gray-300">Update User</Link>
        </li>
        <li className="dropdown mr-6 relative">
          <Link to="/delete-user" className="text-white hover:text-gray-300">Delete User</Link>
        </li>
        <li className="dropdown mr-6 relative">
          <Link to="/create-activity" className="text-white hover:text-gray-300">Create Activity</Link>
        </li>
        <li className="dropdown mr-6 relative">
          <Link to="/create-category" className="text-white hover:text-gray-300">Create Category</Link>
        </li>
        <li className="dropdown mr-6 relative">
          <Link to="/create-course" className="text-white hover:text-gray-300">Create Course</Link>
        </li>
        <li className="dropdown mr-6 relative">
          <Link to="/create-motivational-tip" className="text-white hover:text-gray-300">Create Motivational Tip</Link>
        </li>
        <li className="dropdown mr-6 relative">
          <Link to="/create-tutorial" className="text-white hover:text-gray-300">Create Tutorial</Link>
        </li>
      </ul>
      <Routes>
        {/* <Route path="/create-user" element={<CreateUser />} />
        <Route path="/get-user" element={<GetUser />} />
        <Route path="/update-user" element={<UpdateUser />} />
        <Route path="/delete-user" element={<DeleteUser />} /> */}
        <Route path="/create-activity" element={<CreateActivity />} />
        <Route path="/create-category" element={<CreateCategory />} />
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/create-motivational-tip" element={<CreateMotivationalTip />} />
        <Route path="/create-tutorial" element={<CreateTutorial />} />
      </Routes>
    </nav>
  );
};

export default Navbar;
