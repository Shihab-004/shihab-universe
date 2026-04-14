"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Cpu,
  Zap,
  Eye,
  Move3d,
  Radio,
  Lightbulb,
  Bot,
  CircuitBoard,
  Cog,
  Wrench,
} from "lucide-react";
import { useRef, useState, Suspense } from "react";
import * as random from "maath/random/dist/maath-random.esm";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import SkillsSection from "@/components/robotics/SkillsSection";
import ProjectsGrid from "@/components/robotics/ProjectsGrid";

const roboticsSkills = [
  { name: "ML/AI", icon: Cpu, color: "#c47bff" },
  { name: "Vision", icon: Eye, color: "#c47bff" },
  { name: "Motion", icon: Move3d, color: "#c47bff" },
  { name: "ROS2", icon: Radio, color: "#c47bff" },
  { name: "Sensors", icon: Zap, color: "#c47bff" },
  { name: "Intelligence", icon: Lightbulb, color: "#c47bff" },
];

// ── Robotic Arm (Improved Animation) ─────────────────────────────────
function RoboticArm() {
  const armRef = useRef();
  const joint1Ref = useRef();
  const joint2Ref = useRef();
  const gripperRef = useRef();

  useFrame((state) => {
    if (armRef.current)
      armRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    if (joint1Ref.current)
      joint1Ref.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 1.2) * 0.45;
    if (joint2Ref.current)
      joint2Ref.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 2.1) * -0.55;
    if (gripperRef.current)
      gripperRef.current.position.x =
        Math.sin(state.clock.elapsedTime * 3) * 0.12;
  });

  return (
    <group ref={armRef}>
      {/* Base */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.25]} />
        <meshPhongMaterial
          color="#4c1d95"
          emissive="#6b21a8"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Arm 1 */}
      <group ref={joint1Ref}>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 1.1]} />
          <meshPhongMaterial
            color="#7c3aed"
            emissive="#a855f7"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Arm 2 */}
        <group ref={joint2Ref} position={[0, 0.75, 0]}>
          <mesh>
            <cylinderGeometry args={[0.05, 0.05, 0.9]} />
            <meshPhongMaterial
              color="#c026d3"
              emissive="#e879f9"
              emissiveIntensity={0.5}
            />
          </mesh>

          {/* Gripper */}
          <group ref={gripperRef} position={[0, 0.55, 0]}>
            <mesh position={[-0.12, 0, 0]} rotation={[0, 0, 0.6]}>
              <boxGeometry args={[0.18, 0.06, 0.06]} />
              <meshPhongMaterial
                color="#c47bff"
                emissive="#e0abff"
                emissiveIntensity={0.6}
              />
            </mesh>
            <mesh position={[0.12, 0, 0]} rotation={[0, 0, -0.6]}>
              <boxGeometry args={[0.18, 0.06, 0.06]} />
              <meshPhongMaterial
                color="#c47bff"
                emissive="#e0abff"
                emissiveIntensity={0.6}
              />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

// ── Circuit Particles (More Dynamic) ───────────────────────────────
function CircuitParticles() {
  const groupRef = useRef();
  const [positions] = useState(() =>
    random.inSphere(new Float32Array(8000), { radius: 3.2 }),
  );

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.02;
      groupRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <Points positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#c47bff"
          size={0.008}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

// ── Data Flow Rings ────────────────────────────────────────────────
function DataFlow() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI) / 4) * 2.8,
            Math.sin((i * Math.PI) / 4) * 1.6 - 0.5,
            0,
          ]}
        >
          <torusGeometry args={[0.12, 0.015, 12, 24]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#c47bff" : "#a855f7"}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── 3D Scene ───────────────────────────────────────────────────────
function Robotics3DScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 1, 5], fov: 48 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={1.5} color="#c47bff" />
          <pointLight position={[-5, -3, 6]} intensity={0.9} color="#a855f7" />

          <RoboticArm />
          <CircuitParticles />
          <DataFlow />
        </Suspense>
      </Canvas>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────
export default function RoboticsUniverse() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0.85, 0.4]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#0a0a0a]"
    >
      <Robotics3DScene />

      {/* Dynamic Background Overlay */}
      <motion.div
        className="fixed inset-0 -z-5 bg-gradient-to-b from-violet-950/80 via-purple-950/60 to-black"
        style={{ opacity: bgOpacity }}
      />

      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 pt-28 pb-24">
        {/* Hero Section */}
        <motion.div className="mb-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-violet-400/30 bg-violet-500/10 mb-8">
              <Bot className="h-5 w-5 text-violet-300" />
              <span className="text-xs font-mono uppercase tracking-widest text-violet-300">
                LIVE • AI SYSTEM ONLINE
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black bg-gradient-to-br from-white via-violet-200 to-purple-300 bg-clip-text text-transparent tracking-[-2px] leading-none mb-6">
              ROBOTIC
              <br />
              INTELLIGENCE
            </h1>

            <p className="max-w-xl mx-auto text-lg text-zinc-300 font-light">
              Building conscious machines through seamless fusion of hardware,
              AI, and real-time intelligence.
            </p>

            <div className="mt-10 flex justify-center gap-8 text-violet-400">
              <CircuitBoard className="h-7 w-7 animate-pulse" />
              <Cog className="h-7 w-7" />
              <Wrench className="h-7 w-7" />
            </div>
          </motion.div>
        </motion.div>

        {/* Skills Icons Grid - Responsive */}
        <div className="mb-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {roboticsSkills.map((skill, idx) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  boxShadow: `0 0 40px ${skill.color}50`,
                }}
                className="group relative flex flex-col items-center justify-center p-6 rounded-3xl border border-white/10 bg-zinc-900/70 backdrop-blur-xl hover:border-violet-400/40 transition-all duration-300"
              >
                <motion.div
                  animate={{ rotate: [0, 12, -12, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Icon className="h-9 w-9 mb-4 text-violet-300 group-hover:text-white transition-colors" />
                </motion.div>
                <p className="text-sm font-medium text-zinc-200 group-hover:text-violet-200 transition-colors">
                  {skill.name}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Content Sections */}
        <SkillsSection />
        <ProjectsGrid />
      </main>

      <Footer />
    </div>
  );
}
