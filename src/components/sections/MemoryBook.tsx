"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { bookPages } from "@/data/book-pages";

export default function MemoryBook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const goNext = () => {
    if (currentPage < bookPages.length - 1) {
      setDirection(1);
      setCurrentPage((p) => p + 1);
    }
  };

  const goPrev = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage((p) => p - 1);
    }
  };

  const page = bookPages[currentPage];

  const pageVariants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden" id="book">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16 px-4">
        <motion.div
          className="text-gold-soft/40 text-lg mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          📖
        </motion.div>
        <motion.h2
          className="text-4xl md:text-6xl font-serif text-pearl-white text-glow mb-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Libro de Recuerdos
        </motion.h2>
        <motion.p
          className="text-rose-pastel/50 text-sm font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Pasa las páginas de nuestra historia
        </motion.p>
      </div>

      {/* Book */}
      <div className="flex items-center justify-center px-4">
        <motion.div
          className="relative w-full max-w-4xl perspective-1000"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* Book container */}
          <div
            className="relative rounded-2xl md:rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(45,10,78,0.4), rgba(5,5,16,0.8))",
              border: "1px solid rgba(212,168,83,0.15)",
              boxShadow:
                "0 25px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 40px rgba(45,10,78,0.2)",
            }}
          >
            {/* Book spine shadow */}
            <div className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/20 to-transparent pointer-events-none z-20 hidden md:block" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentPage}
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="preserve-3d"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px] md:min-h-[500px]">
                  {/* Left page - Image */}
                  <div className="p-6 md:p-10 flex items-center justify-center">
                    <div
                      className="w-full aspect-[4/3] rounded-xl overflow-hidden relative"
                      style={{
                        background: page.imagePlaceholder,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                      }}
                    >
                      {/* Photo frame effect */}
                      <div className="absolute inset-0 border-4 border-white/5 rounded-xl z-10 pointer-events-none" />
                      
                      {page.imagePath ? (
                        <img
                          src={page.imagePath}
                          alt={page.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-5xl opacity-40">📷</span>
                        </div>
                      )}
                      {/* Corner decorations */}
                      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-gold-soft/30" />
                      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-gold-soft/30" />
                      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-gold-soft/30" />
                      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-gold-soft/30" />
                    </div>
                  </div>

                  {/* Right page - Text */}
                  <div className="p-6 md:p-10 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/5">
                    {/* Date */}
                    <span className="text-rose-intense text-xs tracking-[0.2em] uppercase font-medium mb-3">
                      {page.date}
                    </span>

                    {/* Title */}
                    <h3 className="font-serif text-2xl md:text-3xl text-pearl-white mb-4">
                      {page.title}
                    </h3>

                    {/* Decorative line */}
                    <div className="w-12 h-px bg-gradient-to-r from-gold-soft/40 to-transparent mb-5" />

                    {/* Text */}
                    <p className="font-serif text-pearl-white/70 leading-relaxed text-sm md:text-base">
                      {page.text}
                    </p>

                    {/* Page number */}
                    <div className="mt-auto pt-6">
                      <span className="text-pearl-white/20 text-xs font-serif italic">
                        Página {page.id} de {bookPages.length}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 px-4">
            <button
              onClick={goPrev}
              disabled={currentPage === 0}
              className="glass rounded-full p-3 text-pearl-white/50 hover:text-pearl-white disabled:opacity-20 disabled:cursor-not-allowed transition-all hover:shadow-[0_0_15px_rgba(255,45,120,0.2)]"
              data-cursor-hover
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Page dots */}
            <div className="flex gap-2">
              {bookPages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentPage ? 1 : -1);
                    setCurrentPage(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentPage
                      ? "bg-rose-intense w-6 shadow-[0_0_8px_rgba(255,45,120,0.5)]"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                  data-cursor-hover
                />
              ))}
            </div>

            <button
              onClick={goNext}
              disabled={currentPage === bookPages.length - 1}
              className="glass rounded-full p-3 text-pearl-white/50 hover:text-pearl-white disabled:opacity-20 disabled:cursor-not-allowed transition-all hover:shadow-[0_0_15px_rgba(255,45,120,0.2)]"
              data-cursor-hover
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
