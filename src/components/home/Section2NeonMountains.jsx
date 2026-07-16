import React from 'react';
import { motion } from 'framer-motion';

export default function Section2NeonMountains() {
  return (
    <section className="relative h-screen overflow-hidden" style={{ background: '#050310' }}>
      {/* Spacey backdrop */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 15%, #14082e 0%, #08041a 55%, #030110 100%)',
      }} />
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      {/* Static/radiation filter for the mountain lines */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="mountainStatic" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.04" numOctaves="2" seed="4" result="noise">
              <animate attributeName="seed" values="1;30;8;45;1" dur="0.9s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Realistic layered mountain range — back range fainter, front range sharper */}
      <svg viewBox="0 0 1440 500" preserveAspectRatio="none" className="absolute" style={{ bottom: '32%', left: 0, width: '100%', height: '55%' }}>
        {/* Back range */}
        <polyline
          points="0,420 90,300 170,360 250,240 330,330 410,200 500,310 590,230 680,340 770,210 860,320 950,250 1040,350 1130,220 1220,330 1310,260 1440,300 1440,500 0,500"
          fill="none"
          stroke="#7a2fff"
          strokeWidth="2"
          opacity="0.55"
          filter="url(#mountainStatic)"
          style={{ filter: 'url(#mountainStatic) drop-shadow(0 0 6px #7a2fff)' }}
        />
        {/* Front range */}
        <polyline
          points="0,500 60,340 140,420 230,260 320,400 410,230 500,390 600,270 690,410 780,240 870,400 960,280 1050,420 1140,250 1230,400 1320,290 1440,350 1440,500 0,500"
          fill="none"
          stroke="#ff2fd6"
          strokeWidth="3"
          filter="url(#mountainStatic)"
          style={{ filter: 'url(#mountainStatic) drop-shadow(0 0 8px #ff2fd6) drop-shadow(0 0 18px #ff2fd6)' }}
        />
      </svg>

      {/* 3D perspective lake — the transition piece into the next section */}
      <div className="absolute bottom-0 left-0 w-full" style={{ height: '32%', perspective: '400px', overflow: 'hidden' }}>
        {/* Reflection of the mountains, flipped and faded */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(122,47,255,0.18) 0%, rgba(255,47,214,0.12) 40%, transparent 90%)',
        }} />
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-full" style={{ transform: 'scaleY(-1)', opacity: 0.35 }}>
          <polyline
            points="0,200 60,80 140,160 230,20 320,140 410,10 500,130 600,30 690,150 780,10 870,140 960,40 1050,150 1140,10 1230,140 1320,50 1440,90 1440,200 0,200"
            fill="none"
            stroke="#ff2fd6"
            strokeWidth="3"
          />
        </svg>

        {/* Converging perspective lines to sell depth going "out" toward the viewer */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: '160%',
            height: '100%',
            transform: 'rotateX(55deg)',
            transformOrigin: 'bottom center',
            backgroundImage: `
              repeating-linear-gradient(90deg, rgba(56,189,248,0.35) 0px, rgba(56,189,248,0.35) 1px, transparent 1px, transparent 60px),
              repeating-linear-gradient(0deg, rgba(56,189,248,0.25) 0px, rgba(56,189,248,0.25) 1px, transparent 1px, transparent 40px)
            `,
          }}
        />

        {/* Water shimmer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(56,189,248,0.2) 100%)' }}
        />
      </div>
    </section>
  );
}
