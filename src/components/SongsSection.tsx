import { motion, useScroll, useTransform } from "motion/react";
import { Play, Pause } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { cn } from "../lib/utils";

const songs = [
  {
    id: "fly",
    title: "FLY",
    emotion: "漂浮 / 温暖 (Floating / Warm)",
    quote: "You can fly anywhere, if you just believe.",
    color: "from-amber-200/40 to-orange-400/20",
    theme: "love",
    audioUrl: "https://cdn.pixabay.com/audio/2022/12/28/audio_824e8e9112.mp3",
  },
  {
    id: "sora",
    title: "空",
    emotion: "孤独 / 清透 (Lonely / Airy)",
    quote: "見上げる空は、いつも同じだと。",
    color: "from-blue-300/40 to-cyan-400/20",
    theme: "lonely",
    audioUrl: "https://cdn.pixabay.com/audio/2021/08/04/audio_0625c1539c.mp3",
  },
  {
    id: "reset",
    title: "リセット",
    emotion: "清朗 / 活力 (Clear / Energetic)",
    quote: "何もかも忘れて、もう一度。",
    color: "from-purple-300/40 to-fuchsia-400/20",
    theme: "default",
    audioUrl: "https://cdn.pixabay.com/audio/2022/03/15/audio_a3db24f5a4.mp3",
  }
];

export default function SongsSection({ onThemeChange }: { onThemeChange: (theme: any) => void }) {
  return (
    <div className="flex flex-col w-full relative z-10 space-y-[20vh] pb-[20vh]">
      {songs.map((song, i) => (
        <SongCard key={song.id} song={song} index={i} onThemeChange={onThemeChange} />
      ))}
    </div>
  );
}

function SongCard({ song, index, onThemeChange }: { song: any, index: number, onThemeChange: (theme: any) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0.2 1", "0.8 0"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handlePauseOthers = (e: any) => {
      if (e.detail?.except !== song.id && isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      }
    };
    window.addEventListener("pause-all-songs", handlePauseOthers);
    return () => window.removeEventListener("pause-all-songs", handlePauseOthers);
  }, [song.id, isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      // 播放新歌曲时停止BGM及其他歌曲
      window.dispatchEvent(new CustomEvent("pause-bgm"));
      window.dispatchEvent(new CustomEvent("pause-all-songs", { detail: { except: song.id } }));
      
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.play();
      }
      setIsPlaying(true);
      onThemeChange(song.theme);
    }
  };

  return (
    <motion.div 
      ref={ref}
      style={{ scale, opacity, y }}
      className="w-full flex justify-center px-12 min-h-[50vh] md:min-h-[70vh] items-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full max-w-7xl">
        <div className="col-span-12 md:col-span-7">
          {/* We spread out the section a bit to have breathing room */}
        </div>
        <div className="col-span-12 md:col-span-5 flex flex-col items-end w-full">
          <div className={cn("bg-white/40 backdrop-blur-2xl border border-white/60 rounded-2xl p-8 w-full md:w-[380px] shadow-[0_8px_32px_rgba(0,0,0,0.05)] relative overflow-hidden group transition-all duration-700", isPlaying ? "scale-[1.02] shadow-[0_12px_45px_rgba(0,0,0,0.1)] border-white/80" : "")}>
            <div className={cn("absolute inset-0 bg-gradient-to-br transition-opacity duration-1000", song.color, isPlaying ? "opacity-100" : "opacity-30")} />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-4xl font-bold mb-1 tracking-tighter truncate text-slate-800">{song.title}</h2>
                  <p className="text-slate-500 text-xs uppercase tracking-widest truncate">{song.theme} / R&B / Neo Soul</p>
                </div>
                <motion.button
                  onClick={togglePlay}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 flex-shrink-0 cursor-pointer rounded-full border border-white/80 flex items-center justify-center text-slate-600 hover:text-slate-800 transition-colors relative bg-white/40 shadow-sm"
                >
                  {isPlaying ? <Pause size={16} /> : (
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-slate-600 border-b-[6px] border-b-transparent ml-1"></div>
                  )}
                  {isPlaying && (
                    <motion.div 
                      className="absolute inset-0 rounded-full border border-purple-300/50"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </motion.button>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[10px] uppercase tracking-tighter text-slate-400">
                  <span>听觉氛围 / Atmosphere</span>
                  <span>{song.emotion.split(' ')[0]}</span>
                </div>
                <div className="h-[2px] bg-slate-200/50 w-full overflow-hidden relative">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-purple-400 to-blue-400 absolute left-0"
                    initial={{ width: "0%" }}
                    animate={{ width: isPlaying ? "100%" : "30%" }}
                    transition={isPlaying ? { duration: 180, ease: "linear" } : { duration: 1 }}
                  ></motion.div>
                </div>
                <p className="text-sm font-serif italic text-slate-600 mt-4 leading-relaxed">
                  "{song.quote}"
                </p>
              </div>

              <div className="flex gap-2 flex-wrap">
                {song.emotion.split('/').map((tag: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 rounded-full border border-slate-300/60 bg-white/30 text-[9px] uppercase text-slate-600">
                    {tag.replace(/\(.*\)/, '').trim()}
                  </span>
                ))}
                <span className="px-3 py-1 rounded-full border border-slate-300/60 bg-white/30 text-[9px] uppercase text-slate-600">{song.theme}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={song.audioUrl} loop />
    </motion.div>
  );
}
