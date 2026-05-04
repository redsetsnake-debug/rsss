import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { Play, Pause, Music } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const tracks = [
  { 
    id: "preview-1", 
    title: "FLY - Short Preview", 
    duration: "1:30",
    audioUrl: "https://cdn.pixabay.com/audio/2022/10/18/audio_165e31d36d.mp3", 
  },
  { 
    id: "preview-2", 
    title: "Siren - Short Preview", 
    duration: "1:45",
    audioUrl: "https://cdn.pixabay.com/audio/2023/02/28/audio_550d815fa5.mp3", 
  },
  { 
    id: "preview-3", 
    title: "PURE - Short Preview", 
    duration: "2:00",
    audioUrl: "https://cdn.pixabay.com/audio/2022/01/21/audio_31743c58bc.mp3", 
  },
  { 
    id: "preview-4", 
    title: "Slow Down - Short Preview", 
    duration: "1:15",
    audioUrl: "https://cdn.pixabay.com/audio/2022/11/22/audio_febc508520.mp3", 
  },
  { 
    id: "preview-5", 
    title: "SAVAGE - Short Preview", 
    duration: "1:50",
    audioUrl: "https://cdn.pixabay.com/audio/2021/09/06/audio_cf68a35639.mp3", 
  },
];

function TrackRow({ track, index }: { track: typeof tracks[0], index: number }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handlePauseOthers = (e: any) => {
      if (e.detail?.except !== track.id && isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      }
    };
    window.addEventListener("pause-all-songs", handlePauseOthers);
    return () => window.removeEventListener("pause-all-songs", handlePauseOthers);
  }, [track.id, isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      window.dispatchEvent(new CustomEvent("pause-bgm"));
      window.dispatchEvent(new CustomEvent("pause-all-songs", { detail: { except: track.id } }));
      
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.play();
      }
      setIsPlaying(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "group flex items-center justify-between p-4 rounded-xl transition-all duration-300",
        isPlaying ? "bg-white/60 shadow-sm border border-white/50" : "hover:bg-white/40 border border-transparent"
      )}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
            isPlaying ? "bg-slate-800 text-white" : "bg-white/50 text-slate-700 group-hover:bg-white group-hover:text-slate-900 border border-slate-200"
          )}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-1" />}
        </button>
        <div>
          <h4 className={cn("font-medium transition-colors", isPlaying ? "text-slate-900" : "text-slate-700")}>{track.title}</h4>
          <p className="text-xs text-slate-500 font-mono flex items-center gap-2">
            {isPlaying && (
              <span className="flex gap-[2px] items-end h-2">
                <motion.span animate={{ height: [4, 8, 4] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-[2px] bg-slate-500 block" />
                <motion.span animate={{ height: [6, 12, 6] }} transition={{ repeat: Infinity, duration: 1.0 }} className="w-[2px] bg-slate-500 block" />
                <motion.span animate={{ height: [3, 10, 3] }} transition={{ repeat: Infinity, duration: 0.9 }} className="w-[2px] bg-slate-500 block" />
              </span>
            )}
            Preview
          </p>
        </div>
      </div>
      <div className="text-sm font-mono text-slate-400">
        {track.duration}
      </div>
      <audio ref={audioRef} src={track.audioUrl} onEnded={() => setIsPlaying(false)} />
    </motion.div>
  );
}

export default function VisualArchiveSection() {
  return (
    <section className="py-24 px-6 w-full max-w-3xl mx-auto relative z-10">
      <div className="flex flex-col items-center mb-12 text-center">
        <div className="w-12 h-12 rounded-full bg-white/50 border border-white flex items-center justify-center mb-6 text-slate-700">
          <Music size={20} />
        </div>
        <h2 className="text-3xl md:text-4xl font-light tracking-widest text-slate-800 mb-4">
          Audio Previews
        </h2>
        <p className="text-slate-500 font-serif italic">
          Short snippets of Taichi Mukai's discography.
        </p>
      </div>

      <div className="space-y-2 bg-white/20 backdrop-blur-xl p-6 rounded-3xl border border-white/40 shadow-sm">
        {tracks.map((track, i) => (
          <TrackRow key={track.id} track={track} index={i} />
        ))}
      </div>
    </section>
  );
}
