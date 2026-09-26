import React, { useEffect, useRef, useState } from "react";
import "./JobDetails.css";

const JobDetails = () => {
  const applyBtnRef = useRef(null);
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  useEffect(() => {
    const target = applyBtnRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show the sticky header only once the button has scrolled
        // above the viewport (not before it has appeared at all).
        const scrolledPast =
          !entry.isIntersecting && entry.boundingClientRect.top < 0;
        setShowStickyHeader(scrolledPast);
      },
      { threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="job-page-container">
      {/* A. Sticky Header - hidden until the main Apply button scrolls out of view */}
      <header
        className={`sticky-header ${showStickyHeader ? "sticky-header-visible" : ""}`}
      >
        <div className="sticky-header-content">
          <div className="header-left">
            <div className="company-logo-small">C</div>
            <div className="header-titles">
              <h1>Senior AI/ML Engineer</h1>
              <p>Cognitive Solutions Ltd.</p>
            </div>
          </div>
          <div className="header-right">
            <a href="#similar" className="text-link hidden-mobile">
              Share
            </a>
            <button className="btn btn-primary btn-pill">Apply</button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="main-content">
        <div className="content-layout">
          {/* Sidebar: Job Information */}
          <aside className="sidebar-column">
            <section className="card job-info-card">
              <h3 className="section-title">Job Information</h3>
              <div className="job-info-list">
                <div className="job-info-item">
                  <svg
                    className="job-info-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="9" y1="3" x2="9" y2="21"></line>
                  </svg>
                  <div className="job-info-text">
                    <p className="job-info-label">Company Name:</p>
                    <p className="job-info-value">Cognitive Solutions Ltd.</p>
                  </div>
                </div>

                <div className="job-info-item">
                  <svg
                    className="job-info-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <polyline points="17 11 19 13 23 9"></polyline>
                  </svg>
                  <div className="job-info-text">
                    <p className="job-info-label">Employee Type:</p>
                    <p className="job-info-value">Full Time</p>
                  </div>
                </div>

                <div className="job-info-item">
                  <svg
                    className="job-info-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <div className="job-info-text">
                    <p className="job-info-label">Location:</p>
                    <p className="job-info-value">
                      Bangalore/Bengaluru, Hyderabad/Telangana
                    </p>
                  </div>
                </div>

                <div className="job-info-item">
                  <svg
                    className="job-info-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="7"
                      width="20"
                      height="14"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <div className="job-info-text">
                    <p className="job-info-label">Job Type:</p>
                    <p className="job-info-value">
                      AI / Machine Learning Engineer
                    </p>
                  </div>
                </div>

                <div className="job-info-item">
                  <svg
                    className="job-info-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="7"
                      width="20"
                      height="14"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                  <div className="job-info-text">
                    <p className="job-info-label">Experience:</p>
                    <p className="job-info-value">4 - 8 Years</p>
                  </div>
                </div>

                <div className="job-info-item">
                  <svg
                    className="job-info-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                  <div className="job-info-text">
                    <p className="job-info-label">Qualifications:</p>
                    <p className="job-info-value">B.Tech / M.Tech</p>
                  </div>
                </div>

                <div className="job-info-item">
                  <svg
                    className="job-info-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                  <div className="job-info-text">
                    <p className="job-info-label">Salary:</p>
                    <p className="job-info-value">18,00,000 - 35,00,000 PA.</p>
                  </div>
                </div>

                <div className="job-info-item">
                  <svg
                    className="job-info-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <div className="job-info-text">
                    <p className="job-info-label">Date posted:</p>
                    <p className="job-info-value">Just now</p>
                  </div>
                </div>
              </div>
            </section>
          </aside>

          {/* Main column: existing job content */}
          <div className="main-column">
            {/* B. Main Job Header Card */}
            <section className="card">
              <div className="card-top-row">
                <div>
                  <h2 className="job-title-large">Senior AI/ML Engineer</h2>
                  <p className="company-name-large">Cognitive Solutions Ltd.</p>
                </div>
                <div className="company-logo-large">C</div>
              </div>

              <div className="card-middle-row">
                <div className="meta-icon-item">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="7"
                      width="20"
                      height="14"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                  <span>4 - 8 years</span>
                </div>
                <div className="divider hidden-mobile"></div>
                <div className="meta-icon-item">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 3h12"></path>
                    <path d="M6 8h12"></path>
                    <path d="M6 13l8.5 8"></path>
                    <path d="M6 8a6 6 0 0 0 9 0"></path>
                  </svg>
                  <span>18,00,000 - 35,00,000 PA.</span>
                </div>
                <div className="divider hidden-mobile"></div>
                <div className="meta-icon-item">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>Bangalore/Bengaluru, Hyderabad/Telangana</span>
                </div>
              </div>

              <div className="card-bottom-row">
                <div className="stats-group">
                  <span>
                    Posted: <strong>Just now</strong>
                  </span>
                  <span className="separator"></span>
                  <span>
                    Openings: <strong>1</strong>
                  </span>
                  <span className="separator"></span>
                  <span>
                    Applicants: <strong>Less than 10</strong>
                  </span>
                </div>

                <div className="actions-group">
                  <button className="btn btn-outline btn-pill btn-with-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                    Save
                  </button>
                  <button
                    ref={applyBtnRef}
                    className="btn btn-primary btn-pill px-large"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </section>

            {/* C. Job Highlights & Match Score Card */}
            <section className="card card-gray">
              <div className="section-block">
                <h3 className="section-title">Job highlights</h3>
                <ul className="bullet-list">
                  <li>
                    Strong background in designing, training, and deploying deep
                    learning models (ANN, CNN, RNN, Transformers).
                  </li>
                  <li>
                    Experience with cloud platforms like AWS, GCP, or Azure for
                    scalable ML deployments.
                  </li>
                  <li>
                    Work closely with cross-functional teams to integrate AI
                    models into production environments.
                  </li>
                </ul>
              </div>

              <div className="section-block mt-large">
                <h3 className="section-title">Job match score</h3>
                <div className="tags-container">
                  <div className="tag tag-match">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    Early Applicant
                  </div>
                  <div className="tag tag-match">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    Keyskills
                  </div>
                  <div className="tag tag-match">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    Location
                  </div>
                  <div className="tag tag-mismatch">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9ca3af"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                    Work Experience
                  </div>
                </div>
              </div>
            </section>

            {/* D. Job Description Section */}
            <section className="card">
              <h3 className="section-title">Job description</h3>
              <div className="rich-text">
                <p>
                  We are seeking a highly skilled and motivated Senior AI/ML
                  Engineer to join our growing data science team. You will be
                  responsible for building end-to-end machine learning
                  pipelines, optimizing model architectures, and deploying
                  highly scalable AI solutions.
                </p>
                <p>
                  <strong>Responsibilities:</strong>
                </p>
                <ul>
                  <li>
                    Develop and fine-tune state-of-the-art NLP and Computer
                    Vision models.
                  </li>
                  <li>
                    Collaborate with backend engineers to deploy RESTful APIs
                    for model inference.
                  </li>
                  <li>
                    Monitor and retrain models in production to ensure high
                    accuracy over time.
                  </li>
                  <li>
                    Mentor junior data scientists and contribute to
                    architectural reviews.
                  </li>
                </ul>
                <p>
                  <strong>Requirements:</strong>
                </p>
                <ul>
                  <li>
                    B.Tech/M.Tech/Ph.D. in Computer Science, Mathematics, or
                    related field.
                  </li>
                  <li>
                    Proven track record of deploying ML models in production
                    (TensorFlow, PyTorch).
                  </li>
                  <li>
                    Proficiency in Python and familiarity with
                    Docker/Kubernetes.
                  </li>
                </ul>
              </div>
            </section>

            {/* E. Details & Skills Section */}
            <section className="card">
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Role:</span>
                  <span className="detail-value">
                    AI / Machine Learning Engineer
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Industry Type:</span>
                  <span className="detail-value">IT Services & Consulting</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Department:</span>
                  <span className="detail-value">Data Science & Analytics</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Employment Type:</span>
                  <span className="detail-value">Full Time, Permanent</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Role Category:</span>
                  <span className="detail-value">
                    Data Science & Machine Learning
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Education:</span>
                  <span className="detail-value">
                    B.Tech/B.E. in Computers, M.Tech in Computers
                  </span>
                </div>
              </div>

              <hr className="divider-horizontal" />

              <div className="skills-section">
                <h3 className="section-title">Key Skills</h3>
                <p className="skills-subtext">
                  Skills highlighted with '
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="#2563eb"
                    stroke="#2563eb"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  ' are preferred keyskills
                </p>

                <div className="tags-container">
                  <div className="tag tag-preferred">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="#2563eb"
                      stroke="#2563eb"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    PyTorch
                  </div>
                  <div className="tag tag-preferred">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="#2563eb"
                      stroke="#2563eb"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    Deep Learning
                  </div>
                  <div className="tag tag-standard">ANN</div>
                  <div className="tag tag-standard">CNN</div>
                  <div className="tag tag-standard">RNN</div>
                  <div className="tag tag-standard">Python</div>
                  <div className="tag tag-standard">AWS</div>
                  <div className="tag tag-standard">NLP</div>
                </div>
              </div>
            </section>

            {/* F. Footer / Company Section */}
            <div className="footer-container">
              <div className="social-share-row">
                <div className="social-icons">
                  <span className="social-label">Share:</span>
                  <button aria-label="Facebook">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </button>
                  <button aria-label="Twitter">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </button>
                  <button aria-label="LinkedIn">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </button>
                </div>
                <a href="#report" className="text-link text-small">
                  Report this job
                </a>
              </div>

              <section className="card">
                <h3 className="section-title">About company</h3>
                <p className="company-name-bold">Cognitive Solutions Ltd.</p>
                <div className="company-info-block">
                  <h4 className="info-label">Company Info</h4>
                  <p className="info-text">
                    Address: 4th Floor, Tech Park Tower B, Outer Ring Road,
                    Bellandur, Bengaluru, Karnataka 560103, India.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobDetails;
