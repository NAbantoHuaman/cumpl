"use client";

import { useEffect, useRef, useCallback } from "react";
import { useMounted } from "@/hooks/useMounted";

interface Heart {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
  phase: number;
}

export default function FloatingHearts() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heartsRef = useRef<Heart[]>([]);
  const rafRef = useRef<number>(0);
  const mounted = useMounted();

  const createHeart = useCallback((width: number, height: number): Heart => ({
    x: Math.random() * width,
    y: height + 20,
    size: 8 + Math.random() * 12,
    speed: 0.3 + Math.random() * 0.5,
    opacity: 0.15 + Math.random() * 0.25,
    wobble: 20 + Math.random() * 30,
    wobbleSpeed: 0.01 + Math.random() * 0.02,
    phase: Math.random() * Math.PI * 2,
  }), []);

  const drawHeart = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    // Left curve
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.5, x, y + size);
    // Right curve
    ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.5, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    ctx.closePath();
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
    };
    resize();
    window.addEventListener("resize", resize);

    // Spawn initial hearts
    for (let i = 0; i < 6; i++) {
      const h = createHeart(canvas.width, canvas.height);
      h.y = Math.random() * canvas.height;
      heartsRef.current.push(h);
    }

    let spawnTimer = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new heart occasionally
      spawnTimer++;
      if (spawnTimer > 180 && heartsRef.current.length < 10) {
        heartsRef.current.push(createHeart(canvas.width, canvas.height));
        spawnTimer = 0;
      }

      heartsRef.current.forEach((heart) => {
        heart.y -= heart.speed;
        heart.phase += heart.wobbleSpeed;
        const xOffset = Math.sin(heart.phase) * heart.wobble;

        ctx.save();
        ctx.translate(heart.x + xOffset, heart.y);
        ctx.rotate(Math.sin(heart.phase * 0.5) * 0.1);

        const gradient = ctx.createRadialGradient(0, heart.size * 0.4, 0, 0, heart.size * 0.4, heart.size);
        gradient.addColorStop(0, `rgba(255, 45, 120, ${heart.opacity})`);
        gradient.addColorStop(1, `rgba(255, 182, 193, ${heart.opacity * 0.3})`);

        drawHeart(ctx, 0, 0, heart.size);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
      });

      // Remove hearts that are off screen
      heartsRef.current = heartsRef.current.filter((h) => h.y > -30);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [mounted, createHeart, drawHeart]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[5]"
      aria-hidden="true"
    />
  );
}
