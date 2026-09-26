import React, { useState, useRef, useEffect } from "react";
import "./HeroSection.css";
import { getImageUrl } from "../../utils/imageHelper";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedJobType, setSelectedJobType] = useState("Select job type");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const jobTypes = ["Internship", "Job"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 8 logos for the circular orbit
  const orbitLogos = [
    { src: "/microsoft.png", alt: "Microsoft", label: "Microsoft" },
    { src: "/google.png", alt: "Google", label: "Google" },
    { src: "/adobe.png", alt: "Adobe", label: "Adobe" },
    { src: "/infosys.png", alt: "Infosys", label: "Infosys" },
    { src: "/tcs.png", alt: "TCS", label: "TCS" },
    { src: "/wipro.png", alt: "Wipro", label: "Wipro" },
    { src: "/amazon.png", alt: "Amazon", label: "Amazon" },
    { src: "/meta.png", alt: "Meta", label: "Meta" },
  ];

  return (
    <div className="hero-container">
      {/* Background Decor */}
      <div className="bg-circle bg-circle-1"></div>
      <div className="bg-circle bg-circle-2"></div>

      <div className="hero-content">
        {/* Left Content Area */}
        <div className="hero-text-area">
          <h1 className="animate-fade-in-up">
            Get hired
            <br />
            by the popular
            <br />
            candidates.
          </h1>
          <p className="animate-fade-in-up delay-1">
            Find Jobs, Employment & Career Opportunities. Some of the companies
            we've helped recruit excellent applicants over the years.
          </p>

          <div className="search-bar-wrapper animate-fade-in-up delay-2">
            <form
              className="advanced-search-bar"
              onSubmit={(e) => {
                e.preventDefault();
                navigate("/search");
              }}
            >
              {/* Input 1: Job Type Dropdown */}
              <div
                className="input-group custom-dropdown-group"
                ref={dropdownRef}
              >
                <div
                  className="dropdown-trigger"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span
                    className={
                      selectedJobType === "Select job type"
                        ? "placeholder-text"
                        : "selected-text active"
                    }
                  >
                    {selectedJobType}
                  </span>
                  <svg
                    className={`chevron ${isDropdownOpen ? "open" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>

                {isDropdownOpen && (
                  <div className="dropdown-menu animate-pop-in">
                    {jobTypes.map((type) => (
                      <div
                        key={type}
                        className={`dropdown-item ${selectedJobType === type ? "active" : ""}`}
                        onClick={() => {
                          setSelectedJobType(type);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="divider"></div>

              {/* Input 2: Keywords */}
              <div className="input-group search-keyword-group">
                <input
                  type="text"
                  placeholder="Enter keyword / designation / companies"
                />
              </div>

              <div className="divider"></div>

              {/* Input 3: Location */}
              <div className="input-group search-location-group">
                <input type="text" placeholder="Enter location" />
              </div>

              {/* Search Button */}
              <button type="submit" className="search-btn" aria-label="Search">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <span className="search-btn-text">Search</span>
              </button>
            </form>

            <div className="popular-searches">
              <span className="popular-label">POPULAR:</span>
              <a href="#pm">PRODUCT MANAGER</a>
              <a href="#fe">FRONTEND ENGINEER</a>
              <a href="#ux">UX DESIGNER</a>
            </div>
          </div>
        </div>

        {/* Right Content Area — Circular Orbit */}
        <div className="hero-graphic-area animate-fade-in">
          <div className="orbit-wrapper">
            {/* Center circle with hero image */}
            <div className="graphic-circle">
              <div className="inner-image-placeholder">
                <img
                  src={getImageUrl("hero-image.png")}
                  alt="Hero Graphic"
                  className="hero-circle-img"
                />
              </div>
            </div>

            {/* 8 logos placed in a perfect circle around the center */}
            {orbitLogos.map((logo, i) => {
              // Distribute 8 icons evenly: 360/8 = 45deg apart
              // Start from top (-90deg) so first icon is at 12 o'clock
              const angleDeg = (360 / orbitLogos.length) * i - 90;
              const angleRad = (angleDeg * Math.PI) / 180;
              const radius = 52; // percentage-based radius from center
              const cx = 50 + radius * Math.cos(angleRad);
              const cy = 50 + radius * Math.sin(angleRad);

              return (
                <div
                  key={logo.alt}
                  className="floating-icon orbit-icon"
                  style={{
                    left: `${cx}%`,
                    top: `${cy}%`,
                    animationDelay: `${i * 0.4}s`,
                    animationDuration: `${3.5 + (i % 3) * 0.6}s`,
                  }}
                  title={logo.label}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="hero-circle-img"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom logos strip */}
      {/* <div className="companies-section">
        <div className="company-logos">
          <div className="logo">
            <span className="logo-icon">
              <img src="/google.png" alt="Google" className="hero-circle-img" />
            </span>
            GOOGLE
          </div>
          <div className="logo">
            <span className="logo-icon">
              <img src="/amazon.png" alt="Amazon" className="hero-circle-img" />
            </span>
            AMAZON
          </div>
          <div className="logo">
            <span className="logo-icon">
              <img
                src="/microsoft.png"
                alt="Microsoft"
                className="hero-circle-img"
              />
            </span>
            MICROSOFT
          </div>
          <div className="logo">
            <span className="logo-icon">
              <img src="/meta.png" alt="Meta" className="hero-circle-img" />
            </span>
            META
          </div>
          <div className="logo">
            <span className="logo-icon">
              <img src="/apple.png" alt="Apple" className="hero-circle-img" />
            </span>
            APPLE
          </div>
        </div>
        <div className="stats-divider"></div>
        <div className="stats-text">
          <strong>10,000+</strong> jobs posted today &middot;{" "}
          <strong>500+</strong> top-tier companies hiring
        </div>
      </div> */}
    </div>
  );
};

export default HeroSection;
