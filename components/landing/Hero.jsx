"use client";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  GitBranch,
  Link2,
  MessageSquare,
  Mail,
  ExternalLink,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";

// ── Web Canvas (Spider-Web Network) ─────────────────────────────────────────────────────
function WebCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf,
      t = 0;
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);
    const nodes = Array.from({ length: 20 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));
    function draw() {
      t += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 240) {
            const alpha = (1 - dist / 240) * 0.16;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            const mx = (nodes[i].x + nodes[j].x) / 2 + Math.sin(t + i) * 12;
            const my = (nodes[i].y + nodes[j].y) / 2 + Math.cos(t + j) * 12;
            ctx.quadraticCurveTo(mx, my, nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(220,40,40,${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,70,70,0.4)";
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[5] pointer-events-none"
    />
  );
}

// ── Crack Lines ────────────────────────────────────────────────────
function CrackLines() {
  const cracks = [
    "M 0 0 L 160 200",
    "M 0 0 L 80 260",
    "M 0 0 L 240 130",
    "M 160 200 L 280 360",
  ];
  return (
    <svg className="absolute inset-0 w-full h-full z-[6] pointer-events-none">
      {cracks.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="rgba(220,40,40,0.22)"
          strokeWidth="1.2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: i * 0.15 }}
        />
      ))}
    </svg>
  );
}

// ── Animated 3D Social Card (Smaller + Themed) ─────────────────────────────────────────────────
function SocialCard3D({ href, icon: Icon, label, color, delay }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), {
    stiffness: 280,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), {
    stiffness: 280,
    damping: 20,
  });
  const [hov, setHov] = useState(false);

  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
    setHov(false);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 600,
      }}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
    >
      <motion.a
        href={href}
        target="_blank"
        rel="noreferrer"
        whileTap={{ scale: 0.94 }}
        className="group flex items-center gap-3.5 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl px-5 py-3.5 text-sm hover:bg-white/10 transition-all duration-300"
        style={{
          borderColor: hov ? color.border : "rgba(255,255,255,0.18)",
          boxShadow: hov ? `0 0 20px ${color.glow}` : "none",
        }}
      >
        <motion.div
          animate={hov ? { scale: 1.15, rotate: [-8, 8, 0] } : { scale: 1 }}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/30"
          style={{ background: hov ? color.iconBg : "rgba(255,255,255,0.08)" }}
        >
          <Icon
            className="h-4.5 w-4.5"
            style={{ color: hov ? color.icon : "#ccc" }}
          />
        </motion.div>

        <span className="font-semibold tracking-wide text-white group-hover:text-red-300 transition-colors">
          {label}
        </span>

        <motion.div className="ml-auto" animate={hov ? { x: 4 } : { x: 0 }}>
          <ExternalLink className="h-3.5 w-3.5 opacity-70" />
        </motion.div>
      </motion.a>
    </motion.div>
  );
}

// ── Spider Symbol ──────────────────────────────────────────────────
function SpiderSymbol() {
  return (
    <motion.div
      className="absolute right-8 top-1/3 -translate-y-1/2 z-10 pointer-events-none hidden xl:block"
      animate={{ y: [0, -20, 0], rotate: [0, 6, -6, 0] }}
      transition={{ duration: 6.5, repeat: Infinity }}
      style={{ opacity: 0.08 }}
    >
      <svg width="160" height="160" viewBox="0 0 100 100" fill="none">
        <ellipse
          cx="50"
          cy="50"
          rx="17"
          ry="27"
          stroke="#e11"
          strokeWidth="2"
        />
        <ellipse
          cx="50"
          cy="50"
          rx="27"
          ry="12"
          stroke="#e11"
          strokeWidth="2"
        />
        {[
          [-34, -24],
          [-42, -6],
          [-38, 15],
          [-27, 30],
          [34, -24],
          [42, -6],
          [38, 15],
          [27, 30],
        ].map(([dx, dy], i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={50 + dx}
            y2={50 + dy}
            stroke="#e11"
            strokeWidth="1.4"
          />
        ))}
        <circle cx="50" cy="50" r="4.5" fill="#e11" />
      </svg>
    </motion.div>
  );
}

