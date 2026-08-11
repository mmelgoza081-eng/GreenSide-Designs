import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function Section3GlowingDots() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // Smooths out the choppier, more frequent deltas a trackpad sends
  // compared to a mouse wheel, so this scroll-linked motion stays fluid
  // regardless of input device.
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 });

  // Expand in as it arrives
  const contentScale = useTransform(smoothProgress, [0, 0.3], [0.75, 1]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.25], [0, 1]);

  // Kept much lower than Section2's transitionDots count — these are spread
  // across a plain viewport-sized box where every dot is potentially
  // visible at once, unlike Section2's, where most of the placed dots sit
  // outside the visible circle/viewport at any given moment. Matching count
  // 1:1 read as noticeably denser here than there.
  //
  // Desktop-only: more dots and a wider drift range, purely a density/
  // motion bump for that viewport — mobile keeps its original count/range
  // untouched.
  const dots = useMemo(() => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
    return Array.from({ length: isDesktop ? 34 : 20 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 10 + 4,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2.5,
      driftX: (isDesktop ? 35 : 20) + Math.random() * (isDesktop ? 65 : 40),
      driftY: (isDesktop ? 35 : 20) + Math.random() * (isDesktop ? 65 : 40),
      driftDuration: 6 + Math.random() * 8,
    }));
  }, []);

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
              // Matches Section2's transitionDots opacity floor (0.75, not
              // 0.4) so the dot field reads as one continuous system
              // carrying through the circle transition into this page,
              // rather than two differently-tuned fields.
              opacity: [0.75, 1, 0.75],
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
