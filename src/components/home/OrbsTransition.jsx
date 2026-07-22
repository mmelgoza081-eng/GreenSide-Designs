import React from 'react';
import { motion } from 'framer-motion';

// A thin band sitting between the two sections — two small glowing orbs
// travel toward each other, collide near the middle, and bounce back apart.
export default function OrbsTransition() {
  return (
    <div className="relative h-24 md:h-32 overflow-hidden" style={{ background: '#0a0a0a' }}>
      <motion.div
        className="absolute top-1/2 rounded-full"
        style={{ width: 22, height: 22, marginTop: -11, background: '#34d399', boxShadow: '0 0 16px 5px rgba(52,211,153,0.8)' }}
        animate={{ left: ['8%', '46%', '8%'] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', times: [0, 0.5, 1] }}
      />
      <motion.div
        className="absolute top-1/2 rounded-full"
        style={{ width: 22, height: 22, marginTop: -11, background: '#38bdf8', boxShadow: '0 0 16px 5px rgba(56,189,248,0.8)' }}
        animate={{ left: ['92%', '54%', '92%'] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', times: [0, 0.5, 1] }}
      />
    </div>
  );
}
