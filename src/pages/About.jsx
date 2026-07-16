import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Heart } from 'lucide-react';
import AmbientBackground from '@/components/ui/AmbientBackground';
import PageSpaceHeader from '@/components/ui/PageSpaceHeader';


const values = [
  {
    icon: MapPin,
    title: 'Proudly Local',
    description: 'Based in Lacey, WA — we understand the heartbeat of small-town business. Your success is our community\'s success.',
  },
  {
    icon: Clock,
    title: 'Always Reachable',
    description: 'Need changes? Just reach out. I\'m always available to contact and respond as fast as I can — because I genuinely care.',
  },
  {
    icon: Heart,
    title: 'Genuinely Invested',
    description: 'When you work with us, you\'re getting a partner who\'s truly dedicated to your business\'s success. Not a vendor — a collaborator.',
  },
];

function ValueCard({ value, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = value.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="border border-border bg-card rounded-lg p-8 md:p-10 hover:shadow-lg hover:border-velvet/30 transition-all duration-300"
    >
      <div className="w-11 h-11 border border-velvet/30 flex items-center justify-center mb-6">
        <Icon className="w-5 h-5 text-velvet" />
      </div>
      <h3 className="font-display text-2xl font-bold mb-3">{value.title}</h3>
      <p className="font-body text-sm text-muted-foreground leading-relaxed">{value.description}</p>
    </motion.div>
  );
}

export default function About() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const storyRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-80px" });

  return (
    <div className="relative">
      <AmbientBackground />
      <PageSpaceHeader>
        <div ref={headerRef}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            className="font-mono text-xs uppercase tracking-[0.3em] text-lime-300/80 mb-6"
          >
            About Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] max-w-4xl text-white"
          >
            We're proud to be local.
          </motion.h1>
        </div>
      </PageSpaceHeader>

      {/* Story section */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            ref={storyRef}
            initial={{ opacity: 0, x: -40 }}
            animate={storyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1"
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-velvet mb-6">Our Story</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-[1.1] mb-8">
              One person. A big commitment.
            </h2>
            <div className="space-y-5 font-body text-base text-muted-foreground leading-relaxed">
              <p>
                GreenSide Designs started with a simple belief: every small business deserves a website 
                that truly represents who they are. Not a cookie-cutter template. Not a 
                one-size-fits-all solution. Something uniquely yours.
              </p>
              <p>
                Based in Lacey, Washington, I'm dedicated to helping businesses in my 
                community — and beyond — establish a powerful digital presence. When you 
                work with me, you're not just getting a website. You're getting a partner 
                who's genuinely invested in your success.
              </p>
              <p>
                I handle everything from design to deployment to ongoing support, so you 
                can focus on what you do best: running your business.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={storyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 md:order-2"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#0a1410]">
              <div className="absolute inset-0" style={{
                background: 'radial-gradient(ellipse at 30% 20%, rgba(52,211,153,0.35) 0%, transparent 55%), radial-gradient(ellipse at 80% 85%, rgba(163,230,53,0.25) 0%, transparent 55%)',
              }} />
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
              />
              <div className="relative h-full flex flex-col items-center justify-center gap-4 px-8 text-center">
                <MapPin className="w-10 h-10 text-emerald-300/80" strokeWidth={1.25} />
                <p className="font-display text-2xl font-bold text-white">Lacey, Washington</p>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-300/60">Working locally, building for anywhere</p>
              </div>
              <div className="absolute inset-0 border border-white/10" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto border-t border-border">
        <div className="mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-velvet mb-4">Why Us</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">What sets us apart.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {values.map((value, i) => (
            <ValueCard key={value.title} value={value} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1440px] mx-auto border-t border-border text-center">
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-8 max-w-2xl mx-auto leading-[1.1]">
          Let's build something <span className="text-velvet italic">together.</span>
        </h2>
        <Link
          to="/contact"
          className="inline-block font-mono text-xs uppercase tracking-[0.15em] bg-velvet text-white px-10 py-5 hover:bg-velvet/80 transition-all duration-300"
        >
          Start a Conversation
        </Link>
      </section>
    </div>
  );
}