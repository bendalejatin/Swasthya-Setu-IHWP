import React from "react";
import "./Footer.css";
import logo from "../Assets/Logo.svg";

const Footer = () => (
  <footer className="footer-root">
    <div className="footer-content">
      <div className="footer-brand">
        <div className="footer-logo-row">
          <span className="footer-logo">
            <img src={logo} alt="logo" className="footer-logo-img" />
          </span>
          <span className="footer-brandname">Swasthya Setu</span>
        </div>
        <p className="footer-tagline">
          Your bridge to holistic wellness through
          <br />
          ancient Indian wisdom and modern practices.
        </p>
      </div>
      <div className="footer-columns">
        <div className="footer-col">
          <div className="footer-col-header">Features</div>
          <ul>
            <li>
              <a href="/dosha-assessment">Dosha Analysis</a>
            </li>
            <li>
              <a href="/todo-manager">Daily Routine</a>
            </li>
            <li>
              <a href="/resources">Yoga Practice</a>
            </li>
            <li>
              <a href="/todo-manager">ToDo Manager</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <div className="footer-col-header">Resources</div>
          <ul>
            <li>
              <a href="/resources">Articles</a>
            </li>
            <li>
              <a href="/resources">Videos</a>
            </li>
            <li>
              <a href="/resources">Mental Wellness</a>
            </li>
            <li>
              <a href="/resources">Research</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      © 2025 Swasthya Setu. All rights reserved.
    </div>
  </footer>
);

export default Footer;
