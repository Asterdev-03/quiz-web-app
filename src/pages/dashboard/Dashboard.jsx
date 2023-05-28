import React from "react";

// import components
import DashboardContent from "./content/DashboardContent";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <DashboardContent />
      <Footer />
    </div>
  );
};

export default Dashboard;
