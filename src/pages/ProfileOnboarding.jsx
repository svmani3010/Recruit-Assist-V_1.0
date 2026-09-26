import React, { useState, useRef } from "react";
import "./ProfileOnboarding.css";

const ProfileOnboarding = () => {
  const [profileUploadedFile, profileSetUploadedFile] = useState(null);
  const profileFileInputRef = useRef(null);

  const profileHandleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const profileHandleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      profileProcessFile(e.dataTransfer.files[0]);
    }
  };

  const profileHandleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      profileProcessFile(e.target.files[0]);
    }
  };

  const profileProcessFile = (file) => {
    // Basic validation could go here
    profileSetUploadedFile({
      name: file.name,
      size: (file.size / 1024).toFixed(0) + " KB",
    });
  };

  const profileTriggerFileInput = () => {
    profileFileInputRef.current.click();
  };

  return (
    <div className="profile-onboarding-wrapper">
      <div className="profile-onboarding-brand">
        <div className="profile-onboarding-logo-icon">
          <svg
            width="14"
            height="18"
            viewBox="0 0 14 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13 8L6 18V10H1L8 0V8H13Z" fill="white" />
          </svg>
        </div>
        <span className="profile-onboarding-brand-name">Recruit Assist</span>
      </div>

      <div className="profile-onboarding-titles">
        <h1 className="profile-onboarding-main-title">Let's get you started</h1>
        <p className="profile-onboarding-subtitle">
          Upload your resume and fill in the basics.
        </p>
      </div>

      <div className="profile-onboarding-card">
        <div className="profile-onboarding-card-header">
          <svg
            className="profile-onboarding-header-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span className="profile-onboarding-header-text">
            Basic Information
          </span>
        </div>

        <form className="profile-onboarding-form">
          <div className="profile-onboarding-input-group">
            <label className="profile-onboarding-label">FULL NAME</label>
            <div className="profile-onboarding-input-wrapper">
              {profileUploadedFile && (
                <svg
                  className="profile-onboarding-input-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              )}
              <input
                type="text"
                className={`profile-onboarding-input ${profileUploadedFile ? "profile-has-icon" : ""}`}
                placeholder="Your Name"
              />
            </div>
          </div>

          <div className="profile-onboarding-input-group">
            <label className="profile-onboarding-label">EMAIL</label>
            <div className="profile-onboarding-input-wrapper">
              {profileUploadedFile && (
                <svg
                  className="profile-onboarding-input-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              )}
              <input
                type="email"
                className={`profile-onboarding-input ${profileUploadedFile ? "profile-has-icon" : ""}`}
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="profile-onboarding-input-group">
            <label className="profile-onboarding-label">PHONE</label>
            <div className="profile-onboarding-input-wrapper">
              {profileUploadedFile && (
                <svg
                  className="profile-onboarding-input-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              )}
              <input
                type="tel"
                className={`profile-onboarding-input ${profileUploadedFile ? "profile-has-icon" : ""}`}
                placeholder="+91 9876543210"
              />
            </div>
          </div>

          <div className="profile-onboarding-input-group">
            <label className="profile-onboarding-label">LOCATION</label>
            <div className="profile-onboarding-input-wrapper">
              {profileUploadedFile && (
                <svg
                  className="profile-onboarding-input-icon"
                  width="16"
                  height="16"
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
              )}
              <input
                type="text"
                className={`profile-onboarding-input ${profileUploadedFile ? "profile-has-icon" : ""}`}
                placeholder="City, State"
              />
            </div>
          </div>
        </form>

        <div className="profile-onboarding-resume-section">
          <label className="profile-onboarding-label">RESUME</label>
          <div
            className="profile-onboarding-dropzone"
            onDragOver={profileHandleDragOver}
            onDrop={profileHandleDrop}
            onClick={profileTriggerFileInput}
          >
            <input
              type="file"
              ref={profileFileInputRef}
              onChange={profileHandleFileChange}
              style={{ display: "none" }}
              accept=".pdf,.doc,.docx"
            />

            {!profileUploadedFile ? (
              <div className="profile-onboarding-upload-prompt">
                <div className="profile-onboarding-upload-icon-wrapper">
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <p className="profile-onboarding-drop-text">
                  Drop your resume here
                </p>
                <p className="profile-onboarding-drop-hint">
                  PDF, DOC, or DOCX · up to 10 MB
                </p>
              </div>
            ) : (
              <div className="profile-onboarding-file-success">
                <div className="profile-onboarding-success-icon-wrapper">
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
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <p className="profile-onboarding-file-name">
                  {profileUploadedFile.name}
                </p>
                <p className="profile-onboarding-file-details">
                  {profileUploadedFile.size} · Click to replace
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        className={`profile-onboarding-submit-btn ${profileUploadedFile ? "profile-btn-active" : "profile-btn-disabled"}`}
      >
        Continue
      </button>
    </div>
  );
};

export default ProfileOnboarding;
