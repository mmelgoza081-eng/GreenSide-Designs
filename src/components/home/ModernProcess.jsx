import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  { number: '01', title: 'Discovery', description: 'We talk through your business, goals, and vision. This is where the foundation gets set.' },
  { number: '02', title: 'Design & Build', description: 'A custom site crafted around your brand. Every pixel intentional, every interaction considered.' },
  { number: '03', title: 'Review & Refine', description: 'You get a full preview to review. We tweak and polish until it feels exactly right.' },
  { number: '04', title: 'Launch & Support', description: "We go live. After that, I'm just a message away — no tickets, no waiting." },
];

function StepCard({ step, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl p-8 h-full border border-emerald-400/20 bg-white/[0.03] hover:border-emerald-400/40 transition-colors duration-300"
    >
      <span className="absolute -top-4 -right-2 font-display font-black text-[90px] leading-none pointer-events-none select-none text-emerald-400/10">
        {step.number}
      </span>
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 font-mono text-sm font-bold bg-emerald-400 text-[#0a0f0d]">
        {step.number}
      </div>
      <h3 className="font-display text-2xl font-bold mb-3 text-emerald-300">{step.title}</h3>
      <p className="font-body text-sm text-white/60 leading-relaxed">{step.description}</p>
    </motion.div>
  );
}

export default function ModernProcess() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-28 md:py-36 px-6 md:px-12 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0f0d 0%, #0d1a14 50%, #0a1410 100%)' }}>
      {/* One quiet ambient glow */}
      <div className="absolute top-[15%] left-[10%] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div ref={ref} className="relative z-10 max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs uppercase tracking-[0.4em] text-emerald-400 mb-5"
          >
            The Process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl md:text-6xl font-bold leading-[1.1] text-white max-w-3xl mx-auto"
          >
            Simple, transparent, <span className="text-emerald-400 italic">built around you</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
