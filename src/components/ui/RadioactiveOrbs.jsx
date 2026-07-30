import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// A whole field of glowing "radioactive" orbs at different depths — small ones
// drift fast and subtle, big ones drift slow and bold. Designed to fill a
// hero section so nothing reads as empty space.
export const ORB_PALETTES = {
  green: [
    { from: 'rgba(163,230,53,0.55)', via: 'rgba(101,163,13,0.2)' },   // radioactive lime
    { from: 'rgba(52,211,153,0.55)', via: 'rgba(5,150,105,0.18)' },   // emerald
    { from: 'rgba(45,212,191,0.5)', via: 'rgba(13,148,136,0.16)' },   // teal
  ],
  blue: [
    { from: 'rgba(125,211,252,0.55)', via: 'rgba(3,105,161,0.2)' },   // sky
    { from: 'rgba(96,165,250,0.5)', via: 'rgba(29,78,216,0.18)' },    // blue
    { from: 'rgba(103,232,249,0.5)', via: 'rgba(8,145,178,0.16)' },   // cyan
  ],
  amber: [
    { from: 'rgba(252,211,77,0.55)', via: 'rgba(180,83,9,0.2)' },     // amber
    { from: 'rgba(251,146,60,0.5)', via: 'rgba(194,65,12,0.18)' },    // orange
    { from: 'rgba(254,240,138,0.45)', via: 'rgba(161,98,7,0.16)' },   // gold
  ],
};

function Orb({ size, top, left, drift, duration, palette, delay }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top, left, width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
      animate={{
        y: [0, -drift, drift * 0.3, 0],
        x: [0, drift * 0.5, -drift * 0.2, 0],
      }}
      transition={{ repeat: Infinity, duration, ease: 'easeInOut', delay }}
    >
      <motion.div
        className="w-full h-full rounded-full"
        animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: duration * 0.4, ease: 'easeInOut' }}
        style={{
          background: `radial-gradient(circle at 40% 35%, ${palette.from} 0%, ${palette.via} 45%, transparent 75%)`,
        }}
      />
    </motion.div>
  );
}

export default function RadioactiveOrbs({ count = 14, palette = 'green' }) {
  const palettes = ORB_PALETTES[palette] || ORB_PALETTES.green;
  const orbs = useMemo(() => (
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: 40 + Math.random() * 140,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      drift: 20 + Math.random() * 50,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 4,
      palette: palettes[i % palettes.length],
    }))
  ), [count, palettes]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map(o => <Orb key={o.id} {...o} />)}
    </div>
  );
}
