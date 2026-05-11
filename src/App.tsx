/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from "react";
import BackgroundFlow from "./components/BackgroundFlow";
import HeroSection from "./components/HeroSection";
import SongsSection from "./components/SongsSection";
import AboutSection from "./components/AboutSection";
import VisualArchiveSection from "./components/VisualArchiveSection";
import GallerySection from "./components/GallerySection";
import BGMPlayer from "./components/BGMPlayer";

export default function App() {
  const [theme, setTheme] = useState<"default" | "night" | "rain" | "lonely" | "love" | "courage">("default");

  return (
    <div className="relative min-h-screen font-sans selection:bg-purple-200/50">
      <BackgroundFlow mood={theme} />
      <BGMPlayer />
      
      {/* Navigation / Header */}
      <header className="fixed top-0 inset-x-0 px-8 py-8 md:px-12 flex justify-between items-center z-50">
        <div className="flex items-baseline space-x-3">
          <div className="text-xl md:text-2xl font-bold tracking-[0.3em] uppercase text-slate-800">Taichi Mukai</div>
          <div className="text-sm md:text-base font-medium tracking-widest text-slate-600">向井太一</div>
        </div>
        <nav className="hidden md:flex space-x-10 text-[11px] uppercase tracking-[0.2em] font-semibold text-slate-500">
          <a href="#home" className="hover:text-slate-800 transition-colors">首页 / Home</a>
          <a href="#songs" className="hover:text-slate-800 transition-colors">单曲 / Songs</a>
          <a href="#about" className="hover:text-slate-800 transition-colors">关于 / About</a>
          <a href="#archive" className="hover:text-slate-800 transition-colors">视觉纪实 / Archive</a>
        </nav>
      </header>

      <main className="relative z-10 flex-1">
        <div id="home"><HeroSection /></div>
        <div className="h-24" /> {/* Spacing */}
        <div id="songs"><SongsSection onThemeChange={setTheme} /></div>
        <div id="about"><AboutSection /></div>
        <div id="archive"><VisualArchiveSection /></div>
        <div id="gallery"><GallerySection /></div>
      </main>

      <footer className="relative z-10 px-8 py-10 md:px-12 flex flex-col md:flex-row justify-between items-end mt-24 text-slate-500 gap-8">
        <div className="flex flex-col space-y-4">
          <div className="text-[10px] uppercase tracking-[0.3em] opacity-60">沉浸式音乐体验 / Immersive Experience</div>
          <div className="text-xs font-mono">© {new Date().getFullYear()} 向井太一 (Taichi Mukai)</div>
        </div>

        <div className="flex items-center space-x-12 pb-2">
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-widest opacity-60 mb-1">当前状态 / Current State</div>
            <div className="text-xs font-medium capitalize text-slate-800">{theme} 节奏</div>
          </div>
          <div className="flex space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
