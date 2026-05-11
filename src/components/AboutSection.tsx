import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0.5 0.5"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  const items = [
    { label: "声音 (Voice)", desc: "柔软 / 透明感", color: "from-sky-500 to-indigo-500" },
    { label: "主题 (Theme)", desc: "爱 / 孤独 / 夜晚", color: "from-purple-500 to-pink-500" },
    { label: "风格 (Style)", desc: "R&B / Neo Soul", color: "from-amber-500 to-orange-500" },
  ];

  return (
    <motion.section 
      ref={ref}
      style={{ opacity, y }}
      className="py-32 px-6 flex flex-col items-center justify-center min-h-[70vh] relative z-10"
    >
      <div className="max-w-4xl w-full text-center space-y-20">
        <h2 className="text-3xl md:text-4xl font-light tracking-widest text-slate-800 uppercase">
          个人特质 / Identity
        </h2>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8 }}
           className="text-slate-600 leading-relaxed font-light text-sm md:text-base max-w-2xl mx-auto tracking-wide text-justify"
        >
          向井太一 (Mukai Taichi) 是一位来自日本福冈县的创作型实力男歌手。他以独特的 R&B、Neo Soul 风格和通透柔软的嗓音闻名，其音乐作品常常探讨城市中的孤独、爱与希望。他不仅在音乐领域展现出卓越的才华，还在时尚领域保持着敏锐的触觉，散发着清爽、干练且充满艺术感的独特魅力。
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {items.map((item, i) => (
            <motion.div 
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="flex flex-col items-center justify-center space-y-4"
            >
              <span className="text-sm tracking-[0.2em] uppercase text-slate-500">{item.label}</span>
              <h3 className={`text-2xl md:text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r ${item.color}`}>
                {item.desc}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
