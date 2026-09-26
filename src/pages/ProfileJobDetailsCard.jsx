import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./ProfileJobDetailsCard.css";
import JOB_DETAILS_DATA from "./JobDetails.json";

/* ------------------------------------------------------------------ */
/*  Hardcoded, monochrome SVG icon set (no emoji, no color fills).     */
/*  Uses currentColor so it inherits text color / can be styled by CSS */
/* ------------------------------------------------------------------ */
const Icon = ({ name, size = 18 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (name) {
    case "building":
      return (
        <svg {...common}>
          <rect x="4" y="2" width="16" height="20" rx="1"></rect>
          <path d="M9 22v-4h6v4"></path>
          <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"></path>
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      );
    case "mapPin":
      return (
        <svg {...common}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      );
    case "monitor":
      return (
        <svg {...common}>
          <rect x="2" y="3" width="20" height="14" rx="2"></rect>
          <path d="M8 21h8M12 17v4"></path>
        </svg>
      );
    case "briefcase":
      return (
        <svg {...common}>
          <rect x="2" y="7" width="20" height="14" rx="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      );
    case "graduationCap":
      return (
        <svg {...common}>
          <path d="M22 10L12 5 2 10l10 5 10-5z"></path>
          <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5"></path>
        </svg>
      );
    case "dollarSign":
      return (
        <svg {...common}>
          <path d="M12 1v22"></path>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 6v6l4 2"></path>
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <path d="M9 22V12h6v10"></path>
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"></path>
        </svg>
      );
    case "sun":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="5"></circle>
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"></path>
        </svg>
      );
    case "bookOpen":
      return (
        <svg {...common}>
          <path d="M2 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H2z"></path>
          <path d="M22 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8z"></path>
        </svg>
      );
    case "trendingUp":
      return (
        <svg {...common}>
          <path d="M23 6l-9.5 9.5-5-5L1 18"></path>
          <path d="M17 6h6v6"></path>
        </svg>
      );
    case "activity":
      return (
        <svg {...common}>
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path d="M11 20A7 7 0 0 1 4 13c0-6 8-11 17-11-1 9-5 18-10 18z"></path>
          <path d="M4 13c5 0 9-4 9-9"></path>
        </svg>
      );
    case "laptop":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="12" rx="1"></rect>
          <path d="M2 20h20"></path>
        </svg>
      );
    case "sparkles":
      return (
        <svg {...common}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"></path>
        </svg>
      );
    case "shuffle":
      return (
        <svg {...common}>
          <path d="M16 3h5v5"></path>
          <path d="M4 20L21 3"></path>
          <path d="M21 16v5h-5"></path>
          <path d="M15 15l6 6"></path>
          <path d="M4 4l5 5"></path>
        </svg>
      );
    case "folder":
      return (
        <svg {...common}>
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>
      );
    case "checkCircle":
      return (
        <svg {...common}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <path d="M22 4L12 14.01l-3-3"></path>
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="18" rx="2"></rect>
          <path d="M16 2v4M8 2v4M3 10h18"></path>
        </svg>
      );
    case "bookmarkFilled":
      return (
        <svg
          viewBox="0 0 24 24"
          width={size + 6}
          height={size + 6}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
      );
    case "bookmarkOutline":
      return (
        <svg
          viewBox="0 0 24 24"
          width={size + 6}
          height={size + 6}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
      );
    case "logo":
      return (
        <svg {...common}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      );
    case "star":
    default:
      return (
        <svg {...common}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01z"></path>
        </svg>
      );
  }
};

/* Maps a sidebar label straight to an icon name */
const sidebarIconMap = {
  "Company Name:": "building",
  "Employee Type:": "users",
  "Location:": "mapPin",
  "Job Type:": "monitor",
  "Experience:": "briefcase",
  "Qualifications:": "graduationCap",
  "Salary:": "dollarSign",
  "Date posted:": "clock",
};

