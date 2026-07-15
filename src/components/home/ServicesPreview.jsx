import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { STRIPE_LINKS } from '@/pages/Services';

const services = [
  {
    id: 1,
    title: 'Website Creation',
    price: '$400',
    description: 'A fully custom website built from scratch around your brand, your vision, your goals.',
    span: 'md:col-span-7',
    link: STRIPE_LINKS.website_creation,
  },
  {
    id: 2,
    title: '6-Month Moderation',
    price: '$120',
    description: '6 months of ongoing updates, changes, and maintenance. Your site stays fresh — you stay focused.',
    span: 'md:col-span-5',
    link: '/contact',
  },
  {
    id: 3,
    title: 'Bundle Package',
    price: '$500',
    description: 'Website creation + 6 months of moderation. The complete partnership, one price.',
    span: 'md:col-span-12',
    link: STRIPE_LINKS.bundle_package,
  },
];

function ServiceCard({ service, index, image }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.1]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`${service.span} group`}
    >
      <div className="relative overflow-hidden rounded-2xl h-full transition-all duration-300 border border-white/10 hover:border-emerald-400/50 hover:-translate-y-1 bg-[#0d1a14]">
        {/* Card image */}
        <div className="relative h-56 md:h-72 overflow-hidden">
          <motion.img
            src={image}
            alt={service.title}
            style={{ scale: imgScale }}
            className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a14] via-[#0d1a14]/20 to-transparent" />
          <div className="absolute top-4 right-4 font-display text-lg font-bold text-white bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            {service.price}
          </div>
        </div>
        {/* Card body */}
        <div className="p-8">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">{service.title}</h3>
            <ArrowUpRight className="w-5 h-5 text-emerald-300/60 group-hover:text-emerald-300 transition-colors duration-300 flex-shrink-0 mt-2" />
          </div>
          <p className="font-body text-sm text-white/60 leading-relaxed mb-6">{service.description}</p>
          <a
            href={service.link}
            className="block text-center w-full font-mono text-xs uppercase tracking-[0.15em] py-4 rounded-full bg-emerald-500/10 hover:bg-emerald-500 text-emerald-300 hover:text-[#0d1a14] transition-all duration-300 border border-emerald-400/30"
          >
            {service.link.startsWith('/') ? 'Get In Touch' : `Buy Now — ${service.price}`}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesPreview({ images }) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden bg-[#0a0f0d]">
      <div className="relative z-10 py-24 md:py-32 px-6 md:px-12 max-w-[1440px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400 mb-4">Services</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white">What We Offer</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Link
              to="/services"
              className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-300/70 hover:text-emerald-300 transition-colors border-b border-emerald-300/30 hover:border-emerald-300 pb-1 mt-4 md:mt-0 inline-block"
            >
              View All Services →
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} image={images[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
