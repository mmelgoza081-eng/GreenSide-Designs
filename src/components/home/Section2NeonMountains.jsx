import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  AMPLITUDE_PX,
  DURATION_S,
  SEAM_CLIP_ANIM,
  seamClipKeyframes,
  seamClipInitialPath,
} from './seamWave';

const LAKE_IMAGE = '/images/lake-reflection-2.jpg';

// Makes the sun's glint on the water shimmer — the real photo, duplicated at
// the exact same size/position so it stays pixel-aligned, with brightness/
// contrast cranked so only the already-bright highlights on the ripples
// survive, then a gentle twinkle on that isolated layer. Real light on real
// water actually does sparkle like this, so it doesn't need much push.
function WaterSparkle({ bgPosition }) {
  return (
    <>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${LAKE_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: bgPosition,
          filter: 'brightness(1.4) contrast(2.6) saturate(1.1)',
          mixBlendMode: 'screen',
        }}
        animate={{ opacity: [0.15, 0.4, 0.15] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${LAKE_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: bgPosition,
          filter: 'brightness(1.5) contrast(3) saturate(1.2) blur(0.6px)',
          mixBlendMode: 'screen',
        }}
        animate={{ opacity: [0, 0.22, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      />
    </>
  );
}

export default function Section2NeonMountains() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Biased down so the frame is mostly the detailed reflection and sun
  // glint, while still keeping the tree line (and a little sky) in view.
  const bgPosition = 'center 78%';

  // A soft bloom grows and carries the scene into the next (white) page —
  // starts almost immediately once you begin scrolling into the section, but
  // takes its time growing rather than snapping to full size right away. It
  // also finishes right near the end of the section's own scroll distance
  // (shortened below) instead of completing early and then sitting there
  // waiting through extra scroll before the next page actually shows up.
  const transitionOpacity = useTransform(scrollYProgress, [0.22, 0.42], [0, 1]);
  const transitionScale = useTransform(scrollYProgress, [0.2, 0.85], [0.4, 3]);

  // The circle's rising top edge = center (below viewport, fixed at
  // top:129% + half its own height) minus its current radius, and its
  // radius grows with transitionScale. Solving edge(s) = elementY for each
  // line's measured on-screen position (headline ~270-366px, paragraph
  // ~386-482px of 720px viewport height at 1280px width) and converting
  // that scale back to scrollYProgress gives the exact point each line's
  // bottom edge is first touched, rather than a guessed scroll amount.
  // Each still snaps (tight input range, no gray in between).
  const paragraphColor = useTransform(scrollYProgress, [0.5, 0.505], ['#ffffff', '#0a0a0a']);
  const headlineColor = useTransform(scrollYProgress, [0.54, 0.545], ['#ffffff', '#0a0a0a']);

  // Same dot field as the actual white "What We Do" section below — so as
  // the circle opens, it's genuinely revealing that page's own look, not a
  // plain gradient standing in for it. Positioned as % of this circle's own
  // box, so they scale up together with it and stay properly clipped to
  // whatever portion of the circle is currently visible.
  const transitionDots = useMemo(() => (
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 10 + 4,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2.5,
    }))
  ), []);

  return (
    <section
      ref={ref}
      className="relative w-full"
      style={{
        height: '160vh',
        // Pulled up by twice the amplitude so the wavy top edge below lands
        // centered on the seam line rather than under it.
        marginTop: -AMPLITUDE_PX * 2,
        clipPath: seamClipInitialPath,
        animation: `${SEAM_CLIP_ANIM} ${DURATION_S}s linear infinite`,
      }}
    >
      <style>{seamClipKeyframes}</style>
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ backgroundColor: '#0a0e14' }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${LAKE_IMAGE})`,
            backgroundSize: 'cover',
            backgroundPosition: bgPosition,
          }}
        />

        <WaterSparkle bgPosition={bgPosition} />

        {/* Gentle dark vignette so the white headline text stays readable
            against the bright sky/sun area */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.25) 100%)' }}
        />

        <motion.div
          className="absolute pointer-events-none overflow-hidden"
          style={{
            left: '50%', top: '129%', width: '116%', aspectRatio: '1/1', marginLeft: '-58%',
            borderRadius: '50%',
            background: '#ffffff',
            boxShadow: '0 0 50px 14px rgba(191,219,254,0.7), 0 0 130px 36px rgba(147,197,253,0.4)',
            opacity: transitionOpacity,
            scale: transitionScale,
          }}
        >
          {transitionDots.map(d => (
            <motion.div
              key={d.id}
              className="absolute rounded-full"
              style={{
                top: `${d.top}%`,
                left: `${d.left}%`,
                width: d.size,
                height: d.size,
                background: '#0a0a0a',
                boxShadow: '0 0 10px 2px rgba(0,0,0,0.5)',
              }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: d.duration, delay: d.delay, ease: 'easeInOut' }}
            />
          ))}
        </motion.div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-sky-200/90 mb-4">From idea to launch</p>
          <motion.h2 className="font-display text-3xl md:text-5xl font-bold leading-tight max-w-lg" style={{ color: headlineColor, textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
            No detours. Just a straight line to launch.
          </motion.h2>
          <motion.p className="font-body text-sm md:text-base leading-relaxed max-w-md mt-5" style={{ color: paragraphColor, opacity: 0.85, textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>
            We're committed to building custom websites shaped around your business's specific needs — not a template with your logo dropped in. Every site we build starts with understanding what you actually do and who you're trying to reach.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
