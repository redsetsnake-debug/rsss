import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

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
          <h1 className="text-4xl md:text-6xl font-light leading-tight mb-8 font-serif text-slate-800">
            漂う夜に、<br className="md:hidden" />
            <span className="italic text-5xl md:text-7xl md:ml-8 opacity-90 block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600">
              君の声だけが残る。
            </span>
          </h1>
          <div className="flex items-center space-x-4 pt-4">
            <div className="h-[1px] w-24 bg-slate-400"></div>
            <span className="text-sm tracking-widest text-slate-500 italic">漂流的夜里，唯有你的声音萦绕不散。</span>
          </div>
        </motion.div>
        
        {/* Placeholder element for the Right side in smaller/larger displays if we want */}
        <div className="col-span-12 md:col-span-5 flex flex-col items-end">
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[10px] tracking-widest text-slate-400 uppercase">向下滚动 / Scroll</span>
        <motion.div 
          className="w-[1px] h-12 bg-gradient-to-b from-slate-400 to-transparent"
          animate={{ height: ["0px", "48px"], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.section>
  );
}
