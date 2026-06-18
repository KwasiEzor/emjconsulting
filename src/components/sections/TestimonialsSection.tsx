import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '../SectionHeading';
import { useApp } from '../../contexts/AppContext';
import { useFetch, Testimonial } from '../../hooks/useData';

export default function TestimonialsSection() {
  const { lang, t } = useApp();
  const { data: testimonials, loading } = useFetch<Testimonial[]>('/api/testimonials');
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const items = testimonials || [];
  const count = items.length;

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((p) => (p + dir + count) % count);
  }, [count]);

  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => go(1), 6000);
    return () => clearInterval(timer);
  }, [count, go]);

  if (loading) {
    return (
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto h-64 max-w-2xl animate-pulse rounded-3xl" style={{ background: 'var(--bg-soft)' }} />
        </div>
      </section>
    );
  }

  if (!count) return null;

  const current = items[index];

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400/5 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Testimonials" title={t.sections.testimonials} subtitle={t.sections.testimonialsSub} />

        <div className="relative mx-auto max-w-3xl">
          <div className="relative min-h-[320px] overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl glass p-8 text-center sm:p-12"
                style={{ boxShadow: '0 20px 60px -20px var(--shadow-color)' }}
              >
                <Quote className="mx-auto mb-6 h-12 w-12 text-gold-400" fill="currentColor" />
                <div className="mb-5 flex justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < current.rating ? 'text-gold-400' : ''}`} fill="currentColor" style={{ opacity: i < current.rating ? 1 : 0.2 }} />
                  ))}
                </div>
                <p className="mb-8 text-lg leading-relaxed sm:text-xl" style={{ color: 'var(--text)' }}>
                  "{lang === 'fr' ? current.text_fr : current.text_en}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <img src={current.avatar} alt={current.name} className="h-14 w-14 rounded-full object-cover ring-2 ring-gold-400/40" loading="lazy" />
                  <div className="text-left">
                    <div className="font-display font-bold" style={{ color: 'var(--text)' }}>{current.name}</div>
                    <div className="text-sm" style={{ color: 'var(--text-soft)' }}>{lang === 'fr' ? current.role_fr : current.role_en}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button onClick={() => go(-1)} className="flex h-11 w-11 items-center justify-center rounded-full glass-strong transition-colors hover:text-gold-400" style={{ color: 'var(--text)' }} aria-label="Previous">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                  className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-gold-gradient' : 'w-2 bg-gold-400/30'}`}
                  aria-label={`Go to ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={() => go(1)} className="flex h-11 w-11 items-center justify-center rounded-full glass-strong transition-colors hover:text-gold-400" style={{ color: 'var(--text)' }} aria-label="Next">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
