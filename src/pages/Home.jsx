import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ValueProposition from '../components/home/ValueProposition';
import ServicesPreview from '../components/home/ServicesPreview';
import ModernProcess from '../components/home/ModernProcess';
import ModernCTA from '../components/home/ModernCTA';
import SectionReveal from '../components/home/SectionReveal';
import RiverFall from '../components/home/RiverFall';

export default function Home() {
  return (
    <>
      <HeroSection />
      <RiverFall />
      <SectionReveal><ValueProposition /></SectionReveal>
      <SectionReveal><ServicesPreview /></SectionReveal>
      <SectionReveal><ModernProcess /></SectionReveal>
      <SectionReveal><ModernCTA /></SectionReveal>
    </>
  );
}
