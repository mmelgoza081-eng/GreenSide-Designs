import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import ShootingStars from '@/components/ui/ShootingStars';
import RadioactiveOrbs from '@/components/ui/RadioactiveOrbs';

export default function HeroSection() {
  const { scrollY } = useScroll();

  // The whole hero content gets pulled upward and swallowed by a shrinking
  // circle as you scroll — not a flat fade, an actual upward disappearance.
  const clipPath = useTransform(
    scrollY,
    [0, 480],
    ['circle(150% at 50% 55%)', 'circle(0% at 50% -25%)']
  );
  const contentY = useTransform(scrollY, [0, 480], [0, -80]);

  return (
    <section className="relative h-screen overflow-hidden" style={{ background: '#050807' }}>
      {/* Deep space gradient base */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 60% 20%, #0d1f16 0%, #060b09 45%, #030504 100%)',
      }} />

      {/* A whole field of glowing orbs drifting at different depths */}
      <RadioactiveOrbs count={16} />

      {/* Real shooting stars + fixed starfield */}
      <ShootingStars starCount={110} shooters={7} fireballs={2} />

      {/* Fine grid, quiet */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '48px 48px' }}
      />

      {/* Vignette for depth */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)',
      }} />

      {/* Hero content — vanishes upward through a shrinking circle on scroll */}
      <motion.div
        style={{ clipPath, y: contentY }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="font-mono text-xs uppercase tracking-[0.4em] text-emerald-400/80 mb-8"
        >
          Lacey, WA
        </motion.p>

        {/* Signature moment — the wordmark settling into place */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center leading-none mb-10 px-4 pt-3"
        >
          <span className="font-display font-bold tracking-tighter text-white text-[18vw] md:text-[12vw] lg:text-[10vw] leading-[1] pb-1">
            Green
          </span>
          <span className="font-display font-bold tracking-tighter text-white text-[18vw] md:text-[12vw] lg:text-[10vw] leading-[1] pb-1">
            Side
          </span>
          <span
            className="font-display font-bold tracking-tight italic text-[18vw] md:text-[12vw] lg:text-[10vw] leading-[1] inline-block"
            style={{
              background: 'linear-gradient(90deg, #34d399 0%, #a7f3d0 50%, #34d399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 24px rgba(52,211,153,0.35))',
              paddingRight: '0.12em',
            }}
          >
            Designs
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/contact"
            className="font-mono text-xs uppercase tracking-[0.2em] bg-emerald-400 text-[#052015] px-8 py-4 hover:bg-emerald-300 transition-all duration-300 rounded-sm shadow-lg"
            style={{ boxShadow: '0 0 30px rgba(52,211,153,0.35)' }}
          >
            Start Your Project
          </Link>
          <Link
            to="/services"
            className="font-mono text-xs uppercase tracking-[0.2em] border border-white/20 px-8 py-4 text-white hover:bg-white/5 transition-all duration-300 rounded-sm backdrop-blur-sm"
          >
            View Pricing
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="font-mono text-[11px] uppercase tracking-[0.15em] text-emerald-300/70 mt-6"
        >
          You don't pay a cent until your site is done
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <ArrowDown className="w-4 h-4 text-white/40" />
      </motion.div>
    </section>
  );
}
