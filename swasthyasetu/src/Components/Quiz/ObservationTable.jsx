import React, { useState } from 'react';
import './ObservationTable.css';

const ObservationTable = ({ onClose, responses }) => {
  const questions = [
    { question: 'What best describes your skin?', vata: 'Dry', pitta: 'Oily', kapha: 'Balanced' },
    { question: 'What best describes your body build?', vata: 'Thin', pitta: 'Muscular', kapha: 'Heavier' },
    { question: 'What best describes your hair?', vata: 'Dry and thin', pitta: 'Oily and thinning', kapha: 'Thick and oily' },
    { question: 'How would you describe your eyes?', vata: 'Small and dull', pitta: 'Medium and sharp', kapha: 'Large and soft' },
    { question: 'How is your usual mindset?', vata: 'Restless', pitta: 'Intense', kapha: 'Calm' },
    { question: 'How is your memory?', vata: 'Forgetful', pitta: 'Sharp', kapha: 'Slow but long-term' },
    { question: 'What are your emotional tendencies?', vata: 'Anxious', pitta: 'Angry', kapha: 'Content and emotional' },
    { question: 'What food do you prefer?', vata: 'Warm and dry', pitta: 'Cold and spicy', kapha: 'Light and sweet' },
    { question: 'How would you describe your sleep?', vata: 'Light', pitta: 'Moderate', kapha: 'Deep' },
    { question: 'How are your energy levels during the day?', vata: 'Variable', pitta: 'High in bursts', kapha: 'Steady and balanced' },
    { question: 'What type of weather do you prefer?', vata: 'Warm', pitta: 'Cool', kapha: 'Warm and dry' },
    { question: 'How do you respond to stress?', vata: 'Anxious', pitta: 'Irritable', kapha: 'Calm' }
  ];

  const getMyAnswerFromResponse = (index) => {
    if (!responses || !responses[index] || !questions[index]) return '';
    const responseDosha = responses[index];
    const question = questions[index];
    if (responseDosha === 'Vata') return question.vata;
    if (responseDosha === 'Pitta') return question.pitta;
    if (responseDosha === 'Kapha') return question.kapha;
    return '';
  };



  return (
    <div className="observation-overlay" onClick={onClose}>
      <div className="observation-modal" onClick={e => e.stopPropagation()}>
        <div className="observation-header">
          <h3>My Observations</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="observation-content">
          <table className="observation-table">
            <thead>
              <tr>
                <th>Questions</th>
                <th>Vata</th>
                <th>Pitta</th>
                <th>Kapha</th>
                <th>My Answers</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr key={index}>
                  <td className="question-label">{question.question}</td>
                  <td className="vata-cell">{question.vata}</td>
                  <td className="pitta-cell">{question.pitta}</td>
                  <td className="kapha-cell">{question.kapha}</td>
                  <td className="my-answer-cell">
                    {getMyAnswerFromResponse(index)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ObservationTable;