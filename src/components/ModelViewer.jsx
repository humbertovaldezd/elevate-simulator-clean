// ModelViewer.jsx

import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import DisclaimerModal from './modals/DisclaimerModal';
import SuccessModal from './modals/SuccessModal';
import QuizModal from './modals/QuizModal';
import CongratsModal from './modals/CongratsModal';
import InstructionsPanel from './panels/InstructionsPanel';
import RecommendationsPanel from './panels/RecommendationsPanel';
import DualModel from './models/DualModel';
import SmoothZoom from './models/SmoothZoom';
import * as THREE from 'three';

export default function ModelViewer() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const [transition, setTransition] = useState(0); // 0 = wrinkled, 1 = smooth
  const [completed, setCompleted] = useState(false);
  const [zoomActive, setZoomActive] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentActiveStep, setCurrentActiveStep] = useState(0);
  const [disclaimerCompleted, setDisclaimerCompleted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [level1Completed, setLevel1Completed] = useState(false);
  const [level2Completed, setLevel2Completed] = useState(false);
  const [level3Completed, setLevel3Completed] = useState(false);

  const canvasRef = useRef();

  useEffect(() => {
    if (showSimulator && canvasRef.current) {
      canvasRef.current.style.cursor = 'url("/syringe-full.png") 10 54, auto';
      const handleMouseDown = () => {
        canvasRef.current.style.cursor = 'url("/syringe-injecting.png") 10 54, auto';
      };
      const handleMouseUp = () => {
        canvasRef.current.style.cursor = 'url("/syringe-full.png") 10 54, auto';
      };
      canvasRef.current.addEventListener('mousedown', handleMouseDown);
      canvasRef.current.addEventListener('mouseup', handleMouseUp);

      return () => {
        canvasRef.current.style.cursor = 'default';
        canvasRef.current.removeEventListener('mousedown', handleMouseDown);
        canvasRef.current.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [showSimulator, currentLevel]);

  const handleAcceptDisclaimer = () => {
    setShowDisclaimer(false);
    setShowQuiz(true);
    setDisclaimerCompleted(true);
  };

  const handlePassQuiz = () => {
    setShowQuiz(false);
    setShowSimulator(true);
    setQuizCompleted(true);
  };

  const handleInject = () => {
    if (transition < 1) {
      setTransition(1);
      setCompleted(true);
      setTimeout(() => {
        setZoomActive(true);
        setTimeout(() => {
          setShowSuccessModal(true);
        }, 3000);
      }, 1000);
    }
  };

  const handleNextLevel = () => {
    if (currentLevel === 1) {
      setLevel1Completed(true);
    } else if (currentLevel === 2) {
      setLevel2Completed(true);
    } else if (currentLevel === 3) {
      setLevel3Completed(true);
    }
    if (currentLevel < 3) {
      setCurrentLevel(currentLevel + 1);
      setTransition(0);
      setCompleted(false);
      setZoomActive(false);
      setShowSuccessModal(false);
    } else {
      setShowSuccessModal(false);
      setShowCongrats(true);
    }
  };

  const handleRetry = () => {
    setTransition(0);
    setCompleted(false);
    setZoomActive(false);
    setShowCongrats(false);
  };

  const handleExit = () => {
    window.location.reload();
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* Paneles */}
      <InstructionsPanel
        disclaimerCompleted={disclaimerCompleted}
        quizCompleted={quizCompleted}
        level1Completed={level1Completed}
        level2Completed={level2Completed}
        level3Completed={level3Completed}
      />
      <RecommendationsPanel />

      {/* Simulador */}
<Canvas
  ref={canvasRef}
  camera={{ position: [0, 1, 3], fov: 50 }}
  gl={{
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 1.1,
  }}
>
  <ambientLight intensity={0.7} />
  <directionalLight position={[5, 10, 5]} intensity={1} color="#ffeedd" />

  {/* Fondo neutro tipo estudio profesional */}
  <Environment preset="apartment" background blur={0.25} />

  <OrbitControls />
  <DualModel transition={transition} onInject={handleInject} activeLevel={currentLevel} />
  <SmoothZoom active={zoomActive} />
</Canvas>



      {/* Modales */}
      {showDisclaimer && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 3000 }}>
          <DisclaimerModal onAccept={handleAcceptDisclaimer} />
        </div>  
      )}
      {showQuiz && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 3000 }}>
          <QuizModal onPass={handlePassQuiz} />
        </div>
      )}
      {showCongrats && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 3000 }}>
          <CongratsModal onRetry={handleRetry} onExit={handleExit} />
        </div>
      )}
      {showSuccessModal && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 3000 }}>
          <SuccessModal onNext={handleNextLevel} />
        </div>
      )}
    </div>
  );
}
