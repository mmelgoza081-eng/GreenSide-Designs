import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// A winding river at the top of the section that, as you scroll through it,
// straightens out and plunges into a waterfall at the bottom — the "river
// becomes a waterfall" scroll moment.
export default function RiverFall() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // The river path morphs from a winding curve (0) to a straight vertical drop (1)
  const pathMorph = useTransform(scrollYProgress, [0.15, 0.65], [0, 1]);
  const fallOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);
  const fallHeight = useTransform(scrollYProgress, [0.55, 0.85], ['0%', '100%']);
  const mistOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 0.9]);
  const headline = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const windingPath = 'M 200 0 C 260 120, 120 220, 200 340 C 280 460, 130 560, 200 700 C 250 800, 180 880, 200 1000';
  const straightPath = 'M 200 0 L 200 1000';

  return (
    <section ref={ref} className="relative bg-[#040706]" style={{ height: '220vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Ambient dark backdrop */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 50% 30%, #0a1a12 0%, #040706 60%)',
        }} />

        {/* River / waterfall SVG */}
        <svg viewBox="0 0 400 1000" className="absolute h-full left-1/2 -translate-x-1/2" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="riverGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a7f3d0" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <motion.path
            d={useTransform(pathMorph, v => v < 1 ? windingPath : straightPath)}
            fill="none"
            stroke="url(#riverGrad)"
            strokeWidth={18}
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 12px rgba(52,211,153,0.4))' }}
          />
        </svg>

        {/* Waterfall plunge + mist, appears once the river has straightened */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-10"
          style={{ height: fallHeight, opacity: fallOpacity }}
        >
          <div className="w-full h-full" style={{
            background: 'linear-gradient(180deg, rgba(167,243,208,0.9) 0%, rgba(16,185,129,0.5) 60%, rgba(16,185,129,0.15) 100%)',
            filter: 'blur(1px)',
          }} />
        </motion.div>
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-40 h-24 rounded-full"
          style={{
            opacity: mistOpacity,
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.5) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />

        {/* Copy */}
        <motion.div style={{ opacity: headline }} className="relative z-10 text-center px-6 max-w-lg">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400/80 mb-4">Momentum, start to finish</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight">
            Every project builds toward a launch that hits with force.
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
