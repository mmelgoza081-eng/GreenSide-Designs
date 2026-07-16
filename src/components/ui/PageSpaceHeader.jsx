import React from 'react';
import ShootingStars from './ShootingStars';
import RadioactiveOrbs from './RadioactiveOrbs';

// A compact, dark "spacey" band for the top of secondary pages (Services,
// About, Contact) — same visual language as the homepage hero, scaled down
// so these pages get a real entrance instead of starting flat and plain.
export default function PageSpaceHeader({ children }) {
  return (
    <div className="relative overflow-hidden" style={{ background: '#050807', minHeight: '52vh' }}>
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 65% 15%, #0d1f16 0%, #060b09 50%, #030504 100%)',
      }} />
      <RadioactiveOrbs count={7} />
      <ShootingStars starCount={45} shooters={3} fireballs={1} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)',
      }} />
      <div className="relative z-10 pt-32 pb-16 px-6 md:px-12 max-w-[1440px] mx-auto">
        {children}
      </div>
    </div>
  );
}
