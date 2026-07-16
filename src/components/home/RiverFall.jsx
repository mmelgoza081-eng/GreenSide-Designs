import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// A swirling purple "sky" at the top feeds down into a winding electric-blue
// current. As you scroll, the current straightens and jitters like live
// electricity, then plunges into a glowing fall, and finally breaks into
// slow rotating rings that ease the page into what comes next. Every phase
// overlaps generously so nothing pops in or out abruptly.
export default function RiverFall() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Phase 1: river straightens, eased rather than linear
  const pathMorph = useTransform(scrollYProgress, [0.06, 0.1, 0.4, 0.46], [0, 0, 1, 1]);
  const headline = useTransform(scrollYProgress, [0, 0.1, 0.28, 0.36], [0, 1, 1, 0]);
  const riverOpacity = useTransform(scrollYProgress, [0, 0.32, 0.5, 0.6], [1, 1, 1, 0]);
  const skyOpacity = useTransform(scrollYProgress, [0, 0.3, 0.55], [1, 0.7, 0]);

  // Phase 2: plunge + mist, eased in
  const fallOpacity = useTransform(scrollYProgress, [0.32, 0.4, 0.58, 0.66], [0, 1, 1, 0.9]);
  const fallHeight = useTransform(scrollYProgress, [0.32, 0.42, 0.6, 0.68], ['0%', '55%', '90%', '100%']);
  const mistOpacity = useTransform(scrollYProgress, [0.45, 0.6, 0.75], [0, 0.8, 0.5]);

  // Phase 3: rings ease in and carry the page forward
  const swirlOpacity = useTransform(scrollYProgress, [0.58, 0.7, 0.9, 1], [0, 1, 1, 1]);
  const swirlScale = useTransform(scrollYProgress, [0.58, 1], [0.55, 1.35]);
  const swirlRotate = useTransform(scrollYProgress, [0.58, 1], [0, 200]);
  const subline = useTransform(scrollYProgress, [0.68, 0.8, 0.94, 1], [0, 1, 1, 0]);

  // Blend into the next (white) section gradually, not a hard cutoff
  const blendOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  const windingPath = 'M 200 0 C 260 120, 120 220, 200 340 C 280 460, 130 560, 200 700 C 250 800, 180 880, 200 1000';
  const straightPath = 'M 200 0 L 200 1000';

  return (
    <section ref={ref} className="relative bg-[#04060a]" style={{ height: '230vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Ambient dark backdrop */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 50% 15%, #170a2e 0%, #050810 55%)',
        }} />

        {/* Purple swirling "sky" up top, feeding down into the current */}
        <motion.div style={{ opacity: skyOpacity }} className="absolute inset-x-0 top-0 h-[60%] pointer-events-none overflow-hidden">
          <motion.div
            className="absolute left-1/2 top-0 -translate-x-1/2"
            style={{ width: '140%', aspectRatio: '1/1' }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
          >
            <div style={{
              width: '100%', height: '100%',
              background: 'conic-gradient(from 0deg, rgba(167,139,250,0.28), rgba(56,189,248,0.12), rgba(167,139,250,0.32), rgba(56,189,248,0.1), rgba(167,139,250,0.28))',
              borderRadius: '50%',
              filter: 'blur(40px)',
            }} />
          </motion.div>
          <motion.div
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: '10%', width: '70%', aspectRatio: '1/1' }}
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
          >
            <div style={{
              width: '100%', height: '100%',
              background: 'conic-gradient(from 90deg, transparent, rgba(196,181,253,0.35), transparent 60%)',
              borderRadius: '50%',
              filter: 'blur(24px)',
            }} />
          </motion.div>
        </motion.div>

        {/* Electric filter — jittery displacement to sell "live current" */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <filter id="electricJitter" x="-50%" y="-50%" width="200%" height="200%">
              <feTurbulence type="fractalNoise" baseFrequency="0.015 0.06" numOctaves="2" seed="7" result="noise">
                <animate attributeName="seed" values="1;40;12;55;1" dur="1.2s" repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        {/* River / current SVG */}
        <motion.svg style={{ opacity: riverOpacity }} viewBox="0 0 400 1000" className="absolute h-full left-1/2 -translate-x-1/2" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="riverGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.45" />
            </linearGradient>
          </defs>
          <motion.path
            d={useTransform(pathMorph, v => v < 1 ? windingPath : straightPath)}
            fill="none"
            stroke="url(#riverGrad)"
            strokeWidth={14}
            strokeLinecap="round"
            strokeDasharray="26 14"
            filter="url(#electricJitter)"
            style={{ filter: 'url(#electricJitter) drop-shadow(0 0 16px rgba(56,189,248,0.65))' }}
            animate={{ strokeDashoffset: [0, -1200] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
          />
        </motion.svg>

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

        {/* Phase 3 — rings that ease in and carry the eye forward */}
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

        {/* Copy — phase 1 headline */}
        <motion.div style={{ opacity: headline }} className="relative z-10 text-center px-6 max-w-lg">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-sky-300/80 mb-4">From idea to launch</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight">
            No detours. Just a straight line to launch.
          </h2>
        </motion.div>

        {/* Copy — phase 3 subline */}
        <motion.div
          style={{ opacity: subline }}
          className="absolute bottom-20 left-0 right-0 z-10 text-center px-6"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-sky-300/80">
            Ready when you are
          </p>
        </motion.div>

        {/* Gradual blend into the next (light) section */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
          style={{ opacity: blendOpacity, background: 'linear-gradient(180deg, transparent 0%, #ffffff 100%)' }}
        />
      </div>
    </section>
  );
}
