import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function LiveClock({ city, timezone }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const t = new Date().toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setTime(t);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs tracking-[0.15em] text-white/50 uppercase">{city}</span>
      <span className="font-mono text-sm text-white/80 font-medium">{time}</span>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-obsidian text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Top section */}
        <div className="py-20 border-b border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <h2 className="font-display text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white">GreenSide Designs</h2>
              <p className="font-body text-base text-white/50 max-w-sm leading-relaxed mb-8">
                Crafting digital experiences for small businesses. 
                Based in Lacey, WA — serving clients everywhere.
              </p>
              <Link
                to="/contact"
                className="inline-block font-mono text-xs uppercase tracking-[0.15em] bg-velvet text-white px-8 py-4 hover:bg-velvet/80 transition-all duration-300 rounded-sm"
              >
                Start a Project →
              </Link>
            </div>

            <div className="md:col-span-2 md:col-start-7">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] mb-6 text-white/30">Navigation</h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Home', path: '/' },
                  { label: 'Services', path: '/services' },
                  { label: 'About', path: '/about' },
                  { label: 'Contact', path: '/contact' },
                ].map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="font-body text-sm text-white/50 hover:text-velvet transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] mb-6 text-white/30">Contact</h3>
              <div className="flex flex-col gap-2">
                <p className="font-body text-sm text-white/50">support@green-side-designs.com</p>
                <p className="font-body text-sm text-white/50">Lacey, WA</p>
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] mb-6 text-white/30">Local Time</h3>
              <div className="flex flex-col gap-3">
                <LiveClock city="Lacey, WA" timezone="America/Los_Angeles" />
                <LiveClock city="New York" timezone="America/New_York" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-white/30 tracking-wider">
            © {new Date().getFullYear()} GREENSIDE DESIGNS — ALL RIGHTS RESERVED
          </p>
          <p className="font-mono text-xs text-white/30 tracking-wider">
            LACEY, WA · USA
          </p>
        </div>
      </div>
    </footer>
  );
}