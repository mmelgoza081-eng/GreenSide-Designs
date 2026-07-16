import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ValueProposition from '../components/home/ValueProposition';
import ServicesPreview from '../components/home/ServicesPreview';
import ModernProcess from '../components/home/ModernProcess';
import ModernCTA from '../components/home/ModernCTA';
import SectionReveal from '../components/home/SectionReveal';
import RiverFall from '../components/home/RiverFall';

const SERVICE_IMAGES = [
  'https://media.base44.com/images/public/6a239ffb5d3f7d9bfe82abfe/5722a9686_generated_image.png',
  'https://media.base44.com/images/public/6a239ffb5d3f7d9bfe82abfe/09920e8f8_generated_image.png',
  'https://media.base44.com/images/public/6a239ffb5d3f7d9bfe82abfe/6f49bd4d3_generated_image.png',
];

export default function Home() {
  return (
    <>
      <HeroSection />
      <RiverFall />
      <SectionReveal><ValueProposition /></SectionReveal>
      <SectionReveal><ServicesPreview images={SERVICE_IMAGES} /></SectionReveal>
      <SectionReveal><ModernProcess /></SectionReveal>
      <SectionReveal><ModernCTA /></SectionReveal>
    </>
  );
}
