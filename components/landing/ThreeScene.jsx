'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const frameIdRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // 1. Setup Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    
    const updateSize = () => {
      if (!el || !camera) return;
      const width = el.clientWidth;
      const height = el.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.z = 6;

    updateSize();
    el.appendChild(renderer.domElement);

    // 2. Particles with Validation (Prevents NaN)
    const COUNT = 200;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT * 3; i++) {
      // Ensure no NaN values during initialization
      positions[i] = (Math.random() - 0.5) * 15;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xff3333,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // 3. Animation using performance.now() instead of Clock
    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', updateSize);

    const animate = (time) => {
      const t = time * 0.001; // convert to seconds
      frameIdRef.current = requestAnimationFrame(animate);

      // Smooth camera movement
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      points.rotation.y = t * 0.05;
      renderer.render(scene, camera);
    };

    frameIdRef.current = requestAnimationFrame(animate);

    // 4. Strong Cleanup (Crucial for Next.js navigation)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(frameIdRef.current);
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      
      if (el && renderer.domElement) {
        el.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0" />;
}