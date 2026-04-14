// components/landing/SplitScreenHero.jsx
'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { Bot, CodeXml } from 'lucide-react';

// ── Mini Web Threads ───────────────────────────────────────────────
function MiniWeb({ accent }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" xmlns="http://www.w3.org/2000/svg">
      {[
        ["M0,0 Q80,60 160,20"],
        ["M0,40 Q100,100 200,60"],
        ["M20,0 Q60,80 120,140"],
        ["M160,0 Q100,80 40,160"],
        ["M0,100 Q120,60 200,140"],
      ].map(([d], i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke={accent}
          strokeWidth="0.8"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.2, delay: 0.1 + i * 0.2, repeat: Infinity, repeatType: "reverse" }}
        />
      ))}
    </svg>
  );
}

// ── Enhanced 3D Tilt Card ───────────────────────────────────────────
function TiltCard({ children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 280, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 280, damping: 22 });

  function onMove(e) {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Enhanced Glitch Text ───────────────────────────────────────────
function GlitchText({ text, accent }) {
  const [glitch, setGlitch] = useState(false);

  return (
    <span
      className="relative inline-block font-black text-white cursor-default select-none"
      onMouseEnter={() => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 600);
      }}
    >
      {glitch && (
        <>
          <span className="absolute inset-0 text-red-400" style={{ clipPath: 'inset(20% 0 60% 0)', transform: 'translate(-4px, 2px)' }}>{text}</span>
          <span className="absolute inset-0 text-white" style={{ clipPath: 'inset(40% 0 30% 0)', transform: 'translate(4px, -2px)' }}>{text}</span>
        </>
      )}
      <span className="relative">{text}</span>
    </span>
  );
}

