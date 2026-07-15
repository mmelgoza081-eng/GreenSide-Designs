import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Zap, Star } from 'lucide-react';

// Create a Payment Link for each package in your Stripe Dashboard
// (Dashboard → Payment links → +New) and paste the URLs below.
// No backend needed — Stripe hosts the checkout page itself.
export const STRIPE_LINKS = {
  website_creation: 'https://buy.stripe.com/YOUR_LINK_1',
  bundle_package: 'https://buy.stripe.com/YOUR_LINK_2',
};

function BasicCard({ index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="border border-border bg-card p-8 md:p-12 flex flex-col"
    >
      <div className="mb-8">
        <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">Website Creation</h3>
        <p className="font-body text-sm text-mercury/40 leading-relaxed">A fully custom website built from scratch around your brand, your vision, and your goals. No templates — just you.</p>
      </div>
      <div className="mb-8">
        <span className="font-display text-5xl md:text-6xl font-bold text-velvet">$400</span>
      </div>
      <div className="flex-1 mb-10 space-y-4">
        {['Custom design tailored to your brand', 'Mobile-responsive on all devices', 'SEO-optimized structure', 'Contact forms & integrations', 'Fast, clean performance', 'Launch-ready deployment'].map((f, i) => (
          <div key={i} className="flex items-start gap-3">
            <Check className="w-4 h-4 text-velvet flex-shrink-0 mt-0.5" />
            <span className="font-body text-sm text-mercury/60">{f}</span>
          </div>
        ))}
      </div>
      <a
        href={STRIPE_LINKS.website_creation}
        className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.15em] px-8 py-5 bg-velvet text-white hover:bg-velvet/80 transition-all duration-300"
      >
        Buy Now <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </motion.div>
  );
}

function HalfYearCard({ index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative border border-velvet/50 bg-card overflow-hidden"
    >
      {/* Side accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-velvet" />

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Main content */}
        <div className="p-8 md:p-12 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-5 h-5 text-velvet" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-velvet">Special Offer</span>
          </div>
          <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">6-Month Moderation</h3>
          <p className="font-body text-sm text-mercury/40 leading-relaxed mb-8">Lock in 6 full months of ongoing updates, changes, and maintenance at a reduced rate. Your site stays sharp while you focus on your business.</p>
          <div className="mb-8">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl md:text-6xl font-bold text-velvet">$120</span>
              <div className="flex flex-col">
                <span className="font-mono text-xs text-mercury/40">/ 6 months</span>
              </div>
            </div>
          </div>
          <Link to="/contact" className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.15em] px-8 py-5 border border-velvet text-velvet hover:bg-velvet hover:text-white transition-all duration-300 mt-auto">
            Claim Offer <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Side details */}
        <div className="border-t md:border-t-0 md:border-l border-velvet/20 bg-velvet/5 p-8 md:p-12 flex flex-col justify-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-velvet mb-6">What's included</p>
          <div className="space-y-4 mb-8">
            {['Unlimited content updates', 'Always available to contact', 'Performance monitoring', 'Security patches & updates', 'Monthly analytics report', 'Priority response time'].map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-velvet flex-shrink-0 mt-0.5" />
                <span className="font-body text-sm text-mercury/60">{f}</span>
              </div>
            ))}
          </div>
          <div className="border border-velvet/20 bg-velvet/10 p-4">
            <p className="font-mono text-xs text-velvet/80 leading-relaxed">Prepay for 6 months of ongoing updates, changes, and maintenance at a flat rate.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BundleCard({ index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative border border-velvet bg-card overflow-hidden"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-velvet" />

      <div className="absolute top-4 right-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] bg-velvet text-white px-4 py-1.5 flex items-center gap-1.5">
          <Star className="w-3 h-3" /> Best Value
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Main content */}
        <div className="p-8 md:p-12 flex flex-col pt-14 md:pt-12">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-5 h-5 text-velvet" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-velvet">Complete Package</span>
          </div>
          <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">Bundle Package</h3>
          <p className="font-body text-sm text-mercury/40 leading-relaxed mb-8">The full experience — custom website build plus 6 months of hands-on moderation. Everything you need to launch and grow, one price.</p>
          <div className="mb-8">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl md:text-6xl font-bold text-velvet">$500</span>
              <div className="flex flex-col">
                <span className="font-mono text-xs text-mercury/40">one-time</span>
              </div>
            </div>
          </div>
          <a
            href={STRIPE_LINKS.bundle_package}
            className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.15em] px-8 py-5 bg-velvet text-white hover:bg-velvet/80 transition-all duration-300 mt-auto"
          >
            Buy Now <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Side details */}
        <div className="border-t md:border-t-0 md:border-l border-velvet/30 bg-velvet/5 p-8 md:p-12 flex flex-col justify-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-velvet mb-6">Everything included</p>
          <div className="space-y-4 mb-8">
            {['Custom website from scratch', 'Mobile-responsive & SEO-ready', 'Launch-ready deployment', '6 months of full moderation', 'Unlimited content updates', 'Priority onboarding & support', 'Extended revision rounds'].map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-velvet flex-shrink-0 mt-0.5" />
                <span className="font-body text-sm text-mercury/60">{f}</span>
              </div>
            ))}
          </div>
          <div className="border border-velvet/30 bg-velvet/10 p-4">
            <p className="font-mono text-xs text-velvet/80 leading-relaxed">Website ($400) + 6-Month Moderation ($120) = $520 separately. Bundle price: $500.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-[1440px] mx-auto border-b border-border">
        <div ref={headerRef}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            className="font-mono text-xs uppercase tracking-[0.3em] text-velvet mb-6"
          >
            Services & Pricing
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8 max-w-3xl"
          >
            Invest in your digital presence.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-body text-lg text-mercury/40 max-w-xl leading-relaxed"
          >
            Simple, transparent pricing. No hidden fees, no surprises.
            Choose what fits your business, and let's build something remarkable.
          </motion.p>
        </div>
      </section>

      {/* Service cards */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="space-y-4">
          {/* Top row: basic card alone */}
          <BasicCard index={0} />
          {/* Special full-width cards */}
          <HalfYearCard index={1} />
          <BundleCard index={2} />
        </div>
      </section>

      {/* FAQ-like trust section */}
      <section className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-velvet mb-4">Why GreenSide</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.1]">
              Not just a website. A partnership.
            </h2>
          </div>
          <div className="space-y-8">
            {[
              { q: 'What makes GreenSide different?', a: 'I\'m a local designer in Lacey, WA, dedicated to helping small businesses grow. You get a partner who genuinely cares about your success — not a faceless agency.' },
              { q: 'How long does a website take?', a: 'Typically 1-2 weeks from initial conversation to launch. We work efficiently without sacrificing quality.' },
              { q: 'Can I make changes after launch?', a: 'Absolutely. Our 6-month moderation plan ($120) means updates are always just a message away. Just reach out anytime and I\'ll take care of it.' },
            ].map((item, i) => (
              <div key={i} className="border-b border-border pb-8 last:border-0">
                <h3 className="font-display text-xl font-bold mb-3">{item.q}</h3>
                <p className="font-body text-sm text-mercury/40 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}