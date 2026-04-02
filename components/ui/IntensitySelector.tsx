"use client";

import { motion } from "framer-motion";
import type { Intensidad } from "@/lib/data/yo-nunca";
import { Info } from "lucide-react";

interface IntensitySelectorProps {
  selected: Intensidad[];
  onChange: (nuevos: Intensidad[]) => void;
}

const NIVELES: { id: Intensidad; label: string; color: string; desc: string; emoji: string }[] = [
  {
    id: "soft",
    label: "Soft",
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    desc: "Preguntas y retos suaves. Ideal para entrar en calor o jugar con conocidos.",
    emoji: "🟢",
  },
  {
    id: "normal",
    label: "Normal",
    color: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    desc: "El nivel clásico. Mentiras, exparejas, y situaciones incómodas.",
    emoji: "🟡",
  },
  {
    id: "picante",
    label: "Picante",
    color: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    desc: "Sólo para grupos de confianza. Sexo, secretos íntimos y salseo.",
    emoji: "🔴",
  },
];

export default function IntensitySelector({ selected, onChange }: IntensitySelectorProps) {
  const toggleNivel = (nivel: Intensidad) => {
    if (selected.includes(nivel)) {
      // Evitar que se deseleccionen todos (mínimo 1 seleccionado)
      if (selected.length > 1) {
        onChange(selected.filter((n) => n !== nivel));
      }
    } else {
      onChange([...selected, nivel]);
    }
  };

  const todasActivas = selected.length === 3;

  const toggleTodas = () => {
    if (todasActivas) {
      // Si están todas por defecto y quito "Todas", dejo solo Normal como base razonable
      onChange(["normal"]);
    } else {
      onChange(["soft", "normal", "picante"]);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full rounded-xl border border-border bg-surface p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center justify-between">
        Intensidad
        <span className="text-[10px] text-muted flex items-center gap-1">
          <Info className="h-3 w-3" />
          Elige una o varias
        </span>
      </h3>

      <div className="flex gap-2 mb-1">
        <button
          onClick={toggleTodas}
          className={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
            todasActivas
              ? "border-accent/50 bg-accent/15 text-accent shadow-sm shadow-accent-glow"
              : "border-border bg-surface-hover text-muted hover:border-accent/30"
          }`}
        >
          Mezclar todas 🎲
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {NIVELES.map((nivel) => {
          const isActive = selected.includes(nivel.id);
          return (
            <button
              key={nivel.id}
              onClick={() => toggleNivel(nivel.id)}
              className={`flex items-start gap-3 rounded-lg border px-3 py-2.5 text-left transition-all ${
                isActive ? nivel.color + " shadow-sm" : "border-border bg-background text-muted opacity-60 hover:opacity-100"
              }`}
            >
              <div className="text-base">{nivel.emoji}</div>
              <div className="flex flex-col flex-1">
                <span className="text-sm font-bold tracking-wide">{nivel.label}</span>
                <span className={`text-[10px] leading-tight mt-0.5 ${isActive ? "opacity-80" : "opacity-60"}`}>
                  {nivel.desc}
                </span>
              </div>
              <div className="flex h-5 w-5 items-center justify-center shrink-0">
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`h-3 w-3 rounded-full currentColor`}
                    style={{ backgroundColor: "currentColor" }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
