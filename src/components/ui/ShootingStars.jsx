import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Fixed starfield — small static points of light
function StaticStars({ count = 90 }) {
  const stars = useMemo(() => (
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 1.6 + 0.6,
      delay: Math.random() * 6,
      duration: Math.random() * 3 + 2.5,
    }))
  ), [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map(s => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.15, 0.9, 0.15] }}
          transition={{ repeat: Infinity, duration: s.duration, delay: s.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// A single shooting star: a bright head with a fading tail, streaking at an angle
function Shooter({ top, left, delay, duration, length }) {
  return (
    <motion.div
      className="absolute"
      style={{ top: `${top}%`, left: `${left}%` }}
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{ opacity: [0, 1, 1, 0], x: length, y: length * 0.45 }}
      transition={{
        repeat: Infinity,
        repeatDelay: duration + Math.random() * 6,
        duration: 1.1,
        delay,
        ease: 'easeIn',
      }}
    >
      <div
        style={{
          width: length,
          height: 2,
          background: 'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(167,243,208,0.5) 35%, transparent 100%)',
          transform: 'rotate(24deg)',
          transformOrigin: 'left center',
          borderRadius: 999,
          boxShadow: '0 0 8px 1px rgba(255,255,255,0.6)',
        }}
      />
    </motion.div>
  );
}

export default function ShootingStars({ starCount = 90, shooters = 4 }) {
  const shooterConfigs = useMemo(() => (
    Array.from({ length: shooters }).map((_, i) => ({
      id: i,
      top: Math.random() * 40,
      left: Math.random() * 60,
      delay: i * 2.4 + Math.random() * 2,
      duration: 5 + Math.random() * 4,
      length: 90 + Math.random() * 60,
    }))
  ), [shooters]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <StaticStars count={starCount} />
      {shooterConfigs.map(cfg => (
        <Shooter key={cfg.id} {...cfg} />
      ))}
    </div>
  );
}
