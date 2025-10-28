import React from "react";
import "./Home.css";
import dailyasses from "../Assets/daily-asses.svg";
import progress from "../Assets/progress.svg";
import prsnl from "../Assets/prsnl.svg";
import flower from "../Assets/flower.png";
import heart from "../Assets/heart.png";
import sun from "../Assets/sun.png";
import ayurvedaImg from "../Assets/ayurvedaImg.png";
import yogaImg from "../Assets/yogaImg.png";
import doshaImg from "../Assets/doshaImg.png";

const features = [
  {
    title: "Dosha Assessment",
    description: "Discover your unique Ayurvedic constitution through our comprehensive Prakruti test.",
    icon: "🌿",
  },
  {
    title: "Daily Regimen",
    description: "Personalized Dinacharya planning with tracking for optimal mind-body harmony.",
    icon: "🌞",
  },
  {
    title: "Seasonal Wellness",
    description: "Ritucharya guidance and seasonal diet recommendations based on your constitution.",
    icon: "💧",
  },
  {
    title: "Yoga Practice",
    description: "Guided yoga tutorials covering Raja, Karma, Bhakti, and Hatha yoga traditions.",
    icon: "🧘",
  },
  {
    title: "Mind Wellness",
    description: "Indian psychology insights with Triguna analysis and mood tracking.",
    icon: "🧠",
  },
  {
    title: "Progress Tracking",
    description: "Monitor your wellness journey with detailed analytics and personalized insights.",
    icon: "📈",
  },
];

const journeySteps = [
  {
    icon: (
      // Simple grid icon (you can replace with SVG or image)
      <img src={dailyasses} alt="Daily Assessment" className="wj-icon" />
    ),
    title: "Assessment",
    subtitle: "Discover your Dosha type"
  },
  {
    icon: (
      // Lotus-like icon (replace with SVG if needed)
      <img src={prsnl} alt="Personalization" className="wj-icon" />
    ),
    title: "Personalization",
    subtitle: "Customize your wellness plan"
  },
  {
    icon: (
      // Another grid icon (as in your image)
      <img src={dailyasses} alt="Daily Practice" className="wj-icon" />
    ),
    title: "Daily Practice",
    subtitle: "Follow your regimen"
  },
  {
    icon: (
      // Shield icon
      <img src={progress} alt="Progress" className="wj-icon" />
    ),
    title: "Progress",
    subtitle: "Track your growth"
  }
];

const Choosefeatures = [
  "Personalized Ayurvedic constitution analysis",
  "Daily and seasonal wellness planning",
  "Comprehensive yoga practice guidance",
  "Mind-body harmony tracking",
  "Evidence-based traditional wisdom",
  "Modern technology meets ancient knowledge"
];

const doshas = [
  {
    name: "Vata",
    subtitle: "Air & Space",
    icon: flower, 
    colorClass: "dosha-vata"
  },
  {
    name: "Pitta",
    subtitle: "Fire & Water",
    icon: sun, 
    colorClass: "dosha-pitta"
  },
  {
    name: "Kapha",
    subtitle: "Earth & Water",
    icon: heart, 
    colorClass: "dosha-kapha"
  }
];

const resources = [
  {
    type: "Ayurveda",
    title: "Introduction to Ayurveda",
    img: ayurvedaImg,
    link: "#",
  },
  {
    type: "Yoga",
    title: "Yoga for Beginners",
    img: yogaImg,
    link: "#",
  },
  {
    type: "Ayurveda",
    title: "Understanding Doshas",
    img: doshaImg,
    link: "#",
  }
];

const testimonials = [
  {
    quote:
      "Swasthya Setu has transformed how I understand my constitution and plan my daily routine.",
    name: "Priya Sharma",
    role: "Yoga Instructor",
  },
  {
    quote:
      "An excellent tool that combines traditional Ayurvedic wisdom with modern tracking capabilities.",
    name: "Dr. Rajesh Kumar",
    role: "Ayurvedic Practitioner",
  },
  {
    quote:
      "The seasonal recommendations have helped me stay balanced throughout the year.",
    name: "Anita Patel",
    role: "Wellness Enthusiast",
  },
];

