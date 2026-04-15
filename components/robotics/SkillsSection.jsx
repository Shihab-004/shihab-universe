"use client";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  Bot,
  Cpu,
  Zap,
  Settings,
  Eye,
  RotateCw,
  Microscope,
  Gauge,
  CircuitBoard,
  Radio,
  Wrench,
  Target,
  Brain,
  BrainCircuit,
  Sparkles,
} from "lucide-react";
import { useRef, useState } from "react";

const roboticsSkills = [
  { name: "ROS2", icon: Bot, color: "#c084fc" },
  { name: "Embedded C++", icon: Cpu, color: "#a78bfa" },
  { name: "Control Systems", icon: Gauge, color: "#e0e7ff" },
  { name: "Computer Vision", icon: Eye, color: "#67e8f9" },
  { name: "Mechatronics", icon: Settings, color: "#e879f9" },
  { name: "Path Planning", icon: Target, color: "#a5b4fc" },
  { name: "Machine Learning", icon: Brain, color: "#7c3aed" },
  { name: "Deep Learning", icon: BrainCircuit, color: "#a855f7" },
  { name: "AI Integration", icon: Sparkles, color: "#d8b4fe" },
];

// ── Compact 3D AI + Robotics Skill Card (Purple Theme) ─────────────────────
function RoboticsSkillCard({ skill, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [18, -18]), {
    stiffness: 300,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-18, 18]), {
    stiffness: 300,
    damping: 25,
  });
  const [hovered, setHovered] = useState(false);

  function onMove(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      initial={{ opacity: 0, y: 60, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.035, 0.65) }}
      className="group"
    >
      <div
        className="relative h-full min-h-[152px] rounded-3xl border border-violet-900/50 bg-zinc-950/90 backdrop-blur-xl p-6 overflow-hidden flex flex-col items-center justify-center transition-all duration-500"
        style={{
          boxShadow: hovered
            ? `0 0 40px ${skill.color}40, inset 0 0 25px ${skill.color}15`
            : "0 20px 40px rgba(0,0,0,0.6)",
        }}
      >
        {/* Purple Holographic Scan Line */}
        <motion.div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent"
          animate={{ y: hovered ? [0, 160] : [0, 0] }}
          transition={{
            duration: hovered ? 1.5 : 0,
            repeat: hovered ? Infinity : 0,
          }}
        />

        {/* Icon Container */}
        <motion.div
          animate={
            hovered ? { scale: 1.25, rotate: [-10, 10, 0] } : { scale: 1 }
          }
          transition={{ duration: 0.35 }}
          className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border"
          style={{
            background: `linear-gradient(145deg, ${skill.color}20, transparent)`,
            borderColor: `${skill.color}50`,
          }}
        >
          <skill.icon
            size={32}
            strokeWidth={1.8}
            style={{ color: skill.color }}
          />
        </motion.div>

        {/* Skill Name */}
        <h3 className="text-center font-semibold text-lg text-white tracking-tight">
          {skill.name}
        </h3>

        {/* Subtle Tag */}
        <div className="mt-3 text-[10px] font-mono text-violet-400/70 tracking-widest">
          INTEL_{String(index + 1).padStart(2, "0")}
        </div>

        {/* Hover Border Pulse */}
        {hovered && (
          <motion.div
            className="absolute inset-0 rounded-3xl border border-violet-400/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
        )}
      </div>
    </motion.div>
  );
}

// ── Main AI + Robotics Skills Section ─────────────────────────────────────
export default function RoboticsSkillsSection() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-black">
      {/* Subtle Futuristic Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#a855f780_0.8px,transparent_1px)] bg-[length:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-5xl sm:text-6xl font-black text-violet-500 tracking-[-2px]"
          >
            01
          </motion.div>
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              AI + ROBOTICS MATRIX
            </h2>
            <p className="text-violet-400/80 font-mono text-sm mt-1 tracking-widest">
              INTELLIGENT SYSTEMS
            </p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5 md:gap-6">
          {roboticsSkills.map((skill, i) => (
            <RoboticsSkillCard key={i} skill={skill} index={i} />
          ))}
        </div>

        {/* Bottom Accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.6, delay: 0.8 }}
          className="h-px w-full max-w-xs sm:max-w-md mx-auto mt-16 bg-gradient-to-r from-transparent via-violet-500/60 to-transparent"
        />
      </div>
    </section>
  );
}
