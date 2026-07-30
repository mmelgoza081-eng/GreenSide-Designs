import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Section3GlowingDots() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Expand in as it arrives
  const contentScale = useTransform(scrollYProgress, [0, 0.3], [0.75, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  const dots = useMemo(() => (
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 10 + 4,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2.5,
      driftX: 20 + Math.random() * 40,
      driftY: 20 + Math.random() * 40,
      driftDuration: 6 + Math.random() * 8,
    }))
  ), []);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden flex items-center justify-center" style={{ background: '#ffffff' }}>
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
            animate={{
              opacity: [0.4, 1, 0.4],
              x: [0, d.driftX, -d.driftX * 0.4, 0],
              y: [0, -d.driftY, d.driftY * 0.5, 0],
            }}
            transition={{
              opacity: { repeat: Infinity, duration: d.duration, delay: d.delay, ease: 'easeInOut' },
              x: { repeat: Infinity, duration: d.driftDuration, delay: d.delay, ease: 'easeInOut' },
              y: { repeat: Infinity, duration: d.driftDuration * 1.15, delay: d.delay, ease: 'easeInOut' },
            }}
          />
        ))}
      </div>

      <motion.div style={{ scale: contentScale, opacity: contentOpacity }} className="relative z-10 text-center px-6 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-600 mb-6">What We Do</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.1] text-foreground">
          We build websites that make you <span className="text-velvet italic">impossible</span> to ignore.
        </h2>
      </motion.div>
    </section>
  );
}
