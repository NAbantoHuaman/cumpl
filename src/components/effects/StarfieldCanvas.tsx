"use client";

import { useEffect, useRef, useCallback } from "react";
import { useMounted } from "@/hooks/useMounted";

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  phase: number;
}

export default function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);
  const mounted = useMounted();

  const initStars = useCallback((width: number, height: number) => {
    const stars: Star[] = [];
    const count = Math.min(300, Math.floor((width * height) / 5000));
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        baseOpacity: Math.random() * 0.6 + 0.2,
        twinkleSpeed: 0.005 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2,
      });
    }
    starsRef.current = stars;
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });

    let time = 0;

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw nebula gradients
      const nebulaX = canvas.width * (0.3 + mouseRef.current.x * 0.1);
      const nebulaY = canvas.height * (0.4 + mouseRef.current.y * 0.1);

      const nebula1 = ctx.createRadialGradient(
        nebulaX, nebulaY, 0,
        nebulaX, nebulaY, canvas.width * 0.4
      );
      nebula1.addColorStop(0, `rgba(45, 10, 78, ${0.15 + 0.05 * Math.sin(time)})`);
      nebula1.addColorStop(0.5, `rgba(255, 45, 120, ${0.04 + 0.02 * Math.sin(time * 0.7)})`);
      nebula1.addColorStop(1, "transparent");
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nebula2X = canvas.width * (0.7 - mouseRef.current.x * 0.05);
      const nebula2Y = canvas.height * (0.6 - mouseRef.current.y * 0.05);
      const nebula2 = ctx.createRadialGradient(
        nebula2X, nebula2Y, 0,
        nebula2X, nebula2Y, canvas.width * 0.35
      );
      nebula2.addColorStop(0, `rgba(168, 85, 247, ${0.08 + 0.03 * Math.sin(time * 1.3)})`);
      nebula2.addColorStop(0.6, `rgba(212, 168, 83, ${0.03 + 0.01 * Math.sin(time * 0.5)})`);
      nebula2.addColorStop(1, "transparent");
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars with parallax
      const parallaxX = (mouseRef.current.x - 0.5) * 10;
      const parallaxY = (mouseRef.current.y - 0.5) * 10;

      starsRef.current.forEach((star) => {
        star.phase += star.twinkleSpeed;
        const opacity = star.baseOpacity * (0.5 + 0.5 * Math.sin(star.phase));
        const px = star.x + parallaxX * (star.size / 2);
        const py = star.y + parallaxY * (star.size / 2);

        // Star core
        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 240, 255, ${opacity})`;
        ctx.fill();

        // Star glow
        if (star.size > 1.5) {
          ctx.beginPath();
          ctx.arc(px, py, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 182, 193, ${opacity * 0.15})`;
          ctx.fill();
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [mounted, initStars]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
      aria-hidden="true"
    />
  );
}
