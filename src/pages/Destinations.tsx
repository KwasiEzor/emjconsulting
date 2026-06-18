import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, FileText, Clock, X, ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useApp } from '../contexts/AppContext';
import { useFetch, Destination } from '../hooks/useData';

export default function Destinations() {
  const { lang, t } = useApp();
  const { data: destinations, loading } = useFetch<Destination[]>('/api/destinations');
  const [region, setRegion] = useState('all');
  const [selected, setSelected] = useState<Destination | null>(null);

  const items = destinations || [];
  const regions = ['all', ...Array.from(new Set(items.map((d) => d.region)))];
  const filtered = region === 'all' ? items : items.filter((d) => d.region === region);

  return (
    <PageTransition>
      <section className="relative overflow-hidden bg-navy-900 pt-36 pb-20 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl animate-blob" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300">{t.nav.destinations}</span>
            <h1 className="font-display text-4xl font-bold sm:text-5xl md:text-6xl">{t.destinations.title}</h1>
            <p className="mt-5 text-lg text-white/70 sm:text-xl">{t.destinations.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Interactive map */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-navy-gradient p-8 sm:p-12">
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            <div className="relative">
              <h3 className="mb-6 text-center font-display text-xl font-bold text-white">{lang === 'fr' ? 'Notre couverture mondiale' : 'Our global coverage'}</h3>
              <div className="relative mx-auto aspect-[2/1] max-w-4xl">
                {/* World map dots background */}
                <svg viewBox="0 0 1000 500" className="absolute inset-0 h-full w-full">
                  <defs>
                    <radialGradient id="dotGrad">
                      <stop offset="0%" stopColor="#d4af37" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {/* Simplified continent shapes via dots */}
                  {Array.from({ length: 400 }).map((_, i) => {
                    const x = (i % 40) * 25 + 5;
                    const y = Math.floor(i / 40) * 25 + 5;
                    return <circle key={i} cx={x} cy={y} r="1.5" fill="#ffffff" opacity="0.08" />;
                  })}
                </svg>
                {/* Destination pins */}
                {items.map((d, i) => (
                  <motion.button
                    key={d.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.08, type: 'spring' }}
                    onClick={() => setSelected(d)}
                    className="group absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${d.map_x}%`, top: `${d.map_y}%` }}
                    aria-label={d.name_fr}
                  >
                    <span className="absolute inset-0 rounded-full bg-gold-400/40 animate-pulse-ring" />
                    <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-gold-gradient ring-2 ring-white/30 transition-transform group-hover:scale-150">
                      <MapPin className="h-2.5 w-2.5 text-navy-900" />
                    </span>
                    <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg glass-strong px-2.5 py-1 text-xs font-semibold opacity-0 transition-opacity group-hover:opacity-100" style={{ color: 'var(--text)' }}>
                      {d.flag} {lang === 'fr' ? d.name_fr : d.name_en}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter + Cards */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  region === r ? 'bg-gold-gradient text-navy-900 shadow-lg' : 'glass hover:text-gold-400'
                }`}
                style={{ color: region === r ? undefined : 'var(--text-soft)' }}
              >
                {r === 'all' ? t.common.all : r}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-80 animate-pulse rounded-3xl" style={{ background: 'var(--bg-soft)' }} />
              ))}
            </div>
          ) : (
            <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {filtered.map((d) => (
                  <motion.div
                    key={d.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -8 }}
                    className="group relative overflow-hidden rounded-3xl shadow-lg"
                    style={{ boxShadow: '0 10px 40px -12px var(--shadow-color)' }}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={d.image} alt={lang === 'fr' ? d.name_fr : d.name_en} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/30 to-transparent" />
                      <div className="absolute right-3 top-3 rounded-full glass-strong px-2.5 py-1 text-xl">{d.flag}</div>
                      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                        <h3 className="font-display text-xl font-bold">{lang === 'fr' ? d.name_fr : d.name_en}</h3>
                        <p className="mt-1 line-clamp-2 text-xs text-white/70">{lang === 'fr' ? d.desc_fr : d.desc_en}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3 p-4" style={{ background: 'var(--glass-bg)' }}>
                      <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-soft)' }}>
                        <Clock className="h-3.5 w-3.5 text-gold-400" /> {d.delay_days}
                      </span>
                      <button onClick={() => setSelected(d)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 transition-all hover:gap-2.5">
                        {t.common.discover} <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-navy-950/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl glass-strong p-0"
            >
              <div className="relative aspect-video overflow-hidden rounded-t-3xl">
                <img src={selected.image} alt={selected.name_fr} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 to-transparent" />
                <button onClick={() => setSelected(null)} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full glass-strong text-white transition-colors hover:text-gold-400" aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
                <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white">
                  <span className="text-4xl">{selected.flag}</span>
                  <div>
                    <h3 className="font-display text-2xl font-bold">{lang === 'fr' ? selected.name_fr : selected.name_en}</h3>
                    <span className="text-sm text-white/70">{selected.region}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-5 p-6 sm:p-8">
                <p style={{ color: 'var(--text-soft)' }}>{lang === 'fr' ? selected.desc_fr : selected.desc_en}</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl glass p-4">
                    <FileText className="mb-2 h-5 w-5 text-gold-400" />
                    <h4 className="mb-1 text-xs font-bold uppercase tracking-wide text-gold-400">{t.destinations.conditions}</h4>
                    <p className="text-sm" style={{ color: 'var(--text-soft)' }}>{lang === 'fr' ? selected.conditions_fr : selected.conditions_en}</p>
                  </div>
                  <div className="rounded-2xl glass p-4">
                    <MapPin className="mb-2 h-5 w-5 text-gold-400" />
                    <h4 className="mb-1 text-xs font-bold uppercase tracking-wide text-gold-400">{t.destinations.documents}</h4>
                    <p className="text-sm" style={{ color: 'var(--text-soft)' }}>{lang === 'fr' ? selected.documents_fr : selected.documents_en}</p>
                  </div>
                  <div className="rounded-2xl glass p-4">
                    <Clock className="mb-2 h-5 w-5 text-gold-400" />
                    <h4 className="mb-1 text-xs font-bold uppercase tracking-wide text-gold-400">{t.destinations.delay}</h4>
                    <p className="text-sm" style={{ color: 'var(--text-soft)' }}>{selected.delay_days}</p>
                  </div>
                </div>
                <Link to="/appointment" className="flex items-center justify-center gap-2 rounded-xl bg-gold-gradient px-6 py-3 text-sm font-semibold text-navy-900 transition-transform hover:scale-[1.02] shimmer">
                  {t.common.bookNow} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
