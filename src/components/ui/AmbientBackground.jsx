import React from 'react';
import { motion } from 'framer-motion';

// A quiet, light-mode version of the homepage's glow — a couple of soft
// green orbs drifting behind the content. Meant for Services/About/Contact:
// present enough that the page doesn't feel empty, restrained enough to stay
// out of the way of reading.
export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 480, height: 480, top: '-8%', right: '-10%',
          background: 'radial-gradient(circle, rgba(52,211,153,0.16) 0%, transparent 70%)',
        }}
        animate={{ y: [0, 24, 0], x: [0, -14, 0] }}
        transition={{ repeat: Infinity, duration: 16, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 360, height: 360, bottom: '5%', left: '-8%',
          background: 'radial-gradient(circle, rgba(163,230,53,0.12) 0%, transparent 70%)',
        }}
        animate={{ y: [0, -20, 0], x: [0, 16, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, #16a34a 1px, transparent 1px)', backgroundSize: '56px 56px' }}
      />
    </div>
  );
}
