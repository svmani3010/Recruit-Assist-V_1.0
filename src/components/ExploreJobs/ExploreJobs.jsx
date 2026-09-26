import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // <-- Added for routing
import "./ExploreJobs.css";
import {
  FiMapPin,
  FiArrowRight,
  FiArrowUp,
  FiDollarSign,
} from "react-icons/fi";

const DUMMY_JOBS = [
  {
    id: 1,
    company: "TechSolutions Inc.",
    logoText: "LOGO",
    postedAt: "Posted 2h ago",
    type: "FULL-TIME",
    title: "Senior Product Designer",
    location: "San Francisco, CA (Remote)",
    salary: "$140k - $180k",
  },
  {
    id: 2,
    company: "FinStream Group",
    logoText: "LOGO",
    postedAt: "Posted 5h ago",
    type: "CONTRACT",
    title: "Lead Backend Developer",
    location: "New York, NY",
    salary: "$90/hr - $120/hr",
  },
  {
    id: 3,
    company: "EcoGrowth",
    logoText: "LOGO",
    postedAt: "Posted 1d ago",
    type: "FULL-TIME",
    title: "Marketing Operations",
    location: "Austin, TX",
    salary: "$110k - $130k",
  },
  {
    id: 4,
    company: "CloudNet Systems",
    logoText: "LOGO",
    postedAt: "Posted 2d ago",
    type: "REMOTE",
    title: "Cloud Infrastructure Engineer",
    location: "Seattle, WA",
    salary: "$130k - $160k",
  },
  {
    id: 5,
    company: "DataWorks",
    logoText: "LOGO",
    postedAt: "Posted 3d ago",
    type: "FULL-TIME",
    title: "Senior Data Scientist",
    location: "Chicago, IL",
    salary: "$125k - $155k",
  },
  {
    id: 6,
    company: "PixelPerfect",
    logoText: "LOGO",
    postedAt: "Posted 1w ago",
    type: "PART-TIME",
    title: "UI/UX Researcher",
    location: "London, UK (Remote)",
    salary: "$50/hr - $75/hr",
  },
];

const ExploreJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate(); // <-- Initialized navigate for button clicks

  useEffect(() => {
    setJobs(DUMMY_JOBS);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="explore-jobs-section">
      <div className="explore-jobs-container">
        {/* Header Area */}
        <div className="header-wrapper">
          <div className="header-content">
            <h2>Explore Jobs</h2>
            <p>
              Search all the open positions on the web. Get your own
              personalized salary estimate. Read reviews on over 30000+
              companies worldwide.
            </p>
          </div>
          {/* <-- Changed from <a> to <Link> for React Routing --> */}
          <Link to="/search" className="see-more-link">
            See More Jobs <FiArrowRight className="arrow-icon" />
          </Link>
        </div>

        {/* Jobs Grid */}
        <div className="jobs-grid">
          {jobs.map((job) => (
            <div className="job-card" key={job.id}>
              {/* Top: Logo & Badge */}
              <div className="job-card-top">
                <div className="logo-placeholder">{job.logoText}</div>
                <span className="job-type-badge">{job.type}</span>
              </div>

              {/* Middle: Title & Company */}
              <div className="job-card-middle">
                <h3 className="job-title">{job.title}</h3>
                <p className="company-name">{job.company}</p>
              </div>

              {/* Info: Location & Salary */}
              <div className="job-card-info">
                <div className="info-item">
                  <FiMapPin className="icon-location" />
                  <span>{job.location}</span>
                </div>
                <div className="info-item">
                  <FiDollarSign className="icon-salary" />
                  <span>{job.salary}</span>
                </div>
              </div>

              <hr className="card-divider" />

              {/* Footer: Posted time & Button */}
              <div className="job-card-bottom">
                <span className="time-posted">{job.postedAt}</span>
                {/* <-- Added onClick navigation using the dynamic job.id --> */}
                <button
                  className="quick-apply-btn"
                  onClick={() => navigate(`/jobs/${job.id}/apply`)}
                >
                  Quick Apply
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Action Button */}
        <button className="fab-button" onClick={scrollToTop}>
          <FiArrowUp />
        </button>
      </div>
    </section>
  );
};

export default ExploreJobs;
