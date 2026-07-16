import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// A winding river at the top of the section that, as you scroll through it,
// straightens out and plunges into a radioactive-glowing waterfall — then the
// falling water breaks apart into swirling rings that carry you into the next
// section. Three scroll-linked phases in one continuous piece.
export default function RiverFall() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Phase 1: river straightens (0.1 -> 0.4)
  const pathMorph = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const headline = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const riverOpacity = useTransform(scrollYProgress, [0, 0.35, 0.55], [1, 1, 0]);

  // Phase 2: waterfall plunge + mist (0.35 -> 0.65)
  const fallOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const fallHeight = useTransform(scrollYProgress, [0.35, 0.65], ['0%', '100%']);
  const mistOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 0.9]);

  // Phase 3: swirls take over (0.62 -> 1)
  const swirlOpacity = useTransform(scrollYProgress, [0.62, 0.78], [0, 1]);
  const swirlScale = useTransform(scrollYProgress, [0.62, 1], [0.6, 1.4]);
  const swirlRotate = useTransform(scrollYProgress, [0.62, 1], [0, 220]);
  const subline = useTransform(scrollYProgress, [0.75, 0.92], [0, 1]);

  const windingPath = 'M 200 0 C 260 120, 120 220, 200 340 C 280 460, 130 560, 200 700 C 250 800, 180 880, 200 1000';
  const straightPath = 'M 200 0 L 200 1000';

  return (
    <section ref={ref} className="relative bg-[#040706]" style={{ height: '320vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Ambient dark backdrop, radioactive-tinted */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 50% 30%, #10230f 0%, #050a05 60%)',
        }} />

        {/* River / waterfall SVG */}
        <motion.svg style={{ opacity: riverOpacity }} viewBox="0 0 400 1000" className="absolute h-full left-1/2 -translate-x-1/2" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="riverGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d9f99d" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#84cc16" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#4d7c0f" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <motion.path
            d={useTransform(pathMorph, v => v < 1 ? windingPath : straightPath)}
            fill="none"
            stroke="url(#riverGrad)"
            strokeWidth={16}
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 18px rgba(163,230,53,0.55))' }}
          />
        </motion.svg>

        {/* Waterfall plunge + mist — radioactive lime glow */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-9"
          style={{ height: fallHeight, opacity: fallOpacity }}
        >
          <div className="w-full h-full" style={{
            background: 'linear-gradient(180deg, rgba(217,249,157,0.95) 0%, rgba(132,204,22,0.6) 55%, rgba(132,204,22,0.15) 100%)',
            filter: 'blur(1px) drop-shadow(0 0 10px rgba(163,230,53,0.6))',
          }} />
        </motion.div>
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-44 h-28 rounded-full"
          style={{
            opacity: mistOpacity,
            background: 'radial-gradient(ellipse, rgba(217,249,157,0.55) 0%, transparent 70%)',
            filter: 'blur(10px)',
          }}
        />

        {/* Phase 3 — swirls, radioactive rings expanding and rotating */}
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
                border: `2px solid rgba(163,230,53,${0.5 - i * 0.12})`,
                boxShadow: `0 0 ${20 - i * 4}px rgba(163,230,53,${0.35 - i * 0.08})`,
              }}
            />
          ))}
        </motion.div>

        {/* Copy — phase 1 headline */}
        <motion.div style={{ opacity: headline }} className="relative z-10 text-center px-6 max-w-lg">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-lime-400/80 mb-4">From idea to launch</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight">
            No detours. Just a straight line to launch.
          </h2>
        </motion.div>

        {/* Copy — phase 3 subline, fades in as swirls take over */}
        <motion.div
          style={{ opacity: subline }}
          className="absolute bottom-20 left-0 right-0 z-10 text-center px-6"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-lime-300/80">
            Ready when you are
          </p>
        </motion.div>
      </div>
    </section>
  );
}
