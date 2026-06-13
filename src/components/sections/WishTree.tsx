"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wishTreeMessages } from "@/data/wish-tree";
import { useMounted } from "@/hooks/useMounted";
import confetti from "canvas-confetti";

interface Leaf {
  id: number;
  x: number;
  y: number;
  delay: number;
  message: string;
}

function HeartLeaf({
  leaf,
  onReveal,
  revealed,
}: {
  leaf: Leaf;
  onReveal: (id: number) => void;
  revealed: boolean;
}) {
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ left: `${leaf.x}%`, top: `${leaf.y}%` }}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: leaf.delay, duration: 0.6, type: "spring" }}
    >
      <motion.div
        className="relative"
        animate={{
          y: [0, -5, 0, 3, 0],
          rotate: [0, 2, -2, 1, 0],
        }}
        transition={{
          duration: 4 + leaf.delay * 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        onClick={() => onReveal(leaf.id)}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        data-cursor-hover
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          className={`transition-all duration-500 drop-shadow-[0_0_8px_rgba(255,45,120,0.5)] ${
            revealed ? "opacity-40" : ""
          }`}
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={revealed ? "#D4A853" : "#FF2D78"}
            opacity={revealed ? 0.6 : 0.9}
          />
        </svg>
        {!revealed && (
          <motion.div
            className="absolute inset-0"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="none"
                stroke="#FF2D78"
                strokeWidth="0.5"
                opacity={0.4}
              />
            </svg>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function WishTree() {
  const [revealedLeaves, setRevealedLeaves] = useState<Set<number>>(new Set());
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const mounted = useMounted();

  const leaves: Leaf[] = wishTreeMessages.map((msg, i) => ({
    id: i,
    x: Number((15 + (i % 5) * 17 + (Math.sin(i * 1.7) * 3)).toFixed(2)),
    y: Number((8 + Math.floor(i / 5) * 22 + (Math.cos(i * 2.3) * 4)).toFixed(2)),
    delay: i * 0.08,
    message: msg,
  }));

  const handleReveal = useCallback(
    (id: number) => {
      if (revealedLeaves.has(id)) return;
      setRevealedLeaves((prev) => new Set(prev).add(id));
      setActiveMessage(wishTreeMessages[id]);

      confetti({
        particleCount: 20,
        spread: 40,
        origin: { y: 0.5 },
        colors: ["#FF2D78", "#D4A853", "#A855F7"],
        gravity: 1.2,
        scalar: 0.6,
      });

      setTimeout(() => setActiveMessage(null), 4000);
    },
    [revealedLeaves]
  );

  return (
    <section className="relative w-full min-h-screen py-24 overflow-hidden" id="wish-tree">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black-elegant via-purple-deep/15 to-black-elegant" />

      {/* Header */}
      <div className="text-center relative z-20 px-4 mb-8">
        <motion.div
          className="text-gold-soft/40 text-lg mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          🌳
        </motion.div>
        <motion.h2
          className="text-4xl md:text-6xl font-serif text-pearl-white text-glow mb-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Árbol de los Deseos
        </motion.h2>
        <motion.p
          className="text-rose-pastel/50 text-sm font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Cada corazón guarda un deseo para ti
        </motion.p>
      </div>

      {/* Tree structure (SVG) */}
      <div className="relative w-full max-w-5xl mx-auto h-[65vh] md:h-[70vh]">
        {/* Tree trunk and branches SVG */}
        <svg
          viewBox="0 0 400 500"
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          preserveAspectRatio="xMidYMax meet"
        >
          <defs>
            <linearGradient id="trunkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4A2D1A" />
              <stop offset="100%" stopColor="#2A1A0A" />
            </linearGradient>
            <filter id="treeGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Trunk */}
          <path
            d="M190 500 L195 350 Q200 300 195 280 L200 250 Q205 230 200 200"
            stroke="url(#trunkGrad)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M210 500 L205 350 Q200 300 205 280 L200 250 Q195 230 200 200"
            stroke="url(#trunkGrad)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />

          {/* Branches */}
          {[
            "M200 280 Q160 250 120 230",
            "M200 280 Q240 250 280 230",
            "M200 240 Q150 210 100 200",
            "M200 240 Q250 210 300 200",
            "M200 220 Q170 180 130 160",
            "M200 220 Q230 180 270 160",
            "M200 200 Q160 160 120 140",
            "M200 200 Q240 160 280 140",
            "M200 200 Q200 150 180 110",
            "M200 200 Q200 150 220 110",
          ].map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="#3D2415"
              strokeWidth={4 - i * 0.2}
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
            />
          ))}

          {/* Glowing accents on branches */}
          {[
            [120, 230],
            [280, 230],
            [100, 200],
            [300, 200],
            [130, 160],
            [270, 160],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="3"
              fill="#D4A853"
              opacity="0.3"
              filter="url(#treeGlow)"
            />
          ))}
        </svg>

        {/* Twinkling lights */}
        {mounted &&
          Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`light-${i}`}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${10 + Math.random() * 50}%`,
                width: 3 + Math.random() * 3,
                height: 3 + Math.random() * 3,
                background: i % 3 === 0 ? "#D4A853" : "#FFB6C1",
                boxShadow: `0 0 8px ${i % 3 === 0 ? "#D4A853" : "#FFB6C1"}60`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}

        {/* Heart leaves */}
        {leaves.map((leaf) => (
          <HeartLeaf
            key={leaf.id}
            leaf={leaf}
            onReveal={handleReveal}
            revealed={revealedLeaves.has(leaf.id)}
          />
        ))}

        {/* Active message */}
        <AnimatePresence>
          {activeMessage && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-4 z-30 w-full max-w-md px-4"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", bounce: 0.3 }}
            >
              <div className="glass-gold rounded-2xl p-6 text-center">
                <p className="font-serif text-base md:text-lg text-pearl-white leading-relaxed">
                  ✨ {activeMessage}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ground moss glow */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-purple-deep/20 to-transparent pointer-events-none" />
    </section>
  );
}
