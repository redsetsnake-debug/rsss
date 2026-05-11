import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { Image as ImageIcon } from "lucide-react";

// 可采用真实的向井太一演艺现场照片，此处以能传达强烈现场感和情绪张力的高质量无版权图片示例
const photos = [
  {
    id: "performance-1",
    type: "Documentary / 演绎纪实",
    title: "Taichi Mukai",
    // 提示：你刚上传的图片已在应用资源里，如果需要显示刚刚的图，请在左侧的文件资源管理器中创建一个 public 文件夹，并将它上传到那个文件夹并命名为 taichi-izakaya.jpg
    image: "/taichi-izakaya.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=600&auto=format&fit=crop", // An izakaya vibe fallback
    classes: "md:col-span-2 md:row-span-2 aspect-[4/5] md:aspect-auto bg-slate-800",
  },
  {
    id: "performance-2",
    type: "Live Tour / 巡演舞台",
    title: "PURE TOUR (2018)",
    image: "https://images.unsplash.com/photo-1540039155732-d674d40a4c8a?q=80&w=600&auto=format&fit=crop",
    classes: "aspect-square",
  },
  {
    id: "performance-3",
    type: "Acoustic Live / 音乐现场",
    title: "Billboard Live",
    image: "/向井太一-3.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=600&auto=format&fit=crop",
    classes: "aspect-square",
  },
  {
    id: "performance-4",
    type: "Stage / 舞台表现",
    title: "SAVAGE TOUR (2019)",
    image: "/向井太一-4.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    classes: "md:col-span-2 aspect-[2/1] md:aspect-[24/11]",
  },
  {
    id: "performance-5",
    type: "Festival / 音乐节现场",
    title: "SUMMER SONIC",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    classes: "aspect-square",
  },
  {
    id: "performance-6",
    type: "Live Photo / 演艺高光",
    title: "COLORLESS TOUR (2021)",
    image: "https://images.unsplash.com/photo-1510915361894-faa8b2d07584?q=80&w=600&auto=format&fit=crop",
    classes: "aspect-square",
  },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="py-24 px-6 w-full max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="w-12 h-12 rounded-full bg-white/50 border border-white flex items-center justify-center mb-6 text-slate-700">
          <ImageIcon size={20} />
        </div>
        <h2 className="text-3xl md:text-4xl font-light tracking-widest text-slate-800 mb-4 uppercase">
          Performance Archive
        </h2>
        <p className="text-slate-500 font-serif italic max-w-xl">
          向井太一的现场演绎与舞台经历纪实 (A visual record of Taichi Mukai's performances and stage experiences)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 md:auto-rows-[minmax(280px,auto)]">
        {photos.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={cn("group relative rounded-2xl overflow-hidden shadow-sm bg-slate-200 border border-white/60", item.classes)}
          >
            {/* Image Background */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
              style={{ backgroundImage: `url('${item.image}')` }}
            >
              {item.fallbackImage && (
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="hidden" 
                  onError={(e) => {
                    (e.currentTarget.parentElement as HTMLElement).style.backgroundImage = `url('${item.fallbackImage}')`;
                  }} 
                />
              )}
            </div>
            
            {/* Dark/Gradient Overlay */}
            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/40 transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 p-6 opacity-90 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-500">
              <span className="text-xs font-mono tracking-widest uppercase text-white/70 mb-2 block">{item.type}</span>
              <h3 className="text-xl md:text-2xl font-medium tracking-wide text-white drop-shadow-md">{item.title}</h3>
            </div>
            
            {/* Border hover effect */}
            <div className="absolute inset-0 border border-white/0 group-hover:border-white/40 transition-colors duration-500 rounded-2xl pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
