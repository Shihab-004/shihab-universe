"use client";
import { motion } from "framer-motion";
import { ExternalLink, GitBranch, ArrowRight } from "lucide-react";
import { roboticsData } from "@/data/robotics";

export default function ProjectsGrid() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-black">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#a855f780_1px,transparent_1px)] bg-[length:45px_45px]" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 text-xs sm:text-sm font-mono tracking-[3px] text-violet-400 mb-3"
          >
            DEPLOYED_INTELLIGENCE
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            HARDWARE NODES
          </h2>
          <p className="text-violet-400/70 font-mono text-sm mt-2">
            AI × ROBOTICS PROJECTS
          </p>
        </div>

        {/* Responsive Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {roboticsData.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.7 }}
              whileHover={{ y: -8 }}
              className="group relative bg-zinc-950 border border-violet-900/50 rounded-3xl overflow-hidden flex flex-col h-full hover:border-violet-500/60 transition-all duration-500"
            >
              {/* Project Visual */}
              <div className="relative h-52 sm:h-60 overflow-hidden bg-zinc-900">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 via-fuchsia-600/20 to-transparent z-10" />

                {/* Placeholder Image / Icon */}
                <div className="w-full h-full flex items-center justify-center text-7xl sm:text-8xl transition-transform duration-700 group-hover:scale-110">
                  {project.image || "🤖"}
                </div>

                {/* Top Holographic Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400" />
              </div>

              {/* Content Area */}
              <div className="flex-1 p-6 sm:p-7 flex flex-col">
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-violet-300 transition-colors duration-300 leading-tight">
                  {project.title}
                </h3>

                <p className="text-zinc-400 mt-3 text-sm sm:text-base leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] sm:text-xs font-mono px-3 py-1 bg-violet-950/70 border border-violet-500/30 text-violet-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-violet-900/40">
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 text-violet-400 hover:text-white transition-all"
                    >
                      <GitBranch size={18} />
                      <span className="text-sm font-medium">Source</span>
                    </motion.a>
                  )}

                  {project.live && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 text-violet-400 hover:text-white transition-all ml-auto"
                    >
                      <span className="text-sm font-medium">Live Project</span>
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Hover Glow Effect */}
              <motion.div className="absolute inset-0 rounded-3xl border border-violet-400/30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