const Home = () => {
  return (
    <>
    <section className="home-container">
      {/* Tagline */}
      <div className="home-tagline">
        <span role="img" aria-label="wisdom" className="home-tagline-emoji">
          🧠
        </span>
        Ancient Wisdom • Modern Technology
      </div>

      {/* Titles */}
      <h1 className="home-title">
        <span className="home-title-green">Swasthya </span>
        <span className="home-title-yellow">Setu</span>
      </h1>
      <h2 className="home-bridge">Your Bridge to</h2>
      <h3 className="home-wellness">Holistic Wellness</h3>

      {/* Description */}
      <p className="home-desc">
        Discover your unique constitution through Ayurveda, practice authentic yoga, and achieve mind-body harmony with personalized wellness tracking.
      </p>

      {/* Buttons */}
      <div className="home-buttons">
        <button className="home-btn-primary" onClick={() => window.location.href = '/features'}>Start Your Journey</button>
        <button className="home-btn-secondary" onClick={() => window.location.href = '/features'}>Learn About Ayurveda</button>
      </div>
    </section>

    <section className="wellness-section">
      {/* Heading */}
      <h2 className="wellness-title">Comprehensive Wellness Platform</h2>
      {/* Subheading */}
      <p className="wellness-subtitle">
        Explore the depths of Ayurveda, Yoga, and Indian Psychology with our integrated approach to holistic health.
      </p>

      {/* Features Cards */}
      <div className="wellness-grid-home">
        {features.map((feature, i) => (
          <div className="wellness-card-home" key={i}>
            <span className="wellness-icon-home">{feature.icon}</span>
            <div className="wellness-card-title">{feature.title}</div>
            <div className="wellness-card-desc">{feature.description}</div>
          </div>
        ))}
      </div>
    </section>

    <section className="wj-section">
    <h2 className="wj-heading">Your Wellness Journey</h2>
    <div className="wj-steps">
      {journeySteps.map((step, idx) => (
        <div className="wj-step" key={idx}>
          <div className="wj-circle">{step.icon}</div>
          <div className="wj-step-title">{step.title}</div>
          <div className="wj-step-sub">{step.subtitle}</div>
        </div>
      ))}
    </div>
  </section>

  <section className="whychoose-wrap">
    {/* Left panel */}
    <div className="whychoose-left">
      <h2 className="whychoose-title">Why Choose Swasthya Setu?</h2>
      <p className="whychoose-desc">
        Combining 5,000 years of <span className="highlight">Ayurvedic wisdom</span> with modern technology to create a personalized wellness experience that adapts to your unique constitution and lifestyle.
      </p>
      <ul className="whychoose-list">
        {Choosefeatures.map((item, idx) => (
          <li key={idx}>
            <span className="whychoose-check">&#10003;</span>
            {item}
          </li>
        ))}
      </ul>
      <button className="whychoose-btn" onClick={() => window.location.href = '/dosha-assessment'}>Begin Assessment</button>
    </div>

    {/* Right panel */}
    <div className="whychoose-right">
      <div className="doshas-box">
        <div className="dosha-head">The Three Doshas</div>
        <div className="dosha-desc">Understand your unique constitution</div>
        <div className="doshas-cards">
          {doshas.map(dosha => (
  <div className={`home-dosha-card ${dosha.colorClass}`} key={dosha.name}>
    <span className={`dosha-circle ${dosha.colorClass}` } ><img src={dosha.icon} alt={dosha.name} className="home-dosha-icon" /></span>
    <div className="dosha-text">
      <span className="dosha-title">{dosha.name}</span>
      <span className="dosha-subtitle">{dosha.subtitle}</span>
    </div>
  </div>
))}
        </div>
      </div>
    </div>
  </section>

<section className="kr-section">
    <h2 className="kr-heading">Knowledge Resources</h2>
    <div className="kr-cards">
      {resources.map((res, idx) => (
        <div className="kr-card" key={idx}>
          <div className="kr-card-imgwrap">
            {typeof res.img === "string" ? (
              <img src={res.img} alt={res.title} className="kr-card-img" />
            ) : (
              res.img
            )}
          </div>
          <div className="kr-card-info">
            <div className="kr-card-type">{res.type}</div>
            <div className="kr-card-title">{res.title}</div>
            <a className="kr-card-link" href={res.link}>Read More &rarr;</a>
          </div>
        </div>
      ))}
    </div>
  </section>


<section className="tm-section">
    <h2 className="tm-heading">Trusted by Wellness Enthusiasts</h2>
    <div className="tm-subheading">
      Join thousands who have transformed their wellness journey with Swasthya Setu.
    </div>
    <div className="tm-cards">
      {testimonials.map((test, idx) => (
        <div className="tm-card" key={idx}>
          <div className="tm-stars">
            {Array(5)
              .fill()
              .map((_, i) => (
                <span className="tm-star" key={i}>
                  ★
                </span>
              ))}
          </div>
          <div className="tm-quote">"{test.quote}"</div>
          <div className="tm-name">{test.name}</div>
          <div className="tm-role">{test.role}</div>
        </div>
      ))}
    </div>
  </section>

  <section className="todo-section">
    <h2 className="todo-heading">Todo Manager - Your Wellness Companion</h2>
    <p className="todo-subtitle">
      Organize your wellness journey with comprehensive task and health tracking designed for holistic well-being.
    </p>
    <div className="todo-features-grid">
      <div className="todo-feature-card">
        <span className="todo-feature-icon">✅</span>
        <div className="todo-feature-title">Task Management</div>
        <div className="todo-feature-desc">Create and organize wellness tasks with priority levels and categories</div>
      </div>
      <div className="todo-feature-card">
        <span className="todo-feature-icon">💧</span>
        <div className="todo-feature-title">Health Tracking</div>
        <div className="todo-feature-desc">Monitor water intake, exercise, sleep, and daily mood patterns</div>
      </div>
      <div className="todo-feature-card">
        <span className="todo-feature-icon">📊</span>
        <div className="todo-feature-title">Smart Reports</div>
        <div className="todo-feature-desc">Get personalized insights and wellness suggestions</div>
      </div>
    </div>
    <button className="todo-cta-btn" onClick={() => window.location.href = '/todo-manager'}>Explore Todo Manager</button>
  </section>

  <section className="cta-section">
    <div className="cta-content">
      <h2 className="cta-title">Ready to Begin Your Wellness Journey?</h2>
      <p className="cta-desc">
        Take the first step towards understanding your unique constitution and creating a personalized wellness routine that works for you.
      </p>
      <div className="cta-buttons">
        <button className="cta-btn-primary" onClick={() => window.location.href = '/dosha-assessment'}>Start Free Assessment</button>
        <button className="cta-btn-secondary" onClick={() => window.location.href = '/resources'}>Explore Resources</button>
      </div>
      <div className="cta-features-row">
        <div className="cta-feature">
          <span className="cta-feature-icon">👤</span>
          <span className="cta-feature-text">10,000+ Users</span>
        </div>
        <span className="cta-dot" />
        <div className="cta-feature">
          <span className="cta-feature-icon">⭐</span>
          <span className="cta-feature-text">4.9/5 Rating</span>
        </div>
        <span className="cta-dot" />
        <div className="cta-feature">
          <span className="cta-feature-icon">✅</span>
          <span className="cta-feature-text">Free to Start</span>
        </div>
      </div>
    </div>
  </section>

    </>
  );
};

export default Home;
