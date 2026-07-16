import React from 'react';

// A thin, quiet mountain-range silhouette for the background of a light
// section. Deliberately faint and behind the content (z-0) — meant to be
// noticed, not stared at.
export default function MountainRange() {
  return (
    <svg
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 w-full h-40 md:h-56 pointer-events-none"
      style={{ opacity: 0.35 }}
    >
      <polyline
        points="0,220 120,150 220,190 340,90 460,170 600,60 720,150 860,100 980,180 1120,70 1260,160 1440,110 1440,220 0,220"
        fill="none"
        stroke="#34d399"
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <polyline
        points="0,220 160,190 300,205 420,150 560,200 680,130 820,195 960,160 1100,205 1260,150 1440,190 1440,220 0,220"
        fill="none"
        stroke="#0ea5e9"
        strokeWidth="1"
        strokeOpacity="0.35"
      />
    </svg>
  );
}
