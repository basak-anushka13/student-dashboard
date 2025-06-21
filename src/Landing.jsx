import React from "react";
import { Link } from "react-router-dom";
import logo from "./assets/logo.png"; // ✅ Adjust path if needed
import cap from "./assets/cap.gif";

export default function Landing() {
  return (
    <div className="landing-container">
      {/* Falling cap gif */}
      <img src={cap} alt="Falling Cap" className="falling-cap" />
      {/* Logo */}
      <img src={logo} alt="BrightGrade Logo" className="logo" />
      <h1 className="title">BrightGrade</h1>
      <p className="tagline">Empowering Every Student’s Journey 🎓</p>

      {/* 🚀 CTA Button */}
      <Link to="/dashboard" className="btn">
        Get Started →
      </Link>
{/* Why Choose BrightGrade Section */}
<section className="why-section">
  <h2 className="why-title">Why Choose BrightGrade?</h2>
  <p className="why-subtext">Smart features that help you track academic performance with ease.</p>

  <div className="features-container">
    <div className="feature-box">
      <span role="img" aria-label="Fast Input" className="feature-icon">⚡</span>
      <h3 className="feature-title">Fast Input</h3>
      <p className="feature-desc">Quickly add and manage student records.</p>
    </div>
    <div className="feature-box">
      <span role="img" aria-label="Smart Insights" className="feature-icon">📊</span>
      <h3 className="feature-title">Smart Insights</h3>
      <p className="feature-desc">Analyze student data at a glance.</p>
    </div>
    <div className="feature-box">
      <span role="img" aria-label="Export Ready" className="feature-icon">📁</span>
      <h3 className="feature-title">Export Ready</h3>
      <p className="feature-desc">Download reports or backup data easily.</p>
    </div>
  </div>

  {/* Stats + CTA */}
  <div className="stats-section">
    <div className="stat"><strong>1K+</strong><br />Records Managed</div>
    <div className="stat"><strong>98%</strong><br />Accuracy</div>
    <div className="stat"><strong>4.9⭐</strong><br />User Rating</div>
    <div className="stat"><strong>24/7</strong><br />Support</div>
  </div>

  <h3 className="cta-heading">Ready to Simplify Student Tracking?</h3>
  <p className="cta-subtext">Join hundreds who use BrightGrade for smarter academic management.</p>
  </section>

      {/* 🔻 Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} BrightGrade. All rights reserved.</p>
        <div className="socials">
          <a href="https://www.linkedin.com/in/anushka-basak-39b2a525a" title="LinkedIn">💼</a>
          <a href="https://github.com/basak-anushka13" title="GitHub">💻</a>
        </div>
      </footer>
    </div>
  );
}
