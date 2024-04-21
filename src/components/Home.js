import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import cmsImage from "../images/cms.jpg";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-bold text-gray-800 mb-8">Welcome to our CMS system</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center">
          <img src={cmsImage} alt="" className="w-full sm:w-auto h-auto rounded-lg shadow-lg mb-8 sm:mb-0" />
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center text-gray-700 px-4">
            This is our content management system for our Flutter mobile application.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
