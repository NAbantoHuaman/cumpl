"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { useMounted } from "@/hooks/useMounted";

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
}

export default function BirthdayWish() {
  const [wish, setWish] = useState("");
  const [sentWishes, setSentWishes] = useState<string[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [floatingWish, setFloatingWish] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mounted = useMounted();

  // Starry sky background
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const stars: { x: number; y: number; r: number; o: number; s: number }[] = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        o: Math.random(),
        s: 0.005 + Math.random() * 0.015,
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.o = 0.3 + 0.7 * Math.abs(Math.sin(Date.now() * star.s * 0.001));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 240, 255, ${star.o})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [mounted]);

  const handleSend = useCallback(() => {
    if (!wish.trim()) return;
    const newWish = wish.trim();
    setSentWishes((prev) => [...prev, newWish]);
    setFloatingWish(newWish);
    setWish("");

    // Shooting star
    setShootingStars((prev) => [
      ...prev,
      {
        id: Date.now(),
        startX: 20 + Math.random() * 60,
        startY: 80,
      },
    ]);

    setTimeout(() => setFloatingWish(null), 3000);
    setTimeout(() => {
      setShootingStars((prev) => prev.slice(1));
    }, 2000);
  }, [wish]);

  return (
    <section className="relative w-full min-h-[80vh] py-24 overflow-hidden flex flex-col items-center justify-center" id="birthday-wish">
      {/* Starry canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-deep/20 blur-[100px] rounded-full pointer-events-none" />

      {/* Shooting stars */}
      <AnimatePresence>
        {shootingStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute w-1 h-1 bg-white rounded-full z-20"
            style={{ left: `${star.startX}%`, top: `${star.startY}%` }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              x: [0, -200],
              y: [0, -400],
              opacity: [1, 0],
              scale: [1, 0.2],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Tail */}
            <div
              className="absolute top-0 left-0 w-20 h-[1px]"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5))",
                transform: "rotate(45deg)",
                transformOrigin: "left center",
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating wish text */}
      <AnimatePresence>
        {floatingWish && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-1/2 z-20 pointer-events-none"
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -200, scale: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeOut" }}
          >
            <p className="font-serif text-xl text-gold-soft/80 whitespace-nowrap text-glow-gold">
              ✨ {floatingWish} ✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 text-center px-4 w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Sparkles className="w-8 h-8 text-gold-soft/50 mx-auto mb-4" />
          <h2 className="text-3xl md:text-5xl font-serif text-pearl-white text-glow mb-3">
            Pide un Deseo
          </h2>
          <p className="text-rose-pastel/50 text-sm font-light mb-10">
            Escribe tu deseo y míralo volar hacia las estrellas
          </p>
        </motion.div>

        {/* Input */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="glass-gold rounded-2xl p-1 flex items-center">
            <input
              type="text"
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escribe un deseo para ella..."
              className="flex-1 bg-transparent px-5 py-4 text-pearl-white placeholder-pearl-white/30 font-serif text-base outline-none"
            />
            <button
              onClick={handleSend}
              disabled={!wish.trim()}
              className="px-5 py-4 text-gold-soft hover:text-rose-intense disabled:opacity-30 transition-colors"
              data-cursor-hover
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Sent wishes counter */}
        {sentWishes.length > 0 && (
          <motion.p
            className="mt-6 text-pearl-white/30 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {sentWishes.length} deseo{sentWishes.length > 1 ? "s" : ""} enviado{sentWishes.length > 1 ? "s" : ""} a las estrellas ⭐
          </motion.p>
        )}
      </div>
    </section>
  );
}
