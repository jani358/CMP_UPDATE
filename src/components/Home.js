import React from "react";
import "./Home.css"; 
import cmsImage from "../images/cms.jpg"; 

const Home = () => {
  return (
    <div className="home-container">
      <h2 className="welcome-text">Welcome to our CMS system</h2>
      <div className="content-container">
        <img src={cmsImage} alt="" className="home-image" />
        <p className="content-text">
          This is our content management system for our Flutter mobile
          application.
        </p>
      </div>
    </div>
  );
};

export default Home;
