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
      className="absolute pointer-events-none"
      style={{
        right: '12%',
        bottom: 0,
        height: useTransform(dropProgress, [0, 1], ['0%', '160%']),
        width: 40,
        overflow: 'visible',
      }}
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

// The realistic ridge line — organic, uneven peaks, not uniform triangles.
// One path, reused for the mountain body, its glowing ridge, and (flipped)
// the lake's reflection, so the lean and shape always match exactly.
const RIDGE_PATH = 'M0,340 C40,300 55,250 90,230 C130,208 150,260 190,235 C230,210 250,120 300,95 C350,72 380,150 430,175 C480,200 520,110 580,90 C640,72 670,180 730,205 C790,230 830,140 890,120 C950,102 990,210 1050,230 C1110,250 1150,160 1210,150 C1270,140 1310,230 1370,245 C1410,255 1430,220 1440,210';

export default function Section2NeonMountains() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const contentScale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.75, 1, 1, 0.8]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const dropProgress = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden" style={{ background: '#050310' }}>
      <motion.div style={{ scale: contentScale, opacity: contentOpacity }} className="absolute inset-0">
        {/* Lettering */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6" style={{ marginTop: '-10%' }}>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-fuchsia-300/80 mb-4">From idea to launch</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight max-w-lg">
            No detours. Just a straight line to launch.
          </h2>
        </div>

        {/* The neon mountain range — your reference image, used directly */}
        <div
          className="absolute bottom-[30%] left-0 w-full"
          style={{
            height: '50%',
            backgroundImage: 'url(/images/neon-mountains.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
          }}
        />

        {/* The lake — a mirrored reflection of the same image, tinted */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ height: '30%' }}>
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, rgba(20,10,40,0.85) 0%, rgba(10,5,25,0.95) 100%)',
          }} />
          <div
            className="absolute w-full"
            style={{
              top: 0,
              height: '160%',
              backgroundImage: 'url(/images/neon-mountains.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center bottom',
              transform: 'scaleY(-1)',
              opacity: 0.3,
              filter: 'blur(1.5px)',
            }}
          />
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: [0.15, 0.35, 0.15] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            style={{
              background: 'repeating-linear-gradient(180deg, rgba(56,189,248,0.12) 0px, transparent 3px, transparent 9px)',
            }}
          />
          <div className="absolute right-[10%] top-0 bottom-0 w-24" style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.25) 100%)',
          }} />
        </div>

        {/* Neon dotted waterfall — pours off the lake's edge into the next section */}
        <NeonWaterfall dropProgress={dropProgress} />
      </motion.div>
    </section>
  );
}
