import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Ensure Link is imported
import "./LoginPage.css";

const LOGIN_TESTIMONIALS = [
  {
    quote: "Arcus cut our planning cycles by 40%. It just works.",
    name: "Sarah Chen",
    role: "Product Lead · Volta Labs",
  },
  {
    quote: "The cleanest tool we've adopted in three years.",
    name: "Marcus Webb",
    role: "CTO · Folio",
  },
];

const SIGNUP_FEATURES = [
  {
    title: "Unified pipeline",
    body: "Every candidate, every stage, one view.",
  },
  {
    title: "Faster reviews",
    body: "Cut time-to-decision without cutting corners.",
  },
  {
    title: "Team-ready",
    body: "Bring recruiters and hiring managers into one loop.",
  },
  {
    title: "No setup tax",
    body: "Import your roles and start screening today.",
  },
];

const LoginPage = ({ initialMode = "login" }) => {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const isLogin = mode === "login";

  return (
    <div className="login-wrapper">
      {/* ---------------- LEFT PANEL ---------------- */}
      <aside className="login-side" aria-hidden="true">
        <div className="login-side-content">
          {isLogin ? (
            <>
              <h2 className="login-side-heading">
                Good to have
                <br />
                you back.
              </h2>
              <p className="login-side-subtext">
                Your team is waiting. Sign in to pick up where you left off.
              </p>

              <div className="login-testimonials">
                {LOGIN_TESTIMONIALS.map((t) => (
                  <div className="login-testimonial-card" key={t.name}>
                    <p className="login-testimonial-quote">
                      &quot;{t.quote}&quot;
                    </p>
                    <p className="login-testimonial-name">{t.name}</p>
                    <p className="login-testimonial-role">{t.role}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="login-side-heading">
                Build something
                <br />
                remarkable.
              </h2>
              <p className="login-side-subtext">
                Join 4,200+ teams who ship faster, collaborate better, and
                stress less.
              </p>

              <ul className="login-feature-list">
                {SIGNUP_FEATURES.map((f) => (
                  <li className="login-feature-item" key={f.title}>
                    <span className="login-feature-title">{f.title}</span>
                    <span className="login-feature-body">{f.body}</span>
                  </li>
                ))}
              </ul>

              <p className="login-side-footnote">
                Free forever up to 10 seats. No credit card needed.
              </p>
            </>
          )}
        </div>
      </aside>

      {/* ---------------- RIGHT PANEL ---------------- */}
      <main className="login-form-side">
        <div className="login-form-shell">
          <Link to="/" className="login-back-link">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Back to home
          </Link>

          {isLogin ? (
            <>
              <div className="login-heading-row">
                <h1 className="login-heading">Welcome back</h1>
                <p className="login-subheading">
                  No account? {/* CHANGED THIS TO A LINK */}
                  <Link to="/register" className="login-switch-link">
                    Sign up free
                  </Link>
                </p>
              </div>

              <div className="login-oauth-group">
                <button type="button" className="login-oauth-btn">
                  <GoogleIcon />
                  Continue with Google
                </button>
                <button type="button" className="login-oauth-btn">
                  <LinkedInIcon />
                  Continue with LinkedIn
                </button>
              </div>

              <div className="login-divider">
                <span>or with email</span>
              </div>

              <button type="button" className="login-oauth-btn">
                <EmailIcon />
                Continue with Email
              </button>

              <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                <label className="login-field">
                  <span className="login-field-label">Email address</span>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                </label>

                <label className="login-field">
                  <span className="login-field-label-row">
                    <span className="login-field-label">Password</span>
                    <a href="/forgot-password" className="login-forgot">
                      Forgot password?
                    </a>
                  </span>
                  <span className="login-password-wrap">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="login-password-toggle"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      <EyeIcon crossed={showPassword} />
                    </button>
                  </span>
                </label>

                <label className="login-checkbox-row">
                  <input type="checkbox" />
                  <span>Keep me signed in</span>
                </label>

                <button type="submit" className="login-submit-btn">
                  Sign in
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="login-heading-row">
                <h1 className="login-heading">Create your account</h1>
                <p className="login-subheading">
                  Already have one? {/* CHANGED THIS TO A LINK */}
                  <Link to="/login" className="login-switch-link">
                    Sign in
                  </Link>
                </p>
              </div>

              <div className="login-oauth-group">
                <button type="button" className="login-oauth-btn">
                  <GoogleIcon />
                  Sign up with Google
                </button>
                <button type="button" className="login-oauth-btn">
                  <LinkedInIcon />
                  Sign up with LinkedIn
                </button>
              </div>

              <div className="login-divider">
                <span>or</span>
              </div>

              <button type="button" className="login-oauth-btn">
                <EmailIcon />
                Sign up with Email
              </button>

              <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                <label className="login-field">
                  <span className="login-field-label">Full name</span>
                  <input
                    type="text"
                    placeholder="Alex Morgan"
                    autoComplete="name"
                  />
                </label>

                <label className="login-field">
                  <span className="login-field-label">Email</span>
                  <input
                    type="email"
                    placeholder="alex@company.com"
                    autoComplete="email"
                  />
                </label>

                <label className="login-field">
                  <span className="login-field-label">Password</span>
                  <span className="login-password-wrap">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="login-password-toggle"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      <EyeIcon crossed={showPassword} />
                    </button>
                  </span>
                </label>

                <button type="submit" className="login-submit-btn">
                  Create account
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </form>

              <p className="login-security-note">
                By signing up you agree to our <a href="/terms">Terms</a> and{" "}
                <a href="/privacy">Privacy Policy</a>
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

/* ---------------- Small inline icon components ---------------- */

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="login-brand-icon">
    <path
      fill="#4285F4"
      d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.47a5.54 5.54 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A12 12 0 0 0 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28V6.61H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.39l4-3.11z"
    />
    <path
      fill="#EA4335"
      d="M12 4.76c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.61l4 3.11C6.22 6.87 8.87 4.76 12 4.76z"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="#0A66C2" className="login-brand-icon">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
  </svg>
);

const EmailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="#EA4335"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="login-brand-icon"
  >
    <path d="M4 4h16v16H4z" opacity="0"></path>
    <path d="M3 6.5 12 13l9-6.5"></path>
    <path d="M3 6.5V18a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V6.5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1z"></path>
  </svg>
);

const EyeIcon = ({ crossed }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"></path>
    <circle cx="12" cy="12" r="3"></circle>
    {crossed && <line x1="2" y1="22" x2="22" y2="2"></line>}
  </svg>
);

export default LoginPage;
