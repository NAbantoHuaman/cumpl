"use client";

export default function SectionTransition({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "gold" | "purple";
}) {
  const gradients = {
    default: "from-transparent via-rose-intense/5 to-transparent",
    gold: "from-transparent via-gold-soft/5 to-transparent",
    purple: "from-transparent via-purple-glow/5 to-transparent",
  };

  return (
    <div className={`relative w-full h-24 md:h-32 ${className}`}>
      <div
        className={`absolute inset-0 bg-gradient-to-b ${gradients[variant]}`}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  );
}
