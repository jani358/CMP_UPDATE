import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateActivity from "./components/Activity/CreateActivity";
import CreateCategory from "./components/Category/CreateCategory";
import CreateCourse from "./components/Course/CreateCourse";
import CreateMotivationalTip from "./components/MotivationalTip/CreateMotivationalTip";
import CreateTutorial from "./components/Tutorial/CreateTutorial";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
       
        <Route path="/create-activity" element={<CreateActivity />} />
        <Route path="/create-category" element={<CreateCategory />} />
        <Route path="/create-course" element={<CreateCourse />} />
        <Route
          path="/create-motivational-tip"
          element={<CreateMotivationalTip />}
        />
        <Route path="/create-tutorial" element={<CreateTutorial />} />
      </Routes>
    </Router>
  );
};

export default App;
