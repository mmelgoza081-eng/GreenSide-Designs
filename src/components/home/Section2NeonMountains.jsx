import React, { useMemo, useRef } from 'react';
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

const HEADLINE_TEXT = 'No detours. Just a straight line to launch.';
const PARAGRAPH_TEXT = "We're committed to building custom websites shaped around your business's specific needs — not a template with your logo dropped in. Every site we build starts with understanding what you actually do and who you're trying to reach.";

export default function Section2NeonMountains() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const isMobileViewport = typeof window !== 'undefined' && window.innerWidth < 768;
  // Raw scroll progress steps unevenly between trackpad wheel events (each
  // one is a small, irregular delta) in a way mouse-wheel scrolling doesn't
  // show as clearly. Springing it smooths that out into continuous motion
  // regardless of how choppy the underlying input events are. This still
  // drives the *visible circle* on both devices — it should look fluid.
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
  // Max scale needs enough headroom to actually reach the text on narrow,
  // tall phone screens — at 3, the circle's edge topped out around
  // 600-700px down the screen while the text sits around 325-370px, so it
  // never got there. Mobile-only, though: this max sets how fast the circle
  // grows per unit of scroll (same input range either way), so raising it
  // for everyone made desktop's transition rush past twice as fast for the
  // same scroll distance. Desktop already reaches the text fine at 3, so it
  // keeps that original pace.
  const transitionScale = useTransform(smoothProgress, [0.2, 0.85], [0.4, isMobileViewport ? 6 : 3]);
  // The dots live inside the circle, so its own `scale` transform inflates
  // them (and their blur) right along with it — by the time the circle is
  // big, they'd render several times bigger/blurrier than Section3's actual
  // dots below. Counter-scaling each dot by exactly 1/scale cancels that
  // out perfectly (parent scale s times child scale 1/s = 1), so a dot
  // always renders at its own true declared size no matter how big the
  // circle gets — this must NOT be floored/clamped: a floor stops the
  // cancellation from tracking the parent past a certain scale, so the
  // dots (and their blur) grow larger and fuzzier the further the circle
  // scales past that point, which is the opposite of matching Section3.
  const dotCounterScale = useTransform(transitionScale, (s) => 1 / Math.max(s, 0.1));

  // The headline/paragraph turn black by literally being clipped by a real
  // circle — a solid black duplicate of the text sits underneath a
  // border-radius:50%/overflow:hidden mask with the exact same geometry and
  // `scale` as the visible circle, so only the portion inside the true,
  // currently-rendered circle shows through. This is the same clipping
  // mechanism the circle+dots above already use without issue, just reused
  // for text — deliberately NOT a background-clip:text gradient or
  // mix-blend-mode: both were tried and both failed for real, different
  // reasons: the gradient approach reads visibly gray while active (Chrome
  // renders masked/background-clipped text through a lower-quality path
  // while its background keeps changing frame to frame, even at literal
  // #ffffff), and mix-blend-mode silently fails to apply at all inside a
  // position: sticky ancestor on iOS Safari. Plain overflow:hidden clipping
  // has neither problem, and — unlike the earlier per-letter approximation
  // — it's pixel-perfect: it's the real circle's real rendered shape, not a
  // per-letter estimate of where its edge is.
  //
  // Getting a full-size (100vw x 100vh) copy of the text to render at the
  // correct on-screen position from *inside* a scaled clip circle needs one
  // more piece of geometry: a middle wrapper exactly matching the clip
  // circle's own box (via inset: 0, so it shares the same center point) and
  // counter-scaled by dotCounterScale, the same 1/s value already used for
  // the dots above. Composing scale(s) then scale(1/s) about the same
  // center is the identity transform for every point in the box, not just
  // its center — so once the counter-scale cancels the outer's scale, that
  // middle wrapper's own natural (pre-transform) box is a *fixed* reference
  // frame, unaffected by scroll, sized to the clip circle's own natural
  // dimensions (left: 50% - 58% = -8vw, top: 129vh, since those come from
  // percentages of a container whose own size is what's fixed here, not
  // from `s`). A plain, static, JS-free CSS offset (left: 8vw, top: -129vh)
  // inside that fixed frame is therefore enough to land a 100vw x 100vh
  // inner layer exactly back at the sticky container's own (0,0) origin —
  // where the real text already sits — regardless of scroll position.
  const stickyRef = useRef(null);

  // Same dot field as the actual white "What We Do" section below — so as
  // the circle opens, it's genuinely revealing that page's own look, not a
  // plain gradient standing in for it. Size and drift ranges are identical
  // to Section3's dots (not reduced for mobile) so the two fields are
  // visually indistinguishable once they meet — with dotCounterScale now
  // exactly cancelling the circle's own scale, a dot's on-screen size is
  // just its declared px size regardless of viewport or circle scale, so
  // there's no longer a reason for these to differ from Section3's.
  // Count is much higher than Section3's, deliberately: these are spread
  // uniformly across the circle's own 116%-of-viewport-wide box, most of
  // which sits below/beyond the actual viewport (the box exists to grow a
  // circle out of, not to be seen edge-to-edge) — so only a fraction of
  // however many are placed ever land somewhere currently visible/unclipped
  // at once. Section3's dots don't have that "wasted" fraction, since
  // they're spread across a plain viewport-sized section where all of them
  // are potentially visible — matching count 1:1 between the two reads as
  // noticeably sparser here than there.
  const transitionDots = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    return Array.from({ length: isMobile ? 160 : 260 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 10 + 4,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2.5,
      driftX: 20 + Math.random() * 40,
      driftY: 20 + Math.random() * 40,
      driftDuration: 6 + Math.random() * 8,
    }));
  }, []);

  // The actual (white) content — rendered once, reused for both the base
  // layer and, in black, the clipped overlay layer, so the two can never
  // drift out of sync with each other structurally.
  const textContent = (color) => (
    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
      <p
        className="font-mono text-base md:text-lg uppercase tracking-[0.3em] text-sky-200/90 mb-4"
        style={{ color: color === 'black' ? 'transparent' : undefined }}
      >
        From idea to launch
      </p>
      <h2
        className="font-display text-3xl md:text-5xl font-bold leading-tight max-w-lg"
        style={{
          textShadow: color === 'black' ? 'none' : '0 2px 20px rgba(0,0,0,0.5)',
          color: color === 'black' ? '#0a0a0a' : '#ffffff',
        }}
      >
        {HEADLINE_TEXT}
      </h2>
      <p
        className="font-body text-sm md:text-base leading-relaxed max-w-md mt-5"
        style={{
          opacity: color === 'black' ? 1 : 0.85,
          textShadow: color === 'black' ? 'none' : '0 2px 12px rgba(0,0,0,0.6)',
          color: color === 'black' ? '#0a0a0a' : '#ffffff',
        }}
      >
        {PARAGRAPH_TEXT}
      </p>
    </div>
  );

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

        <div className="relative w-full h-full">
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
                  scale: dotCounterScale,
                }}
                animate={{
                  opacity: [0.75, 1, 0.75],
                  x: [0, d.driftX, -d.driftX * 0.4, 0],
                  y: [0, -d.driftY, d.driftY * 0.5, 0],
                }}
                transition={{
                  opacity: { repeat: Infinity, duration: d.duration, delay: d.delay, ease: 'easeInOut' },
                  x: { repeat: Infinity, duration: d.driftDuration, delay: d.delay, ease: 'easeInOut' },
                  y: { repeat: Infinity, duration: d.driftDuration * 1.15, delay: d.delay, ease: 'easeInOut' },
                }}
              />
            ))}
          </motion.div>

          {/* Base layer: the real, always-white text. Plain color, never
              masked, so it's always exactly as crisp as normal text. */}
          {textContent('white')}

          {/* Overlay: a solid black duplicate, visible only through a real
              circular clip sharing the visible circle's exact geometry —
              see the long comment above for how the inner content escapes
              the clip circle's own scaled/offset coordinate space. z-20 (vs.
              the base text layer's own z-10, reused via the same
              textContent() helper) guarantees this paints on top of it
              regardless of DOM order, so the clipped black portion actually
              covers the white text instead of sitting under it. */}
          <motion.div
            aria-hidden="true"
            className="absolute z-20 pointer-events-none overflow-hidden"
            style={{
              left: '50%', top: '129%', width: '116%', aspectRatio: '1/1', marginLeft: '-58%',
              borderRadius: '50%',
              opacity: transitionOpacity,
              scale: transitionScale,
              // Mobile only: the text inside renders through two nested
              // transforms (this circle's own scale, up to 6x, plus the
              // counter-scale below cancelling it back out) — mobile
              // Safari's compositor rasterizes text blurrily and slightly
              // unstably through that kind of compound transform, far more
              // noticeably than desktop Chrome. These are separate hint
              // properties, not the transform itself (which Framer already
              // owns via the `scale` key above), so they can't conflict
              // with it — they just tell the compositor to give this layer
              // its own stable, backface-culled GPU surface instead of
              // repeatedly re-rasterizing it as part of the parent's paint.
              ...(isMobileViewport ? { willChange: 'transform', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' } : {}),
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                scale: dotCounterScale,
                ...(isMobileViewport ? { willChange: 'transform', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' } : {}),
              }}
            >
              <div
                className="absolute"
                style={{ left: '8vw', top: '-129vh', width: '100vw', height: '100vh' }}
              >
                {textContent('black')}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
