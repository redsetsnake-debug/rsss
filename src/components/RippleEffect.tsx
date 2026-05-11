import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function RippleEffect() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const timer = useRef<NodeJS.Timeout | null>(null);
  const rippleCount = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      if (timer.current) {
        clearTimeout(timer.current);
      }
      
      timer.current = setTimeout(() => {
        // Create ripple
        const newRipple = {
          id: rippleCount.current++,
          x: mousePos.current.x,
          y: mousePos.current.y,
        };
        setRipples((prev) => [...prev, newRipple]);
        
        // Remove ripple after animation duration
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 4000);
      }, 1000); // Trigger after 1 second of resting
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute"
            style={{ left: ripple.x, top: ripple.y }}
          >
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale: 3 + i, opacity: 0 }}
                transition={{ 
                  duration: 2.5 + i * 0.5, 
                  ease: "easeOut", 
                  delay: i * 0.3 
                }}
                className="absolute rounded-full border border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                style={{
                  left: -40,
                  top: -40,
                  width: 80,
                  height: 80,
                }}
              />
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
