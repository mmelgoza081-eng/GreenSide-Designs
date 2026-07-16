import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const PALETTES = [
  { from: 'rgba(163,230,53,0.55)', via: 'rgba(101,163,13,0.2)' },
  { from: 'rgba(190,242,100,0.5)', via: 'rgba(132,204,22,0.18)' },
  { from: 'rgba(217,249,157,0.45)', via: 'rgba(163,230,53,0.15)' },
];

function Orb({ size, top, left, drift, duration, palette, delay }) {
  return (
    <motion.div
      className="absolute"
      style={{ top, left, width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
      animate={{ y: [0, -drift, drift * 0.3, 0], x: [0, drift * 0.5, -drift * 0.2, 0] }}
      transition={{ repeat: Infinity, duration, ease: 'easeInOut', delay }}
    >
      <motion.div
        className="w-full h-full rounded-full"
        animate={{ opacity: [0.75, 1, 0.75], scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: duration * 0.4, ease: 'easeInOut' }}
        style={{ background: `radial-gradient(circle at 40% 35%, ${palette.from} 0%, ${palette.via} 45%, transparent 75%)` }}
      />
    </motion.div>
  );
}

export default function Section1Orbs() {
  const orbs = useMemo(() => (
    [
      { size: 420, top: '20%', left: '15%' },
      { size: 340, top: '55%', left: '75%' },
      { size: 280, top: '75%', left: '30%' },
      { size: 500, top: '10%', left: '65%' },
      { size: 240, top: '85%', left: '85%' },
    ].map((o, i) => ({
      ...o,
      id: i,
      drift: 25 + Math.random() * 30,
      duration: 9 + Math.random() * 8,
      delay: Math.random() * 3,
      palette: PALETTES[i % PALETTES.length],
    }))
  ), []);

  return (
    <section className="relative h-screen overflow-hidden" style={{ background: '#6b7280' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {orbs.map(o => <Orb key={o.id} {...o} />)}
      </div>
    </section>
  );
}
