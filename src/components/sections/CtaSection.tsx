import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Mail, Plane } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export default function CtaSection() {
  const { t } = useApp();
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-navy-gradient px-6 py-16 text-center text-white sm:px-12 sm:py-20"
        >
          <div className="absolute inset-0">
            <img src="/images/cta-travel.jpg" alt="" className="h-full w-full object-cover opacity-20" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/80 to-navy-900/60" />
          </div>
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl animate-blob" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-navy-400/30 blur-3xl animate-blob animation-delay-2000" />

          <div className="relative">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-gradient shadow-xl"
            >
              <Plane className="h-8 w-8 text-navy-900" />
            </motion.div>
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold sm:text-4xl md:text-5xl">{t.sections.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/70 sm:text-lg">{t.sections.ctaSub}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/appointment"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold-gradient px-7 py-3.5 text-sm font-semibold text-navy-900 shadow-lg transition-transform hover:scale-105 shimmer sm:w-auto"
              >
                <Calendar className="h-4 w-4" /> {t.common.bookNow}
              </Link>
              <Link
                to="/contact"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 sm:w-auto"
              >
                <Mail className="h-4 w-4" /> {t.common.contactUs}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
