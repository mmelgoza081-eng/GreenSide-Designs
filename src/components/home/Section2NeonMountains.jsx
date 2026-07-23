import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Small twinkling stars layered on top of the image for extra life.
function TwinklingStars({ count = 35 }) {
  const stars = useMemo(() => (
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: Math.random() * 70,
      left: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 2.5 + 1.8,
    }))
  ), [count]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map(s => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size, background: '#a5d8ff', boxShadow: '0 0 4px 1px rgba(147,197,253,0.9)' }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ repeat: Infinity, duration: s.duration, delay: s.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export default function Section2NeonMountains() {
  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      style={{
        backgroundImage: 'url(/images/neon-mountains-cropped.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 60%',
      }}
    >
      {/* Drifting nebula gas, layered on top of the image */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ top: '-10%', left: '-10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(52,211,153,0.25) 0%, transparent 70%)', mixBlendMode: 'screen' }}
        animate={{ x: [0, 40, -20, 0], y: [0, 20, -10, 0] }}
        transition={{ repeat: Infinity, duration: 22, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{ top: '10%', right: '-15%', width: '55%', height: '55%', background: 'radial-gradient(circle, rgba(239,68,68,0.22) 0%, transparent 70%)', mixBlendMode: 'screen' }}
        animate={{ x: [0, -30, 25, 0], y: [0, -25, 15, 0] }}
        transition={{ repeat: Infinity, duration: 26, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{ bottom: '-5%', left: '20%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)', mixBlendMode: 'screen' }}
        animate={{ x: [0, 20, -30, 0], y: [0, -15, 10, 0] }}
        transition={{ repeat: Infinity, duration: 19, ease: 'easeInOut' }}
      />

      <TwinklingStars />

      <div className="relative z-10 h-full flex flex-col items-center justify-start text-center px-6 pt-24 md:pt-32">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-fuchsia-300/80 mb-4">From idea to launch</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight max-w-lg">
          No detours. Just a straight line to launch.
        </h2>
      </div>
    </section>
  );
}
