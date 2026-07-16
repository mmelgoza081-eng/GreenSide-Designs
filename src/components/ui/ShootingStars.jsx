import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Fixed starfield — small static points of light, varied sizes and warmth
function StaticStars({ count = 90 }) {
  const stars = useMemo(() => (
    Array.from({ length: count }).map((_, i) => {
      const tint = Math.random();
      const color = tint < 0.7 ? '#ffffff' : tint < 0.88 ? '#bfe9ff' : '#ffe9c4';
      return {
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 6,
        duration: Math.random() * 3 + 2.5,
        color,
      };
    })
  ), [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map(s => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size, background: s.color }}
          animate={{ opacity: [0.15, 0.9, 0.15] }}
          transition={{ repeat: Infinity, duration: s.duration, delay: s.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// A real shooting star: travels a long diagonal distance, well off-screen in
// both directions, so it visibly crosses the whole viewport rather than
// popping in and out. Built from a tapered multi-stop tail plus a bright
// head dot, all riding one rotated group so the tail always points backward.
function Shooter({ startTop, startLeft, angle, distance, duration, delay, repeatDelay, thickness, headColor, tailColor, glow }) {
  const rad = (angle * Math.PI) / 180;
  const dx = distance * Math.cos(rad);
  const dy = distance * Math.sin(rad);

  return (
    <motion.div
      className="absolute"
      style={{ top: `${startTop}%`, left: `${startLeft}%` }}
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{ opacity: [0, 1, 1, 1, 0], x: [0, dx * 0.15, dx * 0.85, dx, dx], y: [0, dy * 0.15, dy * 0.85, dy, dy] }}
      transition={{
        repeat: Infinity,
        repeatDelay,
        duration,
        delay,
        ease: 'linear',
        times: [0, 0.08, 0.75, 0.94, 1],
      }}
    >
      <div style={{ transform: `rotate(${angle}deg)`, transformOrigin: 'left center' }}>
        {/* Long tapering tail */}
        <div
          style={{
            width: thickness * 26,
            height: thickness,
            background: `linear-gradient(90deg, ${headColor} 0%, ${tailColor} 25%, transparent 90%)`,
            borderRadius: 999,
            boxShadow: `0 0 ${glow}px ${thickness}px ${headColor}`,
          }}
        />
        {/* Bright head */}
        <div
          className="absolute rounded-full"
          style={{
            width: thickness * 2.4,
            height: thickness * 2.4,
            left: -thickness * 0.7,
            top: -thickness * 0.7,
            background: headColor,
            boxShadow: `0 0 ${glow * 1.5}px ${glow / 2.5}px ${headColor}`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function ShootingStars({ starCount = 90, shooters = 5, fireballs = 2 }) {
  const shooterConfigs = useMemo(() => (
    Array.from({ length: shooters }).map((_, i) => {
      const angle = 16 + Math.random() * 24;
      return {
        id: i,
        startTop: -8 + Math.random() * 40,
        startLeft: -10 + Math.random() * 55,
        angle,
        distance: 900 + Math.random() * 500,
        duration: 2.6 + Math.random() * 1.6,
        delay: i * 3.2 + Math.random() * 3,
        repeatDelay: 6 + Math.random() * 8,
        thickness: 1.4 + Math.random() * 1.8,
        headColor: 'rgba(255,255,255,0.95)',
        tailColor: 'rgba(167,243,208,0.6)',
        glow: 7 + Math.random() * 5,
      };
    })
  ), [shooters]);

  const fireballConfigs = useMemo(() => (
    Array.from({ length: fireballs }).map((_, i) => ({
      id: `fb-${i}`,
      startTop: -5 + Math.random() * 30,
      startLeft: -8 + Math.random() * 40,
      angle: 20 + Math.random() * 18,
      distance: 1100 + Math.random() * 500,
      duration: 4.5 + Math.random() * 2,
      delay: 4 + i * 6 + Math.random() * 4,
      repeatDelay: 10 + Math.random() * 8,
      thickness: 3.5 + Math.random() * 2,
      headColor: 'rgba(255,214,140,0.98)',
      tailColor: 'rgba(251,113,36,0.65)',
      glow: 16 + Math.random() * 8,
    }))
  ), [fireballs]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <StaticStars count={starCount} />
      {shooterConfigs.map(cfg => <Shooter key={cfg.id} {...cfg} />)}
      {fireballConfigs.map(cfg => <Shooter key={cfg.id} {...cfg} />)}
    </div>
  );
}
