import React from 'react';

export default function Section2NeonMountains() {
  return (
    <section
      className="relative h-screen w-full"
      style={{
        backgroundImage: 'url(/images/neon-mountains-cropped.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative z-10 h-full flex flex-col items-center justify-start text-center px-6 pt-24 md:pt-32">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-fuchsia-300/80 mb-4">From idea to launch</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight max-w-lg">
          No detours. Just a straight line to launch.
        </h2>
      </div>
    </section>
  );
}
