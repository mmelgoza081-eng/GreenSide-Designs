import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Zap, Star } from 'lucide-react';
import AmbientBackground from '@/components/ui/AmbientBackground';
import PageSpaceHeader from '@/components/ui/PageSpaceHeader';

// Kept so components that still reference it (e.g. the unused
// ServicesPreview) don't break on import; the live cards below no longer
// point at these placeholder Stripe links since Stripe isn't set up —
// they go to the contact form instead.
export const STRIPE_LINKS = {
  website_creation: 'https://buy.stripe.com/YOUR_LINK_1',
  bundle_package: 'https://buy.stripe.com/YOUR_LINK_2',
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// A small tilted sticker pinned to the upper-right corner of a price,
// showing the actual dollar amount 9.8% sales tax adds to that specific
// price — not a generic percentage.
function TaxBadge({ price, extraDown = 0 }) {
  const tax = (price * 0.098).toFixed(2);
  return (
    <span
      className="absolute top-0 left-full font-body text-xs font-bold uppercase tracking-wide bg-velvet text-white px-3 py-1.5 rounded-sm select-none shadow-sm whitespace-nowrap"
      style={{
        transform: `translateY(${-33 + extraDown}px) rotate(-9deg)`,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      +${tax} tax
    </span>
  );
}

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
      <div className="mb-8 pt-4">
        <span className="relative inline-block leading-none">
          <span className="font-display text-5xl md:text-6xl font-bold text-velvet">$500</span>
          <TaxBadge price={500} />
        </span>
      </div>
      <div className="flex-1 mb-10 space-y-4">
        {['Custom design tailored to your brand', 'Mobile-responsive on all devices', 'Contact forms & integrations', 'Fast, clean performance', 'We\'ll keep refining it together until you\'re happy with it', 'Domain & hosting managed for your first month', 'Launch-ready deployment'].map((f, i) => (
          <div key={i} className="flex items-start gap-3">
            <Check className="w-4 h-4 text-velvet flex-shrink-0 mt-0.5" />
            <span className="font-body text-sm text-mercury/60">{f}</span>
          </div>
        ))}
      </div>
      <Link
        to="/contact"
        onClick={scrollToTop}
        className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.15em] px-8 py-5 bg-velvet text-white hover:bg-velvet/80 transition-all duration-300"
      >
        Get Now <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </motion.div>
  );
}

function HostingCard({ index }) {
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
        <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">Domain & Hosting</h3>
        <p className="font-body text-sm text-mercury/40 leading-relaxed">Just need your site online and looked after? I'll handle the domain and hosting so you never have to think about it.</p>
      </div>
      <div className="mb-8 pt-4">
        <div className="flex items-baseline gap-2">
          <span className="relative inline-block leading-none">
            <span className="font-display text-5xl md:text-6xl font-bold text-velvet">$20</span>
            <TaxBadge price={20} extraDown={5} />
          </span>
          <span className="font-mono text-xs text-mercury/40">/ month</span>
        </div>
      </div>
      <div className="flex-1 mb-10 space-y-4">
        {['Domain registration & renewal handled', 'Reliable hosting, always online', 'SSL certificate included', 'I handle any technical issues that come up'].map((f, i) => (
          <div key={i} className="flex items-start gap-3">
            <Check className="w-4 h-4 text-velvet flex-shrink-0 mt-0.5" />
            <span className="font-body text-sm text-mercury/60">{f}</span>
          </div>
        ))}
      </div>
      <Link to="/contact" onClick={scrollToTop} className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.15em] px-8 py-5 border border-velvet text-velvet hover:bg-velvet hover:text-white transition-all duration-300">
        Get Now <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </motion.div>
  );
}

