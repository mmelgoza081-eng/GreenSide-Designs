import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ModernCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-32 md:py-44 px-6 md:px-12 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1410 0%, #0d1a16 30%, #0f1a1e 60%, #0a1018 100%)' }}>
      {/* One quiet ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(52,211,153,0.07) 0%, transparent 55%)',
      }} />

      <div ref={ref} className="relative z-10 max-w-[1280px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border"
          style={{ background: 'rgba(52,211,153,0.1)', borderColor: 'rgba(52,211,153,0.3)' }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-300">Ready to Begin?</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-4 max-w-4xl mx-auto text-white"
        >
          Your business is <span className="text-emerald-400 italic">one of a kind</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="font-display text-2xl md:text-4xl font-bold italic text-white/40 mb-14"
        >
          Your website should be too.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/contact"
            className="font-mono text-xs uppercase tracking-[0.15em] px-10 py-5 min-w-[200px] rounded-full font-bold transition-all duration-300 hover:scale-105"
            style={{ background: '#34d399', color: '#0a0a0b' }}
          >
            Get in Touch →
          </Link>
          <Link
            to="/services"
            className="font-mono text-xs uppercase tracking-[0.15em] border-2 border-white/20 px-10 py-5 min-w-[200px] rounded-full text-white/70 hover:border-emerald-400/60 hover:text-emerald-300 transition-all duration-300 font-bold"
          >
            View Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
