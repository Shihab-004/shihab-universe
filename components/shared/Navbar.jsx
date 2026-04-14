'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Home, Code2, Bot, ExternalLink, Link2, MessageSquare, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-2xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        
        {/* Left Side - Logo + Nav Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="hover:scale-110 transition-transform bg-white/10 p-2.5 rounded-full">
            <Home size={24} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/software" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
              <Code2 size={19} />
              Software
            </Link>
            <Link href="/robotics" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
              <Bot size={19} />
              Robotics
            </Link>
          </div>
        </div>

        {/* Right Side - Social Icons */}
        <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center gap-5 text-zinc-400">
            <a href="https://github.com/Shihab-004" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <ExternalLink size={20} />
            </a>
            <a href="https://linkedin.com/in/shihab-ruet" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
              <Link2 size={20} />
            </a>
            <a href="mailto:shihabul.islam.shihab.004@gmail.com" className="hover:text-green-400 transition-colors">
              <MessageSquare size={20} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-zinc-950/95 backdrop-blur-2xl"
          >
            <div className="px-6 py-8 flex flex-col gap-6 text-lg">
              <Link 
                href="/software" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 py-3 text-zinc-300 hover:text-white transition-colors"
              >
                <Code2 size={26} />
                Software
              </Link>
              <Link 
                href="/robotics" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 py-3 text-zinc-300 hover:text-white transition-colors"
              >
                <Bot size={26} />
                Robotics
              </Link>

              {/* Social Links in Mobile */}
              <div className="pt-6 border-t border-white/10 flex gap-6">
                <a href="https://github.com/Shihab-004" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-blue-400">
                  <ExternalLink size={26} />
                </a>
                <a href="https://linkedin.com/in/shihab-ruet" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-blue-600">
                  <Link2 size={26} />
                </a>
                <a href="mailto:shihabul.islam.shihab.004@gmail.com" className="text-zinc-400 hover:text-green-400">
                  <MessageSquare size={26} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}