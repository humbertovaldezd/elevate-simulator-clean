// ModelViewerV153.jsx - Quiz + Recommendations Panel + Full Preservation (Corrected)

import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function DisclaimerModal({ onAccept }) {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
      <div style={{ backgroundColor: '#F0EAD6', color: '#0B132B', padding: '30px', borderRadius: '10px', width: '600px', textAlign: 'left', overflowY: 'auto', maxHeight: '90vh' }}>
        <h2>⚠️ Important Disclaimers and Considerations</h2>
        <ul>
          <li><strong>Individual Variability:</strong> Dosage and technique may vary based on patient factors.</li>
          <li><strong>Dilution Practices:</strong> Adjust dilution based on goals and treatment area.</li>
          <li><strong>Conversion Ratios:</strong> Dysport and Botox units are not directly comparable.</li>
          <li><strong>Anatomical Knowledge:</strong> Essential to minimize risks and optimize results.</li>
          <li><strong>Onset and Duration:</strong> Effects vary; typical onset in 24–48 hours, lasting 3–4 months.</li>
          <li><strong>Professional Training:</strong> Only qualified professionals should inject Dysport.</li>
        </ul>
        <div style={{ marginTop: '20px' }}>
          <a href="#" style={{ color: '#0B132B', fontWeight: 'bold', textDecoration: 'underline' }}>View Full Terms & Conditions</a>
        </div>
        <div style={{ marginTop: '20px' }}>
          <label>
            <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} /> I have read and accept the disclaimers
          </label>
        </div>
        <button
          disabled={!checked}
          onClick={onAccept}
          style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: checked ? '#0B132B' : '#999', color: '#F0EAD6', border: 'none', borderRadius: '5px', cursor: checked ? 'pointer' : 'not-allowed' }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function RecommendationsPanel() {
  return (
    <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#F0EAD6', color: '#0B132B', padding: '15px', borderRadius: '10px', width: '300px', fontSize: '14px', boxShadow: '0 4px 8px rgba(0,0,0,0.3)', zIndex: 1000 }}>
      <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>🧠 Key Clinical Recommendations</h3>
      <ul>
        <li><strong>50 Units</strong> in 5 sites for glabellar lines.</li>
        <li>Use <strong>2.5 mL</strong> saline dilution.</li>
        <li><strong>Avoid levator palpebrae superioris</strong> to prevent ptosis.</li>
        <li>Effects begin in <strong>24–48 hours</strong>, lasting <strong>3–4 months</strong>.</li>
        <li>Approximate ratio <strong>2.5:1 Dysport:Botox</strong>.</li>
        <li><strong>0.1 mL per injection site</strong>.</li>
        <li>Target the <strong>Frontalis muscle</strong>.</li>
        <li>Use <strong>Manual Palpation, EMG or Ultrasound</strong>.</li>
      </ul>
    </div>
  );
}

function QuizModal({ onPass }) {
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
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}>
      <div style={{ backgroundColor: '#FFFFFF', color: '#000', padding: '30px', borderRadius: '10px', width: '700px', textAlign: 'left', overflowY: 'auto', maxHeight: '90vh' }}>
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
        <button onClick={handleSubmit} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#0B132B', color: '#F0EAD6', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit Quiz</button>
      </div>
    </div>
  );
}

function InstructionsPanel({ progressComplete }) {
  return (
    <div style={{ backgroundColor: '#0B132B', color: '#F0EAD6', padding: '20px', height: '100vh', width: '300px', overflowY: 'auto' }}>
      <h2 style={{ marginBottom: '20px' }}>Injector Training Program</h2>
      <h4 style={{ marginBottom: '10px' }}>Module: Apply Dysport to Treat Wrinkles</h4>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li>{progressComplete ? '✅' : '🟡'} Apply Dysport X ml per cm²</li>
      </ul>
      <hr style={{ margin: '20px 0', borderColor: '#F0EAD6' }} />
      <h4>Important Notes</h4>
      <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        <li>Maintain correct injection angle (90°)</li>
        <li>Inject slowly to avoid product wastage</li>
        <li>Target injection depth is superficial</li>
      </ul>
    </div>
  );
}




