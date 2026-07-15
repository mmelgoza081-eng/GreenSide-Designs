import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// A short trail of particles that fall slightly behind the cursor,
// each with its own spring lag so the trail has real depth.
function TrailParticle({ cursorX, cursorY, lag, size, opacity }) {
  const x = useSpring(cursorX, { stiffness: 200 - lag * 12, damping: 20 });
  const y = useSpring(cursorY, { stiffness: 200 - lag * 12, damping: 20 });

  return (
    <motion.div
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      className="fixed top-0 left-0 z-[9998] pointer-events-none"
    >
      <div
        className="rounded-full"
        style={{
          width: size,
          height: size,
          background: 'radial-gradient(circle, rgba(167,243,208,0.9) 0%, rgba(52,211,153,0.4) 70%, transparent 100%)',
          opacity,
        }}
      />
    </motion.div>
  );
}

export default function CursorOrb() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const [clicked, setClicked] = useState(false);

  const springX = useSpring(cursorX, { stiffness: 120, damping: 18 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 18 });

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const down = () => setClicked(true);
    const up = () => setClicked(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, []);

  return (
    <>
      {/* Hide default cursor site-wide */}
      <style>{`* { cursor: none !important; }`}</style>

      {/* Trailing particles — three, decreasing in size and opacity */}
      <TrailParticle cursorX={cursorX} cursorY={cursorY} lag={3} size={16} opacity={0.35} />
      <TrailParticle cursorX={cursorX} cursorY={cursorY} lag={5} size={10} opacity={0.25} />
      <TrailParticle cursorX={cursorX} cursorY={cursorY} lag={7} size={6} opacity={0.18} />

      {/* Outer glow */}
      <motion.div
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
      >
        <motion.div
          animate={{ scale: clicked ? 1.6 : 1 }}
          transition={{ duration: 0.25 }}
          className="w-12 h-12 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(34,197,94,0.35) 0%, rgba(6,182,212,0.15) 60%, transparent 100%)',
            filter: 'blur(6px)',
          }}
        />
      </motion.div>

      {/* Core dot */}
      <motion.div
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        className="fixed top-0 left-0 z-[10000] pointer-events-none"
      >
        <motion.div
          animate={{
            scale: clicked ? [1, 1.6, 1] : [1, 1.3, 1],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="w-3 h-3 rounded-full"
          style={{
            background: 'radial-gradient(circle, #a7f3d0 0%, #22d3ee 45%, #16a34a 100%)',
            boxShadow: '0 0 12px 4px rgba(34,211,238,0.5), 0 0 24px 8px rgba(22,163,74,0.25)',
          }}
        />
      </motion.div>
    </>
  );
}
