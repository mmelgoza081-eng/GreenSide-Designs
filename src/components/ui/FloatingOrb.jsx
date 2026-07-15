import React from 'react';
import { motion } from 'framer-motion';

// A large soft glowing sphere that drifts slowly — reads as a distant sun/star,
// not a decoration. One per section, at most.
export default function FloatingOrb({
  size = 420,
  top = '10%',
  left = '65%',
  colorFrom = 'rgba(52,211,153,0.55)',
  colorVia = 'rgba(16,185,129,0.22)',
  drift = 26,
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top, left, width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
      animate={{ y: [0, -drift, 0], x: [0, drift * 0.4, 0] }}
      transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }}
    >
      <motion.div
        className="w-full h-full rounded-full"
        animate={{ opacity: [0.85, 1, 0.85], scale: [1, 1.04, 1] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        style={{
          background: `radial-gradient(circle at 42% 38%, ${colorFrom} 0%, ${colorVia} 45%, transparent 72%)`,
          filter: 'blur(2px)',
        }}
      />
    </motion.div>
  );
}
