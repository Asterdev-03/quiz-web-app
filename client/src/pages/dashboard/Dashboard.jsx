import React from "react";
import "../../index.css";

// import components
import DashboardContent from "./content/DashboardContent";

import Footer from "../../components/footer/Footer";

const Dashboard = () => {
  return (
    <div>
      <DashboardContent />
      <Footer />
    </div>
  );
};

export default Dashboard;
