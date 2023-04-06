import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// import pages
import Dashboard from "../../pages/dashboard/Dashboard";
import HomePage from "../../pages/homePage/HomePage";

const Content = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  );
};

export default Content;
