"use client";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  Layers,
  Triangle,
  Code2,
  Braces,
  Server,
  Terminal,
  Database,
  Cylinder,
  GitBranch,
  Box,
  Activity,
  PenTool,
} from "lucide-react";
import { useRef, useState } from "react";

const skills = [
  { name: "React", icon: Layers, color: "#67e8f9" },
  { name: "Next.js", icon: Triangle, color: "#e2e8f0" },
  { name: "TypeScript", icon: Code2, color: "#a78bfa" },
  { name: "JavaScript", icon: Braces, color: "#fbbf24" },
  { name: "Node.js", icon: Server, color: "#34d399" },
  { name: "Python", icon: Terminal, color: "#60a5fa" },
  { name: "PostgreSQL", icon: Database, color: "#f472b6" },
  { name: "MongoDB", icon: Cylinder, color: "#4ade80" },
  { name: "Git", icon: GitBranch, color: "#fb923c" },
  { name: "Data Structures", icon: Box, color: "#f87171" },
  { name: "Algorithms", icon: Activity, color: "#fbbf24" },
  { name: "DBMS", icon: PenTool, color: "#34d399" },
];

// ── 3D Responsive Skill Card ─────────────────────────────────────
function SkillCard({ skill, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [16, -16]), {
    stiffness: 280,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-16, 16]), {
    stiffness: 280,
    damping: 24,
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
      transition={{ duration: 0.6, delay: Math.min(index * 0.035, 0.6) }}
      className="group"
    >
      <div
        className="relative h-full min-h-[148px] sm:min-h-[160px] rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl p-5 sm:p-6 overflow-hidden transition-all duration-500 flex flex-col items-center justify-center"
        style={{
          boxShadow: hovered
            ? `0 0 35px ${skill.color}30, inset 0 0 20px ${skill.color}10`
            : "0 15px 35px rgba(0,0,0,0.5)",
        }}
      >
        {/* Holographic Scan Line */}
        <motion.div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{ y: hovered ? [0, 160] : [0, 0] }}
          transition={{
            duration: hovered ? 1.6 : 0,
            repeat: hovered ? Infinity : 0,
          }}
        />

        {/* Icon Container */}
        <motion.div
          animate={hovered ? { scale: 1.22, rotate: [-8, 8, 0] } : { scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border"
          style={{
            background: `linear-gradient(145deg, ${skill.color}15, transparent)`,
            borderColor: `${skill.color}40`,
          }}
        >
          <skill.icon
            size={28}
            strokeWidth={1.7}
            style={{ color: skill.color }}
          />
        </motion.div>

        {/* Skill Name */}
        <h3 className="text-center font-semibold text-base sm:text-lg text-white tracking-tight leading-tight">
          {skill.name}
        </h3>

        {/* Terminal Code */}
        <div className="mt-2 text-[10px] font-mono text-zinc-500 tracking-widest">
          SKILL_{String(index + 1).padStart(2, "0")}
        </div>

        {/* Hover Glow */}
        {hovered && (
          <motion.div
            className="absolute inset-0 rounded-3xl border border-cyan-400/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
    </motion.div>
  );
}

// ── Main Skills Section ─────────────────────────────────────────────
export default function SkillsSection() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Subtle Matrix Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(#22d3ee_0.6px,transparent_1px)] bg-[length:30px_30px]" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-6 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-5xl sm:text-6xl font-black text-cyan-400 tracking-[-2px]"
          >
            01
          </motion.div>
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              TECHNICAL MATRIX
            </h2>
            <p className="text-zinc-400 font-mono text-sm mt-1">
              CORE COMPETENCIES v2.4
            </p>
          </div>
        </div>

        {/* Responsive Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5 md:gap-6">
          {skills.map((skill, i) => (
            <SkillCard key={i} skill={skill} index={i} />
          ))}
        </div>

        {/* Bottom Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="h-px w-full max-w-xs sm:max-w-md mx-auto mt-16 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
        />
      </div>
    </section>
  );
}
