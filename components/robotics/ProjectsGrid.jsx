"use client";

import { motion } from "framer-motion";
import { GitBranch, ArrowRight } from "lucide-react";
import Image from "next/image";
import { roboticsData } from "@/data/robotics";

export default function ProjectsGrid() {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#a855f780_1px,transparent_1px)] bg-[length:45px_45px]" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-mono tracking-[3px] text-violet-400 mb-2">
            DEPLOYED_INTELLIGENCE
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            HARDWARE NODES
          </h2>
          <p className="text-violet-400/70 font-mono text-sm mt-2">
            AI × ROBOTICS PROJECTS
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roboticsData.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
              whileHover={{ y: -6 }}
              className="group bg-zinc-950 border border-violet-900/40 rounded-2xl overflow-hidden hover:border-violet-500/60 transition-all duration-400"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 via-fuchsia-600/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col justify-between h-[220px]">
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-violet-300 transition">
                    {project.title}
                  </h3>

                  <p className="text-zinc-400 text-sm mt-2 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-1 bg-violet-950/70 border border-violet-500/30 text-violet-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-violet-900/30">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      className="flex items-center gap-1 text-violet-400 hover:text-white text-sm"
                    >
                      <GitBranch size={16} />
                      Source
                    </a>
                  )}

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      className="flex items-center gap-1 text-violet-400 hover:text-white text-sm"
                    >
                      Live
                      <ArrowRight size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}