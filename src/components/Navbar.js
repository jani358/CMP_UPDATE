import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="dropdown">
          <a href="#create">Create</a>
          <div className="dropdown-content">
            <Link to="/create-user">User</Link>
            <Link to="/create-tutorial">Tutorial</Link>
            <Link to="/create-motivational-tip">Motivational Tip</Link>
            <Link to="/create-job-alert">Job Alert</Link>
            <Link to="/create-course">Course</Link>
            <Link to="/create-category">Category</Link>
            <Link to="/create-activity">Activity</Link>
            <Link to="/create-acc-maintain">Account Maintenance</Link>
          </div>
        </li>
        <li className="dropdown">
          <a href="#get">Get</a>
          <div className="dropdown-content">
            <Link to="/get-user">User</Link>
          </div>
        </li>
        <li className="dropdown">
          <a href="#update">Update</a>
          <div className="dropdown-content">
            <Link to="/update-user">User</Link>
          </div>
        </li>
        <li className="dropdown">
          <a href="#delete">Delete</a>
          <div className="dropdown-content">
            <Link to="/delete-user">User</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