// ── Animated Name Words ─────────────────────────────────────────────────
function AnimWord({ word, index }) {
  const dirs = [
    { x: -90, y: 0 },
    { x: 90, y: 0 },
    { x: 0, y: -70 },
    { x: 0, y: 70 },
  ];
  const dir = dirs[index % dirs.length];
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, x: dir.x, y: dir.y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.95, delay: 0.15 + index * 0.12 }}
      style={{ textShadow: "0 0 35px rgba(220, 30, 30, 0.85)" }}
    >
      {word}
    </motion.span>
  );
}

// ── Data ───────────────────────────────────────────────────────────
const nameLine1 = ["MD.", "SHIHABUL"];
const nameLine2 = ["ISLAM", "SHIHAB"];

const socials = [
  {
    href: "https://github.com/Shihab-004",
    icon: GitBranch,
    label: "GitHub",
    color: {
      icon: "#f0f6fc",
      border: "#f0f6fc",
      iconBg: "rgba(240,246,252,0.25)",
      glow: "rgba(240,246,252,0.5)",
    },
  },
  {
    href: "https://linkedin.com/in/shihab-ruet",
    icon: Link2,
    label: "LinkedIn",
    color: {
      icon: "#0ea5e9",
      border: "#0ea5e9",
      iconBg: "rgba(14,165,233,0.25)",
      glow: "rgba(14,165,233,0.5)",
    },
  },
  {
    href: "https://wa.me/+8801761732465",
    icon: MessageSquare,
    label: "WhatsApp",
    color: {
      icon: "#22c55e",
      border: "#22c55e",
      iconBg: "rgba(34,197,94,0.25)",
      glow: "rgba(34,197,94,0.5)",
    },
  },
  {
    href: "mailto:shihabul.islam.shihab.004@gmail.com",
    icon: Mail,
    label: "Email",
    color: {
      icon: "#f97316",
      border: "#f97316",
      iconBg: "rgba(249,115,22,0.25)",
      glow: "rgba(249,115,22,0.5)",
    },
  },
];

