"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Trail {
  x: number;
  y: number;
  opacity: number;
  size: number;
}

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const trailsRef = useRef<Trail[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check for touch device
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });

      // Add trail particle
      trailsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        opacity: 0.6,
        size: 2 + Math.random() * 2,
      });
      if (trailsRef.current.length > 20) {
        trailsRef.current.shift();
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-cursor-hover]");
      setIsHovering(!!interactive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Trail canvas animation
  const animateTrails = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trailsRef.current.forEach((trail, i) => {
        trail.opacity -= 0.02;
        trail.size *= 0.97;

        if (trail.opacity > 0) {
          const gradient = ctx.createRadialGradient(
            trail.x, trail.y, 0,
            trail.x, trail.y, trail.size * 3
          );
          gradient.addColorStop(0, `rgba(255, 45, 120, ${trail.opacity})`);
          gradient.addColorStop(0.5, `rgba(212, 168, 83, ${trail.opacity * 0.3})`);
          gradient.addColorStop(1, "transparent");

          ctx.beginPath();
          ctx.arc(trail.x, trail.y, trail.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      trailsRef.current = trailsRef.current.filter((t) => t.opacity > 0);
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    if (!isTouch) {
      animateTrails();
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [isTouch, animateTrails]);

  if (isTouch) return null;

  return (
    <>
      {/* Trail canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[9997]"
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999]"
        style={{
          background: "radial-gradient(circle, #FF2D78, #D4A853)",
          boxShadow: "0 0 12px rgba(255,45,120,0.8), 0 0 24px rgba(255,45,120,0.4)",
        }}
        animate={{
          x: pos.x - 6,
          y: pos.y - 6,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 28, mass: 0.3 }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998]"
        style={{
          border: "1px solid rgba(255, 182, 193, 0.4)",
          boxShadow: "0 0 8px rgba(255,182,193,0.15)",
        }}
        animate={{
          x: pos.x - 20,
          y: pos.y - 20,
          scale: isHovering ? 1.8 : 1,
          opacity: isHovering ? 0.2 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.6 }}
      />
    </>
  );
}
