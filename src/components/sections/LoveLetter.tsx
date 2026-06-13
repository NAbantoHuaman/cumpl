"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { loveLetter } from "@/data/love-letter";
import { X, Heart } from "lucide-react";

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen py-24 flex flex-col items-center justify-center overflow-hidden px-4"
      id="letter"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-deep/10 to-transparent pointer-events-none" />

      {/* Header */}
      <motion.div
        className="text-center mb-12 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="text-gold-soft/40 text-lg mb-4">✉</div>
        <h2 className="text-4xl md:text-6xl font-serif text-pearl-white text-glow mb-3">
          Carta de Amor
        </h2>
        <p className="text-rose-pastel/50 text-sm font-light">
          Toca el sobre para abrirlo
        </p>
      </motion.div>

      {/* Envelope */}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            className="relative cursor-pointer z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            exit={{ opacity: 0, scale: 0.9, y: -50 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            data-cursor-hover
          >
            {/* Envelope body */}
            <div className="relative w-72 md:w-96 h-48 md:h-60">
              {/* Back of envelope */}
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, #2D0A4E 0%, #1a0630 100%)",
                  border: "1px solid rgba(212,168,83,0.2)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(212,168,83,0.08)",
                }}
              />

              {/* Flap (triangle) */}
              <div
                className="absolute top-0 left-0 w-full overflow-hidden"
                style={{ height: "50%" }}
              >
                <div
                  className="w-full h-full origin-top"
                  style={{
                    background: "linear-gradient(180deg, #3d1660 0%, #2D0A4E 100%)",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    border: "1px solid rgba(212,168,83,0.15)",
                  }}
                />
              </div>

              {/* Wax seal */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[30%] z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: "radial-gradient(circle, #FF2D78, #c41e5c)",
                    boxShadow: "0 4px 15px rgba(255,45,120,0.4), inset 0 -2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  <Heart className="w-5 h-5 md:w-6 md:h-6 text-white fill-white" />
                </div>
              </div>

              {/* Text on envelope */}
              <div className="absolute bottom-6 left-0 w-full text-center">
                <p className="font-serif text-rose-pastel/60 text-sm md:text-base italic">
                  Para ti, mi amor...
                </p>
              </div>

              {/* Golden border accent */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold-soft/30 to-transparent" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="letter-content"
            className="relative z-10 w-full max-w-3xl"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Letter card */}
            <div className="relative glass-strong rounded-3xl p-8 md:p-14 overflow-hidden">
              {/* Decorative corner glows */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-rose-intense/10 blur-[60px] rounded-full" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-gold-soft/10 blur-[60px] rounded-full" />

              {/* Golden border */}
              <div className="absolute inset-[1px] rounded-3xl border border-gold-soft/10 pointer-events-none" />

              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-pearl-white/40 hover:text-pearl-white transition-colors z-20"
                data-cursor-hover
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title */}
              <motion.h3
                className="font-serif text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-rose-intense to-gold-soft mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                {loveLetter.title}
              </motion.h3>

              {/* Decorative line */}
              <motion.div
                className="w-16 h-px mx-auto mb-8 bg-gradient-to-r from-transparent via-gold-soft/40 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />

              {/* Letter paragraphs */}
              <div className="space-y-5 relative z-10">
                {loveLetter.paragraphs.map((paragraph, i) => (
                  <motion.p
                    key={i}
                    className="font-serif text-base md:text-lg text-pearl-white/80 leading-relaxed md:leading-loose"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.6 + i * 0.3,
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Signature */}
              <motion.div
                className="mt-10 flex justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.6 + loveLetter.paragraphs.length * 0.3 + 0.5,
                  duration: 1,
                }}
              >
                <div className="text-right">
                  <p className="font-serif text-rose-intense text-lg italic">
                    {loveLetter.signature}
                  </p>
                  <div className="w-20 h-px bg-gradient-to-r from-transparent to-rose-intense/40 ml-auto mt-3" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
