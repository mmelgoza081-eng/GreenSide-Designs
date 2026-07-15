import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorOrb() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  const springX = useSpring(cursorX, { stiffness: 120, damping: 18 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 18 });

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      {/* Hide default cursor site-wide */}
      <style>{`* { cursor: none !important; }`}</style>

      {/* Outer glow */}
      <motion.div
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
      >
        <div
          className="w-12 h-12 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(34,197,94,0.35) 0%, rgba(6,182,212,0.15) 60%, transparent 100%)',
            filter: 'blur(6px)',
            transform: 'scale(1)',
          }}
        />
      </motion.div>

      {/* Core dot */}
      <motion.div
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        className="fixed top-0 left-0 z-[10000] pointer-events-none"
      >
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="w-3 h-3 rounded-full"
          style={{
            background: 'radial-gradient(circle, #22d3ee 0%, #16a34a 70%)',
            boxShadow: '0 0 12px 4px rgba(34,211,238,0.5), 0 0 24px 8px rgba(22,163,74,0.25)',
          }}
        />
      </motion.div>
    </>
  );
}