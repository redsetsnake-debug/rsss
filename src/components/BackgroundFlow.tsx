import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

interface BackgroundFlowProps {
  mood?: "default" | "night" | "rain" | "lonely" | "love";
}

const moodColors = {
  default: ["bg-purple-300/80", "bg-blue-300/80", "bg-pink-300/60"],
  night: ["bg-indigo-300/80", "bg-slate-400/80", "bg-blue-300/70"],
  rain: ["bg-sky-300/80", "bg-cyan-200/90", "bg-blue-300/70"],
  lonely: ["bg-stone-300/80", "bg-zinc-300/80", "bg-slate-300/80"],
  love: ["bg-rose-300/80", "bg-pink-300/80", "bg-fuchsia-300/70"],
};

export default function BackgroundFlow({ mood = "default" }: BackgroundFlowProps) {
  const [colors, setColors] = useState(moodColors[mood]);

  useEffect(() => {
    setColors(moodColors[mood]);
  }, [mood]);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#F4F6FB]">
      <motion.div
        className={cn("absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[120px] mix-blend-multiply opacity-60", colors[0])}
        animate={{
          x: [0, 50, 0, -50, 0],
          y: [0, 30, -30, 50, 0],
          scale: [1, 1.1, 0.9, 1.05, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={cn("absolute -bottom-[10%] -right-[5%] w-[500px] h-[500px] rounded-full blur-[100px] mix-blend-multiply opacity-60", colors[1])}
        animate={{
          x: [0, -60, 0, 40, 0],
          y: [0, -40, 60, -20, 0],
          scale: [1, 0.9, 1.1, 0.95, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className={cn("absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full blur-[80px] mix-blend-multiply opacity-50", colors[2])}
        animate={{
          x: [0, 40, -30, 0, 0],
          y: [0, -50, 40, -30, 0],
          scale: [1, 1.2, 0.8, 1.1, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      {/* Noise overlay for texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
