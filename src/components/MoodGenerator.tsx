import { motion } from "motion/react";
import { useState } from "react";
import { Play, Moon, CloudRain, Heart, User } from "lucide-react";
import { cn } from "../lib/utils";

const moods = [
  { id: "night", label: "夜晚", icon: Moon, song: "FLY", quote: "在暗夜中自由漂浮..." },
  { id: "rain", label: "雨", icon: CloudRain, song: "リセット", quote: "让雨水洗刷过去的痕迹。" },
  { id: "lonely", label: "孤独", icon: User, song: "空", quote: "仰望同一片清冷的白空。" },
  { id: "love", label: "爱", icon: Heart, song: "Love Is...", quote: "寒冷夜晚里温暖的拥抱。" },
];

export default function MoodGenerator({ onThemeChange }: { onThemeChange: (theme: any) => void }) {
  const [activeMood, setActiveMood] = useState<string | null>(null);

  const handleMoodClick = (moodId: string) => {
    setActiveMood(moodId);
    onThemeChange(moodId);
  };

  return (
    <section className="py-24 px-6 relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-light tracking-widest text-slate-800">
          情绪感知 / Mood Generator
        </h2>
        <p className="text-slate-500 tracking-wide font-light">
          选择此时的心境，感受音乐与视觉的共振。
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-3xl">
        {moods.map((mood) => {
          const Icon = mood.icon;
          const isActive = activeMood === mood.id;
          return (
            <motion.button
              key={mood.id}
              onClick={() => handleMoodClick(mood.id)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "rounded-full py-4 px-6 flex items-center justify-center space-x-3 transition-all duration-500 border border-white/60",
                isActive ? "bg-slate-800 text-white shadow-lg" : "hover:bg-white/60 text-slate-700 bg-white/40"
              )}
            >
              <Icon size={18} className={cn("transition-colors duration-500", isActive ? "text-white" : "text-slate-500")} />
              <span className={cn("font-bold text-[13px] uppercase tracking-widest transition-colors duration-500", isActive ? "text-white" : "text-slate-700")}>
                {mood.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {activeMood && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 text-center space-y-8"
        >
          <div className="inline-block px-6 py-3 rounded-full border border-slate-300 bg-white/40">
            <span className="text-slate-500 text-sm mr-4">推荐曲目</span>
            <span className="text-slate-800 font-semibold flex items-center inline-flex">
              <Play size={14} className="mr-2" /> {moods.find(m => m.id === activeMood)?.song}
            </span>
          </div>
          <p className="text-xl md:text-2xl font-light font-serif italic text-slate-700">
            "{moods.find(m => m.id === activeMood)?.quote}"
          </p>
        </motion.div>
      )}
    </section>
  );
}
