import React, {useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import './Features.css'; 
import fire from '../Assets/Fire.png';
import wind from '../Assets/Wind.png'; 
import water from '../Assets/Waterdrop.png';
import ayurvedaImg from '../Assets/ayurvedaImg.png';

function Features() {
    const navigate = useNavigate();
    const ayurvedaRef = useRef(null);

  return (
    <>
    <div className="ayurveda-container">
      <div className="badge">Ancient Wisdom</div>
      <h1 className="title">Ayurveda Module</h1>
      <p className="subtitle">
        Discover the profound science of life through Ayurvedic principles, constitution analysis, and mind-body harmony
      </p>
      <div className="button-row">
        <button className="primary-btn" onClick={() => navigate('/dosha-assessment')}>
          Take Dosha Assessment
          <span className="primary-btn-icon" role="img" aria-label="assessment">⚙️</span>
        </button>
        <button
  className="secondary-btn"
  onClick={() => ayurvedaRef.current?.scrollIntoView({ behavior: "smooth" })}
>
  Learn about Ayurveda
  <span className="secondary-btn-icon" role="img" aria-label="quiz">⚡</span>
</button>

      </div>
    </div>

    <div className="ayurveda-overview-grid" ref={ayurvedaRef}>
      {/* What is Ayurveda - Two Column Layout */}
      <div className="ayurveda-box ayurveda-two-column">
        <div className="ayurveda-left">
          <div className="ayurveda-heading">
            <span className="heading-icon" role="img" aria-label="book">📗</span>
            <span className="heading-text">What is Ayurveda?</span>
          </div>
          <div className="ayurveda-description">
            Ayurveda, the "science of life," is a 5,000-year-old system of natural healing that originated in India. It views each person as unique and emphasizes prevention and treatment through lifestyle practices.
          </div>
          <div className="core-principles-title">Core Principles:</div>
          <ul className="core-principles-list">
            <li>
              <span className="point-icon" role="img" aria-label="leaf">🍃</span>
              Mind, body, and spirit are interconnected
            </li>
            <li>
              <span className="point-icon" role="img" aria-label="leaf">🍃</span>
              Each person has a unique constitution (Prakruti)
            </li>
            <li>
              <span className="point-icon" role="img" aria-label="leaf">🍃</span>
              Health is maintained through balance
            </li>
            <li>
              <span className="point-icon" role="img" aria-label="leaf">🍃</span>
              Disease occurs due to imbalance
            </li>
          </ul>
        </div>
        <div className="ayurveda-right">
          <div className="ayurveda-image">
            <img src={ayurvedaImg} alt="Ayurveda" className="ayurveda-main-img" />
          </div>
        </div>
      </div>

      {/* Right - Ayurveda Image and Assessment */}
      <div className="ayurveda-right-section">
        
        <div className="ayurveda-box">
        <div className="ayurveda-heading">
          <span className="heading-icon-2" role="img" aria-label="assessment">🧑‍⚕️</span>
          <span className="heading-text">Ayurvedic Assessment</span>
        </div>
        <div className="ayurveda-description">
          Understanding your constitution is the foundation of Ayurvedic wellness. Take our comprehensive assessment to discover your unique Dosha balance.
        </div>
        <div className="dosha-row">
          <div className="dosha-card">
            <div className="dosha-icon" role="img" aria-label="air">
              <img src={wind} alt="Vata"  />
            </div>
            <div className="dosha-title">Vata</div>
            <div className="dosha-desc">Movement</div>
          </div>
          <div className="dosha-card dosha-pitta">
            <div className="dosha-icon" role="img" aria-label="flame">
              <img src={fire} alt="Pitta"  />
            </div>
            <div className="dosha-title">Pitta</div>
            <div className="dosha-desc">Transformation</div>
          </div>
          <div className="dosha-card dosha-kapha">
            <div className="dosha-icon" role="img" aria-label="drop">
              <img src={water} alt="Kapha"  />
            </div>
            <div className="dosha-title">Kapha</div>
            <div className="dosha-desc">Structure</div>
          </div>
        </div>
        <button className="assessment-btn" onClick={() => navigate('/dosha-assessment')}>Discover Your Constitution</button>
        </div>
      </div>
    </div>

    <div className="doshas-main">
      <h2 className="doshas-title">The Three Doshas</h2>
      <div className="doshas-subtitle">
        Biological energies that govern all physiological and psychological functions
      </div>
      <div className="doshas-cards-row">
        {/* Vata */}
        <div className="dosha-card">
          <div className="dosha-icon dosha-vata feature-dosha-back" role="img" aria-label="vata symbol">
            <img src={wind} alt="Vata"  className='feature-dosha'  />
          </div>
          <div className="dosha-name">Vata</div>
          <div className="dosha-elem">Air + Space</div>
          <div className="dosha-desc">Governs movement, breathing, circulation, and nervous system</div>
          <div className="dosha-seat-title">Primary Seat:</div>
          <div className="dosha-seat">Colon, hips, thighs, bones, ears</div>
          <div className="dosha-qualities-title">Qualities:</div>
          <div className="dosha-qualities">
            <span>Light</span>
            <span>Dry</span>
            <span>Cold</span>
            <span>Rough</span>
            <span>Mobile</span>
            <span>Subtle</span>
          </div>
        </div>

        {/* Pitta */}
        <div className="dosha-card">
          <div className="dosha-icon dosha-pitta feature-dosha-back" role="img" aria-label="pitta symbol">
            <img src={fire} alt="Pitta"  className='feature-dosha'/>
          </div>
          <div className="dosha-name">Pitta</div>
          <div className="dosha-elem">Fire + Water</div>
          <div className="dosha-desc">Governs digestion, metabolism, and transformation</div>
          <div className="dosha-seat-title">Primary Seat:</div>
          <div className="dosha-seat">Small intestine, stomach, liver, heart, eyes</div>
          <div className="dosha-qualities-title">Qualities:</div>
          <div className="dosha-qualities">
            <span>Hot</span>
            <span>Sharp</span>
            <span>Light</span>
            <span>Oily</span>
            <span>Mobile</span>
            <span>Liquid</span>
          </div>
        </div>

        {/* Kapha */}
        <div className="dosha-card">
          <div className="dosha-icon dosha-kapha feature-dosha-back" role="img" aria-label="kapha symbol">
            <img src={water} alt="Kapha" className='feature-dosha' />
          </div>
          <div className="dosha-name">Kapha</div>
          <div className="dosha-elem">Earth + Water</div>
          <div className="dosha-desc">Governs structure, immunity, and stability</div>
          <div className="dosha-seat-title">Primary Seat:</div>
          <div className="dosha-seat">Chest, throat, head, joints, lymph</div>
          <div className="dosha-qualities-title">Qualities:</div>
          <div className="dosha-qualities">
            <span>Heavy</span>
            <span>Slow</span>
            <span>Cold</span>
            <span>Oily</span>
            <span>Stable</span>
            <span>Dense</span>
          </div>
        </div>
      </div>
    </div>

    <div className="bhutas-main">
      <h2 className="bhutas-title">Pancha Maha Bhutas</h2>
      <div className="bhutas-subtitle">
        The five fundamental elements that form the basis of all creation
      </div>
      <div className="bhutas-cards-row">
        {/* Earth */}
        <div className="bhuta-card">
          <div className="bhuta-icon bhuta-earth">⛰️</div>
          <div className="bhuta-name">Prithvi (Earth)</div>
          <div className="bhuta-desc">
            The solid principle providing structure and stability
          </div>
          <div className="bhuta-section-title">Qualities:</div>
          <div className="bhuta-qualities">
            <span>Heavy</span>
            <span>Stable</span>
            <span>Dense</span>
            <span>Rough</span>
            <span>Static</span>
          </div>
          <div className="bhuta-section-title">Body Manifestation:</div>
          <ul className="bhuta-list">
            <li>Bones</li>
            <li>Muscles</li>
            <li>Fat</li>
            <li>Skin</li>
            <li>Hair</li>
          </ul>
        </div>
        {/* Water */}
        <div className="bhuta-card">
          <div className="bhuta-icon bhuta-water">💧</div>
          <div className="bhuta-name">Jal (Water)</div>
          <div className="bhuta-desc">
            The liquid principle providing cohesion and fluidity
          </div>
          <div className="bhuta-section-title">Qualities:</div>
          <div className="bhuta-qualities">
            <span>Cool</span>
            <span>Liquid</span>
            <span>Soft</span>
            <span>Smooth</span>
            <span>Dense</span>
          </div>
          <div className="bhuta-section-title">Body Manifestation:</div>
          <ul className="bhuta-list">
            <li>Blood</li>
            <li>Lymph</li>
            <li>Saliva</li>
            <li>Digestive juices</li>
          </ul>
        </div>
        {/* Fire */}
        <div className="bhuta-card">
          <div className="bhuta-icon bhuta-fire">🔥</div>
          <div className="bhuta-name">Agni (Fire)</div>
          <div className="bhuta-desc">
            The transformation principle providing heat and metabolism
          </div>
          <div className="bhuta-section-title">Qualities:</div>
          <div className="bhuta-qualities">
            <span>Hot</span>
            <span>Sharp</span>
            <span>Light</span>
            <span>Dry</span>
            <span>Mobile</span>
          </div>
          <div className="bhuta-section-title">Body Manifestation:</div>
          <ul className="bhuta-list">
            <li>Body temperature</li>
            <li>Metabolism</li>
            <li>Digestion</li>
          </ul>
        </div>
        {/* Air */}
        <div className="bhuta-card">
          <div className="bhuta-icon bhuta-air">🌬️</div>
          <div className="bhuta-name">Vayu (Air)</div>
          <div className="bhuta-desc">
            The movement principle providing motion and circulation
          </div>
          <div className="bhuta-section-title">Qualities:</div>
          <div className="bhuta-qualities">
            <span>Light</span>
            <span>Mobile</span>
            <span>Dry</span>
            <span>Rough</span>
            <span>Cold</span>
          </div>
          <div className="bhuta-section-title">Body Manifestation:</div>
          <ul className="bhuta-list">
            <li>Nervous system</li>
            <li>Breathing</li>
            <li>Circulation</li>
          </ul>
        </div>
        {/* Space */}
        <div className="bhuta-card">
          <div className="bhuta-icon bhuta-space">🌀</div>
          <div className="bhuta-name">Akash (Space)</div>
          <div className="bhuta-desc">
            The space principle providing room for existence
          </div>
          <div className="bhuta-section-title">Qualities:</div>
          <div className="bhuta-qualities">
            <span>Light</span>
            <span>Subtle</span>
            <span>Soft</span>
            <span>Smooth</span>
            <span>Immobile</span>
          </div>
          <div className="bhuta-section-title">Body Manifestation:</div>
          <ul className="bhuta-list">
            <li>Body cavities</li>
            <li>Channels</li>
            <li>Pores</li>
          </ul>
        </div>
      </div>
    </div>


    </>
  );
}

export default Features;
