import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function Section3GlowingDots() {
  const dots = useMemo(() => (
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 10 + 4,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2.5,
    }))
  ), []);

  return (
    <section className="relative h-screen overflow-hidden" style={{ background: '#ffffff' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {dots.map(d => (
          <motion.div
            key={d.id}
            className="absolute rounded-full"
            style={{
              top: `${d.top}%`,
              left: `${d.left}%`,
              width: d.size,
              height: d.size,
              background: '#0a0a0a',
              boxShadow: '0 0 10px 2px rgba(0,0,0,0.5)',
            }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: d.duration, delay: d.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </section>
  );
}
