import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import SectionHeading from '../SectionHeading';
import { useApp } from '../../contexts/AppContext';
import { useFetch, Faq } from '../../hooks/useData';

export default function FaqSection() {
  const { lang, t } = useApp();
  const { data: faqs, loading } = useFetch<Faq[]>('/api/faqs');
  const [open, setOpen] = useState<number | null>(0);

  const items = faqs || [];

  return (
    <section className="relative py-24">
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="FAQ" title={t.sections.faq} subtitle={t.sections.faqSub} />

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 animate-pulse rounded-2xl" style={{ background: 'var(--bg-soft)' }} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((faq, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="overflow-hidden rounded-2xl glass"
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="font-display text-base font-semibold sm:text-lg" style={{ color: 'var(--text)' }}>
                      {lang === 'fr' ? faq.question_fr : faq.question_en}
                    </span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="shrink-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-400/10 text-gold-400">
                        <Plus className="h-4 w-4" />
                      </div>
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>
                          {lang === 'fr' ? faq.answer_fr : faq.answer_en}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
