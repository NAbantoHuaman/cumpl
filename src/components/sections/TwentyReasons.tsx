"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { reasons } from "@/data/reasons";

function ReasonCard({ reason, index }: { reason: (typeof reasons)[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="perspective-1000 w-full aspect-[3/4] cursor-pointer"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.8,
        delay: (index % 4) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={() => setIsFlipped(!isFlipped)}
      data-cursor-hover
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden rounded-2xl glass overflow-hidden group hover:shadow-[0_0_30px_rgba(212,168,83,0.15)] transition-shadow duration-500">
          {/* Gradient accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-intense via-gold-soft to-purple-glow opacity-60" />

          {/* Corner glow */}
          <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-rose-intense/10 blur-[30px] group-hover:bg-rose-intense/20 transition-colors duration-500" />

          <div className="flex flex-col items-center justify-center h-full p-5 text-center">
            {/* Number */}
            <span className="text-5xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-rose-intense to-gold-soft mb-3 font-bold">
              {reason.id}
            </span>

            {/* Decorative line */}
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gold-soft/50 to-transparent mb-3" />

            {/* Hint */}
            <span className="text-pearl-white/30 text-xs tracking-widest uppercase">
              Toca para descubrir
            </span>
          </div>

          {/* Bottom border accent */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-soft/20 to-transparent" />
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl glass-strong overflow-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-intense/10 via-transparent to-purple-deep/20" />

          {/* Corner glows */}
          <div className="absolute -top-8 -left-8 w-20 h-20 rounded-full bg-rose-intense/15 blur-[25px]" />
          <div className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full bg-gold-soft/15 blur-[25px]" />

          <div className="flex flex-col items-center justify-center h-full p-5 text-center relative z-10">
            {/* Icon */}
            <span className="text-3xl mb-4">{reason.icon}</span>

            {/* Reason text */}
            <p className="font-serif text-sm md:text-base text-pearl-white leading-relaxed">
              {reason.text}
            </p>

            {/* Number tag */}
            <div className="mt-4 px-3 py-1 rounded-full bg-gold-soft/10 border border-gold-soft/20">
              <span className="text-gold-soft text-xs">#{reason.id}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TwentyReasons() {
  return (
    <section className="relative w-full py-24 md:py-32 px-4" id="reasons">
      {/* Section header */}
      <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
        <motion.div
          className="text-gold-soft/40 text-lg mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          ♡
        </motion.div>
        <motion.h2
          className="text-4xl md:text-6xl font-serif text-pearl-white text-glow-gold mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          20 Razones Por Las Que Te Amo
        </motion.h2>
        <motion.p
          className="text-rose-pastel/50 text-sm md:text-base font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Cada tarjeta guarda una razón. Toca para descubrir.
        </motion.p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5 max-w-6xl mx-auto">
        {reasons.map((reason, i) => (
          <ReasonCard key={reason.id} reason={reason} index={i} />
        ))}
      </div>
    </section>
  );
}
