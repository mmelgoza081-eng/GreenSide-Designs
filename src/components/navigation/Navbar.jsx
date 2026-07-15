import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function scrollToTopAndNavigate() {
  window.scrollTo({ top: 0, behavior: 'instant' });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-md border-b border-border shadow-sm' : 'bg-black/40 backdrop-blur-sm border-b border-white/10'
      }`}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <Link to="/" className={`font-display text-2xl font-bold tracking-wider transition-colors duration-300 ${scrolled ? 'text-foreground' : 'text-white'}`}>
            GreenSide Designs
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={scrollToTopAndNavigate}
                className={`font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 relative group ${
                  location.pathname === link.path ? 'text-yellow-400' : scrolled ? 'text-foreground/60' : 'text-white/70'
                }`}
                style={{ '--tw-text-opacity': 1 }}
              >
                <span className="relative z-10 group-hover:text-yellow-400 transition-colors duration-300">
                  {link.label}
                </span>
                {/* Gold energy glow on hover */}
                <span className="absolute inset-0 -inset-x-2 -inset-y-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: '0 0 12px 4px rgba(234,179,8,0.35), 0 0 28px 10px rgba(234,179,8,0.12)', background: 'radial-gradient(ellipse at center, rgba(234,179,8,0.08) 0%, transparent 70%)' }} />
              </Link>
            ))}
          </div>

          <Link
            to="/contact"
            className={`hidden md:block font-mono text-xs uppercase tracking-[0.15em] px-6 py-3 rounded-sm transition-all duration-300 ${
              scrolled 
                ? 'bg-velvet text-white hover:bg-velvet/80' 
                : 'border border-white/40 text-white hover:bg-velvet hover:border-velvet'
            }`}
          >
            Start a Project
          </Link>

          <button
            onClick={() => setMenuOpen(true)}
            className={`md:hidden p-2 transition-colors ${scrolled ? 'text-foreground' : 'text-white'}`}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 p-2 text-foreground"
              aria-label="Close menu"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="flex flex-col items-center gap-10">
              {links.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={scrollToTopAndNavigate}
                    className={`font-display text-4xl tracking-wide transition-colors duration-300 hover:text-velvet ${
                      location.pathname === link.path ? 'text-velvet' : 'text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  to="/contact"
                  className="font-mono text-sm uppercase tracking-[0.2em] bg-velvet text-white px-8 py-4 hover:bg-velvet/80 transition-all duration-300 rounded-sm"
                >
                  Start a Project
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}