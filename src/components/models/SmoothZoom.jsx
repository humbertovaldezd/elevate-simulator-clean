// SmoothZoom.jsx - Replace complex forehead zoom with simple zoom-in effect
import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

export default function SmoothZoom({ active }) {
  const { camera } = useThree();
  const zoomProgress = useRef(0);
  const initialZoom = useRef(camera.zoom);

  useEffect(() => {
    if (active) {
      zoomProgress.current = 0;
      initialZoom.current = camera.zoom;
    }
  }, [active]);

  useFrame(() => {
    if (active && zoomProgress.current < 1) {
      zoomProgress.current += 0.02;
      const eased = 1 - Math.pow(1 - zoomProgress.current, 3); // easeOutCubic
      camera.zoom = initialZoom.current + eased * 1.2; // Increase zoom by up to 1.2x
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