function DualModel({ scaleY, transition, handleZoneClick }) {
  const base = useGLTF('/models/female_face_front_base.glb');
  const corrected = useGLTF('/models/female_face_front_corrected.glb');
  const forehead = useGLTF('/models/female_face_forehead_only.glb');

  useEffect(() => {
    if (base.scene && corrected.scene) {
      base.scene.traverse((child) => {
        if (child.isMesh) {
          child.material.transparent = true;
          child.material.opacity = 1 - transition;
        }
      });
      corrected.scene.traverse((child) => {
        if (child.isMesh) {
          child.material.transparent = true;
          child.material.opacity = transition;
        }
      });
    }
  }, [transition, base.scene, corrected.scene]);

  return (
    <>
      <primitive object={base.scene} scale={[1.5, 1.5 + scaleY, 1.5]} />
      <primitive object={corrected.scene} scale={[1.5, 1.5 + scaleY, 1.5]} />
      <primitive object={forehead.scene} scale={[1.5, 1.5 + scaleY, 1.5]} onClick={handleZoneClick} visible />
    </>
  );
}

function SmoothZoom({ targetPoint }) {
  const { camera } = useThree();
  useFrame(() => {
    if (targetPoint) {
      const targetPosition = new THREE.Vector3(
        targetPoint.x * 0.7,
        targetPoint.y * 0.7 + 0.3,
        targetPoint.z + 0.8
      );
      const currentPosition = camera.position.clone();
      camera.position.lerp(targetPosition, 0.03);
      camera.lookAt(targetPoint);

      if (currentPosition.distanceTo(targetPosition) < 0.1) {
        camera.position.lerp(targetPosition, 0.01);
      }
    }
  });
  return null;
}

export default function ModelViewer() {
  const [scaleY, setScaleY] = useState(0);
  const [transition, setTransition] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [progressComplete, setProgressComplete] = useState(false);
  const [targetPoint, setTargetPoint] = useState(null);
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(false);
  const canvasRef = useRef();

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'url("/syringe-full(64).png") 10 54, auto';
    }

    const handleMouseDown = () => {
      if (canvasRef.current) {
        canvasRef.current.style.cursor = 'url("/syringe-injecting(64).png") 10 54, auto';
      }
    };
    const handleMouseUp = () => {
      if (canvasRef.current) {
        canvasRef.current.style.cursor = 'url("/syringe-full(64).png") 10 54, auto';
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleZoneClick = (e) => {
    if (e.object && e.object.name.toLowerCase().includes('forehead')) {
      console.log('Forehead clicked - starting transition');
      setProgressStep(1);

      let progress = 0;
      const interval = setInterval(() => {
        progress += 0.05;
        setTransition(prev => Math.min(1, prev + 0.05));

        if (progress >= 1) {
          clearInterval(interval);
          setProgressComplete(true);
          setTargetPoint(e.point.clone());
          setTimeout(() => {
            setShowModal(true);
          }, 1500);
        }
      }, 100);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0B132B' }}>
      {!acceptedDisclaimer && <DisclaimerModal onAccept={() => setAcceptedDisclaimer(true)} />}

      {acceptedDisclaimer && (
        <>
          <div style={{ flex: 1, position: 'relative' }}>
            <Canvas ref={canvasRef} camera={{ position: [0, 1, 3], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} />
              <OrbitControls />
              <DualModel scaleY={scaleY} transition={transition} handleZoneClick={handleZoneClick} />
              {targetPoint && <SmoothZoom targetPoint={targetPoint} />}
            </Canvas>
            {progressStep > 0 && !progressComplete && (
              <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#D4AF37', color: '#0B132B', padding: '5px 10px', borderRadius: '8px', animation: 'blink 1s infinite' }}>
                Applying Dysport...
              </div>
            )}
          </div>

          <InstructionsPanel progressComplete={progressComplete} />

          {showModal && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
              <div style={{ backgroundColor: '#F0EAD6', color: '#0B132B', padding: '30px', borderRadius: '10px', width: '400px', textAlign: 'center' }}>
                <h2>🎉 Congratulations!</h2>
                <p>You have completed this module.</p>
                <button style={{ margin: '10px', padding: '10px 15px' }} onClick={() => alert('Continue clicked')}>Continue to Next Lesson</button>
                <button style={{ margin: '10px', padding: '10px 15px' }} onClick={() => window.location.reload()}>Retry this Module</button>
                <button style={{ margin: '10px', padding: '10px 15px' }} onClick={() => alert('Return to Menu clicked')}>Return to Menu</button>
              </div>
            </div>
          )}

          <style>{`
            @keyframes blink {
              0% { opacity: 1; }
              50% { opacity: 0.5; }
              100% { opacity: 1; }
            }
          `}</style>
        </>
      )}
    </div>
  );
}