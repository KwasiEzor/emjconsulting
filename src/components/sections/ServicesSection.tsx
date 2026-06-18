import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import SectionHeading from '../SectionHeading';
import { useApp } from '../../contexts/AppContext';
import { useFetch, Service } from '../../hooks/useData';

export default function ServicesSection({ limit }: { limit?: number }) {
  const { lang, t } = useApp();
  const { data: services, loading } = useFetch<Service[]>('/api/services');

  const items = limit && services ? services.slice(0, limit) : services;

  return (
    <section className="relative py-24" id="services">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-400/5 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Services" title={t.sections.services} subtitle={t.sections.servicesSub} />

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-56 animate-pulse rounded-3xl" style={{ background: 'var(--bg-soft)' }} />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items?.map((service, i) => {
              const Icon = (Icons as any)[service.icon] || Icons.FileText;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-3xl glass p-7 transition-shadow hover:shadow-2xl"
                  style={{ boxShadow: '0 10px 40px -12px var(--shadow-color)' }}
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gold-400/0 blur-2xl transition-all duration-500 group-hover:bg-gold-400/15" />
                  <div className="relative">
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-gradient text-navy-900 shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-2 font-display text-xl font-bold" style={{ color: 'var(--text)' }}>
                      {lang === 'fr' ? service.titleFr : service.titleEn}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>
                      {lang === 'fr' ? service.descriptionFr : service.descriptionEn}
                    </p>
                    <Link
                      to="/services"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 transition-all hover:gap-2.5"
                    >
                      {t.common.learnMore} <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
