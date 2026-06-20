import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Plane, Sun, Moon, Globe } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Lang } from '../lib/translations';

export default function Navbar() {
  const { t, lang, setLang, theme, toggleTheme } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [prevPath, setPrevPath] = useState(location.pathname);
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    setOpen(false);
    setLangOpen(false);
  }

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/services', label: t.nav.services },
    { to: '/destinations', label: t.nav.destinations },
    { to: '/blog', label: t.nav.blog },
    { to: '/contact', label: t.nav.contact },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <nav className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-500 sm:px-6 lg:px-8 ${
          scrolled ? 'mx-3 rounded-2xl glass-strong px-4 py-2.5 shadow-lg sm:mx-6 lg:mx-auto' : 'py-1'
        }`}>
          <Link to="/" className="group flex items-center gap-2.5" aria-label="EMJ-Consulting home">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gold-gradient shadow-lg transition-transform group-hover:scale-110">
              <Plane className="h-5 w-5 text-navy-900" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg font-bold tracking-tight" style={{ color: 'var(--text)' }}>
                EMJ<span className="text-gold-gradient">Consulting</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-soft)' }}>Travel & Visa</span>
            </div>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-gold-400' : 'hover:text-gold-400'
                  }`
                }
                style={({ isActive }) => ({ color: isActive ? undefined : 'var(--text-soft)' })}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gold-gradient"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setLangOpen((p) => !p)}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors hover:bg-gold-400/10"
                style={{ color: 'var(--text-soft)' }}
                aria-label="Change language"
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline uppercase">{lang}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 top-full z-20 mt-2 w-36 overflow-hidden rounded-xl glass-strong p-1 shadow-xl"
                    >
                      {(['fr', 'en'] as Lang[]).map((l) => (
                        <button
                          key={l}
                          onClick={() => { setLang(l); setLangOpen(false); }}
                          className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gold-400/10 ${
                            lang === l ? 'text-gold-400' : ''
                          }`}
                          style={{ color: lang === l ? undefined : 'var(--text-soft)' }}
                        >
                          <span className="text-base">{l === 'fr' ? '🇫🇷' : '🇬🇧'}</span>
                          {l === 'fr' ? 'Français' : 'English'}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 transition-colors hover:bg-gold-400/10"
              style={{ color: 'var(--text-soft)' }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <Sun className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Moon className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <Link
              to="/appointment"
              className="hidden rounded-xl bg-gold-gradient px-5 py-2.5 text-sm font-semibold text-navy-900 shadow-lg transition-transform hover:scale-105 shimmer sm:block"
            >
              {t.nav.appointment}
            </Link>

            <button
              onClick={() => setOpen((p) => !p)}
              className="rounded-lg p-2 lg:hidden"
              style={{ color: 'var(--text)' }}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] bg-navy-950/80 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="absolute right-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto glass-strong p-6 pt-24"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-1">
                {links.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                          isActive ? 'bg-gold-400/10 text-gold-400' : 'hover:bg-gold-400/5'
                        }`
                      }
                      style={({ isActive }) => ({ color: isActive ? undefined : 'var(--text)' })}
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
                <Link
                  to="/appointment"
                  className="mt-4 block rounded-xl bg-gold-gradient px-4 py-3.5 text-center text-base font-semibold text-navy-900"
                >
                  {t.nav.appointment}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
