import { motion } from 'framer-motion';
import { UserCheck, Zap, Globe2, TrendingUp, Headphones, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../SectionHeading';
import { useApp } from '../../contexts/AppContext';

export default function WhyChooseUs() {
  const { t } = useApp();
  const features = [
    { Icon: UserCheck, title: t.why.personalized, desc: t.why.personalizedD, color: 'from-blue-400 to-blue-600' },
    { Icon: Zap, title: t.why.fast, desc: t.why.fastD, color: 'from-amber-400 to-orange-500' },
    { Icon: Globe2, title: t.why.expertise, desc: t.why.expertiseD, color: 'from-emerald-400 to-teal-600' },
    { Icon: TrendingUp, title: t.why.success, desc: t.why.successD, color: 'from-purple-400 to-pink-600' },
    { Icon: Headphones, title: t.why.support, desc: t.why.supportD, color: 'from-rose-400 to-red-600' },
  ];

  return (
    <section className="relative py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Why Us" title={t.sections.why} subtitle={t.sections.whySub} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl glass p-7"
              style={{ boxShadow: '0 10px 40px -12px var(--shadow-color)' }}
            >
              <div className="mb-5 flex items-center justify-between">
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${f.color} text-white shadow-lg transition-transform group-hover:scale-110`}>
                  <f.Icon className="h-7 w-7" />
                </div>
                <CheckCircle2 className="h-6 w-6 text-gold-400" />
              </div>
              <h3 className="mb-2 font-display text-xl font-bold" style={{ color: 'var(--text)' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>{f.desc}</p>
            </motion.div>
          ))}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative flex flex-col justify-center overflow-hidden rounded-3xl bg-navy-gradient p-7 text-white"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            <div className="relative">
              <h3 className="mb-2 font-display text-2xl font-bold">{t.common.bookNow}</h3>
              <p className="text-sm text-white/70">{t.sections.ctaSub}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
