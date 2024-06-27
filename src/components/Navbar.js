import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Home link */}
        <Link to="/" className="text-white text-lg font-semibold">
          Home
        </Link>
        {/* Navigation links */}
        <div className="flex">
          <NavLink to="/create-category" text="Create Category" />
          <NavLink to="/create-course" text="Create Course" />
          <NavLink to="/create-tutorial" text="Create Tutorial" />
        </div>
      </div>
    </nav>
  );
};

// NavLink component using Framer Motion for hover animation
const NavLink = ({ to, text }) => (
  <motion.div
    whileHover={{ scale: 1.1, rotate: 3, transition: { duration: 0.2 } }}
    whileTap={{ scale: 0.9 }}
    className="relative mx-2"
  >
    <Link to={to} className="text-white">
      {text}
    </Link>
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0, scaleY: 0, transition: { duration: 0.2 } }}
      className="absolute left-0 right-0 bottom-0 h-0.5 bg-white"
    />
  </motion.div>
);

export default Navbar;
