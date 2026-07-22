import React from 'react';
import Section1Orbs from '../components/home/Section1Orbs';
import OrbsTransition from '../components/home/OrbsTransition';
import Section2NeonMountains from '../components/home/Section2NeonMountains';
import Section3GlowingDots from '../components/home/Section3GlowingDots';

export default function Home() {
  return (
    <div className="relative">
      <Section1Orbs />
      <OrbsTransition />
      <Section2NeonMountains />
      <Section3GlowingDots />
    </div>
  );
}
