import React from 'react';
import { motion } from 'framer-motion';

const TINTS = {
  green: { a: 'rgba(52,211,153,0.16)', b: 'rgba(163,230,53,0.12)', dots: '#16a34a' },
  blue: { a: 'rgba(96,165,250,0.16)', b: 'rgba(103,232,249,0.12)', dots: '#0284c7' },
  amber: { a: 'rgba(251,146,60,0.16)', b: 'rgba(252,211,77,0.12)', dots: '#d97706' },
};

// A quiet, light-mode version of the homepage's glow — a couple of soft
// orbs drifting behind the content. Meant for Services/About/Contact:
// present enough that the page doesn't feel empty, restrained enough to stay
// out of the way of reading. Each page passes its own `theme` for variety.
export default function AmbientBackground({ theme = 'green' }) {
  const tint = TINTS[theme] || TINTS.green;
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 480, height: 480, top: '-8%', right: '-10%',
          background: `radial-gradient(circle, ${tint.a} 0%, transparent 70%)`,
        }}
        animate={{ y: [0, 24, 0], x: [0, -14, 0] }}
        transition={{ repeat: Infinity, duration: 16, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 360, height: 360, bottom: '5%', left: '-8%',
          background: `radial-gradient(circle, ${tint.b} 0%, transparent 70%)`,
        }}
        animate={{ y: [0, -20, 0], x: [0, 16, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `radial-gradient(circle, ${tint.dots} 1px, transparent 1px)`, backgroundSize: '56px 56px' }}
      />
    </div>
  );
}
