import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

export interface FeatureCardData {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  accentColor: string;
  iconBg: string;
  emoji: string;
  topBarColor: string;
}

interface FeatureCardProps {
  card: FeatureCardData;
  index: number;
}

export default function FeatureCard({ card, index }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Max 15° tilt
    setTilt({ x: y * -15, y: x * 15 });
  };

  const resetTilt = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
    setIsPressed(false);
  };

  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: "easeOut" }}
      data-ocid={`features.${card.id}.card`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={resetTilt}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        className="relative rounded-2xl overflow-hidden cursor-pointer h-full"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          // eslint-disable-next-line @typescript-eslint/naming-convention
          WebkitBackdropFilter: "blur(12px)",
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${isHovered ? "12px" : "0px"}) scale(${isPressed ? 0.98 : 1})`,
          transition: isHovered
            ? "transform 0.1s ease-out, box-shadow 0.2s ease"
            : "transform 0.4s ease-out, box-shadow 0.35s ease",
          boxShadow: isHovered
            ? "0 20px 60px rgba(0,0,0,0.14), 0 8px 20px rgba(0,0,0,0.09), 0 2px 6px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(255,255,255,0.9)"
            : "0 2px 8px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(255,255,255,0.9), 0 0 0 1px rgba(0,0,0,0.03)",
        }}
      >
        {/* Colored top bar — gradient from solid to transparent */}
        <div
          className="h-1.5 w-full transition-all duration-300"
          style={{
            background: `linear-gradient(90deg, ${card.accentColor} 0%, ${card.accentColor}80 60%, transparent 100%)`,
            opacity: isHovered ? 1 : 0.75,
          }}
        />

        {/* Shimmer sweep on hover */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl shimmer-sweep"
            style={{ zIndex: 1 }}
          />
        )}

        {/* Inner radial glow on hover */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${card.iconBg} 0%, transparent 65%)`,
            opacity: isHovered ? 0.9 : 0,
          }}
        />

        {/* Content */}
        <div
          className="relative p-6 flex flex-col gap-4 h-full"
          style={{ zIndex: 2 }}
        >
          {/* Icon + emoji */}
          <div className="flex items-start justify-between">
            <div
              className="relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{
                background: card.iconBg,
                transform: isHovered ? "scale(1.12) rotate(-4deg)" : "scale(1)",
                boxShadow: isHovered
                  ? `0 6px 20px ${card.accentColor}40, 0 0 0 3px ${card.accentColor}20`
                  : "none",
              }}
            >
              <Icon className="w-7 h-7" style={{ color: card.accentColor }} />
            </div>
            <span
              className="text-2xl select-none"
              role="img"
              aria-hidden="true"
            >
              {card.emoji}
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-display font-bold text-lg leading-tight transition-colors duration-300"
            style={{
              color: isHovered ? card.accentColor : "oklch(var(--foreground))",
            }}
          >
            {card.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">
            {card.description}
          </p>

          {/* Feature list */}
          <ul className="space-y-1.5">
            {card.features.map((feat) => (
              <li
                key={feat}
                className="flex items-start gap-2 text-xs text-muted-foreground"
              >
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: card.accentColor }}
                />
                {feat}
              </li>
            ))}
          </ul>

          {/* Bottom accent bar */}
          <div
            className="h-0.5 rounded-full mt-1 transition-all duration-400"
            style={{
              background: `linear-gradient(90deg, ${card.accentColor}, transparent)`,
              opacity: isHovered ? 0.9 : 0.3,
              width: isHovered ? "100%" : "35%",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
