import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Section2NeonMountains() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const contentScale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.75, 1, 1, 0.8]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // The mountain starts hidden below the fold and rises into view as you
  // scroll — that rise IS the transition, not a separate effect on top of it.
  const mountainY = useTransform(scrollYProgress, [0.15, 0.55], ['55%', '0%']);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden" style={{ background: '#050310' }}>
      {/* Real starfield/space fills all the negative space — no black rectangle */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 15%, #14082e 0%, #08041a 55%, #030110 100%)',
      }} />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '55px 55px' }}
      />

      <motion.div style={{ scale: contentScale, opacity: contentOpacity }} className="absolute inset-0">
        {/* Lettering */}
        <div className="relative z-10 h-full flex flex-col items-center justify-start text-center px-6 pt-24 md:pt-32">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-fuchsia-300/80 mb-4">From idea to launch</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight max-w-lg">
            No detours. Just a straight line to launch.
          </h2>
        </div>

        {/* The neon mountain range — starts low, rises into view as you scroll */}
        <motion.div
          className="absolute bottom-0 left-0 w-full"
          style={{
            height: '70%',
            y: mountainY,
            backgroundImage: 'url(/images/neon-mountains-cropped.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
          }}
        />
      </motion.div>
    </section>
  );
}
