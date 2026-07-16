import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

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
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // De-expand as you scroll out of this section
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

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
    <section ref={ref} className="relative h-screen overflow-hidden flex items-center justify-center" style={{ background: '#6b7280' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {orbs.map(o => <Orb key={o.id} {...o} />)}
      </div>

      <motion.div style={{ scale: contentScale, opacity: contentOpacity }} className="relative z-10 flex flex-col items-center text-center px-6">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-white/80 mb-6">Lacey, WA</p>
        <div className="flex flex-col items-center leading-none mb-4 px-4 pt-3">
          <span className="font-display font-bold tracking-tighter text-white text-[min(15vw,17vh)] md:text-[min(12vw,16vh)] lg:text-[min(9vw,15vh)] leading-[1.05] pb-2">
            Green
          </span>
          <span className="font-display font-bold tracking-tighter text-white text-[min(15vw,17vh)] md:text-[min(12vw,16vh)] lg:text-[min(9vw,15vh)] leading-[1.05] pb-2">
            Side
          </span>
          <span
            className="font-display font-bold tracking-tight italic text-[min(15vw,17vh)] md:text-[min(12vw,16vh)] lg:text-[min(9vw,15vh)] leading-[1.05] inline-block pb-2"
            style={{
              background: 'linear-gradient(90deg, #34d399 0%, #a7f3d0 50%, #34d399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 24px rgba(52,211,153,0.45))',
              paddingRight: '0.12em',
            }}
          >
            Designs
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link
            to="/contact"
            className="font-mono text-xs uppercase tracking-[0.2em] bg-white text-[#6b7280] px-8 py-4 hover:bg-white/90 transition-all duration-300 rounded-sm"
          >
            Start Your Project
          </Link>
          <Link
            to="/services"
            className="font-mono text-xs uppercase tracking-[0.2em] border border-white/50 px-8 py-4 text-white hover:bg-white/10 transition-all duration-300 rounded-sm"
          >
            View Pricing
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
