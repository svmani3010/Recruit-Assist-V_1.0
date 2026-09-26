import React, { useRef } from "react";
import "./PopularCategories.css";
import {
  FiAward,
  FiAtSign,
  FiBox,
  FiChrome,
  FiCopy,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const categories = [
  {
    id: 1,
    title: "Marketing & Communication",
    jobs: "20 Jobs",
    icon: <FiAward className="category-icon" />,
  },
  {
    id: 2,
    title: "Project Management",
    jobs: "35 Jobs",
    icon: <FiAtSign className="category-icon" />,
  },
  {
    id: 3,
    title: "Customer Service",
    jobs: "46 Jobs",
    icon: <FiBox className="category-icon" />,
  },
  {
    id: 4,
    title: "Software Engineering",
    jobs: "60 Jobs",
    icon: <FiChrome className="category-icon" />,
  },
  {
    id: 5,
    title: "Human Resource HR",
    jobs: "74 Jobs",
    icon: <FiCopy className="category-icon" />,
  },
];

const PopularCategories = () => {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300; // Adjust scroll distance
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="popular-categories-section">
      <div className="pc-header">
        <h2>Popular Categories</h2>
        <p>
          Search all the open positions on the web. Get your own personalized
          salary estimate.
          <br />
          Read reviews on over 30000+ companies worldwide.
        </p>
      </div>

      <div className="pc-carousel-wrapper">
        <button
          className="pc-nav-btn left"
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          <FiChevronLeft />
        </button>

        <div className="pc-cards-container" ref={carouselRef}>
          {categories.map((category) => (
            <div className="pc-card" key={category.id}>
              <div className="pc-icon-wrapper">{category.icon}</div>
              <h3>{category.title}</h3>
              <span className="pc-job-count">{category.jobs}</span>
            </div>
          ))}
        </div>

        <button
          className="pc-nav-btn right"
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
};

export default PopularCategories;
