import React, { useState, useRef } from "react";
import "./DoshaAssessment.css";
import { useNavigate } from 'react-router-dom';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { saveAssessment } from '../../services/assessmentService';
import ObservationTable from './ObservationTable';


const questions = [
  {
    question: "What best describes your skin?",
    options: [
      { text: "Dry", dosha: "Vata" },
      { text: "Oily", dosha: "Pitta" },
      { text: "Balanced", dosha: "Kapha" }
    ],
  },
  {
    question: "What best describes your body build?",
    options: [
      { text: "Thin", dosha: "Vata" },
      { text: "Muscular", dosha: "Pitta" },
      { text: "Heavier", dosha: "Kapha" }
    ],
  },
  {
    question: "What best describes your hair?",
    options: [
      { text: "Dry and thin", dosha: "Vata" },
      { text: "Oily and thinning", dosha: "Pitta" },
      { text: "Thick and oily", dosha: "Kapha" }
    ],
  },
  {
    question: "How would you describe your eyes?",
    options: [
      { text: "Small and dull", dosha: "Vata" },
      { text: "Medium and sharp", dosha: "Pitta" },
      { text: "Large and soft", dosha: "Kapha" }
    ],
  },
  {
    question: "How is your usual mindset?",
    options: [
      { text: "Restless", dosha: "Vata" },
      { text: "Intense", dosha: "Pitta" },
      { text: "Calm", dosha: "Kapha" }
    ],
  },
  {
    question: "How is your memory?",
    options: [
      { text: "Forgetful", dosha: "Vata" },
      { text: "Sharp", dosha: "Pitta" },
      { text: "Slow but long-term", dosha: "Kapha" }
    ],
  },
  {
    question: "What are your emotional tendencies?",
    options: [
      { text: "Anxious", dosha: "Vata" },
      { text: "Angry", dosha: "Pitta" },
      { text: "Content and emotional", dosha: "Kapha" }
    ],
  },
  {
    question: "What food do you prefer?",
    options: [
      { text: "Warm and dry", dosha: "Vata" },
      { text: "Cold and spicy", dosha: "Pitta" },
      { text: "Light and sweet", dosha: "Kapha" }
    ],
  },
  {
    question: "How would you describe your sleep?",
    options: [
      { text: "Light", dosha: "Vata" },
      { text: "Moderate", dosha: "Pitta" },
      { text: "Deep", dosha: "Kapha" }
    ],
  },
  {
    question: "How are your energy levels during the day?",
    options: [
      { text: "Variable", dosha: "Vata" },
      { text: "High in bursts", dosha: "Pitta" },
      { text: "Steady and balanced", dosha: "Kapha" }
    ],
  },
  {
    question: "What type of weather do you prefer?",
    options: [
      { text: "Warm", dosha: "Vata" },
      { text: "Cool", dosha: "Pitta" },
      { text: "Warm and dry", dosha: "Kapha" }
    ],
  },
  {
    question: "How do you respond to stress?",
    options: [
      { text: "Anxious", dosha: "Vata" },
      { text: "Irritable", dosha: "Pitta" },
      { text: "Calm", dosha: "Kapha" }
    ],
  },
];


const DOSHA_INFO = {
  Vata: {
    display: "Vata",
    color: "#4dabf7",
    characteristics: [
      "Dry skin and hair",
      "Thin build",
      "Restless and anxious",
      "Light sleeper",
      "Forgetful but creative",
      "Variable energy levels"
    ],
    balancingDiet: "Warm foods, moist textures, grounding and oily foods, avoid raw and cold items",
    dailySchedule: "Maintain a regular routine, stay warm, get enough rest, avoid overstimulation",
    desc: "Represents air and ether — governs movement, communication, creativity, and flexibility.",
    summaryTips: [
      "Follow a consistent daily schedule",
      "Eat warm, cooked meals regularly",
      "Avoid cold weather and raw foods",
      "Practice grounding activities like meditation or yoga"
    ]
  },

  Pitta: {
    display: "Pitta",
    color: "#fa5252",
    characteristics: [
      "Oily skin and thinning hair",
      "Muscular build",
      "Intense and ambitious",
      "Deep sleeper but prone to irritability",
      "Sharp intellect and memory",
      "High bursts of energy"
    ],
    balancingDiet: "Cooling and mild foods, avoid spicy, oily, and fermented foods",
    dailySchedule: "Take breaks during peak heat (midday), hydrate well, avoid overworking, practice stress management",
    desc: "Represents fire and water — governs metabolism, digestion, and transformation.",
    summaryTips: [
      "Eat cooling and less spicy foods",
      "Drink plenty of water and stay hydrated",
      "Avoid overexposure to heat or sun",
      "Take mental breaks and avoid competitive situations"
    ]
  },

  Kapha: {
    display: "Kapha",
    color: "#40c057",
    characteristics: [
      "Thick or oily skin and hair",
      "Heavier and steady build",
      "Calm, compassionate, and emotionally stable",
      "Deep sleeper",
      "Slow but long-term memory",
      "Steady, grounded energy"
    ],
    balancingDiet: "Light, dry, and warm foods; reduce oily and sweet foods; prefer bitter and pungent tastes",
    dailySchedule: "Exercise in the morning, avoid napping during the day, stay mentally and physically active",
    desc: "Represents earth and water — provides stability, strength, and endurance.",
    summaryTips: [
      "Wake up early and exercise regularly",
      "Avoid heavy, oily, and dairy-rich foods",
      "Include stimulating and warming activities",
      "Stay active to avoid lethargy or stagnation"
    ]
  }
};


