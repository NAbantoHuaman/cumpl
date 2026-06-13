"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { timelineEvents } from "@/data/timeline";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 md:py-32 px-4 max-w-6xl mx-auto"
      id="timeline"
    >
      {/* Section header */}
      <div className="text-center mb-20 md:mb-28">
        <motion.div
          className="text-gold-soft/40 text-lg mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          ✦
        </motion.div>
        <motion.h2
          className="text-4xl md:text-6xl font-serif text-pearl-white mb-4 text-glow"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Nuestra Historia
        </motion.h2>
        <motion.p
          className="text-rose-pastel/50 text-base md:text-lg font-light max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Cada capítulo nos acerca más al infinito.
        </motion.p>
      </div>

      <div className="relative">
        {/* Central line (background) */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/5 md:-translate-x-1/2" />

        {/* Animated fill line */}
        <motion.div
          className="absolute left-4 md:left-1/2 top-0 w-[2px] md:-translate-x-1/2 origin-top"
          style={{
            height: lineHeight,
            background:
              "linear-gradient(to bottom, #FF2D78, #A855F7, #D4A853)",
            boxShadow: "0 0 12px rgba(255,45,120,0.5), 0 0 24px rgba(168,85,247,0.3)",
          }}
        />

        {/* Events */}
        <div className="flex flex-col gap-16 md:gap-24">
          {timelineEvents.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={event.id}
                className={`flex items-center relative ${
                  isEven ? "md:flex-row-reverse" : "md:flex-row"
                } flex-row`}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.1,
                }}
              >
                {/* Node dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-pearl-white z-10 shadow-[0_0_15px_rgba(255,45,120,0.6)]">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-rose-intense"
                    animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  />
                </div>

                {/* Card */}
                <div
                  className={`w-full md:w-1/2 ${
                    isEven
                      ? "md:pl-16 pl-12"
                      : "md:pr-16 pl-12 md:pl-0"
                  }`}
                >
                  <div className="glass rounded-2xl p-6 md:p-8 group hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden">
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-rose-intense to-purple-glow origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

                    {/* Icon */}
                    <span className="text-2xl mb-3 block">{event.icon}</span>

                    {/* Chapter label */}
                    <span className="text-rose-intense font-sans tracking-[0.15em] text-xs font-semibold uppercase mb-2 block">
                      {event.year}
                    </span>

                    {/* Title */}
                    <h3 className="font-serif text-xl md:text-2xl text-pearl-white mb-3">
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-pearl-white/60 leading-relaxed font-light text-sm md:text-base">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Spacer */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
