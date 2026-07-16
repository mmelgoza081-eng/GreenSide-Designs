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

// A single shooting star: a bright head with a fading tail, streaking at an angle.
// "fireball" variants get a warm orange/red core and a thicker, glowier tail.
function Shooter({ top, left, delay, duration, length, angle, thickness, headColor, tailColor, glow, fireball }) {
  return (
    <motion.div
      className="absolute"
      style={{ top: `${top}%`, left: `${left}%` }}
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: length * Math.cos((angle * Math.PI) / 180),
        y: length * Math.sin((angle * Math.PI) / 180),
      }}
      transition={{
        repeat: Infinity,
        repeatDelay: duration + Math.random() * 6,
        duration: fireball ? 1.5 : 1.1,
        delay,
        ease: 'easeIn',
      }}
    >
      <div className="relative" style={{ transform: `rotate(${angle}deg)`, transformOrigin: 'left center' }}>
        <div
          style={{
            width: length,
            height: thickness,
            background: `linear-gradient(90deg, ${headColor} 0%, ${tailColor} 35%, transparent 100%)`,
            borderRadius: 999,
            boxShadow: `0 0 ${glow}px ${Math.max(1, thickness / 2)}px ${headColor}`,
          }}
        />
        {/* bright head dot for extra sparkle */}
        <div
          className="absolute rounded-full"
          style={{
            width: thickness * 2.2,
            height: thickness * 2.2,
            left: -thickness * 0.6,
            top: -thickness * 0.6,
            background: headColor,
            boxShadow: `0 0 ${glow * 1.4}px ${glow / 3}px ${headColor}`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function ShootingStars({ starCount = 90, shooters = 4, fireballs = 1 }) {
  const shooterConfigs = useMemo(() => (
    Array.from({ length: shooters }).map((_, i) => ({
      id: i,
      top: Math.random() * 45,
      left: Math.random() * 65,
      delay: i * 2.1 + Math.random() * 2,
      duration: 5 + Math.random() * 4,
      length: 70 + Math.random() * 110,
      angle: 18 + Math.random() * 20,
      thickness: 1.5 + Math.random() * 2,
      headColor: 'rgba(255,255,255,0.95)',
      tailColor: 'rgba(167,243,208,0.55)',
      glow: 8 + Math.random() * 6,
      fireball: false,
    }))
  ), [shooters]);

  const fireballConfigs = useMemo(() => (
    Array.from({ length: fireballs }).map((_, i) => ({
      id: `fb-${i}`,
      top: 10 + Math.random() * 35,
      left: Math.random() * 55,
      delay: 3 + i * 4.5 + Math.random() * 3,
      duration: 8 + Math.random() * 5,
      length: 140 + Math.random() * 90,
      angle: 22 + Math.random() * 16,
      thickness: 4 + Math.random() * 2.5,
      headColor: 'rgba(255,214,140,0.98)',
      tailColor: 'rgba(251,113,36,0.6)',
      glow: 18 + Math.random() * 8,
      fireball: true,
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
