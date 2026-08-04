import React from 'react';
import {
  DURATION_S,
  seamLineRawInitialPath,
  seamLineAnimateValues,
} from './seamWave';

// Shared <animate> props for the seam's shape — SVG native SMIL animation on
// the `d` attribute, not the CSS `d` property, since CSS `d` keyframe
// animation has much patchier mobile browser support (some engines silently
// leave the path at its unanimated/empty state, which reads as "the wavy
// edge is there but the green line isn't").
const dAnimateProps = {
  attributeName: 'd',
  values: seamLineAnimateValues,
  dur: `${DURATION_S}s`,
  repeatCount: 'indefinite',
  calcMode: 'linear',
};

// A thick, glowing radioactive current running the full width of the seam
// between two sections. The undulation comes from the shared seam wave, so
// the wavy edges of the images above and below it move as one shape with it.
export default function OrbsTransition() {
  return (
    <div className="absolute left-0 w-full pointer-events-none z-30" style={{ top: '100vh', height: 0, overflow: 'visible' }}>
      <style>{`
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
          {/* Native SVG blur instead of a CSS filter on the path — CSS
              filter:blur() on SVG shapes is unreliable on mobile browsers
              (notably iOS Safari), which silently drops these two green
              glow layers there, leaving only the solid-color edge/core
              paths below visible — the exact "line with no green" bug. */}
          <filter id="seamBlurWide" x="-20%" y="-400%" width="140%" height="900%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <filter id="seamBlurMain" x="-20%" y="-400%" width="140%" height="900%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        {/* wide diffuse contamination glow */}
        <path
          fill="none"
          stroke="url(#waveGrad)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={16}
          filter="url(#seamBlurWide)"
          d={seamLineRawInitialPath}
          style={{ animation: 'seamWaveGlow 1.7s ease-in-out infinite' }}
        >
          <animate {...dAnimateProps} />
        </path>
        {/* main body */}
        <path
          fill="none"
          stroke="url(#waveGrad)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={9.5}
          opacity={0.7}
          filter="url(#seamBlurMain)"
          d={seamLineRawInitialPath}
        >
          <animate {...dAnimateProps} />
        </path>
        {/* bright lime edge */}
        <path
          fill="none"
          stroke="#bef264"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={5.5}
          style={{ filter: 'drop-shadow(0 0 7px #a3e635)' }}
          d={seamLineRawInitialPath}
        >
          <animate {...dAnimateProps} />
        </path>
        {/* hot core */}
        <path
          fill="none"
          stroke="#f7fee7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.2}
          d={seamLineRawInitialPath}
        >
          <animate {...dAnimateProps} />
        </path>
      </svg>
    </div>
  );
}
