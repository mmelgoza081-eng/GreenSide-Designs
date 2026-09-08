import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Falling rain streaks — thin vertical lines that loop top-to-bottom at
// varied speed, depth, and drift, standing in for the starfield/orb motifs
// used elsewhere on the site. Built for the gutter-cleaning pages, not the
// web-design leftovers, so it needed its own visual instead of reusing them.
export default function RainStreaks({ count = 36, color = 'rgba(163,230,53,0.5)' }) {
  const drops = useMemo(() => (
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      length: 40 + Math.random() * 90,
      duration: 1.4 + Math.random() * 1.8,
      delay: Math.random() * 3,
      thickness: 1 + Math.random() * 1.2,
      opacity: 0.25 + Math.random() * 0.5,
    }))
  ), [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {drops.map(d => (
        <motion.div
          key={d.id}
          className="absolute top-0 rounded-full"
          style={{
            left: `${d.left}%`,
            width: d.thickness,
            height: d.length,
            background: `linear-gradient(180deg, transparent 0%, ${color} 50%, transparent 100%)`,
            opacity: d.opacity,
          }}
          animate={{ y: ['-20%', '120%'] }}
          transition={{ repeat: Infinity, duration: d.duration, delay: d.delay, ease: 'linear' }}
        />
      ))}
    </div>
  );
}
