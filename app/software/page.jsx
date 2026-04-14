// app/software/page.jsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Code2,
  Database,
  GitBranch,
  Zap,
  Layers,
  Globe,
  Terminal,
  Cpu,
  Binary,
} from "lucide-react";
import { useRef, useState, Suspense } from "react";
import * as random from "maath/random/dist/maath-random.esm";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import SkillsSection from "@/components/software/SkillsSection";
import ProjectsGrid from "@/components/software/ProjectsGrid";

const softwareSkills = [
  { name: "Frontend", icon: Globe, color: "#60b5ff" },
  { name: "Backend", icon: Database, color: "#60b5ff" },
  { name: "Git", icon: GitBranch, color: "#60b5ff" },
  { name: "Performance", icon: Zap, color: "#60b5ff" },
];

function CodeMatrix() {
  const groupRef = useRef();
  const [positions] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 3 }),
  );

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.05;
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <Points positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#00ff88"
          size={0.015}
          sizeAttenuation
          depthWrite={false}
          fog={false}
        />
      </Points>
    </group>
  );
}

function FloatingCodeBlocks() {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(6)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI) / 3) * 2,
            Math.sin((i * Math.PI) / 3) * 2,
            Math.sin((i * Math.PI) / 2) * 0.5,
          ]}
        >
          <boxGeometry args={[0.3, 0.3, 0.1]} />
          <meshPhongMaterial
            color={i % 2 === 0 ? "#00ff88" : "#60b5ff"}
            emissive={i % 2 === 0 ? "#00ff88" : "#60b5ff"}
            emissiveIntensity={0.2}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

function TerminalLines() {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI) / 4) * 1.5,
            Math.sin((i * Math.PI) / 4) * 1.5,
            0,
          ]}
        >
          <cylinderGeometry args={[0.01, 0.01, 0.6]} />
          <meshBasicMaterial color="#00ff88" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function Software3DScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[3, 3, 3]} intensity={1} color="#00ff88" />
          <pointLight position={[-3, -3, 3]} intensity={0.8} color="#60b5ff" />
          <CodeMatrix />
          <FloatingCodeBlocks />
          <TerminalLines />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default function SoftwareUniverse() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ["#0a0a0a", "#0f1419", "#1a1a2e", "#16213e"],
  );

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      <Software3DScene />

      {/* Animated Background */}
      <motion.div className="fixed inset-0 -z-5" style={{ backgroundColor }}>
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(96,181,255,0.1), transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(0,255,136,0.15), transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(96,181,255,0.1), transparent 50%)",
              "radial-gradient(circle at 60% 30%, rgba(0,255,136,0.15), transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(96,181,255,0.1), transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <motion.div className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{
                textShadow: [
                  "0 0 20px rgba(0,255,136,0.5)",
                  "0 0 30px rgba(96,181,255,0.6)",
                  "0 0 20px rgba(0,255,136,0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-300/30 bg-cyan-500/10 mb-6"
            >
              <Terminal className="h-4 w-4 text-cyan-300" />
              <span className="text-xs font-mono text-cyan-300 uppercase tracking-wider">
                Terminal Active
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-200 tracking-tighter mb-4 font-mono"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                textShadow: [
                  "0 0 30px rgba(0,255,136,0.5)",
                  "0 0 40px rgba(96,181,255,0.6)",
                  "0 0 30px rgba(0,255,136,0.5)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              &lt;CODE_UNIVERSE /&gt;
            </motion.h1>

            <motion.div
              className="h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-6 shadow-[0_0_20px_rgba(96,181,255,0.5)]"
              animate={{ scaleX: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            <motion.p
              className="text-lg text-zinc-300 max-w-2xl mx-auto font-mono"
              animate={{ color: ["#d1d5db", "#60b5ff", "#d1d5db"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              $ npm run life && build amazing experiences
            </motion.p>

            <motion.div
              className="mt-8 flex justify-center gap-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Binary className="h-6 w-6 text-cyan-400" />
              <Cpu className="h-6 w-6 text-blue-400" />
              <Terminal className="h-6 w-6 text-green-400" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Skills Icons Grid */}
        <motion.div className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {softwareSkills.map((skill, idx) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(96,181,255,0.3)",
                  backgroundColor: "rgba(96,181,255,0.1)",
                }}
                className="glass-card border border-cyan-300/20 p-6 text-center group cursor-pointer relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="relative z-10"
                >
                  <Icon className="h-8 w-8 mx-auto mb-3 text-cyan-300 group-hover:text-cyan-200 transition" />
                </motion.div>
                <p className="text-sm font-mono text-zinc-300 group-hover:text-white transition relative z-10">
                  {skill.name}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Content Sections */}
        <SkillsSection />
        <ProjectsGrid />
      </main>

      <Footer />
    </div>
  );
}
