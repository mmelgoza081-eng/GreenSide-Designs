import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Clock, CheckCircle2, Search, Droplets, ClipboardCheck } from 'lucide-react';
import AmbientBackground from '@/components/ui/AmbientBackground';
import SideNav from '@/components/navigation/SideNav';

const STATS = [
  { value: 'Local', label: 'Locally Owned' },
  { value: '24 Hrs', label: 'Response Time' },
  { value: 'Free', label: 'Estimates' },
  { value: '100%', label: 'Satisfaction Guaranteed' },
];

const STEPS = [
  { number: '01', icon: Search, title: 'Inspect', description: 'We walk the perimeter and check every gutter run and downspout for clogs, sagging, and damage.' },
  { number: '02', icon: Droplets, title: 'Clean', description: 'Leaves, debris, and buildup get cleared out by hand, gutter by gutter — nothing pushed further down the line.' },
  { number: '03', icon: ClipboardCheck, title: 'Flush & Report', description: 'Downspouts get flushed to confirm free drainage, and we let you know if anything needs attention.' },
];

const VALUES = [
  { icon: MapPin, title: 'Locally Owned', description: "Based in Lacey, WA — we know the area and show up when we say we will." },
  { icon: Clock, title: 'Always Reachable', description: "Need something addressed? Just reach out — we respond fast and follow through." },
  { icon: CheckCircle2, title: 'Satisfaction Guaranteed', description: "Not happy with the job? We'll come back and make it right." },
];

function useReveal(margin = "-80px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  return [ref, isMobile ? true : inView, isMobile];
}

function StatItem({ stat, index }) {
  const [ref, inView, isMobile] = useReveal("-40px");
  return (
    <motion.div
      ref={ref}
      initial={isMobile ? false : { opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center"
    >
      <p className="font-display text-4xl md:text-5xl font-bold text-emerald-400">{stat.value}</p>
      <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] text-white/50 mt-2">{stat.label}</p>
    </motion.div>
  );
}

function StepCard({ step, index }) {
  const [ref, inView, isMobile] = useReveal("-60px");
  const Icon = step.icon;
  return (
    <motion.div
      ref={ref}
      initial={isMobile ? false : { opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className="relative border border-white/10 bg-white/[0.03] rounded-2xl p-8 md:p-10 overflow-hidden"
    >
      <span className="absolute -top-3 -right-1 font-display font-black text-[110px] leading-none pointer-events-none select-none text-white/[0.04]">
        {step.number}
      </span>
      <div className="relative w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center mb-6">
        <Icon className="w-5 h-5 text-emerald-300" />
      </div>
      <h3 className="relative font-display text-2xl font-bold text-white mb-3">{step.title}</h3>
      <p className="relative font-body text-sm text-white/50 leading-relaxed">{step.description}</p>
    </motion.div>
  );
}

function ValueRow({ value, index }) {
  const [ref, inView, isMobile] = useReveal("-60px");
  const Icon = value.icon;
  return (
    <motion.div
      ref={ref}
      initial={isMobile ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className="flex flex-col items-center text-center gap-4 px-6"
    >
      <div className="w-16 h-16 rounded-full bg-velvet/10 border border-velvet/30 flex items-center justify-center">
        <Icon className="w-7 h-7 text-velvet" />
      </div>
      <h3 className="font-display text-xl font-bold">{value.title}</h3>
      <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-[240px]">{value.description}</p>
    </motion.div>
  );
}

export default function About() {
  const [headerRef, headerInView] = useReveal();
  const [storyRef, storyInView] = useReveal();

  return (
    <div className="relative">
      <AmbientBackground theme="blue" />

      {/* Hero — photo backdrop, replaces the old starfield header */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(160deg, rgba(5,10,16,0.78) 0%, rgba(8,16,26,0.85) 55%, rgba(3,6,10,0.92) 100%), url(/images/gutter-scoop-closeup.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '52vh',
        }}
      >
        <SideNav />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)' }} />
        <div ref={headerRef} className="relative z-10 pt-32 pb-16 px-6 md:px-12 max-w-[1440px] mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            className="font-mono text-xs uppercase tracking-[0.3em] text-sky-300/80 mb-6"
          >
            About Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] max-w-4xl text-white mb-6"
          >
            Gutters cleaned. Peace of mind included.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-body text-lg text-white/50 max-w-xl leading-relaxed"
          >
            A local gutter cleaning business built on showing up, doing the job right, and treating every home like our own.
          </motion.p>
        </div>
      </div>

      {/* Stats band */}
      <section className="relative py-14 md:py-16 px-6" style={{ background: 'linear-gradient(135deg, #0a1410 0%, #0d1a16 50%, #0a1018 100%)' }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </section>

      {/* Story — single centered column, no side graphic */}
      <section
        className="py-24 md:py-32"
        style={{ background: 'linear-gradient(160deg, #dbeafe 0%, #e0f2fe 30%, #ecfeff 60%, #f0f9ff 100%)' }}
      >
        <motion.div
          ref={storyRef}
          initial={{ opacity: 0, y: 30 }}
          animate={storyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-[760px] mx-auto px-6 md:px-12 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-velvet mb-6">Our Story</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-[1.1] mb-10">
            One person. A ladder. A commitment to doing it right.
          </h2>
          <div className="space-y-5 font-body text-base md:text-lg text-muted-foreground leading-relaxed text-left md:text-center">
            <p>
              Green Gutters started with a simple belief: every home deserves gutters that
              actually work. Clogged gutters lead to water damage, foundation problems, and
              headaches that are easy to avoid with regular cleaning.
            </p>
            <p>
              Based in Lacey, Washington, I'm dedicated to helping homeowners in my
              community — and beyond — keep their homes protected. When you
              work with me, you're getting a partner who's genuinely invested in your home's condition.
            </p>
          </div>
        </motion.div>
      </section>

      {/* How We Work */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0f0d 0%, #0d1a14 50%, #0a1410 100%)' }}>
        <div className="absolute top-[10%] left-[15%] w-[350px] h-[350px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="relative max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400 mb-4">How We Work</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Three steps. Every visit.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="py-24 border-t border-border"
        style={{ background: 'linear-gradient(160deg, #f0f9ff 0%, #ecfeff 0%, #dbeafe 60%, #eff6ff 100%)' }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="mb-16 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-velvet mb-4">Why Us</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">What sets us apart.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {VALUES.map((value, i) => (
              <ValueRow key={value.title} value={value} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative py-24 md:py-32 border-t border-border text-center overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #eff6ff 0%, #dbeafe 50%, #e0f2fe 100%)' }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-velvet mb-6">Ready When You Are</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-8 max-w-2xl mx-auto leading-[1.1]">
            Let's get your gutters <span className="text-velvet italic">taken care of.</span>
          </h2>
          <Link
            to="/contact"
            className="inline-block font-mono text-xs uppercase tracking-[0.15em] bg-velvet text-white px-10 py-5 hover:bg-velvet/80 transition-all duration-300"
          >
            Start a Conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
