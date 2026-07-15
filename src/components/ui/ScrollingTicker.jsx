import React from 'react';
import { motion } from 'framer-motion';

const items = [
  { value: '100%', label: 'Custom Built' },
  { value: 'Always', label: 'Available to Contact' },
  { value: '$400', label: 'Starting Price' },
  { value: '∞', label: 'Revisions' },
  { value: '100%', label: 'Custom Built' },
  { value: 'Always', label: 'Available to Contact' },
  { value: '$400', label: 'Starting Price' },
  { value: '∞', label: 'Revisions' },
];

export default function ScrollingTicker() {
  return (
    <div className="w-full overflow-hidden relative py-5 border-y border-emerald-500/20 bg-[#041209]">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[350px] h-[80px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(52,211,153,0.1) 0%, transparent 70%)', filter: 'blur(28px)' }} />
        <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[300px] h-[70px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.08) 0%, transparent 70%)', filter: 'blur(22px)' }} />
      </div>

      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #041209, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #041209, transparent)' }} />

      <motion.div
        className="flex gap-0 whitespace-nowrap relative z-0"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
      >
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-4 px-12 shrink-0">
            <span className="font-display text-3xl md:text-4xl font-bold text-white">{item.value}</span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400/80">{item.label}</span>
            <span className="text-emerald-400/30 text-xl font-light ml-2">·</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}