// ── Floating Particles ─────────────────────────────────────────────
function Particles({ accent }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[28px]">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: i % 3 === 0 ? 4 : 2.5,
            height: i % 3 === 0 ? 4 : 2.5,
            background: accent,
            left: `${15 + (i % 5) * 14}%`,
            top: `${20 + Math.floor(i / 3) * 22}%`,
          }}
          animate={{
            y: [0, -35, 0],
            opacity: [0.3, 0.9, 0.3],
            scale: [0.8, 1.3, 0.8]
          }}
          transition={{
            duration: 2.8 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}

// ── Data ───────────────────────────────────────────────────────────
const worlds = [
  {
    id: 'software',
    name: 'Software',
    tag: 'Web & Backend Systems',
    icon: CodeXml,
    path: '/software',
    accent: '#ff3b3b',
    accentDim: 'rgba(255, 59, 59, 0.08)',
    accentBorder: 'rgba(255, 59, 59, 0.45)',
    skills: ['Next.js', 'Node.js', 'PostgreSQL', 'Tailwind'],
    stat: '3+ Projects',
  },
  {
    id: 'robotics',
    name: 'Robotics AI',
    tag: 'Intelligence & Hardware',
    icon: Bot,
    path: '/robotics',
    accent: '#ff3b3b',
    accentDim: 'rgba(255, 59, 59, 0.07)',
    accentBorder: 'rgba(255, 59, 59, 0.4)',
    skills: ['ROS2', 'Python', 'SLAM', 'OpenCV'],
    stat: '3+ Systems',
  },
];

// ── Header ─────────────────────────────────────────────────────────
const headerWords = [
  { word: 'Explore', from: { x: -80, y: 0 } },
  { word: 'My', from: { x: 0, y: -50 } },
  { word: 'Worlds', from: { x: 80, y: 0 } },
];

// ── Main Component ─────────────────────────────────────────────────
export default function SplitScreenHero() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="work" className="relative z-10 w-full px-4 pb-20 pt-8 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-mono uppercase tracking-[0.5em] text-red-400/70"
        >
          — CHOOSE YOUR UNIVERSE —
        </motion.p>

        <h2 className="mt-6 text-5xl font-black leading-none text-white sm:text-6xl lg:text-7xl">
          {headerWords.map((w, i) => (
            <motion.span
              key={i}
              className="inline-block mr-4"
              style={{ textShadow: '0 0 40px rgba(255,59,59,0.5)' }}
              initial={{ opacity: 0, x: w.from.x, y: w.from.y }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1 + i * 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              {w.word}
            </motion.span>
          ))}
        </h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mx-auto mt-8 h-px w-40"
          style={{ background: 'linear-gradient(to right, transparent, #ff3b3b, transparent)' }}
        />
      </div>

      {/* Cards Grid */}
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
        {worlds.map((world, index) => {
          const Icon = world.icon;
          const isHov = hovered === world.id;

          return (
            <motion.div
              key={world.id}
              initial={{ opacity: 0, y: 60, rotate: index === 0 ? -4 : 4 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.4 + index * 0.2, duration: 0.9 }}
            >
              <TiltCard className="h-full">
                <Link
                  href={world.path}
                  onMouseEnter={() => setHovered(world.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="group relative block h-full overflow-hidden rounded-3xl border p-8 transition-all duration-500"
                  style={{
                    background: isHov ? world.accentDim : 'rgba(10, 8, 8, 0.85)',
                    borderColor: isHov ? world.accentBorder : 'rgba(255,255,255,0.1)',
                    boxShadow: isHov 
                      ? `0 0 60px rgba(255,59,59,0.25), inset 0 0 40px rgba(255,59,59,0.08)` 
                      : '0 30px 80px rgba(0,0,0,0.4)',
                  }}
                >
                  <MiniWeb accent={world.accent} />
                  {isHov && <Particles accent={world.accent} />}

                  {/* Icon + Stat */}
                  <div className="flex items-start justify-between">
                    <motion.div
                      animate={isHov ? { scale: 1.15, rotate: [-12, 12, 0] } : { scale: 1 }}
                      className="flex h-16 w-16 items-center justify-center rounded-2xl border"
                      style={{
                        borderColor: world.accentBorder,
                        background: world.accentDim,
                        color: world.accent,
                      }}
                    >
                      <Icon size={32} strokeWidth={1.5} />
                    </motion.div>

                    <motion.span
                      animate={isHov ? { scale: 1.1, color: '#fff' } : {}}
                      className="rounded-full border border-white/10 bg-white/5 px-5 py-1.5 text-xs font-mono uppercase tracking-widest"
                    >
                      {world.stat}
                    </motion.span>
                  </div>

                  {/* Title & Tag */}
                  <div className="mt-10">
                    <h3 className="text-4xl font-black leading-none tracking-tight">
                      <GlitchText text={world.name} accent={world.accent} />
                    </h3>
                    <p className="mt-3 text-zinc-400 text-[15px]">{world.tag}</p>
                  </div>

                  {/* Skills */}
                  <div className="mt-8 flex flex-wrap gap-2">
                    {world.skills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isHov ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.9 }}
                        transition={{ delay: 0.6 + i * 0.07 }}
                        className="rounded-full border px-4 py-1 text-xs font-mono tracking-wide"
                        style={{
                          borderColor: isHov ? world.accentBorder : 'rgba(255,255,255,0.1)',
                          color: isHov ? world.accent : '#a1a1aa',
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-12 flex items-center justify-between border-t pt-6" 
                    style={{ borderColor: isHov ? world.accentBorder : 'rgba(255,255,255,0.08)' }}>
                    <motion.span
                      animate={isHov ? { x: 8, color: world.accent } : { x: 0 }}
                      className="text-xs font-mono uppercase tracking-[2px]"
                    >
                      {isHov ? 'ENTER THE WORLD' : 'EXPLORE'}
                    </motion.span>

                    <motion.div
                      animate={isHov ? { x: 10, rotate: -45 } : { x: 0 }}
                      className="text-2xl font-light"
                      style={{ color: isHov ? world.accent : '#ddd' }}
                    >
                      →
                    </motion.div>
                  </div>

                  {/* Bottom Neon Line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-px w-full"
                    style={{ background: `linear-gradient(to right, transparent, ${world.accent}, transparent)` }}
                    initial={{ scaleX: 0 }}
                    animate={isHov ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                </Link>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}