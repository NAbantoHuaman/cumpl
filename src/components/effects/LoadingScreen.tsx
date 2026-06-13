"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

export default function LoadingScreen() {
  const [phase, setPhase] = useState<'loading' | 'ready' | 'playing' | 'done'>('loading');
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const colors = ["#FF2D78", "#FFB6C1", "#D4A853", "#A855F7", "#FF6B9D"];

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5 - 0.3,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }

    if (phase !== 'loading') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (particlesRef.current.length === 0) {
        initParticles(canvas.width, canvas.height);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * (0.5 + 0.5 * Math.sin(Date.now() * 0.002 + p.x));
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        gradient.addColorStop(0, p.color + "40");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.globalAlpha = p.opacity * 0.5;
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initParticles, phase]);

  // Progress simulation
  useEffect(() => {
    if (phase !== 'loading') return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 80);

    const timer = setTimeout(() => {
      setPhase('ready');
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [phase]);

  const handlePlay = () => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Ignore AbortError when unmounting or pausing immediately
        });
      }
      setPhase('playing');
    }
  };

  const handleFinish = () => {
    setPhase('done');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('startMusic'));
    }
  };

  return (
    <AnimatePresence mode="wait">
      {phase === 'loading' && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[1000] bg-black-elegant flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
          }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />

          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-deep/30 blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-rose-intense/10 blur-[100px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-center"
          >
            {/* Decorative sparkle */}
            <motion.div
              className="text-gold-soft text-4xl mb-6"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              ✦
            </motion.div>

            <h1 className="text-2xl md:text-4xl font-serif text-pearl-white mb-3 tracking-wide">
              Preparando una sorpresa especial...
            </h1>
            <p className="text-rose-pastel/60 text-sm tracking-widest uppercase font-light">
              Para la persona más maravillosa
            </p>

            {/* Progress bar */}
            <div className="w-56 md:w-72 h-[2px] bg-white/10 rounded-full overflow-hidden mx-auto mt-10 relative">
              <motion.div
                className="h-full rounded-full relative"
                style={{
                  background: "linear-gradient(90deg, #FF2D78, #D4A853, #A855F7)",
                  width: `${Math.min(progress, 100)}%`,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#FF2D78,0_0_20px_#FF2D78]" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {(phase === 'ready' || phase === 'playing') && (
        <motion.div
          key="video-intro"
          className="fixed inset-0 z-[1000] bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <video
            ref={videoRef}
            src="/videos/intro.mp4"
            className="absolute inset-0 w-full h-full object-contain"
            playsInline
            onEnded={handleFinish}
          />
          
          {phase === 'ready' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-10">
              <motion.button
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", bounce: 0.4 }}
                onClick={handlePlay}
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-pearl-white font-serif text-xl tracking-wider shadow-[0_0_30px_rgba(255,45,120,0.3)] hover:bg-white/20 transition-all flex items-center gap-3"
              >
                <span>▶</span> Toca para ver tu saludo
              </motion.button>
            </div>
          )}

          {phase === 'playing' && (
             <button 
               onClick={handleFinish} 
               className="absolute top-6 right-6 px-4 py-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white/70 hover:text-white z-10 text-xs tracking-widest transition-all uppercase"
             >
               Saltar intro
             </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
