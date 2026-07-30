import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import ShootingStars from './ShootingStars';
import RadioactiveOrbs from './RadioactiveOrbs';
import SideNav from '@/components/navigation/SideNav';

// The original treatment — orb field + shooting stars, just recolored via
// palette. Kept as-is for About, per request, while Services/Contact get
// their own distinct backdrops below.
function OrbFieldBackdrop({ palette }) {
  return (
    <>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 65% 15%, #0a1a2e 0%, #060d18 50%, #030509 100%)' }} />
      <RadioactiveOrbs count={7} palette={palette} />
      <ShootingStars starCount={45} shooters={3} fireballs={1} />
    </>
  );
}

// Services — a structured blueprint grid with pulsing data nodes at the
// intersections, reads as "pricing tiers / building blocks" rather than a
// starfield.
function ServicesBackdrop() {
  const nodes = useMemo(() => (
    Array.from({ length: 9 }).map((_, i) => ({
      id: i,
      top: `${12 + Math.random() * 76}%`,
      left: `${8 + Math.random() * 84}%`,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
    }))
  ), []);

  return (
    <>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 65% 15%, #0d1f16 0%, #060b09 50%, #030504 100%)' }} />
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: 'linear-gradient(rgba(163,230,53,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.5) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      {nodes.map(n => (
        <motion.div
          key={n.id}
          className="absolute rounded-full"
          style={{ top: n.top, left: n.left, width: 6, height: 6, marginLeft: -3, marginTop: -3, background: '#a3e635', boxShadow: '0 0 10px 3px rgba(163,230,53,0.7)' }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.4, 0.8] }}
          transition={{ repeat: Infinity, duration: n.duration, delay: n.delay, ease: 'easeInOut' }}
        />
      ))}
      <motion.div
        className="absolute inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(163,230,53,0.7), transparent)' }}
        animate={{ top: ['10%', '90%', '10%'] }}
        transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
      />
    </>
  );
}

// Contact — a signal reaching out: pulsing transmission rings from a fixed
// point plus a few connected nodes, reads as "let's connect" rather than a
// starfield either.
function ContactBackdrop() {
  const nodes = useMemo(() => (
    Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      top: `${20 + Math.random() * 55}%`,
      left: `${55 + Math.random() * 38}%`,
    }))
  ), []);

  return (
    <>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 65% 15%, #2e1e0a 0%, #180f06 50%, #090502 100%)' }} />
      <style>{`
        @keyframes contactPingRing {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(9); opacity: 0; }
        }
      `}</style>
      <div className="absolute" style={{ top: '35%', left: '68%' }}>
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 20, height: 20, marginLeft: -10, marginTop: -10,
              border: '1.5px solid rgba(252,211,77,0.8)',
              animation: `contactPingRing 3.5s ease-out ${i * 1.15}s infinite`,
            }}
          />
        ))}
        <div className="absolute rounded-full" style={{ width: 10, height: 10, marginLeft: -5, marginTop: -5, background: '#fcd34d', boxShadow: '0 0 14px 4px rgba(252,211,77,0.8)' }} />
      </div>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.5 }}>
        {nodes.map((n, i) => (
          <line key={n.id} x1="68%" y1="35%" x2={n.left} y2={n.top} stroke="rgba(252,211,77,0.35)" strokeWidth="1" strokeDasharray="4 4" />
        ))}
      </svg>
      {nodes.map(n => (
        <motion.div
          key={n.id}
          className="absolute rounded-full pointer-events-none"
          style={{ top: n.top, left: n.left, width: 5, height: 5, marginLeft: -2.5, marginTop: -2.5, background: '#fde68a' }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 + Math.random() * 2, ease: 'easeInOut' }}
        />
      ))}
    </>
  );
}

const VARIANTS = {
  services: { bg: '#050807', Backdrop: ServicesBackdrop },
  blue: { bg: '#050a10', Backdrop: () => <OrbFieldBackdrop palette="blue" /> },
  contact: { bg: '#0a0704', Backdrop: ContactBackdrop },
};

// A compact, dark band for the top of secondary pages (Services, About,
// Contact) — same dark shell and layout rhythm across all three so the site
// still feels like one system. Services and Contact get their own backdrop
// motif; About keeps the original orb field per request.
export default function PageSpaceHeader({ children, theme = 'services' }) {
  const variant = VARIANTS[theme] || VARIANTS.services;
  const Backdrop = variant.Backdrop;
  return (
    <div className="relative overflow-hidden" style={{ background: variant.bg, minHeight: '52vh' }}>
      <Backdrop />
      <SideNav />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)',
      }} />
      <div className="relative z-10 pt-32 pb-16 px-6 md:px-12 max-w-[1440px] mx-auto">
        {children}
      </div>
    </div>
  );
}
