import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Section2NeonMountains() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const contentScale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.75, 1, 1, 0.8]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // The curved arc rises up from the bottom near the end of the section,
  // wiping the scene away as it goes.
  const wipeY = useTransform(scrollYProgress, [0.65, 1], ['100%', '0%']);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden" style={{ background: '#050310' }}>
      {/* Your image — static, no motion, filling the entire section with no gaps */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/images/neon-mountains-cropped.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      />

      <motion.div style={{ scale: contentScale, opacity: contentOpacity }} className="absolute inset-0">
        {/* Lettering */}
        <div className="relative z-10 h-full flex flex-col items-center justify-start text-center px-6 pt-24 md:pt-32">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-fuchsia-300/80 mb-4">From idea to launch</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight max-w-lg">
            No detours. Just a straight line to launch.
          </h2>
        </div>
      </motion.div>

      {/* The curve wipe — rises up from the bottom to close out the scene into what's next */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-20 pointer-events-none"
        style={{ height: '100%', y: wipeY }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'url(/images/neon-mountains-cropped.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
          }}
        />
      </motion.div>
    </section>
  );
}
