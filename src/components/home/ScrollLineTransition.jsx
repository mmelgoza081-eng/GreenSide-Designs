import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import ShootingStars from '@/components/ui/ShootingStars';
import RadioactiveOrbs from '@/components/ui/RadioactiveOrbs';

// One continuous SVG path spans the hero, the gap, and the top of the next
// section — it "draws itself" via stroke-dasharray/dashoffset tied straight
// to scroll position. A plain circular div (the "iris") sits exactly where
// the line lands; it starts big enough to cover the screen and shrinks via
// scale() as you scroll through the gap, closing down into a small glowing
// dot right as the line arrives. Both read off the same scroll math, so the
// line and the closing circle are one connected event, not two.
export default function ScrollLineTransition() {
  const sceneRef = useRef(null);
  const panel1Ref = useRef(null);
  const stageRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const irisRef = useRef(null);
  const portalRef = useRef({ x: 0, y: 0 });
  const pathLengthRef = useRef(0);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const scene = sceneRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    const iris = irisRef.current;
    const panel1 = panel1Ref.current;
    const stage = stageRef.current;

    function buildWavePath(width, height) {
      const portal = portalRef.current;
      portal.x = width * 0.5;
      portal.y = panel1.offsetHeight + 90;

      const amplitude = Math.min(50, width * 0.04);
      const wavelength = 340;
      const step = 16;

      let d = `M ${width / 2} 0 `;
      for (let y = step; y <= portal.y; y += step) {
        const x = width / 2 + amplitude * Math.sin((y / wavelength) * Math.PI * 2);
        d += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
      }
      d += `L ${portal.x.toFixed(1)} ${portal.y.toFixed(1)} `;

      for (let y = portal.y + step; y <= height; y += step) {
        const x = width / 2 + amplitude * Math.sin((y / wavelength) * Math.PI * 2);
        d += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
      }
      return d;
    }

    function onScroll() {
      const scrollY = window.scrollY;
      const winH = window.innerHeight;
      const sceneTop = scene.getBoundingClientRect().top + window.scrollY;
      const localScrollY = scrollY - sceneTop;

      const revealY = localScrollY + winH * 0.85;
      const drawT = Math.min(Math.max(revealY / scene.offsetHeight, 0), 1);
      path.style.strokeDashoffset = pathLengthRef.current * (1 - drawT);

      const zoneStart = panel1.offsetHeight - winH * 0.4;
      const zoneEnd = panel1.offsetHeight + stage.offsetHeight - winH * 0.4;
      const t = Math.min(Math.max((localScrollY - zoneStart) / (zoneEnd - zoneStart), 0), 1);

      const minScale = 24 / iris.offsetWidth;
      const scale = 1 - t * (1 - minScale);
      iris.style.transform = `translate(-50%, -50%) scale(${scale})`;
      setClosed(t > 0.97);
    }

    function layout() {
      const width = scene.offsetWidth;
      const height = scene.offsetHeight;
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      svg.setAttribute('width', width);
      svg.setAttribute('height', height);

      path.setAttribute('d', buildWavePath(width, height));
      pathLengthRef.current = path.getTotalLength();
      path.style.strokeDasharray = pathLengthRef.current;

      iris.style.left = portalRef.current.x + 'px';
      iris.style.top = portalRef.current.y + 'px';

      onScroll();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', layout);
    layout();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', layout);
    };
  }, []);

  return (
    <div ref={sceneRef} className="relative">
      {/* Panel 1 — the hero */}
      <section ref={panel1Ref} className="relative h-screen overflow-hidden flex items-center justify-center" style={{ background: '#050807' }}>
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 60% 20%, #0d1f16 0%, #060b09 45%, #030504 100%)',
        }} />
        <RadioactiveOrbs count={16} />
        <ShootingStars starCount={110} shooters={7} fireballs={2} />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '48px 48px' }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)',
        }} />

        <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="font-mono text-xs uppercase tracking-[0.4em] text-emerald-400/80 mb-8"
          >
            Lacey, WA
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center leading-none mb-10 px-4 pt-3"
          >
            <span className="font-display font-bold tracking-tighter text-white text-[min(15vw,17vh)] md:text-[min(12vw,16vh)] lg:text-[min(10vw,15vh)] leading-[1.05] pb-2">
              Green
            </span>
            <span className="font-display font-bold tracking-tighter text-white text-[min(15vw,17vh)] md:text-[min(12vw,16vh)] lg:text-[min(10vw,15vh)] leading-[1.05] pb-2">
              Side
            </span>
            <span
              className="font-display font-bold tracking-tight italic text-[min(15vw,17vh)] md:text-[min(12vw,16vh)] lg:text-[min(10vw,15vh)] leading-[1.05] inline-block pb-2"
              style={{
                background: 'linear-gradient(90deg, #34d399 0%, #a7f3d0 50%, #34d399 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 24px rgba(52,211,153,0.35))',
                paddingRight: '0.12em',
              }}
            >
              Designs
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/contact"
              className="font-mono text-xs uppercase tracking-[0.2em] bg-emerald-400 text-[#052015] px-8 py-4 hover:bg-emerald-300 transition-all duration-300 rounded-sm shadow-lg"
              style={{ boxShadow: '0 0 30px rgba(52,211,153,0.35)' }}
            >
              Start Your Project
            </Link>
            <Link
              to="/services"
              className="font-mono text-xs uppercase tracking-[0.2em] border border-white/20 px-8 py-4 text-white hover:bg-white/5 transition-all duration-300 rounded-sm backdrop-blur-sm"
            >
              View Pricing
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="font-mono text-[11px] uppercase tracking-[0.15em] text-emerald-300/70 mt-6"
          >
            You don't pay a cent until your site is done
          </motion.p>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        >
          <ArrowDown className="w-4 h-4 text-white/40" />
        </motion.div>
      </section>

      {/* The gap the iris closes across */}
      <div ref={stageRef} className="relative h-screen" style={{ background: '#050807' }} />

      {/* Panel 2 — where the line lands */}
      <section className="relative h-screen flex items-center justify-center px-6 text-center" style={{ background: '#04060a' }}>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-sky-300/80 mb-4">From idea to launch</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight max-w-lg mx-auto">
            No detours. Just a straight line to launch.
          </h2>
        </div>
      </section>

      {/* The one continuous line, drawn across all three panels above */}
      <svg ref={svgRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-[2]" preserveAspectRatio="none">
        <defs>
          <linearGradient id="scrollLineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="45%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          fill="none"
          stroke="url(#scrollLineGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 6px rgba(56,189,248,0.65))' }}
          d=""
        />
      </svg>

      {/* The closing iris — shrinks to a small glowing dot right where the line lands */}
      <div
        ref={irisRef}
        className="absolute rounded-full pointer-events-none z-[3]"
        style={{
          width: 3000,
          height: 3000,
          background: '#050807',
          transform: 'translate(-50%, -50%) scale(1)',
        }}
      >
        <div
          className="absolute rounded-full transition-opacity duration-300"
          style={{
            inset: 0,
            margin: 'auto',
            width: '6%',
            height: '6%',
            background: '#38bdf8',
            boxShadow: '0 0 18px 4px rgba(56,189,248,0.8)',
            opacity: closed ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
}
