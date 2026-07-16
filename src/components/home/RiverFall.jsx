import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Picks up right where ScrollLineTransition's iris closes — the current
// plunges into a radioactive-blue waterfall, then breaks into slow rotating
// rings that ease the page into what comes next.
export default function RiverFall() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const fallOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.4, 0.5], [0, 1, 1, 0.9]);
  const fallHeight = useTransform(scrollYProgress, [0.05, 0.18, 0.4, 0.5], ['0%', '55%', '90%', '100%']);
  const mistOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.55], [0, 0.8, 0.5]);

  const swirlOpacity = useTransform(scrollYProgress, [0.4, 0.55, 0.85, 1], [0, 1, 1, 1]);
  const swirlScale = useTransform(scrollYProgress, [0.4, 1], [0.55, 1.35]);
  const swirlRotate = useTransform(scrollYProgress, [0.4, 1], [0, 200]);
  const subline = useTransform(scrollYProgress, [0.5, 0.65, 0.9, 1], [0, 1, 1, 0]);

  const blendOpacity = useTransform(scrollYProgress, [0.75, 1], [0, 1]);

  return (
    <section ref={ref} className="relative bg-[#04060a]" style={{ height: '180vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 50% 15%, #170a2e 0%, #050810 55%)',
        }} />

        {/* Waterfall plunge + mist — electric blue glow */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-9"
          style={{ height: fallHeight, opacity: fallOpacity }}
        >
          <div className="w-full h-full" style={{
            background: 'linear-gradient(180deg, rgba(224,242,254,0.95) 0%, rgba(56,189,248,0.65) 55%, rgba(14,165,233,0.15) 100%)',
            filter: 'blur(1px) drop-shadow(0 0 12px rgba(56,189,248,0.6))',
          }} />
        </motion.div>
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-44 h-28 rounded-full"
          style={{
            opacity: mistOpacity,
            background: 'radial-gradient(ellipse, rgba(224,242,254,0.55) 0%, transparent 70%)',
            filter: 'blur(10px)',
          }}
        />

        {/* Rings that ease in and carry the eye forward */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: swirlOpacity, scale: swirlScale, rotate: swirlRotate }}
        >
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 140 + i * 90,
                height: 140 + i * 90,
                left: -(140 + i * 90) / 2,
                top: -(140 + i * 90) / 2,
                border: `2px solid rgba(56,189,248,${0.5 - i * 0.12})`,
                boxShadow: `0 0 ${20 - i * 4}px rgba(56,189,248,${0.35 - i * 0.08})`,
              }}
            />
          ))}
        </motion.div>

        <motion.div
          style={{ opacity: subline }}
          className="absolute bottom-20 left-0 right-0 z-10 text-center px-6"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-sky-300/80">
            Ready when you are
          </p>
        </motion.div>

        <motion.div
          className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
          style={{ opacity: blendOpacity, background: 'linear-gradient(180deg, transparent 0%, #ffffff 100%)' }}
        />
      </div>
    </section>
  );
}
