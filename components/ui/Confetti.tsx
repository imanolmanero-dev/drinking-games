"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  velocityX: number;
  velocityY: number;
}

const COLORS = [
  "#a855f7",
  "#ec4899",
  "#f43f5e",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
];

function createParticles(count = 60): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 50 + (Math.random() - 0.5) * 20,
    y: 40,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 4 + Math.random() * 8,
    rotation: Math.random() * 360,
    velocityX: (Math.random() - 0.5) * 60,
    velocityY: -(10 + Math.random() * 30),
  }));
}

export default function Confetti({
  active,
  duration = 3000,
}: {
  active: boolean;
  duration?: number;
}) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (active) {
      setParticles(createParticles());
      const timer = setTimeout(() => setParticles([]), duration);
      return () => clearTimeout(timer);
    } else {
      setParticles([]);
    }
  }, [active, duration]);

  if (particles.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            rotate: 0,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            left: `${p.x + p.velocityX}%`,
            top: `${p.y - p.velocityY + 80}%`,
            rotate: p.rotation + 360 * (Math.random() > 0.5 ? 1 : -1),
            opacity: 0,
            scale: 0.3,
          }}
          transition={{
            duration: 1.5 + Math.random() * 1.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="absolute"
          style={{
            width: p.size,
            height: p.size * (Math.random() > 0.5 ? 1 : 2.5),
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}
