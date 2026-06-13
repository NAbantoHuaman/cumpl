"use client";

import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "strong" | "gold";
  glowColor?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className,
  variant = "default",
  glowColor,
  hover = true,
}: GlassCardProps) {
  const variantClass = {
    default: "glass",
    strong: "glass-strong",
    gold: "glass-gold",
  }[variant];

  return (
    <div
      className={cn(
        variantClass,
        "rounded-2xl relative overflow-hidden",
        hover && "hover:bg-white/[0.04] transition-all duration-500",
        className
      )}
    >
      {glowColor && (
        <>
          <div
            className="absolute -top-10 -left-10 w-24 h-24 rounded-full blur-[40px] opacity-20"
            style={{ background: glowColor }}
          />
          <div
            className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full blur-[35px] opacity-15"
            style={{ background: glowColor }}
          />
        </>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
