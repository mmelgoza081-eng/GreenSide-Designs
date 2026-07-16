import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// A beaded/dotted neon waterfall — a column of small glowing dots that
// "fall," matching the dotted-line style used elsewhere on the site.
function NeonWaterfall({ dropProgress }) {
  const dots = useMemo(() => (
    Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      xOffset: (Math.random() - 0.5) * 14,
      size: 5 + Math.random() * 4,
      delay: i * 0.06,
    }))
  ), []);

  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 bottom-0 pointer-events-none"
      style={{ height: useTransform(dropProgress, [0, 1], ['0%', '160%']), width: 40, overflow: 'visible' }}
    >
      {dots.map((d, i) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `calc(50% + ${d.xOffset}px)`,
            width: d.size,
            height: d.size,
            background: '#38bdf8',
            boxShadow: '0 0 8px 2px rgba(56,189,248,0.8)',
          }}
          animate={{ top: ['-5%', '105%'], opacity: [0, 1, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, delay: d.delay, ease: 'linear' }}
        />
      ))}
    </motion.div>
  );
}

export default function Section2NeonMountains() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Expand in as you scroll into the section, de-expand as you leave
  const contentScale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.75, 1, 1, 0.8]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const dropProgress = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden" style={{ background: '#050310' }}>
      {/* Spacey backdrop */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 15%, #14082e 0%, #08041a 55%, #030110 100%)',
      }} />
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      {/* Static/radiation filter for the mountain lines */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="mountainStatic" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.04" numOctaves="2" seed="4" result="noise">
              <animate attributeName="seed" values="1;30;8;45;1" dur="0.9s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <motion.div style={{ scale: contentScale, opacity: contentOpacity }} className="absolute inset-0">
        {/* Lettering */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-fuchsia-300/80 mb-4">From idea to launch</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight max-w-lg">
            No detours. Just a straight line to launch.
          </h2>
        </div>

        {/* Realistic layered mountain silhouettes with a neon-glowing ridge line */}
        <svg viewBox="0 0 1440 500" preserveAspectRatio="none" className="absolute" style={{ bottom: '32%', left: 0, width: '100%', height: '55%' }}>
          <defs>
            <linearGradient id="farMountainFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a1a52" />
              <stop offset="100%" stopColor="#160c30" />
            </linearGradient>
            <linearGradient id="nearMountainFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#180a2e" />
              <stop offset="100%" stopColor="#0a0518" />
            </linearGradient>
          </defs>

          {/* Far range — hazier, lower contrast, atmospheric perspective */}
          <path
            d="M0,500 L0,300 L60,235 L95,270 L150,175 L210,255 L270,140 L330,240 L400,150 L460,235 L530,120 L600,225 L670,160 L740,235 L810,130 L880,220 L950,175 L1020,240 L1090,150 L1160,230 L1230,170 L1300,235 L1370,190 L1440,220 L1440,500 Z"
            fill="url(#farMountainFill)"
            opacity="0.7"
          />
          <path
            d="M0,300 L60,235 L95,270 L150,175 L210,255 L270,140 L330,240 L400,150 L460,235 L530,120 L600,225 L670,160 L740,235 L810,130 L880,220 L950,175 L1020,240 L1090,150 L1160,230 L1230,170 L1300,235 L1370,190 L1440,220"
            fill="none"
            stroke="#7a2fff"
            strokeWidth="1.5"
            opacity="0.45"
            filter="url(#mountainStatic)"
            style={{ filter: 'url(#mountainStatic) drop-shadow(0 0 5px #7a2fff)' }}
          />

          {/* Near range — sharper, darker body, brighter glowing ridge */}
          <path
            d="M0,500 L0,360 L45,300 L85,345 L130,255 L180,335 L240,225 L300,330 L365,235 L430,345 L500,220 L565,335 L630,245 L700,350 L770,235 L840,340 L905,255 L975,345 L1045,230 L1115,335 L1185,255 L1255,340 L1330,265 L1400,330 L1440,300 L1440,500 Z"
            fill="url(#nearMountainFill)"
          />
          <path
            d="M0,360 L45,300 L85,345 L130,255 L180,335 L240,225 L300,330 L365,235 L430,345 L500,220 L565,335 L630,245 L700,350 L770,235 L840,340 L905,255 L975,345 L1045,230 L1115,335 L1185,255 L1255,340 L1330,265 L1400,330 L1440,300"
            fill="none"
            stroke="#ff2fd6"
            strokeWidth="2.5"
            filter="url(#mountainStatic)"
            style={{ filter: 'url(#mountainStatic) drop-shadow(0 0 8px #ff2fd6) drop-shadow(0 0 18px #ff2fd6)' }}
          />
        </svg>

        {/* 3D perspective lake */}
        <div className="absolute bottom-0 left-0 w-full" style={{ height: '32%', overflow: 'hidden' }}>
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, rgba(122,47,255,0.18) 0%, rgba(255,47,214,0.12) 40%, transparent 90%)',
          }} />
          <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-full" style={{ transform: 'scaleY(-1)', opacity: 0.35 }}>
            <polyline
              points="0,200 50,90 110,150 170,40 230,140 300,20 370,130 440,30 520,140 590,20 670,130 740,30 820,140 890,20 970,130 1040,30 1120,140 1190,40 1270,130 1350,50 1440,90 1440,200 0,200"
              fill="none"
              stroke="#ff2fd6"
              strokeWidth="3"
            />
          </svg>
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            style={{
              width: '160%',
              height: '100%',
              transform: 'rotateX(55deg)',
              transformOrigin: 'bottom center',
              backgroundImage: `
                repeating-linear-gradient(90deg, rgba(56,189,248,0.35) 0px, rgba(56,189,248,0.35) 1px, transparent 1px, transparent 60px),
                repeating-linear-gradient(0deg, rgba(56,189,248,0.25) 0px, rgba(56,189,248,0.25) 1px, transparent 1px, transparent 40px)
              `,
            }}
          />
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: [0.15, 0.3, 0.15] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(56,189,248,0.2) 100%)' }}
          />
        </div>

        {/* Neon dotted waterfall — pours out of the lake into the next section */}
        <NeonWaterfall dropProgress={dropProgress} />
      </motion.div>
    </section>
  );
}
