import React from "react";

// import components
import HomeContent from "./content/HomeContent";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const HomePage = () => {
  return (
    <div>
      <Header />
      <HomeContent />
      <Footer />
    </div>
  );
};

export default HomePage;