// ── Hero ───────────────────────────────────────────────────────────
export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center"
    >
      {/* Spiderman Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: "brightness(1.15) contrast(1.1) saturate(1.15)" }}
      >
        <source src="/vedios/your-vedio.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-black/30 via-black/50 to-black/85" />

      <WebCanvas />
      <CrackLines />
      <SpiderSymbol />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-20 w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-20"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Side - Name & Education */}
          <div className="lg:col-span-7 space-y-7">
            {/* name section: */}
            <div className="space-y-2 relative">
              {/* First Line: MD SHIHABUL */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[4.9rem] xl:text-[5.2rem] font-black leading-[0.92] tracking-[-0.04em] text-white">
                {nameLine1.map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-block mr-3">
                    {word.split("").map((letter, letterIndex) => (
                      <motion.span
                        key={letterIndex}
                        className="inline-block spiderman-name"
                        initial={{
                          opacity: 0,
                          y: 80,
                          rotateX: -25,
                          filter: "blur(8px)",
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          filter: "blur(0px)",
                        }}
                        transition={{
                          duration: 0.85,
                          delay: 0.25 + wordIndex * 0.2 + letterIndex * 0.04,
                          ease: [0.215, 0.61, 0.355, 1],
                        }}
                        whileHover={{
                          y: -4,
                          color: "#f87171",
                          transition: { duration: 0.2 },
                        }}
                        style={{
                          textShadow:
                            "0 0 40px rgba(248, 113, 113, 0.7), 0 0 80px rgba(185, 28, 28, 0.4)",
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </h1>

              {/* Second Line: ISLAM SHIHAB */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[4.9rem] xl:text-[5.2rem] font-black leading-[0.92] tracking-[-0.04em] text-white">
                {nameLine2.map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-block mr-3">
                    {word.split("").map((letter, letterIndex) => (
                      <motion.span
                        key={letterIndex}
                        className="inline-block spiderman-name"
                        initial={{
                          opacity: 0,
                          y: 80,
                          rotateX: -25,
                          filter: "blur(8px)",
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          filter: "blur(0px)",
                        }}
                        transition={{
                          duration: 0.85,
                          delay: 0.65 + wordIndex * 0.25 + letterIndex * 0.045,
                          ease: [0.215, 0.61, 0.355, 1],
                        }}
                        whileHover={{
                          y: -4,
                          color: "#f87171",
                          transition: { duration: 0.2 },
                        }}
                        style={{
                          textShadow:
                            "0 0 40px rgba(248, 113, 113, 0.7), 0 0 80px rgba(185, 28, 28, 0.4)",
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </h1>

              {/* Subtle animated underline glow under the full name */}
              <motion.div
                className="h-px w-48 bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto mt-3"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: 1,
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  scaleX: { delay: 1.8, duration: 1.4 },
                  opacity: { delay: 1.8, duration: 3, repeat: Infinity },
                }}
              />
            </div>
            {/* Highlighted Education */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              {/* — Degree block — */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                {/* Label chip */}
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "#ef4444",
                      flexShrink: 0,
                      boxShadow: "0 0 6px #ef4444",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "15px",
                      fontFamily: '"Geist Mono", "JetBrains Mono", monospace',
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "rgba(239,68,68,0.7)",
                    }}
                  >
                    B.Sc. In Mechatronics Engineering{" "}
                  </span>
                </motion.div>

                {/* University */}
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.48,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span
                    style={{
                      width: "18px",
                      height: "1px",
                      background: "rgba(239,68,68,0.5)",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "clamp(1.28rem, 2vw, 0.92rem)",
                      fontWeight: 900,
                      fontFamily: '"Inter", system-ui, sans-serif',
                      color: "#fca5a5",
                      letterSpacing: "0.01em",
                    }}
                  >
                    Rajshahi University of Engineering &amp; Technology
                  </span>
                </motion.div>
              </div>

              {/* — Thin separator — */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.55, ease: "easeOut" }}
                style={{
                  height: "1px",
                  maxWidth: "380px",
                  transformOrigin: "left",
                  background:
                    "linear-gradient(to right, rgba(239,68,68,0.5), rgba(239,68,68,0.08), transparent)",
                }}
              />

              {/* — College block — */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.65,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <span
                    style={{
                      fontSize: "15px",
                      fontFamily: '"Geist Mono", "JetBrains Mono", monospace',
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "rgba(96,165,250,0.65)",
                    }}
                  >
                    HSC · Science · 2020 — 2022
                  </span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span
                    style={{
                      width: "18px",
                      height: "1px",
                      background: "rgba(96,165,250,0.4)",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "clamp(1.28rem, 2vw, 0.92rem)",
                      fontWeight: 900,
                      fontFamily: '"Inter", system-ui, sans-serif',
                      color: "#93c5fd",
                      letterSpacing: "0.01em",
                    }}
                  >
                    Notre Dame College, Dhaka
                  </span>
                </div>
              </motion.div>

              {/* — Thin separator — */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.78, duration: 0.5, ease: "easeOut" }}
                style={{
                  height: "1px",
                  maxWidth: "380px",
                  transformOrigin: "left",
                  background:
                    "linear-gradient(to right, rgba(96,165,250,0.35), rgba(96,165,250,0.05), transparent)",
                }}
              />

              {/* — Description — */}
              <motion.p style={{ margin: 0, lineHeight: 1.6 }}>
                {[
                  "Building",
                  "immersive",
                  "systems",
                  "where",
                  "hardware",
                  "intelligence",
                  "meets",
                  "scalable",
                  "software.",
                ].map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.9 + i * 0.065,
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      display: "inline-block",
                      marginRight: "0.28em",
                      fontSize: "clamp(0.8rem, 1.8vw, 0.93rem)",
                      fontFamily: '"Inter", system-ui, sans-serif',
                      fontWeight: [
                        "hardware",
                        "intelligence",
                        "scalable",
                        "software.",
                      ].includes(word)
                        ? 600
                        : 400,
                      color: [
                        "hardware",
                        "intelligence",
                        "scalable",
                        "software.",
                      ].includes(word)
                        ? "#fca5a5"
                        : "#71717a",
                      textShadow: [
                        "hardware",
                        "intelligence",
                        "scalable",
                        "software.",
                      ].includes(word)
                        ? "0 0 8px rgba(239,68,68,0.35)"
                        : "none",
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ delay: 1.6, duration: 0.9, repeat: Infinity }}
                  style={{
                    display: "inline-block",
                    width: "2px",
                    height: "0.8em",
                    background: "#ef4444",
                    marginLeft: "2px",
                    verticalAlign: "middle",
                    borderRadius: "1px",
                  }}
                />
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-3">
              <motion.a
                href="#work"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="group relative overflow-hidden rounded-full 
             bg-gradient-to-br from-red-600 via-red-700 to-black 
             px-10 py-4 text-sm font-black uppercase tracking-[3px] 
             text-white border-2 border-red-400/70 
             shadow-2xl shadow-red-600/60 
             flex items-center justify-center gap-3
             transition-all duration-300"
                // Extra Framer Motion animations
                initial={{ boxShadow: "0 0 20px rgba(185, 28, 28, 0.4)" }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(185, 28, 28, 0.4)",
                    "0 0 40px rgba(185, 28, 28, 0.7)",
                    "0 0 20px rgba(185, 28, 28, 0.4)",
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Spider-Man Web Pattern Background */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff12_1px,transparent_1px)] bg-[length:6px_6px] opacity-30 group-hover:opacity-50 transition-opacity" />

                {/* Glowing Spider Icon / Web Accent */}
                <span className="relative z-10 flex items-center gap-2">
                  🕷️
                  <span>Explore Work</span>
                </span>

                {/* Animated Shine / Energy Layer on Hover */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                  -translate-x-full group-hover:-translate-x-0 transition-transform duration-700"
                />

                {/* Subtle web lines that appear on hover */}
                <motion.div
                  className="absolute inset-0 border border-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Extra glow pulse on hover */}
                <motion.div
                  className="absolute -inset-[2px] rounded-full border border-red-400/40 opacity-0 group-hover:opacity-70 pointer-events-none"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
              </motion.a>
            </div>
          </div>
 
 {/* connect section: */}
          {/* Modern Floating Social Icons with Hover Name */}
<div className="lg:col-span-5 flex justify-center lg:justify-end items-start pt-8 lg:pt-0">
  <div className="flex flex-col items-center lg:items-end gap-8">
    
    {/* Subtle Connect Label */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      className="flex items-center gap-3"
    >
      <div className="h-px w-6 bg-gradient-to-r from-transparent to-violet-400" />
      <span className="text-xs font-mono tracking-[2px] text-white/40 uppercase">CONNECT</span>
      <div className="h-px w-6 bg-gradient-to-l from-transparent to-violet-400" />
    </motion.div>

    {/* Social Icons Grid */}
    <div className="flex flex-wrap gap-5 justify-center lg:justify-end">
      {socials.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.1 + idx * 0.08 }}
          whileHover={{ y: -6, scale: 1.08 }}
          className="relative group"
        >
          <motion.a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="block w-20 h-20 rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-300 hover:border-red-500/60 hover:bg-zinc-900/90 shadow-lg"
            whileTap={{ scale: 0.92 }}
          >
            {/* Icon */}
            <motion.div
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.25, rotate: [-8, 8, 0] }}
              transition={{ type: "spring", stiffness: 400 }}
              className="mb-1.5"
            >
              <item.icon 
                size={28} 
                style={{ color: item.color || '#e2e8f0' }} 
                className="transition-colors group-hover:scale-110" 
              />
            </motion.div>

            {/* Hover Name Reveal */}
            <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <div className="bg-zinc-900 text-white text-xs font-medium px-4 py-1.5 rounded-xl whitespace-nowrap shadow-xl border border-white/10">
                {item.label}
              </div>
            </div>
          </motion.a>
        </motion.div>
      ))}
    </div>
  </div>
</div>
          
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1"
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 1.7, repeat: Infinity }}
          className="w-px h-7 bg-gradient-to-b from-transparent via-red-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}
