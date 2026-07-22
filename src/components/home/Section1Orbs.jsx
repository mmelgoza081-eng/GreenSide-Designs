import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

// Two small glowing orbs that travel toward each other, collide near the
// center, and bounce back apart — not blending into one, actually hitting.
function MergingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-1/2 rounded-full"
        style={{ width: 22, height: 22, marginTop: -11, background: '#34d399', boxShadow: '0 0 16px 5px rgba(52,211,153,0.8)' }}
        animate={{ left: ['8%', '46%', '8%'] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', times: [0, 0.5, 1] }}
      />
      <motion.div
        className="absolute top-1/2 rounded-full"
        style={{ width: 22, height: 22, marginTop: -11, background: '#38bdf8', boxShadow: '0 0 16px 5px rgba(56,189,248,0.8)' }}
        animate={{ left: ['92%', '54%', '92%'] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', times: [0, 0.5, 1] }}
      />
    </div>
  );
}

export default function Section1Orbs() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: 'linear-gradient(rgba(20,20,20,0.55), rgba(20,20,20,0.55)), url(/images/road-with-trees.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <MergingOrbs />

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
            className="font-mono text-xs uppercase tracking-[0.2em] bg-white text-[#2d2d2d] px-8 py-4 hover:bg-white/90 transition-all duration-300 rounded-sm"
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
