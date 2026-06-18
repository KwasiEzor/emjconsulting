import { motion } from 'framer-motion';
import { Target, Eye, Heart, Shield, Award, Users } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import CtaSection from '../components/sections/CtaSection';
import { useApp } from '../contexts/AppContext';

export default function About() {
  const { t, lang } = useApp();

  const pillars = [
    { Icon: Target, title: t.about.missionTitle, text: t.about.mission, color: 'from-blue-500 to-blue-700' },
    { Icon: Eye, title: t.about.visionTitle, text: t.about.vision, color: 'from-purple-500 to-purple-700' },
    { Icon: Heart, title: t.about.valuesTitle, text: t.about.values, color: 'from-rose-500 to-rose-700' },
  ];

  const timeline = [
    { year: '2014', titleFr: 'Création', titleEn: 'Founding', descFr: 'EMJ-Consulting ouvre ses portes avec une mission : simplifier les démarches de visa.', descEn: 'EMJ-Consulting opens its doors with a mission: simplify visa procedures.' },
    { year: '2017', titleFr: 'Expansion', titleEn: 'Expansion', descFr: 'Ouverture de nouveaux bureaux et partenariats avec 15 pays.', descEn: 'Opening of new offices and partnerships with 15 countries.' },
    { year: '2020', titleFr: 'Digitalisation', titleEn: 'Digitalization', descFr: 'Lancement de notre plateforme digitale pour un suivi en temps réel.', descEn: 'Launch of our digital platform for real-time tracking.' },
    { year: '2024', titleFr: 'Excellence', titleEn: 'Excellence', descFr: 'Plus de 500 visas obtenus et 98% de clients satisfaits.', descEn: 'Over 500 visas obtained and 98% satisfied clients.' },
  ];

  const values = [
    { Icon: Shield, titleFr: 'Intégrité', titleEn: 'Integrity' },
    { Icon: Award, titleFr: 'Excellence', titleEn: 'Excellence' },
    { Icon: Users, titleFr: 'Proximité', titleEn: 'Proximity' },
    { Icon: Heart, titleFr: 'Engagement', titleEn: 'Commitment' },
  ];

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 pt-36 pb-20 text-white">
        <div className="absolute inset-0">
          <img src="/images/about-team.jpg" alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/80 to-navy-900/60" />
        </div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300">
              {t.nav.about}
            </span>
            <h1 className="font-display text-4xl font-bold sm:text-5xl md:text-6xl">{t.about.title}</h1>
            <p className="mt-5 text-lg text-white/70 sm:text-xl">{t.about.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl glass p-8"
                style={{ boxShadow: '0 10px 40px -12px var(--shadow-color)' }}
              >
                <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${p.color} text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                  <p.Icon className="h-8 w-8" />
                </div>
                <h3 className="mb-3 font-display text-2xl font-bold" style={{ color: 'var(--text)' }}>{p.title}</h3>
                <p className="leading-relaxed" style={{ color: 'var(--text-soft)' }}>{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values strip */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col items-center gap-3 rounded-2xl glass p-6 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-gradient text-navy-900">
                  <v.Icon className="h-6 w-6" />
                </div>
                <span className="font-display font-semibold" style={{ color: 'var(--text)' }}>
                  {lang === 'fr' ? v.titleFr : v.titleEn}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden bg-navy-900 py-24 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl animate-blob" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Timeline" title={t.about.timelineTitle} subtitle={t.about.timelineSub} light />
          <div className="relative mt-16">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-gold-400 via-gold-400/40 to-transparent sm:left-1/2 sm:-translate-x-1/2" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex items-center gap-6 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                >
                  <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-gradient ring-4 ring-navy-900 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                    <span className="h-2 w-2 rounded-full bg-navy-900" />
                  </div>
                  <div className="flex-1 rounded-2xl glass p-6 sm:w-[calc(50%-2rem)] sm:flex-none">
                    <span className="font-display text-2xl font-bold text-gold-gradient">{item.year}</span>
                    <h3 className="mt-1 font-display text-lg font-semibold">{lang === 'fr' ? item.titleFr : item.titleEn}</h3>
                    <p className="mt-2 text-sm text-white/60">{lang === 'fr' ? item.descFr : item.descEn}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </PageTransition>
  );
}
