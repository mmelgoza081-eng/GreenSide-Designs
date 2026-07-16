import React from 'react';
import { motion } from 'framer-motion';

// An original, fully-code-drawn browser window mockup — replaces a stock
// photo with something that's actually ours: a little animated preview of
// "a site being built," fitting the brand's own green/glow language.
export default function BrowserMockup() {
  return (
    <div className="w-full h-full relative" style={{ background: '#0a1410' }}>
      {/* Browser chrome bar */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-white/10 bg-[#0d1a14]">
        <div className="w-3 h-3 rounded-full bg-red-400/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
        <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
        <div className="ml-4 flex-1 max-w-xs h-6 rounded-full bg-white/5 border border-white/10" />
      </div>

      {/* Page content mockup */}
      <div className="p-6 md:p-10 relative overflow-hidden h-full">
        <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full" style={{
          background: 'radial-gradient(circle, rgba(52,211,153,0.35) 0%, transparent 70%)',
          filter: 'blur(10px)',
        }} />

        {/* Nav row */}
        <div className="flex items-center justify-between mb-8">
          <div className="w-24 h-3 rounded-full bg-emerald-300/60" />
          <div className="flex gap-3">
            {[0, 1, 2].map(i => <div key={i} className="w-10 h-2 rounded-full bg-white/15" />)}
          </div>
        </div>

        {/* Headline block */}
        <motion.div
          initial={{ width: '20%' }}
          whileInView={{ width: '70%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-5 md:h-7 rounded-full bg-white/80 mb-3"
        />
        <motion.div
          initial={{ width: '10%' }}
          whileInView={{ width: '45%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-5 md:h-7 rounded-full bg-white/40 mb-8"
        />

        {/* Card grid */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="h-20 md:h-28 rounded-lg border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 to-transparent"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
