"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

// ═══════════════════════════════════
// localStorage helpers
// ═══════════════════════════════════

function getItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable
  }
}

// ═══════════════════════════════════
// Sound system (Web Audio API)
// ═══════════════════════════════════

type SoundType =
  | "click"
  | "flip"
  | "dice"
  | "spin"
  | "success"
  | "drink"
  | "everyone";

let audioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
  }
  return audioCtx;
}

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = "sine",
  volume = 0.15,
  delay = 0
) {
  const ctx = getAudioCtx();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
  gain.gain.setValueAtTime(volume, ctx.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + delay + duration
  );

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + duration);
}

const SOUNDS: Record<SoundType, () => void> = {
  click: () => {
    playTone(800, 0.06, "sine", 0.08);
  },
  flip: () => {
    playTone(400, 0.1, "sine", 0.1);
    playTone(600, 0.15, "sine", 0.08, 0.05);
  },
  dice: () => {
    for (let i = 0; i < 5; i++) {
      playTone(200 + Math.random() * 400, 0.04, "square", 0.05, i * 0.06);
    }
  },
  spin: () => {
    for (let i = 0; i < 8; i++) {
      playTone(300 + i * 80, 0.08, "sine", 0.06, i * 0.1);
    }
  },
  success: () => {
    playTone(523, 0.15, "sine", 0.12);
    playTone(659, 0.15, "sine", 0.12, 0.12);
    playTone(784, 0.25, "sine", 0.12, 0.24);
  },
  drink: () => {
    playTone(400, 0.12, "triangle", 0.1);
    playTone(300, 0.15, "triangle", 0.1, 0.1);
    playTone(200, 0.2, "triangle", 0.08, 0.2);
  },
  everyone: () => {
    playTone(500, 0.1, "sawtooth", 0.06);
    playTone(600, 0.1, "sawtooth", 0.06, 0.08);
    playTone(700, 0.1, "sawtooth", 0.06, 0.16);
    playTone(800, 0.2, "sawtooth", 0.08, 0.24);
  },
};

// ═══════════════════════════════════
// Vibration patterns
// ═══════════════════════════════════

const VIBRATIONS: Record<string, number[]> = {
  click: [30],
  flip: [50],
  dice: [30, 20, 30, 20, 50],
  result: [80],
  everyone: [100, 50, 100],
};

function vibrate(pattern: number[]) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

// ═══════════════════════════════════
// Recent players
// ═══════════════════════════════════

const RECENT_PLAYERS_KEY = "bg_recent_players";
const MAX_RECENT = 20;

function getRecentPlayers(): string[] {
  return getItem<string[]>(RECENT_PLAYERS_KEY, []);
}

function saveRecentPlayers(players: string[]) {
  const existing = getRecentPlayers();
  const merged = [...new Set([...players, ...existing])].slice(0, MAX_RECENT);
  setItem(RECENT_PLAYERS_KEY, merged);
}

// ═══════════════════════════════════
// Context
// ═══════════════════════════════════

interface AppContextType {
  // Sound
  soundEnabled: boolean;
  toggleSound: () => void;
  playSound: (type: SoundType) => void;

  // Vibration
  vibrateDevice: (pattern: string) => void;

  // Recent players
  recentPlayers: string[];
  savePlayersToRecent: (players: string[]) => void;
  clearRecentPlayers: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [recentPlayers, setRecentPlayers] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    setSoundEnabled(getItem("bg_sound", true));
    setRecentPlayers(getRecentPlayers());
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      setItem("bg_sound", next);
      // Resume audio context on first interaction
      if (next) {
        const ctx = getAudioCtx();
        if (ctx?.state === "suspended") ctx.resume();
      }
      return next;
    });
  }, []);

  const playSound = useCallback(
    (type: SoundType) => {
      if (!soundEnabled) return;
      // Resume audio context if needed
      const ctx = getAudioCtx();
      if (ctx?.state === "suspended") ctx.resume();
      SOUNDS[type]?.();
    },
    [soundEnabled]
  );

  const vibrateDevice = useCallback(
    (pattern: string) => {
      if (!soundEnabled) return;
      const p = VIBRATIONS[pattern];
      if (p) vibrate(p);
    },
    [soundEnabled]
  );

  const savePlayersToRecent = useCallback((players: string[]) => {
    saveRecentPlayers(players);
    setRecentPlayers(getRecentPlayers());
  }, []);

  const clearRecentPlayers = useCallback(() => {
    setItem(RECENT_PLAYERS_KEY, []);
    setRecentPlayers([]);
  }, []);

  return (
    <AppContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        playSound,
        vibrateDevice,
        recentPlayers,
        savePlayersToRecent,
        clearRecentPlayers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
