import React from 'react';
import { motion } from 'framer-motion';

// A small glowing plasma sphere — layered radial gradients for 3D shading,
// an animated electric-turbulence texture for the "radiating" surface, and
// a soft outer corona.
function ElectricOrb({ color, filterId }) {
  return (
    <div className="relative" style={{ width: 44, height: 44 }}>
      {/* Outer corona glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: -14,
          background: `radial-gradient(circle, ${color}55 0%, transparent 70%)`,
        }}
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      />

      {/* Electric surface texture */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="3" seed="6" result="noise">
              <animate attributeName="seed" values="1;25;9;30;1" dur="0.8s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* The 3D sphere body */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${color} 22%, ${color}cc 45%, ${color}55 70%, transparent 100%)`,
          boxShadow: `0 0 18px 4px ${color}aa, inset -4px -4px 10px rgba(0,0,0,0.4)`,
        }}
      />

      {/* Electric filaments over the surface */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{ filter: `url(#${filterId})`, mixBlendMode: 'screen' }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `repeating-radial-gradient(circle at 40% 35%, transparent 0px, transparent 3px, ${color}88 4px, transparent 5px)`,
          }}
        />
      </div>
    </div>
  );
}

// Two electric orbs floating transparently at the seam between two
// sections — traveling toward each other, colliding, bouncing apart.
export default function OrbsTransition() {
  return (
    <div
      className="absolute left-0 w-full pointer-events-none z-30"
      style={{ top: '100vh', height: 0 }}
    >
      <motion.div
        className="absolute"
        style={{ marginTop: -22 }}
        animate={{ left: ['8%', '46%', '8%'] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', times: [0, 0.5, 1] }}
      >
        <ElectricOrb color="#34d399" filterId="orbElectricGreen" />
      </motion.div>
      <motion.div
        className="absolute"
        style={{ marginTop: -22 }}
        animate={{ left: ['92%', '54%', '92%'] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', times: [0, 0.5, 1] }}
      >
        <ElectricOrb color="#38bdf8" filterId="orbElectricBlue" />
      </motion.div>
    </div>
  );
}
