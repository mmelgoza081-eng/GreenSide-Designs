import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const contentY = useTransform(scrollY, [0, 500], [0, 60]);

  return (
    <section className="relative h-screen overflow-hidden bg-white">
      {/* Soft pearlescent background — the only ambient layer */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf8 30%, #ecfdf5 55%, #ffffff 100%)',
      }} />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 40%, rgba(52,211,153,0.10) 0%, transparent 65%)',
      }} />

      {/* Fine dot grid, very quiet */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: 'radial-gradient(circle, #141414 1px, transparent 1px)', backgroundSize: '44px 44px' }}
      />

      {/* Hero content */}
      <motion.div
        style={{ opacity, y: contentY }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="font-mono text-xs uppercase tracking-[0.4em] text-emerald-600/70 mb-8"
        >
          Lacey, WA
        </motion.p>

        {/* Signature moment — the wordmark settling into place */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center leading-none mb-10"
        >
          <span className="font-display font-bold tracking-tighter text-foreground text-[18vw] md:text-[12vw] lg:text-[10vw] leading-[0.9]">
            Green
          </span>
          <span className="font-display font-bold tracking-tighter text-foreground text-[18vw] md:text-[12vw] lg:text-[10vw] leading-[0.9]">
            Side
          </span>
          <span className="font-display font-bold tracking-tighter text-velvet italic text-[18vw] md:text-[12vw] lg:text-[10vw] leading-[0.9]">
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
            className="font-mono text-xs uppercase tracking-[0.2em] bg-velvet text-white px-8 py-4 hover:bg-emerald-500 transition-all duration-300 rounded-sm shadow-lg shadow-emerald-900/15"
          >
            Start Your Project
          </Link>
          <Link
            to="/services"
            className="font-mono text-xs uppercase tracking-[0.2em] border border-velvet/30 px-8 py-4 text-foreground hover:bg-emerald-50 transition-all duration-300 rounded-sm"
          >
            View Pricing
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <ArrowDown className="w-4 h-4 text-foreground/30" />
      </motion.div>
    </section>
  );
}
