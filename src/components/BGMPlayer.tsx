import { useState, useRef, useEffect } from "react";
import { Music, Pause } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

export default function BGMPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2; // 默认音量调小一点
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.log("浏览器限制了自动播放，需用户手动点击:", err);
          setIsPlaying(false);
        });
      }
    }
  }, []);

  // 监听全局暂停事件（当播放具体歌曲时，暂停BGM）
  useEffect(() => {
    const handlePauseBgm = () => {
      if (audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };
    window.addEventListener("pause-bgm", handlePauseBgm);
    return () => window.removeEventListener("pause-bgm", handlePauseBgm);
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // 播放BGM时，暂停其他歌曲
        window.dispatchEvent(new CustomEvent("pause-all-songs", { detail: { except: "bgm" } }));
        audioRef.current.volume = 0.2;
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "w-14 h-14 rounded-full glass flex items-center justify-center transition-all shadow-lg",
          isPlaying ? "bg-white/80 text-purple-600 border-purple-300" : "text-slate-500 bg-white/40"
        )}
        title="播放/暂停背景音乐"
      >
        {isPlaying ? <Pause size={22} /> : <Music size={22} />}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-purple-400/50"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        )}
      </motion.button>
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3"
        loop
      />
    </div>
  );
}
