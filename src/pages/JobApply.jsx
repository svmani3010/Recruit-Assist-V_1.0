import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./JobApply.css";
import JOB_DETAILS_DATA from "./JobDetails.json";

/**
 * DEMO / PLACEHOLDER PAGE
 * -----------------------
 * This is a stand-in for the real Job Apply page. It already:
 *  - reads the job id from the URL (/jobs/:jobId/apply)
 *  - looks up that job's title/company/location from JobDetails.json
 *  - includes a basic resume-upload flow so the wiring is proven end to end
 *
 * Swap out the "Demo application form" block below with your real form
 * fields, validation, and submit logic whenever it's ready — everything
 * above it (job lookup, routing, layout) can stay as-is.
 */
const JobApply = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const job = JOB_DETAILS_DATA.find((j) => String(j.id) === String(jobId));

  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
    } else if (file) {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: replace with real submit logic (API call, etc.)
    setSubmitted(true);
  };

  if (!job) {
    return (
      <div className="jobapply-wrapper">
        <div className="jobapply-container">
          <div className="jobapply-card">
            <h2 className="jobapply-heading">Job not found</h2>
            <p className="jobapply-subtext">
              We couldn't find a job listing with id "{jobId}".
            </p>
            <Link to="/" className="jobapply-btn-primary">
              Back to Job Board
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="jobapply-wrapper">
      <div className="jobapply-container">
        <button
          className="jobapply-back-link"
          type="button"
          onClick={() => navigate(`/jobs/${jobId}`)}
        >
          ← Back to job details
        </button>

        <div className="jobapply-card">
          <span className="jobapply-demo-badge">DEMO PAGE</span>
          <h1 className="jobapply-heading">Apply to {job.title}</h1>
          <p className="jobapply-subtext">
            {job.company} · {job.location}
          </p>

          {!submitted ? (
            <form className="jobapply-form" onSubmit={handleSubmit}>
              <div className="jobapply-field-group">
                <label htmlFor="jobapply-name">Full Name</label>
                <input
                  id="jobapply-name"
                  type="text"
                  placeholder="Jane Doe"
                  required
                />
              </div>

              <div className="jobapply-field-group">
                <label htmlFor="jobapply-email">Email</label>
                <input
                  id="jobapply-email"
                  type="email"
                  placeholder="jane@example.com"
                  required
                />
              </div>

              <div className="jobapply-field-group">
                <label htmlFor="jobapply-resume">Resume (PDF)</label>
                <input
                  id="jobapply-resume"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                />
                {fileName && (
                  <span className="jobapply-file-confirm">
                    ✅ {fileName} selected
                  </span>
                )}
              </div>

              <div className="jobapply-field-group">
                <label htmlFor="jobapply-cover">Cover Letter (optional)</label>
                <textarea
                  id="jobapply-cover"
                  rows={5}
                  placeholder="Tell us why you're a great fit..."
                ></textarea>
              </div>

              <button type="submit" className="jobapply-btn-primary">
                Submit Application
              </button>

              <p className="jobapply-placeholder-note">
                This form doesn't send data anywhere yet — replace{" "}
                <code>handleSubmit</code> with your real submission logic.
              </p>
            </form>
          ) : (
            <div className="jobapply-success">
              <div className="jobapply-success-icon">✅</div>
              <h2 className="jobapply-heading">Application Submitted!</h2>
              <p className="jobapply-subtext">
                (Demo confirmation — no data was actually sent.)
              </p>
              <Link to="/" className="jobapply-btn-secondary">
                Back to Job Board
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApply;
