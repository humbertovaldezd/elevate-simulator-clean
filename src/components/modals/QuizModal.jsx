import React, { useState } from 'react';

export default function QuizModal({ onPass }) {
  const [answers, setAnswers] = useState(Array(10).fill(''));

  const questions = [
    { q: "What is the FDA-approved total dose of Dysport for treating glabellar lines in adults?", options: ["20 Units", "50 Units", "100 Units", "75 Units"], correct: "50 Units" },
    { q: "How many injection sites are recommended for administering Dysport in the glabellar region?", options: ["3", "5", "7", "10"], correct: "5" },
    { q: "What is the recommended dilution volume for reconstituting a 300-unit vial?", options: ["1.0 mL", "2.5 mL", "5.0 mL", "No dilution required"], correct: "2.5 mL" },
    { q: "Which anatomical consideration is crucial to avoid eyelid ptosis?", options: ["Injecting above eyebrow", "Avoiding levator palpebrae superioris", "Using 21-gauge needle", "Pressure on lower eyelid"], correct: "Avoiding levator palpebrae superioris" },
    { q: "Typical onset time for Dysport's effect?", options: ["Within 12 hours", "24–48 hours", "5–7 days", "10–14 days"], correct: "24–48 hours" },
    { q: "Typical duration of Dysport effect?", options: ["1–2 months", "3–4 months", "6–8 months", "Over 12 months"], correct: "3–4 months" },
    { q: "Approximate conversion ratio between Dysport and Botox?", options: ["1:1", "2.5:1", "3:1", "5:1"], correct: "2.5:1" },
    { q: "Maximum recommended volume per injection site?", options: ["0.1 mL", "0.5 mL", "1.0 mL", "2.0 mL"], correct: "0.1 mL" },
    { q: "Which muscle is primarily responsible for horizontal forehead lines?", options: ["Corrugator supercilii", "Procerus", "Frontalis", "Orbicularis oculi"], correct: "Frontalis" },
    { q: "Technique to identify active muscles before injection?", options: ["Manual palpation", "Electromyography", "Ultrasound", "All of the above"], correct: "All of the above" }
  ];

  const handleSelect = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    const correct = questions.filter((q, idx) => q.correct === answers[idx]).length;
    const score = (correct / questions.length) * 100;
    if (score >= 80) {
      onPass();
    } else {
      alert(`You scored ${score}%. Minimum passing is 80%. Please review and try again.`);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 3000
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        color: '#0B132B',
        padding: '30px',
        borderRadius: '10px',
        width: '700px',
        textAlign: 'left',
        overflowY: 'auto',
        maxHeight: '90vh'
      }}>
        <h2>🧠 Dysport Application Quiz</h2>
        {questions.map((q, idx) => (
          <div key={idx} style={{ marginBottom: '20px' }}>
            <p><strong>Q{idx + 1}: {q.q}</strong></p>
            {q.options.map((opt) => (
              <div key={opt}>
                <input
                  type="radio"
                  name={`q${idx}`}
                  value={opt}
                  checked={answers[idx] === opt}
                  onChange={(e) => handleSelect(idx, e.target.value)}
                /> {opt}
              </div>
            ))}
          </div>
        ))}
        <button
          onClick={handleSubmit}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#0B132B',
            color: '#F0EAD6',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Submit Quiz
        </button>

        <button
          onClick={() => onPass()}
          style={{
            marginTop: '20px',
            backgroundColor: '#ccc',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Skip Quiz (Demo Only)
        </button>

        <p style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          Note: This is a demo version. In a real application, the quiz would be mandatory.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: '20px',
            backgroundColor: '#ccc',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
}
