import React from "react";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    const offsets = {
      home: 70,
      jobs: -20,
      about: -50,
      categories: 80,
      features: 100,
    };

    // If we're not on the home page, navigate first.
    if (location.pathname !== "/") {
      navigate("/#" + id);
      return;
    }

    // Already on the home page.
    const element = document.getElementById(id);

    if (element) {
      const offset = offsets[id] || 80;

      const y =
        element.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });

      // Update the URL hash without triggering navigation.
      window.history.replaceState(null, "", `/#${id}`);
    }
  };

  return (
    <header className="navbar-header">
      <nav className="navbar-container">
        {/* Brand Logo */}
        <button
          className="navbar-brand"
          onClick={() => scrollToSection("home")}
        >
          <div className="brand-icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="bolt-icon"
            >
              <path d="M11.999 21.9v-8.4H7.599l9.301-11.4v8.4h4.5L11.999 21.9z" />
            </svg>
          </div>

          <span className="brand-text">Recruit Assist</span>
        </button>

        {/* Navigation */}
        <ul className="navbar-links">
          <li>
            <button
              className="nav-link"
              onClick={() => scrollToSection("home")}
            >
              Home
            </button>
          </li>

          <li>
            <button
              className="nav-link"
              onClick={() => scrollToSection("jobs")}
            >
              Jobs
            </button>
          </li>

          <li>
            <button
              className="nav-link"
              onClick={() => scrollToSection("about")}
            >
              About Us
            </button>
          </li>
        </ul>

        {/* Right Side */}
        <div className="navbar-actions">
          <Link to="/login" className="nav-login">
            Login
          </Link>

          <Link to="/register" className="nav-register">
            Register
          </Link>

          <div className="nav-divider"></div>

          <a href="/recruiters" className="nav-recruiters">
            For Recruiters
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="external-link-icon"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
