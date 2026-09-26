import React from "react";
import "./HiringPartners.css";

// Assuming your images are placed in: public/logos/
const companies = [
  { name: "Harman", logo: "/logos/Harman.png" },
  { name: "Reliance Nippon", logo: "/logos/Reliance.png" },
  { name: "Tata Elxsi", logo: "/logos/Tata.png" },
  { name: "Aditya Birla", logo: "/logos/Aditya.png" },
  { name: "Bharti Axa", logo: "/logos/Bharti.png" },
  { name: "EY", logo: "/logos/EY.png" },
  { name: "Aaxis", logo: "/logos/Aaxis.png" },
  { name: "LTIMindtree", logo: "/logos/LT.png" },
  { name: "Shriram Insurance", logo: "/logos/Shriram.png" },
  { name: "Movate", logo: "/logos/Movate.png" },
  { name: "Magicbricks", logo: "/logos/Magicbricks.png" },
  { name: "Wockhardt", logo: "/logos/Wockhardt.png" },
  { name: "Cybertrack", logo: "/logos/Cybertrack.png" },
  { name: "Piramal Swasthya", logo: "/logos/Piramal.png" },
  { name: "Sodexo", logo: "/logos/Sodexo.png" },
];

const HiringPartners = () => {
  return (
    <section className="partners-section">
      <div className="partners-container fade-in">
        <h2 className="partners-title">
          Top <span className="highlight-text">Hiring</span> Companies
        </h2>

        <p className="partners-subtitle">
          Search all the open positions on the web. Get your own personalized
          salary estimate.
        </p>

        <div className="logo-grid">
          {companies.map((company, index) => (
            <div
              className="logo-card card-animate"
              key={index}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <img src={company.logo} alt={company.name} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HiringPartners;
