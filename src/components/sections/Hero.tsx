import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plane, Calendar, ChevronDown, Sparkles } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import AnimatedCounter from '../AnimatedCounter';

export default function Hero() {
  const { t } = useApp();

  const stats = [
    { value: 500, suffix: '+', label: t.stats.visas },
    { value: 30, suffix: '+', label: t.stats.destinations },
    { value: 98, suffix: '%', label: t.stats.satisfaction },
    { value: 10, suffix: '+', label: t.stats.experience },
  ];

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-navy-900 pt-24 text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-travel.jpg"
          alt="Travel and visa"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950/95 via-navy-900/80 to-navy-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl animate-blob" />
      <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-navy-400/30 blur-3xl animate-blob animation-delay-2000" />

      {/* Floating airplane */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Plane className="absolute h-8 w-8 text-gold-400/40 animate-plane" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gold-300 backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            EMJ-Consulting • Travel & Visa
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t.hero.title.split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.04 }}
                className="inline-block"
              >
                {word}{' '}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              to="/appointment"
              className="group flex items-center justify-center gap-2 rounded-xl bg-gold-gradient px-7 py-4 text-sm font-semibold text-navy-900 shadow-xl transition-transform hover:scale-105 shimmer"
            >
              <Plane className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              {t.hero.cta1}
            </Link>
            <Link
              to="/appointment"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <Calendar className="h-4 w-4" />
              {t.hero.cta2}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-14 grid grid-cols-2 gap-4 sm:gap-8 lg:max-w-2xl"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="rounded-2xl glass p-5 text-center sm:text-left"
              >
                <div className="font-display text-3xl font-bold text-gold-gradient sm:text-4xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-xs text-white/60 sm:text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/50 md:flex"
      >
        <span className="text-xs uppercase tracking-widest">{t.hero.scroll}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
