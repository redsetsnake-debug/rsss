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
