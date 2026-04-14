// components/software/ProjectsGrid.jsx
"use client";
import { motion } from "framer-motion";
import { softwareData } from "@/data/software";
import { GitBranch, ExternalLink } from "lucide-react";

export default function ProjectsGrid() {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
            FEATURED PROJECTS
          </h2>
          <p className="text-zinc-400 mt-4 max-w-md">
            Selected works that pushed boundaries
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {softwareData.projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Enhanced Animated Project Card ─────────────────────────────────
function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      whileHover={{ y: -12 }}
      className="group relative h-full"
    >
      <div className="glass-card relative h-full rounded-3xl border border-zinc-800/80 bg-zinc-950/80 backdrop-blur-2xl overflow-hidden transition-all duration-500 hover:border-software-accent/50">

        {/* 🔥 IMAGE SECTION */}
        <div className="relative w-full h-56 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5 }}
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-4">
            <a
              href={project.live}
              target="_blank"
              className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-software-accent hover:text-white transition"
            >
              Live
            </a>
            <a
              href={project.github}
              target="_blank"
              className="px-4 py-2 border border-white text-white text-sm rounded-lg hover:bg-white hover:text-black transition"
            >
              Code
            </a>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-bold text-white group-hover:text-software-accent transition-colors duration-300">
              {project.title}
            </h3>

            <div className="flex gap-4 text-zinc-400 group-hover:text-white transition-all">
              <motion.a
                href={project.github}
                target="_blank"
                whileHover={{ scale: 1.2, rotate: -12 }}
                whileTap={{ scale: 0.9 }}
                className="hover:text-software-accent transition-colors"
              >
                <GitBranch size={22} />
              </motion.a>
              <motion.a
                href={project.live}
                target="_blank"
                whileHover={{ scale: 1.2, rotate: 12 }}
                whileTap={{ scale: 0.9 }}
                className="hover:text-software-accent transition-colors"
              >
                <ExternalLink size={22} />
              </motion.a>
            </div>
          </div>

          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6 min-h-[80px]">
            {project.description}
          </p>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.05, y: -1 }}
                className="text-xs font-mono uppercase tracking-widest px-3.5 py-1.5 rounded-full 
                           bg-zinc-900/80 border border-zinc-700/80 text-zinc-300 
                           hover:border-software-accent/40 hover:text-software-accent transition-all duration-300"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Bottom Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-software-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

