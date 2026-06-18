import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import CtaSection from '../components/sections/CtaSection';
import { useApp } from '../contexts/AppContext';
import { useFetch, Service } from '../hooks/useData';

export default function Services() {
  const { lang, t } = useApp();
  const { data: services, loading } = useFetch<Service[]>('/api/services');

  return (
    <PageTransition>
      <section className="relative overflow-hidden bg-navy-900 pt-36 pb-20 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl animate-blob" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300">{t.nav.services}</span>
            <h1 className="font-display text-4xl font-bold sm:text-5xl md:text-6xl">{t.sections.services}</h1>
            <p className="mt-5 text-lg text-white/70 sm:text-xl">{t.sections.servicesSub}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="space-y-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-64 animate-pulse rounded-3xl" style={{ background: 'var(--bg-soft)' }} />
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {(services || []).map((service, i) => {
                const Icon = (Icons as any)[service.icon] || Icons.FileText;
                // Handle JSONB structure from database
                const benefits = service.benefits?.[lang] || service.benefits?.fr || [];
                const processSteps = Array.isArray(service.process)
                  ? service.process.map((p: any) => lang === 'fr' ? p.titleFr : p.titleEn)
                  : [];
                const reversed = i % 2 === 1;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5 }}
                    className="grid items-center gap-8 overflow-hidden rounded-3xl glass p-6 sm:p-10 lg:grid-cols-2"
                    style={{ boxShadow: '0 10px 40px -12px var(--shadow-color)' }}
                  >
                    <div className={reversed ? 'lg:order-2' : ''}>
                      <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-gradient text-navy-900 shadow-lg">
                        <Icon className="h-8 w-8" />
                      </div>
                      <h2 className="mb-3 font-display text-2xl font-bold sm:text-3xl" style={{ color: 'var(--text)' }}>
                        {lang === 'fr' ? service.titleFr : service.titleEn}
                      </h2>
                      <p className="leading-relaxed" style={{ color: 'var(--text-soft)' }}>
                        {lang === 'fr' ? service.descriptionFr : service.descriptionEn}
                      </p>
                      <Link to="/appointment" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gold-gradient px-6 py-3 text-sm font-semibold text-navy-900 transition-transform hover:scale-105 shimmer">
                        {t.common.bookNow} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <div className={reversed ? 'lg:order-1' : ''}>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <h4 className="mb-3 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-gold-400">
                            <CheckCircle2 className="h-4 w-4" /> {lang === 'fr' ? 'Avantages' : 'Benefits'}
                          </h4>
                          <ul className="space-y-2">
                            {benefits.map((b, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-soft)' }}>
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" /> {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="mb-3 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-gold-400">
                            <CheckCircle2 className="h-4 w-4" /> {lang === 'fr' ? 'Processus' : 'Process'}
                          </h4>
                          <ol className="space-y-2">
                            {processSteps.map((p, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-soft)' }}>
                                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold-400/20 text-[10px] font-bold text-gold-400">{j + 1}</span> {p}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <CtaSection />
    </PageTransition>
  );
}
