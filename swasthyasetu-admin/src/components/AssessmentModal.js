import React from 'react';
import './AssessmentModal.css';

const questions = [
  "What best describes your skin?",
  "What best describes your body build?", 
  "What best describes your hair?",
  "How would you describe your eyes?",
  "How is your usual mindset?",
  "How is your memory?",
  "What are your emotional tendencies?",
  "What food do you prefer?",
  "How would you describe your sleep?",
  "How are your energy levels during the day?",
  "What type of weather do you prefer?",
  "How do you respond to stress?"
];

const options = {
  Vata: ["Dry", "Thin", "Dry and thin", "Small and dull", "Restless", "Forgetful", "Anxious", "Warm and dry", "Light", "Variable", "Warm", "Anxious"],
  Pitta: ["Oily", "Muscular", "Oily and thinning", "Medium and sharp", "Intense", "Sharp", "Angry", "Cold and spicy", "Moderate", "High in bursts", "Cool", "Irritable"],
  Kapha: ["Balanced", "Heavier", "Thick and oily", "Large and soft", "Calm", "Slow but long-term", "Content and emotional", "Light and sweet", "Deep", "Steady and balanced", "Warm and dry", "Calm"]
};

const AssessmentModal = ({ assessment, onClose }) => {
  if (!assessment) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Assessment Details - {assessment.userId?.name}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="assessment-info">
            <p><strong>User:</strong> {assessment.userId?.name} ({assessment.userId?.email})</p>
            <p><strong>Date:</strong> {new Date(assessment.completedAt).toLocaleString()}</p>
            <p><strong>Dominant Dosha:</strong> <span className={`dosha-badge ${assessment.results.dominant.toLowerCase()}`}>{assessment.results.dominant}</span></p>
          </div>
          
          <div className="questions-answers">
            <h4>Questions & Answers</h4>
            {questions.map((question, index) => (
              <div key={index} className="qa-item">
                <div className="question">
                  <strong>Q{index + 1}:</strong> {question}
                </div>
                <div className="answer">
                  <strong>Answer:</strong> {options[assessment.responses[index]]?.[index] || assessment.responses[index]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentModal;