'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // 1. Scene & Renderer Setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    
    const updateSize = () => {
      const width = el.clientWidth;
      const height = el.clientHeight;
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      if (camera) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030303, 0.05);

    const camera = new THREE.PerspectiveCamera(75, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.z = 6;

    updateSize();
    el.appendChild(renderer.domElement);

    // 2. Spider-Man Aesthetic Lighting
    const ambient = new THREE.AmbientLight(0xff0000, 0.2);
    scene.add(ambient);

    const pointLight = new THREE.PointLight(0xff0000, 15, 25);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // 3. Web-like Particles (Optimized geometry)
    const COUNT = 200;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;     
      positions[i + 1] = (Math.random() - 0.5) * 12; 
      positions[i + 2] = (Math.random() - 0.5) * 8;  
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xff4444,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // 4. Smooth Interaction Logic (Avoiding Spring Errors)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      // Normalizing mouse to -1 to +1
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', updateSize);

    const clock = new THREE.Clock();
    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Manual Linear Interpolation (Lerp) for smoothness
      // This avoids the Framer Motion "three keyframes" error by handling physics here
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      camera.position.x = mouseX * 1.5;
      camera.position.y = -mouseY * 1.2;
      camera.lookAt(0, 0, 0);

      // Animation: Subtle web pulse and drift
      points.rotation.y = t * 0.04;
      points.rotation.z = Math.sin(t * 0.2) * 0.1;
      
      pointLight.intensity = 10 + Math.sin(t * 2) * 5;

      renderer.render(scene, camera);
    };

    animate();

    // 5. Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateSize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]" 
      style={{ mixBlendMode: 'plus-lighter' }} // Better color integration for red on dark
    />
  );
}