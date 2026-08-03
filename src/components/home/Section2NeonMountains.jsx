import React, { useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
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

// The visible circle's radius grows via `scale` around a fixed center point
// (left:50%, top:129% + half its own unscaled height, in the sticky
// container's own box — see the circle's inline style below). Given that
// scale, this returns a CSS clip-path circle in the *viewport's* coordinate
// space (sticky container == viewport once pinned).
function circleClipPath(scale) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const cx = 0.5 * vw;
  const cy = 1.29 * vh + 0.58 * vw;
  const r = 0.58 * vw * scale;
  return { cx, cy, r, css: `circle(${r}px at ${cx}px ${cy}px)` };
}

export default function Section2NeonMountains() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // Raw scroll progress steps unevenly between trackpad wheel events (each
  // one is a small, irregular delta) in a way mouse-wheel scrolling doesn't
  // show as clearly. Springing it smooths that out into continuous motion
  // regardless of how choppy the underlying input events are.
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 });

  // Biased down so the frame is mostly the detailed reflection and sun
  // glint, while still keeping the tree line (and a little sky) in view.
  const bgPosition = 'center 78%';

  // A soft bloom grows and carries the scene into the next (white) page —
  // starts almost immediately once you begin scrolling into the section, but
  // takes its time growing rather than snapping to full size right away. It
  // also finishes right near the end of the section's own scroll distance
  // (shortened below) instead of completing early and then sitting there
  // waiting through extra scroll before the next page actually shows up.
  const transitionOpacity = useTransform(smoothProgress, [0.22, 0.42], [0, 1]);
  const transitionScale = useTransform(smoothProgress, [0.2, 0.85], [0.4, 3]);

  // Black copies of the headline/paragraph are stacked exactly on top of the
  // white originals and clipped to the same growing circle the eye actually
  // sees — so a letter turns black at the literal instant the circle's edge
  // reaches its pixels, not on a fixed scroll-position guess. Each text
  // block's own on-screen offset (measured below) converts the shared,
  // viewport-space circle into that element's local clip-path coordinates.
  // Driven imperatively (transitionScale.on('change', ...) + a direct style
  // write) rather than another useTransform: a useTransform derived from
  // transitionScale only recomputes on the *next* value it receives from its
  // own subscription, so it stays on its initial (pre-measurement) output
  // until real scrolling starts. Writing the style directly on every change
  // — and once right after measuring — keeps it correct immediately too.
  const headlineWrapRef = useRef(null);
  const paragraphWrapRef = useRef(null);
  const headlineBlackRef = useRef(null);
  const paragraphBlackRef = useRef(null);
  const stickyRef = useRef(null);
  const headlineOffset = useRef(null);
  const paragraphOffset = useRef(null);

  useEffect(() => {
    const applyClip = (scale) => {
      // window.innerWidth/Height can read 0 for the very first tick or two
      // right after mount (before the viewport has actually settled) —
      // skip rather than lock in a bogus circle(0) from that instant.
      if (!window.innerWidth || !window.innerHeight) return;
      const { cx, cy, r } = circleClipPath(scale);
      if (headlineBlackRef.current && headlineOffset.current) {
        const css = `circle(${r}px at ${cx - headlineOffset.current.left}px ${cy - headlineOffset.current.top}px)`;
        headlineBlackRef.current.style.clipPath = css;
        headlineBlackRef.current.style.webkitClipPath = css;
      }
      if (paragraphBlackRef.current && paragraphOffset.current) {
        const css = `circle(${r}px at ${cx - paragraphOffset.current.left}px ${cy - paragraphOffset.current.top}px)`;
        paragraphBlackRef.current.style.clipPath = css;
        paragraphBlackRef.current.style.webkitClipPath = css;
      }
    };

    const measure = () => {
      const stickyRect = stickyRef.current?.getBoundingClientRect();
      if (!stickyRect) return;
      const hRect = headlineWrapRef.current?.getBoundingClientRect();
      const pRect = paragraphWrapRef.current?.getBoundingClientRect();
      if (hRect) headlineOffset.current = { left: hRect.left - stickyRect.left, top: hRect.top - stickyRect.top };
      if (pRect) paragraphOffset.current = { left: pRect.left - stickyRect.left, top: pRect.top - stickyRect.top };
      applyClip(transitionScale.get());
    };

    measure();
    // A few retries (not just one) so a viewport that isn't settled yet on
    // the first tick still gets a valid measurement shortly after mount.
    const timeouts = [0, 100, 300, 800].map((delay) => setTimeout(measure, delay));
    window.addEventListener('resize', measure);
    const unsubscribe = transitionScale.on('change', applyClip);
    return () => {
      timeouts.forEach(clearTimeout);
      window.removeEventListener('resize', measure);
      unsubscribe();
    };
  }, [transitionScale]);

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
        ref={stickyRef}
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
          {/* The dot field inside the circle is what looked bad on phones —
              the circle itself stays, just without these. Section3's own
              dot field (the actual "bottom page") is untouched. */}
          {transitionDots.map(d => (
            <motion.div
              key={d.id}
              className="hidden md:block absolute rounded-full"
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

          <div ref={headlineWrapRef} className="relative max-w-lg">
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight text-white" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
              No detours. Just a straight line to launch.
            </h2>
            {/* Black reveal copy only matters where the circle transition
                actually plays — hidden below md so mobile text stays white. */}
            <h2
              ref={headlineBlackRef}
              aria-hidden="true"
              className="hidden md:block font-display text-3xl md:text-5xl font-bold leading-tight absolute inset-0"
              style={{ color: '#0a0a0a', clipPath: 'circle(0px at 0px 0px)' }}
            >
              No detours. Just a straight line to launch.
            </h2>
          </div>

          <div ref={paragraphWrapRef} className="relative max-w-md mt-5">
            <p className="font-body text-sm md:text-base leading-relaxed text-white" style={{ opacity: 0.85, textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>
              We're committed to building custom websites shaped around your business's specific needs — not a template with your logo dropped in. Every site we build starts with understanding what you actually do and who you're trying to reach.
            </p>
            <p
              ref={paragraphBlackRef}
              aria-hidden="true"
              className="hidden md:block font-body text-sm md:text-base leading-relaxed absolute inset-0"
              style={{ color: '#0a0a0a', clipPath: 'circle(0px at 0px 0px)' }}
            >
              We're committed to building custom websites shaped around your business's specific needs — not a template with your logo dropped in. Every site we build starts with understanding what you actually do and who you're trying to reach.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