function getResults(responses) {
  const doshaCounts = { Vata: 0, Pitta: 0, Kapha: 0 };
  responses.forEach((dosha) => {
    doshaCounts[dosha]++;
  });
  const total = responses.length;
  const percentages = {
    Vata: Math.round((doshaCounts.Vata / total) * 100),
    Pitta: Math.round((doshaCounts.Pitta / total) * 100),
    Kapha: Math.round((doshaCounts.Kapha / total) * 100)
  };
  let dominant = "Vata";
  let max = percentages.Vata;
  ["Pitta", "Kapha"].forEach((d) => {
    if (percentages[d] > max) {
      dominant = d;
      max = percentages[d];
    }
  });
  const rest = Object.entries(percentages)
    .filter(([k, v]) => k !== dominant)
    .sort((a, b) => b[1] - a[1]);
  const secondary = rest[0][0];
  return { percentages, dominant, secondary };
}

export default function DoshaAssessment() {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showObservationTable, setShowObservationTable] = useState(false);
  const pdfRef = useRef();
  const navigate = useNavigate();

  const { percentages, dominant, secondary } = getResults(responses);

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log('User from localStorage:', user);
    
    if (user && (user._id || user.id) && responses.length === questions.length) {
      const { percentages, dominant, secondary } = getResults(responses);
      const assessmentData = {
        userId: user._id || user.id,
        type: "dosha",
        responses,
        results: { percentages, dominant, secondary }
      };
      console.log('Saving assessment with data:', assessmentData);
      
      saveAssessment(assessmentData)
        .then(result => {
          console.log('Assessment saved successfully:', result);
          alert('Assessment saved successfully!');
        })
        .catch(error => {
          console.error('Error saving assessment:', error);
          alert('Error saving assessment: ' + error.message);
        });
    } else {
      console.log('Cannot save assessment:', {
        hasUser: !!user,
        hasUserId: user?._id || user?.id,
        responsesLength: responses.length,
        questionsLength: questions.length
      });
    }
  }, [responses]);

  function handleOption(idx) {
    setSelected(idx);
  }

  function next() {
    if (selected === null) return;
    setResponses([...responses, questions[step].options[selected].dosha]);
    setStep(step + 1);
    setSelected(null);
  }

  function prev() {
    setStep(step - 1);
    setSelected(null);
  }

  function reset() {
    setStep(0);
    setResponses([]);
    setSelected(null);
  }

  if (step < questions.length) {
    const pct = Math.round((step / questions.length) * 100);
    return (
      <div className="dq-container">
        <div className="dq-card">
          <div className="dq-title">Discover Your Dominant Dosha</div>
          <div className="dq-desc">Answer these questions to understand your body and mind constitution</div>
          <div className="dq-progress-bar">
            <div className="dq-progress" style={{width: `${pct}%`}} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <b>Question {step + 1} of {questions.length}</b>
          </div>
          <div className="dq-question">{questions[step].question}</div>
          <ul className="dq-options">
            {questions[step].options.map((opt, i) => (
              <li key={i}
                  className={`dq-option${selected === i ? " dq-selected" : ""}`}
                  onClick={() => handleOption(i)}>
                {opt.text}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 8 }}>
            {step > 0 && (
              <button className="dq-prev-btn" onClick={prev}>Previous</button>
            )}
            <button className="dq-next-btn" onClick={next} disabled={selected === null}>
              {step === questions.length - 1 ? "Complete Assessment" : "Next Question"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const downloadPdf = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4"
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth - 40;
    const imgProps = pdf.getImageProperties(imgData);
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 20, 20, imgWidth, imgHeight);
    
    pdf.text(`DOSHA ASSESSMENT REPORT`, 300, 30, { fontSize: 20, fontStyle: "bold", align: "center" });
    pdf.text(`Thank you for using the Dosha Assessment!`, 300, 750, { fontSize: 20, fontStyle: "bold", align: "center" });

    pdf.save("DoshaAssessmentReport.pdf");
  };

  return (
    <div className="dq-container">
      <div className="dq-card" ref={pdfRef}>
        <div className="dq-title">Your Dosha Constitution</div>
        <div className="dq-desc">Understanding your dominant Dosha for balanced living</div>
        
        <div className="dq-balance-table-section">
          <table className="dq-balance-table">
            <thead>
              <tr>
                <th>Dosha</th>
                <th>Balance</th>
                <th>Key Characteristics</th>
                <th>Balancing Diet Suggestions</th>
                <th>Daily Schedule & Lifestyle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="dq-dosha-badge pitta">
                    Pitta {dominant === "Pitta" && <b>★</b>}
                  </span>
                </td>
                <td>
                  {percentages.Pitta}%
                  <div className="dq-dosha-bar" style={{width: `${percentages.Pitta}%`, background: "#fa5252"}} />
                </td>
                <td>
                  Intense, ambitious, oily skin, prefers cool, occasionally intense emotions
                </td>
                <td>
                  Cooling, light foods<br />
                  Avoid excess heat/spice
                </td>
                <td>
                  Midday breaks, stress management, stay hydrated, journaling
                </td>
              </tr>
              <tr>
                <td>
                  <span className="dq-dosha-badge kapha">
                    Kapha {dominant === "Kapha" && <b>★</b>}
                  </span>
                </td>
                <td>
                  {percentages.Kapha}%
                  <div className="dq-dosha-bar" style={{width: `${percentages.Kapha}%`, background: "#40c057"}} />
                </td>
                <td>
                  Calm, deep sleeper, heavier build, balanced energy
                </td>
                <td>
                  Light, warm, stimulating foods
                </td>
                <td>
                  Morning exercise, avoid oversleeping, stay active
                </td>
              </tr>
              <tr>
                <td>
                  <span className="dq-dosha-badge vata">
                    Vata {dominant === "Vata" && <b>★</b>}
                  </span>
                </td>
                <td>
                  {percentages.Vata}%
                  <div className="dq-dosha-bar" style={{width: `${percentages.Vata}%`, background: "#4dabf7"}} />
                </td>
                <td>
                  Energetic, creative, variable energy (if present)
                </td>
                <td>
                  Warm, moist, grounding foods
                </td>
                <td>
                  Structured, predictable routine, grounding habits
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="dq-dominant-highlight">
          <span className={`dq-dominant-badge ${dominant.toLowerCase()}`}>
            Dominant Dosha: {dominant} <b>★</b>
          </span>
        </div>
        <div className="dq-characteristics">
          <p>
            <b>Main Characteristics ({dominant}):</b><br />
            {DOSHA_INFO[dominant].characteristics.join(", ")}
          </p>
          <p>
            <b>Secondary Traits ({secondary}):</b><br />
            {DOSHA_INFO[secondary].characteristics.join(", ")}
          </p>
        </div>
        <div className="dq-summary-tips">
          <p>
            <b>Summary Tips for {dominant}:</b>
            <ul>
              {DOSHA_INFO[dominant].summaryTips.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </p>
          <p>
            <b>Personalized Diet Tips for {dominant}:</b>
            <ul>
              {DOSHA_INFO[dominant].balancingDiet.split(", ").map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </p>
          <p>
            <b>Lifestyle Recommendations for {dominant}:</b>
            <ul>
              {DOSHA_INFO[dominant].dailySchedule.split(", ").map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </p>
        </div>

        <div className="dq-actions">
          <button className="dq-next-btn" onClick={reset}>Retake Assessment</button>
          <button
            className="dq-next-btn dq-secondary-action"
            onClick={() => setShowObservationTable(true)}
          >
            Observation Table
          </button>
          <button
            className="dq-next-btn dq-secondary-action"
            onClick={downloadPdf}
          >
            Download Report
          </button>
          <button className="dq-next-btn dq-secondary-action" onClick={() => navigate('/features')}>Go To Ayurveda Module</button>
        </div>
      </div>
      
      {showObservationTable && (
        <ObservationTable 
          onClose={() => setShowObservationTable(false)} 
          responses={responses}
        />
      )}
    </div>
  );
}