function OneMonthCard({ index }) {
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
        <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">1-Month Moderation</h3>
        <p className="font-body text-sm text-mercury/40 leading-relaxed">Not ready to commit long-term? Get a single month of updates, changes, and maintenance — no strings attached.</p>
      </div>
      <div className="mb-8 pt-4">
        <div className="flex items-baseline gap-2">
          <span className="relative inline-block leading-none">
            <span className="font-display text-5xl md:text-6xl font-bold text-velvet">$35</span>
            <TaxBadge price={35} />
          </span>
          <span className="font-mono text-xs text-mercury/40">/ month</span>
        </div>
      </div>
      <div className="flex-1 mb-10 space-y-4">
        {['Unlimited content updates', 'Always available to contact', 'Security patches & updates', 'Priority response time', 'Domain & hosting managed for the month'].map((f, i) => (
          <div key={i} className="flex items-start gap-3">
            <Check className="w-4 h-4 text-velvet flex-shrink-0 mt-0.5" />
            <span className="font-body text-sm text-mercury/60">{f}</span>
          </div>
        ))}
      </div>
      <Link to="/contact" onClick={scrollToTop} className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.15em] px-8 py-5 border border-velvet text-velvet hover:bg-velvet hover:text-white transition-all duration-300">
        Get Now <ArrowRight className="w-3.5 h-3.5" />
      </Link>
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
          <div className="mb-8 pt-4">
            <div className="flex items-baseline gap-2">
              <span className="relative inline-block leading-none">
                <span className="font-display text-5xl md:text-6xl font-bold text-velvet">$150</span>
                <TaxBadge price={150} />
              </span>
              <div className="flex flex-col">
                <span className="font-mono text-xs text-mercury/40">/ 6 months</span>
              </div>
            </div>
          </div>
          <Link to="/contact" onClick={scrollToTop} className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.15em] px-8 py-5 border border-velvet text-velvet hover:bg-velvet hover:text-white transition-all duration-300 mt-auto">
            Get Now <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Side details */}
        <div className="border-t md:border-t-0 md:border-l border-velvet/20 bg-velvet/5 p-8 md:p-12 flex flex-col justify-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-velvet mb-6">What's included</p>
          <div className="space-y-4 mb-8">
            {['Unlimited content updates', 'Always available to contact', 'Performance monitoring', 'Security patches & updates', 'Priority response time', 'Domain & hosting managed all 6 months'].map((f, i) => (
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
          <div className="mb-8 pt-4">
            <div className="flex items-baseline gap-2">
              <span className="relative inline-block leading-none">
                <span className="font-display text-5xl md:text-6xl font-bold text-velvet">$600</span>
                <TaxBadge price={600} />
              </span>
              <div className="flex flex-col">
                <span className="font-mono text-xs text-mercury/40">one-time</span>
              </div>
            </div>
          </div>
          <Link
            to="/contact"
            onClick={scrollToTop}
            className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.15em] px-8 py-5 bg-velvet text-white hover:bg-velvet/80 transition-all duration-300 mt-auto"
          >
            Get Now <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Side details */}
        <div className="border-t md:border-t-0 md:border-l border-velvet/30 bg-velvet/5 p-8 md:p-12 flex flex-col justify-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-velvet mb-6">Everything included</p>
          <div className="space-y-4 mb-8">
            {['Custom website from scratch', 'Mobile-responsive design', 'Launch-ready deployment', '6 months of full moderation', 'Unlimited content updates', 'Priority onboarding & support', 'Extended revision rounds', 'Domain & hosting managed all 6 months'].map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-velvet flex-shrink-0 mt-0.5" />
                <span className="font-body text-sm text-mercury/60">{f}</span>
              </div>
            ))}
          </div>
          <div className="border border-velvet/30 bg-velvet/10 p-4">
            <p className="font-mono text-xs text-velvet/80 leading-relaxed">Website ($500) + 6-Month Moderation ($150) = $650 separately. Bundle price: $600.</p>
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
    <div className="relative">
      <AmbientBackground theme="green" />
      <PageSpaceHeader theme="services">
        <div ref={headerRef}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            className="font-mono text-xs uppercase tracking-[0.3em] text-lime-300/80 mb-6"
          >
            Services & Pricing
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8 max-w-3xl text-white"
          >
            Invest in your digital presence.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-body text-lg text-white/50 max-w-xl leading-relaxed mb-4"
          >
            Simple, transparent pricing. No hidden fees, no surprises.
            Choose what fits your business, and let's build something remarkable.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-mono text-xs uppercase tracking-[0.15em] text-emerald-300"
          >
            You don't pay until your site is done
          </motion.p>
        </div>
      </PageSpaceHeader>

      {/* Service cards */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="space-y-4">
          {/* Bundle leads — best value, first thing you see */}
          <BundleCard index={0} />
          <HalfYearCard index={1} />
          {/* Basic + one-month cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BasicCard index={2} />
            <OneMonthCard index={3} />
          </div>
          {/* Standalone hosting */}
          <HostingCard index={4} />
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
              { q: 'How long does a website take?', a: 'Most sites are live in 3-5 days from our first conversation. That includes an initial build, a round for you to review and request changes, and final polish before launch.' },
              { q: 'Can I make changes after launch?', a: 'Absolutely. Once you\'re on a moderation plan, updates are always just a message away. Just reach out anytime and I\'ll take care of it.' },
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