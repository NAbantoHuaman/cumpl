"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, ChevronDown } from "lucide-react";

const lines = [
  { text: "Hoy celebramos 20 años", delay: 0.5 },
  { text: "de una persona extraordinaria.", delay: 2.5 },
  { text: "Feliz cumpleaños, mi amor.", delay: 5 },
  { text: "Gracias por existir.", delay: 7.5 },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <motion.section
      ref={containerRef}
      className="relative w-full h-[110vh] flex flex-col items-center justify-center overflow-hidden"
      style={{ opacity }}
      id="hero"
    >
      {/* Ambient glow orbs */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ scale, y }}
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] md:w-[35vw] md:h-[35vw] rounded-full bg-purple-deep/40 blur-[120px]" />
        <div className="absolute top-1/2 left-1/3 w-[50vw] h-[50vw] md:w-[25vw] md:h-[25vw] rounded-full bg-rose-intense/15 blur-[100px] mix-blend-screen" />
        <div className="absolute top-1/2 right-1/3 w-[40vw] h-[40vw] md:w-[20vw] md:h-[20vw] rounded-full bg-gold-soft/10 blur-[80px] mix-blend-screen" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        {/* Decorative sparkle */}
        <motion.div
          className="text-gold-soft/60 text-2xl mb-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="inline-block"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            ✦
          </motion.span>
        </motion.div>

        {/* Text sequence */}
        {lines.map((line, lineIndex) => (
          <motion.div
            key={lineIndex}
            className={`overflow-hidden ${lineIndex === 2 ? "mt-8" : lineIndex === 3 ? "mt-4" : "mt-1"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: line.delay, duration: 0.01 }}
          >
            <motion.h1
              className={`font-serif leading-tight ${
                lineIndex === 2
                  ? "text-4xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-rose-intense via-rose-pastel to-gold-soft text-glow"
                  : lineIndex === 3
                  ? "text-xl md:text-3xl text-rose-pastel/70 font-light italic"
                  : "text-2xl md:text-4xl lg:text-5xl text-pearl-white"
              }`}
              initial={{ y: 80, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{
                delay: line.delay,
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {line.text}
            </motion.h1>
          </motion.div>
        ))}

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 9.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16"
        >
          <button
            className="group relative px-10 py-4 rounded-full glass-gold text-pearl-white font-sans tracking-[0.2em] uppercase text-xs overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,168,83,0.3)]"
            onClick={() => {
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
            }}
            data-cursor-hover
          >
            {/* Gradient sweep on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-rose-intense/20 to-gold-soft/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 flex items-center gap-3">
              Comenzar el viaje{" "}
              <Heart className="w-4 h-4 text-rose-intense group-hover:scale-125 transition-transform" />
            </span>
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 10, duration: 1 }}
      >
        <span className="text-pearl-white/30 text-[10px] tracking-[0.3em] uppercase">
          Desliza
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-pearl-white/30" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
