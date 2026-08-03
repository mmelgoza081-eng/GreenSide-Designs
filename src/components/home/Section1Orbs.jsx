import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import SideNav from '@/components/navigation/SideNav';
import { AMPLITUDE_PX } from './seamWave';

export default function Section1Orbs() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // Smooths out the choppier, more frequent deltas a trackpad sends
  // compared to a mouse wheel, so this scroll-linked motion stays fluid
  // regardless of input device.
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 });

  const contentScale = useTransform(smoothProgress, [0, 1], [1, 0.7]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.8, 1], [1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden flex items-center justify-center"
      style={{
        // A hair taller than the viewport so this image still sits behind the
        // lowest dip of the wavy seam below it, leaving no gap between them.
        height: `calc(100vh + ${AMPLITUDE_PX}px)`,
        backgroundImage: 'linear-gradient(rgba(20,20,20,0.55), rgba(20,20,20,0.55)), url(/images/road-with-trees.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <SideNav />

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
        <div className="flex justify-center mt-6">
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
