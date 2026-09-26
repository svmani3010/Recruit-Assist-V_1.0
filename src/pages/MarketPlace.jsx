import "./MarketPlace.css";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import JOBS_DATA from "./JobDetails.json";

const SALARY_MIN = 50;
const SALARY_MAX = 200;
const MIN_GAP = 10;
const PAGE_SIZE = 10;

const SORT_OPTIONS = [
  { key: "newest", label: "Newest" },
  { key: "salaryHigh", label: "Salary: High to Low" },
  { key: "salaryLow", label: "Salary: Low to High" },
  { key: "az", label: "Title: A to Z" },
];

const JobBoard = () => {
  const navigate = useNavigate();

  // ---------- STICKY COMPACT SEARCH BAR (coded inline, no external hook file) ----------
  // Robust IntersectionObserver approach instead of hardcoded scrollY numbers:
  // a 1px invisible "sentinel" div sits at the top of the hero. As soon as it
  // scrolls out of the viewport, isSticky flips true and the compact bar
  // slides in like a navbar. As soon as you scroll back up past it, it hides.
  const sentinelRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: "120px 0px 0px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // ---------- SEARCH BAR STATE ----------
  const [searchTitle, setSearchTitle] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  // ---------- SIDEBAR FILTER STATE ----------
  const [jobTypeFilters, setJobTypeFilters] = useState({
    fulltime: false,
    contract: false,
    parttime: false,
    internship: false,
  });

  const [categoryFilters, setCategoryFilters] = useState({
    design: false,
    engineering: false,
    marketing: false,
    management: false,
  });

  const [experienceFilters, setExperienceFilters] = useState({
    entry: false,
    mid: false,
    senior: false,
  });

  const [salaryRange, setSalaryRange] = useState([SALARY_MIN, SALARY_MAX]);

  const toggleFilter = (setter) => (key) => {
    setter((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleJobTypeToggle = toggleFilter(setJobTypeFilters);
  const handleCategoryToggle = toggleFilter(setCategoryFilters);
  const handleExperienceToggle = toggleFilter(setExperienceFilters);

  // ---------- JOB TYPE COUNTS (real counts from the dataset) ----------
  const jobTypeTotals = useMemo(() => {
    const counts = { fulltime: 0, contract: 0, parttime: 0, internship: 0 };
    JOBS_DATA.forEach((job) => {
      counts[job.employmentType] = (counts[job.employmentType] || 0) + 1;
    });
    return counts;
  }, []);

  // ---------- SALARY RANGE SLIDER (draggable) ----------
  const sliderRef = useRef(null);
  const draggingThumb = useRef(null); // 'left' | 'right' | null

  const valueToPercent = (value) =>
    ((value - SALARY_MIN) / (SALARY_MAX - SALARY_MIN)) * 100;

  const percentToValue = (percent) =>
    Math.round(SALARY_MIN + (percent / 100) * (SALARY_MAX - SALARY_MIN));

  const updateFromClientX = useCallback((clientX) => {
    if (!sliderRef.current || !draggingThumb.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    let percent = ((clientX - rect.left) / rect.width) * 100;
    percent = Math.min(100, Math.max(0, percent));
    const value = percentToValue(percent);

    setSalaryRange(([min, max]) => {
      if (draggingThumb.current === "left") {
        const clamped = Math.min(value, max - MIN_GAP);
        return [Math.max(SALARY_MIN, clamped), max];
      } else {
        const clamped = Math.max(value, min + MIN_GAP);
        return [min, Math.min(SALARY_MAX, clamped)];
      }
    });
  }, []);

  const stopDragging = useCallback(() => {
    draggingThumb.current = null;
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", stopDragging);
  }, []);

  const handlePointerMove = useCallback(
    (e) => {
      updateFromClientX(e.clientX);
    },
    [updateFromClientX],
  );

  const startDragging = (thumb) => (e) => {
    e.preventDefault();
    draggingThumb.current = thumb;
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDragging);
  };

  // Clean up listeners if the component unmounts mid-drag
  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopDragging);
    };
  }, [handlePointerMove, stopDragging]);

  // Allow clicking directly on the track to jump the nearest thumb there
  const handleTrackClick = (e) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.min(
      100,
      Math.max(0, ((e.clientX - rect.left) / rect.width) * 100),
    );
    const value = percentToValue(percent);

    setSalaryRange(([min, max]) => {
      const distToMin = Math.abs(value - min);
      const distToMax = Math.abs(value - max);
      if (distToMin <= distToMax) {
        return [Math.min(value, max - MIN_GAP), max];
      }
      return [min, Math.max(value, min + MIN_GAP)];
    });
  };

  // ---------- BOOKMARK / SAVE STATE ----------
  const [bookmarked, setBookmarked] = useState(() =>
    JOBS_DATA.reduce((acc, job) => {
      acc[job.id] = !!job.bookmarked;
      return acc;
    }, {}),
  );

  const toggleBookmark = (id) => {
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // ---------- SORT STATE ----------
  const [sortBy, setSortBy] = useState("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentSortLabel =
    SORT_OPTIONS.find((opt) => opt.key === sortBy)?.label || "Newest";

  // ---------- FILTERING + SORTING ----------
  const filteredJobs = useMemo(() => {
    const anyJobType = Object.values(jobTypeFilters).some(Boolean);
    const anyCategory = Object.values(categoryFilters).some(Boolean);
    const anyExperience = Object.values(experienceFilters).some(Boolean);

    let result = JOBS_DATA.filter((job) => {
      if (anyJobType && !jobTypeFilters[job.employmentType]) return false;
      if (anyCategory && !categoryFilters[job.category]) return false;
      if (anyExperience && !experienceFilters[job.experience]) return false;

      // Salary range overlap check
      if (job.salaryMax < salaryRange[0] || job.salaryMin > salaryRange[1]) {
        return false;
      }

      if (
        searchTitle.trim() &&
        !`${job.title} ${job.company}`
          .toLowerCase()
          .includes(searchTitle.trim().toLowerCase())
      ) {
        return false;
      }

      if (
        searchType.trim() &&
        !`${job.type} ${job.employmentType}`
          .toLowerCase()
          .includes(searchType.trim().toLowerCase())
      ) {
        return false;
      }

      if (
        searchLocation.trim() &&
        !job.location
          .toLowerCase()
          .includes(searchLocation.trim().toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    switch (sortBy) {
      case "salaryHigh":
        result = [...result].sort((a, b) => b.salaryMax - a.salaryMax);
        break;
      case "salaryLow":
        result = [...result].sort((a, b) => a.salaryMin - b.salaryMin);
        break;
      case "az":
        result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "newest":
      default:
        result = [...result].sort((a, b) => a.hoursAgo - b.hoursAgo);
        break;
    }

    return result;
  }, [
    jobTypeFilters,
    categoryFilters,
    experienceFilters,
    salaryRange,
    searchTitle,
    searchType,
    searchLocation,
    sortBy,
  ]);

  // ---------- PAGINATION ----------
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));

  // Whenever the filters/search/sort change the result set, jump back to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [
    jobTypeFilters,
    categoryFilters,
    experienceFilters,
    salaryRange,
    searchTitle,
    searchType,
    searchLocation,
    sortBy,
  ]);

  // Guard against being stranded on a page that no longer exists
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredJobs.slice(start, start + PAGE_SIZE);
  }, [filteredJobs, currentPage]);

  const goToPage = (page) => {
    const clamped = Math.min(totalPages, Math.max(1, page));
    setCurrentPage(clamped);
    // Optional: scroll listings back into view when paging
    document
      .querySelector(".marketplace-listings-header")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Builds the list of page buttons to render, collapsing long ranges with "..."
  const getPageItems = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const items = [1];
    if (currentPage > 3) items.push("dots-left");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) items.push(i);

    if (currentPage < totalPages - 2) items.push("dots-right");
    items.push(totalPages);

    return items;
  };

  const runSearch = () => {
    const element = document.querySelector(".marketplace-listings-header");

    if (!element) return;

    const offset = 90; // Adjust this value

    const y = element.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  return (
    <div className="marketplace-page">
      {/* --- COMPACT STICKY SEARCH BAR (fixed, slides in on scroll) --- */}
      <div
        className={`marketplace-compact-search-bar ${
          isSticky ? "is-visible" : ""
        }`}
        aria-hidden={!isSticky}
      >
        <span className="compact-logo">Recruit Assist</span>

        {/* 1. JOB TITLE / COMPANY */}
        <div className="marketplace-search-input-group">
          <svg
            className="marketplace-input-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <div className="marketplace-input-field">
            <label>JOB TITLE OR COMPANY</label>
            <input
              type="text"
              placeholder="e.g. Designer, Google..."
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              tabIndex={isSticky ? 0 : -1}
            />
          </div>
        </div>

        <div className="marketplace-search-divider"></div>

        {/* 2. JOB TYPE */}
        <div className="marketplace-search-input-group">
          <svg
            className="marketplace-input-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
            <line x1="7" y1="7" x2="7.01" y2="7"></line>
          </svg>
          <div className="marketplace-input-field">
            <label>JOB TYPE</label>
            <input
              type="text"
              placeholder="Full Time, Internship..."
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              tabIndex={isSticky ? 0 : -1}
            />
          </div>
        </div>

        <div className="marketplace-search-divider"></div>

        {/* 3. LOCATION */}
        <div className="marketplace-search-input-group">
          <svg
            className="marketplace-input-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <div className="marketplace-input-field">
            <label>LOCATION</label>
            <input
              type="text"
              placeholder="City, state, or Remote..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              tabIndex={isSticky ? 0 : -1}
            />
          </div>
        </div>

        {/* 4. SEARCH BUTTON */}
        <button
          className="marketplace-btn-search-main"
          type="button"
          onClick={runSearch}
          tabIndex={isSticky ? 0 : -1}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          Search Jobs
        </button>
      </div>

      {/* --- HERO / SEARCH SECTION --- */}
      <header className="marketplace-hero">
        {/* Sentinel: as soon as this scrolls out of view, the compact bar appears */}
        <div ref={sentinelRef} className="sticky-sentinel"></div>

        <div className="marketplace-hero-content">
          <h1>Find Your Next Opportunity</h1>
          <p>Search thousands of jobs across top companies and locations</p>

          <div className="marketplace-search-bar-wrapper">
            <div className="marketplace-search-bar">
              <div className="marketplace-search-input-group">
                <svg
                  className="marketplace-input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <div className="marketplace-input-field">
                  <label>JOB TITLE OR COMPANY</label>
                  <input
                    type="text"
                    placeholder="e.g. Designer, Google..."
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="marketplace-search-divider"></div>

              <div className="marketplace-search-input-group">
                <svg
                  className="marketplace-input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
                <div className="marketplace-input-field">
                  <label>JOB TYPE</label>
                  <input
                    type="text"
                    placeholder="Full Time, Internship..."
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                  />
                </div>
              </div>
              <div className="marketplace-search-divider"></div>

              <div className="marketplace-search-input-group">
                <svg
                  className="marketplace-input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <div className="marketplace-input-field">
                  <label>LOCATION</label>
                  <input
                    type="text"
                    placeholder="City, state, or Remote..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
              </div>

              <button
                className="marketplace-btn-search-main"
                type="button"
                onClick={runSearch}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                Search Jobs
              </button>
            </div>
          </div>

          <div className="marketplace-popular-tags">
            <span>Popular:</span>
            <span
              className="marketplace-tag"
              onClick={() => setSearchTitle("Product Designer")}
            >
              Product Designer
            </span>
            <span
              className="marketplace-tag"
              onClick={() => setSearchTitle("React Developer")}
            >
              React Developer
            </span>
            <span
              className="marketplace-tag"
              onClick={() => setSearchTitle("Marketing Manager")}
            >
              Marketing Manager
            </span>
            <span
              className="marketplace-tag"
              onClick={() => setSearchLocation("Remote")}
            >
              Remote
            </span>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="marketplace-main-layout">
        {/* SIDEBAR FILTERS */}
        <aside className="marketplace-sidebar">
          <div className="marketplace-filter-group">
            <h3>Job Type</h3>
            <label className="marketplace-checkbox-label">
              <input
                type="checkbox"
                checked={jobTypeFilters.fulltime}
                onChange={() => handleJobTypeToggle("fulltime")}
              />
              <span className="marketplace-checkmark"></span>
              <span className="marketplace-label-text">Full-time</span>
              <span className="marketplace-count">
                {jobTypeTotals.fulltime}
              </span>
            </label>
            <label className="marketplace-checkbox-label">
              <input
                type="checkbox"
                checked={jobTypeFilters.contract}
                onChange={() => handleJobTypeToggle("contract")}
              />
              <span className="marketplace-checkmark"></span>
              <span className="marketplace-label-text">Contract</span>
              <span className="marketplace-count">
                {jobTypeTotals.contract}
              </span>
            </label>
            <label className="marketplace-checkbox-label">
              <input
                type="checkbox"
                checked={jobTypeFilters.parttime}
                onChange={() => handleJobTypeToggle("parttime")}
              />
              <span className="marketplace-checkmark"></span>
              <span className="marketplace-label-text">Part-time</span>
              <span className="marketplace-count">
                {jobTypeTotals.parttime}
              </span>
            </label>
            <label className="marketplace-checkbox-label">
              <input
                type="checkbox"
                checked={jobTypeFilters.internship}
                onChange={() => handleJobTypeToggle("internship")}
              />
              <span className="marketplace-checkmark"></span>
              <span className="marketplace-label-text">Internship</span>
              <span className="marketplace-count">
                {jobTypeTotals.internship}
              </span>
            </label>
          </div>

          <div className="marketplace-filter-group">
            <h3>Salary Range</h3>
            <div className="marketplace-salary-labels">
              <span>${salaryRange[0]}k</span>
              <span className="marketplace-salary-max">
                {salaryRange[1] >= SALARY_MAX
                  ? `$${SALARY_MAX}k+`
                  : `$${salaryRange[1]}k`}
              </span>
            </div>
            <div
              className="marketplace-range-slider"
              ref={sliderRef}
              onClick={handleTrackClick}
            >
              <div className="marketplace-range-track"></div>
              <div
                className="marketplace-range-fill"
                style={{
                  left: `${valueToPercent(salaryRange[0])}%`,
                  right: `${100 - valueToPercent(salaryRange[1])}%`,
                }}
              ></div>
              <div
                className="marketplace-range-thumb marketplace-thumb-left"
                style={{ left: `${valueToPercent(salaryRange[0])}%` }}
                onPointerDown={startDragging("left")}
                role="slider"
                aria-label="Minimum salary"
                aria-valuemin={SALARY_MIN}
                aria-valuemax={SALARY_MAX}
                aria-valuenow={salaryRange[0]}
                tabIndex={0}
              ></div>
              <div
                className="marketplace-range-thumb marketplace-thumb-right"
                style={{ left: `${valueToPercent(salaryRange[1])}%` }}
                onPointerDown={startDragging("right")}
                role="slider"
                aria-label="Maximum salary"
                aria-valuemin={SALARY_MIN}
                aria-valuemax={SALARY_MAX}
                aria-valuenow={salaryRange[1]}
                tabIndex={0}
              ></div>
            </div>
          </div>

          <div className="marketplace-filter-group">
            <h3>Categories</h3>
            <label className="marketplace-checkbox-label">
              <input
                type="checkbox"
                checked={categoryFilters.design}
                onChange={() => handleCategoryToggle("design")}
              />
              <span className="marketplace-checkmark"></span>
              <span className="marketplace-label-text">Design</span>
            </label>
            <label className="marketplace-checkbox-label">
              <input
                type="checkbox"
                checked={categoryFilters.engineering}
                onChange={() => handleCategoryToggle("engineering")}
              />
              <span className="marketplace-checkmark"></span>
              <span className="marketplace-label-text">Engineering</span>
            </label>
            <label className="marketplace-checkbox-label">
              <input
                type="checkbox"
                checked={categoryFilters.marketing}
                onChange={() => handleCategoryToggle("marketing")}
              />
              <span className="marketplace-checkmark"></span>
              <span className="marketplace-label-text">Marketing</span>
            </label>
            <label className="marketplace-checkbox-label">
              <input
                type="checkbox"
                checked={categoryFilters.management}
                onChange={() => handleCategoryToggle("management")}
              />
              <span className="marketplace-checkmark"></span>
              <span className="marketplace-label-text">Management</span>
            </label>
          </div>

          <div className="marketplace-filter-group">
            <h3>Experience Level</h3>
            <label className="marketplace-checkbox-label">
              <input
                type="checkbox"
                checked={experienceFilters.entry}
                onChange={() => handleExperienceToggle("entry")}
              />
              <span className="marketplace-checkmark"></span>
              <span className="marketplace-label-text">Entry Level</span>
            </label>
            <label className="marketplace-checkbox-label">
              <input
                type="checkbox"
                checked={experienceFilters.mid}
                onChange={() => handleExperienceToggle("mid")}
              />
              <span className="marketplace-checkmark"></span>
              <span className="marketplace-label-text">Mid Level</span>
            </label>
            <label className="marketplace-checkbox-label">
              <input
                type="checkbox"
                checked={experienceFilters.senior}
                onChange={() => handleExperienceToggle("senior")}
              />
              <span className="marketplace-checkmark"></span>
              <span className="marketplace-label-text">Senior Level</span>
            </label>
          </div>
        </aside>

        {/* JOB LISTINGS */}
        <section className="marketplace-job-listings">
          <div className="marketplace-listings-header">
            <h2>Find your job easily</h2>
            <div className="marketplace-jobs-found-badge">
              <svg
                className="marketplace-tick-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>
                {filteredJobs.length}{" "}
                {filteredJobs.length === 1 ? "Job" : "Jobs"} found
              </span>
            </div>
            <div className="marketplace-sort-by" ref={sortRef}>
              <span>Sort by:</span>
              <div className="marketplace-sort-dropdown-wrapper">
                <div
                  className="marketplace-sort-dropdown"
                  onClick={() => setSortOpen((prev) => !prev)}
                >
                  {currentSortLabel}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      transform: sortOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
                {sortOpen && (
                  <ul className="marketplace-sort-menu">
                    {SORT_OPTIONS.map((opt) => (
                      <li
                        key={opt.key}
                        className={`marketplace-sort-menu-item ${
                          sortBy === opt.key
                            ? "marketplace-sort-menu-item-active"
                            : ""
                        }`}
                        onClick={() => {
                          setSortBy(opt.key);
                          setSortOpen(false);
                        }}
                      >
                        {opt.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="marketplace-jobs-list">
            {filteredJobs.length === 0 ? (
              <div className="marketplace-no-results">
                <p>No jobs match your filters right now.</p>
                <span>Try widening the salary range or clearing a filter.</span>
              </div>
            ) : (
              paginatedJobs.map((job) => (
                <div className="marketplace-job-card" key={job.id}>
                  <div className="marketplace-card-top">
                    <div className="marketplace-job-info-wrapper">
                      <div className="marketplace-company-logo">LOGO</div>
                      <div className="marketplace-job-details">
                        <h3>{job.title}</h3>
                        <p className="marketplace-company-name">
                          {job.company}
                        </p>
                        <div className="marketplace-job-meta">
                          <span className="marketplace-meta-item">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            {job.location}
                          </span>
                          <span className="marketplace-meta-item marketplace-text-green">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <line x1="12" y1="1" x2="12" y2="23"></line>
                              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                            ${job.salaryMin}k - ${job.salaryMax}k
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="marketplace-card-actions-top">
                      <span className={`marketplace-badge ${job.badgeClass}`}>
                        {job.type}
                      </span>
                      <button
                        className={`marketplace-btn-bookmark ${
                          bookmarked[job.id]
                            ? "marketplace-btn-bookmark-active"
                            : ""
                        }`}
                        type="button"
                        aria-pressed={!!bookmarked[job.id]}
                        aria-label={
                          bookmarked[job.id] ? "Remove saved job" : "Save job"
                        }
                        onClick={() => toggleBookmark(job.id)}
                      >
                        {bookmarked[job.id] ? (
                          <svg
                            viewBox="0 0 24 24"
                            fill="#3b82f6"
                            stroke="#3b82f6"
                            strokeWidth="2"
                          >
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                          </svg>
                        ) : (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="marketplace-card-bottom">
                    <span className="marketplace-time-ago">{job.timeAgo}</span>
                    <div className="marketplace-card-buttons">
                      <button
                        className="marketplace-btn-outline"
                        type="button"
                        onClick={() => navigate(`/jobs/${job.id}`)}
                      >
                        View
                      </button>
                      <button
                        className="marketplace-btn-primary"
                        type="button"
                        onClick={() => navigate(`/jobs/${job.id}/apply`)}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className="marketplace-pagination">
              <button
                className="marketplace-page-btn"
                type="button"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
                aria-label="Previous page"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              {getPageItems().map((item) =>
                typeof item === "number" ? (
                  <button
                    key={item}
                    className={`marketplace-page-btn ${
                      currentPage === item ? "marketplace-active" : ""
                    }`}
                    type="button"
                    onClick={() => goToPage(item)}
                  >
                    {item}
                  </button>
                ) : (
                  <span className="marketplace-page-dots" key={item}>
                    ...
                  </span>
                ),
              )}

              <button
                className="marketplace-page-btn"
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
                aria-label="Next page"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default JobBoard;
