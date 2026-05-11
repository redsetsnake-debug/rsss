import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function HeroSection({ mood = "default" }: { mood?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const moodColorMap: Record<string, string> = {
    default: "text-purple-700",
    night: "text-indigo-800",
    rain: "text-blue-700",
    lonely: "text-slate-600",
    love: "text-pink-600",
    courage: "text-amber-700",
    chill: "text-cyan-700",
  };

  const currentTextColor = moodColorMap[mood] || moodColorMap.default;

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <motion.section 
      ref={ref}
      style={{ opacity, y, scale }}
      className="relative min-h-screen flex flex-col justify-center px-12 text-left"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end max-w-7xl mx-auto w-full pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="col-span-12 md:col-span-7 pb-12"
        >
          <div className="mb-6 opacity-60 text-xs uppercase tracking-[0.5em] text-slate-500">正在聆听 / Now Breathing</div>
          <h1 className={`text-4xl md:text-6xl font-light leading-tight mb-8 font-serif transition-colors duration-1000 ${currentTextColor}`}>
            <span className="inline-block transition-all hover:blur-none">漂</span>
            <span className="inline-block blur-[0.5px] opacity-90 mx-[1px]">う</span>
            <span className="inline-block">夜</span>
            <span className="inline-block blur-[0.5px] opacity-90 mx-[1px]">に</span>
            <span className="inline-block">、</span>
            <br className="md:hidden" />
            <span className="italic text-5xl md:text-7xl md:ml-8 block mt-2">
              <span className="inline-block">君</span>
              <span className="inline-block blur-[1px] opacity-80 mx-[1px]">の</span>
              <span className="inline-block">声</span>
              <span className="inline-block blur-[0.5px] mx-[1px]">だ</span>
              <span className="inline-block">け</span>
              <span className="inline-block">が</span>
              <span className="inline-block blur-[1.5px] opacity-70 mx-[1px]">残</span>
              <span className="inline-block">る。</span>
            </span>
          </h1>
          <div className="flex items-center space-x-4 pt-4">
            <span className="text-sm tracking-widest text-slate-500 italic">漂流的夜里，唯有你的声音萦绕不散。</span>
          </div>
        </motion.div>
        
        {/* Photo Section */}
        <motion.div 
          className="col-span-12 md:col-span-5 flex flex-col items-center md:items-end w-full pb-12 z-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
        >
          <div className="relative w-64 h-80 md:w-80 md:h-[420px] rounded-[2rem] p-3 bg-white/40 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.05)] rotate-3 hover:rotate-0 transition-transform duration-700">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-200/40 to-blue-200/40 rounded-[2rem] -z-10 blur-xl" />
            
            <div 
              className="w-full h-full rounded-[1.5rem] bg-cover bg-center overflow-hidden relative shadow-inner"
              style={{ backgroundImage: `url('/向井太一-5.jpg')`, imageRendering: 'high-quality' }}
            >
            </div>
            
            {/* Decorative colored blobs */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-300/40 rounded-full blur-2xl -z-10 pointer-events-none"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-cyan-300/40 rounded-full blur-2xl -z-10 pointer-events-none"></div>
          </div>
        </motion.div>
      </div>
      

    </motion.section>
  );
}
