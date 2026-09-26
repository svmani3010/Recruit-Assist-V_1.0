import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // <-- Imported Link for internal routing
import "./Footer.css";

const ROWS = 40;
const COLS = 70;

const colors = [
  "rgb(125 211 252)", // sky-300
  "rgb(249 168 212)", // pink-300
  "rgb(134 239 172)", // green-300
  "rgb(253 224 71)", // yellow-300
  "rgb(252 165 165)", // red-300
  "rgb(216 180 254)", // purple-300
  "rgb(147 197 253)", // blue-300
  "rgb(165 180 252)", // indigo-300
  "rgb(196 181 253)", // violet-300
];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

const plusIconSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
  </svg>
`;

function AnimatedBackground({ protectedRef }) {
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const grid = gridRef.current;
    if (!container || !grid) return;

    const MAX_TAIL = 4;
    const SETTLE_DELAY = 150;
    const trail = [];
    let settleTimer = null;
    let lastCell = null;
    let protectedRects = [];

    function recomputeProtectedRects() {
      const nodes = protectedRef.current
        ? protectedRef.current.querySelectorAll(
            ".footer-col, .footer-brand, .footer-bottom",
          )
        : [];
      protectedRects = Array.from(nodes).map((el) =>
        el.getBoundingClientRect(),
      );
    }

    function isInProtectedZone(x, y) {
      return protectedRects.some(
        (r) => x >= r.left && x <= r.right && y >= r.top && y <= r.bottom,
      );
    }

    function clearCell(cell) {
      cell.style.transition = "background-color 0.5s ease-out";
      cell.style.backgroundColor = "transparent";
    }

    function clearTrail() {
      while (trail.length > 0) {
        const cell = trail.shift();
        clearCell(cell);
      }
      lastCell = null;
    }

    function activateCell(cell) {
      if (cell === lastCell) return;
      lastCell = cell;

      const existingIndex = trail.indexOf(cell);
      if (existingIndex !== -1) {
        trail.splice(existingIndex, 1);
      }

      cell.style.transition = "background-color 0s";
      cell.style.backgroundColor = getRandomColor();
      trail.push(cell);

      if (trail.length > MAX_TAIL) {
        const oldest = trail.shift();
        clearCell(oldest);
      }

      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        while (trail.length > 1) {
          const oldest = trail.shift();
          clearCell(oldest);
        }
      }, SETTLE_DELAY);
    }

    function handleMouseMove(e) {
      if (isInProtectedZone(e.clientX, e.clientY)) {
        clearTimeout(settleTimer);
        clearTrail();
        return;
      }

      const topElement = document.elementFromPoint(e.clientX, e.clientY);

      if (topElement && topElement.classList.contains("box-cell")) {
        activateCell(topElement);
      } else {
        clearTimeout(settleTimer);
        clearTrail();
      }
    }

    function handleMouseLeave() {
      clearTimeout(settleTimer);
      clearTrail();
    }

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < ROWS; i++) {
      const row = document.createElement("div");
      row.className = "box-row";

      for (let j = 0; j < COLS; j++) {
        const cell = document.createElement("div");
        cell.className = "box-cell";

        if (j % 2 === 0 && i % 2 === 0) {
          cell.innerHTML = plusIconSVG;
        }

        row.appendChild(cell);
      }

      fragment.appendChild(row);
    }

    grid.appendChild(fragment);

    recomputeProtectedRects();
    window.addEventListener("resize", recomputeProtectedRects);
    window.addEventListener("scroll", recomputeProtectedRects, true);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(settleTimer);
      window.removeEventListener("resize", recomputeProtectedRects);
      window.removeEventListener("scroll", recomputeProtectedRects, true);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      grid.innerHTML = "";
    };
  }, [protectedRef]);

  return (
    <div className="boxes-container" ref={containerRef}>
      <div className="boxes-mask" />
      <div className="boxes-grid" ref={gridRef} />
    </div>
  );
}

export default function Footer() {
  const contentRef = useRef(null);

  return (
    <footer className="site-footer">
      <AnimatedBackground protectedRef={contentRef} />

      <div className="footer-content" ref={contentRef}>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand-row">
              <span className="brand-icon">⚡</span>
              <span className="brand-name">Recruit Assist</span>
            </div>
            <p className="brand-desc">
              The world's first AI-native job portal, connecting top talent with
              industry-leading companies through intelligent matching.
            </p>
            <div className="social-row">
              <a href="#" className="social-icon" aria-label="Facebook">
                f
              </a>
              <a href="#" className="social-icon" aria-label="Help">
                ?
              </a>
              <a href="#" className="social-icon" aria-label="LinkedIn">
                in
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Important Links</h4>
            <Link to="/">Employer Home</Link>
            {/* Routed to the About Us page */}
            <Link to="/about">About Us</Link>

            {/* The mailto link pre-fills the "To" address in the user's default email client */}
            <a href="mailto:support@recruitassist.com?subject=Inquiry%20from%20Website">
              Contact Us
            </a>
          </div>

          <div className="footer-col">
            <h4>Job Seekers</h4>
            {/* Routed to MarketPlace.jsx component via the /search path */}
            <Link to="/search">Job Search</Link>
          </div>

          <div className="footer-col">
            <h4>Employers</h4>
            <Link to="/post-job">Post a Job</Link>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <span>© 2026 Recruit Assist Portal. All Rights Reserved.</span>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookie-policy">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
