import React from "react";
import "./Profile.css";

// --- JSON DATA SECTION ---
const PROFILE_DATA = {
  appUser: {
    name: "EricJoe",
    email: "EricJoe@gmail.com",
    avatarUrl: "https://i.pravatar.cc/150?u=eric",
  },
  candidate: {
    initials: "RJ",
    firstName: "Rahul",
    lastName: "John",
    role: "Web Designer",
    badge: "P",
    personalInfo: [
      {
        id: "email",
        label: "Email Address",
        value: "Rahul@mail.com",
        iconColor: "#e6f0ff",
        iconFill: "#4a86e8",
        type: "email",
      },
      {
        id: "city",
        label: "City",
        value: "New Delhi",
        iconColor: "#fff5e6",
        iconFill: "#f6b26b",
        type: "city",
      },
      {
        id: "street",
        label: "Street Address",
        value: "Dwarika Sec 2",
        iconColor: "#fce8ec",
        iconFill: "#e06666",
        type: "street",
      },
      {
        id: "phone",
        label: "Phone Number",
        value: "+91 847894458",
        iconColor: "#e0f7fa",
        iconFill: "#26a69a",
        type: "phone",
      },
      {
        id: "country",
        label: "Country",
        value: "India",
        iconColor: "#e8f5e9",
        iconFill: "#66bb6a",
        type: "country",
      },
    ],
    resume: {
      fileName: "UXdesginer.pdf",
    },
  },
};
// -------------------------

// Renamed to ProfileIcon to avoid any global component naming conflicts
const ProfileIcon = ({ type, fill }) => {
  const svgs = {
    email: (
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 4v10h16V8l-8 5-8-5zm8 3l8-5H4l8 5z" />
    ),
    city: (
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    ),
    street: (
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    ),
    phone: (
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    ),
    country: (
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" />
    ),
    document: (
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
    ),
    view: (
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    ),
    replace: (
      <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z" />
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill || "currentColor"}
      height="1em"
      width="1em"
    >
      {svgs[type]}
    </svg>
  );
};

const Profile = () => {
  const { appUser, candidate } = PROFILE_DATA;

  return (
    <div className="profile-container">
      {/* Navbar section */}
      <nav className="profile-navbar">
        <div className="profile-nav-logo">
          <div className="profile-bolt-icon">
            <svg viewBox="0 0 24 24" fill="white" height="16px" width="16px">
              <path d="M7 2v11h3v9l7-12h-4l4-8z" />
            </svg>
          </div>
          <span className="profile-logo-text">Recruit Assist</span>
        </div>
        <div className="profile-nav-user">
          <img
            src={appUser.avatarUrl}
            alt="User Avatar"
            className="profile-nav-avatar"
          />
          <div className="profile-nav-user-info">
            <span className="profile-nav-user-name">{appUser.name}</span>
            <span className="profile-nav-user-email">{appUser.email}</span>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="profile-main-content">
        <div className="profile-hero-banner">
          <div className="profile-circle profile-circle-1"></div>
          <div className="profile-circle profile-circle-2"></div>
        </div>

        <div className="profile-section">
          {/* Avatar and Title overlay */}
          <div className="profile-header">
            <div className="profile-avatar-wrapper">
              <div className="profile-main-avatar">{candidate.initials}</div>
              <div className="profile-status-badge">{candidate.badge}</div>
            </div>
            <div className="profile-titles">
              <h1>
                {candidate.firstName} {candidate.lastName}
              </h1>
              <h2>{candidate.role}</h2>
            </div>
          </div>

          {/* Details Grid */}
          <div className="profile-personal-info-container">
            <h3 className="profile-section-title">PERSONAL INFORMATION</h3>

            <div className="profile-info-grid">
              {candidate.personalInfo.map((info) => (
                <div className="profile-info-card" key={info.id}>
                  <div
                    className="profile-icon-wrapper"
                    style={{ backgroundColor: info.iconColor }}
                  >
                    <ProfileIcon type={info.type} fill={info.iconFill} />
                  </div>
                  <div className="profile-info-text">
                    <span className="profile-info-label">{info.label}</span>
                    <span className="profile-info-value">{info.value}</span>
                  </div>
                </div>
              ))}

              {/* Hardcoded special Resume Card */}
              <div className="profile-info-card profile-resume-card">
                <div className="profile-resume-left">
                  <div className="profile-icon-wrapper profile-resume-icon">
                    <ProfileIcon type="document" fill="#2e5bdf" />
                  </div>
                  <div className="profile-info-text">
                    <span className="profile-info-label profile-text-white">
                      Resume
                    </span>
                    <span className="profile-info-value profile-text-white">
                      {candidate.resume.fileName}
                    </span>
                  </div>
                </div>
                <div className="profile-resume-actions">
                  <button className="profile-action-btn">
                    <ProfileIcon type="view" fill="#ffffff" /> View
                  </button>
                  <button className="profile-action-btn profile-outline">
                    <ProfileIcon type="replace" fill="#ffffff" /> Replace
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
