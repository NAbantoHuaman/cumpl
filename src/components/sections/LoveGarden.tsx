"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { gardenPhrases } from "@/data/garden-phrases";
import { useMounted } from "@/hooks/useMounted";

interface FlowerData {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  delay: number;
  color: string;
  phraseIndex: number;
}

const flowerColors = [
  { petal: "#FF2D78", center: "#D4A853" },
  { petal: "#FFB6C1", center: "#FF6B9D" },
  { petal: "#A855F7", center: "#FFB6C1" },
  { petal: "#FF6B9D", center: "#D4A853" },
  { petal: "#E8B4F8", center: "#FF2D78" },
  { petal: "#D4A853", center: "#A855F7" },
];

function Flower({
  flower,
  onBloom,
  bloomed,
}: {
  flower: FlowerData;
  onBloom: (id: number) => void;
  bloomed: boolean;
}) {
  const petalCount = 6;
  const color = flowerColors[flower.id % flowerColors.length];

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ left: `${flower.x}%`, top: `${flower.y}%` }}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: flower.scale, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: flower.delay, duration: 0.8, type: "spring" }}
      onClick={() => onBloom(flower.id)}
      data-cursor-hover
    >
      <motion.div
        className="relative w-16 h-16 md:w-20 md:h-20"
        animate={bloomed ? { scale: [1, 1.3, 1.1] } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Stem */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] h-8 origin-bottom"
          style={{
            background: "linear-gradient(to top, #2D5A1E, #4A8B2E)",
            animation: `wave ${3 + flower.delay}s ease-in-out infinite`,
          }}
        />

        {/* Petals */}
        {Array.from({ length: petalCount }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 rounded-full"
            style={{
              width: bloomed ? "14px" : "4px",
              height: bloomed ? "24px" : "8px",
              background: `radial-gradient(ellipse, ${color.petal}, ${color.petal}80)`,
              transformOrigin: "center bottom",
              transform: `translate(-50%, -100%) rotate(${i * (360 / petalCount) + flower.rotation}deg)`,
              boxShadow: bloomed ? `0 0 10px ${color.petal}60` : "none",
              transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        ))}

        {/* Center */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-10"
          style={{
            width: bloomed ? "12px" : "6px",
            height: bloomed ? "12px" : "6px",
            background: `radial-gradient(circle, ${color.center}, ${color.center}80)`,
            boxShadow: bloomed ? `0 0 15px ${color.center}80` : "none",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* Glow when bloomed */}
        {bloomed && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: "50px",
              height: "50px",
              background: `radial-gradient(circle, ${color.petal}30, transparent)`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2, opacity: [0, 0.5, 0] }}
            transition={{ duration: 1 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

export default function LoveGarden() {
  const [bloomedFlowers, setBloomedFlowers] = useState<Set<number>>(new Set());
  const [activePhrase, setActivePhrase] = useState<string | null>(null);
  const mounted = useMounted();

  const flowers: FlowerData[] = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: 8 + (i % 5) * 20 + (Math.sin(i * 1.5) * 5),
    y: 25 + Math.floor(i / 5) * 25 + (Math.cos(i * 2) * 8),
    scale: 0.8 + (Math.sin(i * 4.3) * 0.5 + 0.5) * 0.5,
    rotation: (Math.cos(i * 7.1) * 0.5 + 0.5) * 30,
    delay: i * 0.1,
    color: flowerColors[i % flowerColors.length].petal,
    phraseIndex: i % gardenPhrases.length,
  }));

  const handleBloom = useCallback(
    (id: number) => {
      if (bloomedFlowers.has(id)) return;
      setBloomedFlowers((prev) => new Set(prev).add(id));
      setActivePhrase(gardenPhrases[id % gardenPhrases.length]);

      // Particle burst
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 },
        colors: ["#FF2D78", "#FFB6C1", "#D4A853", "#A855F7"],
        gravity: 0.8,
        scalar: 0.8,
      });

      setTimeout(() => setActivePhrase(null), 4000);
    },
    [bloomedFlowers]
  );

  // Firefly particles
  const fireflies = mounted
    ? Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 5,
        size: 2 + Math.random() * 3,
      }))
    : [];

  return (
    <section className="relative w-full min-h-screen py-24 overflow-hidden" id="garden">
      {/* Dark mystical background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black-elegant via-purple-deep/20 to-black-elegant pointer-events-none" />

      {/* Header */}
      <div className="text-center relative z-20 px-4 mb-16">
        <motion.div
          className="text-gold-soft/40 text-lg mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          ❀
        </motion.div>
        <motion.h2
          className="text-4xl md:text-6xl font-serif text-pearl-white text-glow mb-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Jardín del Amor
        </motion.h2>
        <motion.p
          className="text-rose-pastel/50 text-sm md:text-base font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Toca cada flor y descubre una razón de mi amor
        </motion.p>
      </div>

      {/* Garden area */}
      <div className="relative w-full max-w-5xl mx-auto h-[60vh] md:h-[70vh]">
        {/* Fireflies */}
        {fireflies.map((f) => (
          <motion.div
            key={f.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`,
              width: f.size,
              height: f.size,
              background: "radial-gradient(circle, #D4A853, transparent)",
              boxShadow: "0 0 6px #D4A85380",
            }}
            animate={{
              opacity: [0, 0.8, 0],
              x: [0, (Math.random() - 0.5) * 40],
              y: [0, -20 - Math.random() * 30],
            }}
            transition={{
              duration: f.duration,
              repeat: Infinity,
              delay: f.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Sakura petals drifting */}
        {mounted &&
          Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`petal-${i}`}
              className="absolute text-rose-pastel/30 text-lg pointer-events-none"
              style={{ left: `${Math.random() * 100}%`, top: "-5%" }}
              animate={{
                y: ["0vh", "105vh"],
                x: [0, (Math.random() - 0.5) * 100],
                rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
              }}
              transition={{
                duration: 12 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear",
              }}
            >
              🌸
            </motion.div>
          ))}

        {/* Flowers */}
        {flowers.map((flower) => (
          <Flower
            key={flower.id}
            flower={flower}
            onBloom={handleBloom}
            bloomed={bloomedFlowers.has(flower.id)}
          />
        ))}

        {/* Active phrase display */}
        {activePhrase && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 bottom-4 md:bottom-8 z-30 w-full max-w-md px-4"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", bounce: 0.3 }}
          >
            <div className="glass-gold rounded-2xl p-6 text-center">
              <p className="font-serif text-lg md:text-xl text-pearl-white leading-relaxed">
                &ldquo;{activePhrase}&rdquo;
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Ground glow */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-deep/30 to-transparent pointer-events-none" />
    </section>
  );
}
