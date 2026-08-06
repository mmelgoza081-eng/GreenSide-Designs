import React from 'react';
import { motion } from 'framer-motion';

const TINTS = {
  green: { a: 'rgba(52,211,153,0.32)', b: 'rgba(163,230,53,0.26)', c: 'rgba(30,107,60,0.22)', d: 'rgba(16,185,129,0.24)', e: 'rgba(132,204,22,0.2)', dots: '#16a34a' },
  blue: { a: 'rgba(96,165,250,0.32)', b: 'rgba(103,232,249,0.26)', c: 'rgba(37,99,235,0.2)', d: 'rgba(59,130,246,0.24)', e: 'rgba(14,165,233,0.2)', dots: '#0284c7' },
  amber: { a: 'rgba(251,146,60,0.32)', b: 'rgba(252,211,77,0.26)', c: 'rgba(217,119,6,0.2)', d: 'rgba(245,158,11,0.24)', e: 'rgba(234,88,12,0.2)', dots: '#d97706' },
};

// Orbs positioned as % down the *page's* full height (not the viewport), so
// as you scroll through a long page like Services or About, new color keeps
// showing up behind each section instead of the same fixed corner glow
// repeating forever.
const ORBS = [
  { size: 560, top: '-6%', side: 'right', offset: '-12%', key: 'a', duration: 16 },
  { size: 420, top: '14%', side: 'left', offset: '-10%', key: 'b', duration: 18 },
  { size: 380, top: '34%', side: 'right', offset: '-8%', key: 'c', duration: 20 },
  { size: 460, top: '54%', side: 'left', offset: '-10%', key: 'd', duration: 17 },
  { size: 400, top: '76%', side: 'right', offset: '-9%', key: 'e', duration: 19 },
  { size: 340, top: '92%', side: 'left', offset: '-6%', key: 'a', duration: 21 },
];

// A light-mode version of the homepage's glow — soft, drifting color washes
// behind the content. Scrolls with the page (rather than staying pinned to
// the viewport) so a long page keeps encountering new color as you go, not
// just the same corner orbs repeating. Each page passes its own `theme`.
export default function AmbientBackground({ theme = 'green' }) {
  const tint = TINTS[theme] || TINTS.green;
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size, height: orb.size, top: orb.top,
            [orb.side]: orb.offset,
            background: `radial-gradient(circle, ${tint[orb.key]} 0%, transparent 70%)`,
          }}
          animate={{ y: [0, i % 2 === 0 ? 24 : -20, 0], x: [0, i % 2 === 0 ? -14 : 16, 0] }}
          transition={{ repeat: Infinity, duration: orb.duration, ease: 'easeInOut' }}
        />
      ))}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: `radial-gradient(circle, ${tint.dots} 1.5px, transparent 1.5px)`, backgroundSize: '48px 48px' }}
      />
    </div>
  );
}
