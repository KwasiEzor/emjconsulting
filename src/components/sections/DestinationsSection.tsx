import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../SectionHeading';
import { useApp } from '../../contexts/AppContext';
import { useFetch, Destination } from '../../hooks/useData';

export default function DestinationsSection({ limit }: { limit?: number }) {
  const { lang, t } = useApp();
  const { data: destinations, loading } = useFetch<Destination[]>('/api/destinations');

  const items = limit && destinations ? destinations.slice(0, limit) : destinations;

  return (
    <section className="relative py-24" id="destinations">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Destinations" title={t.sections.destinations} subtitle={t.sections.destinationsSub} />

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-3xl" style={{ background: 'var(--bg-soft)' }} />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items?.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="group relative overflow-hidden rounded-3xl shadow-lg"
                style={{ boxShadow: '0 10px 40px -12px var(--shadow-color)' }}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={dest.imageUrl}
                    alt={lang === 'fr' ? dest.nameFr : dest.nameEn}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/40 to-transparent" />
                  <div className="absolute right-4 top-4 rounded-full glass-strong px-3 py-1.5 text-2xl">{dest.flag}</div>
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <h3 className="font-display text-2xl font-bold drop-shadow-lg">{lang === 'fr' ? dest.nameFr : dest.nameEn}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-white/80">{lang === 'fr' ? dest.descriptionFr : dest.descriptionEn}</p>
                    <Link
                      to="/destinations"
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-4 py-2 text-sm font-semibold text-navy-900 opacity-0 transition-all duration-300 group-hover:opacity-100"
                    >
                      {t.common.discover} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