/* Keyword-based lookup for benefit/perk text since wording varies per job */
const getBenefitIconName = (text = "") => {
  const t = text.toLowerCase();
  if (t.includes("remote") || (t.includes("hybrid") && t.includes("culture")))
    return "home";
  if (t.includes("health") || t.includes("insurance")) return "heart";
  if (t.includes("pto") || t.includes("vacation") || t.includes("days"))
    return "sun";
  if (
    t.includes("learning") ||
    t.includes("mentorship") ||
    t.includes("conference")
  )
    return "bookOpen";
  if (t.includes("bonus") || t.includes("equity")) return "trendingUp";
  if (t.includes("gym")) return "activity";
  if (t.includes("sustainab")) return "leaf";
  if (
    t.includes("laptop") ||
    t.includes("home office") ||
    t.includes("stipend")
  )
    return "laptop";
  if (t.includes("creative")) return "sparkles";
  if (t.includes("hybrid")) return "shuffle";
  if (t.includes("portfolio")) return "folder";
  if (t.includes("full-time") || t.includes("full time")) return "checkCircle";
  if (t.includes("flexible") || t.includes("hours")) return "clock";
  return "star";
};

const ProfileJobDetailsCard = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Sticky trigger for the compact banner — coded inline (no external hook file).
  // A 1px sentinel sits right after the full top banner; once it scrolls out
  // of view, the compact bar slides in under the nav.
  const sentinelRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-1px 0px 0px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleToggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  const profileJobData = JOB_DETAILS_DATA.find(
    (job) => String(job.id) === String(jobId),
  );

  const profileHandleGoToApply = () => {
    navigate(`/jobs/${jobId}/apply`);
  };

  if (!profileJobData) {
    return (
      <div className="profile-jobdetailscard-wrapper">
        <div className="profile-jobdetailscard-container">
          <div className="profile-jobdetailscard-content-card">
            <h2 className="profile-jobdetailscard-section-heading">
              Job not found
            </h2>
            <p className="profile-jobdetailscard-paragraph">
              We couldn't find a job listing with id "{jobId}". It may have been
              removed or the link is out of date.
            </p>
            <Link to="/" className="profile-jobdetailscard-apply-btn-large">
              Back to Job Board
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const profileRenderTopBanner = () => {
    return (
      <div className="profile-jobdetailscard-top-banner">
        <div className="profile-jobdetailscard-banner-left">
          <div className="profile-jobdetailscard-logo-box">LOGO</div>
          <div className="profile-jobdetailscard-title-group">
            <h1 className="profile-jobdetailscard-job-title">
              {profileJobData.title}
            </h1>
            <div className="profile-jobdetailscard-company-info">
              <span className="profile-jobdetailscard-company-name">
                {profileJobData.company}
              </span>
              <span className="profile-jobdetailscard-divider">|</span>
              <span className="profile-jobdetailscard-location">
                {profileJobData.location}
              </span>
            </div>
            <div className="profile-jobdetailscard-tags-row">
              {profileJobData.tags.map((tag) => (
                <span
                  key={tag.id}
                  className={`profile-jobdetailscard-tag ${tag.styleClass}`}
                >
                  {tag.label}
                </span>
              ))}
              <span className="profile-jobdetailscard-salary-tag">
                <Icon name="dollarSign" size={14} />{" "}
                {profileJobData.salaryDisplay}
              </span>
            </div>
          </div>
        </div>
        <div className="profile-jobdetailscard-banner-right">
          <button
            className={`profile-jobdetailscard-bookmark-btn ${
              isBookmarked ? "profile-jobdetailscard-bookmark-btn-active" : ""
            }`}
            type="button"
            aria-pressed={!!isBookmarked}
            aria-label={isBookmarked ? "Remove saved job" : "Save job"}
            onClick={handleToggleBookmark}
          >
            <Icon name={isBookmarked ? "bookmarkFilled" : "bookmarkOutline"} />
          </button>
          <button
            className="profile-jobdetailscard-apply-btn"
            onClick={profileHandleGoToApply}
          >
            Apply Now
          </button>
        </div>
      </div>
    );
  };

  const profileRenderSidebar = () => {
    return (
      <aside className="profile-jobdetailscard-sidebar">
        <h3 className="profile-jobdetailscard-sidebar-title">
          Job Information
        </h3>
        <ul className="profile-jobdetailscard-info-list">
          {profileJobData.sidebarInfo.map((info) => (
            <li key={info.id} className="profile-jobdetailscard-info-item">
              <span className="profile-jobdetailscard-info-icon">
                <Icon name={sidebarIconMap[info.label] || "star"} />
              </span>
              <div className="profile-jobdetailscard-info-text">
                <strong>{info.label}</strong>
                <span>{info.value}</span>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    );
  };

  const profileRenderMainContent = () => {
    return (
      <div className="profile-jobdetailscard-main-content">
        <div className="profile-jobdetailscard-content-card">
          <h2 className="profile-jobdetailscard-section-heading">
            About the Job
          </h2>
          <p className="profile-jobdetailscard-paragraph">
            {profileJobData.about}
          </p>
        </div>

        <div className="profile-jobdetailscard-content-card">
          <h2 className="profile-jobdetailscard-section-heading">
            Role & Responsibilities
          </h2>
          <ul className="profile-jobdetailscard-bullet-list">
            {profileJobData.responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
        </div>

        <div className="profile-jobdetailscard-content-card">
          <h2 className="profile-jobdetailscard-section-heading">
            Benefits & Perks
          </h2>
          <div className="profile-jobdetailscard-perks-grid">
            {profileJobData.benefits.map((perk) => (
              <div key={perk.id} className="profile-jobdetailscard-perk-item">
                <span className="profile-jobdetailscard-perk-icon">
                  <Icon name={getBenefitIconName(perk.text)} />
                </span>
                <span>{perk.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-jobdetailscard-apply-section">
          <button
            className="profile-jobdetailscard-apply-btn-large"
            onClick={profileHandleGoToApply}
          >
            Apply Now
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="profile-jobdetailscard-wrapper">
      {/* --- COMPACT STICKY JOB BAR (fixed under nav, slides in on scroll) --- */}
      <div
        className={`profile-jobdetailscard-compact-bar ${
          isSticky ? "is-visible" : ""
        }`}
        aria-hidden={!isSticky}
      >
        <div className="profile-jobdetailscard-compact-left">
          <div className="profile-jobdetailscard-compact-logo">LOGO</div>
          <div className="profile-jobdetailscard-compact-text">
            <div className="profile-jobdetailscard-compact-title">
              {profileJobData.title}
            </div>
            <div className="profile-jobdetailscard-compact-company">
              {profileJobData.company} · {profileJobData.location}
            </div>
          </div>
        </div>
        <div className="profile-jobdetailscard-compact-actions">
          <button
            className="profile-jobdetailscard-compact-bookmark-btn"
            type="button"
            aria-pressed={!!isBookmarked}
            aria-label={isBookmarked ? "Remove saved job" : "Save job"}
            onClick={handleToggleBookmark}
            tabIndex={isSticky ? 0 : -1}
          >
            <Icon
              name={isBookmarked ? "bookmarkFilled" : "bookmarkOutline"}
              size={16}
            />
          </button>
          <button
            className="profile-jobdetailscard-compact-apply-btn"
            type="button"
            onClick={profileHandleGoToApply}
            tabIndex={isSticky ? 0 : -1}
          >
            Apply Now
          </button>
        </div>
      </div>

      <div className="profile-jobdetailscard-container">
        {profileRenderTopBanner()}

        {/* Sentinel: once the full banner scrolls past this point, compact bar appears */}
        <div ref={sentinelRef} className="sticky-sentinel"></div>

        <div className="profile-jobdetailscard-body-layout">
          {profileRenderSidebar()}
          {profileRenderMainContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfileJobDetailsCard;
