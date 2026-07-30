import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function scrollToTopAndNavigate() {
  window.scrollTo({ top: 0, behavior: 'instant' });
}

const links = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

// A compact vertical menu pinned to the right edge of the hero section only
// — absolutely positioned within it (not viewport-fixed), so it scrolls
// away with the first page instead of following down the rest of the site.
export default function SideNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      <div className="hidden lg:flex absolute top-1/2 right-6 lg:right-10 z-50 flex-col items-end gap-5 -translate-y-1/2">
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            onClick={scrollToTopAndNavigate}
            className="group relative font-mono text-xs uppercase tracking-[0.2em] text-white/70 hover:text-yellow-400 transition-colors duration-300"
          >
            <span className={location.pathname === link.path ? 'text-yellow-400' : ''}>
              {link.label}
            </span>
            <span
              className="absolute -inset-x-3 -inset-y-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
              style={{ boxShadow: '0 0 12px 4px rgba(234,179,8,0.35), 0 0 28px 10px rgba(234,179,8,0.12)', background: 'radial-gradient(ellipse at center, rgba(234,179,8,0.08) 0%, transparent 70%)' }}
            />
          </Link>
        ))}
        <Link
          to="/contact"
          className="mt-2 font-mono text-xs uppercase tracking-[0.15em] px-5 py-3 rounded-sm border border-white/40 text-white hover:bg-velvet hover:border-velvet transition-all duration-300"
        >
          Start a Project
        </Link>
      </div>

      {/* Mobile trigger — same corner, compact */}
      <button
        onClick={() => setMenuOpen(true)}
        className="lg:hidden absolute top-6 right-6 z-50 p-3 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

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
