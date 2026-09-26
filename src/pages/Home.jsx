import React from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import HeroSection from "../components/HeroSection/HeroSection";
import PopularCategories from "../components/PopularCategories/PopularCategories";
import About from "../components/About/About";
import Features from "../components/Features/Features";
import ExploreJobs from "../components/ExploreJobs/ExploreJobs";
import HiringPartners from "../components/HiringPartners/HiringPartners";
import Foter from "../components/Footer/Footer";

function Home() {
  return (
    <div className="home-page">
      <section id="home">
        <HeroSection />
      </section>

      <section id="categories">
        <PopularCategories />
      </section>

      <section id="jobs">
        <ExploreJobs />
      </section>

      <section id="features">
        <Features />
      </section>

      <section id="about">
        <About />
      </section>
    </div>
  );
}

export default Home;
