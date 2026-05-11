import { motion } from "motion/react";
import { useEffect, useState, useMemo } from "react";
import { cn } from "../lib/utils";

interface BackgroundFlowProps {
  mood?: "default" | "night" | "rain" | "lonely" | "love" | "courage" | "chill";
}

const moodColors = {
  default: ["bg-purple-300/80", "bg-blue-300/80", "bg-pink-300/60"],
  night: ["bg-indigo-300/80", "bg-slate-400/80", "bg-blue-300/70"],
  rain: ["bg-sky-300/80", "bg-cyan-200/90", "bg-blue-300/70"],
  lonely: ["bg-stone-300/80", "bg-zinc-300/80", "bg-slate-300/80"],
  love: ["bg-rose-300/80", "bg-pink-300/80", "bg-fuchsia-300/70"],
  courage: ["bg-orange-300/80", "bg-amber-300/70", "bg-yellow-300/80"],
  chill: ["bg-teal-200/80", "bg-emerald-200/50", "bg-cyan-200/70"],
};

export default function BackgroundFlow({ mood = "default" }: BackgroundFlowProps) {
  const [colors, setColors] = useState(moodColors[mood]);

  useEffect(() => {
    setColors(moodColors[mood]);
  }, [mood]);

  const confettiColors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];

  const confetti = useMemo(() => {
    // Generate an array of random confetti pieces
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${(Math.random() * 120) - 10}%`, // Start horizontally with some overflow
      animDuration: `${8 + Math.random() * 12}s`,
      animDelay: `-${Math.random() * 20}s`,
      rotDuration: `${1 + Math.random() * 3}s`,
      scale: 0.4 + Math.random() * 0.6,
      sway: (Math.random() - 0.5) * 120,
      swayDuration: 3 + Math.random() * 4,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      isCircle: Math.random() > 0.5,
      width: 10 + Math.random() * 10,
      height: 15 + Math.random() * 10,
    }));
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#F4F6FB]">
      <style>{`
        @keyframes sakura-fall {
          0% {
            transform: translateY(-10vh);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh);
            opacity: 0;
          }
        }
        @keyframes sakura-rotate {
          0% {
            transform: rotate(0deg) rotateX(0deg) rotateY(0deg) scale(var(--sakura-scale));
          }
          100% {
            transform: rotate(360deg) rotateX(360deg) rotateY(180deg) scale(var(--sakura-scale));
          }
        }
      `}</style>
      
      {/* 彩带飘落层 - Confetti falling effect */}
      {confetti.map(piece => (
        <div 
          key={piece.id}
          className="absolute -top-10 pointer-events-none z-10"
          style={{
            left: piece.left,
            animation: `sakura-fall ${piece.animDuration} linear ${piece.animDelay} infinite`,
          }}
        >
          <motion.div
             animate={{ x: [0, piece.sway, 0] }}
             transition={{ duration: piece.swayDuration, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* 彩带形状 */}
            <div 
              className="opacity-80 drop-shadow-md"
              style={{
                width: piece.width,
                height: piece.isCircle ? piece.width : piece.height,
                backgroundColor: piece.color,
                borderRadius: piece.isCircle ? '50%' : '2px',
                animation: `sakura-rotate ${piece.rotDuration} linear ${piece.animDelay} infinite`,
                "--sakura-scale": piece.scale,
              } as React.CSSProperties}
            />
          </motion.div>
        </div>
      ))}

      {/* 气泡背景层 */}
      <motion.div
        className={cn("absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[120px] mix-blend-multiply opacity-60 transition-colors duration-1000", colors[0])}
        animate={{
          x: [0, 50, 0, -50, 0],
          y: [0, 30, -30, 50, 0],
          scale: [1, 1.1, 0.9, 1.05, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={cn("absolute -bottom-[10%] -right-[5%] w-[500px] h-[500px] rounded-full blur-[100px] mix-blend-multiply opacity-60 transition-colors duration-1000", colors[1])}
        animate={{
          x: [0, -60, 0, 40, 0],
          y: [0, -40, 60, -20, 0],
          scale: [1, 0.9, 1.1, 0.95, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className={cn("absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full blur-[80px] mix-blend-multiply opacity-50 transition-colors duration-1000", colors[2])}
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
