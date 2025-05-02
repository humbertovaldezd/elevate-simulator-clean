// DualModel.jsx – Ajuste fino 2.0 de zona de inyección

import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function DualModel({ transition, onInject, setZoomTarget, activeLevel = 1 }) {
  const level1Base = useGLTF('/models/level1_base.glb');
  const level1Corrected = useGLTF('/models/level1_corrected.glb');
  const level2Base = useGLTF('/models/level2_base.glb');
  const level2Corrected = useGLTF('/models/level2_corrected.glb');
  const level3Base = useGLTF('/models/level3_base.glb');
  const level3Corrected = useGLTF('/models/level3_corrected.glb');
  const forehead = useGLTF('/models/female_face_forehead_only.glb');

  const baseRef = useRef();
  const correctedRef = useRef();
  const foreheadRef = useRef();

  const [injectionPoint, setInjectionPoint] = useState(null);
  const [pulseScale, setPulseScale] = useState(0);

  const getBaseModel = () => {
    switch (activeLevel) {
      case 1: return level1Base.scene;
      case 2: return level2Base.scene;
      case 3: return level3Base.scene;
      default: return level1Base.scene;
    }
  };

  const getCorrectedModel = () => {
    switch (activeLevel) {
      case 1: return level1Corrected.scene;
      case 2: return level2Corrected.scene;
      case 3: return level3Corrected.scene;
      default: return level1Corrected.scene;
    }
  };

  useEffect(() => {
    if (forehead.scene) {
      forehead.scene.traverse((child) => {
        if (child.isMesh) {
          child.material.transparent = true;
          child.material.opacity = 0;
          child.material.depthWrite = false;
        }
      });
    }
  }, [forehead.scene]);

  useEffect(() => {
    const baseScene = getBaseModel();
    const correctedScene = getCorrectedModel();

    if (baseScene && correctedScene) {
      baseScene.traverse((child) => {
        if (child.isMesh) {
          child.material.transparent = true;
          child.material.opacity = 1 - transition;
        }
      });
      correctedScene.traverse((child) => {
        if (child.isMesh) {
          child.material.transparent = true;
          child.material.opacity = transition;
        }
      });
    }
  }, [transition, activeLevel]);

  const handleForeheadClick = (e) => {
    e.stopPropagation();
    if (e.object && e.object.name && e.object.name.toLowerCase().includes('forehead')) {
      const clickedPoint = e.point.clone();
      if (setZoomTarget) {
        setZoomTarget(clickedPoint);
      }
      if (onInject) {
        onInject();
      }
    }
  };

  useFrame((state, delta) => {
    if (pulseScale > 0 && pulseScale < 0.05) {
      setPulseScale((prev) => Math.min(prev + delta * 0.3, 0.05));
    }
  });

  // 🔥 Corrección de posiciones:
  const foreheadPosition = 
    activeLevel === 1 ? [0, 0, 0] :  // 👈 BAJAR Level 1 más
    activeLevel === 2 ? [0, 0.55, 0] :  // 👈 Level 2 bien
    [0, 0.45, 0];                      // 👈 SUBIR Level 3 más

  return (
    <>
      {/* Frente invisible para detectar inyección */}
      <primitive
        object={forehead.scene}
        ref={foreheadRef}
        scale={
          activeLevel === 1 ? [1.5, 1.5, 1.5] :
          activeLevel === 2 ? [1.3, 1.3, 1.3] :
          [1.45, 1.45, 1.45]
        }
        position={foreheadPosition}
        rotation={[0, 0, 0]}
        onClick={handleForeheadClick}
        renderOrder={1}
      />

      {/* Modelos base y corregido */}
      <primitive
        object={getBaseModel()}
        ref={baseRef}
        scale={[1.5, 1.5, 1.5]}
        renderOrder={0}
      />
      <primitive
        object={getCorrectedModel()}
        ref={correctedRef}
        scale={[1.5, 1.5, 1.5]}
        renderOrder={2}
      />

      {/* Flash bonito de inyección */}
      {injectionPoint && (
        <mesh position={[injectionPoint.x, injectionPoint.y, injectionPoint.z]} rotation={[-Math.PI/2, 0, 0]}>
          <planeGeometry args={[0.05, 0.05]} />
          <meshBasicMaterial color="#ffb6c1" transparent opacity={0.5} />
        </mesh>
      )}
    </>
  );
}