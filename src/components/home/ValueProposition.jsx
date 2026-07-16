import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import ScrollingTicker from '../ui/ScrollingTicker';
import BrowserMockup from '../ui/BrowserMockup';
import MountainRange from '../ui/MountainRange';

export default function ValueProposition() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);

  const cards = [
    { emoji: '⚡', title: 'Fast Turnaround', desc: 'Most websites go live within 1–2 weeks. We move quickly without cutting corners.' },
    { emoji: '🎨', title: 'Built for Your Brand', desc: 'Every design decision reflects your identity — colors, tone, and personality included.' },
    { emoji: '📱', title: 'Mobile First', desc: 'Over 60% of web traffic is mobile. Your site will look flawless on every screen size.' },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white">
      <MountainRange />
      {/* Main statement — centred */}
      <div ref={ref} className="relative z-10 px-6 md:px-12 max-w-[900px] mx-auto pt-24 md:pt-36 pb-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-600 mb-6"
        >
          What We Do
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.08] mb-8 text-foreground"
        >
          We build websites that make you{' '}
          <span className="text-velvet italic">impossible</span> to ignore.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-lg leading-relaxed max-w-xl mx-auto mb-12 text-muted-foreground"
        >
          No templates, no compromises — just a digital presence that truly represents who you are.
        </motion.p>

        {/* Parallax image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl shadow-2xl shadow-emerald-900/10 aspect-[16/7]"
        >
          <motion.div style={{ scale: imgScale, y: imgY }} className="w-full h-full">
            <BrowserMockup />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/20 to-transparent" />
          <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-sm rounded-xl px-5 py-3 shadow-lg">
            <p className="font-mono text-xs text-emerald-600 uppercase tracking-widest">Custom built</p>
            <p className="font-display text-lg font-bold text-foreground">For your business</p>
          </div>
        </motion.div>
      </div>

      {/* Ticker */}
      <div className="relative z-10">
        <ScrollingTicker />
      </div>

      {/* Feature cards */}
      <div className="relative z-10 px-6 md:px-12 max-w-[1440px] mx-auto mt-16 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white border border-border rounded-xl p-8 transition-all duration-300 hover:border-emerald-300/60 hover:-translate-y-1"
          >
            <div className="text-3xl mb-4">{item.emoji}</div>
            <h3 className="font-display text-xl font-bold mb-2 text-foreground">{item.title}</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
