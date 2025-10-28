import React from 'react';
import './About.css';
import MongoDB from '../Assets/MongoDB.png';
import Express from '../Assets/Express.png';
import ReactLogo from '../Assets/React.png';
import NodeJS from '../Assets/Node.js.png';
import { Spa, Science, PeopleAlt, HealthAndSafety } from "@mui/icons-material";

const About = () => {
  return (
    <div className="about-wrapper">
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>About Swasthya Setu</h1>
          <p>Bridging Ancient Wisdom with Modern Wellness</p>
        </div>
      </div>

      <div className="about-container">
        <section className="about-mission">
          <div className="about-card">
            <h2>Our Mission</h2>
            <p>
              Swasthya Setu is an <strong>Indian Health, Wellness & Psychology Project</strong> dedicated to 
              promoting holistic well-being through the ancient science of Ayurveda. We believe in the power 
              of traditional Indian medicine combined with modern technology to create personalized wellness solutions.
            </p>
          </div>
        </section>

        <section className="about-project">
          <div className="about-card">
            <h2>🇮🇳 Indian Heritage Project</h2>
            <p>
              This project celebrates India's rich heritage of health and wellness practices. Rooted in 
              5000-year-old Ayurvedic principles, Swasthya Setu brings the wisdom of doshas, natural healing, 
              and mind-body balance to the digital age.
            </p>
            <div className="heritage-features">
              <div className="feature-item">
                <span className="feature-icon">🧘‍♀️</span>
                <h4>Ayurvedic Assessment</h4>
                <p>Discover your unique dosha constitution</p>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🌱</span>
                <h4>Natural Wellness</h4>
                <p>Holistic approach to health and healing</p>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🧠</span>
                <h4>Mind-Body Balance</h4>
                <p>Psychology meets ancient wisdom</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-creator">
          <div className="about-card creator-card">
            <div className="creator-content">
              <div className="creator-info">
                <h2>Created By:</h2>
                <h3>Jatin Bendale</h3>
                <p className="creator-title">Full Stack Developer & Wellness Enthusiast</p>
                <p>
                  Passionate about combining technology with traditional Indian wellness practices, 
                  Jatin has developed Swasthya Setu to make Ayurvedic wisdom accessible to everyone. 
                  With expertise in modern web technologies and a deep respect for ancient healing 
                  traditions, this project represents the perfect fusion of innovation and heritage.
                </p>
                <div className="creator-vision">
                  <h4>Vision</h4>
                  <p>
                    "To create a digital platform that honors India's ancient wellness traditions 
                    while providing practical, personalized health guidance for modern lifestyles."
                  </p>
                </div>
              </div>
              <div className="creator-avatar">
                <div className="avatar-circle">
                  <span>JB</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-technology">
          <div className="about-card">
            <h2>Technology Stack</h2>
            <p>Built with modern technologies to deliver a seamless user experience:</p>
            <div className="tech-grid">
              <div className="tech-item">
                <span className="tech-icon"><img src={ReactLogo} alt="React"  /></span>
                <span>React.js</span>
              </div>
              <div className="tech-item">
                <span className="tech-icon"><img src={NodeJS} alt="Node"  /></span>
                <span>Node.js</span>
              </div>
              <div className="tech-item">
                <span className="tech-icon"><img src={MongoDB} alt="MongoDB"  /></span>
                <span>MongoDB</span>
              </div>
              <div className="tech-item">
                <span className="tech-icon"><img src={Express} alt="Express"  /></span>
                <span>Express.js</span>
              </div>
            </div>
          </div>
        </section>

        <section className="about-values">
          <div className="about-card">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <div><Spa sx={{ fontSize: 60, color: "#4CAF50" }}/></div>
                <h4>Authenticity</h4>
                <p>Staying true to traditional Ayurvedic principles</p>
              </div>
              <div className="value-item">
                <div><Science sx={{ fontSize: 60, color: "#009688" }}/></div>
                <h4>Innovation</h4>
                <p>Using technology to enhance ancient wisdom</p>
              </div>
              <div className="value-item">
                <div><PeopleAlt sx={{ fontSize: 60, color: "#FFB300" }}/></div>
                <h4>Accessibility</h4>
                <p>Making wellness knowledge available to everyone</p>
              </div>
              <div className="value-item">
                <div><HealthAndSafety sx={{ fontSize: 60, color: "#8E24AA" }}/></div>
                <h4>Holistic Health</h4>
                <p>Addressing mind, body, and spirit together</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;