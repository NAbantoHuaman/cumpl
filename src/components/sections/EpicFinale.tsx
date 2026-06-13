"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// Shape definitions as point arrays
function getHeartPoints(cx: number, cy: number, size: number, count: number): [number, number][] {
  const points: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    const x = cx + size * 16 * Math.pow(Math.sin(t), 3);
    const y =
      cy -
      size *
        (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    points.push([x, y]);
  }
  return points;
}

function getTextPoints(
  text: string,
  cx: number,
  cy: number,
  fontSize: number,
  count: number
): [number, number][] {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 400;
  const ctx = canvas.getContext("2d");
  if (!ctx) return Array.from({ length: count }, () => [cx, cy] as [number, number]);

  ctx.fillStyle = "white";
  ctx.font = `bold ${fontSize}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const validPositions: [number, number][] = [];

  for (let y = 0; y < canvas.height; y += 3) {
    for (let x = 0; x < canvas.width; x += 3) {
      if (imageData.data[(y * canvas.width + x) * 4 + 3] > 128) {
        validPositions.push([
          cx + (x - canvas.width / 2),
          cy + (y - canvas.height / 2),
        ]);
      }
    }
  }

  if (validPositions.length === 0) {
    return Array.from({ length: count }, () => [cx, cy] as [number, number]);
  }

  const points: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    const p = validPositions[Math.floor(Math.random() * validPositions.length)];
    points.push([p[0] + (Math.random() - 0.5) * 2, p[1] + (Math.random() - 0.5) * 2]);
  }
  return points;
}

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
}

const PARTICLE_COUNT = 3000;
const COLORS = ["#FF2D78", "#FFB6C1", "#D4A853", "#A855F7", "#FF6B9D", "#E8B4F8"];

export default function EpicFinale() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const phaseRef = useRef(0);
  const animatingRef = useRef(false);
  const rafRef = useRef<number>(0);
  const [showText, setShowText] = useState(false);
  const isInView = useInView(sectionRef, { amount: 0.5, once: true });
  const hasStartedRef = useRef(false);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        targetX: Math.random() * width,
        targetY: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
      });
    }
    particlesRef.current = particles;
  }, []);

  const setTargets = useCallback((targets: [number, number][]) => {
    const particles = particlesRef.current;
    for (let i = 0; i < particles.length; i++) {
      const target = targets[i % targets.length];
      particles[i].targetX = target[0] + (Math.random() - 0.5) * 3;
      particles[i].targetY = target[1] + (Math.random() - 0.5) * 3;
    }
  }, []);

  const runSequence = useCallback(
    (width: number, height: number) => {
      if (animatingRef.current) return;
      animatingRef.current = true;
      const cx = width / 2;
      const cy = height / 2;

      // Phase 1: Heart (0-5s)
      const heartPts = getHeartPoints(cx, cy, Math.min(width, height) * 0.012, PARTICLE_COUNT);
      setTargets(heartPts);

      // Phase 2: Number 20 (5-10s)
      setTimeout(() => {
        phaseRef.current = 1;
        const textPts = getTextPoints("20", cx, cy, Math.min(200, width * 0.25), PARTICLE_COUNT);
        setTargets(textPts);
      }, 5000);

      // Phase 3: Name (10-15s)
      setTimeout(() => {
        phaseRef.current = 2;
        const namePts = getTextPoints("Mi Amor", cx, cy, Math.min(120, width * 0.15), PARTICLE_COUNT);
        setTargets(namePts);
      }, 10000);

      // Phase 4: Final phrase (15-18s)
      setTimeout(() => {
        phaseRef.current = 3;
        const phrasePts = getTextPoints("∞", cx, cy, Math.min(250, width * 0.3), PARTICLE_COUNT);
        setTargets(phrasePts);
      }, 15000);

      // Show text and confetti (18s)
      setTimeout(() => {
        setShowText(true);
        confetti({
          particleCount: 200,
          spread: 120,
          origin: { y: 0.5 },
          colors: ["#FF2D78", "#FFB6C1", "#D4A853", "#A855F7", "#FF6B9D"],
          gravity: 0.6,
        });
        // Second burst
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.4, x: 0.3 },
            colors: ["#FF2D78", "#D4A853"],
          });
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.4, x: 0.7 },
            colors: ["#A855F7", "#FFB6C1"],
          });
        }, 500);
      }, 18000);
    },
    [setTargets]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    initParticles(canvas.offsetWidth, canvas.offsetHeight);

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      if (!animatingRef.current) return;

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      particlesRef.current.forEach((p) => {
        // Spring physics toward target
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        p.vx += dx * 0.03;
        p.vy += dy * 0.03;
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.x += p.vx;
        p.y += p.vy;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.8;
        ctx.fill();

        // Glow for larger particles
        if (p.size > 1.2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.2;
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initParticles]);

  // Trigger sequence when section comes into view
  useEffect(() => {
    if (isInView && !hasStartedRef.current && canvasRef.current) {
      hasStartedRef.current = true;
      runSequence(canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
    }
  }, [isInView, runSequence]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-black-elegant"
      id="finale"
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Final text overlay */}
      <AnimatePresence>
        {showText && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            {/* Backdrop for text readability */}
            <div className="absolute inset-0 bg-black-elegant/50 backdrop-blur-[2px]" />

            <div className="relative z-10 text-center max-w-3xl">
              <motion.p
                className="font-serif text-xl md:text-3xl lg:text-4xl text-pearl-white leading-relaxed mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              >
                &ldquo;De todos los lugares del universo,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-intense via-rose-pastel to-gold-soft">
                  mi favorito siempre será a tu lado.
                </span>
                &rdquo;
              </motion.p>

              <motion.div
                className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-gold-soft/50 to-transparent mb-8"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
              />

              <motion.h2
                className="font-serif text-4xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-rose-intense to-gold-soft text-glow"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              >
                Feliz cumpleaños,
                <br />
                mi amor. 💕
              </motion.h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
