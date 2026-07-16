import React from 'react';

export default function Section2NeonMountains() {
  return (
    <section className="relative h-screen overflow-hidden" style={{ background: '#050310' }}>
      {/* Spacey backdrop */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 20%, #14082e 0%, #08041a 55%, #030110 100%)',
      }} />
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      {/* Neon mountain range */}
      <svg viewBox="0 0 1440 500" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-2/3">
        <polyline
          points="0,500 150,280 300,380 460,180 620,340 780,120 940,320 1100,200 1260,360 1440,240 1440,500 0,500"
          fill="none"
          stroke="#ff2fd6"
          strokeWidth="3"
          style={{ filter: 'drop-shadow(0 0 8px #ff2fd6) drop-shadow(0 0 18px #ff2fd6)' }}
        />
        <polyline
          points="0,500 200,340 380,420 540,260 700,400 880,220 1040,380 1200,280 1360,420 1440,360 1440,500 0,500"
          fill="none"
          stroke="#2fe4ff"
          strokeWidth="2.5"
          style={{ filter: 'drop-shadow(0 0 6px #2fe4ff) drop-shadow(0 0 14px #2fe4ff)' }}
        />
      </svg>
    </section>
  );
}
