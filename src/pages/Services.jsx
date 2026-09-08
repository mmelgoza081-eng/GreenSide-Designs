import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, Droplets, Search, Sparkles, Home, Clock, ArrowRight, HelpCircle, Check } from 'lucide-react';
import AmbientBackground from '@/components/ui/AmbientBackground';
import RainStreaks from '@/components/ui/RainStreaks';
import SideNav from '@/components/navigation/SideNav';

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'instant' });
}

const INCLUDED = [
  { icon: Leaf, title: 'Debris Removal', description: 'Every gutter run cleared of leaves, dirt, and buildup by hand.' },
  { icon: Droplets, title: 'Downspout Flush', description: 'Downspouts flushed and checked to confirm free, unclogged drainage.' },
  { icon: Search, title: 'Full Inspection', description: 'We check for sagging sections, leaks, and loose brackets while we work.' },
  { icon: Sparkles, title: 'Clean Wrap-Up', description: 'All debris bagged and hauled away — nothing left behind on your lawn.' },
  { icon: Home, title: 'One & Two Story Homes', description: 'We come prepared for homes of both sizes.' },
  { icon: Clock, title: 'Fast Turnaround', description: 'Most jobs take around an hour or more, depending on the size of your home.' },
];

const HEIGHTS = [
  { label: 'One Story', description: 'Quick, straightforward access — most one story homes are done in well under an hour.' },
  { label: 'Two Story', description: 'Extended ladder work for second-story gutters, handled safely and efficiently.' },
];

const FAQS = [
  { q: 'How often should gutters be cleaned?', a: 'Most homes need it at least twice a year — once in spring and once in fall — but homes near lots of trees may need more frequent visits.' },
  { q: 'How long does a cleaning take?', a: "Around an hour or more, depending on the size of your home and how much debris has built up. We take our time to do it right — checking every gutter run, clearing every downspout, and making sure nothing gets missed before we call it done." },
  { q: 'Do you serve two story homes?', a: "Yes — right now we service one and two story homes. Have a three story home? Reach out through the contact page and we'll see what we can do." },
];

function IncludedCard({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = item.icon;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="border border-border bg-card rounded-2xl p-7 hover:border-velvet/30 hover:shadow-md transition-all duration-300"
    >
      <div className="w-11 h-11 rounded-xl bg-velvet/10 border border-velvet/30 flex items-center justify-center mb-5">
        <Icon className="w-5 h-5 text-velvet" />
      </div>
      <h3 className="font-display text-xl font-bold mb-2">{item.title}</h3>
      <p className="font-body text-sm text-mercury/50 leading-relaxed">{item.description}</p>
    </motion.div>
  );
}

function HeightCard({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative border border-white/10 bg-white/[0.04] rounded-2xl p-8 overflow-hidden"
    >
      <span className="absolute -top-4 -right-2 font-display font-black text-[100px] leading-none pointer-events-none select-none text-white/[0.05]">
        {index + 1}
      </span>
      <div className="relative w-11 h-11 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center mb-6">
        <Home className="w-5 h-5 text-emerald-300" />
      </div>
      <h3 className="relative font-display text-2xl font-bold text-white mb-3">{item.label}</h3>
      <p className="relative font-body text-sm text-white/50 leading-relaxed">{item.description}</p>
    </motion.div>
  );
}

export default function Services() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });
  const includedRef = useRef(null);
  const includedInView = useInView(includedRef, { once: true, margin: "-80px" });
  const heightsRef = useRef(null);
  const heightsInView = useInView(heightsRef, { once: true, margin: "-80px" });

  return (
    <div className="relative">
      <AmbientBackground theme="green" />

      {/* Hero — photo backdrop + rain streaks + split layout */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(160deg, rgba(6,20,16,0.75) 0%, rgba(10,26,18,0.82) 55%, rgba(6,15,11,0.9) 100%), url(/images/gutter-overflow-exterior.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '64vh',
        }}
      >
        <RainStreaks count={40} color="rgba(163,230,53,0.55)" />
        <SideNav />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 30%, rgba(163,230,53,0.1) 0%, transparent 55%)' }} />
        <div ref={heroRef} className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              className="font-mono text-xs uppercase tracking-[0.3em] text-lime-300/80 mb-6"
            >
              Services
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="font-display text-5xl md:text-7xl font-bold leading-[1.05] mb-8 text-white"
            >
              Gutter cleaning, done right.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-body text-lg text-white/50 max-w-xl leading-relaxed"
            >
              We clear your gutters of leaves, debris, and buildup so water flows where it should — away from your roof, siding, and foundation.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lg:col-span-5 border border-lime-300/20 bg-white/[0.04] backdrop-blur-sm rounded-2xl p-7"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime-300/70 mb-5">No pricing games</p>
            <div className="space-y-3">
              {['No hidden fees', 'Free estimates', 'One and two story homes'].map((line, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-lime-300 flex-shrink-0" />
                  <span className="font-body text-sm text-white/70">{line}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* What's included — icon grid */}
      <section ref={includedRef} className="relative py-24 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(160deg, #dde5d9 0%, #cfded0 40%, #c9d8c6 100%)' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={includedInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-600 mb-6"
            >
              What's Included
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={includedInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="font-display text-3xl md:text-5xl font-bold leading-[1.1]"
            >
              Every visit, top to bottom.
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INCLUDED.map((item, i) => (
              <IncludedCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Every home, every height */}
      <section ref={heightsRef} className="relative py-24 md:py-28 px-6 md:px-12 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0f0d 0%, #0d1a14 50%, #0a1410 100%)' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={heightsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400 mb-6"
            >
              Every Home, Every Height
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={heightsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="font-display text-3xl md:text-5xl font-bold text-white leading-[1.1]"
            >
              We come prepared for one and two story homes.
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
            {HEIGHTS.map((item, i) => (
              <HeightCard key={item.label} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA band — abstract glow, no photo */}
      <section className="relative py-24 md:py-32 px-6 text-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1410 0%, #0d1a16 30%, #0f1a1e 60%, #0a1018 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(163,230,53,0.08) 0%, transparent 55%)' }} />
        <RainStreaks count={22} color="rgba(52,211,153,0.4)" />
        <div className="relative max-w-[900px] mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-300 mb-6">Ready To Schedule?</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-10">
            Let's get your gutters cleared out.
          </h2>
          <Link
            to="/contact"
            onClick={scrollToTop}
            className="inline-flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.15em] px-10 py-5 bg-amber-500 text-white hover:bg-amber-500/80 transition-all duration-300 rounded-full"
          >
            Get Now <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* FAQ-like trust section */}
      <section className="relative py-16 md:py-24 border-t border-border overflow-hidden" style={{ background: 'linear-gradient(160deg, #ece7db 0%, #dbe0cf 40%, #dde5d9 100%)' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-velvet mb-4">Why Green Gutters</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-[1.1]">
              Local, reliable, thorough.
            </h2>
          </div>
          <div className="space-y-6 md:space-y-10">
            {FAQS.map((item, i) => (
              <div key={i} className="flex gap-4 border-b border-border pb-6 md:pb-10 last:border-0">
                <HelpCircle className="w-5 h-5 text-velvet flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-xl font-bold mb-3">{item.q}</h3>
                  <p className="font-body text-sm text-mercury/40 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
