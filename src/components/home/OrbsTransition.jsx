import React from 'react';
import {
  DURATION_S,
  SEAM_LINE_ANIM,
  seamLineKeyframes,
  seamLineInitialPath,
} from './seamWave';

// A thick, glowing radioactive current running the full width of the seam
// between two sections. The undulation comes from the shared seam wave, so
// the wavy edges of the images above and below it move as one shape with it.
export default function OrbsTransition() {
  const wave = {
    d: seamLineInitialPath,
    animation: `${SEAM_LINE_ANIM} ${DURATION_S}s linear infinite`,
  };

  return (
    <div className="absolute left-0 w-full pointer-events-none z-30" style={{ top: '100vh', height: 0, overflow: 'visible' }}>
      <style>{`
        ${seamLineKeyframes}
        @keyframes seamWaveGlow {
          0%, 100% { opacity: 0.55; }
          40% { opacity: 0.85; }
          70% { opacity: 0.65; }
        }
      `}</style>
      <svg
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className="absolute overflow-visible"
        style={{ left: 0, top: -18, width: '100%', height: 36 }}
      >
        <defs>
          <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#65a30d" />
            <stop offset="50%" stopColor="#a3e635" />
            <stop offset="100%" stopColor="#65a30d" />
          </linearGradient>
        </defs>

        {/* wide diffuse contamination glow */}
        <path
          fill="none"
          stroke="url(#waveGrad)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={16}
          style={{ ...wave, filter: 'blur(5px)', animation: `${SEAM_LINE_ANIM} ${DURATION_S}s linear infinite, seamWaveGlow 1.7s ease-in-out infinite` }}
        />
        {/* main body */}
        <path
          fill="none"
          stroke="url(#waveGrad)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={9.5}
          opacity={0.7}
          style={{ ...wave, filter: 'blur(2.5px)' }}
        />
        {/* bright lime edge */}
        <path
          fill="none"
          stroke="#bef264"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={5.5}
          style={{ ...wave, filter: 'drop-shadow(0 0 7px #a3e635)' }}
        />
        {/* hot core */}
        <path
          fill="none"
          stroke="#f7fee7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.2}
          style={wave}
        />
      </svg>
    </div>
  );
}
