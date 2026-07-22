import React from 'react';
import { motion } from 'framer-motion';

// Two small glowing orbs floating transparently right at the seam between
// two sections — no background band of their own, just layered on top of
// whatever's already there, straddling both pages.
export default function OrbsTransition() {
  return (
    <div
      className="absolute left-0 w-full pointer-events-none z-30"
      style={{ top: '100vh', height: 0 }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{ width: 22, height: 22, marginTop: -11, background: '#34d399', boxShadow: '0 0 16px 5px rgba(52,211,153,0.8)' }}
        animate={{ left: ['8%', '46%', '8%'] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', times: [0, 0.5, 1] }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{ width: 22, height: 22, marginTop: -11, background: '#38bdf8', boxShadow: '0 0 16px 5px rgba(56,189,248,0.8)' }}
        animate={{ left: ['92%', '54%', '92%'] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', times: [0, 0.5, 1] }}
      />
    </div>
  );
}
